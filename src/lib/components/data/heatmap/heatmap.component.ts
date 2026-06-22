import { Component, ChangeDetectionStrategy, input, signal, computed } from '@angular/core';

export interface HeatmapCell {
  row: string;
  col: string;
  value: number;
  label?: string;
}

@Component({
  selector: 'ui-heatmap',
  standalone: true,
  imports: [],
  templateUrl: './heatmap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHeatmapComponent {
  readonly cells = input<HeatmapCell[]>([]);
  readonly colorScale = input<[string, string]>(['#dbeafe', '#1d4ed8']);
  readonly showValues = input<boolean>(true);
  readonly showTooltip = input<boolean>(true);
  readonly loading = input<boolean>(false);

  readonly hoveredCell = signal<HeatmapCell | null>(null);

  readonly rows = computed(() => [...new Set(this.cells().map(c => c.row))]);
  readonly cols = computed(() => [...new Set(this.cells().map(c => c.col))]);
  readonly minValue = computed(() => Math.min(...this.cells().map(c => c.value)));
  readonly maxValue = computed(() => Math.max(...this.cells().map(c => c.value)));

  readonly cellMap = computed(() => {
    const map = new Map<string, HeatmapCell>();
    for (const c of this.cells()) map.set(`${c.row}::${c.col}`, c);
    return map;
  });

  getCell(row: string, col: string): HeatmapCell | undefined {
    return this.cellMap().get(`${row}::${col}`);
  }

  getCellOpacity(value: number): number {
    const min = this.minValue();
    const max = this.maxValue();
    if (max === min) return 1;
    return 0.1 + ((value - min) / (max - min)) * 0.9;
  }

  getTextColor(opacity: number): string {
    return opacity > 0.5 ? '#ffffff' : '#000000';
  }
}
