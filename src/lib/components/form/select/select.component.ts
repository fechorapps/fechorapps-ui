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
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Check, ChevronDown, LucideAngularModule, X } from 'lucide-angular';

/**
 * Select option interface
 */
export interface SelectOption {
  label: string;
  value: unknown;
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Select variants
 */
export type SelectVariant = 'default' | 'filled' | 'outlined';

/**
 * Select sizes
 */
export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * UiSelect Component
 *
 * A dropdown select component for choosing from a list of options.
 *
 * @example
 * ```html
 * <ui-select
 *   [(ngModel)]="selected"
 *   [options]="options"
 *   placeholder="Select an option"
 * ></ui-select>
 * ```
 */
@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelectComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class UiSelectComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly chevronIcon = ChevronDown;
  protected readonly checkIcon = Check;
  protected readonly clearIcon = X;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  readonly containerRef = viewChild<ElementRef<HTMLDivElement>>('containerEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Available options */
  readonly options = input<SelectOption[]>([]);

  /** Visual variant */
  readonly variant = input<SelectVariant>('default');

  /** Size */
  readonly size = input<SelectSize>('md');

  /** Placeholder text */
  readonly placeholder = input<string>('Select...');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether select is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether select is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Whether to show clear button */
  readonly showClear = input<boolean>(true);

  /** Whether to filter options */
  readonly filter = input<boolean>(false);

  /** Filter placeholder */
  readonly filterPlaceholder = input<string>('Search...');

  /** Empty message */
  readonly emptyMessage = input<string>('No options available');

  /** Field to use as label */
  readonly optionLabel = input<string>('label');

  /** Field to use as value */
  readonly optionValue = input<string>('value');

  /** Whether select takes full width */
  readonly fullWidth = input<boolean>(true);

  /** Input name attribute */
  readonly name = input<string>('');

  /** Input id attribute */
  readonly inputId = input<string>('');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Selected value */
  readonly value = model<unknown>(null);

  /** Whether dropdown is open */
  readonly panelVisible = signal<boolean>(false);

  /** Focus state */
  readonly focused = signal<boolean>(false);

  /** Filter query */
  readonly filterQuery = signal<string>('');

  /** Highlighted index */
  readonly highlightedIndex = signal<number>(-1);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when value changes */
  readonly onChange = output<unknown>();

  /** Emitted when dropdown opens */
  readonly onShow = output<void>();

  /** Emitted when dropdown closes */
  readonly onHide = output<void>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: unknown) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly filteredOptions = computed(() => {
    const options = this.options();
    const query = this.filterQuery().toLowerCase();

    if (!query) return options;

    const labelField = this.optionLabel();
    return options.filter((opt) => {
      const label = String(opt[labelField] ?? opt.label ?? '').toLowerCase();
      return label.includes(query);
    });
  });

  readonly selectedOption = computed(() => {
    const val = this.value();
    if (val === null || val === undefined) return null;

    const valueField = this.optionValue();
    return (
      this.options().find((opt) => {
        const optValue = opt[valueField] ?? opt.value;
        return optValue === val;
      }) ?? null
    );
  });

  readonly selectedLabel = computed(() => {
    const option = this.selectedOption();
    if (!option) return '';

    const labelField = this.optionLabel();
    return String(option[labelField] ?? option.label ?? '');
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<SelectSize, number> = { sm: 14, md: 16, lg: 18 };
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
    const hasValue = !!this.selectedOption();

    const baseClasses = [
      'w-full',
      'flex',
      'items-center',
      'justify-between',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
      'cursor-pointer',
    ];

    const sizeClasses: Record<SelectSize, string[]> = {
      sm: ['h-8', 'px-2.5', 'text-sm'],
      md: ['h-10', 'px-3', 'text-sm'],
      lg: ['h-12', 'px-4', 'text-base'],
    };

    const variantClasses: Record<SelectVariant, string[]> = {
      default: ['bg-background', 'border-input'],
      filled: ['bg-muted', 'border-transparent'],
      outlined: ['bg-transparent', 'border-input'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else if (invalid) {
      stateClasses.push('border-destructive', 'ring-2', 'ring-destructive/15');
    } else if (focused) {
      stateClasses.push('border-primary', 'ring-2', 'ring-ring/20');
    } else {
      stateClasses.push('hover:border-ring');
    }

    // Text color
    if (hasValue) {
      stateClasses.push('text-foreground');
    } else {
      stateClasses.push('text-muted-foreground');
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
      'bg-popover',
      'text-popover-foreground',
      'border',
      'border-border',
      'rounded-lg',
      'shadow-md',
      'max-h-60',
      'overflow-auto',
      'p-2',
    ].join(' ');
  });

  readonly labelClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['block', 'text-sm', 'font-medium', 'mb-1.5'];
    baseClasses.push(invalid ? 'text-destructive' : 'text-foreground');
    return baseClasses.join(' ');
  });

