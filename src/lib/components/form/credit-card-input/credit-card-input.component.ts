import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';

export interface CreditCardValue {
  number: string; // raw digits only, no spaces
  expiry: string; // MM/YY
  cvv: string;
}

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

/**
 * UiCreditCardInputComponent
 *
 * A credit card input with automatic card type detection, Amex support,
 * expiry auto-formatting, CVV masking, and signal-based API.
 *
 * @example
 * ```html
 * <ui-credit-card-input [(value)]="card" (validChange)="onValid($event)"></ui-credit-card-input>
 * ```
 */
@Component({
  selector: 'ui-credit-card-input',
  standalone: true,
  imports: [],
  templateUrl: './credit-card-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiCreditCardInputComponent {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Two-way bindable credit card value */
  readonly value = model<CreditCardValue>({ number: '', expiry: '', cvv: '' });

  /** Whether to show the CVV field */
  readonly showCvv = input<boolean>(true);

  /** Whether to show the card type icon */
  readonly showCardIcon = input<boolean>(true);

  /** Whether the input is disabled */
  readonly disabled = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when any card field changes */
  readonly cardChange = output<CreditCardValue>();

  /** Emitted when the detected card type changes */
  readonly cardTypeChange = output<CardType>();

  /** Emitted when the overall validity changes */
  readonly validChange = output<boolean>();

  // =========================================================================
  // STATE
  // =========================================================================

  /** Card number formatted with spaces */
  readonly numberInput = signal<string>('');

  /** Expiry in MM/YY format */
  readonly expiryInput = signal<string>('');

  /** Raw CVV digits */
  readonly cvvInput = signal<string>('');

  /** Toggle CVV visibility (show as plain text vs password) */
  readonly showCvvText = signal<boolean>(false);

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly cardType = computed((): CardType => {
    const n = this.numberInput().replace(/\s/g, '');
    if (/^4/.test(n)) return 'visa';
    if (/^5[1-5]/.test(n)) return 'mastercard';
    if (/^3[47]/.test(n)) return 'amex';
    if (/^6(?:011|5)/.test(n)) return 'discover';
    return 'unknown';
  });

  readonly isAmex = computed(() => this.cardType() === 'amex');

  readonly isValid = computed(() => {
    const num = this.numberInput().replace(/\s/g, '');
    const exp = this.expiryInput();
    const cvv = this.cvvInput();
    const numValid = this.isAmex() ? num.length === 15 : num.length === 16;
    const [mm, yy] = exp.split('/');
    const expValid = mm && yy && +mm >= 1 && +mm <= 12;
    const cvvValid = this.isAmex() ? cvv.length === 4 : cvv.length === 3;
    return numValid && !!expValid && cvvValid;
  });

  /** Max CVV length based on card type */
  readonly cvvMaxLength = computed(() => (this.isAmex() ? 4 : 3));

  /** Max card number input length (formatted) */
  readonly numberMaxLength = computed(() => (this.isAmex() ? 17 : 19));

  // =========================================================================
  // CONSTRUCTOR & EFFECTS
  // =========================================================================

  private _prevCardType: CardType = 'unknown';
  private _prevValid: boolean = false;

  constructor() {
    // Emit cardTypeChange when card type changes
    effect(() => {
      const type = this.cardType();
      if (type !== this._prevCardType) {
        this._prevCardType = type;
        this.cardTypeChange.emit(type);
      }
    });

    // Emit validChange when validity changes
    effect(() => {
      const valid = this.isValid();
      if (valid !== this._prevValid) {
        this._prevValid = valid;
        this.validChange.emit(valid);
      }
    });
  }

  // =========================================================================
  // METHODS
  // =========================================================================

  formatNumber(raw: string): string {
    const digits = raw.replace(/\D/g, '');
    if (this.isAmex()) {
      return digits.replace(/(\d{4})(\d{0,6})(\d{0,5})/, '$1 $2 $3').trim();
    }
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }

  onNumberInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const max = this.isAmex() ? 15 : 16;
    this.numberInput.set(this.formatNumber(digits.slice(0, max)));
    this.emitChange();
  }

  onExpiryInput(e: Event): void {
    let v = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
    this.expiryInput.set(v);
    this.emitChange();
  }

  onCvvInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const max = this.isAmex() ? 4 : 3;
    this.cvvInput.set(digits.slice(0, max));
    this.emitChange();
  }

  toggleCvvVisibility(): void {
    this.showCvvText.update(v => !v);
  }

  emitChange(): void {
    const cardValue: CreditCardValue = {
      number: this.numberInput().replace(/\s/g, ''),
      expiry: this.expiryInput(),
      cvv: this.cvvInput(),
    };
    this.value.set(cardValue);
    this.cardChange.emit(cardValue);
  }
}
