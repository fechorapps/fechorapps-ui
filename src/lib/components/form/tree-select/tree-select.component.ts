import { NgTemplateOutlet } from '@angular/common';
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

import { Check, ChevronDown, ChevronRight, LucideAngularModule, Minus } from 'lucide-angular';

/**
 * Tree node interface
 */
export interface TreeNode {
  key: string;
  label: string;
  data?: unknown;
  icon?: string;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  selectable?: boolean;
}

/**
 * TreeSelect selection mode
 */
export type TreeSelectSelectionMode = 'single' | 'multiple' | 'checkbox';

/**
 * TreeSelect sizes
 */
export type TreeSelectSize = 'sm' | 'md' | 'lg';

/**
 * UiTreeSelect Component
 *
 * A dropdown with tree structure for hierarchical selection.
 *
 * @example
 * ```html
 * <ui-tree-select
 *   [(ngModel)]="selectedNodes"
 *   [options]="treeNodes"
 *   selectionMode="checkbox"
 * ></ui-tree-select>
 * ```
 */
@Component({
  selector: 'ui-tree-select',
  standalone: true,
  imports: [NgTemplateOutlet, LucideAngularModule],
  templateUrl: './tree-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiTreeSelectComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiTreeSelectComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly chevronDownIcon = ChevronDown;
  protected readonly chevronRightIcon = ChevronRight;
  protected readonly checkIcon = Check;
  protected readonly minusIcon = Minus;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly containerRef = viewChild<ElementRef>('containerEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Tree options */
  readonly options = input<TreeNode[]>([]);

  /** Selection mode */
  readonly selectionMode = input<TreeSelectSelectionMode>('single');

  /** Placeholder text */
  readonly placeholder = input<string>('Select');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Size */
  readonly size = input<TreeSelectSize>('md');

  /** Whether select is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether select is invalid */
  readonly invalid = input<boolean>(false);

  /** Whether to take full width */
  readonly fullWidth = input<boolean>(true);

  /** Input id */
  readonly inputId = input<string>('');

  /** Whether to show filter input */
  readonly filter = input<boolean>(false);

  /** Filter placeholder */
  readonly filterPlaceholder = input<string>('Search...');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Selected value(s) */
  readonly value = model<string | string[] | Record<string, boolean> | null>(null);

  /** Panel visibility */
  readonly panelVisible = signal<boolean>(false);

  /** Expanded nodes */
  readonly expandedKeys = signal<Set<string>>(new Set());

  /** Filter value */
  readonly filterValue = signal<string>('');

  /** Focused state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when value changes */
  readonly onNodeSelect = output<TreeNode>();

  /** Emitted when node is unselected */
  readonly onNodeUnselect = output<TreeNode>();

  /** Emitted when panel shows */
  readonly onShow = output<void>();

  /** Emitted when panel hides */
  readonly onHide = output<void>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: string | string[] | Record<string, boolean> | null) => void =
    () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string | string[] | Record<string, boolean> | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | string[] | Record<string, boolean> | null) => void): void {
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
    const mode = this.selectionMode();

    if (!val) return '';

    const findLabels = (nodes: TreeNode[], keys: string[]): string[] => {
      const labels: string[] = [];
      for (const node of nodes) {
        if (keys.includes(node.key)) {
          labels.push(node.label);
        }
        if (node.children) {
          labels.push(...findLabels(node.children, keys));
        }
      }
      return labels;
    };

    if (mode === 'single' && typeof val === 'string') {
      const labels = findLabels(this.options(), [val]);
      return labels[0] || '';
    }

    if (mode === 'multiple' && Array.isArray(val)) {
      const labels = findLabels(this.options(), val);
      return labels.length > 0 ? `${labels.length} selected` : '';
    }

    if (mode === 'checkbox' && typeof val === 'object' && !Array.isArray(val)) {
      const selectedKeys = Object.entries(val)
        .filter(([, v]) => v === true)
        .map(([k]) => k);
      const labels = findLabels(this.options(), selectedKeys);
      return labels.length > 0 ? `${labels.length} selected` : '';
    }

    return '';
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<TreeSelectSize, number> = { sm: 14, md: 16, lg: 18 };
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

    const sizeClasses: Record<TreeSelectSize, string[]> = {
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
        stateClasses.push('border-primary-500', 'ring-2', 'ring-primary-500/20');
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

  readonly filteredOptions = computed(() => {
    const filter = this.filterValue().toLowerCase();
    if (!filter) return this.options();

    const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
      const result: TreeNode[] = [];

      for (const node of nodes) {
        const matchesFilter = node.label.toLowerCase().includes(filter);
        const filteredChildren = node.children ? filterNodes(node.children) : [];

        if (matchesFilter || filteredChildren.length > 0) {
          result.push({
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children,
            expanded: filter ? true : node.expanded,
          });
        }
      }

      return result;
    };

    return filterNodes(this.options());
  });

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
    this.onShow.emit();
  }

  closePanel(): void {
    this.panelVisible.set(false);
    this.filterValue.set('');
    this.onHide.emit();
  }

  // =========================================================================
  // METHODS - TREE
  // =========================================================================

  toggleNode(node: TreeNode, event: Event): void {
    event.stopPropagation();

    const expanded = this.expandedKeys();
    const newExpanded = new Set(expanded);

    if (newExpanded.has(node.key)) {
      newExpanded.delete(node.key);
    } else {
      newExpanded.add(node.key);
    }

    this.expandedKeys.set(newExpanded);
  }

  isExpanded(node: TreeNode): boolean {
    return this.expandedKeys().has(node.key);
  }

  selectNode(node: TreeNode, event: Event): void {
    event.stopPropagation();

    if (node.selectable === false) return;

    const mode = this.selectionMode();

    if (mode === 'single') {
      this.value.set(node.key);
      this.onChangeFn(node.key);
      this.onNodeSelect.emit(node);
      this.closePanel();
    } else if (mode === 'multiple') {
      const current = (this.value() as string[]) || [];
      const index = current.indexOf(node.key);

      if (index >= 0) {
        const newValue = current.filter((k) => k !== node.key);
        this.value.set(newValue);
        this.onChangeFn(newValue);
        this.onNodeUnselect.emit(node);
      } else {
        const newValue = [...current, node.key];
        this.value.set(newValue);
        this.onChangeFn(newValue);
        this.onNodeSelect.emit(node);
      }
    } else if (mode === 'checkbox') {
      const current = (this.value() as Record<string, boolean>) || {};
      const isChecked = current[node.key] === true;

      const newValue = { ...current, [node.key]: !isChecked };

      // Handle children selection
      if (node.children) {
        this.setChildrenSelection(node.children, newValue, !isChecked);
      }

      this.value.set(newValue);
      this.onChangeFn(newValue);

      if (isChecked) {
        this.onNodeUnselect.emit(node);
      } else {
        this.onNodeSelect.emit(node);
      }
    }
  }

  private setChildrenSelection(
    children: TreeNode[],
    selection: Record<string, boolean>,
    checked: boolean
  ): void {
    for (const child of children) {
      selection[child.key] = checked;
      if (child.children) {
        this.setChildrenSelection(child.children, selection, checked);
      }
    }
  }

  isSelected(node: TreeNode): boolean {
    const val = this.value();
    const mode = this.selectionMode();

    if (!val) return false;

    if (mode === 'single') {
      return val === node.key;
    }

    if (mode === 'multiple') {
      return (val as string[]).includes(node.key);
    }

    if (mode === 'checkbox') {
      return (val as Record<string, boolean>)[node.key] === true;
    }

    return false;
  }

  getCheckboxState(node: TreeNode): 'checked' | 'unchecked' | 'indeterminate' {
    const val = this.value() as Record<string, boolean> | null;
    if (!val) return 'unchecked';

    if (val[node.key] === true) return 'checked';

    if (node.children && node.children.length > 0) {
      const childStates = node.children.map((child) => this.getCheckboxState(child));
      const hasChecked = childStates.some((s) => s === 'checked' || s === 'indeterminate');
      const allChecked = childStates.every((s) => s === 'checked');

      if (allChecked) return 'checked';
      if (hasChecked) return 'indeterminate';
    }

    return 'unchecked';
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

  onFilterInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterValue.set(input.value);
  }

  getNodeClasses(node: TreeNode): string {
    const selected = this.isSelected(node);
    const mode = this.selectionMode();

    const classes = [
      'flex',
      'items-center',
      'gap-2',
      'px-2',
      'py-1.5',
      'text-sm',
      'rounded',
      'cursor-pointer',
      'transition-colors',
    ];

    if (selected && mode !== 'checkbox') {
      classes.push(
        'bg-primary-50',
        'dark:bg-primary-900/20',
        'text-primary-600',
        'dark:text-primary-400'
      );
    } else {
      classes.push(
        'text-gray-700',
        'dark:text-gray-300',
        'hover:bg-gray-50',
        'dark:hover:bg-gray-700'
      );
    }

    return classes.join(' ');
  }
}
