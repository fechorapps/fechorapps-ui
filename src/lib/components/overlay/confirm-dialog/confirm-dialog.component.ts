import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  Injectable,
  signal,
} from '@angular/core';

import {
  LucideAngularModule,
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
} from 'lucide-angular';

export type ConfirmDialogSeverity = 'info' | 'success' | 'warning' | 'danger' | 'help';

export interface ConfirmDialogConfig {
  header?: string;
  message: string;
  severity?: ConfirmDialogSeverity;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptIcon?: string;
  rejectIcon?: string;
  acceptClass?: string;
  rejectClass?: string;
  closable?: boolean;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
}

export interface ConfirmDialogResult {
  accepted: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private _config = signal<ConfirmDialogConfig | null>(null);
  private _visible = signal<boolean>(false);
  private _resolver: ((result: ConfirmDialogResult) => void) | null = null;

  readonly config = this._config.asReadonly();
  readonly visible = this._visible.asReadonly();

  confirm(config: ConfirmDialogConfig): Promise<ConfirmDialogResult> {
    this._config.set(config);
    this._visible.set(true);

    return new Promise((resolve) => {
      this._resolver = resolve;
    });
  }

  accept(): void {
    this._visible.set(false);
    this._resolver?.({ accepted: true });
    this._resolver = null;
  }

  reject(): void {
    this._visible.set(false);
    this._resolver?.({ accepted: false });
    this._resolver = null;
  }

  close(): void {
    this.reject();
  }
}

@Component({
  selector: 'ui-confirm-dialog',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiConfirmDialogComponent {
  // Icons
  readonly closeIcon = X;

  readonly severityIcons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    danger: XCircle,
    help: HelpCircle,
  };

  // Inputs for standalone usage
  readonly visible = model<boolean>(false);
  readonly header = input<string>('Confirmation');
  readonly message = input<string>('Are you sure you want to proceed?');
  readonly severity = input<ConfirmDialogSeverity>('warning');
  readonly acceptLabel = input<string>('Yes');
  readonly rejectLabel = input<string>('No');
  readonly acceptClass = input<string>('');
  readonly rejectClass = input<string>('');
  readonly closable = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly dismissableMask = input<boolean>(false);

  // Outputs
  readonly onAccept = output<void>();
  readonly onReject = output<void>();

  // Computed
  readonly severityIcon = computed(() => this.severityIcons[this.severity()]);

  readonly severityClasses = computed(() => {
    const severityMap: Record<ConfirmDialogSeverity, string> = {
      info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      danger: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      help: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return severityMap[this.severity()];
  });

  readonly acceptButtonClasses = computed(() => {
    if (this.acceptClass()) return this.acceptClass();

    const severityMap: Record<ConfirmDialogSeverity, string> = {
      info: 'bg-blue-500 hover:bg-blue-600 text-white',
      success: 'bg-green-500 hover:bg-green-600 text-white',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
      help: 'bg-purple-500 hover:bg-purple-600 text-white',
    };
    return `px-4 py-2 rounded-lg font-medium transition-colors ${severityMap[this.severity()]}`;
  });

  readonly rejectButtonClasses = computed(() => {
    if (this.rejectClass()) return this.rejectClass();
    return 'px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors';
  });

  constructor() {
    // Handle escape key
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.visible() && this.closeOnEscape()) {
          this.reject();
        }
      });
    }
  }

  accept(): void {
    this.visible.set(false);
    this.onAccept.emit();
  }

  reject(): void {
    this.visible.set(false);
    this.onReject.emit();
  }

  onMaskClick(event: MouseEvent): void {
    if (this.dismissableMask() && event.target === event.currentTarget) {
      this.reject();
    }
  }
}
