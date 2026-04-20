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
 * Input text variants available in the design system
 */
export type InputTextVariant = 'default' | 'filled' | 'outlined';

/**
 * Input text sizes available in the design system
 */
export type InputTextSize = 'sm' | 'md' | 'lg';

/**
 * Float label modes
 */
export type FloatLabelMode = 'never' | 'always' | 'auto';

/**
 * UiInputText Component
 *
 * A customizable text input component that follows the Appcordion design system.
 * Supports multiple variants, sizes, icons, validation states, and float labels.
 *
 * @example
 * ```html
 * <ui-input-text [(ngModel)]="name" placeholder="Enter name"></ui-input-text>
 * <ui-input-text variant="filled" [icon]="searchIcon"></ui-input-text>
 * <ui-input-text [invalid]="true" helpText="This field is required"></ui-input-text>
 * ```
 */
@Component({
  selector: 'ui-input-text',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputTextComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiInputTextComponent implements ControlValueAccessor {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Input visual variant */
  readonly variant = input<InputTextVariant>('default');

  /** Input size */
  readonly size = input<InputTextSize>('md');

  /** Input type */
  readonly type = input<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'>('text');

  /** Placeholder text */
  readonly placeholder = input<string>('');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Float label mode */
  readonly floatLabel = input<FloatLabelMode>('never');

  /** Help text displayed below input */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether the input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether the input is readonly */
  readonly readonly = input<boolean>(false);

  /** Whether the input is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Lucide icon to display at start */
  readonly icon = input<LucideIconData | undefined>(undefined);

  /** Lucide icon to display at end */
  readonly iconEnd = input<LucideIconData | undefined>(undefined);

  /** Whether input should take full width */
  readonly fullWidth = input<boolean>(true);

  /** Maximum length */
  readonly maxLength = input<number | undefined>(undefined);

  /** Minimum length */
  readonly minLength = input<number | undefined>(undefined);

  /** Input name attribute */
  readonly name = input<string>('');

  /** Input id attribute */
  readonly inputId = input<string>('');

  /** Autocomplete attribute */
  readonly autocomplete = input<string>('off');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Two-way bindable value */
  readonly value = model<string>('');

  /** Internal focus state */
  readonly focused = signal(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when input receives focus */
  readonly inputFocus = output<FocusEvent>();

  /** Emitted when input loses focus */
  readonly inputBlur = output<FocusEvent>();

  /** Emitted on input event */
  readonly inputChange = output<Event>();

  /** Emitted on keyup event */
  readonly inputKeyup = output<KeyboardEvent>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via input signal
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Icon size based on input size */
  readonly iconSize = computed(() => {
    const sizeMap: Record<InputTextSize, number> = {
      sm: 14,
      md: 16,
      lg: 18,
    };
    return sizeMap[this.size()];
  });

  /** Whether to show float label in raised position */
  readonly showFloatLabel = computed(() => {
    const mode = this.floatLabel();
    if (mode === 'never') return false;
    if (mode === 'always') return true;
    return this.focused() || !!this.value();
  });

  /** CSS classes for the wrapper */
  readonly wrapperClasses = computed(() => {
    const fullWidth = this.fullWidth();
    return fullWidth ? 'w-full' : 'inline-block';
  });

  /** CSS classes for the input container */
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

    // Size classes
    const sizeClasses: Record<InputTextSize, string[]> = {
      sm: ['h-8'],
      md: ['h-10'],
      lg: ['h-12'],
    };

    // Variant classes — Metronic semantic tokens
    const variantClasses: Record<InputTextVariant, string[]> = {
      default: ['bg-background', 'border-input'],
      filled: ['bg-muted', 'border-transparent'],
      outlined: ['bg-transparent', 'border-input'],
    };

    // State classes
    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else if (invalid) {
      stateClasses.push(
        'border-destructive',
        'focus-within:ring-2',
        'focus-within:ring-destructive/15'
      );
    } else if (focused) {
      stateClasses.push('border-primary', 'ring-2', 'ring-ring/20');
    } else {
      stateClasses.push(
        'hover:border-ring',
        'focus-within:border-primary',
        'focus-within:ring-2',
        'focus-within:ring-ring/20'
      );
    }

    // Padding for icons
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

  /** CSS classes for the input element */
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
      'text-foreground',
      'placeholder:text-muted-foreground',
    ];

    // Size classes
    const sizeClasses: Record<InputTextSize, string[]> = {
      sm: ['text-sm', 'px-2.5'],
      md: ['text-sm', 'px-3'],
      lg: ['text-base', 'px-4'],
    };

    // Adjust padding for icons
    const paddingClasses: string[] = [];
    if (hasIcon) {
      paddingClasses.push('pl-0');
    }
    if (hasIconEnd) {
      paddingClasses.push('pr-0');
    }

    return [...baseClasses, ...sizeClasses[size], ...paddingClasses].join(' ');
  });

  /** CSS classes for icons */
  readonly iconClasses = computed(() => {
    const invalid = this.invalid();
    return invalid ? 'text-destructive' : 'text-muted-foreground';
  });

  /** CSS classes for label */
  readonly labelClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['block', 'text-sm', 'font-medium', 'mb-1.5'];

    if (invalid) {
      baseClasses.push('text-destructive');
    } else {
      baseClasses.push('text-foreground');
    }

    return baseClasses.join(' ');
  });

  /** CSS classes for help text */
  readonly helpTextClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['text-xs', 'mt-1.5'];

    if (invalid) {
      baseClasses.push('text-destructive');
    } else {
      baseClasses.push('text-muted-foreground');
    }

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
    this.value.set(target.value);
    this.onChange(target.value);
    this.inputChange.emit(event);
  }

  onKeyup(event: KeyboardEvent): void {
    this.inputKeyup.emit(event);
  }
}
