import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  ElementRef,
  viewChild,
  effect,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartType, ChartConfiguration, registerables } from 'chart.js';
import type { ChartData } from 'chart.js';

// Use generic record for options to avoid library build issues
type UiChartOptions = Record<string, unknown>;

// Register all Chart.js components
Chart.register(...registerables);

export type UiChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'polarArea'
  | 'bubble'
  | 'scatter';

export interface ChartClickEvent {
  originalEvent: MouseEvent;
  element?: unknown;
  dataset?: unknown;
}

@Component({
  selector: 'ui-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiChartComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  // Inputs
  readonly type = input.required<UiChartType>();
  readonly data = input.required<ChartData>();
  readonly options = input<UiChartOptions>({});
  readonly plugins = input<unknown[]>([]);
  readonly width = input<string>('100%');
  readonly height = input<string>('400px');
  readonly responsive = input<boolean>(true);
  readonly maintainAspectRatio = input<boolean>(true);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onDataSelect = output<ChartClickEvent>();

  // View children
  readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  // State
  private chart: Chart | null = null;
  readonly isInitialized = signal<boolean>(false);

  // Computed
  readonly containerClasses = computed(() => {
    const base = ['relative'];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });

  readonly containerStyles = computed(() => ({
    width: this.width(),
    height: this.height(),
  }));

  constructor() {
    // Initialize chart when data or type changes
    effect(() => {
      const type = this.type();
      const data = this.data();
      const options = this.options();
      const plugins = this.plugins();

      if (isPlatformBrowser(this.platformId) && type && data) {
        // Use setTimeout to ensure canvas is available
        setTimeout(() => {
          this.initChart(type, data, options, plugins);
        }, 0);
      }
    });
  }

  private initChart(
    type: UiChartType,
    data: ChartData,
    options: UiChartOptions,
    plugins: unknown[]
  ): void {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;

    // Destroy existing chart
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: type as ChartType,
      data: data,
      options: {
        responsive: this.responsive(),
        maintainAspectRatio: this.maintainAspectRatio(),
        onClick: (event, elements) => {
          if (elements.length > 0) {
            this.onDataSelect.emit({
              originalEvent: event.native as MouseEvent,
              element: elements[0],
              dataset: data.datasets[elements[0].datasetIndex],
            });
          }
        },
        ...options,
      },
      plugins: plugins as never[],
    };

    this.chart = new Chart(ctx, config);
    this.isInitialized.set(true);
  }

  /**
   * Refresh the chart with current data
   */
  refresh(): void {
    if (this.chart) {
      this.chart.update();
    }
  }

  /**
   * Update chart data
   */
  updateData(data: ChartData): void {
    if (this.chart) {
      this.chart.data = data;
      this.chart.update();
    }
  }

  /**
   * Update chart options
   */
  updateOptions(options: UiChartOptions): void {
    if (this.chart) {
      this.chart.options = {
        ...this.chart.options,
        ...options,
      };
      this.chart.update();
    }
  }

  /**
   * Get the underlying Chart.js instance
   */
  getChart(): Chart | null {
    return this.chart;
  }

  /**
   * Generate chart image as base64
   */
  getBase64Image(): string | null {
    return this.chart?.toBase64Image() ?? null;
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
