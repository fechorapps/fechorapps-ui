import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { Loader2, LucideAngularModule, type LucideIconData } from 'lucide-angular';

/**
 * Button variants available in the design system
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button sizes available in the design system
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * UiButton Component
 *
 * A customizable button component that follows the Appcordion design system.
 * Supports multiple variants, sizes, states, and Lucide icons.
 *
 * @example
 * ```html
 * <ui-button variant="primary" size="md">Click me</ui-button>
 * <ui-button variant="outline" [loading]="true">Loading...</ui-button>
 * <ui-button variant="danger" [disabled]="true">Disabled</ui-button>
 * <ui-button [icon]="PlusIcon">Add Item</ui-button>
 * <ui-button [icon]="SaveIcon" iconOnly>Save</ui-button>
 * ```
 */
@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-block',
  },
})
export class UiButtonComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  /** Loader icon for loading state */
  protected readonly loaderIcon = Loader2;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Button visual variant */
  readonly variant = input<ButtonVariant>('primary');

  /** Button size */
  readonly size = input<ButtonSize>('md');

  /** Whether the button is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether to show loading state */
  readonly loading = input<boolean>(false);

  /** Button type attribute */
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  /** Lucide icon to display before text */
  readonly icon = input<LucideIconData | undefined>(undefined);

  /** Lucide icon to display after text */
  readonly iconEnd = input<LucideIconData | undefined>(undefined);

  /** Whether button should take full width */
  readonly fullWidth = input<boolean>(false);

  /** Whether button should only show icon (no text) */
  readonly iconOnly = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when button is clicked (not emitted when disabled or loading) */
  readonly clicked = output<MouseEvent>();

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Whether button should be in disabled state */
  readonly isDisabled = computed(() => this.disabled() || this.loading());

  /** Icon size based on button size */
  readonly iconSize = computed(() => {
    const sizeMap: Record<ButtonSize, number> = {
      sm: 14,
      md: 16,
      lg: 18,
    };
    return sizeMap[this.size()];
  });

  /** CSS classes for the button */
  readonly buttonClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const fullWidth = this.fullWidth();
    const isDisabled = this.isDisabled();
    const iconOnly = this.iconOnly();

    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'rounded-lg',
      'transition-colors',
      'duration-150',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
    ];

    // Size classes
    const sizeClasses: Record<ButtonSize, string[]> = {
      sm: iconOnly ? ['p-1.5', 'text-sm'] : ['px-3', 'py-1.5', 'text-sm'],
      md: iconOnly ? ['p-2', 'text-sm'] : ['px-4', 'py-2', 'text-sm'],
      lg: iconOnly ? ['p-2.5', 'text-base'] : ['px-6', 'py-2.5', 'text-base'],
    };

    // Variant classes — Metronic semantic tokens
    const variantClasses: Record<ButtonVariant, string[]> = {
      primary: [
        'bg-primary',
        'text-primary-foreground',
        'hover:bg-primary/90',
        'active:bg-primary/80',
      ],
      secondary: [
        'bg-secondary',
        'text-secondary-foreground',
        'hover:bg-secondary/80',
        'active:bg-secondary/70',
      ],
      outline: [
        'border',
        'border-border',
        'bg-transparent',
        'text-foreground',
        'hover:bg-accent',
        'hover:text-accent-foreground',
      ],
      ghost: [
        'bg-transparent',
        'text-muted-foreground',
        'hover:bg-accent',
        'hover:text-accent-foreground',
      ],
      danger: [
        'bg-destructive',
        'text-destructive-foreground',
        'hover:bg-destructive/90',
        'active:bg-destructive/80',
      ],
    };

    // Disabled classes
    const disabledClasses = isDisabled
      ? ['opacity-50', 'cursor-not-allowed', 'pointer-events-none']
      : ['cursor-pointer'];

    // Full width classes
    const widthClasses = fullWidth ? ['w-full'] : [];

    return [
      ...baseClasses,
      ...sizeClasses[size],
      ...variantClasses[variant],
      ...disabledClasses,
      ...widthClasses,
    ].join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  /**
   * Handle button click
   */
  onClick(event: MouseEvent): void {
    if (!this.isDisabled()) {
      this.clicked.emit(event);
    }
  }
}
