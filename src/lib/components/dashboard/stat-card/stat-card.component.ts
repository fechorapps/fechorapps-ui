import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { LucideAngularModule, TrendingUp, TrendingDown, Minus } from 'lucide-angular';
import type { LucideIconData } from 'lucide-angular';

@Component({
  selector: 'ui-stat-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './stat-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStatCardComponent {
  readonly label = input<string>('');
  readonly value = input<string | number>('');
  readonly previousValue = input<string | number | undefined>(undefined);
  readonly trend = input<'up' | 'down' | 'neutral' | undefined>(undefined);
  readonly trendValue = input<string | undefined>(undefined);
  readonly icon = input<LucideIconData | undefined>(undefined);
  readonly variant = input<'default' | 'primary' | 'success' | 'warning' | 'danger'>('default');
  readonly loading = input<boolean>(false);

  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;
  readonly Minus = Minus;

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

  readonly trendIcon = computed(() => {
    const t = this.trend();
    if (t === 'up') return TrendingUp;
    if (t === 'down') return TrendingDown;
    if (t === 'neutral') return Minus;
    return null;
  });

  readonly trendColorClass = computed(() => {
    const t = this.trend();
    if (t === 'up') return 'text-green-600 dark:text-green-400';
    if (t === 'down') return 'text-red-600 dark:text-red-400';
    return 'text-muted-foreground';
  });
}
