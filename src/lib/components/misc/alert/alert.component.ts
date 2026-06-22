import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { LucideAngularModule, Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-angular';
import type { LucideIconData } from 'lucide-angular';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAlertComponent {
  readonly variant = input<AlertVariant>('info');
  readonly title = input<string | undefined>(undefined);
  readonly dismissible = input<boolean>(false);
  readonly icon = input<LucideIconData | undefined>(undefined);
  readonly banner = input<boolean>(false);

  readonly dismissed = output<void>();

  readonly visible = signal<boolean>(true);

  readonly xIcon = X;

  readonly variantClasses = computed(() => {
    const v = this.variant();
    const map: Record<AlertVariant, string> = {
      info: 'bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 text-blue-800 dark:text-blue-200',
      success: 'bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 text-green-800 dark:text-green-200',
      warning: 'bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200',
      danger: 'bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 text-red-800 dark:text-red-200',
    };
    return map[v];
  });

  readonly defaultIcon = computed(() => {
    const v = this.variant();
    const map: Record<AlertVariant, LucideIconData> = {
      info: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      danger: XCircle,
    };
    return map[v];
  });

  readonly containerClasses = computed(() => {
    const base = this.variantClasses();
    return this.banner() ? base : `${base} rounded-lg`;
  });

  dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
