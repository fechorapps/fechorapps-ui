import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  contentChild,
  TemplateRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown, LucideIconData } from 'lucide-angular';

export interface MenubarItem {
  label?: string;
  icon?: LucideIconData;
  command?: (event: MenubarCommandEvent) => void;
  url?: string;
  routerLink?: string | string[];
  items?: MenubarItem[];
  disabled?: boolean;
  visible?: boolean;
  separator?: boolean;
  styleClass?: string;
  target?: string;
  id?: string;
}

export interface MenubarCommandEvent {
  originalEvent: Event;
  item: MenubarItem;
}

@Component({
  selector: 'ui-menubar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './menubar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMenubarComponent {
  // Icons
  readonly chevronIcon = ChevronDown;

  // Inputs
  readonly model = input<MenubarItem[]>([]);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onMenuItemClick = output<MenubarCommandEvent>();

  // Content children
  readonly startTemplate = contentChild<TemplateRef<unknown>>('start');
  readonly endTemplate = contentChild<TemplateRef<unknown>>('end');
  readonly itemTemplate = contentChild<TemplateRef<unknown>>('item');

  // State
  readonly activeItem = signal<MenubarItem | null>(null);

  // Computed
  readonly menubarClasses = computed(() => {
    const base = [
      'flex items-center gap-1',
      'bg-white dark:bg-gray-900',
      'border border-gray-200 dark:border-gray-700',
      'rounded-lg px-4 py-2',
      this.styleClass(),
    ];

    return base.join(' ');
  });

  readonly visibleItems = computed(() => {
    return this.model().filter((item) => item.visible !== false);
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Close dropdown when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('.menubar-item')) {
      this.activeItem.set(null);
    }
  }

  onItemClick(event: Event, item: MenubarItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.items && item.items.length > 0) {
      // Toggle dropdown
      if (this.activeItem() === item) {
        this.activeItem.set(null);
      } else {
        this.activeItem.set(item);
      }
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
      this.onMenuItemClick.emit({ originalEvent: event, item });
    }

    this.activeItem.set(null);
  }

  onSubItemClick(event: Event, item: MenubarItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
      this.onMenuItemClick.emit({ originalEvent: event, item });
    }

    this.activeItem.set(null);
  }

  isActive(item: MenubarItem): boolean {
    return this.activeItem() === item;
  }

  getItemClasses(item: MenubarItem): string {
    const base = [
      'flex items-center gap-2 px-3 py-2 rounded-lg',
      'text-sm font-medium',
      'transition-colors',
    ];

    if (item.disabled) {
      base.push('text-gray-400 dark:text-gray-600 cursor-not-allowed');
    } else if (this.isActive(item)) {
      base.push('bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100');
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

  getSubItemClasses(item: MenubarItem): string {
    const base = [
      'flex items-center gap-3 px-4 py-2 w-full text-left',
      'text-sm',
      'transition-colors',
    ];

    if (item.disabled) {
      base.push('text-gray-400 dark:text-gray-600 cursor-not-allowed');
    } else {
      base.push(
        'text-gray-700 dark:text-gray-300',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'cursor-pointer'
      );
    }

    return base.join(' ');
  }

  trackByItem(index: number, item: MenubarItem): string {
    return item.id ?? item.label ?? index.toString();
  }
}
