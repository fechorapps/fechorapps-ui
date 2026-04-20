import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  contentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight, LucideIconData } from 'lucide-angular';

export interface MenuItem {
  label?: string;
  icon?: LucideIconData;
  command?: (event: MenuItemCommandEvent) => void;
  url?: string;
  routerLink?: string | string[];
  items?: MenuItem[];
  disabled?: boolean;
  visible?: boolean;
  separator?: boolean;
  badge?: string;
  badgeClass?: string;
  styleClass?: string;
  expanded?: boolean;
  target?: string;
  id?: string;
}

export interface MenuItemCommandEvent {
  originalEvent: Event;
  item: MenuItem;
}

@Component({
  selector: 'ui-menu',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMenuComponent {
  // Icons
  readonly chevronIcon = ChevronRight;

  // Inputs
  readonly model = input<MenuItem[]>([]);
  readonly popup = input<boolean>(false);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onShow = output<void>();
  readonly onHide = output<void>();

  // Content children
  readonly itemTemplate = contentChild<TemplateRef<unknown>>('item');
  readonly submenuHeaderTemplate = contentChild<TemplateRef<unknown>>('submenuheader');

  // Computed
  readonly menuClasses = computed(() => {
    const base = [
      'bg-white dark:bg-gray-900',
      'border border-gray-200 dark:border-gray-700',
      'rounded-lg shadow-lg',
      'py-1',
      'min-w-48',
      this.styleClass(),
    ];

    return base.join(' ');
  });

  readonly visibleItems = computed(() => {
    return this.model().filter((item) => item.visible !== false);
  });

  onItemClick(event: Event, item: MenuItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (item.url) {
      return; // Let the link handle navigation
    }
  }

  getItemClasses(item: MenuItem): string {
    const base = ['flex items-center gap-3 px-4 py-2 w-full text-left', 'transition-colors'];

    if (item.disabled) {
      base.push('text-gray-400 dark:text-gray-600 cursor-not-allowed');
    } else {
      base.push(
        'text-gray-700 dark:text-gray-300',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'cursor-pointer'
      );
    }

    if (item.styleClass) {
      base.push(item.styleClass);
    }

    return base.join(' ');
  }

  trackByItem(index: number, item: MenuItem): string {
    return item.id ?? item.label ?? index.toString();
  }
}
