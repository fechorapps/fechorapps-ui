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

import { Check, LucideAngularModule } from 'lucide-angular';

/**
 * Listbox sizes
 */
export type ListboxSize = 'sm' | 'md' | 'lg';

/**
 * Listbox option
 */
export interface ListboxOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
  group?: string;
}

/**
 * Listbox option group
 */
export interface ListboxOptionGroup<T = unknown> {
  label: string;
  options: ListboxOption<T>[];
}

/**
 * UiListbox Component
 *
 * A list of selectable options.
 *
 * @example
 * ```html
 * <ui-listbox [(ngModel)]="selected" [options]="options"></ui-listbox>
 * <ui-listbox [(ngModel)]="selected" [options]="options" [multiple]="true"></ui-listbox>
 * ```
 */
@Component({
  selector: 'ui-listbox',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './listbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiListboxComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiListboxComponent<T = unknown> implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly checkIcon = Check;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Size */
  readonly size = input<ListboxSize>('md');

  /** Options */
  readonly options = input<ListboxOption<T>[]>([]);

  /** Option groups */
  readonly optionGroups = input<ListboxOptionGroup<T>[]>([]);

  /** Allow multiple selection */
  readonly multiple = input<boolean>(false);

  /** Whether checkbox style is used */
  readonly checkbox = input<boolean>(false);

  /** Filter enabled */
  readonly filter = input<boolean>(false);

  /** Filter placeholder */
  readonly filterPlaceholder = input<string>('Search...');

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is invalid */
  readonly invalid = input<boolean>(false);

  /** Max visible items (enables scrolling) */
  readonly listHeight = input<string>('200px');

  /** Empty message */
  readonly emptyMessage = input<string>('No results found');

  /** Label */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Selected value(s) */
  readonly value = model<T | T[] | null>(null);

  /** Filter value */
  readonly filterValue = signal<string>('');

  /** Focused option index */
  readonly focusedIndex = signal<number>(-1);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when selection changes */
  readonly onChange = output<T | T[] | null>();

  /** Emitted on filter */
  readonly onFilter = output<string>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: T | T[] | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: T | T[] | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly iconSize = computed(() => {
    const sizeMap: Record<ListboxSize, number> = { sm: 14, md: 16, lg: 18 };
    return sizeMap[this.size()];
  });

  readonly flatOptions = computed(() => {
    const groups = this.optionGroups();
    const options = this.options();

    if (groups.length > 0) {
      return groups.flatMap((g) => g.options);
    }
    return options;
  });

  readonly filteredOptions = computed(() => {
    const filter = this.filterValue().toLowerCase();
    const options = this.flatOptions();

    if (!filter) return options;

    return options.filter((opt) => opt.label.toLowerCase().includes(filter));
  });

  readonly filteredGroups = computed(() => {
    const filter = this.filterValue().toLowerCase();
    const groups = this.optionGroups();

    if (!filter) return groups;

    return groups
      .map((group) => ({
        ...group,
        options: group.options.filter((opt) => opt.label.toLowerCase().includes(filter)),
      }))
      .filter((group) => group.options.length > 0);
  });

  readonly hasGroups = computed(() => this.optionGroups().length > 0);

  readonly containerClasses = computed(() => {
    const invalid = this.invalid();
    const disabled = this.disabled();

    const baseClasses = ['border', 'rounded-lg', 'bg-white', 'dark:bg-gray-900', 'overflow-hidden'];

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    }

    if (invalid) {
      baseClasses.push('border-red-500');
    } else {
      baseClasses.push('border-gray-300', 'dark:border-gray-600');
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

  getOptionClasses(option: ListboxOption<T>, index: number): string {
    const size = this.size();
    const disabled = this.disabled() || option.disabled;
    const selected = this.isSelected(option);
    const focused = this.focusedIndex() === index;

    const baseClasses = [
      'flex',
      'items-center',
      'gap-2',
      'w-full',
      'transition-colors',
      'duration-150',
    ];

    const sizeClasses: Record<ListboxSize, string[]> = {
      sm: ['px-2', 'py-1.5', 'text-sm'],
      md: ['px-3', 'py-2', 'text-sm'],
      lg: ['px-4', 'py-2.5', 'text-base'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed', 'text-gray-400');
    } else {
      stateClasses.push('cursor-pointer');

      if (selected) {
        stateClasses.push(
          'bg-primary-50',
          'dark:bg-primary-900/30',
          'text-primary-700',
          'dark:text-primary-300'
        );
      } else if (focused) {
        stateClasses.push('bg-gray-100', 'dark:bg-gray-800');
      } else {
        stateClasses.push(
          'text-gray-900',
          'dark:text-white',
          'hover:bg-gray-50',
          'dark:hover:bg-gray-800'
        );
      }
    }

    return [...baseClasses, ...sizeClasses[size], ...stateClasses].join(' ');
  }

  getCheckboxClasses(option: ListboxOption<T>): string {
    const selected = this.isSelected(option);
    const disabled = this.disabled() || option.disabled;

    const baseClasses = [
      'w-4',
      'h-4',
      'rounded',
      'border',
      'flex',
      'items-center',
      'justify-center',
      'flex-shrink-0',
      'transition-colors',
    ];

    if (disabled) {
      baseClasses.push('opacity-50');
    }

    if (selected) {
      baseClasses.push('bg-primary-600', 'border-primary-600', 'text-white');
    } else {
      baseClasses.push('bg-white', 'dark:bg-gray-900', 'border-gray-300', 'dark:border-gray-600');
    }

    return baseClasses.join(' ');
  }

  isSelected(option: ListboxOption<T>): boolean {
    const currentValue = this.value();
    if (currentValue === null || currentValue === undefined) return false;

    if (this.multiple()) {
      return Array.isArray(currentValue) && currentValue.includes(option.value);
    }

    return currentValue === option.value;
  }

  selectOption(option: ListboxOption<T>): void {
    if (this.disabled() || option.disabled) return;

    if (this.multiple()) {
      const currentValues = (Array.isArray(this.value()) ? this.value() : []) as T[];
      let newValues: T[];

      if (currentValues.includes(option.value)) {
        newValues = currentValues.filter((v) => v !== option.value);
      } else {
        newValues = [...currentValues, option.value];
      }

      this.updateValue(newValues.length > 0 ? newValues : null);
    } else {
      this.updateValue(option.value);
    }
  }

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterValue.set(target.value);
    this.onFilter.emit(target.value);
  }

  onKeyDown(event: KeyboardEvent): void {
    const options = this.filter() ? this.filteredOptions() : this.flatOptions();
    const currentIndex = this.focusedIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex.set(Math.min(currentIndex + 1, options.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex.set(Math.max(currentIndex - 1, 0));
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (currentIndex >= 0 && currentIndex < options.length) {
          this.selectOption(options[currentIndex]);
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusedIndex.set(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusedIndex.set(options.length - 1);
        break;
    }
  }

  private updateValue(value: T | T[] | null): void {
    this.value.set(value);
    this.onChangeFn(value);
    this.onTouchedFn();
    this.onChange.emit(value);
  }
}
