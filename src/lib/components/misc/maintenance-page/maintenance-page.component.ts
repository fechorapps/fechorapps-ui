import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  signal,
  effect,
  OnDestroy,
} from '@angular/core';
import { LucideAngularModule, Wrench, Mail, Clock } from 'lucide-angular';

@Component({
  selector: 'ui-maintenance-page',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './maintenance-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMaintenancePageComponent implements OnDestroy {
  readonly wrenchIcon = Wrench;
  readonly mailIcon = Mail;
  readonly clockIcon = Clock;

  // Inputs
  readonly title = input<string>('Under Maintenance');
  readonly message = input<string>(
    "We're performing scheduled maintenance. We'll be back soon."
  );
  readonly estimatedTime = input<string | null>(null);
  readonly showCountdown = input<boolean>(false);
  readonly returnTime = input<Date | null>(null);
  readonly contactEmail = input<string | null>(null);

  // Countdown state
  readonly countdown = signal<{ hours: number; minutes: number; seconds: number } | null>(null);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      const returnTime = this.returnTime();
      const show = this.showCountdown();

      this.clearInterval();

      if (show && returnTime) {
        this.updateCountdown(returnTime);
        this.intervalId = setInterval(() => {
          this.updateCountdown(returnTime);
        }, 1000);
      } else {
        this.countdown.set(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  private clearInterval(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private updateCountdown(returnTime: Date): void {
    const now = new Date();
    const diff = returnTime.getTime() - now.getTime();

    if (diff <= 0) {
      this.countdown.set({ hours: 0, minutes: 0, seconds: 0 });
      this.clearInterval();
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    this.countdown.set({ hours, minutes, seconds });
  }

  readonly formattedCountdown = computed(() => {
    const c = this.countdown();
    if (!c) return null;
    return {
      hours: String(c.hours).padStart(2, '0'),
      minutes: String(c.minutes).padStart(2, '0'),
      seconds: String(c.seconds).padStart(2, '0'),
    };
  });

  readonly mailtoLink = computed(() => {
    const email = this.contactEmail();
    return email ? `mailto:${email}` : null;
  });
}
