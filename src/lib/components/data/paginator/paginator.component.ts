import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
} from 'lucide-angular';
import { TranslocoDirective } from '@jsverse/transloco';

import { UiTooltipDirective } from '../../overlay/tooltip/tooltip.component';
import { UiSelectComponent, SelectOption } from '../../form/select/select.component';

/**
 * Page change event interface
 */
export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

/**
 * Paginator template context
 */
export interface PaginatorState {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
  totalRecords: number;
}

/**
 * UiPaginator Component
 *
 * A pagination component for navigating through data.
 *
 * @example
 * ```html
 * <ui-paginator
 *   [totalRecords]="120"
 *   [rows]="10"
 *   (onPageChange)="onPageChange($event)"
 * ></ui-paginator>
 * ```
 */
@Component({
  selector: 'ui-paginator',
  standalone: true,
  imports: [LucideAngularModule, UiTooltipDirective, TranslocoDirective, UiSelectComponent],
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiPaginatorComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly firstIcon = ChevronFirst;
  protected readonly prevIcon = ChevronLeft;
  protected readonly nextIcon = ChevronRight;
  protected readonly lastIcon = ChevronLast;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Total number of records */
  readonly totalRecords = input<number>(0);

  /** Number of rows per page */
  readonly rows = input<number>(10);

  /** Index of first record (zero-based) */
  readonly first = model<number>(0);

  /** Number of page links to display */
  readonly pageLinkSize = input<number>(5);

  /** Show first/last buttons */
  readonly showFirstLastButtons = input<boolean>(true);

  /** Show previous/next buttons */
  readonly showPrevNextButtons = input<boolean>(true);

  /** Show page links */
  readonly showPageLinks = input<boolean>(true);

  /** Show current page report */
  readonly showCurrentPageReport = input<boolean>(true);

  /** Current page report template */
  readonly currentPageReportTemplate = input<string>(
    'Showing {first} to {last} of {totalRecords} entries'
  );

  /** Rows per page options */
  readonly rowsPerPageOptions = input<number[]>([]);

  /** Dropdown append target */
  readonly dropdownAppendTo = input<string>('body');

  /** Disabled state */
  readonly disabled = input<boolean>(false);

  /** Show page jump input */
  readonly showJumpToPage = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when page changes */
  readonly onPageChange = output<PageEvent>();

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly pageCount = computed(() => {
    const total = this.totalRecords();
    const rowsPerPage = this.rows();
    return Math.ceil(total / rowsPerPage) || 1;
  });

  readonly currentPage = computed(() => {
    return Math.floor(this.first() / this.rows());
  });

  readonly pageLinks = computed(() => {
    const page = this.currentPage();
    const count = this.pageCount();
    const size = this.pageLinkSize();
    const links: number[] = [];

    // Calculate start and end page
    let start = Math.max(0, page - Math.floor(size / 2));
    let end = Math.min(count - 1, start + size - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < size) {
      start = Math.max(0, end - size + 1);
    }

    for (let i = start; i <= end; i++) {
      links.push(i);
    }

    return links;
  });

  readonly isFirstPage = computed(() => this.currentPage() === 0);

  readonly isLastPage = computed(() => this.currentPage() >= this.pageCount() - 1);

  readonly currentPageReport = computed(() => {
    const first = this.first();
    const rows = this.rows();
    const total = this.totalRecords();
    const template = this.currentPageReportTemplate();

    const lastIndex = Math.min(first + rows, total);

    return template
      .replace('{first}', String(first + 1))
      .replace('{last}', String(lastIndex))
      .replace('{totalRecords}', String(total))
      .replace('{page}', String(this.currentPage() + 1))
      .replace('{pageCount}', String(this.pageCount()));
  });

  readonly hasRowsPerPageOptions = computed(() => {
    return this.rowsPerPageOptions().length > 0;
  });

  readonly rowsSelectOptions = computed<SelectOption[]>(() =>
    this.rowsPerPageOptions().map((n) => ({ label: String(n), value: n }))
  );

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  readonly containerClasses = computed(() => {
    const classes = [
      'flex',
      'flex-wrap',
      'items-center',
      'justify-between',
      'gap-4',
      'px-4',
      'py-3',
      'bg-background',
      'border-t',
      'border-border',
    ];

    if (this.disabled()) {
      classes.push('opacity-50', 'pointer-events-none');
    }

    return classes.join(' ');
  });

  readonly navButtonClasses = computed(() => {
    return [
      'inline-flex',
      'items-center',
      'justify-center',
      'min-w-7',
      'h-7',
      'rounded-md',
      'px-0.5',
      'text-foreground',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'disabled:cursor-default',
      'disabled:text-muted-foreground',
      'disabled:hover:bg-transparent',
      'transition-colors',
      'duration-150',
    ].join(' ');
  });

  readonly pageButtonClasses = computed(() => {
    return (page: number) => {
      const isActive = page === this.currentPage();
      const base = [
        'inline-flex',
        'items-center',
        'justify-center',
        'min-w-7',
        'h-7',
        'px-0.5',
        'text-sm',
        'font-medium',
        'rounded-md',
        'transition-colors',
        'duration-150',
      ];

      if (isActive) {
        base.push('bg-accent', 'text-accent-foreground');
      } else {
        base.push(
          'text-muted-foreground',
          'hover:bg-accent',
          'hover:text-accent-foreground'
        );
      }

      return base.join(' ');
    };
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  goToFirstPage(): void {
    if (this.disabled() || this.isFirstPage()) return;
    this.changePage(0);
  }

  goToPreviousPage(): void {
    if (this.disabled() || this.isFirstPage()) return;
    this.changePage(this.currentPage() - 1);
  }

  goToNextPage(): void {
    if (this.disabled() || this.isLastPage()) return;
    this.changePage(this.currentPage() + 1);
  }

  goToLastPage(): void {
    if (this.disabled() || this.isLastPage()) return;
    this.changePage(this.pageCount() - 1);
  }

  goToPage(page: number): void {
    if (this.disabled() || page === this.currentPage()) return;
    this.changePage(page);
  }

  onRowsSelectChange(value: unknown): void {
    const newRows = value as number;
    this.first.set(0);
    this.onPageChange.emit({
      first: 0,
      rows: newRows,
      page: 0,
      pageCount: Math.ceil(this.totalRecords() / newRows),
    });
  }

  onRowsChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newRows = parseInt(target.value, 10);

    // Reset to first page when changing rows per page
    this.first.set(0);

    this.onPageChange.emit({
      first: 0,
      rows: newRows,
      page: 0,
      pageCount: Math.ceil(this.totalRecords() / newRows),
    });
  }

  onJumpToPage(event: Event): void {
    const target = event.target as HTMLInputElement;
    const pageNumber = parseInt(target.value, 10);

    // Validate page number (user enters 1-based, we use 0-based internally)
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > this.pageCount()) {
      // Reset input to current page
      target.value = String(this.currentPage() + 1);
      return;
    }

    // Convert to 0-based and navigate
    this.changePage(pageNumber - 1);
  }

  onJumpInputKeydown(event: KeyboardEvent): void {
    // Only allow Enter key to trigger navigation
    if (event.key === 'Enter') {
      this.onJumpToPage(event);
    }
  }

  private changePage(page: number): void {
    const newFirst = page * this.rows();
    this.first.set(newFirst);

    this.onPageChange.emit({
      first: newFirst,
      rows: this.rows(),
      page,
      pageCount: this.pageCount(),
    });
  }
}
