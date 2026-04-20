import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface MegaMenuItem {
  label: string;
  icon?: LucideIconData;
  items?: MegaMenuSubItem[][];
  command?: () => void;
  disabled?: boolean;
  routerLink?: string;
}

export interface MegaMenuSubItem {
  label: string;
  icon?: LucideIconData;
  command?: () => void;
  disabled?: boolean;
  routerLink?: string;
}

export type MegaMenuOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ui-mega-menu',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './mega-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMegaMenuComponent {
  // Inputs
  readonly model = input<MegaMenuItem[]>([]);
  readonly orientation = input<MegaMenuOrientation>('horizontal');
  readonly styleClass = input<string>('');

  // Outputs
  readonly onItemClick = output<MegaMenuItem | MegaMenuSubItem>();

  // State
  readonly activeIndex = signal<number | null>(null);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('ui-mega-menu')) {
      this.activeIndex.set(null);
    }
  }

  toggleSubmenu(index: number, item: MegaMenuItem): void {
    if (item.disabled) return;

    if (item.items && item.items.length > 0) {
      this.activeIndex.set(this.activeIndex() === index ? null : index);
    } else if (item.command) {
      item.command();
      this.onItemClick.emit(item);
    }
  }

  handleSubItemClick(subItem: MegaMenuSubItem, event: MouseEvent): void {
    event.stopPropagation();
    if (subItem.disabled) return;

    if (subItem.command) {
      subItem.command();
    }
    this.onItemClick.emit(subItem);
    this.activeIndex.set(null);
  }

  isActive(index: number): boolean {
    return this.activeIndex() === index;
  }

  readonly containerClasses = computed(() => {
    const base = [
      'flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm',
    ];

    if (this.orientation() === 'vertical') {
      base.push('flex-col');
    }

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });
}
