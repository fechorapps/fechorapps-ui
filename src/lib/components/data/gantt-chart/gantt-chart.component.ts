import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';

export interface GanttTask {
  id: string;
  label: string;
  start: Date;
  end: Date;
  color?: string;
  progress?: number; // 0-100
  group?: string;
}

@Component({
  selector: 'ui-gantt-chart',
  standalone: true,
  imports: [],
  templateUrl: './gantt-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiGanttChartComponent {
  readonly tasks = input<GanttTask[]>([]);
  readonly startDate = input<Date | undefined>(undefined);
  readonly endDate = input<Date | undefined>(undefined);
  readonly loading = input<boolean>(false);

  readonly taskClicked = output<GanttTask>();

  readonly chartStart = computed(() => {
    if (this.startDate()) return this.startDate()!;
    const tasks = this.tasks();
    if (!tasks.length) return new Date();
    return new Date(Math.min(...tasks.map(t => t.start.getTime())));
  });

  readonly chartEnd = computed(() => {
    if (this.endDate()) return this.endDate()!;
    const tasks = this.tasks();
    if (!tasks.length) { const d = new Date(); d.setMonth(d.getMonth() + 1); return d; }
    return new Date(Math.max(...tasks.map(t => t.end.getTime())));
  });

  readonly totalDays = computed(() => {
    const diff = this.chartEnd().getTime() - this.chartStart().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
  });

  readonly headerDates = computed(() => {
    const dates: Date[] = [];
    const start = this.chartStart();
    const total = this.totalDays();
    const step = total > 14 ? 7 : 1;
    for (let i = 0; i < total; i += step) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  });

  getBarStyle(task: GanttTask): Record<string, string> {
    const totalMs = this.chartEnd().getTime() - this.chartStart().getTime();
    const startOffset = ((task.start.getTime() - this.chartStart().getTime()) / totalMs) * 100;
    const width = ((task.end.getTime() - task.start.getTime()) / totalMs) * 100;
    return {
      left: `${Math.max(0, startOffset)}%`,
      width: `${Math.max(0.5, width)}%`,
      'background-color': task.color ?? '#3b82f6',
    };
  }

  getBarCssText(task: GanttTask): string {
    const style = this.getBarStyle(task);
    return Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';');
  }

  getDateLeft(d: Date): string {
    const totalMs = this.chartEnd().getTime() - this.chartStart().getTime() || 1;
    const pct = ((d.getTime() - this.chartStart().getTime()) / totalMs) * 100;
    return `${pct}%`;
  }
}
