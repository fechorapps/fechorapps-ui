import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  model,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Check,
  ChevronRight,
  ChevronDown,
  Minus,
  LucideAngularModule,
} from 'lucide-angular';

/**
 * TreeTable node interface
 */
export interface TreeTableNode<T = unknown> {
  data: T;
  children?: TreeTableNode<T>[];
  expanded?: boolean;
  leaf?: boolean;
  [key: string]: unknown;
}

/**
 * TreeTable column definition
 */
export interface TreeTableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  expander?: boolean;
  [key: string]: unknown;
}

/**
 * TreeTable selection mode
 */
export type TreeTableSelectionMode = 'single' | 'multiple' | 'checkbox';

/**
 * Node expand event
 */
export interface TreeTableNodeExpandEvent<T = unknown> {
  originalEvent: Event;
  node: TreeTableNode<T>;
}

/**
 * Selection change event
 */
export interface TreeTableSelectionChangeEvent<T = unknown> {
  originalEvent: Event;
  node: TreeTableNode<T>;
}

/**
 * UiTreeTable Component
 *
 * A table component for displaying hierarchical data.
 *
 * @example
 * ```html
 * <ui-tree-table
 *   [value]="nodes"
 *   [columns]="columns"
 *   selectionMode="checkbox"
 *   [(selection)]="selectedNodes"
 * >
 * </ui-tree-table>
 * ```
 */
