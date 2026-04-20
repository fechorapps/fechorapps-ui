import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export type BadgeSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'contrast';
export type BadgeSize = 'small' | 'normal' | 'large' | 'xlarge';

@Component({
  selector: 'ui-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBadgeComponent {
  // Inputs
  readonly value = input<string | number>('');
  readonly severity = input<BadgeSeverity>('primary');
  readonly size = input<BadgeSize>('normal');
  readonly styleClass = input<string>('');

  // Computed
  readonly badgeClasses = computed(() => {
    const severity = this.severity();
    const size = this.size();
    const hasValue = this.value() !== '' && this.value() !== null && this.value() !== undefined;

    const base = ['inline-flex', 'items-center', 'justify-center', 'font-medium', 'leading-none'];

    // Size determines if it's a dot badge or a value badge
    const sizeClasses: Record<BadgeSize, string[]> = {
      small: hasValue
        ? ['min-w-5', 'h-5', 'px-1.5', 'text-xs', 'rounded-full']
        : ['w-2', 'h-2', 'rounded-full'],
      normal: hasValue
        ? ['min-w-6', 'h-6', 'px-2', 'text-xs', 'rounded-full']
        : ['w-2.5', 'h-2.5', 'rounded-full'],
      large: hasValue
        ? ['min-w-7', 'h-7', 'px-2.5', 'text-sm', 'rounded-full']
        : ['w-3', 'h-3', 'rounded-full'],
      xlarge: hasValue
        ? ['min-w-8', 'h-8', 'px-3', 'text-sm', 'rounded-full']
        : ['w-4', 'h-4', 'rounded-full'],
    };

    // Metronic semantic severity classes
    const severityClasses: Record<BadgeSeverity, string[]> = {
      primary: ['bg-primary/10', 'text-primary'],
      secondary: ['bg-secondary', 'text-secondary-foreground'],
      success: ['bg-green-100', 'text-green-700', 'dark:bg-green-900/30', 'dark:text-green-400'],
      info: ['bg-blue-100', 'text-blue-700', 'dark:bg-blue-900/30', 'dark:text-blue-400'],
      warn: ['bg-amber-100', 'text-amber-700', 'dark:bg-amber-900/30', 'dark:text-amber-400'],
      danger: ['bg-destructive/10', 'text-destructive'],
      contrast: ['bg-foreground', 'text-background'],
    };

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return [...base, ...sizeClasses[size], ...severityClasses[severity]].join(' ');
  });
}
