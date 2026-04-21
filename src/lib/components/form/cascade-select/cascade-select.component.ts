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

import { ChevronDown, ChevronRight, LucideAngularModule } from 'lucide-angular';

/**
 * Cascade select option interface
 */
export interface CascadeSelectOption {
  label: string;
  value?: unknown;
  children?: CascadeSelectOption[];
  disabled?: boolean;
}

/**
 * CascadeSelect sizes
 */
export type CascadeSelectSize = 'sm' | 'md' | 'lg';

/**
 * UiCascadeSelect Component
 *
 * A hierarchical dropdown for selecting nested options (e.g., country > state > city).
 *
 * @example
 * ```html
 * <ui-cascade-select
 *   [(ngModel)]="selectedCity"
 *   [options]="locations"
 *   placeholder="Select location"
 * ></ui-cascade-select>
 * ```
 */
@Component({
  selector: 'ui-cascade-select',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './cascade-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiCascadeSelectComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiCascadeSelectComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly chevronDownIcon = ChevronDown;
  protected readonly chevronRightIcon = ChevronRight;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly containerRef = viewChild<ElementRef>('containerEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Options to display */
  readonly options = input<CascadeSelectOption[]>([]);

  /** Placeholder text */
  readonly placeholder = input<string>('Select');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Size */
  readonly size = input<CascadeSelectSize>('md');

  /** Whether select is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether select is invalid */
  readonly invalid = input<boolean>(false);

  /** Whether to take full width */
  readonly fullWidth = input<boolean>(true);

  /** Input id */
  readonly inputId = input<string>('');

  /** Option label field (for object options) */
  readonly optionLabel = input<string>('label');

  /** Option value field (for object options) */
  readonly optionValue = input<string>('value');

  /** Option children field */
  readonly optionGroupChildren = input<string>('children');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Selected value */
  readonly value = model<unknown>(null);

  /** Panel visibility */
  readonly panelVisible = signal<boolean>(false);

  /** Current path of expanded options */
  readonly expandedPath = signal<CascadeSelectOption[]>([]);

  /** Focused state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when value changes */
  readonly onChange = output<unknown>();

  /** Emitted when panel shows */
  readonly onShow = output<void>();

  /** Emitted when panel hides */
  readonly onHide = output<void>();

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

  readonly displayLabel = computed(() => {
    const val = this.value();
    if (!val) return '';

    // Find the label for the selected value
    const findLabel = (options: CascadeSelectOption[], path: string[] = []): string => {
      for (const opt of options) {
        const optValue = this.getOptionValue(opt);
        const optLabel = this.getOptionLabel(opt);

        if (optValue === val) {
          return [...path, optLabel].join(' / ');
        }

        const children = this.getOptionChildren(opt);
        if (children && children.length > 0) {
          const result = findLabel(children, [...path, optLabel]);
          if (result) return result;
        }
      }
      return '';
    };

    return findLabel(this.options());
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<CascadeSelectSize, number> = { sm: 14, md: 16, lg: 18 };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-block';
  });

  readonly triggerClasses = computed(() => {
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
      'bg-white',
      'dark:bg-gray-900',
    ];

    const sizeClasses: Record<CascadeSelectSize, string[]> = {
      sm: ['px-2.5', 'py-1.5', 'text-sm', 'h-8'],
      md: ['px-3', 'py-2', 'text-sm', 'h-10'],
      lg: ['px-4', 'py-2.5', 'text-base', 'h-12'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push(
        'opacity-50',
        'cursor-not-allowed',
        'border-gray-300',
        'dark:border-gray-600'
      );
    } else {
      stateClasses.push('cursor-pointer');

      if (invalid) {
        stateClasses.push('border-red-500');
      } else if (focused || panelVisible) {
        stateClasses.push('border-primary', 'ring-2', 'ring-ring/20');
      } else {
        stateClasses.push('border-gray-300', 'dark:border-gray-600', 'hover:border-gray-400');
      }
    }

    return [...baseClasses, ...sizeClasses[size], ...stateClasses].join(' ');
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
  // METHODS - OPTION HELPERS
  // =========================================================================

  getOptionLabel(option: CascadeSelectOption): string {
    const record = option as unknown as Record<string, unknown>;
    return (record[this.optionLabel()] as string) || '';
  }

  getOptionValue(option: CascadeSelectOption): unknown {
    const valueField = this.optionValue();
    const record = option as unknown as Record<string, unknown>;
    return record[valueField] ?? option;
  }

  getOptionChildren(option: CascadeSelectOption): CascadeSelectOption[] | undefined {
    const record = option as unknown as Record<string, unknown>;
    return record[this.optionGroupChildren()] as CascadeSelectOption[] | undefined;
  }

  hasChildren(option: CascadeSelectOption): boolean {
    const children = this.getOptionChildren(option);
    return !!children && children.length > 0;
  }

  isOptionDisabled(option: CascadeSelectOption): boolean {
    return option.disabled === true;
  }

  // =========================================================================
  // METHODS - PANEL
  // =========================================================================

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
    this.expandedPath.set([]);
    this.onShow.emit();
  }

  closePanel(): void {
    this.panelVisible.set(false);
    this.expandedPath.set([]);
    this.onHide.emit();
  }

  // =========================================================================
  // METHODS - SELECTION
  // =========================================================================

  selectOption(option: CascadeSelectOption, level: number): void {
    if (this.isOptionDisabled(option)) return;

    if (this.hasChildren(option)) {
      // Expand this option
      const currentPath = this.expandedPath();
      const newPath = currentPath.slice(0, level);
      newPath.push(option);
      this.expandedPath.set(newPath);
    } else {
      // Select this option
      const val = this.getOptionValue(option);
      this.value.set(val);
      this.onChangeFn(val);
      this.onChange.emit(val);
      this.closePanel();
    }
  }

  isExpanded(option: CascadeSelectOption, level: number): boolean {
    const path = this.expandedPath();
    return path[level] === option;
  }

  getOptionsAtLevel(level: number): CascadeSelectOption[] {
    if (level === 0) {
      return this.options();
    }

    const path = this.expandedPath();
    if (level > path.length) return [];

    const parentOption = path[level - 1];
    return this.getOptionChildren(parentOption) || [];
  }

  // =========================================================================
  // METHODS - HANDLERS
  // =========================================================================

  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
  }

  handleBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.onTouchedFn();
  }

  getOptionClasses(option: CascadeSelectOption, level: number): string {
    const disabled = this.isOptionDisabled(option);
    const expanded = this.isExpanded(option, level);
    const hasChildren = this.hasChildren(option);
    const selected = this.getOptionValue(option) === this.value();

    const classes = [
      'flex',
      'items-center',
      'justify-between',
      'px-3',
      'py-2',
      'text-sm',
      'transition-colors',
    ];

    if (disabled) {
      classes.push('opacity-50', 'cursor-not-allowed', 'text-gray-400');
    } else {
      classes.push('cursor-pointer');

      if (selected && !hasChildren) {
        classes.push(
          'bg-primary-50',
          'dark:bg-primary-900/20',
          'text-primary-600',
          'dark:text-primary-400'
        );
      } else if (expanded) {
        classes.push('bg-gray-100', 'dark:bg-gray-700');
      } else {
        classes.push(
          'text-gray-700',
          'dark:text-gray-300',
          'hover:bg-gray-50',
          'dark:hover:bg-gray-700'
        );
      }
    }

    return classes.join(' ');
  }
}