  readonly helpTextClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['text-xs', 'mt-1.5'];
    baseClasses.push(invalid ? 'text-destructive' : 'text-muted-foreground');
    return baseClasses.join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  getOptionLabel(option: SelectOption): string {
    const labelField = this.optionLabel();
    return String(option[labelField] ?? option.label ?? '');
  }

  getOptionValue(option: SelectOption): unknown {
    const valueField = this.optionValue();
    return option[valueField] ?? option.value;
  }

  isSelected(option: SelectOption): boolean {
    return this.getOptionValue(option) === this.value();
  }

  getOptionClasses(option: SelectOption, index: number): string {
    const highlighted = index === this.highlightedIndex();
    const selected = this.isSelected(option);
    const disabled = option.disabled;

    const baseClasses = [
      'px-3',
      'py-2',
      'flex',
      'items-center',
      'justify-between',
      'text-sm',
      'transition-colors',
    ];

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed', 'text-muted-foreground');
    } else if (highlighted) {
      baseClasses.push('bg-accent', 'text-accent-foreground', 'cursor-pointer', 'rounded-md');
    } else if (selected) {
      baseClasses.push('bg-primary/10', 'text-primary', 'cursor-pointer', 'rounded-md');
    } else {
      baseClasses.push(
        'text-foreground',
        'hover:bg-accent',
        'hover:text-accent-foreground',
        'cursor-pointer',
        'rounded-md'
      );
    }

    return baseClasses.join(' ');
  }

  togglePanel(): void {
    if (this.disabled()) return;

    if (this.panelVisible()) {
      this.hidePanel();
    } else {
      this.showPanel();
    }
  }

  showPanel(): void {
    if (this.disabled()) return;
    this.panelVisible.set(true);
    this.focused.set(true);
    this.highlightedIndex.set(-1);
    this.filterQuery.set('');
    this.onShow.emit();
  }

  hidePanel(): void {
    this.panelVisible.set(false);
    this.focused.set(false);
    this.onHide.emit();
  }

  selectOption(option: SelectOption): void {
    if (option.disabled) return;

    const val = this.getOptionValue(option);
    this.value.set(val);
    this.onChangeFn(val);
    this.onTouchedFn();
    this.onChange.emit(val);
    this.hidePanel();
  }

  clear(event: Event): void {
    event.stopPropagation();
    this.value.set(null);
    this.onChangeFn(null);
    this.onChange.emit(null);
  }

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterQuery.set(target.value);
    this.highlightedIndex.set(-1);
  }

  onKeydown(event: KeyboardEvent): void {
    const options = this.filteredOptions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.panelVisible()) {
          this.showPanel();
        } else {
          const nextIndex = Math.min(this.highlightedIndex() + 1, options.length - 1);
          this.highlightedIndex.set(nextIndex);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.panelVisible()) {
          const prevIndex = Math.max(this.highlightedIndex() - 1, 0);
          this.highlightedIndex.set(prevIndex);
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (this.panelVisible() && this.highlightedIndex() >= 0) {
          const option = options[this.highlightedIndex()];
          if (option && !option.disabled) {
            this.selectOption(option);
          }
        } else if (!this.panelVisible()) {
          this.showPanel();
        }
        break;

      case 'Escape':
        this.hidePanel();
        break;

      case 'Tab':
        this.hidePanel();
        break;
    }
  }

  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    // Delay to allow click on options
    setTimeout(() => {
      if (!this.panelVisible()) {
        this.focused.set(false);
      }
      this.onTouchedFn();
      this.onBlur.emit(event);
    }, 100);
  }

  onDocumentClick(event: MouseEvent): void {
    const container = this.containerRef()?.nativeElement;
    if (container && !container.contains(event.target as Node)) {
      this.hidePanel();
    }
  }
}
