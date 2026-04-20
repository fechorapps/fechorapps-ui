import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  ChevronDown,
  Loader2,
  LucideAngularModule,
  Search,
  X,
  type LucideIconData,
} from 'lucide-angular';

/**
 * AutoComplete variants
 */
export type AutoCompleteVariant = 'default' | 'filled' | 'outlined';

/**
 * AutoComplete sizes
 */
export type AutoCompleteSize = 'sm' | 'md' | 'lg';

/**
 * Suggestion item interface
 */
export interface AutoCompleteSuggestion {
  label: string;
  value: unknown;
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Complete event interface
 */
export interface AutoCompleteCompleteEvent {
  query: string;
  originalEvent: Event;
}

/**
 * Select event interface
 */
export interface AutoCompleteSelectEvent {
  value: AutoCompleteSuggestion;
  originalEvent: Event;
}

/**
 * UiAutoComplete Component
 *
 * An input component that provides real-time suggestions when being typed.
 * Supports single/multiple selection, custom templates, and virtual scrolling.
 *
 * @example
 * ```html
 * <ui-autocomplete
 *   [(ngModel)]="selectedItem"
 *   [suggestions]="filteredItems"
 *   (completeMethod)="search($event)"
 *   placeholder="Search..."
 * ></ui-autocomplete>
 * ```
 */
@Component({
  selector: 'ui-autocomplete',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './autocomplete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiAutoCompleteComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class UiAutoCompleteComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly searchIcon = Search;
  protected readonly chevronIcon = ChevronDown;
  protected readonly clearIcon = X;
  protected readonly loaderIcon = Loader2;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputEl');
  readonly containerElement = viewChild<ElementRef<HTMLDivElement>>('containerEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<AutoCompleteVariant>('default');

  /** Size */
  readonly size = input<AutoCompleteSize>('md');

  /** Suggestions list */
  readonly suggestions = input<AutoCompleteSuggestion[]>([]);

  /** Placeholder text */
  readonly placeholder = input<string>('');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Whether to show loading state */
  readonly loading = input<boolean>(false);

  /** Whether to show dropdown button */
  readonly dropdown = input<boolean>(false);

  /** Whether to allow multiple selections */
  readonly multiple = input<boolean>(false);

  /** Whether to force selection from suggestions */
  readonly forceSelection = input<boolean>(false);

  /** Whether to show clear button */
  readonly showClear = input<boolean>(true);

  /** Minimum characters to trigger search */
  readonly minLength = input<number>(1);

  /** Delay before triggering search (ms) */
  readonly delay = input<number>(300);

  /** Field to use as label from suggestion object */
  readonly field = input<string>('label');

  /** Maximum items to show in dropdown */
  readonly maxResults = input<number>(10);

  /** Whether input should take full width */
  readonly fullWidth = input<boolean>(true);

  /** Custom icon */
  readonly icon = input<LucideIconData | undefined>(undefined);

  /** Empty message when no results */
  readonly emptyMessage = input<string>('No hay resultados');

  /** Input name attribute */
  readonly name = input<string>('');

  /** Input id attribute */
  readonly inputId = input<string>('');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Selected value(s) */
  readonly value = model<AutoCompleteSuggestion | AutoCompleteSuggestion[] | null>(null);

  /** Internal query text */
  readonly query = signal<string>('');

  /** Whether dropdown is open */
  readonly panelVisible = signal<boolean>(false);

  /** Whether input is focused */
  readonly focused = signal<boolean>(false);

  /** Currently highlighted index */
  readonly highlightedIndex = signal<number>(-1);

  /** Search timeout reference */
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when search is triggered */
  readonly completeMethod = output<AutoCompleteCompleteEvent>();

  /** Emitted when an item is selected */
  readonly onSelect = output<AutoCompleteSelectEvent>();

  /** Emitted when selection is cleared */
  readonly onClear = output<void>();

  /** Emitted when dropdown is shown */
  readonly onShow = output<void>();

  /** Emitted when dropdown is hidden */
  readonly onHide = output<void>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: AutoCompleteSuggestion | AutoCompleteSuggestion[] | null): void {
    this.value.set(value);
    if (value && !this.multiple()) {
      const singleValue = value as AutoCompleteSuggestion;
      this.query.set(this.getLabel(singleValue));
    } else if (!value) {
      this.query.set('');
    }
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // =========================================================================
  // CONSTRUCTOR & EFFECTS
  // =========================================================================

  constructor() {
    // Close panel when suggestions change and are empty
    effect(() => {
      const suggestions = this.suggestions();
      if (suggestions.length === 0 && !this.loading()) {
        // Keep panel open to show empty message
      }
    });
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Visible suggestions limited by maxResults */
  readonly visibleSuggestions = computed(() => {
    return this.suggestions().slice(0, this.maxResults());
  });

  /** Icon size based on input size */
  readonly iconSize = computed(() => {
    const sizeMap: Record<AutoCompleteSize, number> = {
      sm: 14,
      md: 16,
      lg: 18,
    };
    return sizeMap[this.size()];
  });

  /** Whether to show the clear button */
  readonly showClearButton = computed(() => {
    return this.showClear() && !this.disabled() && (this.query() || this.value());
  });

  /** Multiple selected items */
  readonly selectedItems = computed(() => {
    const val = this.value();
    if (!val) return [];
    return this.multiple() ? (val as AutoCompleteSuggestion[]) : [];
  });

  /** CSS classes for wrapper */
  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-block';
  });

  /** CSS classes for container */
  readonly containerClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const invalid = this.invalid();
    const disabled = this.disabled();
    const focused = this.focused();

    const baseClasses = [
      'relative',
      'flex',
      'items-center',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'border',
    ];

    const sizeClasses: Record<AutoCompleteSize, string[]> = {
      sm: ['min-h-8'],
      md: ['min-h-10'],
      lg: ['min-h-12'],
    };

    const variantClasses: Record<AutoCompleteVariant, string[]> = {
      default: ['bg-white', 'dark:bg-gray-900', 'border-gray-300', 'dark:border-gray-600'],
      filled: ['bg-gray-100', 'dark:bg-gray-800', 'border-transparent'],
      outlined: ['bg-transparent', 'border-gray-300', 'dark:border-gray-600'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else if (invalid) {
      stateClasses.push('border-red-500', 'dark:border-red-400');
    } else if (focused) {
      stateClasses.push('border-primary-500', 'ring-2', 'ring-primary-500/20');
    } else {
      stateClasses.push('hover:border-gray-400', 'dark:hover:border-gray-500');
    }

    return [...baseClasses, ...sizeClasses[size], ...variantClasses[variant], ...stateClasses].join(
      ' '
    );
  });

  /** CSS classes for input */
  readonly inputClasses = computed(() => {
    const size = this.size();

    const baseClasses = [
      'flex-1',
      'bg-transparent',
      'border-none',
      'outline-none',
      'text-gray-900',
      'dark:text-white',
      'placeholder:text-gray-400',
      'min-w-[120px]',
    ];

    const sizeClasses: Record<AutoCompleteSize, string[]> = {
      sm: ['text-sm', 'px-2.5', 'py-1'],
      md: ['text-sm', 'px-3', 'py-2'],
      lg: ['text-base', 'px-4', 'py-2.5'],
    };

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  /** CSS classes for dropdown panel */
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

  /** CSS classes for label */
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

  /** CSS classes for help text */
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

  /** Get label from suggestion */
  getLabel(item: AutoCompleteSuggestion): string {
    const fieldName = this.field();
    return String(item[fieldName] ?? item.label ?? '');
  }

  /** Get item classes */
  getItemClasses(index: number, item: AutoCompleteSuggestion): string {
    const highlighted = index === this.highlightedIndex();
    const disabled = item.disabled;

    const baseClasses = ['px-3', 'py-2', 'cursor-pointer', 'transition-colors', 'text-sm'];

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed', 'text-gray-400');
    } else if (highlighted) {
      baseClasses.push(
        'bg-primary-50',
        'dark:bg-primary-900/30',
        'text-primary-700',
        'dark:text-primary-300'
      );
    } else {
      baseClasses.push(
        'text-gray-900',
        'dark:text-white',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-800'
      );
    }

    return baseClasses.join(' ');
  }

  /** Handle input */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.query.set(value);

    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Check minimum length
    if (value.length >= this.minLength()) {
      this.searchTimeout = setTimeout(() => {
        this.completeMethod.emit({ query: value, originalEvent: event });
        this.showPanel();
      }, this.delay());
    } else {
      this.hidePanel();
    }

    // Clear value if forceSelection and text doesn't match
    if (this.forceSelection() && !this.multiple()) {
      const currentValue = this.value() as AutoCompleteSuggestion | null;
      if (currentValue && this.getLabel(currentValue) !== value) {
        this.value.set(null);
        this.onChange(null);
      }
    }
  }

  /** Handle focus */
  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.onFocus.emit(event);
  }

  /** Handle blur */
  handleBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.onTouched();
    this.onBlur.emit(event);

    // Handle force selection on blur
    if (this.forceSelection() && !this.multiple()) {
      const currentValue = this.value() as AutoCompleteSuggestion | null;
      if (!currentValue) {
        this.query.set('');
      } else if (this.getLabel(currentValue) !== this.query()) {
        this.query.set(this.getLabel(currentValue));
      }
    }
  }

