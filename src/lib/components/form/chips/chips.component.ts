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

import { LucideAngularModule, X } from 'lucide-angular';

/**
 * Chips variants
 */
export type ChipsVariant = 'default' | 'filled' | 'outlined';

/**
 * Chips sizes
 */
export type ChipsSize = 'sm' | 'md' | 'lg';

/**
 * UiChips Component
 *
 * A chips/tags input for entering multiple values.
 *
 * @example
 * ```html
 * <ui-chips [(ngModel)]="tags"></ui-chips>
 * <ui-chips [(ngModel)]="tags" [allowDuplicates]="false"></ui-chips>
 * ```
 */
@Component({
  selector: 'ui-chips',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './chips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiChipsComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiChipsComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly closeIcon = X;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<ChipsVariant>('default');

  /** Size */
  readonly size = input<ChipsSize>('md');

  /** Placeholder */
  readonly placeholder = input<string>('Enter a value');

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

  /** Input id */
  readonly inputId = input<string>('');

  /** Maximum number of chips */
  readonly max = input<number | undefined>(undefined);

  /** Whether to allow duplicates */
  readonly allowDuplicates = input<boolean>(false);

  /** Separator for adding chips (comma, enter, etc.) */
  readonly separator = input<string>(',');

  /** Add on blur */
  readonly addOnBlur = input<boolean>(true);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Current chips values */
  readonly value = model<string[]>([]);

  /** Input value */
  readonly inputValue = signal<string>('');

  /** Focus state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when chip is added */
  readonly onAdd = output<string>();

  /** Emitted when chip is removed */
  readonly onRemove = output<string>();

  /** Emitted on value change */
  readonly onChange = output<string[]>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: string[]) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string[]): void {
    this.value.set(value ?? []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly canAddMore = computed(() => {
    const max = this.max();
    if (max === undefined) return true;
    return this.value().length < max;
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<ChipsSize, number> = { sm: 12, md: 14, lg: 16 };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-block';
  });

  readonly containerClasses = computed(() => {
    const variant = this.variant();
    const invalid = this.invalid();
    const disabled = this.disabled();
    const focused = this.focused();

    const baseClasses = [
      'flex',
      'flex-wrap',
      'items-center',
      'gap-1.5',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
      'p-2',
      'min-h-[2.5rem]',
    ];

    const variantClasses: Record<ChipsVariant, string[]> = {
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
      stateClasses.push('border-primary', 'ring-2', 'ring-ring/20');
    } else {
      stateClasses.push('hover:border-gray-400');
    }

    return [...baseClasses, ...variantClasses[variant], ...stateClasses].join(' ');
  });

  readonly chipClasses = computed(() => {
    const size = this.size();
    const disabled = this.disabled();

    const baseClasses = [
      'inline-flex',
      'items-center',
      'gap-1',
      'rounded-full',
      'bg-primary-100',
      'dark:bg-primary-900/30',
      'text-primary-700',
      'dark:text-primary-300',
      'transition-colors',
    ];

    const sizeClasses: Record<ChipsSize, string[]> = {
      sm: ['px-2', 'py-0.5', 'text-xs'],
      md: ['px-2.5', 'py-1', 'text-sm'],
      lg: ['px-3', 'py-1.5', 'text-sm'],
    };

    if (!disabled) {
      baseClasses.push('hover:bg-primary-200', 'dark:hover:bg-primary-800/30');
    }

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly inputClasses = computed(() => {
    const size = this.size();

    const baseClasses = [
      'flex-1',
      'min-w-[100px]',
      'bg-transparent',
      'border-none',
      'outline-none',
      'text-gray-900',
      'dark:text-white',
      'placeholder:text-gray-400',
    ];

    const sizeClasses: Record<ChipsSize, string[]> = {
      sm: ['text-sm'],
      md: ['text-sm'],
      lg: ['text-base'],
    };

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly removeButtonClasses = computed(() => {
    const disabled = this.disabled();

    const baseClasses = ['rounded-full', 'p-0.5', 'transition-colors'];

    if (disabled) {
      baseClasses.push('cursor-not-allowed', 'opacity-50');
    } else {
      baseClasses.push(
        'cursor-pointer',
        'hover:bg-primary-300',
        'dark:hover:bg-primary-700',
        'hover:text-primary-900',
        'dark:hover:text-primary-100'
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

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const separator = this.separator();

    if (separator && value.includes(separator)) {
      const parts = value.split(separator).filter((p) => p.trim());
      parts.forEach((part) => this.addChip(part.trim()));
      this.inputValue.set('');
      target.value = '';
    } else {
      this.inputValue.set(value);
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const inputValue = this.inputValue().trim();

    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputValue) {
        this.addChip(inputValue);
        this.inputValue.set('');
        (event.target as HTMLInputElement).value = '';
      }
    } else if (event.key === 'Backspace' && !inputValue) {
      const currentChips = this.value();
      if (currentChips.length > 0) {
        this.removeChip(currentChips.length - 1);
      }
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

    if (this.addOnBlur()) {
      const inputValue = this.inputValue().trim();
      if (inputValue) {
        this.addChip(inputValue);
        this.inputValue.set('');
        (event.target as HTMLInputElement).value = '';
      }
    }
  }

  addChip(value: string): void {
    if (this.disabled()) return;
    if (!value) return;
    if (!this.canAddMore()) return;

    const currentChips = this.value();

    if (!this.allowDuplicates() && currentChips.includes(value)) {
      return;
    }

    const newChips = [...currentChips, value];
    this.updateValue(newChips);
    this.onAdd.emit(value);
  }

  removeChip(index: number): void {
    if (this.disabled()) return;

    const currentChips = this.value();
    const removedChip = currentChips[index];
    const newChips = currentChips.filter((_, i) => i !== index);
    this.updateValue(newChips);
    this.onRemove.emit(removedChip);
  }

  private updateValue(chips: string[]): void {
    this.value.set(chips);
    this.onChangeFn(chips);
    this.onChange.emit(chips);
  }
}
