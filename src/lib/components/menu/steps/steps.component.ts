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
import { LucideAngularModule, Check, LucideIconData } from 'lucide-angular';

export interface StepItem {
  label?: string;
  icon?: LucideIconData;
  command?: (event: StepCommandEvent) => void;
  url?: string;
  routerLink?: string | string[];
  disabled?: boolean;
  styleClass?: string;
  id?: string;
}

export interface StepCommandEvent {
  originalEvent: Event;
  item: StepItem;
  index: number;
}

@Component({
  selector: 'ui-steps',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './steps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStepsComponent {
  // Icons
  readonly checkIcon = Check;

  // Inputs
  readonly model = input<StepItem[]>([]);
  readonly activeIndex = model<number>(0);
  readonly readonly = input<boolean>(false);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly styleClass = input<string>('');

  // Outputs
  readonly activeIndexChange = output<number>();
  readonly onSelect = output<StepCommandEvent>();

  // Content children
  readonly itemTemplate = contentChild<TemplateRef<unknown>>('item');

  // Computed
  readonly stepsClasses = computed(() => {
    const base = [
      this.orientation() === 'horizontal' ? 'flex items-start' : 'flex flex-col',
      this.styleClass(),
    ];

    return base.join(' ');
  });

  onItemClick(event: Event, item: StepItem, index: number): void {
    if (this.readonly() || item.disabled) {
      event.preventDefault();
      return;
    }

    this.activeIndex.set(index);
    this.activeIndexChange.emit(index);
    this.onSelect.emit({ originalEvent: event, item, index });

    if (item.command) {
      item.command({ originalEvent: event, item, index });
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex() === index;
  }

  isCompleted(index: number): boolean {
    return index < this.activeIndex();
  }

  getStepClasses(index: number): string {
    const orientation = this.orientation();
    const base = [
      'flex items-center',
      orientation === 'horizontal' ? 'flex-1' : 'relative pb-8 last:pb-0',
    ];

    return base.join(' ');
  }

  getNumberClasses(item: StepItem, index: number): string {
    const base = [
      'flex items-center justify-center',
      'w-10 h-10 rounded-full',
      'text-sm font-medium',
      'transition-colors',
      'flex-shrink-0',
    ];

    if (item.disabled) {
      base.push('bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500');
    } else if (this.isCompleted(index)) {
      base.push('bg-primary text-white');
    } else if (this.isActive(index)) {
      base.push('bg-primary text-white ring-4 ring-primary-100 dark:ring-primary-900/30');
    } else {
      base.push('bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400');
    }

    if (!this.readonly() && !item.disabled) {
      base.push('cursor-pointer hover:ring-4 hover:ring-gray-100 dark:hover:ring-gray-800');
    }

    return base.join(' ');
  }

  getLabelClasses(item: StepItem, index: number): string {
    const base = ['text-sm font-medium mt-2'];

    if (item.disabled) {
      base.push('text-gray-400 dark:text-gray-600');
    } else if (this.isActive(index) || this.isCompleted(index)) {
      base.push('text-gray-900 dark:text-gray-100');
    } else {
      base.push('text-gray-500 dark:text-gray-400');
    }

    return base.join(' ');
  }

  getConnectorClasses(index: number): string {
    const orientation = this.orientation();
    const base = ['transition-colors'];

    if (orientation === 'horizontal') {
      base.push('flex-1 h-0.5 mx-4 mt-5');
    } else {
      base.push('absolute left-5 top-10 w-0.5 h-full -ml-px');
    }

    if (this.isCompleted(index + 1)) {
      base.push('bg-primary');
    } else {
      base.push('bg-gray-200 dark:bg-gray-700');
    }

    return base.join(' ');
  }

  trackByItem(index: number, item: StepItem): string {
    return item.id ?? item.label ?? index.toString();
  }
}
