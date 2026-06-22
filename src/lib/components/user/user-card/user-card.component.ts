import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'ui-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiUserCardComponent {
  readonly user = input.required<UserProfile>();
  readonly variant = input<'compact' | 'full'>('full');
  readonly showStatus = input<boolean>(true);
  readonly status = input<'online' | 'away' | 'busy' | 'offline'>('offline');
  readonly clickable = input<boolean>(false);

  readonly cardClicked = output<void>();

  readonly statusColor = computed(() => {
    const map: Record<string, string> = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
      offline: 'bg-gray-400',
    };
    return map[this.status()];
  });

  readonly initials = computed(() => {
    const u = this.user();
    const parts = u.name.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : u.name.substring(0, 2).toUpperCase();
  });

  readonly cardClasses = computed(() => {
    const base = 'flex items-center gap-3 p-3 rounded-xl border border-border bg-card';
    return this.clickable() ? base + ' cursor-pointer hover:bg-accent transition-colors' : base;
  });
}
