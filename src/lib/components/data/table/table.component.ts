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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Minus,
  Search,
  LucideAngularModule,
} from 'lucide-angular';

import { UiSkeletonComponent } from '../../misc/skeleton/skeleton.component';

/** Skeleton column type determines shape, size, and alignment defaults */
export type SkeletonColumnType = 'text' | 'avatar' | 'icon' | 'number' | 'badge' | 'actions';

/** Configuration for a single skeleton column */
export interface SkeletonColumn {
  type?: SkeletonColumnType;
  width?: string;
  align?: 'left' | 'center' | 'right';
  hidden?: string;
  count?: number;
}

/**
 * Column definition interface
 */
export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  frozen?: boolean;
  [key: string]: unknown;
}

/**
 * Sort event
 */
export interface TableSortEvent {
  field: string;
  order: 1 | -1;
}

/**
 * Selection change event
 */
export interface TableSelectionChangeEvent<T = unknown> {
  originalEvent: Event;
  value: T | T[];
}

/**
 * Page change event
 */
export interface TablePageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

/**
 * Row expand event
 */
export interface TableRowExpandEvent<T = unknown> {
  originalEvent: Event;
  data: T;
}

/** Sort direction for table columns */
export type TableSortDirection = 'asc' | 'desc';

/** Represents a single sort column */
export interface TableSortColumn {
  field: string;
  direction: TableSortDirection;
}

/**
 * UiTable Component
 *
 * A comprehensive data table component with sorting, filtering, pagination, and selection.
 * Supports both client-side processing and lazy (server-side) mode.
 *
 * @example
 * ```html
 * <!-- Client-side table -->
 * <ui-table
 *   [value]="data"
 *   [columns]="columns"
 *   [paginator]="true"
 *   [rows]="10"
 *   selectionMode="single"
 *   [(selection)]="selectedItem"
 * />
 *
 * <!-- Lazy (server-side) table -->
 * <ui-table
 *   [value]="store.items()"
 *   [loading]="store.isLoading()"
 *   [lazy]="true"
 *   sortMode="multiple"
 *   [multiSortMeta]="sortColumns()"
 *   [paginator]="true"
 *   [totalRecords]="store.totalCount()"
 *   [rows]="store.pageSize()"
 *   [first]="store.page() * store.pageSize()"
 *   (onPage)="onPageChange($event)"
 * >
 *   <ng-template #header>...</ng-template>
 *   <ng-template #body let-item>...</ng-template>
 *   <ng-template #empty>...</ng-template>
 * </ui-table>
 * ```
 */
