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

/**
 * RadioButton sizes
 */
export type RadioButtonSize = 'sm' | 'md' | 'lg';

/**
 * UiRadioButton Component
 *
 * A customizable radio button component for single selection from a group.
 *
 * @example
 * ```html
 * <ui-radio-button [(ngModel)]="selected" value="option1" label="Option 1"></ui-radio-button>
 * <ui-radio-button [(ngModel)]="selected" value="option2" label="Option 2"></ui-radio-button>
 * ```
 */
@Component({
  selector: 'ui-radio-button',
  standalone: true,
  templateUrl: './radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiRadioButtonComponent),
      multi: true,
    },
  ],
  host: {
    class: 'inline-flex',
  },
})
export class UiRadioButtonComponent implements ControlValueAccessor {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Radio button size */
  readonly size = input<RadioButtonSize>('md');

  /** Value of this radio button */
  readonly value = input.required<unknown>();

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Whether radio is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether radio is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Input name attribute (groups radios together) */
  readonly name = input<string>('');

  /** Input id attribute */
  readonly inputId = input<string>('');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Currently selected value in the group */
  readonly modelValue = model<unknown>(null);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when radio is selected */
  readonly onSelect = output<unknown>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: unknown) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: unknown): void {
    this.modelValue.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly isSelected = computed(() => this.modelValue() === this.value());

  readonly outerClasses = computed(() => {
    const size = this.size();
    const selected = this.isSelected();
    const disabled = this.disabled();
    const invalid = this.invalid();

    const baseClasses = [
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'border-2',
      'transition-all',
      'duration-200',
    ];

    const sizeClasses: Record<RadioButtonSize, string[]> = {
      sm: ['w-4', 'h-4'],
      md: ['w-5', 'h-5'],
      lg: ['w-6', 'h-6'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
      if (selected) {
        stateClasses.push('border-gray-400');
      } else {
        stateClasses.push('border-gray-300', 'dark:border-gray-600');
      }
    } else if (invalid) {
      stateClasses.push('border-red-500');
    } else if (selected) {
      stateClasses.push('border-primary-500');
    } else {
      stateClasses.push('border-gray-300', 'dark:border-gray-600', 'hover:border-primary-400');
    }

    return [...baseClasses, ...sizeClasses[size], ...stateClasses].join(' ');
  });

  readonly innerClasses = computed(() => {
    const size = this.size();
    const selected = this.isSelected();
    const disabled = this.disabled();

    const baseClasses = ['rounded-full', 'transition-all', 'duration-200'];

    const sizeClasses: Record<RadioButtonSize, string[]> = {
      sm: ['w-2', 'h-2'],
      md: ['w-2.5', 'h-2.5'],
      lg: ['w-3', 'h-3'],
    };

    if (selected) {
      if (disabled) {
        baseClasses.push('bg-gray-400');
      } else {
        baseClasses.push('bg-primary-500');
      }
    } else {
      baseClasses.push('bg-transparent');
    }

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly labelClasses = computed(() => {
    const size = this.size();
    const disabled = this.disabled();
    const invalid = this.invalid();

    const baseClasses = ['select-none'];

    const sizeClasses: Record<RadioButtonSize, string[]> = {
      sm: ['text-sm', 'ml-2'],
      md: ['text-sm', 'ml-2.5'],
      lg: ['text-base', 'ml-3'],
    };

    if (disabled) {
      baseClasses.push('text-gray-400', 'cursor-not-allowed');
    } else if (invalid) {
      baseClasses.push('text-red-600', 'dark:text-red-400');
    } else {
      baseClasses.push('text-gray-700', 'dark:text-gray-300', 'cursor-pointer');
    }

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  select(): void {
    if (this.disabled() || this.isSelected()) return;

    const val = this.value();
    this.modelValue.set(val);
    this.onChangeFn(val);
    this.onTouchedFn();
    this.onSelect.emit(val);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select();
    }
  }
}
