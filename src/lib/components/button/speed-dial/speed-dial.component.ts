import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';

import { LucideAngularModule, LucideIconData, Plus, X } from 'lucide-angular';

/**
 * SpeedDial direction options
 */
export type SpeedDialDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'
  | 'circle'
  | 'semi-circle-up'
  | 'semi-circle-down'
  | 'semi-circle-left'
  | 'semi-circle-right';

/**
 * SpeedDial button size
 */
export type SpeedDialSize = 'sm' | 'md' | 'lg';

/**
 * SpeedDial menu item
 */
export interface SpeedDialItem {
  /** Unique identifier */
  id?: string;
  /** Icon for the action */
  icon: LucideIconData;
  /** Tooltip label */
  label?: string;
  /** Command to execute on click */
  command?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom CSS class */
  class?: string;
  /** Background color class */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

/**
 * UiSpeedDial Component
 *
 * A floating action button that reveals multiple action buttons.
 *
 * @example
 * ```html
 * <ui-speed-dial [model]="actions" direction="up"></ui-speed-dial>
 * ```
 */
@Component({
  selector: 'ui-speed-dial',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './speed-dial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-block',
  },
})
export class UiSpeedDialComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly plusIcon = Plus;
  protected readonly closeIcon = X;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Array of menu items */
  readonly model = input.required<SpeedDialItem[]>();

  /** Direction of the menu items */
  readonly direction = input<SpeedDialDirection>('up');

  /** Size of the buttons */
  readonly size = input<SpeedDialSize>('md');

  /** Whether to show a mask overlay when open */
  readonly mask = input<boolean>(false);

  /** Mask CSS class */
  readonly maskClass = input<string>('');

  /** Whether the speed dial is disabled */
  readonly disabled = input<boolean>(false);

  /** Custom icon for the trigger button */
  readonly icon = input<LucideIconData | undefined>(undefined);

  /** Custom icon when open */
  readonly activeIcon = input<LucideIconData | undefined>(undefined);

  /** Whether to rotate the icon when open */
  readonly rotateAnimation = input<boolean>(true);

  /** Whether to hide on click outside */
  readonly hideOnClickOutside = input<boolean>(true);

  /** Radius for circular layouts (in pixels) */
  readonly radius = input<number>(80);

  /** Button type/style */
  readonly buttonClass = input<string>('');

  /** ARIA label for the trigger button */
  readonly ariaLabel = input<string>('Speed Dial');

  // =========================================================================
  // STATE
  // =========================================================================

  /** Whether the menu is visible */
  readonly visible = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when visibility changes */
  readonly onVisibleChange = output<boolean>();

  /** Emitted when the trigger button is clicked */
  readonly onShow = output<void>();

  /** Emitted when the menu is hidden */
  readonly onHide = output<void>();

  /** Emitted when an item is clicked */
  readonly onItemClick = output<SpeedDialItem>();

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly triggerIcon = computed(() => {
    if (this.visible()) {
      return this.activeIcon() ?? this.closeIcon;
    }
    return this.icon() ?? this.plusIcon;
  });

  readonly triggerClasses = computed(() => {
    const size = this.size();
    const disabled = this.disabled();
    const visible = this.visible();
    const rotate = this.rotateAnimation();

    const baseClasses = [
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-primary-500',
      'text-white',
      'shadow-lg',
      'transition-all',
      'duration-300',
      'hover:bg-primary-600',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-primary-500',
      'focus:ring-offset-2',
    ];

    const sizeClasses: Record<SpeedDialSize, string[]> = {
      sm: ['w-10', 'h-10'],
      md: ['w-12', 'h-12'],
      lg: ['w-14', 'h-14'],
    };

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      baseClasses.push('cursor-pointer');
    }

    if (visible && rotate && !this.activeIcon()) {
      baseClasses.push('rotate-45');
    }

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<SpeedDialSize, number> = {
      sm: 18,
      md: 22,
      lg: 26,
    };
    return sizeMap[this.size()];
  });

  readonly itemIconSize = computed(() => {
    const sizeMap: Record<SpeedDialSize, number> = {
      sm: 14,
      md: 18,
      lg: 22,
    };
    return sizeMap[this.size()];
  });

  readonly containerClasses = computed(() => {
    const direction = this.direction();
    const baseClasses = ['absolute', 'flex', 'gap-2'];

    const directionClasses: Record<string, string[]> = {
      up: ['flex-col-reverse', 'bottom-full', 'left-1/2', '-translate-x-1/2', 'pb-2'],
      down: ['flex-col', 'top-full', 'left-1/2', '-translate-x-1/2', 'pt-2'],
      left: ['flex-row-reverse', 'right-full', 'top-1/2', '-translate-y-1/2', 'pr-2'],
      right: ['flex-row', 'left-full', 'top-1/2', '-translate-y-1/2', 'pl-2'],
      'up-left': ['flex-col-reverse', 'bottom-full', 'right-full', 'pb-2', 'pr-2'],
      'up-right': ['flex-col-reverse', 'bottom-full', 'left-full', 'pb-2', 'pl-2'],
      'down-left': ['flex-col', 'top-full', 'right-full', 'pt-2', 'pr-2'],
      'down-right': ['flex-col', 'top-full', 'left-full', 'pt-2', 'pl-2'],
    };

    if (direction.startsWith('circle') || direction.startsWith('semi-circle')) {
      return [...baseClasses].join(' ');
    }

    return [...baseClasses, ...(directionClasses[direction] ?? directionClasses['up'])].join(' ');
  });

  readonly isCircular = computed(() => {
    const dir = this.direction();
    return dir === 'circle' || dir.startsWith('semi-circle');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  toggle(): void {
    if (this.disabled()) return;

    const newState = !this.visible();
    this.visible.set(newState);
    this.onVisibleChange.emit(newState);

    if (newState) {
      this.onShow.emit();
    } else {
      this.onHide.emit();
    }
  }

  hide(): void {
    if (this.visible()) {
      this.visible.set(false);
      this.onVisibleChange.emit(false);
      this.onHide.emit();
    }
  }

  show(): void {
    if (!this.visible() && !this.disabled()) {
      this.visible.set(true);
      this.onVisibleChange.emit(true);
      this.onShow.emit();
    }
  }

  onItemClicked(item: SpeedDialItem, event: Event): void {
    event.stopPropagation();

    if (item.disabled) return;

    this.onItemClick.emit(item);

    if (item.command) {
      item.command();
    }

    this.hide();
  }

  getItemClasses(item: SpeedDialItem, index: number): string {
    const size = this.size();
    const disabled = item.disabled;
    const color = item.color ?? 'primary';

    const baseClasses = [
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'shadow-md',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
    ];

    const sizeClasses: Record<SpeedDialSize, string[]> = {
      sm: ['w-8', 'h-8'],
      md: ['w-10', 'h-10'],
      lg: ['w-12', 'h-12'],
    };

    const colorClasses: Record<string, string[]> = {
      primary: ['bg-primary-500', 'text-white', 'hover:bg-primary-600', 'focus:ring-primary-500'],
      secondary: ['bg-gray-500', 'text-white', 'hover:bg-gray-600', 'focus:ring-gray-500'],
      success: ['bg-green-500', 'text-white', 'hover:bg-green-600', 'focus:ring-green-500'],
      warning: ['bg-yellow-500', 'text-white', 'hover:bg-yellow-600', 'focus:ring-yellow-500'],
      danger: ['bg-red-500', 'text-white', 'hover:bg-red-600', 'focus:ring-red-500'],
      info: ['bg-blue-500', 'text-white', 'hover:bg-blue-600', 'focus:ring-blue-500'],
    };

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      baseClasses.push('cursor-pointer');
    }

    const classes = [
      ...baseClasses,
      ...sizeClasses[size],
      ...(colorClasses[color] ?? colorClasses['primary']),
    ];

    if (item.class) {
      classes.push(item.class);
    }

    return classes.join(' ');
  }

  getItemStyle(index: number): Record<string, string> {
    const direction = this.direction();
    const radius = this.radius();
    const items = this.model();
    const total = items.length;

    if (!this.isCircular()) {
      return {
        'animation-delay': `${index * 50}ms`,
      };
    }

    let startAngle: number;
    let endAngle: number;

    switch (direction) {
      case 'circle':
        startAngle = 0;
        endAngle = 360;
        break;
      case 'semi-circle-up':
        startAngle = 180;
        endAngle = 360;
        break;
      case 'semi-circle-down':
        startAngle = 0;
        endAngle = 180;
        break;
      case 'semi-circle-left':
        startAngle = 90;
        endAngle = 270;
        break;
      case 'semi-circle-right':
        startAngle = -90;
        endAngle = 90;
        break;
      default:
        startAngle = 0;
        endAngle = 360;
    }

    const range = endAngle - startAngle;
    const step = direction === 'circle' ? range / total : range / (total + 1);
    const angle = startAngle + step * (index + (direction === 'circle' ? 0.5 : 1));
    const radian = (angle * Math.PI) / 180;

    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    return {
      position: 'absolute',
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: 'translate(-50%, -50%)',
      'animation-delay': `${index * 50}ms`,
    };
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.hideOnClickOutside() && this.visible()) {
      this.hide();
    }
  }

  onContainerClick(event: Event): void {
    event.stopPropagation();
  }
}
