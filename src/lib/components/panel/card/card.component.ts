import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

/**
 * Card variants available in the design system
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';

/**
 * Card padding options
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * UiCard Component
 *
 * A versatile card component for displaying content in a contained format.
 * Supports multiple variants, optional header/footer, and content projection.
 *
 * @example
 * ```html
 * <ui-card title="Card Title" subtitle="Optional subtitle">
 *   <p>Card content goes here</p>
 * </ui-card>
 *
 * <ui-card variant="elevated" [hoverable]="true" (cardClick)="onClick()">
 *   <ng-container header>Custom Header</ng-container>
 *   <p>Content</p>
 *   <ng-container footer>
 *     <ui-button>Action</ui-button>
 *   </ng-container>
 * </ui-card>
 * ```
 */
@Component({
  selector: 'ui-card',
  standalone: true,
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiCardComponent {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Card visual variant */
  readonly variant = input<CardVariant>('default');

  /** Card title (displayed in header) */
  readonly title = input<string | undefined>(undefined);

  /** Card subtitle (displayed below title) */
  readonly subtitle = input<string | undefined>(undefined);

  /** Card padding size */
  readonly padding = input<CardPadding>('md');

  /** Whether card has hover effect */
  readonly hoverable = input<boolean>(false);

  /** Whether card is clickable */
  readonly clickable = input<boolean>(false);

  /** Image URL to display at top of card */
  readonly imageUrl = input<string | undefined>(undefined);

  /** Image alt text */
  readonly imageAlt = input<string>('');

  /** Whether to show dividers between sections */
  readonly dividers = input<boolean>(false);

  /** Whether card takes full height */
  readonly fullHeight = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when card is clicked (only if clickable) */
  readonly cardClick = output<MouseEvent>();

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Whether to show the header section */
  readonly showHeader = computed(() => !!this.title() || !!this.subtitle());

  /** CSS classes for the card container */
  readonly cardClasses = computed(() => {
    const variant = this.variant();
    const hoverable = this.hoverable();
    const clickable = this.clickable();
    const fullHeight = this.fullHeight();

    const baseClasses = ['rounded-xl', 'overflow-hidden', 'transition-all', 'duration-200'];

    // Variant classes — Metronic semantic tokens
    const variantClasses: Record<CardVariant, string[]> = {
      default: ['bg-card', 'text-card-foreground', 'border', 'border-border', 'shadow-sm'],
      elevated: ['bg-card', 'text-card-foreground', 'shadow-lg'],
      outlined: ['bg-transparent', 'border-2', 'border-border'],
      ghost: ['bg-secondary', 'text-secondary-foreground'],
    };

    // Hover classes
    const hoverClasses = hoverable
      ? ['hover:shadow-xl', 'hover:-translate-y-0.5', 'dark:hover:shadow-gray-900/70']
      : [];

    // Clickable classes
    const clickableClasses = clickable ? ['cursor-pointer', 'active:scale-[0.98]'] : [];

    // Full height
    const heightClasses = fullHeight ? ['h-full', 'flex', 'flex-col'] : [];

    return [
      ...baseClasses,
      ...variantClasses[variant],
      ...hoverClasses,
      ...clickableClasses,
      ...heightClasses,
    ].join(' ');
  });

  /** CSS classes for content padding */
  readonly contentClasses = computed(() => {
    const padding = this.padding();
    const fullHeight = this.fullHeight();

    const paddingClasses: Record<CardPadding, string> = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    const flexClasses = fullHeight ? 'flex-1' : '';

    return `${paddingClasses[padding]} ${flexClasses}`.trim();
  });

  /** CSS classes for header padding */
  readonly headerClasses = computed(() => {
    const padding = this.padding();
    const dividers = this.dividers();

    const paddingClasses: Record<CardPadding, string> = {
      none: 'p-0',
      sm: 'px-3 pt-3 pb-2',
      md: 'px-4 pt-4 pb-3',
      lg: 'px-6 pt-6 pb-4',
    };

    const dividerClass = dividers ? 'border-b border-border' : '';

    return `${paddingClasses[padding]} ${dividerClass}`.trim();
  });

  /** CSS classes for footer padding */
  readonly footerClasses = computed(() => {
    const padding = this.padding();
    const dividers = this.dividers();

    const paddingClasses: Record<CardPadding, string> = {
      none: 'p-0',
      sm: 'px-3 pb-3 pt-2',
      md: 'px-4 pb-4 pt-3',
      lg: 'px-6 pb-6 pt-4',
    };

    const dividerClass = dividers ? 'border-t border-border' : '';

    return `${paddingClasses[padding]} ${dividerClass}`.trim();
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  /**
   * Handle card click
   */
  onClick(event: MouseEvent): void {
    if (this.clickable()) {
      this.cardClick.emit(event);
    }
  }
}
