import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface PanelMenuItem {
  label: string;
  icon?: LucideIconData;
  items?: PanelMenuItem[];
  command?: () => void;
  disabled?: boolean;
  expanded?: boolean;
  routerLink?: string;
}

@Component({
  selector: 'ui-panel-menu',
  standalone: true,
  imports: [NgTemplateOutlet, LucideAngularModule],
  templateUrl: './panel-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPanelMenuComponent {
  // Inputs
  readonly model = input<PanelMenuItem[]>([]);
  readonly multiple = input<boolean>(true);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onItemClick = output<PanelMenuItem>();

  // State
  readonly expandedItems = signal<Set<string>>(new Set());

  ngOnInit(): void {
    this.initializeExpanded(this.model());
  }

  private initializeExpanded(items: PanelMenuItem[], prefix = ''): void {
    const expanded = new Set<string>();
    items.forEach((item, index) => {
      const key = `${prefix}${index}`;
      if (item.expanded) {
        expanded.add(key);
      }
      if (item.items) {
        this.initializeExpanded(item.items, `${key}-`);
      }
    });
    if (expanded.size > 0) {
      this.expandedItems.update((current) => {
        const newSet = new Set(current);
        expanded.forEach((key) => newSet.add(key));
        return newSet;
      });
    }
  }

  toggleItem(item: PanelMenuItem, key: string, event: MouseEvent): void {
    event.stopPropagation();
    if (item.disabled) return;

    if (item.items && item.items.length > 0) {
      const isExpanded = this.expandedItems().has(key);
      this.expandedItems.update((current) => {
        const newSet = this.multiple() ? new Set(current) : new Set<string>();
        if (isExpanded) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
        return newSet;
      });
    }

    if (item.command) {
      item.command();
    }
    this.onItemClick.emit(item);
  }

  isExpanded(key: string): boolean {
    return this.expandedItems().has(key);
  }

  readonly containerClasses = computed(() => {
    const base = [
      'w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
    ];

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });
}
