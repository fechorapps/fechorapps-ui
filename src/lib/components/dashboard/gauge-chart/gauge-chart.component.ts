import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export interface GaugeThreshold {
  value: number;
  color: string;
}

@Component({
  selector: 'ui-gauge-chart',
  standalone: true,
  imports: [],
  templateUrl: './gauge-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiGaugeChartComponent {
  readonly value = input<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly label = input<string>('');
  readonly unit = input<string>('%');
  readonly size = input<number>(200);
  readonly thresholds = input<GaugeThreshold[]>([]);

  readonly percentage = computed(() =>
    Math.min(1, Math.max(0, (this.value() - this.min()) / (this.max() - this.min())))
  );

  readonly angle = computed(() => -135 + this.percentage() * 270);

  readonly arcColor = computed(() => {
    const t = this.thresholds();
    if (!t.length) return '#3b82f6';
    const matched = t.filter(th => this.value() >= th.value);
    return matched.length ? matched[matched.length - 1].color : t[0].color;
  });

  readonly cx = computed(() => this.size() / 2);
  readonly cy = computed(() => this.size() / 2);
  readonly r = computed(() => (this.size() / 2) * 0.75);

  readonly trackPath = computed(() => this.describeArc(this.cx(), this.cy(), this.r(), -135, 135));
  readonly valuePath = computed(() =>
    this.describeArc(this.cx(), this.cy(), this.r(), -135, -135 + this.percentage() * 270)
  );

  private polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): { x: number; y: number } {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  private describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(cx, cy, r, endAngle);
    const end = this.polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  }
}
