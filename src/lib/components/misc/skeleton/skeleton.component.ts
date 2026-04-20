import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Skeleton shape variants (matches PrimeNG)
 * - rectangle: Standard rectangular block (default)
 * - circle: Perfect circle (use with size prop)
 * - rounded: Square with rounded corners
 * - square: Perfect square without rounded corners
 */
export type SkeletonShape = 'rectangle' | 'circle' | 'rounded' | 'square';

/**
 * Skeleton animation types
 * - pulse: Opacity animation (default)
 * - wave: Shimmer effect moving across
 * - none: No animation
 */
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

/**
 * Skeleton sizes
 */
export type SkeletonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * UiSkeleton Component
 *
 * A placeholder loading component that mimics content structure.
 * Compatible with PrimeNG skeleton API.
 *
 * @example
 * ```html
 * <!-- Rectangle (default) -->
 * <ui-skeleton width="100%" height="2rem" />
 *
 * <!-- Circle avatar -->
 * <ui-skeleton shape="circle" size="3rem" />
 *
 * <!-- Rounded square -->
 * <ui-skeleton shape="rounded" size="4rem" />
 *
 * <!-- With custom border radius -->
 * <ui-skeleton width="100%" height="120px" borderRadius="16px" />
 *
 * <!-- Wave animation -->
 * <ui-skeleton animation="wave" width="100%" height="1rem" />
 * ```
 */
@Component({
  selector: 'ui-skeleton',
  standalone: true,
  template: `
    <div [class]="containerClasses()" [style]="containerStyles()">
      @if (animation() === 'wave') {
        <div class="skeleton-wave"></div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .skeleton-wave {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: wave 1.5s infinite;
    }

    @keyframes wave {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    :host-context(.dark) .skeleton-wave {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSkeletonComponent {
  /** Width of the skeleton (CSS value) */
  readonly width = input<string>('100%');

  /** Height of the skeleton (CSS value) */
  readonly height = input<string>('1rem');

  /** Size for circle/square shapes (overrides width/height) */
  readonly size = input<string | undefined>(undefined);

  /** Shape of the skeleton */
  readonly shape = input<SkeletonShape>('rectangle');

  /** Custom border radius (overrides shape-based radius) */
  readonly borderRadius = input<string | undefined>(undefined);

  /** Animation type */
  readonly animation = input<SkeletonAnimation>('pulse');

  readonly containerClasses = computed(() => {
    const animation = this.animation();
    const shape = this.shape();
    const borderRadius = this.borderRadius();

    const classes = ['relative', 'overflow-hidden', 'bg-gray-200', 'dark:bg-gray-700'];

    // Animation classes
    if (animation === 'pulse') {
      classes.push('animate-pulse');
    }

    // Shape classes (only if no custom borderRadius)
    if (!borderRadius) {
      switch (shape) {
        case 'circle':
          classes.push('rounded-full');
          break;
        case 'rounded':
          classes.push('rounded-xl');
          break;
        case 'square':
          // No rounded corners
          break;
        case 'rectangle':
        default:
          classes.push('rounded');
          break;
      }
    }

    return classes.join(' ');
  });

  readonly containerStyles = computed(() => {
    const size = this.size();
    const shape = this.shape();
    const borderRadius = this.borderRadius();

    const styles: Record<string, string> = {};

    // Size handling for circle, rounded, and square
    if (size && (shape === 'circle' || shape === 'rounded' || shape === 'square')) {
      styles['width'] = size;
      styles['height'] = size;
    } else {
      styles['width'] = this.width();
      styles['height'] = this.height();
    }

    // Custom border radius
    if (borderRadius) {
      styles['border-radius'] = borderRadius;
    }

    return styles;
  });
}
