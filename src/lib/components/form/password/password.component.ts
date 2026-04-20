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

import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';

/**
 * Password variants
 */
export type PasswordVariant = 'default' | 'filled' | 'outlined';

/**
 * Password sizes
 */
export type PasswordSize = 'sm' | 'md' | 'lg';

/**
 * Password strength level
 */
export type PasswordStrength = 'weak' | 'medium' | 'strong';

/**
 * UiPassword Component
 *
 * A password input with visibility toggle and strength meter.
 *
 * @example
 * ```html
 * <ui-password [(ngModel)]="password"></ui-password>
 * <ui-password [(ngModel)]="password" [showStrength]="true"></ui-password>
 * ```
 */
@Component({
  selector: 'ui-password',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiPasswordComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiPasswordComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly eyeIcon = Eye;
  protected readonly eyeOffIcon = EyeOff;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<PasswordVariant>('default');

  /** Size */
  readonly size = input<PasswordSize>('md');

  /** Placeholder */
  readonly placeholder = input<string>('Enter password');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Whether input takes full width */
  readonly fullWidth = input<boolean>(true);

  /** Input name */
  readonly name = input<string>('');

  /** Input id */
  readonly inputId = input<string>('');

  /** Whether to show password strength meter */
  readonly showStrength = input<boolean>(false);

  /** Whether to allow toggling password visibility */
  readonly toggleable = input<boolean>(true);

  /** Feedback for password strength */
  readonly feedback = input<boolean>(true);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Current value */
  readonly value = model<string>('');

  /** Password visibility */
  readonly passwordVisible = signal<boolean>(false);

  /** Focus state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on value change */
  readonly onInput = output<string>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly inputType = computed(() => {
    return this.passwordVisible() ? 'text' : 'password';
  });

  readonly passwordStrength = computed((): PasswordStrength => {
    const password = this.value();
    if (!password) return 'weak';

    let score = 0;

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score >= 5) return 'strong';
    if (score >= 3) return 'medium';
    return 'weak';
  });

  readonly strengthPercentage = computed(() => {
    const strength = this.passwordStrength();
    const percentages: Record<PasswordStrength, number> = {
      weak: 33,
      medium: 66,
      strong: 100,
    };
    return percentages[strength];
  });

  readonly strengthLabel = computed(() => {
    const strength = this.passwordStrength();
    const labels: Record<PasswordStrength, string> = {
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
    };
    return labels[strength];
  });

  readonly strengthColor = computed(() => {
    const strength = this.passwordStrength();
    const colors: Record<PasswordStrength, string> = {
      weak: 'bg-red-500',
      medium: 'bg-yellow-500',
      strong: 'bg-green-500',
    };
    return colors[strength];
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<PasswordSize, number> = { sm: 14, md: 16, lg: 18 };
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

    const baseClasses = [
      'flex',
      'items-center',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
    ];

    const sizeClasses: Record<PasswordSize, string[]> = {
      sm: ['h-8'],
      md: ['h-10'],
      lg: ['h-12'],
    };

    const variantClasses: Record<PasswordVariant, string[]> = {
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
      'text-gray-900',
      'dark:text-white',
      'placeholder:text-gray-400',
    ];

    const sizeClasses: Record<PasswordSize, string[]> = {
      sm: ['text-sm', 'px-2.5'],
      md: ['text-sm', 'px-3'],
      lg: ['text-base', 'px-4'],
    };

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly toggleButtonClasses = computed(() => {
    const disabled = this.disabled();

    const baseClasses = [
      'flex',
      'items-center',
      'justify-center',
      'px-2',
      'text-gray-400',
      'transition-colors',
    ];

    if (disabled) {
      baseClasses.push('cursor-not-allowed');
    } else {
      baseClasses.push('hover:text-gray-600', 'dark:hover:text-gray-300', 'cursor-pointer');
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

  toggleVisibility(): void {
    if (this.disabled()) return;
    this.passwordVisible.set(!this.passwordVisible());
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.updateValue(target.value);
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

  private updateValue(value: string): void {
    this.value.set(value);
    this.onChangeFn(value);
    this.onInput.emit(value);
  }
}
