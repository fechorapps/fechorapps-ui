import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface DockItem {
  label: string;
  icon: LucideIconData;
  command?: () => void;
  disabled?: boolean;
  badge?: string;
}

export type DockPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'ui-dock',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './dock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDockComponent {
  // Inputs
  readonly model = input<DockItem[]>([]);
  readonly position = input<DockPosition>('bottom');
  readonly styleClass = input<string>('');

  // Outputs
  readonly onItemClick = output<DockItem>();

  // State
  readonly hoveredIndex = signal<number | null>(null);

  handleClick(item: DockItem, event: MouseEvent): void {
    event.preventDefault();
    if (item.disabled) return;

    if (item.command) {
      item.command();
    }
    this.onItemClick.emit(item);
  }

  handleMouseEnter(index: number): void {
    this.hoveredIndex.set(index);
  }

  handleMouseLeave(): void {
    this.hoveredIndex.set(null);
  }

  getScale(index: number): number {
    const hovered = this.hoveredIndex();
    if (hovered === null) return 1;

    const distance = Math.abs(hovered - index);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.1;
    return 1;
  }

  readonly containerClasses = computed(() => {
    const pos = this.position();
    const base = [
      'flex gap-2 p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg',
      'border border-gray-200 dark:border-gray-700 shadow-xl',
    ];

    if (pos === 'left' || pos === 'right') {
      base.push('flex-col rounded-2xl');
    } else {
      base.push('rounded-2xl');
    }

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });

  readonly wrapperClasses = computed(() => {
    const pos = this.position();
    const base = ['fixed z-50 flex'];

    switch (pos) {
      case 'top':
        base.push('top-4 left-1/2 -translate-x-1/2 justify-center');
        break;
      case 'bottom':
        base.push('bottom-4 left-1/2 -translate-x-1/2 justify-center');
        break;
      case 'left':
        base.push('left-4 top-1/2 -translate-y-1/2');
        break;
      case 'right':
        base.push('right-4 top-1/2 -translate-y-1/2');
        break;
    }

    return base.join(' ');
  });
}
