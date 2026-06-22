import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';
import type { LucideIconData } from 'lucide-angular';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface UserMenuItem {
  label?: string;
  icon?: LucideIconData;
  action?: () => void;
  divider?: boolean;
}

@Component({
  selector: 'ui-user-menu',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiUserMenuComponent {
  readonly user = input.required<UserProfile>();
  readonly menuItems = input<UserMenuItem[]>([]);
  readonly placement = input<'bottom-right' | 'bottom-left'>('bottom-right');

  readonly itemSelected = output<UserMenuItem>();
  readonly avatarClicked = output<void>();

  readonly open = signal<boolean>(false);

  readonly chevronDownIcon = ChevronDown;

  readonly initials = computed(() => {
    const u = this.user();
    const parts = u.name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : u.name.substring(0, 2).toUpperCase();
  });

  readonly dropdownClasses = computed(() =>
    this.placement() === 'bottom-right' ? 'right-0' : 'left-0'
  );

  toggle(): void {
    this.open.update(v => !v);
  }

  selectItem(item: UserMenuItem): void {
    item.action?.();
    this.itemSelected.emit(item);
    this.open.set(false);
  }
}
