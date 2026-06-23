import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  signal,
} from '@angular/core';

export interface AddressSuggestion {
  id: string;
  label: string;
  value: AddressValue;
}

export interface AddressValue {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  raw?: string;
}

/**
 * UiAddressInputComponent
 *
 * A typeahead address input with suggestion dropdown, debounced search,
 * and an optional collapsible manual-entry form for all address fields.
 *
 * @example
 * ```html
 * <ui-address-input
 *   [(value)]="address"
 *   [searchFn]="mySearchFn"
 *   placeholder="Search address..."
 *   (addressSelected)="onSelect($event)"
 * ></ui-address-input>
 * ```
 */
@Component({
  selector: 'ui-address-input',
  standalone: true,
  imports: [],
  templateUrl: './address-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiAddressInputComponent {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Two-way bindable address value */
  readonly value = model<AddressValue | null>(null);

  /** Async function that returns address suggestions for a query string */
  readonly searchFn = input.required<(query: string) => Promise<AddressSuggestion[]>>();

  /** Placeholder text for the search input */
  readonly placeholder = input<string>('Search address...');

  /** Debounce delay in milliseconds before triggering the search */
  readonly debounceMs = input<number>(300);

  /** Minimum characters required before triggering a search */
  readonly minChars = input<number>(3);

  /** Whether the input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether to show the "Enter manually" link */
  readonly showManualEntry = input<boolean>(true);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when an address suggestion is selected */
  readonly addressSelected = output<AddressValue>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly query = signal<string>('');
  readonly suggestions = signal<AddressSuggestion[]>([]);
  readonly loading = signal<boolean>(false);
  readonly showDropdown = signal<boolean>(false);
  readonly showManualForm = signal<boolean>(false);
  readonly manualValue = signal<AddressValue>({});

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // =========================================================================
  // METHODS — Search
  // =========================================================================

  onQueryInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.query.set(v);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    if (v.length < this.minChars()) {
      this.suggestions.set([]);
      this.showDropdown.set(false);
      return;
    }
    this.debounceTimer = setTimeout(() => this.search(v), this.debounceMs());
  }

  private async search(q: string): Promise<void> {
    this.loading.set(true);
    try {
      const results = await this.searchFn()(q);
      this.suggestions.set(results);
      this.showDropdown.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  selectSuggestion(s: AddressSuggestion): void {
    this.value.set(s.value);
    this.query.set(s.label);
    this.showDropdown.set(false);
    this.addressSelected.emit(s.value);
  }

  closeDropdown(): void {
    // Small delay so click events on dropdown items can fire first
    setTimeout(() => this.showDropdown.set(false), 150);
  }

  // =========================================================================
  // METHODS — Manual form
  // =========================================================================

  toggleManualForm(): void {
    this.showManualForm.update(v => !v);
    if (this.showManualForm()) {
      // Pre-populate manual form from current value if available
      const current = this.value();
      if (current) {
        this.manualValue.set({ ...current });
      }
    }
  }

  onManualFieldInput(field: keyof AddressValue, e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.manualValue.update(mv => ({ ...mv, [field]: v }));
  }

  applyManualValue(): void {
    const mv = this.manualValue();
    this.value.set(mv);
    this.query.set(this.formatAddressLabel(mv));
    this.showManualForm.set(false);
    this.addressSelected.emit(mv);
  }

  clearValue(): void {
    this.value.set(null);
    this.query.set('');
    this.suggestions.set([]);
    this.showDropdown.set(false);
    this.manualValue.set({});
  }

  // =========================================================================
  // HELPERS
  // =========================================================================

  private formatAddressLabel(av: AddressValue): string {
    const parts = [av.street, av.city, av.state, av.postalCode, av.country].filter(Boolean);
    return parts.length ? parts.join(', ') : (av.raw ?? '');
  }
}
