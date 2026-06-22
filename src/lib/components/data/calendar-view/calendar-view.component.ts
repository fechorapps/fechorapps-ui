import { Component, ChangeDetectionStrategy, input, output, model, computed, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  color?: string;
  allDay?: boolean;
}

export type CalendarView = 'month' | 'week' | 'day';

@Component({
  selector: 'ui-calendar-view',
  standalone: true,
  imports: [LucideAngularModule, TitleCasePipe],
  templateUrl: './calendar-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCalendarViewComponent {
  readonly events = input<CalendarEvent[]>([]);
  readonly view = model<CalendarView>('month');
  readonly currentDate = model<Date>(new Date());
  readonly loading = input<boolean>(false);

  readonly eventClicked = output<CalendarEvent>();
  readonly dateClicked = output<Date>();
  readonly viewChanged = output<CalendarView>();

  readonly displayDays = signal<Date[]>([]);

  readonly chevronLeftIcon = ChevronLeft;
  readonly chevronRightIcon = ChevronRight;

  readonly views: CalendarView[] = ['month', 'week', 'day'];

  readonly monthLabel = computed(() => {
    const d = this.currentDate();
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  readonly monthDays = computed(() => {
    const d = this.currentDate();
    const year = d.getFullYear();
    const month = d.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      days.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
    }
    return days;
  });

  isSameMonth(d: Date): boolean {
    return d.getMonth() === this.currentDate().getMonth();
  }

  isToday(d: Date): boolean {
    const t = new Date();
    return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  }

  getEventsForDay(d: Date): CalendarEvent[] {
    return this.events().filter(e => {
      const s = e.start;
      return s.getDate() === d.getDate() && s.getMonth() === d.getMonth() && s.getFullYear() === d.getFullYear();
    });
  }

  prevPeriod(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextPeriod(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  goToToday(): void {
    this.currentDate.set(new Date());
  }

  changeView(v: CalendarView): void {
    this.view.set(v);
    this.viewChanged.emit(v);
  }
}
