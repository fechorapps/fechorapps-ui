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

import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

/**
 * Select button sizes
 */
export type SelectButtonSize = 'sm' | 'md' | 'lg';

/**
 * Select button option
 */
export interface SelectButtonOption<T = unknown> {
  label: string;
  value: T;
  icon?: LucideIconData;
  disabled?: boolean;
}

/**
 * UiSelectButton Component
 *
 * A group of buttons for selecting a single or multiple options.
 *
 * @example
 * ```html
 * <ui-select-button [(ngModel)]="selected" [options]="options"></ui-select-button>
 * <ui-select-button [(ngModel)]="selected" [options]="options" [multiple]="true"></ui-select-button>
 * ```
 */
@Component({
  selector: 'ui-select-button',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './select-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelectButtonComponent),
      multi: true,
    },
  ],
  host: {
    class: 'inline-block',
  },
})
export class UiSelectButtonComponent<T = unknown> implements ControlValueAccessor {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Size */
  readonly size = input<SelectButtonSize>('md');

  /** Options */
  readonly options = input<SelectButtonOption<T>[]>([]);

  /** Allow multiple selection */
  readonly multiple = input<boolean>(false);

  /** Allow unselecting all options */
  readonly allowEmpty = input<boolean>(true);

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is invalid */
  readonly invalid = input<boolean>(false);

  /** Field to use as value (for object options) */
  readonly optionValue = input<string | undefined>(undefined);

  /** Field to use as label (for object options) */
  readonly optionLabel = input<string | undefined>(undefined);

  // =========================================================================
  // MODEL
  // =========================================================================

  /** Selected value(s) */
  readonly value = model<T | T[] | null>(null);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when selection changes */
  readonly onChange = output<T | T[] | null>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: T | T[] | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: T | T[] | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly iconSize = computed(() => {
    const sizeMap: Record<SelectButtonSize, number> = { sm: 14, md: 16, lg: 18 };
    return sizeMap[this.size()];
  });

  readonly containerClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['inline-flex', 'rounded-lg', 'border', 'overflow-hidden'];

    if (invalid) {
      baseClasses.push('border-red-500');
    } else {
      baseClasses.push('border-gray-300', 'dark:border-gray-600');
    }

    return baseClasses.join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  getOptionClasses(option: SelectButtonOption<T>, index: number): string {
    const size = this.size();
    const disabled = this.disabled() || option.disabled;
    const selected = this.isSelected(option);
    const options = this.options();
    const hasIcon = !!option.icon;

    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-1.5',
      'font-medium',
      'transition-all',
      'duration-200',
      'border-r',
      'border-gray-300',
      'dark:border-gray-600',
      'last:border-r-0',
    ];

    const sizeClasses: Record<SelectButtonSize, string[]> = {
      sm: ['text-xs', hasIcon && !option.label ? 'px-2 py-1.5' : 'px-3 py-1.5'],
      md: ['text-sm', hasIcon && !option.label ? 'px-2.5 py-2' : 'px-4 py-2'],
      lg: ['text-base', hasIcon && !option.label ? 'px-3 py-2.5' : 'px-5 py-2.5'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      stateClasses.push('cursor-pointer');
    }

    if (selected) {
      stateClasses.push(
        'bg-primary-600',
        'text-white',
        'hover:bg-primary-700',
        'border-primary-600',
        'dark:border-primary-600'
      );
    } else {
      stateClasses.push(
        'bg-white',
        'dark:bg-gray-900',
        'text-gray-700',
        'dark:text-gray-300',
        'hover:bg-gray-50',
        'dark:hover:bg-gray-800'
      );
    }

    return [...baseClasses, ...sizeClasses[size], ...stateClasses].join(' ');
  }

  isSelected(option: SelectButtonOption<T>): boolean {
    const currentValue = this.value();
    const optionValue = option.value;

    if (currentValue === null || currentValue === undefined) return false;

    if (this.multiple()) {
      return Array.isArray(currentValue) && currentValue.includes(optionValue);
    }

    return currentValue === optionValue;
  }

  selectOption(option: SelectButtonOption<T>): void {
    if (this.disabled() || option.disabled) return;

    const optionValue = option.value;

    if (this.multiple()) {
      const currentValues = (Array.isArray(this.value()) ? this.value() : []) as T[];
      let newValues: T[];

      if (currentValues.includes(optionValue)) {
        newValues = currentValues.filter((v) => v !== optionValue);
        if (!this.allowEmpty() && newValues.length === 0) {
          return; // Prevent empty selection
        }
      } else {
        newValues = [...currentValues, optionValue];
      }

      this.updateValue(newValues.length > 0 ? newValues : null);
    } else {
      if (this.value() === optionValue) {
        if (this.allowEmpty()) {
          this.updateValue(null);
        }
      } else {
        this.updateValue(optionValue);
      }
    }
  }

  private updateValue(value: T | T[] | null): void {
    this.value.set(value);
    this.onChangeFn(value);
    this.onTouchedFn();
    this.onChange.emit(value);
  }
}
