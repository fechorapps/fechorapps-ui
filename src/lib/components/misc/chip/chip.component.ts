import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { LucideAngularModule, X, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'ui-chip',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiChipComponent {
  // Inputs
  readonly label = input<string>('');
  readonly icon = input<LucideIconData | null>(null);
  readonly image = input<string>('');
  readonly removable = input<boolean>(false);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onRemove = output<void>();

  // Icons
  readonly closeIcon = X;

  // Computed
  readonly chipClasses = computed(() => {
    const base = [
      'inline-flex',
      'items-center',
      'gap-1.5',
      'px-3',
      'py-1.5',
      'bg-gray-100',
      'dark:bg-gray-800',
      'text-gray-700',
      'dark:text-gray-300',
      'rounded-full',
      'text-sm',
      'font-medium',
    ];

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });

  remove(event: MouseEvent): void {
    event.stopPropagation();
    this.onRemove.emit();
  }
}
