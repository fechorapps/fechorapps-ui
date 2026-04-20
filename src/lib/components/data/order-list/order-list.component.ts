import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  input,
  model,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import {
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  GripVertical,
  LucideAngularModule,
  Search,
} from 'lucide-angular';

/**
 * Selection change event
 */
export interface OrderListSelectionChangeEvent<T = unknown> {
  originalEvent: Event;
  value: T[];
}

/**
 * Reorder event
 */
export interface OrderListReorderEvent<T = unknown> {
  items: T[];
}

/**
 * Filter event
 */
export interface OrderListFilterEvent {
  originalEvent: Event;
  value: string;
}

/**
 * UiOrderList Component
 *
 * A list component with reordering capability.
 *
 * @example
 * ```html
 * <ui-order-list [(value)]="items" [dragDrop]="true">
 *   <ng-template #item let-item>
 *     {{ item.name }}
 *   </ng-template>
 * </ui-order-list>
 * ```
 */
@Component({
  selector: 'ui-order-list',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet],
  templateUrl: './order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiOrderListComponent<T = unknown> {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly moveUpIcon = ArrowUp;
  protected readonly moveDownIcon = ArrowDown;
  protected readonly moveTopIcon = ChevronsUp;
  protected readonly moveBottomIcon = ChevronsDown;
  protected readonly dragIcon = GripVertical;
  protected readonly searchIcon = Search;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  readonly listRef = viewChild<ElementRef<HTMLUListElement>>('listEl');

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly itemTemplate = contentChild<TemplateRef<unknown>>('item');
  readonly headerTemplate = contentChild<TemplateRef<unknown>>('header');
  readonly emptyTemplate = contentChild<TemplateRef<unknown>>('empty');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** List items */
  readonly value = model<T[]>([]);

  /** Selected items */
  readonly selection = model<T[]>([]);

  /** Header text */
  readonly header = input<string>('');

  /** Enable drag and drop */
  readonly dragDrop = input<boolean>(true);

  /** Enable filter */
  readonly filter = input<boolean>(false);

  /** Filter placeholder */
  readonly filterPlaceholder = input<string>('Search...');

  /** Field to use for filtering */
  readonly filterBy = input<string>('');

  /** Show control buttons */
  readonly controlsPosition = input<'left' | 'right' | 'none'>('left');

  /** Enable multiple selection */
  readonly metaKeySelection = input<boolean>(true);

  /** Striped rows */
  readonly striped = input<boolean>(false);

  /** List height in pixels */
  readonly listHeight = input<string>('300px');

  /** Disabled state */
  readonly disabled = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when selection changes */
  readonly onSelectionChange = output<OrderListSelectionChangeEvent<T>>();

  /** Emitted when items are reordered */
  readonly onReorder = output<OrderListReorderEvent<T>>();

  /** Emitted when filter value changes */
  readonly onFilterChange = output<OrderListFilterEvent>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly filterValue = signal<string>('');
  readonly draggedItem = signal<T | null>(null);
  readonly draggedIndex = signal<number>(-1);

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly filteredItems = computed(() => {
    const items = this.value();
    const filter = this.filterValue().toLowerCase();
    const filterField = this.filterBy();

    if (!filter) return items;

    return items.filter((item) => {
      if (filterField && typeof item === 'object' && item !== null) {
        const value = (item as Record<string, unknown>)[filterField];
        return String(value).toLowerCase().includes(filter);
      }
      return String(item).toLowerCase().includes(filter);
    });
  });

  readonly hasSelection = computed(() => this.selection().length > 0);

  readonly canMoveUp = computed(() => {
    const sel = this.selection();
    const items = this.value();
    if (sel.length === 0) return false;

    const firstSelectedIndex = items.indexOf(sel[0]);
    return firstSelectedIndex > 0;
  });

  readonly canMoveDown = computed(() => {
    const sel = this.selection();
    const items = this.value();
    if (sel.length === 0) return false;

    const lastSelectedIndex = items.indexOf(sel[sel.length - 1]);
    return lastSelectedIndex < items.length - 1;
  });

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  readonly containerClasses = computed(() => {
    const classes = [
      'flex',
      'gap-2',
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-lg',
      'overflow-hidden',
      'bg-white',
      'dark:bg-gray-900',
    ];

    if (this.disabled()) {
      classes.push('opacity-50', 'pointer-events-none');
    }

    return classes.join(' ');
  });

  readonly controlsClasses = computed(() => {
    return [
      'flex',
      'flex-col',
      'gap-1',
      'p-2',
      'bg-gray-50',
      'dark:bg-gray-800',
      'border-r',
      'border-gray-200',
      'dark:border-gray-700',
    ].join(' ');
  });

  readonly buttonClasses = computed(() => {
    return [
      'p-2',
      'rounded-lg',
      'border',
      'border-gray-300',
      'dark:border-gray-600',
      'bg-white',
      'dark:bg-gray-700',
      'text-gray-700',
      'dark:text-gray-200',
      'hover:bg-gray-100',
      'dark:hover:bg-gray-600',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'transition-colors',
    ].join(' ');
  });

  readonly listClasses = computed(() => {
    return [
      'flex-1',
      'overflow-y-auto',
      'divide-y',
      'divide-gray-200',
      'dark:divide-gray-700',
    ].join(' ');
  });

  readonly itemClasses = computed(() => {
    return (item: T, index: number) => {
      const classes = [
        'flex',
        'items-center',
        'gap-2',
        'px-3',
        'py-2',
        'cursor-pointer',
        'transition-colors',
      ];

      if (this.isSelected(item)) {
        classes.push('bg-primary-50', 'dark:bg-primary-900/20');
      } else if (this.striped() && index % 2 === 1) {
        classes.push('bg-gray-50', 'dark:bg-gray-800/50');
      } else {
        classes.push('hover:bg-gray-50', 'dark:hover:bg-gray-800');
      }

      if (this.dragDrop()) {
        classes.push('draggable');
      }

      return classes.join(' ');
    };
  });

  // =========================================================================
  // METHODS - SELECTION
  // =========================================================================

  isSelected(item: T): boolean {
    return this.selection().includes(item);
  }

  onItemClick(event: MouseEvent, item: T): void {
    if (this.disabled()) return;

    let newSelection: T[];

    if (this.metaKeySelection() && (event.metaKey || event.ctrlKey)) {
      // Toggle selection
      if (this.isSelected(item)) {
        newSelection = this.selection().filter((s) => s !== item);
      } else {
        newSelection = [...this.selection(), item];
      }
    } else if (this.metaKeySelection() && event.shiftKey && this.selection().length > 0) {
      // Range selection
      const items = this.filteredItems();
      const lastSelected = this.selection()[this.selection().length - 1];
      const startIdx = items.indexOf(lastSelected);
      const endIdx = items.indexOf(item);
      const [from, to] = startIdx < endIdx ? [startIdx, endIdx] : [endIdx, startIdx];
      newSelection = items.slice(from, to + 1);
    } else {
      // Single selection
      newSelection = [item];
    }

    this.selection.set(newSelection);
    this.onSelectionChange.emit({
      originalEvent: event,
      value: newSelection,
    });
  }

  // =========================================================================
  // METHODS - REORDERING
  // =========================================================================

  moveUp(): void {
    if (!this.canMoveUp()) return;

    const items = [...this.value()];
    const sel = this.selection();

    for (const selected of sel) {
      const index = items.indexOf(selected);
      if (index > 0) {
        [items[index - 1], items[index]] = [items[index], items[index - 1]];
      }
    }

    this.value.set(items);
    this.onReorder.emit({ items });
  }

  moveDown(): void {
    if (!this.canMoveDown()) return;

    const items = [...this.value()];
    const sel = [...this.selection()].reverse();

    for (const selected of sel) {
      const index = items.indexOf(selected);
      if (index < items.length - 1) {
        [items[index], items[index + 1]] = [items[index + 1], items[index]];
      }
    }

    this.value.set(items);
    this.onReorder.emit({ items });
  }

  moveTop(): void {
    if (!this.hasSelection()) return;

    const items = [...this.value()];
    const sel = this.selection();
    const nonSelected = items.filter((item) => !sel.includes(item));

    this.value.set([...sel, ...nonSelected]);
    this.onReorder.emit({ items: this.value() });
  }

  moveBottom(): void {
    if (!this.hasSelection()) return;

    const items = [...this.value()];
    const sel = this.selection();
    const nonSelected = items.filter((item) => !sel.includes(item));

    this.value.set([...nonSelected, ...sel]);
    this.onReorder.emit({ items: this.value() });
  }

  // =========================================================================
  // METHODS - DRAG AND DROP
  // =========================================================================

  onDragStart(event: DragEvent, item: T, index: number): void {
    if (!this.dragDrop() || this.disabled()) return;

    this.draggedItem.set(item);
    this.draggedIndex.set(index);

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent, index: number): void {
    if (!this.dragDrop() || this.draggedItem() === null) return;

    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent, targetIndex: number): void {
    if (!this.dragDrop() || this.draggedItem() === null) return;

    event.preventDefault();

    const sourceIndex = this.draggedIndex();
    if (sourceIndex === targetIndex) {
      this.resetDrag();
      return;
    }

    const items = [...this.value()];
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, removed);

    this.value.set(items);
    this.onReorder.emit({ items });
    this.resetDrag();
  }

  onDragEnd(): void {
    this.resetDrag();
  }

  private resetDrag(): void {
    this.draggedItem.set(null);
    this.draggedIndex.set(-1);
  }

  // =========================================================================
  // METHODS - FILTER
  // =========================================================================

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterValue.set(target.value);
    this.onFilterChange.emit({
      originalEvent: event,
      value: target.value,
    });
  }

  // =========================================================================
  // METHODS - TEMPLATE CONTEXT
  // =========================================================================

  getItemContext(item: T, index: number) {
    return {
      $implicit: item,
      index,
      selected: this.isSelected(item),
    };
  }
}
