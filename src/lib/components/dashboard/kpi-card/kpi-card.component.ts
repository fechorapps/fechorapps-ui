import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-kpi-card',
  standalone: true,
  imports: [],
  templateUrl: './kpi-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiKpiCardComponent {
  readonly label = input<string>('');
  readonly value = input<number>(0);
  readonly target = input<number | undefined>(undefined);
  readonly format = input<'number' | 'currency' | 'percent'>('number');
  readonly currency = input<string>('USD');
  readonly loading = input<boolean>(false);
  readonly variant = input<'default' | 'primary' | 'success' | 'warning' | 'danger'>('default');

  readonly progress = computed(() => {
    const t = this.target();
    if (t == null || t === 0) return null;
    return Math.min((this.value() / t) * 100, 100);
  });

  readonly formattedValue = computed(() => {
    const v = this.value();
    const f = this.format();
    if (f === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: this.currency() }).format(v);
    }
    if (f === 'percent') return `${v.toFixed(1)}%`;
    return new Intl.NumberFormat('en-US').format(v);
  });

  readonly formattedTarget = computed(() => {
    const t = this.target();
    if (t == null) return null;
    const f = this.format();
    if (f === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: this.currency() }).format(t);
    }
    if (f === 'percent') return `${t.toFixed(1)}%`;
    return new Intl.NumberFormat('en-US').format(t);
  });

  readonly progressColor = computed(() => {
    const p = this.progress();
    if (p == null) return 'bg-primary';
    if (p >= 100) return 'bg-green-500';
    if (p >= 70) return 'bg-blue-500';
    return 'bg-yellow-500';
  });

  readonly variantClasses = computed(() => {
    const map: Record<string, string> = {
      default: 'bg-card border border-border',
      primary: 'bg-primary/5 border border-primary/20',
      success: 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800',
      warning: 'bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800',
      danger: 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800',
    };
    return map[this.variant()] ?? map['default'];
  });
}
