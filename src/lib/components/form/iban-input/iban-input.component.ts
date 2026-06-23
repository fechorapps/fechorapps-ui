import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Check, Copy, LucideAngularModule, X } from 'lucide-angular';

/**
 * UiIbanInputComponent
 *
 * An IBAN input with automatic country detection, length validation,
 * formatted display (groups of 4), validity indicator, and clipboard copy.
 *
 * @example
 * ```html
 * <ui-iban-input [(value)]="iban" (validChange)="onValid($event)"></ui-iban-input>
 * ```
 */
@Component({
  selector: 'ui-iban-input',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './iban-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiIbanInputComponent {
  // =========================================================================
  // IBAN LENGTH MAP (country code → total character length)
  // =========================================================================

  private readonly IBAN_LENGTHS: Record<string, number> = {
    AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22,
    BH: 22, BR: 29, BY: 28, CH: 21, CY: 28, CZ: 24, DE: 22, DK: 18,
    DO: 28, EE: 20, ES: 24, FI: 18, FR: 27, GB: 22, GE: 22, GI: 23,
    GR: 27, HR: 21, HU: 28, IE: 22, IL: 23, IQ: 23, IS: 26, IT: 27,
    LB: 28, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, ME: 22, MK: 19,
    MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29,
    PT: 25, QA: 29, RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24,
    SM: 27, ST: 25, SV: 28, TL: 23, TN: 24, TR: 26, UA: 29, VG: 24,
    XK: 20,
  };

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Two-way bindable raw IBAN value (no spaces) */
  readonly value = model<string>('');

  /** Override the country code (auto-detected from value if not set) */
  readonly country = input<string | null>(null);

  /** Whether to show a bank name hint (placeholder for future use) */
  readonly showBankName = input<boolean>(false);

  /** Whether the input is disabled */
  readonly disabled = input<boolean>(false);

  /** Label text */
  readonly label = input<string>('IBAN');

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when the raw IBAN value changes */
  readonly ibanChange = output<string>();

  /** Emitted when the validity changes */
  readonly validChange = output<boolean>();

  // =========================================================================
  // STATE
  // =========================================================================

  /** IBAN formatted with spaces (groups of 4) */
  readonly displayValue = signal<string>('');

  /** Whether the clipboard copy was recently triggered */
  readonly copied = signal<boolean>(false);

  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly checkIcon = Check;
  protected readonly xIcon = X;
  protected readonly copyIcon = Copy;

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Detected or overridden 2-letter country code */
  readonly detectedCountry = computed(() => {
    const raw = this.value().toUpperCase();
    return raw.length >= 2 ? raw.slice(0, 2) : (this.country() ?? '');
  });

  /** Expected total IBAN length for the detected country */
  readonly expectedLength = computed(() =>
    this.IBAN_LENGTHS[this.detectedCountry()] ?? null
  );

  /** Whether the current IBAN value matches the expected length */
  readonly isValid = computed(() => {
    const raw = this.value().replace(/\s/g, '').toUpperCase();
    const expected = this.expectedLength();
    return !!expected && raw.length === expected;
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  onInput(e: Event): void {
    const raw = (e.target as HTMLInputElement).value
      .replace(/[^A-Z0-9a-z]/g, '')
      .toUpperCase();
    this.value.set(raw);
    this.displayValue.set(raw.replace(/(.{4})/g, '$1 ').trim());
    this.ibanChange.emit(raw);
    this.validChange.emit(this.isValid());
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.value()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
