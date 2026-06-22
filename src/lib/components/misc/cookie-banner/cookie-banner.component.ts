import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
} from '@angular/core';
import { LucideAngularModule, Cookie } from 'lucide-angular';

@Component({
  selector: 'ui-cookie-banner',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './cookie-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCookieBannerComponent {
  readonly cookieIcon = Cookie;

  // Inputs
  readonly visible = model<boolean>(true);
  readonly message = input<string>('We use cookies to improve your experience.');
  readonly acceptLabel = input<string>('Accept All');
  readonly rejectLabel = input<string>('Reject');
  readonly settingsLabel = input<string>('Cookie Settings');
  readonly showSettings = input<boolean>(true);
  readonly position = input<'top' | 'bottom'>('bottom');

  // Outputs
  readonly accepted = output<void>();
  readonly rejected = output<void>();
  readonly settingsClicked = output<void>();

  // Computed
  readonly positionClass = computed(() =>
    this.position() === 'top' ? 'top-0' : 'bottom-0'
  );

  accept(): void {
    this.visible.set(false);
    this.accepted.emit();
  }

  reject(): void {
    this.visible.set(false);
    this.rejected.emit();
  }

  openSettings(): void {
    this.settingsClicked.emit();
  }
}
