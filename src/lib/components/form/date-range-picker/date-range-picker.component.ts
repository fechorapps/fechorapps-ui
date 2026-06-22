import {
  Component, ChangeDetectionStrategy, input, output, model, computed, signal
} from '@angular/core';
import { Calendar, ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

export interface DateRange { start: Date | null; end: Date | null; }

@Component({
  selector: 'ui-date-range-picker',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './date-range-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDateRangePickerComponent {
  protected readonly calendarIcon = Calendar;
  protected readonly chevronLeftIcon = ChevronLeft;
  protected readonly chevronRightIcon = ChevronRight;

  readonly value = model<DateRange>({ start: null, end: null });
  readonly placeholder = input<string>('Select date range');
  readonly disabled = input<boolean>(false);
  readonly minDate = input<Date | undefined>(undefined);
  readonly maxDate = input<Date | undefined>(undefined);

  readonly rangeSelected = output<DateRange>();

  readonly open = signal<boolean>(false);
  readonly hoverDate = signal<Date | null>(null);
  readonly currentMonth = signal<Date>(new Date());
  readonly selectingStart = signal<boolean>(true);

  private formatDate(d: Date): string {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  readonly displayValue = computed(() => {
    const v = this.value();
    if (!v.start && !v.end) return this.placeholder();
    if (v.start && !v.end) return this.formatDate(v.start);
    return `${this.formatDate(v.start!)} → ${this.formatDate(v.end!)}`;
  });

  readonly monthLabel = computed(() => {
    return this.currentMonth().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  readonly monthDays = computed((): Date[] => {
    const ref = this.currentMonth();
    const year = ref.getFullYear();
    const month = ref.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: Date[] = [];

    // Previous month fill
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthDays - i));
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }
    // Next month fill
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push(new Date(year, month + 1, d));
    }
    return days;
  });

  selectDay(day: Date): void {
    const v = this.value();
    if (this.selectingStart() || (v.start && day < v.start)) {
      this.value.set({ start: day, end: null });
      this.selectingStart.set(false);
    } else {
      const range = { start: v.start!, end: day };
      this.value.set(range);
      this.rangeSelected.emit(range);
      this.open.set(false);
      this.selectingStart.set(true);
    }
  }

  isInRange(day: Date): boolean {
    const v = this.value();
    const start = v.start;
    const end = v.end ?? this.hoverDate();
    if (!start || !end) return false;
    const t = day.getTime();
    const s = start.getTime();
    const e = end.getTime();
    return t > Math.min(s, e) && t < Math.max(s, e);
  }

  isStart(day: Date): boolean {
    const s = this.value().start;
    return s ? s.toDateString() === day.toDateString() : false;
  }

  isEnd(day: Date): boolean {
    const e = this.value().end;
    return e ? e.toDateString() === day.toDateString() : false;
  }

  isSameMonth(day: Date): boolean {
    const ref = this.currentMonth();
    return day.getMonth() === ref.getMonth() && day.getFullYear() === ref.getFullYear();
  }

  prevMonth(): void {
    const c = this.currentMonth();
    this.currentMonth.set(new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const c = this.currentMonth();
    this.currentMonth.set(new Date(c.getFullYear(), c.getMonth() + 1, 1));
  }
}
