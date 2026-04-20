import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface MeterItem {
  label: string;
  value: number;
  color?: string;
  icon?: LucideIconData;
}

export type MeterOrientation = 'horizontal' | 'vertical';
export type MeterLabelPosition = 'start' | 'end';

@Component({
  selector: 'ui-meter-group',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './meter-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMeterGroupComponent {
  // Inputs
  readonly value = input<MeterItem[]>([]);
  readonly max = input<number>(100);
  readonly orientation = input<MeterOrientation>('horizontal');
  readonly labelPosition = input<MeterLabelPosition>('end');
  readonly styleClass = input<string>('');

  readonly totalValue = computed(() => {
    return this.value().reduce((sum, item) => sum + item.value, 0);
  });

  readonly items = computed(() => {
    const max = this.max();
    return this.value().map((item, index) => ({
      ...item,
      percentage: (item.value / max) * 100,
      color: item.color || this.getDefaultColor(index),
    }));
  });

  private getDefaultColor(index: number): string {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
    ];
    return colors[index % colors.length];
  }

  readonly containerClasses = computed(() => {
    const base: string[] = [];
    const pos = this.labelPosition();
    const orient = this.orientation();

    if (orient === 'horizontal') {
      base.push('space-y-2');
    } else {
      base.push('flex gap-4');
      if (pos === 'start') {
        base.push('flex-row-reverse');
      }
    }

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });

  readonly meterClasses = computed(() => {
    const orient = this.orientation();
    const base = ['flex overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700'];

    if (orient === 'horizontal') {
      base.push('h-4 w-full');
    } else {
      base.push('flex-col w-4 h-48');
    }

    return base.join(' ');
  });
}
