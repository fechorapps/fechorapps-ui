import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  contentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface TabMenuItem {
  label?: string;
  icon?: LucideIconData;
  command?: (event: TabMenuCommandEvent) => void;
  url?: string;
  routerLink?: string | string[];
  disabled?: boolean;
  visible?: boolean;
  badge?: string;
  badgeClass?: string;
  styleClass?: string;
  id?: string;
}

export interface TabMenuCommandEvent {
  originalEvent: Event;
  item: TabMenuItem;
}

export interface TabMenuChangeEvent {
  originalEvent: Event;
  item: TabMenuItem;
  index: number;
}

@Component({
  selector: 'ui-tab-menu',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tab-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTabMenuComponent {
  // Inputs
  readonly model = input<TabMenuItem[]>([]);
  readonly activeItem = model<TabMenuItem | null>(null);
  readonly styleClass = input<string>('');

  // Outputs
  readonly activeItemChange = output<TabMenuItem>();
  readonly onChange = output<TabMenuChangeEvent>();

  // Content children
  readonly itemTemplate = contentChild<TemplateRef<unknown>>('item');

  // Computed
  readonly tabMenuClasses = computed(() => {
    const base = ['flex', 'border-b border-gray-200 dark:border-gray-700', this.styleClass()];

    return base.join(' ');
  });

  readonly visibleItems = computed(() => {
    return this.model().filter((item) => item.visible !== false);
  });

  onItemClick(event: Event, item: TabMenuItem, index: number): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.activeItem.set(item);
    this.activeItemChange.emit(item);
    this.onChange.emit({ originalEvent: event, item, index });

    if (item.command) {
      item.command({ originalEvent: event, item });
    }
  }

  isActive(item: TabMenuItem): boolean {
    return this.activeItem() === item;
  }

  getItemClasses(item: TabMenuItem): string {
    const base = [
      'flex items-center gap-2 px-4 py-3',
      'text-sm font-medium',
      'border-b-2 -mb-px',
      'transition-colors',
    ];

    if (item.disabled) {
      base.push('text-gray-400 dark:text-gray-600', 'border-transparent', 'cursor-not-allowed');
    } else if (this.isActive(item)) {
      base.push('text-primary-600 dark:text-primary-400', 'border-primary');
    } else {
      base.push(
        'text-gray-500 dark:text-gray-400',
        'border-transparent',
        'hover:text-gray-700 dark:hover:text-gray-300',
        'hover:border-gray-300 dark:hover:border-gray-600',
        'cursor-pointer'
      );
    }

    if (item.styleClass) {
      base.push(item.styleClass);
    }

    return base.join(' ');
  }

  trackByItem(index: number, item: TabMenuItem): string {
    return item.id ?? item.label ?? index.toString();
  }
}
