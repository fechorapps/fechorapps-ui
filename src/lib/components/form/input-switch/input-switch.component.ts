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
 * InputSwitch sizes
 */
export type InputSwitchSize = 'sm' | 'md' | 'lg';

/**
 * UiInputSwitch Component
 *
 * A toggle switch component for boolean values.
 *
 * @example
 * ```html
 * <ui-input-switch [(ngModel)]="enabled" label="Enable notifications"></ui-input-switch>
 * ```
 */
@Component({
  selector: 'ui-input-switch',
  standalone: true,
  templateUrl: './input-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputSwitchComponent),
      multi: true,
    },
  ],
  host: {
    class: 'inline-flex',
  },
})
export class UiInputSwitchComponent implements ControlValueAccessor {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Switch size */
  readonly size = input<InputSwitchSize>('md');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Whether switch is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether switch is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Input name attribute */
  readonly name = input<string>('');

  /** Input id attribute */
  readonly inputId = input<string>('');

  /** Label position */
  readonly labelPosition = input<'left' | 'right'>('right');

  /** Help text displayed below the switch */
  readonly helpText = input<string | undefined>(undefined);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Whether switch is on */
  readonly checked = model<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when switch value changes */
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

  readonly trackClasses = computed(() => {
    const size = this.size();
    const checked = this.checked();
    const disabled = this.disabled();
    const invalid = this.invalid();

    const baseClasses = [
      'relative',
      'inline-flex',
      'items-center',
      'rounded-full',
      'transition-colors',
      'duration-200',
    ];

    const sizeClasses: Record<InputSwitchSize, string[]> = {
      sm: ['w-8', 'h-4'],
      md: ['w-10', 'h-5'],
      lg: ['w-12', 'h-6'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
      if (checked) {
        stateClasses.push('bg-gray-400');
      } else {
        stateClasses.push('bg-gray-300', 'dark:bg-gray-600');
      }
    } else if (invalid) {
      if (checked) {
        stateClasses.push('bg-red-500');
      } else {
        stateClasses.push('bg-red-200', 'dark:bg-red-900');
      }
    } else if (checked) {
      stateClasses.push('bg-primary');
    } else {
      stateClasses.push('bg-gray-300', 'dark:bg-gray-600');
    }

    if (!disabled) {
      stateClasses.push('cursor-pointer');
    }

    return [...baseClasses, ...sizeClasses[size], ...stateClasses].join(' ');
  });

  readonly thumbClasses = computed(() => {
    const size = this.size();
    const checked = this.checked();

    const baseClasses = [
      'absolute',
      'bg-white',
      'rounded-full',
      'shadow-md',
      'transition-transform',
      'duration-200',
    ];

    const sizeClasses: Record<InputSwitchSize, string[]> = {
      sm: ['w-3', 'h-3', 'top-0.5', checked ? 'translate-x-4' : 'translate-x-0.5'],
      md: ['w-4', 'h-4', 'top-0.5', checked ? 'translate-x-5' : 'translate-x-0.5'],
      lg: ['w-5', 'h-5', 'top-0.5', checked ? 'translate-x-6' : 'translate-x-0.5'],
    };

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly labelClasses = computed(() => {
    const size = this.size();
    const disabled = this.disabled();
    const invalid = this.invalid();
    const position = this.labelPosition();

    const baseClasses = ['select-none'];

    const sizeClasses: Record<InputSwitchSize, string[]> = {
      sm: ['text-sm'],
      md: ['text-sm'],
      lg: ['text-base'],
    };

    const positionClasses = position === 'left' ? ['mr-2.5'] : ['ml-2.5'];

    if (disabled) {
      baseClasses.push('text-gray-400', 'cursor-not-allowed');
    } else if (invalid) {
      baseClasses.push('text-red-600', 'dark:text-red-400');
    } else {
      baseClasses.push('text-gray-700', 'dark:text-gray-300', 'cursor-pointer');
    }

    return [...baseClasses, ...sizeClasses[size], ...positionClasses].join(' ');
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
