import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { LucideAngularModule, Star } from 'lucide-angular';

/**
 * Rating sizes
 */
export type RatingSize = 'sm' | 'md' | 'lg';

/**
 * UiRating Component
 *
 * A star-based rating component.
 *
 * @example
 * ```html
 * <ui-rating [(ngModel)]="rating" [stars]="5"></ui-rating>
 * <ui-rating [(ngModel)]="rating" [readonly]="true"></ui-rating>
 * ```
 */
@Component({
  selector: 'ui-rating',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './rating.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiRatingComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiRatingComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly starIcon = Star;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Size */
  readonly size = input<RatingSize>('md');

  /** Number of stars */
  readonly stars = input<number>(5);

  /** Whether rating is readonly */
  readonly readonly = input<boolean>(false);

  /** Whether rating is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether to allow cancel (clicking same star clears) */
  readonly allowCancel = input<boolean>(true);

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Input id */
  readonly inputId = input<string>('');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Current rating value */
  readonly value = model<number | null>(null);

  /** Hovered star index */
  readonly hoveredIndex = model<number | null>(null);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on value change */
  readonly onRate = output<number | null>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: number | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: number | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly starsArray = computed(() => {
    return Array.from({ length: this.stars() }, (_, i) => i + 1);
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<RatingSize, number> = { sm: 16, md: 20, lg: 24 };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    return 'inline-block';
  });

  readonly containerClasses = computed(() => {
    const disabled = this.disabled();
    const readonly = this.readonly();

    const baseClasses = ['flex', 'items-center', 'gap-0.5'];

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    } else if (!readonly) {
      baseClasses.push('cursor-pointer');
    }

    return baseClasses.join(' ');
  });

  readonly labelClasses = computed(() => {
    return [
      'block',
      'text-sm',
      'font-medium',
      'mb-1.5',
      'text-gray-700',
      'dark:text-gray-300',
    ].join(' ');
  });

  readonly helpTextClasses = computed(() => {
    return ['text-xs', 'mt-1.5', 'text-gray-500', 'dark:text-gray-400'].join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  getStarClasses(starValue: number): string {
    const currentValue = this.value() ?? 0;
    const hoveredValue = this.hoveredIndex();
    const displayValue = hoveredValue !== null ? hoveredValue : currentValue;
    const isFilled = starValue <= displayValue;
    const disabled = this.disabled();
    const readonly = this.readonly();

    const baseClasses = ['transition-colors', 'duration-150'];

    if (isFilled) {
      baseClasses.push('text-yellow-400', 'fill-yellow-400');
    } else {
      baseClasses.push('text-gray-300', 'dark:text-gray-600');
    }

    if (!disabled && !readonly) {
      baseClasses.push('hover:scale-110', 'transform', 'transition-transform');
    }

    return baseClasses.join(' ');
  }

  onStarClick(starValue: number): void {
    if (this.disabled() || this.readonly()) return;

    const currentValue = this.value();

    if (currentValue === starValue && this.allowCancel()) {
      this.updateValue(null);
    } else {
      this.updateValue(starValue);
    }

    this.onTouchedFn();
  }

  onStarHover(starValue: number): void {
    if (this.disabled() || this.readonly()) return;
    this.hoveredIndex.set(starValue);
  }

  onStarLeave(): void {
    if (this.disabled() || this.readonly()) return;
    this.hoveredIndex.set(null);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    const currentValue = this.value() ?? 0;
    const maxStars = this.stars();

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        this.updateValue(Math.min(currentValue + 1, maxStars));
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        if (currentValue <= 1 && this.allowCancel()) {
          this.updateValue(null);
        } else {
          this.updateValue(Math.max(currentValue - 1, 1));
        }
        break;
      case 'Home':
        event.preventDefault();
        this.updateValue(1);
        break;
      case 'End':
        event.preventDefault();
        this.updateValue(maxStars);
        break;
    }
  }

  private updateValue(value: number | null): void {
    this.value.set(value);
    this.onChangeFn(value);
    this.onRate.emit(value);
  }
}
