import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  signal,
} from '@angular/core';
import { LucideAngularModule, Search, X, Loader2 } from 'lucide-angular';

export interface SearchSuggestion {
  label: string;
  category?: string;
}

@Component({
  selector: 'ui-search-bar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSearchBarComponent {
  // Icons
  readonly searchIcon = Search;
  readonly clearIcon = X;
  readonly loadingIcon = Loader2;

  // Inputs
  readonly value = model<string>('');
  readonly placeholder = input<string>('Search...');
  readonly debounce = input<number>(300);
  readonly loading = input<boolean>(false);
  readonly suggestions = input<SearchSuggestion[]>([]);
  readonly showHistory = input<boolean>(false);

  // Outputs
  readonly search = output<string>();
  readonly suggestionSelected = output<string>();
  readonly cleared = output<void>();

  // Signals
  readonly focused = signal<boolean>(false);
  readonly inputValue = signal<string>('');

  // Internal debounce
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // Computed
  readonly showDropdown = computed(
    () => this.focused() && (this.suggestions().length > 0 || this.showHistory())
  );

  onInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.inputValue.set(v);
    this.value.set(v);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.search.emit(v), this.debounce());
  }

  onFocus(): void {
    this.focused.set(true);
  }

  onBlur(): void {
    // Delay to allow suggestion clicks to register
    setTimeout(() => this.focused.set(false), 150);
  }

  clearValue(): void {
    this.inputValue.set('');
    this.value.set('');
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.cleared.emit();
  }

  selectSuggestion(suggestion: SearchSuggestion): void {
    this.inputValue.set(suggestion.label);
    this.value.set(suggestion.label);
    this.suggestionSelected.emit(suggestion.label);
    this.focused.set(false);
  }
}
