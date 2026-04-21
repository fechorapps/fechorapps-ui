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

/**
 * Textarea variants
 */
export type TextareaVariant = 'default' | 'filled' | 'outlined';

/**
 * Textarea sizes
 */
export type TextareaSize = 'sm' | 'md' | 'lg';

/**
 * UiTextarea Component
 *
 * A multi-line text input component with auto-resize capability.
 *
 * @example
 * ```html
 * <ui-textarea [(ngModel)]="description" label="Description" [rows]="4"></ui-textarea>
 * <ui-textarea [autoResize]="true" placeholder="Type here..."></ui-textarea>
 * ```
 */
@Component({
  selector: 'ui-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiTextareaComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiTextareaComponent implements ControlValueAccessor {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<TextareaVariant>('default');

  /** Size */
  readonly size = input<TextareaSize>('md');

  /** Placeholder text */
  readonly placeholder = input<string>('');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether textarea is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether textarea is readonly */
  readonly readonly = input<boolean>(false);

  /** Whether textarea is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Number of rows */
  readonly rows = input<number>(3);

  /** Maximum length */
  readonly maxLength = input<number | undefined>(undefined);

  /** Whether to show character count */
  readonly showCount = input<boolean>(false);

  /** Whether to auto-resize */
  readonly autoResize = input<boolean>(false);

  /** Whether textarea takes full width */
  readonly fullWidth = input<boolean>(true);

  /** Input name attribute */
  readonly name = input<string>('');

  /** Input id attribute */
  readonly inputId = input<string>('');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Textarea value */
  readonly value = model<string>('');

  /** Focus state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  /** Emitted on input */
  readonly onInput = output<Event>();

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

  readonly characterCount = computed(() => this.value()?.length ?? 0);

  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-block';
  });

  readonly textareaClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const invalid = this.invalid();
    const disabled = this.disabled();
    const focused = this.focused();
    const autoResize = this.autoResize();

    const baseClasses = [
      'w-full',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'border',
      'outline-none',
      'text-gray-900',
      'dark:text-white',
      'placeholder:text-gray-400',
    ];

    if (autoResize) {
      baseClasses.push('resize-none', 'overflow-hidden');
    } else {
      baseClasses.push('resize-y');
    }

    const sizeClasses: Record<TextareaSize, string[]> = {
      sm: ['text-sm', 'px-2.5', 'py-1.5'],
      md: ['text-sm', 'px-3', 'py-2'],
      lg: ['text-base', 'px-4', 'py-2.5'],
    };

    const variantClasses: Record<TextareaVariant, string[]> = {
      default: ['bg-white', 'dark:bg-gray-900', 'border-gray-300', 'dark:border-gray-600'],
      filled: ['bg-gray-100', 'dark:bg-gray-800', 'border-transparent'],
      outlined: ['bg-transparent', 'border-gray-300', 'dark:border-gray-600'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else if (invalid) {
      stateClasses.push('border-red-500', 'focus:ring-2', 'focus:ring-red-500/20');
    } else if (focused) {
      stateClasses.push('border-primary', 'ring-2', 'ring-ring/20');
    } else {
      stateClasses.push(
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
    const baseClasses = ['block', 'text-sm', 'font-medium', 'mb-1.5'];

    if (invalid) {
      baseClasses.push('text-red-600', 'dark:text-red-400');
    } else {
      baseClasses.push('text-gray-700', 'dark:text-gray-300');
    }

    return baseClasses.join(' ');
  });

  readonly helpTextClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['text-xs', 'mt-1.5'];

    if (invalid) {
      baseClasses.push('text-red-600', 'dark:text-red-400');
    } else {
      baseClasses.push('text-gray-500', 'dark:text-gray-400');
    }

    return baseClasses.join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.onTouchedFn();
    this.onBlur.emit(event);
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
    this.onChangeFn(target.value);
    this.onInput.emit(event);

    if (this.autoResize()) {
      this.autoResizeTextarea(target);
    }
  }

  private autoResizeTextarea(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
