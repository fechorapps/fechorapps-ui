import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export type ProgressBarMode = 'determinate' | 'indeterminate';

@Component({
  selector: 'ui-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProgressBarComponent {
  // Inputs
  readonly value = input<number>(0);
  readonly mode = input<ProgressBarMode>('determinate');
  readonly showValue = input<boolean>(true);
  readonly color = input<string>('');
  readonly styleClass = input<string>('');

  // Computed
  readonly containerClasses = computed(() => {
    const base = [
      'relative',
      'w-full',
      'h-4',
      'bg-gray-200',
      'dark:bg-gray-700',
      'rounded-full',
      'overflow-hidden',
    ];

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });

  readonly barClasses = computed(() => {
    const mode = this.mode();
    const base = ['h-full', 'rounded-full', 'transition-all', 'duration-200'];

    if (!this.color()) {
      base.push('bg-primary-500');
    }

    if (mode === 'indeterminate') {
      base.push('animate-progress-indeterminate');
    }

    return base.join(' ');
  });

  readonly barStyle = computed(() => {
    const mode = this.mode();
    const style: Record<string, string> = {};

    if (mode === 'determinate') {
      style['width'] = `${Math.min(100, Math.max(0, this.value()))}%`;
    } else {
      style['width'] = '40%';
    }

    if (this.color()) {
      style['backgroundColor'] = this.color();
    }

    return style;
  });

  readonly displayValue = computed(() => {
    return Math.round(this.value());
  });
}
