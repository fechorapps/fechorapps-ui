import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
} from '@angular/core';
import { LucideAngularModule, LucideIconData, Bell, X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-angular';

export interface UiNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
  timestamp: Date;
  icon?: LucideIconData;
}

@Component({
  selector: 'ui-notification-center',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './notification-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiNotificationCenterComponent {
  // Icons
  readonly bellIcon = Bell;
  readonly xIcon = X;
  readonly infoIcon = Info;
  readonly successIcon = CheckCircle;
  readonly warningIcon = AlertTriangle;
  readonly dangerIcon = AlertCircle;

  // Inputs
  readonly notifications = input<UiNotification[]>([]);
  readonly maxVisible = input<number>(5);
  readonly placement = input<'top-right' | 'bottom-right'>('top-right');

  // Outputs
  readonly notificationRead = output<string>();
  readonly allRead = output<void>();
  readonly notificationDismissed = output<string>();

  // Signals
  readonly open = signal<boolean>(false);

  // Computed
  readonly unreadCount = computed(() => this.notifications().filter((n) => !n.read).length);

  readonly visibleNotifications = computed(() =>
    this.notifications().slice(0, this.maxVisible())
  );

  readonly panelPlacementClass = computed(() =>
    this.placement() === 'bottom-right' ? 'bottom-full mb-2' : 'top-full mt-2'
  );

  // Methods
  toggle(): void {
    this.open.update((v) => !v);
  }

  markRead(id: string): void {
    this.notificationRead.emit(id);
  }

  markAllRead(): void {
    this.allRead.emit();
  }

  dismiss(id: string): void {
    this.notificationDismissed.emit(id);
  }

  getTypeIcon(type: UiNotification['type']): LucideIconData {
    const iconMap: Record<UiNotification['type'], LucideIconData> = {
      info: this.infoIcon,
      success: this.successIcon,
      warning: this.warningIcon,
      danger: this.dangerIcon,
    };
    return iconMap[type];
  }

  getTypeIconClass(type: UiNotification['type']): string {
    const classMap: Record<UiNotification['type'], string> = {
      info: 'text-blue-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      danger: 'text-red-500',
    };
    return classMap[type];
  }
}
