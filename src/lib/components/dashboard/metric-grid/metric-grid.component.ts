import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-metric-grid',
  standalone: true,
  imports: [],
  templateUrl: './metric-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMetricGridComponent {
  readonly columns = input<2 | 3 | 4>(3);
  readonly gap = input<'sm' | 'md' | 'lg'>('md');

  readonly gridClasses = computed(() => {
    const cols: Record<number, string> = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' };
    const gaps: Record<string, string> = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };
    return `grid ${cols[this.columns()]} ${gaps[this.gap()]}`;
  });
}
