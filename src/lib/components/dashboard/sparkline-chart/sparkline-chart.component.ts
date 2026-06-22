import {
  Component, ChangeDetectionStrategy, input,
  ElementRef, viewChild, effect, OnDestroy, PLATFORM_ID, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'ui-sparkline-chart',
  standalone: true,
  imports: [],
  templateUrl: './sparkline-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSparklineChartComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private chart: Chart | null = null;
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  readonly data = input<number[]>([]);
  readonly type = input<'line' | 'bar' | 'area'>('line');
  readonly color = input<string>('#3b82f6');
  readonly width = input<number>(120);
  readonly height = input<number>(40);
  readonly showDots = input<boolean>(false);

  constructor() {
    effect(() => {
      const _data = this.data();
      const _type = this.type();
      const _color = this.color();
      const _showDots = this.showDots();
      if (isPlatformBrowser(this.platformId)) {
        this.updateChart();
      }
    });
  }

  private updateChart(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const data = this.data();
    const color = this.color();
    const isArea = this.type() === 'area';

    this.chart = new Chart(canvas, {
      type: this.type() === 'bar' ? 'bar' : 'line',
      data: {
        labels: data.map((_, i) => i.toString()),
        datasets: [{
          data,
          borderColor: color,
          backgroundColor: isArea ? `${color}33` : `${color}99`,
          fill: isArea,
          tension: 0.4,
          pointRadius: this.showDots() ? 3 : 0,
          borderWidth: 2,
        }],
      },
      options: {
        responsive: false,
        animation: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
