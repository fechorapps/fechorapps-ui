import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight, LucideIconData } from 'lucide-angular';

export interface TieredMenuItem {
  label?: string;
  icon?: LucideIconData;
  command?: (event: TieredMenuCommandEvent) => void;
  url?: string;
  items?: TieredMenuItem[];
  disabled?: boolean;
  visible?: boolean;
  separator?: boolean;
  styleClass?: string;
  id?: string;
}

export interface TieredMenuCommandEvent {
  originalEvent: Event;
  item: TieredMenuItem;
}

@Component({
  selector: 'ui-tiered-menu',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tiered-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTieredMenuComponent {
  // Icons
  readonly chevronIcon = ChevronRight;

  // Inputs
  readonly model = input<TieredMenuItem[]>([]);
  readonly popup = input<boolean>(false);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onShow = output<void>();
  readonly onHide = output<void>();

  // State
  readonly visible = signal<boolean>(true);
  readonly activeItems = signal<TieredMenuItem[]>([]);

  // Computed
  readonly menuClasses = computed(() => {
    const base = [
      'bg-white dark:bg-gray-900',
      'border border-gray-200 dark:border-gray-700',
      'rounded-lg shadow-lg',
      'py-1 min-w-48',
      this.styleClass(),
    ];

    return base.join(' ');
  });

  readonly visibleItems = computed(() => {
    return this.model().filter((item) => item.visible !== false);
  });

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.popup()) {
      this.hide();
    }
  }

  show(): void {
    this.visible.set(true);
    this.onShow.emit();
  }

  hide(): void {
    if (this.popup()) {
      this.visible.set(false);
      this.activeItems.set([]);
      this.onHide.emit();
    }
  }

  toggle(): void {
    if (this.visible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  onItemClick(event: Event, item: TieredMenuItem): void {
    event.stopPropagation();

    if (item.disabled) {
      return;
    }

    if (item.items && item.items.length > 0) {
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (this.popup()) {
      this.hide();
    }
  }

  onItemMouseEnter(item: TieredMenuItem, level: number): void {
    if (item.items && item.items.length > 0) {
      const newActiveItems = this.activeItems().slice(0, level);
      newActiveItems.push(item);
      this.activeItems.set(newActiveItems);
    } else {
      this.activeItems.set(this.activeItems().slice(0, level));
    }
  }

  isSubmenuActive(item: TieredMenuItem): boolean {
    return this.activeItems().includes(item);
  }

  getItemClasses(item: TieredMenuItem): string {
    const base = [
      'flex items-center gap-3 px-4 py-2 w-full text-left',
      'text-sm',
      'transition-colors',
    ];

    if (item.disabled) {
      base.push('text-gray-400 dark:text-gray-600 cursor-not-allowed');
    } else if (this.isSubmenuActive(item)) {
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

  trackByItem(index: number, item: TieredMenuItem): string {
    return item.id ?? item.label ?? index.toString();
  }
}
