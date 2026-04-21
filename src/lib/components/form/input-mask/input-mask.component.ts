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

import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

/**
 * Input mask variants
 */
export type InputMaskVariant = 'default' | 'filled' | 'outlined';

/**
 * Input mask sizes
 */
export type InputMaskSize = 'sm' | 'md' | 'lg';

/**
 * Predefined mask types
 */
export type MaskType =
  | 'phone'
  | 'phone-mx'
  | 'credit-card'
  | 'date'
  | 'time'
  | 'ssn'
  | 'zip'
  | 'custom';

/**
 * UiInputMask Component
 *
 * A text input with masking support for formatted data entry like
 * phone numbers, credit cards, dates, etc.
 *
 * @example
 * ```html
 * <ui-input-mask maskType="phone" [(ngModel)]="phone"></ui-input-mask>
 * <ui-input-mask mask="99/99/9999" [(ngModel)]="date"></ui-input-mask>
 * ```
 */
@Component({
  selector: 'ui-input-mask',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './input-mask.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputMaskComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiInputMaskComponent implements ControlValueAccessor {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<InputMaskVariant>('default');

  /** Size */
  readonly size = input<InputMaskSize>('md');

  /** Predefined mask type */
  readonly maskType = input<MaskType>('custom');

  /** Custom mask pattern (9 = digit, a = letter, * = alphanumeric) */
  readonly mask = input<string>('');

  /** Placeholder character */
  readonly slotChar = input<string>('_');

  /** Placeholder text */
  readonly placeholder = input<string>('');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is readonly */
  readonly readonly = input<boolean>(false);

  /** Whether input is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Whether to unmask the value (return raw value) */
  readonly unmask = input<boolean>(false);

  /** Whether to show mask guide */
  readonly showMaskGuide = input<boolean>(true);

  /** Icon to display */
  readonly icon = input<LucideIconData | undefined>(undefined);

  /** End icon */
  readonly iconEnd = input<LucideIconData | undefined>(undefined);

  /** Whether input takes full width */
  readonly fullWidth = input<boolean>(true);

  /** Input id */
  readonly inputId = input<string>('');

  /** Input name */
  readonly name = input<string>('');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Masked display value */
  readonly value = model<string>('');

  /** Focus state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on focus */
  readonly inputFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly inputBlur = output<FocusEvent>();

  /** Emitted when value changes */
  readonly inputChange = output<string>();

  /** Emitted when input is complete (all mask filled) */
  readonly onComplete = output<string>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.value.set(this.applyMask(value));
    } else {
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
  // COMPUTED - MASK
  // =========================================================================

  readonly effectiveMask = computed(() => {
    const customMask = this.mask();
    if (customMask) return customMask;

    const maskMap: Record<MaskType, string> = {
      phone: '(999) 999-9999',
      'phone-mx': '+52 (99) 9999-9999',
      'credit-card': '9999 9999 9999 9999',
      date: '99/99/9999',
      time: '99:99',
      ssn: '999-99-9999',
      zip: '99999',
      custom: '',
    };

    return maskMap[this.maskType()];
  });

  readonly maskPlaceholder = computed(() => {
    const mask = this.effectiveMask();
    const slot = this.slotChar();
    if (!mask) return this.placeholder();

    return mask.replace(/9/g, slot).replace(/a/g, slot).replace(/\*/g, slot);
  });

  // =========================================================================
  // COMPUTED - STYLES
  // =========================================================================

  readonly iconSize = computed(() => {
    const sizeMap: Record<InputMaskSize, number> = { sm: 14, md: 16, lg: 18 };
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
    const hasIcon = !!this.icon();
    const hasIconEnd = !!this.iconEnd();

    const baseClasses = [
      'relative',
      'flex',
      'items-center',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'border',
    ];

    const sizeClasses: Record<InputMaskSize, string[]> = {
      sm: ['h-8'],
      md: ['h-10'],
      lg: ['h-12'],
    };

    const variantClasses: Record<InputMaskVariant, string[]> = {
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
        'focus-within:ring-2',
        'focus-within:ring-red-500/20'
      );
    } else if (focused) {
      stateClasses.push(
        'border-primary',
        'dark:border-primary-400',
        'ring-2',
        'ring-ring/20'
      );
    } else {
      stateClasses.push(
        'hover:border-gray-400',
        'dark:hover:border-gray-500',
        'focus-within:border-primary',
        'focus-within:ring-2',
        'focus-within:ring-ring/20'
      );
    }

    const paddingClasses: string[] = [];
    if (hasIcon) {
      paddingClasses.push(size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-11' : 'pl-10');
    }
    if (hasIconEnd) {
      paddingClasses.push(size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-11' : 'pr-10');
    }

    return [
      ...baseClasses,
      ...sizeClasses[size],
      ...variantClasses[variant],
      ...stateClasses,
      ...paddingClasses,
    ].join(' ');
  });

  readonly inputClasses = computed(() => {
    const size = this.size();
    const hasIcon = !!this.icon();
    const hasIconEnd = !!this.iconEnd();

    const baseClasses = [
      'w-full',
      'h-full',
      'bg-transparent',
      'border-none',
      'outline-none',
      'text-gray-900',
      'dark:text-white',
      'placeholder:text-gray-400',
      'dark:placeholder:text-gray-500',
      'font-mono',
    ];

    const sizeClasses: Record<InputMaskSize, string[]> = {
      sm: ['text-sm', 'px-2.5'],
      md: ['text-sm', 'px-3'],
      lg: ['text-base', 'px-4'],
    };

    const paddingClasses: string[] = [];
    if (hasIcon) paddingClasses.push('pl-0');
    if (hasIconEnd) paddingClasses.push('pr-0');

    return [...baseClasses, ...sizeClasses[size], ...paddingClasses].join(' ');
  });

  readonly iconClasses = computed(() => {
    const invalid = this.invalid();
    return invalid ? 'text-red-500 dark:text-red-400' : 'text-gray-400 dark:text-gray-500';
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

  onFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.inputFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.onTouched();
    this.inputBlur.emit(event);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    const maskedValue = this.applyMask(rawValue);

    this.value.set(maskedValue);
    target.value = maskedValue;

    const outputValue = this.unmask() ? this.getUnmaskedValue(maskedValue) : maskedValue;
    this.onChange(outputValue);
    this.inputChange.emit(outputValue);

    if (this.isMaskComplete(maskedValue)) {
      this.onComplete.emit(outputValue);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;

    // Allow navigation keys
    if (
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(event.key)
    ) {
      return;
    }

    // Allow Ctrl/Cmd combinations
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    const mask = this.effectiveMask();
    if (!mask) return;

    const cursorPos = target.selectionStart ?? 0;
    const maskChar = mask[cursorPos];

    // Check if the key matches the mask pattern
    if (maskChar === '9' && !/\d/.test(event.key)) {
      event.preventDefault();
    } else if (maskChar === 'a' && !/[a-zA-Z]/.test(event.key)) {
      event.preventDefault();
    } else if (maskChar === '*' && !/[a-zA-Z0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  private applyMask(value: string): string {
    const mask = this.effectiveMask();
    if (!mask) return value;

    const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '');
    let result = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length && valueIndex < cleanValue.length; i++) {
      const maskChar = mask[i];
      const inputChar = cleanValue[valueIndex];

      if (maskChar === '9') {
        if (/\d/.test(inputChar)) {
          result += inputChar;
          valueIndex++;
        } else {
          break;
        }
      } else if (maskChar === 'a') {
        if (/[a-zA-Z]/.test(inputChar)) {
          result += inputChar;
          valueIndex++;
        } else {
          break;
        }
      } else if (maskChar === '*') {
        result += inputChar;
        valueIndex++;
      } else {
        result += maskChar;
      }
    }

    return result;
  }

  private getUnmaskedValue(maskedValue: string): string {
    return maskedValue.replace(/[^a-zA-Z0-9]/g, '');
  }

  private isMaskComplete(value: string): boolean {
    const mask = this.effectiveMask();
    if (!mask) return false;

    const requiredLength = mask.replace(/[^9a*]/g, '').length;
    const cleanValue = this.getUnmaskedValue(value);
    return cleanValue.length === requiredLength;
  }
}
