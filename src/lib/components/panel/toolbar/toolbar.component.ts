import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToolbarComponent {
  // Inputs
  readonly styleClass = input<string>('');

  // Computed
  readonly containerClasses = computed(() => {
    const base = [
      'flex',
      'items-center',
      'justify-between',
      'gap-4',
      'p-3',
      'bg-gray-100',
      'dark:bg-gray-800',
      'rounded-lg',
    ];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });
}
