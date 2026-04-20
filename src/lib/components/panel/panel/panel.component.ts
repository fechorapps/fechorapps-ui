import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { LucideAngularModule, ChevronDown, Minus, Plus } from 'lucide-angular';

@Component({
  selector: 'ui-panel',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPanelComponent {
  // Inputs
  readonly header = input<string>('');
  readonly toggleable = input<boolean>(false);
  readonly collapsed = input<boolean>(false);
  readonly styleClass = input<string>('');
  readonly headerStyleClass = input<string>('');
  readonly contentStyleClass = input<string>('');

  // Outputs
  readonly onToggle = output<boolean>();

  // Icons
  readonly minusIcon = Minus;
  readonly plusIcon = Plus;

  // State
  readonly isCollapsed = signal<boolean>(false);

  // Computed
  readonly containerClasses = computed(() => {
    const base = [
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-lg',
      'bg-white',
      'dark:bg-gray-900',
      'shadow-sm',
    ];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });

  readonly headerClasses = computed(() => {
    const base = [
      'flex',
      'items-center',
      'justify-between',
      'p-4',
      'bg-gray-50',
      'dark:bg-gray-800',
      'rounded-t-lg',
    ];
    if (this.isCollapsed()) {
      base.push('rounded-b-lg');
    }
    if (this.headerStyleClass()) {
      base.push(this.headerStyleClass());
    }
    return base.join(' ');
  });

  readonly contentClasses = computed(() => {
    const base = ['p-4'];
    if (this.contentStyleClass()) {
      base.push(this.contentStyleClass());
    }
    return base.join(' ');
  });

  constructor() {
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
