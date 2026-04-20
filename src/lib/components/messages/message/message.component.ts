import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { LucideAngularModule, Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-angular';

export type MessageSeverity = 'info' | 'success' | 'warn' | 'error' | 'secondary' | 'contrast';

@Component({
  selector: 'ui-message',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMessageComponent {
  // Inputs
  readonly severity = input<MessageSeverity>('info');
  readonly text = input<string>('');
  readonly closable = input<boolean>(false);
  readonly icon = input<boolean>(true);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onClose = output<void>();

  // Icons
  readonly icons = {
    info: Info,
    success: CheckCircle,
    warn: AlertTriangle,
    error: XCircle,
    secondary: Info,
    contrast: Info,
    close: X,
  };

  // Computed
  readonly containerClasses = computed(() => {
    const severity = this.severity();
    const base = ['flex', 'items-start', 'gap-3', 'p-4', 'rounded-lg', 'border'];

    const severityClasses: Record<MessageSeverity, string[]> = {
      info: [
        'bg-blue-50',
        'dark:bg-blue-950/30',
        'border-blue-200',
        'dark:border-blue-800',
        'text-blue-800',
        'dark:text-blue-200',
      ],
      success: [
        'bg-green-50',
        'dark:bg-green-950/30',
        'border-green-200',
        'dark:border-green-800',
        'text-green-800',
        'dark:text-green-200',
      ],
      warn: [
        'bg-yellow-50',
        'dark:bg-yellow-950/30',
        'border-yellow-200',
        'dark:border-yellow-800',
        'text-yellow-800',
        'dark:text-yellow-200',
      ],
      error: [
        'bg-red-50',
        'dark:bg-red-950/30',
        'border-red-200',
        'dark:border-red-800',
        'text-red-800',
        'dark:text-red-200',
      ],
      secondary: [
        'bg-gray-50',
        'dark:bg-gray-800',
        'border-gray-200',
        'dark:border-gray-700',
        'text-gray-700',
        'dark:text-gray-300',
      ],
      contrast: [
        'bg-gray-900',
        'dark:bg-gray-100',
        'border-gray-900',
        'dark:border-gray-100',
        'text-white',
        'dark:text-gray-900',
      ],
    };

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return [...base, ...severityClasses[severity]].join(' ');
  });

  readonly iconClasses = computed(() => {
    const severity = this.severity();
    const base = ['shrink-0', 'mt-0.5'];

    const colorClasses: Record<MessageSeverity, string> = {
      info: 'text-blue-500',
      success: 'text-green-500',
      warn: 'text-yellow-500',
      error: 'text-red-500',
      secondary: 'text-gray-500',
      contrast: 'text-white dark:text-gray-900',
    };

    return [...base, colorClasses[severity]].join(' ');
  });

  readonly currentIcon = computed(() => {
    return this.icons[this.severity()];
  });

  close(): void {
    this.onClose.emit();
  }
}
