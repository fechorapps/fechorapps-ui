import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UiSkeletonComponent } from './skeleton.component';

/**
 * UiSkeletonTable Component
 *
 * A skeleton loader for table rows.
 *
 * @example
 * ```html
 * <ui-skeleton-table [rows]="5" [columns]="4" />
 * ```
 */
@Component({
  selector: 'ui-skeleton-table',
  standalone: true,
  imports: [UiSkeletonComponent],
  template: `
    <div class="w-full">
      <!-- Header -->
      <div class="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
        @for (col of columnsArray(); track col) {
          <ui-skeleton class="flex-1" height="1rem" />
        }
      </div>

      <!-- Rows -->
      @for (row of rowsArray(); track row) {
        <div class="flex gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
          @for (col of columnsArray(); track col) {
            <ui-skeleton class="flex-1" height="1rem" />
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full',
  },
})
export class UiSkeletonTableComponent {
  /** Number of rows to show */
  readonly rows = input<number>(5);

  /** Number of columns */
  readonly columns = input<number>(4);

  rowsArray(): number[] {
    return Array.from({ length: this.rows() }, (_, i) => i);
  }

  columnsArray(): number[] {
    return Array.from({ length: this.columns() }, (_, i) => i);
  }
}
