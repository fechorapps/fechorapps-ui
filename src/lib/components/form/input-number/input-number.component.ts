import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ChevronDown, ChevronUp, LucideAngularModule, Minus, Plus } from 'lucide-angular';

/**
 * InputNumber variants
 */
export type InputNumberVariant = 'default' | 'filled' | 'outlined';

/**
 * InputNumber sizes
 */
export type InputNumberSize = 'sm' | 'md' | 'lg';

/**
 * Button layout
 */
export type InputNumberButtonLayout = 'stacked' | 'horizontal' | 'none';

/**
 * UiInputNumber Component
 *
 * A numeric input with increment/decrement buttons.
 *
 * @example
 * ```html
 * <ui-input-number [(ngModel)]="quantity" [min]="0" [max]="100"></ui-input-number>
 * <ui-input-number [step]="0.5" [showButtons]="true"></ui-input-number>
 * ```
 */
@Component({
  selector: 'ui-input-number',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './input-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputNumberComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiInputNumberComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly plusIcon = Plus;
  protected readonly minusIcon = Minus;
  protected readonly upIcon = ChevronUp;
  protected readonly downIcon = ChevronDown;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<InputNumberVariant>('default');

  /** Size */
  readonly size = input<InputNumberSize>('md');

  /** Minimum value */
  readonly min = input<number | undefined>(undefined);

  /** Maximum value */
  readonly max = input<number | undefined>(undefined);

  /** Step value */
  readonly step = input<number>(1);

  /** Placeholder */
  readonly placeholder = input<string>('');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Whether to show increment/decrement buttons */
  readonly showButtons = input<boolean>(true);

  /** Button layout */
  readonly buttonLayout = input<InputNumberButtonLayout>('stacked');

  /** Prefix text */
  readonly prefix = input<string | undefined>(undefined);

  /** Suffix text */
  readonly suffix = input<string | undefined>(undefined);

  /** Whether input takes full width */
  readonly fullWidth = input<boolean>(true);

  /** Input name */
  readonly name = input<string>('');

  /** Input id */
  readonly inputId = input<string>('');

  /** Decimal places */
  readonly decimals = input<number>(0);

  /** Use grouping (thousands separator) */
  readonly useGrouping = input<boolean>(false);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Current value */
  readonly value = model<number | null>(null);

  /** Focus state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on value change */
  readonly onInput = output<number | null>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

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

  readonly displayValue = computed(() => {
    const val = this.value();
    if (val === null || val === undefined) return '';

    const decimals = this.decimals();
    const useGrouping = this.useGrouping();

    return val.toLocaleString('es-MX', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    });
  });

  readonly canIncrement = computed(() => {
    const val = this.value() ?? 0;
    const max = this.max();
    return max === undefined || val < max;
  });

  readonly canDecrement = computed(() => {
    const val = this.value() ?? 0;
    const min = this.min();
    return min === undefined || val > min;
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<InputNumberSize, number> = { sm: 12, md: 14, lg: 16 };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-block';
  });

  readonly containerClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const invalid = this.invalid();
    const disabled = this.disabled();
    const focused = this.focused();
    const layout = this.buttonLayout();

    const baseClasses = [
      'flex',
      'items-center',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
      'overflow-hidden',
    ];

    const sizeClasses: Record<InputNumberSize, string[]> = {
      sm: ['h-8'],
      md: ['h-10'],
      lg: ['h-12'],
    };

    const variantClasses: Record<InputNumberVariant, string[]> = {
      default: ['bg-white', 'dark:bg-gray-900', 'border-gray-300', 'dark:border-gray-600'],
      filled: ['bg-gray-100', 'dark:bg-gray-800', 'border-transparent'],
      outlined: ['bg-transparent', 'border-gray-300', 'dark:border-gray-600'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else if (invalid) {
      stateClasses.push('border-red-500');
    } else if (focused) {
      stateClasses.push('border-primary-500', 'ring-2', 'ring-primary-500/20');
    } else {
      stateClasses.push('hover:border-gray-400');
    }

    return [...baseClasses, ...sizeClasses[size], ...variantClasses[variant], ...stateClasses].join(
      ' '
    );
  });

  readonly inputClasses = computed(() => {
    const size = this.size();

    const baseClasses = [
      'flex-1',
      'min-w-0',
      'bg-transparent',
      'border-none',
      'outline-none',
      'text-center',
      'text-gray-900',
      'dark:text-white',
      'placeholder:text-gray-400',
    ];

    const sizeClasses: Record<InputNumberSize, string[]> = {
      sm: ['text-sm', 'px-2'],
      md: ['text-sm', 'px-3'],
      lg: ['text-base', 'px-4'],
    };

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly buttonClasses = computed(() => {
    const disabled = this.disabled();

    const baseClasses = [
      'flex',
      'items-center',
      'justify-center',
      'transition-colors',
      'text-gray-500',
      'dark:text-gray-400',
    ];

    if (disabled) {
      baseClasses.push('cursor-not-allowed');
    } else {
      baseClasses.push(
        'hover:bg-gray-100',
        'dark:hover:bg-gray-800',
        'hover:text-gray-700',
        'cursor-pointer'
      );
    }

    return baseClasses.join(' ');
  });

  readonly labelClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['block', 'text-sm', 'font-medium', 'mb-1.5'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
    );
    return baseClasses.join(' ');
  });

  readonly helpTextClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['text-xs', 'mt-1.5'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
    );
    return baseClasses.join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  increment(): void {
    if (this.disabled() || !this.canIncrement()) return;

    const current = this.value() ?? 0;
    const step = this.step();
    const max = this.max();
    let newValue = current + step;

    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    this.updateValue(newValue);
  }

  decrement(): void {
    if (this.disabled() || !this.canDecrement()) return;

    const current = this.value() ?? 0;
    const step = this.step();
    const min = this.min();
    let newValue = current - step;

    if (min !== undefined && newValue < min) {
      newValue = min;
    }

    this.updateValue(newValue);
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value.replace(/[^0-9.-]/g, '');

    if (inputValue === '' || inputValue === '-') {
      this.updateValue(null);
      return;
    }

    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      this.updateValue(this.clampValue(parsed));
    }
  }

  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.onTouchedFn();
    this.onBlur.emit(event);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.increment();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.decrement();
    }
  }

  private updateValue(value: number | null): void {
    this.value.set(value);
    this.onChangeFn(value);
    this.onInput.emit(value);
  }

  private clampValue(value: number): number {
    const min = this.min();
    const max = this.max();

    if (min !== undefined && value < min) return min;
    if (max !== undefined && value > max) return max;

    return value;
  }
}
