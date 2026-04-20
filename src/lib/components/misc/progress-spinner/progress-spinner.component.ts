import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export type SpinnerSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'ui-progress-spinner',
  standalone: true,
  imports: [],
  templateUrl: './progress-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProgressSpinnerComponent {
  // Inputs
  readonly size = input<SpinnerSize>('medium');
  readonly strokeWidth = input<number>(4);
  readonly fill = input<string>('none');
  readonly animationDuration = input<string>('2s');
  readonly styleClass = input<string>('');

  readonly sizeClasses = computed(() => {
    const size = this.size();
    const map: Record<SpinnerSize, string> = {
      small: 'w-8 h-8',
      medium: 'w-12 h-12',
      large: 'w-16 h-16',
    };
    return map[size];
  });

  readonly containerClasses = computed(() => {
    const base = [this.sizeClasses()];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });
}