@Component({
  selector: 'ui-tree-table',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet],
  templateUrl: './tree-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiTreeTableComponent<T = unknown> {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly expandIcon = ChevronRight;
  protected readonly collapseIcon = ChevronDown;
  protected readonly sortAscIcon = ArrowUp;
  protected readonly sortDescIcon = ArrowDown;
  protected readonly sortNoneIcon = ArrowUpDown;
  protected readonly checkIcon = Check;
  protected readonly indeterminateIcon = Minus;

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly headerTemplate = contentChild<TemplateRef<unknown>>('header');
  readonly bodyTemplate = contentChild<TemplateRef<unknown>>('body');
  readonly emptyTemplate = contentChild<TemplateRef<unknown>>('empty');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Tree nodes */
  readonly value = input<TreeTableNode<T>[]>([]);

  /** Column definitions */
  readonly columns = input<TreeTableColumn[]>([]);

  /** Selection mode */
  readonly selectionMode = input<TreeTableSelectionMode | null>(null);

  /** Selected node(s) */
  readonly selection = model<TreeTableNode<T> | TreeTableNode<T>[] | null>(null);

  /** Enable sorting */
  readonly sortable = input<boolean>(true);

  /** Current sort field */
  readonly sortField = model<string>('');

  /** Current sort order */
  readonly sortOrder = model<1 | -1>(1);

  /** Scrollable */
  readonly scrollable = input<boolean>(false);

  /** Scroll height */
  readonly scrollHeight = input<string>('');

  /** Striped rows */
  readonly striped = input<boolean>(false);

  /** Row hover effect */
  readonly rowHover = input<boolean>(true);

  /** Table size */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /** Loading state */
  readonly loading = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when node is expanded */
  readonly onNodeExpand = output<TreeTableNodeExpandEvent<T>>();

  /** Emitted when node is collapsed */
  readonly onNodeCollapse = output<TreeTableNodeExpandEvent<T>>();

  /** Emitted when selection changes */
  readonly onSelectionChange = output<TreeTableSelectionChangeEvent<T>>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly expandedNodes = signal<Set<string>>(new Set());

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly flattenedNodes = computed(() => {
    const result: { node: TreeTableNode<T>; level: number; parent: TreeTableNode<T> | null }[] = [];

    const flatten = (nodes: TreeTableNode<T>[], level: number, parent: TreeTableNode<T> | null) => {
      for (const node of nodes) {
        result.push({ node, level, parent });

        if (node.children && node.children.length > 0 && this.isExpanded(node)) {
          flatten(node.children, level + 1, node);
        }
      }
    };

    flatten(this.value(), 0, null);
    return result;
  });

  readonly isCheckboxMode = computed(() => this.selectionMode() === 'checkbox');

  readonly expanderColumn = computed(() => {
    return this.columns().find((col) => col.expander) || this.columns()[0];
  });

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  readonly tableClasses = computed(() => {
    return ['w-full', 'text-sm'].join(' ');
  });

  readonly headerCellClasses = computed(() => {
    return (column: TreeTableColumn) => {
      const classes = [
        'px-4',
        'font-semibold',
        'text-gray-700',
        'dark:text-gray-200',
        'bg-gray-50',
        'dark:bg-gray-800',
        'border-b',
        'border-gray-200',
        'dark:border-gray-700',
      ];

      const sizeMap = { sm: 'py-2 text-xs', md: 'py-3 text-sm', lg: 'py-4 text-base' };
      classes.push(sizeMap[this.size()]);

      if (column.align) {
        classes.push(`text-${column.align}`);
      } else {
        classes.push('text-left');
      }

      if (column.sortable !== false && this.sortable()) {
        classes.push(
          'cursor-pointer',
          'hover:bg-gray-100',
          'dark:hover:bg-gray-700',
          'select-none'
        );
      }

      return classes.join(' ');
    };
  });

  readonly bodyCellClasses = computed(() => {
    return (column: TreeTableColumn) => {
      const classes = [
        'px-4',
        'text-gray-900',
        'dark:text-gray-100',
        'border-b',
        'border-gray-200',
        'dark:border-gray-700',
      ];

      const sizeMap = { sm: 'py-2', md: 'py-3', lg: 'py-4' };
      classes.push(sizeMap[this.size()]);

      if (column.align) {
        classes.push(`text-${column.align}`);
      }

      return classes.join(' ');
    };
  });

  readonly rowClasses = computed(() => {
    return (node: TreeTableNode<T>, index: number) => {
      const classes = ['transition-colors'];

      if (this.striped() && index % 2 === 1) {
        classes.push('bg-gray-50', 'dark:bg-gray-800/50');
      } else {
        classes.push('bg-white', 'dark:bg-gray-900');
      }

      if (this.rowHover()) {
        classes.push('hover:bg-gray-100', 'dark:hover:bg-gray-800');
      }

      if (this.selectionMode()) {
        classes.push('cursor-pointer');

        if (this.isSelected(node)) {
          classes.push('bg-primary-50', 'dark:bg-primary-900/20');
        }
      }

      return classes.join(' ');
    };
  });

  // =========================================================================
  // METHODS - NODE HELPERS
  // =========================================================================

  getNodeKey(node: TreeTableNode<T>): string {
    return JSON.stringify(node.data);
  }

  hasChildren(node: TreeTableNode<T>): boolean {
    return !node.leaf && node.children !== undefined && node.children.length > 0;
  }

  isExpanded(node: TreeTableNode<T>): boolean {
    if (node.expanded === false) return false;
    return this.expandedNodes().has(this.getNodeKey(node)) || node.expanded === true;
  }

  toggleNode(event: Event, node: TreeTableNode<T>): void {
    event.stopPropagation();

    if (!this.hasChildren(node)) return;

    const nodeKey = this.getNodeKey(node);
    const expanded = new Set(this.expandedNodes());

    if (this.isExpanded(node)) {
      expanded.delete(nodeKey);
      this.onNodeCollapse.emit({ originalEvent: event, node });
    } else {
      expanded.add(nodeKey);
      this.onNodeExpand.emit({ originalEvent: event, node });
    }

    this.expandedNodes.set(expanded);
  }

  // =========================================================================
  // METHODS - SELECTION
  // =========================================================================

  isSelected(node: TreeTableNode<T>): boolean {
    const sel = this.selection();
    if (!sel) return false;

    const nodeKey = this.getNodeKey(node);

    if (Array.isArray(sel)) {
      return sel.some((s) => this.getNodeKey(s) === nodeKey);
    }

    return this.getNodeKey(sel) === nodeKey;
  }

  isPartiallySelected(node: TreeTableNode<T>): boolean {
    if (!this.isCheckboxMode() || !node.children || node.children.length === 0) {
      return false;
    }

    const allSelected = node.children.every((child) => this.isSelected(child));
    const someSelected = node.children.some(
      (child) => this.isSelected(child) || this.isPartiallySelected(child)
    );

    return someSelected && !allSelected;
  }

  onRowClick(event: Event, node: TreeTableNode<T>): void {
    if (!this.selectionMode()) return;

    if (this.selectionMode() === 'single') {
      if (this.isSelected(node)) {
        this.selection.set(null);
      } else {
        this.selection.set(node);
      }
    } else if (this.selectionMode() === 'multiple' || this.isCheckboxMode()) {
      const current = (this.selection() as TreeTableNode<T>[]) || [];

      if (this.isSelected(node)) {
        this.selection.set(current.filter((s) => this.getNodeKey(s) !== this.getNodeKey(node)));
      } else {
        this.selection.set([...current, node]);
      }
    }

    this.onSelectionChange.emit({ originalEvent: event, node });
  }

  // =========================================================================
  // METHODS - SORTING
  // =========================================================================

  onColumnClick(column: TreeTableColumn): void {
    if (column.sortable === false || !this.sortable()) return;

    const currentField = this.sortField();
    const currentOrder = this.sortOrder();

    if (currentField === column.field) {
      this.sortOrder.set(currentOrder === 1 ? -1 : 1);
    } else {
      this.sortField.set(column.field);
      this.sortOrder.set(1);
    }
  }

  getSortIcon(column: TreeTableColumn) {
    if (this.sortField() !== column.field) {
      return this.sortNoneIcon;
    }
    return this.sortOrder() === 1 ? this.sortAscIcon : this.sortDescIcon;
  }

  // =========================================================================
  // METHODS - HELPERS
  // =========================================================================

  getCellValue(node: TreeTableNode<T>, column: TreeTableColumn): unknown {
    return (node.data as Record<string, unknown>)[column.field];
  }

  isExpanderColumn(column: TreeTableColumn): boolean {
    return column === this.expanderColumn();
  }

  getRowContext(
    entry: { node: TreeTableNode<T>; level: number; parent: TreeTableNode<T> | null },
    index: number
  ) {
    return {
      $implicit: entry.node,
      rowData: entry.node.data,
      node: entry.node,
      level: entry.level,
      parent: entry.parent,
      rowIndex: index,
      columns: this.columns(),
      expanded: this.isExpanded(entry.node),
      selected: this.isSelected(entry.node),
      hasChildren: this.hasChildren(entry.node),
    };
  }
}
