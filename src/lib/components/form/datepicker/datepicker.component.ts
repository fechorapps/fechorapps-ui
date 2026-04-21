import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Calendar, ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

/**
 * DatePicker variants
 */
export type DatePickerVariant = 'default' | 'filled' | 'outlined';

/**
 * DatePicker sizes
 */
export type DatePickerSize = 'sm' | 'md' | 'lg';

/**
 * DatePicker selection mode
 */
export type DatePickerSelectionMode = 'single' | 'range' | 'multiple';

/**
 * DatePicker view
 */
export type DatePickerView = 'date' | 'month' | 'year';

/**
 * Day info
 */
interface DayInfo {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isDisabled: boolean;
}

/**
 * UiDatePicker Component
 *
 * A date picker component.
 *
 * @example
 * ```html
 * <ui-datepicker [(ngModel)]="date"></ui-datepicker>
 * <ui-datepicker [(ngModel)]="dates" selectionMode="multiple"></ui-datepicker>
 * ```
 */
@Component({
  selector: 'ui-datepicker',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiDatePickerComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiDatePickerComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly calendarIcon = Calendar;
  protected readonly chevronLeftIcon = ChevronLeft;
  protected readonly chevronRightIcon = ChevronRight;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly containerRef = viewChild<ElementRef>('containerEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<DatePickerVariant>('default');

  /** Size */
  readonly size = input<DatePickerSize>('md');

  /** Selection mode */
  readonly selectionMode = input<DatePickerSelectionMode>('single');

  /** Placeholder text */
  readonly placeholder = input<string>('Select date');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether calendar is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether calendar is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Whether input takes full width */
  readonly fullWidth = input<boolean>(true);

  /** Input id */
  readonly inputId = input<string>('');

  /** Minimum date */
  readonly minDate = input<Date | undefined>(undefined);

  /** Maximum date */
  readonly maxDate = input<Date | undefined>(undefined);

  /** Disabled dates */
  readonly disabledDates = input<Date[]>([]);

  /** Disabled days of week (0 = Sunday, 6 = Saturday) */
  readonly disabledDays = input<number[]>([]);

  /** Date format */
  readonly dateFormat = input<string>('dd/MM/yyyy');

  /** Show button bar */
  readonly showButtonBar = input<boolean>(false);

  /** Show today button */
  readonly showToday = input<boolean>(true);

  /** Show clear button */
  readonly showClear = input<boolean>(true);

  /** Inline mode (always visible) */
  readonly inline = input<boolean>(false);

  /** Locale */
  readonly locale = input<string>('es-MX');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Selected date(s) */
  readonly value = model<Date | Date[] | null>(null);

  /** Panel visibility */
  readonly panelVisible = signal<boolean>(false);

  /** Current view */
  readonly currentView = signal<DatePickerView>('date');

  /** Current view date (for navigation) */
  readonly viewDate = signal<Date>(new Date());

  /** Focus state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on date select */
  readonly onSelect = output<Date | Date[] | null>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  /** Emitted when panel shows */
  readonly onShow = output<void>();

  /** Emitted when panel hides */
  readonly onHide = output<void>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: Date | Date[] | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: Date | Date[] | null): void {
    this.value.set(value);
    if (value && !Array.isArray(value)) {
      this.viewDate.set(new Date(value));
    } else if (Array.isArray(value) && value.length > 0) {
      this.viewDate.set(new Date(value[0]));
    }
  }

  registerOnChange(fn: (value: Date | Date[] | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // HOST LISTENER
  // =========================================================================

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.inline()) return;
    const container = this.containerRef()?.nativeElement;
    if (container && !container.contains(event.target)) {
      this.closePanel();
    }
  }

  // =========================================================================
  // COMPUTED - DATES
  // =========================================================================

  readonly weekDays = computed(() => {
    const locale = this.locale();
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const days: string[] = [];
    const baseDate = new Date(2024, 0, 7); // Sunday

    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      days.push(formatter.format(date));
    }

    return days;
  });

  readonly calendarDays = computed((): DayInfo[] => {
    const viewDate = this.viewDate();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days: DayInfo[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Previous month days
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push(this.createDayInfo(date, false, today));
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(this.createDayInfo(date, true, today));
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push(this.createDayInfo(date, false, today));
    }

    return days;
  });

  readonly months = computed(() => {
    const locale = this.locale();
    const formatter = new Intl.DateTimeFormat(locale, { month: 'short' });
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2024, i, 1);
      return formatter.format(date);
    });
  });

  readonly years = computed(() => {
    const currentYear = this.viewDate().getFullYear();
    const startYear = Math.floor(currentYear / 10) * 10;
    return Array.from({ length: 12 }, (_, i) => startYear - 1 + i);
  });

  readonly currentMonthYear = computed(() => {
    const viewDate = this.viewDate();
    const locale = this.locale();
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    return formatter.format(viewDate);
  });

  readonly displayValue = computed(() => {
    const val = this.value();
    if (!val) return '';

    const locale = this.locale();
    const formatter = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (Array.isArray(val)) {
      if (val.length === 0) return '';
      if (this.selectionMode() === 'range' && val.length === 2) {
        return `${formatter.format(val[0])} - ${formatter.format(val[1])}`;
      }
      return val.map((d) => formatter.format(d)).join(', ');
    }

    return formatter.format(val);
  });

  // =========================================================================
  // COMPUTED - STYLES
  // =========================================================================

  readonly iconSize = computed(() => {
    const sizeMap: Record<DatePickerSize, number> = { sm: 14, md: 16, lg: 18 };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-block';
  });

  readonly triggerClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const invalid = this.invalid();
    const disabled = this.disabled();
    const focused = this.focused();
    const panelVisible = this.panelVisible();

    const baseClasses = [
      'flex',
      'items-center',
      'justify-between',
      'w-full',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
    ];

    const sizeClasses: Record<DatePickerSize, string[]> = {
      sm: ['px-2.5', 'py-1.5', 'text-sm', 'h-8'],
      md: ['px-3', 'py-2', 'text-sm', 'h-10'],
      lg: ['px-4', 'py-2.5', 'text-base', 'h-12'],
    };

    const variantClasses: Record<DatePickerVariant, string[]> = {
      default: ['bg-white', 'dark:bg-gray-900', 'border-gray-300', 'dark:border-gray-600'],
      filled: ['bg-gray-100', 'dark:bg-gray-800', 'border-transparent'],
      outlined: ['bg-transparent', 'border-gray-300', 'dark:border-gray-600'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed', 'text-gray-400');
    } else {
      stateClasses.push('cursor-pointer', 'text-gray-900', 'dark:text-white');

      if (invalid) {
        stateClasses.push('border-red-500');
      } else if (focused || panelVisible) {
        stateClasses.push('border-primary', 'ring-2', 'ring-ring/20');
      } else {
        stateClasses.push('hover:border-gray-400');
      }
    }

    return [...baseClasses, ...sizeClasses[size], ...variantClasses[variant], ...stateClasses].join(
      ' '
    );
  });

  readonly panelClasses = computed(() => {
    const inline = this.inline();
    const baseClasses = [
      'bg-white',
      'dark:bg-gray-900',
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-lg',
      'shadow-lg',
      'p-3',
    ];

    if (!inline) {
      baseClasses.push('absolute', 'z-50', 'mt-1');
    }

    return baseClasses.join(' ');
  });

  readonly labelClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['block', 'text-sm', 'font-medium', 'mb-1.5'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
    );
    return baseClasses.join(' ');
  });

  readonly helpTextClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['text-xs', 'mt-1.5'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
    );
    return baseClasses.join(' ');
  });

  // =========================================================================
  // METHODS - DAY INFO
  // =========================================================================

  private createDayInfo(date: Date, isCurrentMonth: boolean, today: Date): DayInfo {
    date.setHours(0, 0, 0, 0);

    return {
      date,
      day: date.getDate(),
      isCurrentMonth,
      isToday: date.getTime() === today.getTime(),
      isSelected: this.isDateSelected(date),
      isInRange: this.isDateInRange(date),
      isDisabled: this.isDateDisabled(date),
    };
  }

  private isDateSelected(date: Date): boolean {
    const val = this.value();
    if (!val) return false;

    if (Array.isArray(val)) {
      return val.some((d) => d.getTime() === date.getTime());
    }

    return val.getTime() === date.getTime();
  }

  private isDateInRange(date: Date): boolean {
    if (this.selectionMode() !== 'range') return false;

    const val = this.value();
    if (!Array.isArray(val) || val.length !== 2) return false;

    const [start, end] = val;
    return date.getTime() > start.getTime() && date.getTime() < end.getTime();
  }

  private isDateDisabled(date: Date): boolean {
    const minDate = this.minDate();
    const maxDate = this.maxDate();
    const disabledDates = this.disabledDates();
    const disabledDays = this.disabledDays();

    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (disabledDays.includes(date.getDay())) return true;
    if (disabledDates.some((d) => d.getTime() === date.getTime())) return true;

    return false;
  }

  // =========================================================================
  // METHODS - NAVIGATION
  // =========================================================================

  previousMonth(): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  previousYear(): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(current.getFullYear() - 1, current.getMonth(), 1));
  }

  nextYear(): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(current.getFullYear() + 1, current.getMonth(), 1));
  }

  previousDecade(): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(current.getFullYear() - 10, current.getMonth(), 1));
  }

  nextDecade(): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(current.getFullYear() + 10, current.getMonth(), 1));
  }

  // =========================================================================
  // METHODS - SELECTION
  // =========================================================================

  selectDate(dayInfo: DayInfo): void {
    if (this.disabled() || dayInfo.isDisabled) return;

    const date = dayInfo.date;
    const mode = this.selectionMode();

    if (mode === 'single') {
      this.updateValue(date);
      if (!this.inline()) {
        this.closePanel();
      }
    } else if (mode === 'multiple') {
      const currentValues = (this.value() as Date[]) || [];
      const existingIndex = currentValues.findIndex((d) => d.getTime() === date.getTime());

      if (existingIndex >= 0) {
        const newValues = currentValues.filter((_, i) => i !== existingIndex);
        this.updateValue(newValues.length > 0 ? newValues : null);
      } else {
        this.updateValue([...currentValues, date]);
      }
    } else if (mode === 'range') {
      const currentValues = (this.value() as Date[]) || [];

      if (currentValues.length === 0 || currentValues.length === 2) {
        this.updateValue([date]);
      } else {
        const start = currentValues[0];
        if (date < start) {
          this.updateValue([date, start]);
        } else {
          this.updateValue([start, date]);
        }
      }
    }
  }

  selectMonth(monthIndex: number): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(current.getFullYear(), monthIndex, 1));
    this.currentView.set('date');
  }

  selectYear(year: number): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(year, current.getMonth(), 1));
    this.currentView.set('month');
  }

  selectToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.viewDate.set(today);

    if (this.selectionMode() === 'single') {
      this.updateValue(today);
    }
  }

  clear(): void {
    this.updateValue(null);
  }

  // =========================================================================
  // METHODS - PANEL
  // =========================================================================

  togglePanel(): void {
    if (this.disabled()) return;

    if (this.panelVisible()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel(): void {
    if (this.disabled()) return;
    this.panelVisible.set(true);
    this.onShow.emit();
  }

  closePanel(): void {
    this.panelVisible.set(false);
    this.currentView.set('date');
    this.onHide.emit();
  }

  switchToMonthView(): void {
    this.currentView.set('month');
  }

  switchToYearView(): void {
    this.currentView.set('year');
  }

  // =========================================================================
  // METHODS - HANDLERS
  // =========================================================================

  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.onTouchedFn();
    this.onBlur.emit(event);
  }

  getDayClasses(dayInfo: DayInfo): string {
    const baseClasses = [
      'w-8',
      'h-8',
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'text-sm',
      'transition-colors',
    ];

    if (dayInfo.isDisabled) {
      baseClasses.push('opacity-30', 'cursor-not-allowed');
    } else if (dayInfo.isSelected) {
      baseClasses.push('bg-primary', 'text-white', 'font-medium');
    } else if (dayInfo.isToday) {
      baseClasses.push(
        'border',
        'border-primary',
        'text-primary',
        'cursor-pointer',
        'hover:bg-primary-50',
        'dark:hover:bg-primary-900/20'
      );
    } else if (dayInfo.isInRange) {
      baseClasses.push('bg-primary-100', 'dark:bg-primary-900/30', 'cursor-pointer');
    } else if (!dayInfo.isCurrentMonth) {
      baseClasses.push(
        'text-gray-400',
        'dark:text-gray-600',
        'cursor-pointer',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-800'
      );
    } else {
      baseClasses.push(
        'text-gray-900',
        'dark:text-white',
        'cursor-pointer',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-800'
      );
    }

    return baseClasses.join(' ');
  }

  private updateValue(value: Date | Date[] | null): void {
    this.value.set(value);
    this.onChangeFn(value);
    this.onSelect.emit(value);
  }
}
