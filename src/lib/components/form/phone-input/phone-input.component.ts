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

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  minDigits: number;
  maxDigits: number;
}

/**
 * UiPhoneInputComponent
 *
 * A phone number input with embedded country selector and E.164 output.
 * Supports preferred countries, validation, and signal-based API.
 *
 * @example
 * ```html
 * <ui-phone-input [(value)]="phone" defaultCountry="US" label="Phone"></ui-phone-input>
 * ```
 */
@Component({
  selector: 'ui-phone-input',
  standalone: true,
  imports: [],
  templateUrl: './phone-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiPhoneInputComponent {
  // =========================================================================
  // EMBEDDED COUNTRY DATA
  // =========================================================================

  private readonly COUNTRIES: Country[] = [
    { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽', minDigits: 10, maxDigits: 10 },
    { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', minDigits: 10, maxDigits: 10 },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', minDigits: 10, maxDigits: 10 },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', minDigits: 10, maxDigits: 10 },
    { code: 'ES', name: 'España', dialCode: '+34', flag: '🇪🇸', minDigits: 9, maxDigits: 9 },
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', minDigits: 9, maxDigits: 9 },
    { code: 'DE', name: 'Deutschland', dialCode: '+49', flag: '🇩🇪', minDigits: 10, maxDigits: 11 },
    { code: 'IT', name: 'Italia', dialCode: '+39', flag: '🇮🇹', minDigits: 9, maxDigits: 11 },
    { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷', minDigits: 10, maxDigits: 11 },
    { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', minDigits: 10, maxDigits: 10 },
    { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', minDigits: 10, maxDigits: 10 },
    { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', minDigits: 9, maxDigits: 9 },
    { code: 'PE', name: 'Perú', dialCode: '+51', flag: '🇵🇪', minDigits: 9, maxDigits: 9 },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', minDigits: 10, maxDigits: 11 },
    { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', minDigits: 11, maxDigits: 11 },
    { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', minDigits: 10, maxDigits: 10 },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', minDigits: 9, maxDigits: 9 },
    { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', minDigits: 9, maxDigits: 9 },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', minDigits: 9, maxDigits: 9 },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', minDigits: 9, maxDigits: 9 },
  ];

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Two-way bindable E.164 phone value */
  readonly value = model<string>('');

  /** ISO 3166-1 alpha-2 country code to pre-select */
  readonly defaultCountry = input<string>('MX');

  /** Preferred country codes to show at the top of the list */
  readonly preferredCountries = input<string[]>([]);

  /** Placeholder text for the number input */
  readonly placeholder = input<string>('');

  /** Whether the input is disabled */
  readonly disabled = input<boolean>(false);

  /** Label text displayed above the input */
  readonly label = input<string>('');

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when the phone value changes (E.164 format) */
  readonly phoneChange = output<string>();

  /** Emitted when the validity of the phone number changes */
  readonly validChange = output<boolean>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly selectedCountry = signal<Country>(
    this.COUNTRIES.find(c => c.code === 'MX') ?? this.COUNTRIES[0]
  );

  readonly rawDigits = signal<string>('');

  readonly showDropdown = signal<boolean>(false);

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly isValid = computed(() => {
    const digits = this.rawDigits().replace(/\D/g, '');
    const c = this.selectedCountry();
    return digits.length >= c.minDigits && digits.length <= c.maxDigits;
  });

  readonly formattedValue = computed(() =>
    `${this.selectedCountry().dialCode}${this.rawDigits()}`
  );

  readonly filteredCountries = computed(() => {
    const preferred = this.preferredCountries();
    if (!preferred.length) return this.COUNTRIES;
    const pref = this.COUNTRIES.filter(c => preferred.includes(c.code));
    const rest = this.COUNTRIES.filter(c => !preferred.includes(c.code));
    return [...pref, ...rest];
  });

  // =========================================================================
  // CONSTRUCTOR & EFFECTS
  // =========================================================================

  constructor() {
    // Initialize selected country from defaultCountry input
    effect(() => {
      const code = this.defaultCountry();
      const country = this.COUNTRIES.find(c => c.code === code);
      if (country) {
        this.selectedCountry.set(country);
      }
    });

    // Emit changes whenever value changes (only after user has entered digits)
    effect(() => {
      if (!this.rawDigits()) return;
      this.phoneChange.emit(this.formattedValue());
      this.validChange.emit(this.isValid());
    });
  }

  // =========================================================================
  // METHODS
  // =========================================================================

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    // Only allow digits
    const digits = target.value.replace(/\D/g, '');
    this.rawDigits.set(digits);
    target.value = digits;
  }

  selectCountry(country: Country): void {
    this.selectedCountry.set(country);
    this.showDropdown.set(false);
  }

  toggleDropdown(): void {
    if (!this.disabled()) {
      this.showDropdown.update(v => !v);
    }
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
  }
}