@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet, UiSkeletonComponent],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiTableComponent<T = unknown> {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly sortAscIcon = ArrowUp;
  protected readonly sortDescIcon = ArrowDown;
  protected readonly sortNoneIcon = ArrowUpDown;
  protected readonly checkIcon = Check;
  protected readonly indeterminateIcon = Minus;
  protected readonly searchIcon = Search;
  protected readonly firstIcon = ChevronsLeft;
  protected readonly prevIcon = ChevronLeft;
  protected readonly nextIcon = ChevronRight;
  protected readonly lastIcon = ChevronsRight;

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly headerTemplate = contentChild<TemplateRef<unknown>>('header');
  readonly bodyTemplate = contentChild<TemplateRef<unknown>>('body');
  readonly footerTemplate = contentChild<TemplateRef<unknown>>('footer');
  readonly emptyTemplate = contentChild<TemplateRef<unknown>>('empty');
  readonly captionTemplate = contentChild<TemplateRef<unknown>>('caption');
  readonly loadingBodyTemplate = contentChild<TemplateRef<unknown>>('loadingBody');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Data to display */
  readonly value = input<T[]>([]);

  /** Column definitions */
  readonly columns = input<TableColumn[]>([]);

  /** Selection mode */
  readonly selectionMode = input<'single' | 'multiple' | null>(null);

  /** Selected row(s) */
  readonly selection = model<T | T[] | null>(null);

  /** Data key for tracking */
  readonly dataKey = input<string>('');

  /** Enable sorting */
  readonly sortable = input<boolean>(true);

  /** Current sort field */
  readonly sortField = model<string>('');

  /** Current sort order */
  readonly sortOrder = model<1 | -1>(1);

  /** Sort mode: 'single' or 'multiple' */
  readonly sortMode = input<'single' | 'multiple'>('single');

  /** Multi-sort column definitions (for sortMode='multiple') */
  readonly multiSortMeta = model<TableSortColumn[]>([]);

  /** Lazy mode: bypass all client-side processing */
  readonly lazy = input<boolean>(false);

  /** Enable global filter */
  readonly globalFilter = input<boolean>(false);

  /** Global filter placeholder */
  readonly globalFilterPlaceholder = input<string>('Search...');

  /** Global filter fields */
  readonly globalFilterFields = input<string[]>([]);

  /** Enable pagination */
  readonly paginator = input<boolean>(false);

  /** Rows per page */
  readonly rows = input<number>(10);

  /** First row index */
  readonly first = model<number>(0);

  /** Total records (for lazy loading) */
  readonly totalRecords = input<number | null>(null);

  /** Rows per page options */
  readonly rowsPerPageOptions = input<number[]>([]);

  /** Show current page report */
  readonly showCurrentPageReport = input<boolean>(true);

  /** Current page report template */
  readonly currentPageReportTemplate = input<string>(
    'Showing {first} to {last} of {totalRecords} entries'
  );

  /** Striped rows */
  readonly striped = input<boolean>(false);

  /** Gridlines */
  readonly showGridlines = input<boolean>(false);

  /** Row hover effect */
  readonly rowHover = input<boolean>(true);

  /** Table size */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /** Scrollable */
  readonly scrollable = input<boolean>(false);

  /** Scroll height */
  readonly scrollHeight = input<string>('');

  /** Responsive */
  readonly responsive = input<boolean>(true);

  /** Loading state */
  readonly loading = input<boolean>(false);

  /** Loading icon */
  readonly loadingIcon = input<string>('');

  /** Skeleton column definitions for built-in skeleton loading */
  readonly skeletonColumns = input<SkeletonColumn[]>([]);

  /** Number of skeleton rows to render */
  readonly skeletonRows = input<number>(5);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when selection changes */
  readonly onSelectionChange = output<TableSelectionChangeEvent<T>>();

  /** Emitted when sort changes */
  readonly onSort = output<TableSortEvent>();

  /** Emitted when page changes */
  readonly onPage = output<TablePageEvent>();

  /** Emitted when row is selected */
  readonly onRowSelect = output<TableSelectionChangeEvent<T>>();

  /** Emitted when row is unselected */
  readonly onRowUnselect = output<TableSelectionChangeEvent<T>>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly globalFilterValue = signal<string>('');

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly effectiveTotalRecords = computed(() => {
    return this.totalRecords() ?? this.processedData().length;
  });

  readonly filteredData = computed(() => {
    if (this.lazy()) return this.value();

    const data = this.value();
    const filter = this.globalFilterValue().toLowerCase();
    const fields = this.globalFilterFields();

    if (!filter) return data;

    return data.filter((item) => {
      const record = item as Record<string, unknown>;

      if (fields.length > 0) {
        return fields.some((field) => {
          const value = record[field];
          return String(value).toLowerCase().includes(filter);
        });
      }

      // Search all columns
      return this.columns().some((col) => {
        const value = record[col.field];
        return String(value).toLowerCase().includes(filter);
      });
    });
  });

  readonly sortedData = computed(() => {
    if (this.lazy()) return this.filteredData();

    const data = this.filteredData();
    const field = this.sortField();
    const order = this.sortOrder();

    if (!field) return data;

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

  readonly processedData = computed(() => {
    return this.sortedData();
  });

  readonly paginatedData = computed(() => {
    if (this.lazy()) return this.processedData();

    const data = this.processedData();

    if (!this.paginator()) return data;

    const start = this.first();
    const end = start + this.rows();
    return data.slice(start, end);
  });

  /** The data to display (alias for paginatedData) */
  readonly displayData = computed(() => this.paginatedData());

  readonly pageCount = computed(() => {
    return Math.ceil(this.effectiveTotalRecords() / this.rows()) || 1;
  });

  readonly currentPage = computed(() => {
    return Math.floor(this.first() / this.rows());
  });

  readonly currentPageReport = computed(() => {
    const first = this.first();
    const rows = this.rows();
    const total = this.effectiveTotalRecords();
    const template = this.currentPageReportTemplate();

    const lastIndex = Math.min(first + rows, total);

    return template
      .replace('{first}', String(first + 1))
      .replace('{last}', String(lastIndex))
      .replace('{totalRecords}', String(total))
      .replace('{page}', String(this.currentPage() + 1))
      .replace('{pageCount}', String(this.pageCount()));
  });

  readonly isAllSelected = computed(() => {
    if (this.selectionMode() !== 'multiple') return false;

    const data = this.paginatedData();
    const sel = this.selection() as T[];

    if (!sel || !Array.isArray(sel) || data.length === 0) return false;

    return data.every((item) => this.isSelected(item));
  });

  readonly isPartiallySelected = computed(() => {
    if (this.selectionMode() !== 'multiple') return false;

    const data = this.paginatedData();
    const sel = this.selection() as T[];

    if (!sel || !Array.isArray(sel) || data.length === 0) return false;

    const selectedCount = data.filter((item) => this.isSelected(item)).length;
    return selectedCount > 0 && selectedCount < data.length;
  });

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  readonly tableClasses = computed(() => {
    const classes = ['w-full', 'text-sm'];

    if (this.showGridlines()) {
      classes.push('border-collapse');
    }

    return classes.join(' ');
  });

  readonly headerCellClasses = computed(() => {
    return (column: TableColumn) => {
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

      // Size
      const sizeMap = {
        sm: 'py-2 text-xs',
        md: 'py-3 text-sm',
        lg: 'py-4 text-base',
      };
      classes.push(sizeMap[this.size()]);

      // Alignment
      if (column.align) {
        classes.push(`text-${column.align}`);
      } else {
        classes.push('text-left');
      }

      // Sortable
      if (column.sortable !== false && this.sortable()) {
        classes.push(
          'cursor-pointer',
          'hover:bg-gray-100',
          'dark:hover:bg-gray-700',
          'select-none'
        );
      }

      // Width
      if (column.width) {
        classes.push(`w-[${column.width}]`);
      }

      if (this.showGridlines()) {
        classes.push('border', 'border-gray-200', 'dark:border-gray-700');
      }

      return classes.join(' ');
    };
  });

  readonly bodyCellClasses = computed(() => {
    return (column: TableColumn) => {
      const classes = [
        'px-4',
        'text-gray-900',
        'dark:text-gray-100',
        'border-b',
        'border-gray-200',
        'dark:border-gray-700',
      ];

      // Size
      const sizeMap = {
        sm: 'py-2',
        md: 'py-3',
        lg: 'py-4',
      };
      classes.push(sizeMap[this.size()]);

      // Alignment
      if (column.align) {
        classes.push(`text-${column.align}`);
      }

      if (this.showGridlines()) {
        classes.push('border', 'border-gray-200', 'dark:border-gray-700');
      }

      return classes.join(' ');
    };
  });

  readonly rowClasses = computed(() => {
    return (rowData: T, index: number) => {
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

        if (this.isSelected(rowData)) {
          classes.push('bg-primary-50', 'dark:bg-primary-900/20');
        }
      }

      return classes.join(' ');
    };
  });

  // =========================================================================
  // METHODS - SORTING
  // =========================================================================

  onColumnClick(column: TableColumn): void {
    if (column.sortable === false || !this.sortable()) return;

    const currentField = this.sortField();
    const currentOrder = this.sortOrder();

    if (currentField === column.field) {
      // Toggle order
      this.sortOrder.set(currentOrder === 1 ? -1 : 1);
    } else {
      this.sortField.set(column.field);
      this.sortOrder.set(1);
    }

    this.onSort.emit({
      field: this.sortField(),
      order: this.sortOrder(),
    });
  }

  getSortIcon(column: TableColumn) {
    if (this.sortField() !== column.field) {
      return this.sortNoneIcon;
    }
    return this.sortOrder() === 1 ? this.sortAscIcon : this.sortDescIcon;
  }

  // =========================================================================
  // METHODS - SELECTION
  // =========================================================================

  isSelected(rowData: T): boolean {
    const sel = this.selection();
    if (!sel) return false;

    const dataKey = this.dataKey();

    if (Array.isArray(sel)) {
      if (dataKey) {
        const rowKey = (rowData as Record<string, unknown>)[dataKey];
        return sel.some((s) => (s as Record<string, unknown>)[dataKey] === rowKey);
      }
      return sel.includes(rowData);
    }

    if (dataKey) {
      const rowKey = (rowData as Record<string, unknown>)[dataKey];
      return (sel as Record<string, unknown>)[dataKey] === rowKey;
    }
    return sel === rowData;
  }

  onRowClick(event: Event, rowData: T): void {
    if (!this.selectionMode()) return;

    if (this.selectionMode() === 'single') {
      if (this.isSelected(rowData)) {
        this.selection.set(null);
        this.onRowUnselect.emit({ originalEvent: event, value: rowData });
      } else {
        this.selection.set(rowData);
        this.onRowSelect.emit({ originalEvent: event, value: rowData });
      }
    } else {
      const current = (this.selection() as T[]) || [];

      if (this.isSelected(rowData)) {
        const newSelection = current.filter((s) => {
          const dataKey = this.dataKey();
          if (dataKey) {
            return (
              (s as Record<string, unknown>)[dataKey] !==
              (rowData as Record<string, unknown>)[dataKey]
            );
          }
          return s !== rowData;
        });
        this.selection.set(newSelection);
        this.onRowUnselect.emit({ originalEvent: event, value: rowData });
      } else {
        this.selection.set([...current, rowData]);
        this.onRowSelect.emit({ originalEvent: event, value: rowData });
      }
    }

    this.onSelectionChange.emit({
      originalEvent: event,
      value: this.selection()!,
    });
  }

  toggleSelectAll(event: Event): void {
    if (this.selectionMode() !== 'multiple') return;

    if (this.isAllSelected()) {
      this.selection.set([]);
    } else {
      this.selection.set([...this.paginatedData()]);
    }

    this.onSelectionChange.emit({
      originalEvent: event,
      value: this.selection()!,
    });
  }

  // =========================================================================
  // METHODS - FILTER
  // =========================================================================

  onGlobalFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.globalFilterValue.set(target.value);
    this.first.set(0);
  }

  // =========================================================================
  // METHODS - PAGINATION
  // =========================================================================

  onPageChange(page: number): void {
    const newFirst = page * this.rows();
    this.first.set(newFirst);

    this.onPage.emit({
      first: newFirst,
      rows: this.rows(),
      page,
      pageCount: this.pageCount(),
    });
  }

  goToFirstPage(): void {
    this.onPageChange(0);
  }

  goToPreviousPage(): void {
    if (this.currentPage() > 0) {
      this.onPageChange(this.currentPage() - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage() < this.pageCount() - 1) {
      this.onPageChange(this.currentPage() + 1);
    }
  }

  goToLastPage(): void {
    this.onPageChange(this.pageCount() - 1);
  }

  // =========================================================================
  // METHODS - HELPERS
  // =========================================================================

  getCellValue(rowData: T, column: TableColumn): unknown {
    return (rowData as Record<string, unknown>)[column.field];
  }

  getRowContext(rowData: T, index: number) {
    return {
      $implicit: rowData,
      rowIndex: index,
      columns: this.columns(),
      selected: this.isSelected(rowData),
    };
  }

  getColumnContext(column: TableColumn, index: number) {
    return {
      $implicit: column,
      columnIndex: index,
      sortField: this.sortField(),
      sortOrder: this.sortOrder(),
    };
  }

  // =========================================================================
  // METHODS - SKELETON
  // =========================================================================

  readonly skeletonRowsArray = computed(() =>
    Array.from({ length: this.skeletonRows() }, (_, i) => i)
  );

  private readonly TEXT_WIDTH_FACTORS = [1, 0.75, 0.9, 0.6, 0.85];

  getSkeletonWidth(col: SkeletonColumn, rowIndex: number): string {
    const type = col.type || 'text';
    const defaultWidths: Record<SkeletonColumnType, string> = {
      text: '140px',
      avatar: '40px',
      icon: '32px',
      number: '48px',
      badge: '64px',
      actions: '32px',
    };
    const base = col.width || defaultWidths[type];

    if (type !== 'text') return base;

    const factor = this.TEXT_WIDTH_FACTORS[rowIndex % 5];
    const numericBase = parseInt(base, 10);
    if (isNaN(numericBase)) return base;
    return `${Math.round(numericBase * factor)}px`;
  }

  getSkeletonCellClass(col: SkeletonColumn): string {
    const classes = ['px-4', 'py-3'];
    if (col.hidden) classes.push(col.hidden);
    const type = col.type || 'text';
    const align =
      col.align ||
      (type === 'number' || type === 'badge' || type === 'actions' ? 'center' : 'left');
    if (align === 'center') classes.push('text-center');
    else if (align === 'right') classes.push('text-right');
    return classes.join(' ');
  }

  actionSlots(count?: number): number[] {
    return Array.from({ length: count || 2 }, (_, i) => i);
  }
}
