import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  Injectable,
  signal,
} from '@angular/core';

import { LucideAngularModule, X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-angular';

export type ToastSeverity = 'success' | 'error' | 'warn' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastMessage {
  id: string;
  severity: ToastSeverity;
  summary: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _messages = signal<ToastMessage[]>([]);
  readonly messages = this._messages.asReadonly();

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  add(message: Omit<ToastMessage, 'id'>): string {
    const id = this.generateId();
    const newMessage: ToastMessage = {
      id,
      closable: true,
      life: 3000,
      ...message,
    };

    this._messages.update((msgs) => [...msgs, newMessage]);

    if (!newMessage.sticky && newMessage.life) {
      setTimeout(() => {
        this.remove(id);
      }, newMessage.life);
    }

    return id;
  }

  success(summary: string, detail?: string, life?: number): string {
    return this.add({ severity: 'success', summary, detail, life });
  }

  error(summary: string, detail?: string, life?: number): string {
    return this.add({ severity: 'error', summary, detail, life: life ?? 5000 });
  }

  warn(summary: string, detail?: string, life?: number): string {
    return this.add({ severity: 'warn', summary, detail, life });
  }

  info(summary: string, detail?: string, life?: number): string {
    return this.add({ severity: 'info', summary, detail, life });
  }

  remove(id: string): void {
    this._messages.update((msgs) => msgs.filter((m) => m.id !== id));
  }

  clear(): void {
    this._messages.set([]);
  }
}

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToastComponent {
  // Icons
  readonly closeIcon = X;
  readonly severityIcons = {
    success: CheckCircle,
    error: XCircle,
    warn: AlertTriangle,
    info: Info,
  };

  // Inputs
  readonly position = input<ToastPosition>('top-right');
  readonly messages = input<ToastMessage[]>([]);

  // Computed
  readonly containerClasses = computed(() => {
    const base = 'fixed z-50 flex flex-col gap-2 p-4 pointer-events-none';

    const positionMap: Record<ToastPosition, string> = {
      'top-right': 'top-0 right-0 items-end',
      'top-left': 'top-0 left-0 items-start',
      'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
      'bottom-right': 'bottom-0 right-0 items-end',
      'bottom-left': 'bottom-0 left-0 items-start',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
    };

    return `${base} ${positionMap[this.position()]}`;
  });

  getSeverityClasses(severity: ToastSeverity): string {
    const severityMap: Record<ToastSeverity, string> = {
      success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
      error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
      warn: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
      info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
    };
    return severityMap[severity];
  }

  getIconClasses(severity: ToastSeverity): string {
    const iconMap: Record<ToastSeverity, string> = {
      success: 'text-green-500 dark:text-green-400',
      error: 'text-red-500 dark:text-red-400',
      warn: 'text-yellow-500 dark:text-yellow-400',
      info: 'text-blue-500 dark:text-blue-400',
    };
    return iconMap[severity];
  }

  getIcon(severity: ToastSeverity) {
    return this.severityIcons[severity];
  }

  trackByFn(_index: number, message: ToastMessage): string {
    return message.id;
  }
}
