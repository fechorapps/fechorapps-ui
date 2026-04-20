import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { Circle, LucideAngularModule } from 'lucide-angular';

/**
 * Timeline event interface
 */
export interface TimelineEvent {
  status?: string;
  date?: string | Date;
  icon?: string;
  color?: string;
  image?: string;
  [key: string]: unknown;
}

/**
 * Timeline layout options
 */
export type TimelineLayout = 'vertical' | 'horizontal';

/**
 * Timeline alignment options
 */
export type TimelineAlign = 'left' | 'right' | 'alternate' | 'top' | 'bottom';

/**
 * UiTimeline Component
 *
 * A timeline component for displaying events in chronological order.
 *
 * @example
 * ```html
 * <ui-timeline [value]="events" align="alternate">
 *   <ng-template #content let-event>
 *     <div class="p-3 bg-white rounded-lg shadow">
 *       <h4>{{ event.status }}</h4>
 *       <p>{{ event.date }}</p>
 *     </div>
 *   </ng-template>
 * </ui-timeline>
 * ```
 */
@Component({
  selector: 'ui-timeline',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet],
  templateUrl: './timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiTimelineComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly defaultMarkerIcon = Circle;

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly contentTemplate = contentChild<TemplateRef<unknown>>('content');
  readonly oppositeTemplate = contentChild<TemplateRef<unknown>>('opposite');
  readonly markerTemplate = contentChild<TemplateRef<unknown>>('marker');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Timeline events */
  readonly value = input<TimelineEvent[]>([]);

  /** Layout direction */
  readonly layout = input<TimelineLayout>('vertical');

  /** Alignment of content */
  readonly align = input<TimelineAlign>('left');

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly isVertical = computed(() => this.layout() === 'vertical');
  readonly isHorizontal = computed(() => this.layout() === 'horizontal');
  readonly isAlternate = computed(() => this.align() === 'alternate');

  readonly containerClasses = computed(() => {
    const classes = ['flex'];

    if (this.isVertical()) {
      classes.push('flex-col');
    } else {
      classes.push('flex-row');
    }

    return classes.join(' ');
  });

  readonly eventClasses = computed(() => {
    return (index: number) => {
      const classes = ['flex', 'relative'];

      if (this.isVertical()) {
        classes.push('flex-row');

        if (this.align() === 'right') {
          classes.push('flex-row-reverse');
        } else if (this.isAlternate()) {
          if (index % 2 === 0) {
            classes.push('flex-row-reverse');
          }
        }
      } else {
        classes.push('flex-col', 'items-center');

        if (this.align() === 'bottom') {
          classes.push('flex-col-reverse');
        } else if (this.isAlternate()) {
          if (index % 2 === 0) {
            classes.push('flex-col-reverse');
          }
        }
      }

      return classes.join(' ');
    };
  });

  readonly contentClasses = computed(() => {
    return (index: number) => {
      const classes = ['flex-1'];

      if (this.isVertical()) {
        classes.push('pb-6');

        if (this.isAlternate()) {
          if (index % 2 === 0) {
            classes.push('text-right', 'pr-4');
          } else {
            classes.push('text-left', 'pl-4');
          }
        } else if (this.align() === 'right') {
          classes.push('text-right', 'pr-4');
        } else {
          classes.push('text-left', 'pl-4');
        }
      } else {
        classes.push('px-4');

        if (this.isAlternate()) {
          if (index % 2 === 0) {
            classes.push('text-center', 'pb-4');
          } else {
            classes.push('text-center', 'pt-4');
          }
        } else if (this.align() === 'bottom') {
          classes.push('text-center', 'pb-4');
        } else {
          classes.push('text-center', 'pt-4');
        }
      }

      return classes.join(' ');
    };
  });

  readonly oppositeClasses = computed(() => {
    return (index: number) => {
      const classes = ['flex-1'];

      if (this.isVertical()) {
        classes.push('pb-6');

        if (this.isAlternate()) {
          if (index % 2 === 0) {
            classes.push('text-left', 'pl-4');
          } else {
            classes.push('text-right', 'pr-4');
          }
        } else if (this.align() === 'right') {
          classes.push('text-left', 'pl-4');
        } else {
          classes.push('text-right', 'pr-4');
        }
      } else {
        classes.push('px-4');

        if (this.isAlternate()) {
          if (index % 2 === 0) {
            classes.push('text-center', 'pt-4');
          } else {
            classes.push('text-center', 'pb-4');
          }
        } else if (this.align() === 'bottom') {
          classes.push('text-center', 'pt-4');
        } else {
          classes.push('text-center', 'pb-4');
        }
      }

      return classes.join(' ');
    };
  });

  readonly separatorClasses = computed(() => {
    return (index: number) => {
      const classes = ['flex', 'items-center', 'justify-center', 'relative'];

      if (this.isVertical()) {
        classes.push('flex-col');
      } else {
        classes.push('flex-row');
      }

      return classes.join(' ');
    };
  });

  readonly markerClasses = computed(() => {
    return (event: TimelineEvent) => {
      const color = event.color || 'primary';
      const classes = [
        'flex',
        'items-center',
        'justify-center',
        'w-10',
        'h-10',
        'rounded-full',
        'z-10',
        'shrink-0',
      ];

      // Color mapping
      const colorMap: Record<string, string> = {
        primary: 'bg-primary-500 text-white',
        success: 'bg-green-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-white',
        danger: 'bg-red-500 text-white',
        secondary: 'bg-gray-500 text-white',
      };

      classes.push(colorMap[color] || colorMap['primary']);

      return classes.join(' ');
    };
  });

  readonly connectorClasses = computed(() => {
    return (index: number, isLast: boolean) => {
      if (isLast) return 'hidden';

      const classes = ['bg-gray-300', 'dark:bg-gray-600'];

      if (this.isVertical()) {
        classes.push('w-0.5', 'flex-1', 'min-h-[24px]');
      } else {
        classes.push('h-0.5', 'flex-1', 'min-w-[24px]');
      }

      return classes.join(' ');
    };
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  isLastEvent(index: number): boolean {
    return index === this.value().length - 1;
  }

  getEventContext(event: TimelineEvent, index: number) {
    return {
      $implicit: event,
      index,
      first: index === 0,
      last: this.isLastEvent(index),
      even: index % 2 === 0,
      odd: index % 2 !== 0,
    };
  }
}
