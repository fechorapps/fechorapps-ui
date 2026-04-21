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

import { LayoutGrid, LayoutList, Search, LucideAngularModule } from 'lucide-angular';

import { UiPaginatorComponent, PageEvent } from '../paginator/paginator.component';

/**
 * DataView layout options
 */
export type DataViewLayout = 'list' | 'grid';

/**
 * Sort order
 */
export type SortOrder = 1 | -1 | 0;

/**
 * Sort event
 */
export interface DataViewSortEvent {
  field: string;
  order: SortOrder;
}

/**
 * Page event (re-exported from paginator)
 */
export type { PageEvent };

/**
 * UiDataView Component
 *
 * A component to display data in list or grid format with optional pagination.
 *
 * @example
 * ```html
 * <ui-data-view [value]="items" [paginator]="true" [rows]="10">
 *   <ng-template #listItem let-item>
 *     <div>{{ item.name }}</div>
 *   </ng-template>
 *   <ng-template #gridItem let-item>
 *     <div class="card">{{ item.name }}</div>
 *   </ng-template>
 * </ui-data-view>
 * ```
 */
@Component({
  selector: 'ui-data-view',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet, UiPaginatorComponent],
  templateUrl: './data-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiDataViewComponent<T = unknown> {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly gridIcon = LayoutGrid;
  protected readonly listIcon = LayoutList;
  protected readonly searchIcon = Search;

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly listItemTemplate = contentChild<TemplateRef<unknown>>('listItem');
  readonly gridItemTemplate = contentChild<TemplateRef<unknown>>('gridItem');
  readonly headerTemplate = contentChild<TemplateRef<unknown>>('header');
  readonly emptyTemplate = contentChild<TemplateRef<unknown>>('empty');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Data to display */
  readonly value = input<T[]>([]);

  /** Current layout */
  readonly layout = model<DataViewLayout>('list');

  /** Enable paginator */
  readonly paginator = input<boolean>(false);

  /** Number of rows per page */
  readonly rows = input<number>(10);

  /** First record index */
  readonly first = model<number>(0);

  /** Total records (for lazy loading) */
  readonly totalRecords = input<number | null>(null);

  /** Rows per page options */
  readonly rowsPerPageOptions = input<number[]>([]);

  /** Enable filtering */
  readonly filter = input<boolean>(false);

  /** Filter placeholder */
  readonly filterPlaceholder = input<string>('Search...');

  /** Field to filter by */
  readonly filterBy = input<string>('');

  /** Enable sorting */
  readonly sortable = input<boolean>(false);

  /** Field to sort by */
  readonly sortField = input<string>('');

  /** Sort order */
  readonly sortOrder = input<SortOrder>(1);

  /** Grid columns (for responsive grid) */
  readonly gridColumns = input<number>(3);

  /** Loading state */
  readonly loading = input<boolean>(false);

  /** Empty message */
  readonly emptyMessage = input<string>('No records found');

  /** Show layout switcher */
  readonly showLayoutSwitcher = input<boolean>(true);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when page changes */
  readonly onPage = output<PageEvent>();

  /** Emitted when sort changes */
  readonly onSort = output<DataViewSortEvent>();

  /** Emitted when layout changes */
  readonly onLayoutChange = output<DataViewLayout>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly filterValue = signal<string>('');

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly effectiveTotalRecords = computed(() => {
    return this.totalRecords() ?? this.value().length;
  });

  readonly filteredData = computed(() => {
    const data = this.value();
    const filter = this.filterValue().toLowerCase();
    const filterField = this.filterBy();

    if (!filter) return data;

    return data.filter((item) => {
      if (filterField && typeof item === 'object' && item !== null) {
        const value = (item as Record<string, unknown>)[filterField];
        return String(value).toLowerCase().includes(filter);
      }
      return String(item).toLowerCase().includes(filter);
    });
  });

  readonly sortedData = computed(() => {
    const data = this.filteredData();
    const field = this.sortField();
    const order = this.sortOrder();

    if (!field || order === 0) return data;

    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[field];
      const bVal = (b as Record<string, unknown>)[field];

      if (aVal == null) return order;
      if (bVal == null) return -order;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order * aVal.localeCompare(bVal);
      }

      if (aVal < bVal) return -order;
      if (aVal > bVal) return order;
      return 0;
    });
  });

  readonly paginatedData = computed(() => {
    const data = this.sortedData();

    if (!this.paginator()) return data;

    const start = this.first();
    const end = start + this.rows();
    return data.slice(start, end);
  });

  readonly isGridLayout = computed(() => this.layout() === 'grid');
  readonly isListLayout = computed(() => this.layout() === 'list');

  readonly hasData = computed(() => this.paginatedData().length > 0);

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  readonly containerClasses = computed(() => {
    return [
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-lg',
      'bg-white',
      'dark:bg-gray-900',
      'overflow-hidden',
    ].join(' ');
  });

  readonly gridClasses = computed(() => {
    const cols = this.gridColumns();
    const colsMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    };

    return ['grid', 'gap-4', 'p-4', colsMap[cols] || colsMap[3]].join(' ');
  });

  readonly listClasses = computed(() => {
    return ['divide-y', 'divide-gray-200', 'dark:divide-gray-700'].join(' ');
  });

  readonly layoutButtonClasses = computed(() => {
    return (layout: DataViewLayout) => {
      const isActive = this.layout() === layout;
      const classes = ['p-2', 'rounded-lg', 'transition-colors'];

      if (isActive) {
        classes.push('bg-primary', 'text-white');
      } else {
        classes.push(
          'bg-gray-100',
          'dark:bg-gray-800',
          'text-gray-600',
          'dark:text-gray-400',
          'hover:bg-gray-200',
          'dark:hover:bg-gray-700'
        );
      }

      return classes.join(' ');
    };
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterValue.set(target.value);
    this.first.set(0); // Reset to first page
  }

  setLayout(layout: DataViewLayout): void {
    this.layout.set(layout);
    this.onLayoutChange.emit(layout);
  }

  onPageChange(event: PageEvent): void {
    this.first.set(event.first);
    this.onPage.emit(event);
  }

  getItemContext(item: T, index: number) {
    return {
      $implicit: item,
      index,
      first: index === 0,
      last: index === this.paginatedData().length - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
    };
  }
}
