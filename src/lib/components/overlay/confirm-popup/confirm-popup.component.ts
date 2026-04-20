import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  HostListener,
  ElementRef,
  viewChild,
  effect,
} from '@angular/core';

import {
  LucideAngularModule,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
} from 'lucide-angular';

export type ConfirmPopupPosition = 'top' | 'bottom' | 'left' | 'right';
export type ConfirmPopupSeverity = 'info' | 'success' | 'warning' | 'danger' | 'help';

@Component({
  selector: 'ui-confirm-popup',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './confirm-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiConfirmPopupComponent {
  // Icons
  readonly severityIcons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    danger: XCircle,
    help: HelpCircle,
  };

  // Inputs
  readonly visible = model<boolean>(false);
  readonly message = input<string>('Are you sure?');
  readonly severity = input<ConfirmPopupSeverity>('warning');
  readonly position = input<ConfirmPopupPosition>('bottom');
  readonly acceptLabel = input<string>('Yes');
  readonly rejectLabel = input<string>('No');
  readonly dismissable = input<boolean>(true);

  // Outputs
  readonly onAccept = output<void>();
  readonly onReject = output<void>();

  // View refs
  readonly triggerElement = viewChild<ElementRef>('trigger');
  readonly popupElement = viewChild<ElementRef>('popup');

  // Computed
  readonly severityIcon = computed(() => this.severityIcons[this.severity()]);

  readonly severityClasses = computed(() => {
    const severityMap: Record<ConfirmPopupSeverity, string> = {
      info: 'text-blue-500 dark:text-blue-400',
      success: 'text-green-500 dark:text-green-400',
      warning: 'text-yellow-500 dark:text-yellow-400',
      danger: 'text-red-500 dark:text-red-400',
      help: 'text-purple-500 dark:text-purple-400',
    };
    return severityMap[this.severity()];
  });

  readonly acceptButtonClasses = computed(() => {
    const severityMap: Record<ConfirmPopupSeverity, string> = {
      info: 'bg-blue-500 hover:bg-blue-600',
      success: 'bg-green-500 hover:bg-green-600',
      warning: 'bg-yellow-500 hover:bg-yellow-600',
      danger: 'bg-red-500 hover:bg-red-600',
      help: 'bg-purple-500 hover:bg-purple-600',
    };
    return `px-3 py-1.5 text-sm font-medium text-white rounded transition-colors ${severityMap[this.severity()]}`;
  });

  readonly popupClasses = computed(() => {
    const base = [
      'absolute z-50',
      'bg-white dark:bg-gray-900',
      'border border-gray-200 dark:border-gray-700',
      'rounded-lg shadow-lg',
      'transition-all duration-200',
      'min-w-48',
    ];

    if (this.visible()) {
      base.push('opacity-100 scale-100');
    } else {
      base.push('opacity-0 scale-95 pointer-events-none');
    }

    return base.join(' ');
  });

  readonly positionClasses = computed(() => {
    const positionMap: Record<ConfirmPopupPosition, string> = {
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
    const positionMap: Record<ConfirmPopupPosition, string> = {
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
          const popup = this.popupElement()?.nativeElement;

          if (trigger && popup) {
            if (!trigger.contains(event.target) && !popup.contains(event.target)) {
              this.reject();
            }
          }
        };

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
      this.reject();
    }
  }

  show(): void {
    this.visible.set(true);
  }

  accept(): void {
    this.visible.set(false);
    this.onAccept.emit();
  }

  reject(): void {
    this.visible.set(false);
    this.onReject.emit();
  }
}
