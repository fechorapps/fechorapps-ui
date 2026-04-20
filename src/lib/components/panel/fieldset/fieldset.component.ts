import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'ui-fieldset',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFieldsetComponent {
  // Inputs
  readonly legend = input<string>('');
  readonly toggleable = input<boolean>(false);
  readonly collapsed = input<boolean>(false);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onToggle = output<boolean>();

  // Icons
  readonly chevronIcon = ChevronDown;

  // State
  readonly isCollapsed = signal<boolean>(false);

  // Computed
  readonly containerClasses = computed(() => {
    const base = ['border', 'border-gray-200', 'dark:border-gray-700', 'rounded-lg'];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });

  constructor() {
    // Initialize collapsed state from input
    if (this.collapsed()) {
      this.isCollapsed.set(true);
    }
  }

  toggle(): void {
    if (!this.toggleable()) return;
    const newState = !this.isCollapsed();
    this.isCollapsed.set(newState);
    this.onToggle.emit(newState);
  }
}
