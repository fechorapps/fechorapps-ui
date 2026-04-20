import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';

import { LucideAngularModule, ChevronRight, LucideIconData } from 'lucide-angular';

export interface ContextMenuItem {
  label?: string;
  icon?: LucideIconData;
  command?: (event: ContextMenuCommandEvent) => void;
  items?: ContextMenuItem[];
  disabled?: boolean;
  visible?: boolean;
  separator?: boolean;
  styleClass?: string;
  id?: string;
}

export interface ContextMenuCommandEvent {
  originalEvent: Event;
  item: ContextMenuItem;
}

@Component({
  selector: 'ui-context-menu',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './context-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContextMenuComponent {
  private readonly el = inject(ElementRef);

  // Icons
  readonly chevronIcon = ChevronRight;

  // Inputs
  readonly model = input<ContextMenuItem[]>([]);
  readonly target = input<HTMLElement | string | null>(null);
  readonly global = input<boolean>(false);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onShow = output<{ originalEvent: Event }>();
  readonly onHide = output<void>();

  // State
  readonly visible = signal<boolean>(false);
  readonly position = signal<{ x: number; y: number }>({ x: 0, y: 0 });
  readonly activeSubmenu = signal<ContextMenuItem | null>(null);

  // Computed
  readonly menuClasses = computed(() => {
    const base = [
      'fixed z-50',
      'bg-white dark:bg-gray-900',
      'border border-gray-200 dark:border-gray-700',
      'rounded-lg shadow-lg',
      'py-1 min-w-48',
      'transition-opacity duration-150',
      this.styleClass(),
    ];

    if (this.visible()) {
      base.push('opacity-100');
    } else {
      base.push('opacity-0 pointer-events-none');
    }

    return base.join(' ');
  });

  readonly menuStyles = computed(() => {
    const pos = this.position();
    return {
      left: `${pos.x}px`,
      top: `${pos.y}px`,
    };
  });

  readonly visibleItems = computed(() => {
    return this.model().filter((item) => item.visible !== false);
  });

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    const target = this.target();

    if (this.global()) {
      this.show(event);
      return;
    }

    if (target) {
      const targetEl = typeof target === 'string' ? document.querySelector(target) : target;

      if (targetEl && targetEl.contains(event.target as Node)) {
        this.show(event);
      }
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.hide();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.hide();
  }

  show(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    // Calculate position
    let x = event.clientX;
    let y = event.clientY;

    // Adjust if menu would go off screen
    const menuWidth = 200;
    const menuHeight = 300;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }

    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    this.position.set({ x, y });
    this.visible.set(true);
    this.onShow.emit({ originalEvent: event });
  }

  hide(): void {
    this.visible.set(false);
    this.activeSubmenu.set(null);
    this.onHide.emit();
  }

  onItemClick(event: Event, item: ContextMenuItem): void {
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

    this.hide();
  }

  onItemMouseEnter(item: ContextMenuItem): void {
    if (item.items && item.items.length > 0) {
      this.activeSubmenu.set(item);
    } else {
      this.activeSubmenu.set(null);
    }
  }

  isSubmenuActive(item: ContextMenuItem): boolean {
    return this.activeSubmenu() === item;
  }

  getItemClasses(item: ContextMenuItem): string {
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

    if (item.styleClass) {
      base.push(item.styleClass);
    }

    return base.join(' ');
  }

  trackByItem(index: number, item: ContextMenuItem): string {
    return item.id ?? item.label ?? index.toString();
  }
}
