import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { ChevronDown, LucideAngularModule, LucideIconData } from 'lucide-angular';

/**
 * SplitButton variant options
 */
export type SplitButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * SplitButton size options
 */
export type SplitButtonSize = 'sm' | 'md' | 'lg';

/**
 * SplitButton menu item
 */
export interface SplitButtonItem {
  /** Display label */
  label: string;
  /** Icon for the item */
  icon?: LucideIconData;
  /** Command to execute on click */
  command?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether the item is visible */
  visible?: boolean;
  /** Whether this is a separator */
  separator?: boolean;
  /** Custom CSS class */
  class?: string;
}

/**
 * UiSplitButton Component
 *
 * A button with a dropdown menu for additional actions.
 *
 * @example
 * ```html
 * <ui-split-button
 *   label="Save"
 *   [icon]="saveIcon"
 *   [items]="menuItems"
 *   (onClick)="save()"
 * ></ui-split-button>
 * ```
 */
@Component({
  selector: 'ui-split-button',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './split-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-block',
  },
})
export class UiSplitButtonComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly chevronIcon = ChevronDown;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  readonly dropdownRef = viewChild<ElementRef>('dropdown');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Button label */
  readonly label = input.required<string>();

  /** Button icon */
  readonly icon = input<LucideIconData | undefined>(undefined);

  /** Menu items for dropdown */
  readonly items = input.required<SplitButtonItem[]>();

  /** Button variant/severity */
  readonly variant = input<SplitButtonVariant>('primary');

  /** Button size */
  readonly size = input<SplitButtonSize>('md');

  /** Whether button is disabled */
  readonly disabled = input<boolean>(false);

  /** Outlined style */
  readonly outlined = input<boolean>(false);

  /** Text style (no background) */
  readonly text = input<boolean>(false);

  /** Raised style with shadow */
  readonly raised = input<boolean>(false);

  /** Rounded corners */
  readonly rounded = input<boolean>(false);

  /** Icon position */
  readonly iconPos = input<'left' | 'right'>('left');

  /** ARIA label for dropdown button */
  readonly dropdownAriaLabel = input<string>('More options');

  // =========================================================================
  // STATE
  // =========================================================================

  /** Whether dropdown is open */
  readonly isOpen = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when main button is clicked */
  readonly onClick = output<MouseEvent>();

  /** Emitted when dropdown button is clicked */
  readonly onDropdownClick = output<MouseEvent>();

  /** Emitted when a menu item is clicked */
  readonly onItemClick = output<SplitButtonItem>();

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly visibleItems = computed(() => {
    return this.items().filter((item) => item.visible !== false);
  });

  readonly mainButtonClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const disabled = this.disabled();
    const outlined = this.outlined();
    const text = this.text();
    const raised = this.raised();
    const rounded = this.rounded();

    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
    ];

    // Size classes
    const sizeClasses: Record<SplitButtonSize, string[]> = {
      sm: ['px-3', 'py-1.5', 'text-sm'],
      md: ['px-4', 'py-2', 'text-sm'],
      lg: ['px-5', 'py-2.5', 'text-base'],
    };

    // Variant classes
    const variantClasses = this.getVariantClasses(variant, outlined, text);

    // Rounded
    if (rounded) {
      baseClasses.push('rounded-l-full');
    } else {
      baseClasses.push('rounded-l-lg');
    }

    // Raised
    if (raised && !text) {
      baseClasses.push('shadow-md', 'hover:shadow-lg');
    }

    // Disabled
    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      baseClasses.push('cursor-pointer');
    }

    return [...baseClasses, ...sizeClasses[size], ...variantClasses].join(' ');
  });

  readonly dropdownButtonClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const disabled = this.disabled();
    const outlined = this.outlined();
    const text = this.text();
    const raised = this.raised();
    const rounded = this.rounded();

    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'border-l',
    ];

    // Size classes
    const sizeClasses: Record<SplitButtonSize, string[]> = {
      sm: ['px-2', 'py-1.5'],
      md: ['px-2.5', 'py-2'],
      lg: ['px-3', 'py-2.5'],
    };

    // Variant classes
    const variantClasses = this.getVariantClasses(variant, outlined, text);

    // Border separator
    if (outlined || text) {
      baseClasses.push('border-l-current', 'border-opacity-50');
    } else {
      baseClasses.push('border-l-white/30');
    }

    // Rounded
    if (rounded) {
      baseClasses.push('rounded-r-full');
    } else {
      baseClasses.push('rounded-r-lg');
    }

    // Raised
    if (raised && !text) {
      baseClasses.push('shadow-md', 'hover:shadow-lg');
    }

    // Disabled
    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      baseClasses.push('cursor-pointer');
    }

    return [...baseClasses, ...sizeClasses[size], ...variantClasses].join(' ');
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<SplitButtonSize, number> = {
      sm: 14,
      md: 16,
      lg: 18,
    };
    return sizeMap[this.size()];
  });

  readonly chevronSize = computed(() => {
    const sizeMap: Record<SplitButtonSize, number> = {
      sm: 12,
      md: 14,
      lg: 16,
    };
    return sizeMap[this.size()];
  });

  readonly menuItemClasses = computed(() => {
    const size = this.size();

    const sizeClasses: Record<SplitButtonSize, string[]> = {
      sm: ['px-3', 'py-1.5', 'text-sm'],
      md: ['px-4', 'py-2', 'text-sm'],
      lg: ['px-4', 'py-2.5', 'text-base'],
    };

    return sizeClasses[size].join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  private getVariantClasses(
    variant: SplitButtonVariant,
    outlined: boolean,
    text: boolean
  ): string[] {
    const colors: Record<
      SplitButtonVariant,
      { bg: string; hover: string; ring: string; border: string; textColor: string }
    > = {
      primary: {
        bg: 'bg-primary',
        hover: 'hover:bg-primary-600',
        ring: 'focus:ring-primary',
        border: 'border-primary',
        textColor: 'text-primary-600',
      },
      secondary: {
        bg: 'bg-gray-500',
        hover: 'hover:bg-gray-600',
        ring: 'focus:ring-gray-500',
        border: 'border-gray-500',
        textColor: 'text-gray-600',
      },
      success: {
        bg: 'bg-green-500',
        hover: 'hover:bg-green-600',
        ring: 'focus:ring-green-500',
        border: 'border-green-500',
        textColor: 'text-green-600',
      },
      warning: {
        bg: 'bg-yellow-500',
        hover: 'hover:bg-yellow-600',
        ring: 'focus:ring-yellow-500',
        border: 'border-yellow-500',
        textColor: 'text-yellow-600',
      },
      danger: {
        bg: 'bg-red-500',
        hover: 'hover:bg-red-600',
        ring: 'focus:ring-red-500',
        border: 'border-red-500',
        textColor: 'text-red-600',
      },
      info: {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        ring: 'focus:ring-blue-500',
        border: 'border-blue-500',
        textColor: 'text-blue-600',
      },
    };

    const color = colors[variant];

    if (text) {
      return [
        'bg-transparent',
        color.textColor,
        `hover:bg-${variant === 'primary' ? 'primary' : variant}-50`,
        'dark:hover:bg-gray-800',
        color.ring,
      ];
    }

    if (outlined) {
      return [
        'bg-transparent',
        'border-2',
        color.border,
        color.textColor,
        `hover:${color.bg}`,
        'hover:text-white',
        color.ring,
      ];
    }

    return [color.bg, color.hover, 'text-white', color.ring];
  }

  toggleDropdown(event: MouseEvent): void {
    if (this.disabled()) return;

    event.stopPropagation();
    this.isOpen.update((v) => !v);
    this.onDropdownClick.emit(event);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  onMainClick(event: MouseEvent): void {
    if (this.disabled()) return;
    this.onClick.emit(event);
  }

  onMenuItemClick(item: SplitButtonItem, event: MouseEvent): void {
    event.stopPropagation();

    if (item.disabled || item.separator) return;

    this.onItemClick.emit(item);

    if (item.command) {
      item.command();
    }

    this.closeDropdown();
  }

  getItemClasses(item: SplitButtonItem): string {
    const baseClasses = [
      'flex',
      'items-center',
      'gap-2',
      'w-full',
      'text-left',
      'transition-colors',
      'duration-150',
      this.menuItemClasses(),
    ];

    if (item.separator) {
      return 'border-t border-gray-200 dark:border-gray-700 my-1';
    }

    if (item.disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed', 'text-gray-400');
    } else {
      baseClasses.push(
        'cursor-pointer',
        'text-gray-700',
        'dark:text-gray-300',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-700'
      );
    }

    if (item.class) {
      baseClasses.push(item.class);
    }

    return baseClasses.join(' ');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isOpen()) {
      this.closeDropdown();
    }
  }
}
