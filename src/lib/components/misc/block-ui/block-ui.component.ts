import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-block-ui',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './block-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBlockUiComponent {
  // Inputs
  readonly blocked = input<boolean>(false);
  readonly target = input<'document' | 'container'>('container');
  readonly styleClass = input<string>('');
  readonly message = input<string>('');

  readonly containerClasses = computed(() => {
    const base = ['relative'];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });

  readonly overlayClasses = computed(() => {
    const base = ['flex items-center justify-center', 'bg-black/50 dark:bg-black/60', 'z-50'];

    if (this.target() === 'document') {
      base.push('fixed inset-0');
    } else {
      base.push('absolute inset-0');
    }

    return base.join(' ');
  });
}
