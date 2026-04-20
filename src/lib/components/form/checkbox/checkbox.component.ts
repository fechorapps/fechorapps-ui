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

import { Check, LucideAngularModule, Minus } from 'lucide-angular';

/**
 * Checkbox sizes
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * UiCheckbox Component
 *
 * A customizable checkbox component with support for indeterminate state,
 * labels, and validation states.
 *
 * @example
 * ```html
 * <ui-checkbox [(ngModel)]="checked" label="Accept terms"></ui-checkbox>
 * <ui-checkbox [indeterminate]="true">Partial selection</ui-checkbox>
 * ```
 */
@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiCheckboxComponent),
      multi: true,
    },
  ],
  host: {
    class: 'inline-flex',
  },
})
export class UiCheckboxComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly checkIcon = Check;
  protected readonly minusIcon = Minus;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Checkbox size */
  readonly size = input<CheckboxSize>('md');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Whether checkbox is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether checkbox is in indeterminate state */
  readonly indeterminate = input<boolean>(false);

  /** Whether checkbox is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Input name attribute */
  readonly name = input<string>('');

  /** Input id attribute */
  readonly inputId = input<string>('');

  /** Value when checked (for form groups) */
  readonly checkboxValue = input<unknown>(true);

  /** Help text displayed below the checkbox */
  readonly helpText = input<string | undefined>(undefined);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Whether checkbox is checked */
  readonly checked = model<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when checkbox value changes */
  readonly onChange = output<boolean>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly iconSize = computed(() => {
    const sizeMap: Record<CheckboxSize, number> = {
      sm: 12,
      md: 14,
      lg: 16,
    };
    return sizeMap[this.size()];
  });

  readonly boxClasses = computed(() => {
    const size = this.size();
    const checked = this.checked();
    const indeterminate = this.indeterminate();
    const disabled = this.disabled();
    const invalid = this.invalid();
    const isActive = checked || indeterminate;

    const baseClasses = [
      'flex',
      'items-center',
      'justify-center',
      'rounded',
      'border-2',
      'transition-all',
      'duration-200',
    ];

    const sizeClasses: Record<CheckboxSize, string[]> = {
      sm: ['w-4', 'h-4'],
      md: ['w-5', 'h-5'],
      lg: ['w-6', 'h-6'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
      if (isActive) {
        stateClasses.push('bg-gray-400', 'border-gray-400');
      } else {
        stateClasses.push(
          'bg-gray-100',
          'border-gray-300',
          'dark:bg-gray-800',
          'dark:border-gray-600'
        );
      }
    } else if (invalid) {
      if (isActive) {
        stateClasses.push('bg-red-500', 'border-red-500');
      } else {
        stateClasses.push('border-red-500', 'bg-white', 'dark:bg-gray-900');
      }
    } else if (isActive) {
      stateClasses.push('bg-primary-500', 'border-primary-500');
    } else {
      stateClasses.push(
        'border-gray-300',
        'dark:border-gray-600',
        'bg-white',
        'dark:bg-gray-900',
        'hover:border-primary-400'
      );
    }

    return [...baseClasses, ...sizeClasses[size], ...stateClasses].join(' ');
  });

  readonly labelClasses = computed(() => {
    const size = this.size();
    const disabled = this.disabled();
    const invalid = this.invalid();

    const baseClasses = ['select-none'];

    const sizeClasses: Record<CheckboxSize, string[]> = {
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

  toggle(): void {
    if (this.disabled()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChangeFn(newValue);
    this.onTouchedFn();
    this.onChange.emit(newValue);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }
}
