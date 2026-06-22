import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  signal,
} from '@angular/core';
import { Clock, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-time-picker',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './time-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTimePickerComponent {
  protected readonly clockIcon = Clock;

  readonly value = model<string>('00:00');
  readonly placeholder = input<string>('Select time');
  readonly disabled = input<boolean>(false);
  readonly use24h = input<boolean>(true);
  readonly showSeconds = input<boolean>(false);
  readonly step = input<number>(1);

  readonly timeChanged = output<string>();

  readonly open = signal<boolean>(false);
  readonly hours = signal<number>(0);
  readonly minutes = signal<number>(0);
  readonly seconds = signal<number>(0);
  readonly period = signal<'AM' | 'PM'>('AM');

  readonly displayValue = computed(() => {
    const v = this.value();
    if (!v) return this.placeholder();
    return v;
  });

  readonly hourOptions = computed(() =>
    Array.from({ length: this.use24h() ? 24 : 12 }, (_, i) => (this.use24h() ? i : i + 1))
  );

  readonly minuteOptions = computed(() => {
    const opts: number[] = [];
    for (let i = 0; i < 60; i += this.step()) opts.push(i);
    return opts;
  });

  readonly secondOptions = computed(() => {
    const opts: number[] = [];
    for (let i = 0; i < 60; i++) opts.push(i);
    return opts;
  });

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  setHour(h: number): void {
    this.hours.set(h);
  }

  setMinute(m: number): void {
    this.minutes.set(m);
  }

  setSecond(s: number): void {
    this.seconds.set(s);
  }

  formatTime(): string {
    const h = this.pad(this.hours());
    const m = this.pad(this.minutes());
    const s = this.pad(this.seconds());
    if (this.showSeconds()) return `${h}:${m}:${s}`;
    return `${h}:${m}`;
  }

  applyAndClose(): void {
    const t = this.formatTime();
    this.value.set(t);
    this.timeChanged.emit(t);
    this.open.set(false);
  }
}
