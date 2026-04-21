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
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  Check,
  Minus,
  Search,
  LucideAngularModule,
} from 'lucide-angular';

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
  styleClass?: string;
  [key: string]: unknown;
}

/**
 * Tree selection mode
 */
export type TreeSelectionMode = 'single' | 'multiple' | 'checkbox';

/**
 * Tree node selection event
 */
export interface TreeNodeSelectEvent {
  originalEvent: Event;
  node: TreeNode;
}

/**
 * Tree node expand event
 */
export interface TreeNodeExpandEvent {
  originalEvent: Event;
  node: TreeNode;
}

/**
 * UiTree Component
 *
 * A hierarchical tree component for displaying data in a tree structure.
 *
 * @example
 * ```html
 * <ui-tree
 *   [value]="nodes"
 *   selectionMode="checkbox"
 *   [(selection)]="selectedNodes"
 * ></ui-tree>
 * ```
 */
@Component({
  selector: 'ui-tree',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet],
  templateUrl: './tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiTreeComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly expandIcon = ChevronRight;
  protected readonly collapseIcon = ChevronDown;
  protected readonly folderIcon = Folder;
  protected readonly folderOpenIcon = FolderOpen;
  protected readonly fileIcon = File;
  protected readonly checkIcon = Check;
  protected readonly indeterminateIcon = Minus;
  protected readonly searchIcon = Search;

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly nodeTemplate = contentChild<TemplateRef<unknown>>('node');
  readonly headerTemplate = contentChild<TemplateRef<unknown>>('header');
  readonly emptyTemplate = contentChild<TemplateRef<unknown>>('empty');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Tree nodes */
  readonly value = input<TreeNode[]>([]);

  /** Selected nodes */
  readonly selection = model<TreeNode | TreeNode[] | null>(null);

  /** Selection mode */
  readonly selectionMode = input<TreeSelectionMode>('single');

  /** Enable filtering */
  readonly filter = input<boolean>(false);

  /** Filter placeholder */
  readonly filterPlaceholder = input<string>('Search...');

  /** Filter field */
  readonly filterBy = input<string>('label');

  /** Filter mode */
  readonly filterMode = input<'lenient' | 'strict'>('lenient');

  /** Show loading indicator */
  readonly loading = input<boolean>(false);

  /** Propagate selection to children */
  readonly propagateSelectionDown = input<boolean>(true);

  /** Propagate selection to parent */
  readonly propagateSelectionUp = input<boolean>(true);

  /** Virtual scroll height */
  readonly scrollHeight = input<string>('');

  /** Disabled state */
  readonly disabled = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when a node is selected */
  readonly onNodeSelect = output<TreeNodeSelectEvent>();

  /** Emitted when a node is unselected */
  readonly onNodeUnselect = output<TreeNodeSelectEvent>();

  /** Emitted when a node is expanded */
  readonly onNodeExpand = output<TreeNodeExpandEvent>();

  /** Emitted when a node is collapsed */
  readonly onNodeCollapse = output<TreeNodeExpandEvent>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly filterValue = signal<string>('');
  readonly expandedKeys = signal<Set<string>>(new Set());

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly filteredNodes = computed(() => {
    const filter = this.filterValue().toLowerCase();
    if (!filter) return this.value();

    const filterField = this.filterBy();
    const mode = this.filterMode();

    const filterTree = (nodes: TreeNode[]): TreeNode[] => {
      const result: TreeNode[] = [];

      for (const node of nodes) {
        const nodeValue = String(
          (node as Record<string, unknown>)[filterField] || ''
        ).toLowerCase();
        const matchesFilter = nodeValue.includes(filter);
        const filteredChildren = node.children ? filterTree(node.children) : [];

        if (mode === 'lenient') {
          // Include if node matches OR has matching children
          if (matchesFilter || filteredChildren.length > 0) {
            result.push({
              ...node,
              children: filteredChildren.length > 0 ? filteredChildren : node.children,
              expanded: filter ? true : node.expanded,
            });
          }
        } else {
          // Strict: only include if node itself matches
          if (matchesFilter) {
            result.push({
              ...node,
              children: filteredChildren,
              expanded: filter ? true : node.expanded,
            });
          }
        }
      }

      return result;
    };

    return filterTree(this.value());
  });

  readonly isCheckboxMode = computed(() => this.selectionMode() === 'checkbox');
  readonly isMultipleMode = computed(
    () => this.selectionMode() === 'multiple' || this.isCheckboxMode()
  );

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  readonly containerClasses = computed(() => {
    const classes = [
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-lg',
      'bg-white',
      'dark:bg-gray-900',
      'overflow-hidden',
    ];

    if (this.disabled()) {
      classes.push('opacity-50', 'pointer-events-none');
    }

    return classes.join(' ');
  });

  readonly treeClasses = computed(() => {
    const classes = ['p-2'];

    if (this.scrollHeight()) {
      classes.push('overflow-y-auto');
    }

    return classes.join(' ');
  });

  // =========================================================================
  // METHODS - FILTER
  // =========================================================================

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterValue.set(target.value);
  }

  // =========================================================================
  // METHODS - EXPANSION
  // =========================================================================

  isExpanded(node: TreeNode): boolean {
    return this.expandedKeys().has(node.key) || node.expanded === true;
  }

  toggleExpand(event: Event, node: TreeNode): void {
    event.stopPropagation();
    if (node.leaf) return;

    const keys = new Set(this.expandedKeys());

    if (this.isExpanded(node)) {
      keys.delete(node.key);
      this.onNodeCollapse.emit({ originalEvent: event, node });
    } else {
      keys.add(node.key);
      this.onNodeExpand.emit({ originalEvent: event, node });
    }

    this.expandedKeys.set(keys);
  }

  expandAll(): void {
    const keys = new Set<string>();
    const addKeys = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.children && node.children.length > 0) {
          keys.add(node.key);
          addKeys(node.children);
        }
      }
    };
    addKeys(this.value());
    this.expandedKeys.set(keys);
  }

  collapseAll(): void {
    this.expandedKeys.set(new Set());
  }

  // =========================================================================
  // METHODS - SELECTION
  // =========================================================================

  isSelected(node: TreeNode): boolean {
    const sel = this.selection();
    if (!sel) return false;

    if (Array.isArray(sel)) {
      return sel.some((s) => s.key === node.key);
    }

    return sel.key === node.key;
  }

  isPartiallySelected(node: TreeNode): boolean {
    if (!this.isCheckboxMode() || !node.children || node.children.length === 0) {
      return false;
    }

    const allSelected = this.areAllChildrenSelected(node);
    const someSelected = this.areSomeChildrenSelected(node);

    return someSelected && !allSelected;
  }

  private areAllChildrenSelected(node: TreeNode): boolean {
    if (!node.children) return false;

    return node.children.every((child) => {
      if (child.children && child.children.length > 0) {
        return this.isSelected(child) && this.areAllChildrenSelected(child);
      }
      return this.isSelected(child);
    });
  }

  private areSomeChildrenSelected(node: TreeNode): boolean {
    if (!node.children) return false;

    return node.children.some((child) => {
      if (child.children && child.children.length > 0) {
        return this.isSelected(child) || this.areSomeChildrenSelected(child);
      }
      return this.isSelected(child);
    });
  }

  onNodeClick(event: Event, node: TreeNode): void {
    if (this.disabled() || node.selectable === false) return;

    if (this.isCheckboxMode()) {
      this.toggleCheckbox(event, node);
    } else if (this.isMultipleMode()) {
      this.toggleMultipleSelection(event, node);
    } else {
      this.toggleSingleSelection(event, node);
    }
  }

  private toggleSingleSelection(event: Event, node: TreeNode): void {
    if (this.isSelected(node)) {
      this.selection.set(null);
      this.onNodeUnselect.emit({ originalEvent: event, node });
    } else {
      this.selection.set(node);
      this.onNodeSelect.emit({ originalEvent: event, node });
    }
  }

  private toggleMultipleSelection(event: Event, node: TreeNode): void {
    const current = (this.selection() as TreeNode[]) || [];

    if (this.isSelected(node)) {
      this.selection.set(current.filter((s) => s.key !== node.key));
      this.onNodeUnselect.emit({ originalEvent: event, node });
    } else {
      this.selection.set([...current, node]);
      this.onNodeSelect.emit({ originalEvent: event, node });
    }
  }

  private toggleCheckbox(event: Event, node: TreeNode): void {
    const current = (this.selection() as TreeNode[]) || [];
    let newSelection: TreeNode[];

    if (this.isSelected(node)) {
      // Unselect
      newSelection = current.filter((s) => s.key !== node.key);

      // Propagate down
      if (this.propagateSelectionDown() && node.children) {
        const childKeys = this.getAllChildKeys(node);
        newSelection = newSelection.filter((s) => !childKeys.has(s.key));
      }

      this.onNodeUnselect.emit({ originalEvent: event, node });
    } else {
      // Select
      newSelection = [...current, node];

      // Propagate down
      if (this.propagateSelectionDown() && node.children) {
        const allChildren = this.getAllChildren(node);
        for (const child of allChildren) {
          if (!newSelection.some((s) => s.key === child.key)) {
            newSelection.push(child);
          }
        }
      }

      this.onNodeSelect.emit({ originalEvent: event, node });
    }

    // Propagate up
    if (this.propagateSelectionUp()) {
      newSelection = this.updateParentSelection(newSelection);
    }

    this.selection.set(newSelection);
  }

  private getAllChildKeys(node: TreeNode): Set<string> {
    const keys = new Set<string>();
    const collect = (n: TreeNode) => {
      if (n.children) {
        for (const child of n.children) {
          keys.add(child.key);
          collect(child);
        }
      }
    };
    collect(node);
    return keys;
  }

  private getAllChildren(node: TreeNode): TreeNode[] {
    const children: TreeNode[] = [];
    const collect = (n: TreeNode) => {
      if (n.children) {
        for (const child of n.children) {
          children.push(child);
          collect(child);
        }
      }
    };
    collect(node);
    return children;
  }

  private updateParentSelection(selection: TreeNode[]): TreeNode[] {
    // This is a simplified version - full implementation would need parent references
    return selection;
  }

  // =========================================================================
  // METHODS - NODE HELPERS
  // =========================================================================

  hasChildren(node: TreeNode): boolean {
    return !node.leaf && node.children !== undefined && node.children.length > 0;
  }

  getNodeClasses(node: TreeNode, level: number): string {
    const classes = [
      'flex',
      'items-center',
      'gap-1',
      'px-2',
      'py-1',
      'rounded-lg',
      'cursor-pointer',
      'transition-colors',
    ];

    if (this.isSelected(node)) {
      classes.push('bg-primary-50', 'dark:bg-primary-900/20');
    } else {
      classes.push('hover:bg-gray-100', 'dark:hover:bg-gray-800');
    }

    if (node.styleClass) {
      classes.push(node.styleClass);
    }

    return classes.join(' ');
  }

  getCheckboxClasses(node: TreeNode): string {
    const classes = [
      'w-4',
      'h-4',
      'rounded',
      'border',
      'flex',
      'items-center',
      'justify-center',
      'shrink-0',
      'transition-colors',
    ];

    if (this.isSelected(node)) {
      classes.push('bg-primary', 'border-primary', 'text-white');
    } else if (this.isPartiallySelected(node)) {
      classes.push('bg-primary', 'border-primary', 'text-white');
    } else {
      classes.push('border-gray-300', 'dark:border-gray-600', 'bg-white', 'dark:bg-gray-800');
    }

    return classes.join(' ');
  }

  getNodeContext(node: TreeNode, level: number) {
    return {
      $implicit: node,
      level,
      expanded: this.isExpanded(node),
      selected: this.isSelected(node),
      hasChildren: this.hasChildren(node),
    };
  }
}
