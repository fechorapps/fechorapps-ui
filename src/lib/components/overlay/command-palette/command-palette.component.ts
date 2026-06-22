import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  signal,
  HostListener,
} from '@angular/core';
import { LucideAngularModule, LucideIconData, Search } from 'lucide-angular';

export interface CommandItem {
  id: string;
  label: string;
  icon?: LucideIconData;
  shortcut?: string;
  action: () => void;
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

@Component({
  selector: 'ui-command-palette',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './command-palette.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCommandPaletteComponent {
  // Icons
  readonly searchIcon = Search;

  // Inputs
  readonly visible = model<boolean>(false);
  readonly placeholder = input<string>('Type a command or search...');
  readonly groups = input<CommandGroup[]>([]);
  readonly closeOnSelect = input<boolean>(true);

  // Outputs
  readonly itemSelected = output<CommandItem>();
  readonly onClose = output<void>();

  // Signals
  readonly searchQuery = signal<string>('');
  readonly activeIndex = signal<number>(0);

  // Computed
  readonly filteredGroups = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.groups();
    return this.groups()
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length > 0);
  });

  readonly flatItems = computed(() => this.filteredGroups().flatMap((g) => g.items));

  // Methods
  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
    this.onClose.emit();
    this.searchQuery.set('');
    this.activeIndex.set(0);
  }

  selectItem(item: CommandItem): void {
    item.action();
    this.itemSelected.emit(item);
    if (this.closeOnSelect()) {
      this.close();
    }
  }

  isActive(item: CommandItem): boolean {
    const flat = this.flatItems();
    const idx = this.activeIndex();
    return flat[idx]?.id === item.id;
  }

  onKeydown(event: KeyboardEvent): void {
    const flat = this.flatItems();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((i) => Math.min(i + 1, flat.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((i) => Math.max(i - 1, 0));
        break;
      case 'Enter': {
        const active = flat[this.activeIndex()];
        if (active) {
          this.selectItem(active);
        }
        break;
      }
      case 'Escape':
        this.close();
        break;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent): void {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      this.open();
    }
  }
}
