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
  ArrowRight,
  ArrowLeft,
  ChevronsRight,
  ChevronsLeft,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Search,
  LucideAngularModule,
} from 'lucide-angular';

/**
 * PickList move event
 */
export interface PickListMoveEvent<T = unknown> {
  items: T[];
  sourceList: 'source' | 'target';
  targetList: 'source' | 'target';
}

/**
 * UiPickList Component
 *
 * A dual list component for transferring items between source and target lists.
 *
 * @example
 * ```html
 * <ui-pick-list
 *   [(source)]="availableItems"
 *   [(target)]="selectedItems"
 * >
 *   <ng-template #item let-item>
 *     {{ item.name }}
 *   </ng-template>
 * </ui-pick-list>
 * ```
 */
@Component({
  selector: 'ui-pick-list',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet],
  templateUrl: './pick-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiPickListComponent<T = unknown> {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly moveRightIcon = ArrowRight;
  protected readonly moveLeftIcon = ArrowLeft;
  protected readonly moveAllRightIcon = ChevronsRight;
  protected readonly moveAllLeftIcon = ChevronsLeft;
  protected readonly moveUpIcon = ArrowUp;
  protected readonly moveDownIcon = ArrowDown;
  protected readonly moveTopIcon = ChevronsUp;
  protected readonly moveBottomIcon = ChevronsDown;
  protected readonly searchIcon = Search;

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly itemTemplate = contentChild<TemplateRef<unknown>>('item');
  readonly sourceHeaderTemplate = contentChild<TemplateRef<unknown>>('sourceHeader');
  readonly targetHeaderTemplate = contentChild<TemplateRef<unknown>>('targetHeader');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Source list items */
  readonly source = model<T[]>([]);

  /** Target list items */
  readonly target = model<T[]>([]);

  /** Source list header */
  readonly sourceHeader = input<string>('Available');

  /** Target list header */
  readonly targetHeader = input<string>('Selected');

  /** Enable filtering */
  readonly filter = input<boolean>(false);

  /** Source filter placeholder */
  readonly sourceFilterPlaceholder = input<string>('Search...');

  /** Target filter placeholder */
  readonly targetFilterPlaceholder = input<string>('Search...');

  /** Filter field */
  readonly filterBy = input<string>('');

  /** Show reorder controls for source */
  readonly showSourceControls = input<boolean>(false);

  /** Show reorder controls for target */
  readonly showTargetControls = input<boolean>(false);

  /** Enable drag and drop */
  readonly dragDrop = input<boolean>(false);

  /** List height */
  readonly listHeight = input<string>('250px');

  /** Responsive breakpoint */
  readonly responsive = input<boolean>(true);

  /** Disabled state */
  readonly disabled = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when items are moved between lists */
  readonly onMove = output<PickListMoveEvent<T>>();

  /** Emitted when source list changes */
  readonly onSourceChange = output<T[]>();

  /** Emitted when target list changes */
  readonly onTargetChange = output<T[]>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly sourceSelection = signal<T[]>([]);
  readonly targetSelection = signal<T[]>([]);
  readonly sourceFilterValue = signal<string>('');
  readonly targetFilterValue = signal<string>('');

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly filteredSource = computed(() => {
    return this.filterItems(this.source(), this.sourceFilterValue());
  });

  readonly filteredTarget = computed(() => {
    return this.filterItems(this.target(), this.targetFilterValue());
  });

  readonly hasSourceSelection = computed(() => this.sourceSelection().length > 0);
  readonly hasTargetSelection = computed(() => this.targetSelection().length > 0);

  readonly canMoveToTarget = computed(() => this.hasSourceSelection() && !this.disabled());
  readonly canMoveToSource = computed(() => this.hasTargetSelection() && !this.disabled());
  readonly canMoveAllToTarget = computed(() => this.source().length > 0 && !this.disabled());
  readonly canMoveAllToSource = computed(() => this.target().length > 0 && !this.disabled());

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  readonly containerClasses = computed(() => {
    const classes = ['flex', 'gap-2'];

    if (this.responsive()) {
      classes.push('flex-col', 'md:flex-row');
    } else {
      classes.push('flex-row');
    }

    if (this.disabled()) {
      classes.push('opacity-50', 'pointer-events-none');
    }

    return classes.join(' ');
  });

  readonly listContainerClasses = computed(() => {
    return [
      'flex-1',
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-lg',
      'overflow-hidden',
      'bg-white',
      'dark:bg-gray-900',
    ].join(' ');
  });

  readonly transferButtonsClasses = computed(() => {
    const classes = ['flex', 'items-center', 'justify-center', 'gap-1', 'p-2'];

    if (this.responsive()) {
      classes.push('flex-row', 'md:flex-col');
    } else {
      classes.push('flex-col');
    }

    return classes.join(' ');
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
    return ['overflow-y-auto', 'divide-y', 'divide-gray-200', 'dark:divide-gray-700'].join(' ');
  });

  // =========================================================================
  // METHODS - FILTERING
  // =========================================================================

  private filterItems(items: T[], filterValue: string): T[] {
    const filter = filterValue.toLowerCase();
    if (!filter) return items;

    const filterField = this.filterBy();

    return items.filter((item) => {
      if (filterField && typeof item === 'object' && item !== null) {
        const value = (item as Record<string, unknown>)[filterField];
        return String(value).toLowerCase().includes(filter);
      }
      return String(item).toLowerCase().includes(filter);
    });
  }

  onSourceFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.sourceFilterValue.set(target.value);
  }

  onTargetFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.targetFilterValue.set(target.value);
  }

  // =========================================================================
  // METHODS - SELECTION
  // =========================================================================

  isSourceSelected(item: T): boolean {
    return this.sourceSelection().includes(item);
  }

  isTargetSelected(item: T): boolean {
    return this.targetSelection().includes(item);
  }

  onSourceItemClick(event: MouseEvent, item: T): void {
    this.toggleSelection(event, item, this.sourceSelection, this.filteredSource());
  }

  onTargetItemClick(event: MouseEvent, item: T): void {
    this.toggleSelection(event, item, this.targetSelection, this.filteredTarget());
  }

  private toggleSelection(
    event: MouseEvent,
    item: T,
    selection: ReturnType<typeof signal<T[]>>,
    items: T[]
  ): void {
    const current = selection();

    if (event.metaKey || event.ctrlKey) {
      if (current.includes(item)) {
        selection.set(current.filter((s) => s !== item));
      } else {
        selection.set([...current, item]);
      }
    } else if (event.shiftKey && current.length > 0) {
      const lastSelected = current[current.length - 1];
      const startIdx = items.indexOf(lastSelected);
      const endIdx = items.indexOf(item);
      const [from, to] = startIdx < endIdx ? [startIdx, endIdx] : [endIdx, startIdx];
      selection.set(items.slice(from, to + 1));
    } else {
      selection.set([item]);
    }
  }

  // =========================================================================
  // METHODS - TRANSFER
  // =========================================================================

  moveToTarget(): void {
    if (!this.canMoveToTarget()) return;

    const selected = this.sourceSelection();
    const newSource = this.source().filter((item) => !selected.includes(item));
    const newTarget = [...this.target(), ...selected];

    this.source.set(newSource);
    this.target.set(newTarget);
    this.sourceSelection.set([]);

    this.onMove.emit({
      items: selected,
      sourceList: 'source',
      targetList: 'target',
    });
    this.onSourceChange.emit(newSource);
    this.onTargetChange.emit(newTarget);
  }

  moveToSource(): void {
    if (!this.canMoveToSource()) return;

    const selected = this.targetSelection();
    const newTarget = this.target().filter((item) => !selected.includes(item));
    const newSource = [...this.source(), ...selected];

    this.source.set(newSource);
    this.target.set(newTarget);
    this.targetSelection.set([]);

    this.onMove.emit({
      items: selected,
      sourceList: 'target',
      targetList: 'source',
    });
    this.onSourceChange.emit(newSource);
    this.onTargetChange.emit(newTarget);
  }

  moveAllToTarget(): void {
    if (!this.canMoveAllToTarget()) return;

    const allSource = this.source();
    const newTarget = [...this.target(), ...allSource];

    this.source.set([]);
    this.target.set(newTarget);
    this.sourceSelection.set([]);

    this.onMove.emit({
      items: allSource,
      sourceList: 'source',
      targetList: 'target',
    });
    this.onSourceChange.emit([]);
    this.onTargetChange.emit(newTarget);
  }

  moveAllToSource(): void {
    if (!this.canMoveAllToSource()) return;

    const allTarget = this.target();
    const newSource = [...this.source(), ...allTarget];

    this.source.set(newSource);
    this.target.set([]);
    this.targetSelection.set([]);

    this.onMove.emit({
      items: allTarget,
      sourceList: 'target',
      targetList: 'source',
    });
    this.onSourceChange.emit(newSource);
    this.onTargetChange.emit([]);
  }

  // =========================================================================
  // METHODS - REORDERING
  // =========================================================================

  moveUp(list: 'source' | 'target'): void {
    const items = list === 'source' ? [...this.source()] : [...this.target()];
    const selection = list === 'source' ? this.sourceSelection() : this.targetSelection();

    for (const selected of selection) {
      const index = items.indexOf(selected);
      if (index > 0) {
        [items[index - 1], items[index]] = [items[index], items[index - 1]];
      }
    }

    if (list === 'source') {
      this.source.set(items);
      this.onSourceChange.emit(items);
    } else {
      this.target.set(items);
      this.onTargetChange.emit(items);
    }
  }

  moveDown(list: 'source' | 'target'): void {
    const items = list === 'source' ? [...this.source()] : [...this.target()];
    const selection =
      list === 'source'
        ? [...this.sourceSelection()].reverse()
        : [...this.targetSelection()].reverse();

    for (const selected of selection) {
      const index = items.indexOf(selected);
      if (index < items.length - 1) {
        [items[index], items[index + 1]] = [items[index + 1], items[index]];
      }
    }

    if (list === 'source') {
      this.source.set(items);
      this.onSourceChange.emit(items);
    } else {
      this.target.set(items);
      this.onTargetChange.emit(items);
    }
  }

  moveTop(list: 'source' | 'target'): void {
    const items = list === 'source' ? [...this.source()] : [...this.target()];
    const selection = list === 'source' ? this.sourceSelection() : this.targetSelection();
    const nonSelected = items.filter((item) => !selection.includes(item));

    const newItems = [...selection, ...nonSelected];

    if (list === 'source') {
      this.source.set(newItems);
      this.onSourceChange.emit(newItems);
    } else {
      this.target.set(newItems);
      this.onTargetChange.emit(newItems);
    }
  }

  moveBottom(list: 'source' | 'target'): void {
    const items = list === 'source' ? [...this.source()] : [...this.target()];
    const selection = list === 'source' ? this.sourceSelection() : this.targetSelection();
    const nonSelected = items.filter((item) => !selection.includes(item));

    const newItems = [...nonSelected, ...selection];

    if (list === 'source') {
      this.source.set(newItems);
      this.onSourceChange.emit(newItems);
    } else {
      this.target.set(newItems);
      this.onTargetChange.emit(newItems);
    }
  }

  // =========================================================================
  // METHODS - TEMPLATE CONTEXT
  // =========================================================================

  getItemContext(item: T, index: number, list: 'source' | 'target') {
    return {
      $implicit: item,
      index,
      list,
    };
  }

  getItemClasses(item: T, index: number, list: 'source' | 'target'): string {
    const isSelected =
      list === 'source' ? this.isSourceSelected(item) : this.isTargetSelected(item);

    const classes = ['px-3', 'py-2', 'cursor-pointer', 'transition-colors'];

    if (isSelected) {
      classes.push('bg-primary-50', 'dark:bg-primary-900/20');
    } else {
      classes.push('hover:bg-gray-50', 'dark:hover:bg-gray-800');
    }

    return classes.join(' ');
  }
}
