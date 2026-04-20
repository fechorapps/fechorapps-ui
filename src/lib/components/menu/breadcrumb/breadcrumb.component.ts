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
import { LucideAngularModule, ChevronRight, Home, LucideIconData } from 'lucide-angular';

export interface BreadcrumbItem {
  label?: string;
  icon?: LucideIconData;
  url?: string;
  routerLink?: string | string[];
  command?: (event: BreadcrumbCommandEvent) => void;
  disabled?: boolean;
  styleClass?: string;
  id?: string;
}

export interface BreadcrumbCommandEvent {
  originalEvent: Event;
  item: BreadcrumbItem;
}

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBreadcrumbComponent {
  // Icons
  readonly separatorIcon = ChevronRight;
  readonly homeIcon = Home;

  // Inputs
  readonly model = input<BreadcrumbItem[]>([]);
  readonly home = input<BreadcrumbItem | null>(null);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onItemClick = output<BreadcrumbCommandEvent>();

  // Content children
  readonly itemTemplate = contentChild<TemplateRef<unknown>>('item');
  readonly separatorTemplate = contentChild<TemplateRef<unknown>>('separator');

  // Computed
  readonly breadcrumbClasses = computed(() => {
    const base = ['flex items-center gap-2', 'text-sm', this.styleClass()];

    return base.join(' ');
  });

  onItemClicked(event: Event, item: BreadcrumbItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    this.onItemClick.emit({ originalEvent: event, item });
  }

  getItemClasses(item: BreadcrumbItem, isLast: boolean): string {
    const base = ['flex items-center gap-1'];

    if (item.disabled) {
      base.push('text-gray-400 dark:text-gray-600 cursor-not-allowed');
    } else if (isLast) {
      base.push('text-gray-900 dark:text-gray-100 font-medium');
    } else {
      base.push(
        'text-gray-500 dark:text-gray-400',
        'hover:text-primary-600 dark:hover:text-primary-400',
        'cursor-pointer'
      );
    }

    if (item.styleClass) {
      base.push(item.styleClass);
    }

    return base.join(' ');
  }

  trackByItem(index: number, item: BreadcrumbItem): string {
    return item.id ?? item.label ?? index.toString();
  }
}
