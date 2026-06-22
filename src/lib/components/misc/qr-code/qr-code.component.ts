import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  effect,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Download } from 'lucide-angular';
import QRCode from 'qrcode';

@Component({
  selector: 'ui-qr-code',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './qr-code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiQrCodeComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly value = input<string>('');
  readonly size = input<number>(200);
  readonly errorCorrectionLevel = input<'L' | 'M' | 'Q' | 'H'>('M');
  readonly color = input<string>('#000000');
  readonly backgroundColor = input<string>('#ffffff');
  readonly showValue = input<boolean>(false);

  readonly dataUrl = signal<string>('');
  readonly downloadIcon = Download;

  constructor() {
    effect(async () => {
      const val = this.value();
      if (!val || !isPlatformBrowser(this.platformId)) return;
      try {
        const url = await QRCode.toDataURL(val, {
          width: this.size(),
          errorCorrectionLevel: this.errorCorrectionLevel(),
          color: { dark: this.color(), light: this.backgroundColor() },
          margin: 1,
        });
        this.dataUrl.set(url);
      } catch {
        this.dataUrl.set('');
      }
    });
  }

  download(): void {
    if (!this.dataUrl()) return;
    const a = document.createElement('a');
    a.href = this.dataUrl();
    a.download = 'qrcode.png';
    a.click();
  }
}
