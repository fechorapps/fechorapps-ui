import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  signal,
  computed,
} from '@angular/core';

export interface MentionUser {
  id: string;
  name: string;
  avatar?: string;
  username?: string;
}

@Component({
  selector: 'ui-mention-input',
  standalone: true,
  imports: [],
  templateUrl: './mention-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMentionInputComponent {
  readonly value = model<string>('');
  readonly users = input<MentionUser[]>([]);
  readonly placeholder = input<string>('Type @ to mention someone...');
  readonly disabled = input<boolean>(false);
  readonly triggerChar = input<string>('@');

  readonly mentionSelected = output<MentionUser>();
  readonly valueChange = output<string>();

  readonly showDropdown = signal<boolean>(false);
  readonly mentionQuery = signal<string>('');
  readonly activeIndex = signal<number>(0);

  readonly filteredUsers = computed(() => {
    const q = this.mentionQuery().toLowerCase();
    return this.users()
      .filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          (u.username ?? '').toLowerCase().includes(q)
      )
      .slice(0, 8);
  });

  onInput(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    this.value.set(val);
    this.valueChange.emit(val);
    const trigger = this.triggerChar();
    const lastAt = val.lastIndexOf(trigger);
    if (lastAt >= 0) {
      const query = val.slice(lastAt + 1);
      if (!query.includes(' ') && query.length <= 20) {
        this.mentionQuery.set(query);
        this.showDropdown.set(true);
        this.activeIndex.set(0);
        return;
      }
    }
    this.showDropdown.set(false);
  }

  selectUser(user: MentionUser): void {
    const val = this.value();
    const trigger = this.triggerChar();
    const lastAt = val.lastIndexOf(trigger);
    const newVal = val.slice(0, lastAt) + trigger + user.name + ' ';
    this.value.set(newVal);
    this.showDropdown.set(false);
    this.mentionSelected.emit(user);
  }

  onKeydown(e: KeyboardEvent): void {
    if (!this.showDropdown()) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.activeIndex.update((i) =>
        Math.min(i + 1, this.filteredUsers().length - 1)
      );
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex.update((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && this.filteredUsers().length) {
      e.preventDefault();
      this.selectUser(this.filteredUsers()[this.activeIndex()]);
    }
    if (e.key === 'Escape') {
      this.showDropdown.set(false);
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}
