import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  signal,
} from '@angular/core';
import { LucideAngularModule, Search, X, Keyboard } from 'lucide-angular';

export interface ShortcutItem {
  label: string;
  keys: string[];
}

export interface ShortcutGroup {
  group: string;
  items: ShortcutItem[];
}

@Component({
  selector: 'ui-shortcut-keys',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './shortcut-keys.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiShortcutKeysComponent {
  readonly searchIcon = Search;
  readonly xIcon = X;
  readonly keyboardIcon = Keyboard;

  // Inputs
  readonly shortcuts = input.required<ShortcutGroup[]>();
  readonly visible = model<boolean>(true);
  readonly searchable = input<boolean>(true);
  readonly title = input<string>('Keyboard Shortcuts');

  // Outputs
  readonly closed = output<void>();

  // Internal state
  readonly searchTerm = signal<string>('');

  // Computed
  readonly filteredGroups = computed<ShortcutGroup[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.shortcuts();
    return this.shortcuts()
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.label.toLowerCase().includes(term) ||
            item.keys.some((k) => k.toLowerCase().includes(term))
        ),
      }))
      .filter((group) => group.items.length > 0);
  });

  readonly hasResults = computed(() => this.filteredGroups().length > 0);

  close(): void {
    this.visible.set(false);
    this.closed.emit();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  trackByGroup(_index: number, group: ShortcutGroup): string {
    return group.group;
  }

  trackByItem(_index: number, item: ShortcutItem): string {
    return item.label;
  }
}
