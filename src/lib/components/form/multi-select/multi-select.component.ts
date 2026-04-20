import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Check, ChevronDown, LucideAngularModule, X } from 'lucide-angular';

/**
 * MultiSelect variants
 */
export type MultiSelectVariant = 'default' | 'filled' | 'outlined';

/**
 * MultiSelect sizes
 */
export type MultiSelectSize = 'sm' | 'md' | 'lg';

/**
 * Option interface
 */
export interface MultiSelectOption {
  label: string;
  value: unknown;
  disabled?: boolean;
}

/**
 * UiMultiSelect Component
 *
 * A dropdown that allows multiple selections.
 *
 * @example
 * ```html
 * <ui-multi-select [options]="options" [(ngModel)]="selectedItems"></ui-multi-select>
 * <ui-multi-select [options]="options" [filter]="true" [chips]="true"></ui-multi-select>
 * ```
 */
@Component({
  selector: 'ui-multi-select',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './multi-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiMultiSelectComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiMultiSelectComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly chevronIcon = ChevronDown;
  protected readonly checkIcon = Check;
  protected readonly closeIcon = X;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly containerRef = viewChild<ElementRef>('containerEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<MultiSelectVariant>('default');

  /** Size */
  readonly size = input<MultiSelectSize>('md');

  /** Options array */
  readonly options = input<MultiSelectOption[]>([]);

  /** Placeholder text */
  readonly placeholder = input<string>('Select items');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether select is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether select is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Whether input takes full width */
  readonly fullWidth = input<boolean>(true);

  /** Whether to show filter input */
  readonly filter = input<boolean>(false);

  /** Filter placeholder */
  readonly filterPlaceholder = input<string>('Search...');

  /** Empty message when no options */
  readonly emptyMessage = input<string>('No results found');

  /** Whether to show chips for selected items */
  readonly chips = input<boolean>(true);

  /** Maximum number of chips to display */
  readonly maxChips = input<number>(3);

  /** Option label field */
  readonly optionLabel = input<string>('label');

  /** Option value field */
  readonly optionValue = input<string>('value');

  /** Input id */
  readonly inputId = input<string>('');

  /** Whether to show select all option */
  readonly showSelectAll = input<boolean>(false);

  /** Select all label */
  readonly selectAllLabel = input<string>('Select All');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Selected values */
  readonly value = model<unknown[]>([]);

  /** Panel visibility */
  readonly panelVisible = signal<boolean>(false);

  /** Filter query */
  readonly filterQuery = signal<string>('');

  /** Highlighted index */
  readonly highlightedIndex = signal<number>(-1);

  /** Focus state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on value change */
  readonly onChange = output<unknown[]>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  /** Emitted when panel shows */
  readonly onShow = output<void>();

  /** Emitted when panel hides */
  readonly onHide = output<void>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: unknown[]) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: unknown[]): void {
    this.value.set(value ?? []);
  }

  registerOnChange(fn: (value: unknown[]) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // HOST LISTENER
  // =========================================================================

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const container = this.containerRef()?.nativeElement;
    if (container && !container.contains(event.target)) {
      this.closePanel();
    }
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly filteredOptions = computed(() => {
    const query = this.filterQuery().toLowerCase();
    if (!query) return this.options();

    return this.options().filter((option) =>
      this.getOptionLabel(option).toLowerCase().includes(query)
    );
  });

  readonly selectedOptions = computed(() => {
    const currentValues = this.value();
    return this.options().filter((option) => currentValues.includes(this.getOptionValue(option)));
  });

  readonly displayChips = computed(() => {
    const selected = this.selectedOptions();
    const maxChips = this.maxChips();
    return selected.slice(0, maxChips);
  });

  readonly remainingCount = computed(() => {
    const selected = this.selectedOptions();
    const maxChips = this.maxChips();
    return Math.max(0, selected.length - maxChips);
  });

  readonly allSelected = computed(() => {
    const options = this.options().filter((o) => !o.disabled);
    const currentValues = this.value();
    return (
      options.length > 0 && options.every((o) => currentValues.includes(this.getOptionValue(o)))
    );
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<MultiSelectSize, number> = { sm: 14, md: 16, lg: 18 };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-block';
  });

  readonly triggerClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const invalid = this.invalid();
    const disabled = this.disabled();
    const focused = this.focused();
    const panelVisible = this.panelVisible();

    const baseClasses = [
      'flex',
      'items-center',
      'justify-between',
      'w-full',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
      'text-left',
      'min-h-[2.5rem]',
    ];

    const sizeClasses: Record<MultiSelectSize, string[]> = {
      sm: ['px-2.5', 'py-1.5', 'text-sm', 'gap-1.5'],
      md: ['px-3', 'py-2', 'text-sm', 'gap-2'],
      lg: ['px-4', 'py-2.5', 'text-base', 'gap-2.5'],
    };

    const variantClasses: Record<MultiSelectVariant, string[]> = {
      default: ['bg-white', 'dark:bg-gray-900', 'border-gray-300', 'dark:border-gray-600'],
      filled: ['bg-gray-100', 'dark:bg-gray-800', 'border-transparent'],
      outlined: ['bg-transparent', 'border-gray-300', 'dark:border-gray-600'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed', 'text-gray-400');
    } else {
      stateClasses.push('cursor-pointer', 'text-gray-900', 'dark:text-white');

      if (invalid) {
        stateClasses.push('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
      } else if (focused || panelVisible) {
        stateClasses.push('border-primary-500', 'ring-2', 'ring-primary-500/20');
      } else {
        stateClasses.push('hover:border-gray-400');
      }
    }

    return [...baseClasses, ...sizeClasses[size], ...variantClasses[variant], ...stateClasses].join(
      ' '
    );
  });

  readonly panelClasses = computed(() => {
    return [
      'absolute',
      'z-50',
      'w-full',
      'mt-1',
      'bg-white',
      'dark:bg-gray-900',
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-lg',
      'shadow-lg',
      'max-h-60',
      'overflow-auto',
    ].join(' ');
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

  getOptionLabel(option: MultiSelectOption): string {
    return option.label;
  }

  getOptionValue(option: MultiSelectOption): unknown {
    return option.value;
  }

  getOptionClasses(option: MultiSelectOption, index: number): string {
    const isHighlighted = this.highlightedIndex() === index;
    const isSelected = this.isSelected(option);
    const isDisabled = option.disabled;

    const baseClasses = [
      'flex',
      'items-center',
      'justify-between',
      'px-3',
      'py-2',
      'text-sm',
      'transition-colors',
    ];

    if (isDisabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed', 'text-gray-400');
    } else {
      baseClasses.push('cursor-pointer');

      if (isSelected) {
        baseClasses.push(
          'bg-primary-50',
          'dark:bg-primary-900/20',
          'text-primary-700',
          'dark:text-primary-300'
        );
      } else if (isHighlighted) {
        baseClasses.push('bg-gray-100', 'dark:bg-gray-800');
      } else {
        baseClasses.push(
          'text-gray-900',
          'dark:text-white',
          'hover:bg-gray-50',
          'dark:hover:bg-gray-800'
        );
      }
    }

    return baseClasses.join(' ');
  }

  isSelected(option: MultiSelectOption): boolean {
    return this.value().includes(this.getOptionValue(option));
  }

  toggleOption(option: MultiSelectOption): void {
    if (this.disabled() || option.disabled) return;

    const currentValues = [...this.value()];
    const optionValue = this.getOptionValue(option);
    const index = currentValues.indexOf(optionValue);

    if (index === -1) {
      currentValues.push(optionValue);
    } else {
      currentValues.splice(index, 1);
    }

    this.updateValue(currentValues);
  }

  removeChip(option: MultiSelectOption, event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;

    const currentValues = this.value().filter((v) => v !== this.getOptionValue(option));
    this.updateValue(currentValues);
  }

  selectAll(): void {
    if (this.disabled()) return;

    if (this.allSelected()) {
      this.updateValue([]);
    } else {
      const allValues = this.options()
        .filter((o) => !o.disabled)
        .map((o) => this.getOptionValue(o));
      this.updateValue(allValues);
    }
  }

  togglePanel(): void {
    if (this.disabled()) return;

    if (this.panelVisible()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel(): void {
    if (this.disabled()) return;
    this.panelVisible.set(true);
    this.highlightedIndex.set(-1);
    this.filterQuery.set('');
    this.onShow.emit();
  }

  closePanel(): void {
    this.panelVisible.set(false);
    this.onHide.emit();
  }

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterQuery.set(target.value);
    this.highlightedIndex.set(0);
  }

  onKeydown(event: KeyboardEvent): void {
    const options = this.filteredOptions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.panelVisible()) {
          this.openPanel();
        } else {
          this.highlightedIndex.set(Math.min(this.highlightedIndex() + 1, options.length - 1));
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.panelVisible()) {
          this.highlightedIndex.set(Math.max(this.highlightedIndex() - 1, 0));
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.panelVisible() && this.highlightedIndex() >= 0) {
          const option = options[this.highlightedIndex()];
          if (option && !option.disabled) {
            this.toggleOption(option);
          }
        } else {
          this.togglePanel();
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.closePanel();
        break;
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
  }

  private updateValue(values: unknown[]): void {
    this.value.set(values);
    this.onChangeFn(values);
    this.onChange.emit(values);
  }
}