  /** Handle keydown */
  onKeydown(event: KeyboardEvent): void {
    const suggestions = this.visibleSuggestions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.panelVisible()) {
          this.showPanel();
        } else {
          const nextIndex = Math.min(this.highlightedIndex() + 1, suggestions.length - 1);
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
          const item = suggestions[this.highlightedIndex()];
          if (item && !item.disabled) {
            this.selectItem(item, event);
          }
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

  /** Select an item */
  selectItem(item: AutoCompleteSuggestion, event: Event): void {
    if (item.disabled) return;

    if (this.multiple()) {
      const current = (this.value() as AutoCompleteSuggestion[]) || [];
      const exists = current.some((i) => i.value === item.value);
      if (!exists) {
        const newValue = [...current, item];
        this.value.set(newValue);
        this.onChange(newValue);
      }
      this.query.set('');
    } else {
      this.value.set(item);
      this.query.set(this.getLabel(item));
      this.onChange(item);
    }

    this.onSelect.emit({ value: item, originalEvent: event });
    this.hidePanel();
    this.inputElement()?.nativeElement.focus();
  }

  /** Remove a selected item (multiple mode) */
  removeItem(item: AutoCompleteSuggestion, event: Event): void {
    event.stopPropagation();
    const current = (this.value() as AutoCompleteSuggestion[]) || [];
    const newValue = current.filter((i) => i.value !== item.value);
    this.value.set(newValue.length > 0 ? newValue : null);
    this.onChange(newValue.length > 0 ? newValue : null);
  }

  /** Clear selection */
  clear(event: Event): void {
    event.stopPropagation();
    this.value.set(null);
    this.query.set('');
    this.onChange(null);
    this.onClear.emit();
    this.inputElement()?.nativeElement.focus();
  }

  /** Toggle dropdown */
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    if (this.panelVisible()) {
      this.hidePanel();
    } else {
      this.completeMethod.emit({ query: this.query(), originalEvent: event });
      this.showPanel();
    }
  }

  /** Show dropdown panel */
  showPanel(): void {
    if (!this.disabled()) {
      this.panelVisible.set(true);
      this.highlightedIndex.set(-1);
      this.onShow.emit();
    }
  }

  /** Hide dropdown panel */
  hidePanel(): void {
    this.panelVisible.set(false);
    this.highlightedIndex.set(-1);
    this.onHide.emit();
  }

  /** Handle document click to close dropdown */
  onDocumentClick(event: MouseEvent): void {
    const container = this.containerElement()?.nativeElement;
    if (container && !container.contains(event.target as Node)) {
      this.hidePanel();
    }
  }
}
