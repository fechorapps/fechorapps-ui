import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Input OTP variants
 */
export type InputOtpVariant = 'default' | 'filled' | 'outlined';

/**
 * Input OTP sizes
 */
export type InputOtpSize = 'sm' | 'md' | 'lg';

/**
 * UiInputOtp Component
 *
 * A one-time password input component for verification codes.
 *
 * @example
 * ```html
 * <ui-input-otp [(ngModel)]="code" [length]="6"></ui-input-otp>
 * <ui-input-otp [length]="4" (onComplete)="verify($event)"></ui-input-otp>
 * ```
 */
@Component({
  selector: 'ui-input-otp',
  standalone: true,
  imports: [],
  templateUrl: './input-otp.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputOtpComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiInputOtpComponent implements ControlValueAccessor {
  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly inputRefs = viewChildren<ElementRef<HTMLInputElement>>('inputEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<InputOtpVariant>('default');

  /** Size */
  readonly size = input<InputOtpSize>('md');

  /** Number of input boxes */
  readonly length = input<number>(6);

  /** Allow only numbers */
  readonly integerOnly = input<boolean>(true);

  /** Mask input like password */
  readonly mask = input<boolean>(false);

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is readonly */
  readonly readonly = input<boolean>(false);

  /** Whether input is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Auto focus first input */
  readonly autoFocus = input<boolean>(false);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** OTP value */
  readonly value = model<string>('');

  /** Individual input values */
  readonly inputs = signal<string[]>([]);

  /** Focus state */
  readonly focused = signal<boolean>(false);

  /** Current focused index */
  readonly focusedIndex = signal<number>(-1);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when all inputs are filled */
  readonly onComplete = output<string>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      const chars = value.split('').slice(0, this.length());
      const padded = [...chars, ...Array(this.length() - chars.length).fill('')];
      this.inputs.set(padded);
      this.value.set(value.slice(0, this.length()));
    } else {
      this.inputs.set(Array(this.length()).fill(''));
      this.value.set('');
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly inputArray = computed(() => {
    return Array.from({ length: this.length() }, (_, i) => i);
  });

  readonly containerClasses = computed(() => {
    const size = this.size();
    const gapClasses: Record<InputOtpSize, string> = {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-3',
    };
    return `flex items-center justify-center ${gapClasses[size]}`;
  });

  readonly inputClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const invalid = this.invalid();
    const disabled = this.disabled();

    const baseClasses = [
      'text-center',
      'font-mono',
      'font-semibold',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
      'outline-none',
    ];

    const sizeClasses: Record<InputOtpSize, string[]> = {
      sm: ['w-8', 'h-10', 'text-lg'],
      md: ['w-10', 'h-12', 'text-xl'],
      lg: ['w-12', 'h-14', 'text-2xl'],
    };

    const variantClasses: Record<InputOtpVariant, string[]> = {
      default: ['bg-white', 'dark:bg-gray-900', 'border-gray-300', 'dark:border-gray-600'],
      filled: ['bg-gray-100', 'dark:bg-gray-800', 'border-transparent'],
      outlined: ['bg-transparent', 'border-gray-300', 'dark:border-gray-600'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else if (invalid) {
      stateClasses.push(
        'border-red-500',
        'dark:border-red-400',
        'focus:ring-2',
        'focus:ring-red-500/20',
        'text-red-600',
        'dark:text-red-400'
      );
    } else {
      stateClasses.push(
        'text-gray-900',
        'dark:text-white',
        'hover:border-gray-400',
        'dark:hover:border-gray-500',
        'focus:border-primary',
        'focus:ring-2',
        'focus:ring-ring/20'
      );
    }

    return [...baseClasses, ...sizeClasses[size], ...variantClasses[variant], ...stateClasses].join(
      ' '
    );
  });

  readonly labelClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['block', 'text-sm', 'font-medium', 'mb-2', 'text-center'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
    );
    return baseClasses.join(' ');
  });

  readonly helpTextClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['text-xs', 'mt-2', 'text-center'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
    );
    return baseClasses.join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  getInputValue(index: number): string {
    return this.inputs()[index] || '';
  }

  handleInput(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    let inputValue = target.value;

    // Only allow integers if integerOnly is true
    if (this.integerOnly()) {
      inputValue = inputValue.replace(/\D/g, '');
    }

    // Only take the last character if multiple were pasted/typed
    inputValue = inputValue.slice(-1);

    // Update the inputs array
    const currentInputs = [...this.inputs()];
    currentInputs[index] = inputValue;
    this.inputs.set(currentInputs);

    // Update value
    const newValue = currentInputs.join('');
    this.value.set(newValue);
    this.onChange(newValue);

    // Move to next input
    if (inputValue && index < this.length() - 1) {
      this.focusInput(index + 1);
    }

    // Check if complete
    if (newValue.length === this.length() && !currentInputs.includes('')) {
      this.onComplete.emit(newValue);
    }
  }

  handleKeyDown(event: KeyboardEvent, index: number): void {
    const key = event.key;

    if (key === 'Backspace') {
      event.preventDefault();
      const currentInputs = [...this.inputs()];

      if (currentInputs[index]) {
        // Clear current input
        currentInputs[index] = '';
        this.inputs.set(currentInputs);
        this.updateValue();
      } else if (index > 0) {
        // Move to previous input and clear it
        currentInputs[index - 1] = '';
        this.inputs.set(currentInputs);
        this.updateValue();
        this.focusInput(index - 1);
      }
    } else if (key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    } else if (key === 'ArrowRight' && index < this.length() - 1) {
      event.preventDefault();
      this.focusInput(index + 1);
    } else if (key === 'Delete') {
      event.preventDefault();
      const currentInputs = [...this.inputs()];
      currentInputs[index] = '';
      this.inputs.set(currentInputs);
      this.updateValue();
    }
  }

  handlePaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    let chars = pastedData.split('');

    if (this.integerOnly()) {
      chars = chars.filter((char) => /\d/.test(char));
    }

    const currentInputs = [...this.inputs()];

    for (let i = 0; i < chars.length && index + i < this.length(); i++) {
      currentInputs[index + i] = chars[i];
    }

    this.inputs.set(currentInputs);
    this.updateValue();

    // Focus the next empty input or the last input
    const nextEmptyIndex = currentInputs.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      this.focusInput(nextEmptyIndex);
    } else {
      this.focusInput(this.length() - 1);
    }

    // Check if complete
    const newValue = currentInputs.join('');
    if (newValue.length === this.length() && !currentInputs.includes('')) {
      this.onComplete.emit(newValue);
    }
  }

  handleFocus(event: FocusEvent, index: number): void {
    this.focused.set(true);
    this.focusedIndex.set(index);
    this.onFocus.emit(event);

    // Select the input content
    const target = event.target as HTMLInputElement;
    target.select();
  }

  handleBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.focusedIndex.set(-1);
    this.onTouched();
    this.onBlur.emit(event);
  }

  private focusInput(index: number): void {
    const inputs = this.inputRefs();
    if (inputs[index]) {
      inputs[index].nativeElement.focus();
    }
  }

  private updateValue(): void {
    const newValue = this.inputs().join('');
    this.value.set(newValue);
    this.onChange(newValue);
  }
}
