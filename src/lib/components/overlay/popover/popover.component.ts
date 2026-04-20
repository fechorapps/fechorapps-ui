import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  signal,
  ElementRef,
  viewChild,
  effect,
  HostListener,
} from '@angular/core';

import { LucideAngularModule, X } from 'lucide-angular';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverTrigger = 'click' | 'hover' | 'focus';

@Component({
  selector: 'ui-popover',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPopoverComponent {
  // Icons
  readonly closeIcon = X;

  // Inputs
  readonly visible = model<boolean>(false);
  readonly position = input<PopoverPosition>('bottom');
  readonly trigger = input<PopoverTrigger>('click');
  readonly showCloseIcon = input<boolean>(false);
  readonly dismissable = input<boolean>(true);
  readonly showDelay = input<number>(0);
  readonly hideDelay = input<number>(0);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onShow = output<void>();
  readonly onHide = output<void>();

  // View refs
  readonly triggerElement = viewChild<ElementRef>('trigger');
  readonly popoverElement = viewChild<ElementRef>('popover');

  // Internal state
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  readonly isHovering = signal<boolean>(false);

  // Computed
  readonly popoverClasses = computed(() => {
    const base = [
      'absolute z-50',
      'bg-white dark:bg-gray-900',
      'border border-gray-200 dark:border-gray-700',
      'rounded-lg shadow-lg',
      'transition-all duration-200',
      this.styleClass(),
    ];

    if (this.visible()) {
      base.push('opacity-100 scale-100');
    } else {
      base.push('opacity-0 scale-95 pointer-events-none');
    }

    return base.join(' ');
  });

  readonly positionClasses = computed(() => {
    const positionMap: Record<PopoverPosition, string> = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };
    return positionMap[this.position()];
  });

  readonly arrowClasses = computed(() => {
    const base =
      'absolute w-3 h-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rotate-45';
    const positionMap: Record<PopoverPosition, string> = {
      top: 'top-full left-1/2 -translate-x-1/2 -mt-1.5 border-t-0 border-l-0',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1.5 border-b-0 border-r-0',
      left: 'left-full top-1/2 -translate-y-1/2 -ml-1.5 border-l-0 border-b-0',
      right: 'right-full top-1/2 -translate-y-1/2 -mr-1.5 border-r-0 border-t-0',
    };
    return `${base} ${positionMap[this.position()]}`;
  });

  constructor() {
    // Handle click outside
    effect(() => {
      if (this.visible() && this.dismissable()) {
        const handleClickOutside = (event: MouseEvent) => {
          const trigger = this.triggerElement()?.nativeElement;
          const popover = this.popoverElement()?.nativeElement;

          if (trigger && popover) {
            if (!trigger.contains(event.target) && !popover.contains(event.target)) {
              this.hide();
            }
          }
        };

        // Delay to avoid immediate closing
        setTimeout(() => {
          document.addEventListener('click', handleClickOutside);
        }, 0);

        return () => document.removeEventListener('click', handleClickOutside);
      }
      return;
    });
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.visible() && this.dismissable()) {
      this.hide();
    }
  }

  onTriggerClick(): void {
    if (this.trigger() === 'click') {
      this.toggle();
    }
  }

  onTriggerMouseEnter(): void {
    if (this.trigger() === 'hover') {
      this.isHovering.set(true);
      this.show();
    }
  }

  onTriggerMouseLeave(): void {
    if (this.trigger() === 'hover') {
      this.isHovering.set(false);
      // Delay hide to allow moving to popover
      setTimeout(() => {
        if (!this.isHovering()) {
          this.hide();
        }
      }, 100);
    }
  }

  onPopoverMouseEnter(): void {
    if (this.trigger() === 'hover') {
      this.isHovering.set(true);
    }
  }

  onPopoverMouseLeave(): void {
    if (this.trigger() === 'hover') {
      this.isHovering.set(false);
      this.hide();
    }
  }

  onTriggerFocus(): void {
    if (this.trigger() === 'focus') {
      this.show();
    }
  }

  onTriggerBlur(): void {
    if (this.trigger() === 'focus') {
      this.hide();
    }
  }

  toggle(): void {
    if (this.visible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  show(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    const delay = this.showDelay();
    if (delay > 0) {
      this.showTimeout = setTimeout(() => {
        this.visible.set(true);
        this.onShow.emit();
      }, delay);
    } else {
      this.visible.set(true);
      this.onShow.emit();
    }
  }

  hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    const delay = this.hideDelay();
    if (delay > 0) {
      this.hideTimeout = setTimeout(() => {
        this.visible.set(false);
        this.onHide.emit();
      }, delay);
    } else {
      this.visible.set(false);
      this.onHide.emit();
    }
  }
}
