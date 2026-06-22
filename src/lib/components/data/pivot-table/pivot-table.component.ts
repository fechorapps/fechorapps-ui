import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export interface PivotConfig {
  rowField: string;
  colField: string;
  valueField: string;
  aggregation: 'sum' | 'count' | 'avg' | 'min' | 'max';
}

@Component({
  selector: 'ui-pivot-table',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './pivot-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPivotTableComponent {
  readonly data = input<Record<string, unknown>[]>([]);
  readonly config = input.required<PivotConfig>();
  readonly loading = input<boolean>(false);

  readonly rowValues = computed(() =>
    [...new Set(this.data().map(r => String(r[this.config().rowField] ?? '')))].sort()
  );

  readonly colValues = computed(() =>
    [...new Set(this.data().map(r => String(r[this.config().colField] ?? '')))].sort()
  );

  readonly pivotData = computed(() => {
    const { rowField, colField, valueField, aggregation } = this.config();
    const result: Record<string, Record<string, number>> = {};
    for (const row of this.rowValues()) {
      result[row] = {};
      for (const col of this.colValues()) {
        const matching = this.data().filter(
          d => String(d[rowField]) === row && String(d[colField]) === col
        );
        const values = matching.map(d => Number(d[valueField]) || 0);
        result[row][col] = this.aggregate(values, aggregation);
      }
    }
    return result;
  });

  readonly rowTotals = computed(() => {
    const totals: Record<string, number> = {};
    for (const row of this.rowValues()) {
      totals[row] = this.colValues().reduce(
        (acc, col) => acc + (this.pivotData()[row]?.[col] ?? 0),
        0
      );
    }
    return totals;
  });

  private aggregate(values: number[], agg: string): number {
    if (!values.length) return 0;
    switch (agg) {
      case 'sum': return values.reduce((a, b) => a + b, 0);
      case 'count': return values.length;
      case 'avg': return values.reduce((a, b) => a + b, 0) / values.length;
      case 'min': return Math.min(...values);
      case 'max': return Math.max(...values);
      default: return 0;
    }
  }
}
