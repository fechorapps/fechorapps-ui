import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  signal,
  contentChild,
  TemplateRef,
  effect,
  ElementRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, Maximize2, Minimize2 } from 'lucide-angular';

export type DialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDialogComponent {
  // Icons
  readonly closeIcon = X;
  readonly maximizeIcon = Maximize2;
  readonly minimizeIcon = Minimize2;

  // Inputs
  readonly visible = model<boolean>(false);
  readonly header = input<string>('');
  readonly draggable = input<boolean>(false);
  readonly resizable = input<boolean>(false);
  readonly modal = input<boolean>(true);
  readonly closable = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly dismissableMask = input<boolean>(false);
  readonly maximizable = input<boolean>(false);
  readonly position = input<DialogPosition>('center');
  readonly blockScroll = input<boolean>(true);
  readonly width = input<string>('50vw');
  readonly minWidth = input<string>('150px');
  readonly height = input<string>('auto');
  readonly minHeight = input<string>('auto');
  readonly styleClass = input<string>('');

  // Outputs
  readonly onShow = output<void>();
  readonly onHide = output<void>();
  readonly onMaximize = output<{ maximized: boolean }>();

  // Content projections
  readonly headerTemplate = contentChild<TemplateRef<unknown>>('header');
  readonly footerTemplate = contentChild<TemplateRef<unknown>>('footer');

  // View children
  readonly dialogContent = viewChild<ElementRef>('dialogContent');

  // Internal state
  readonly isMaximized = signal<boolean>(false);
  readonly isDragging = signal<boolean>(false);
  readonly dragPosition = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  // Computed styles
  readonly overlayClasses = computed(() => {
    const base = 'fixed inset-0 z-50 flex transition-opacity duration-200';
    const position = this.positionClasses();
    const visibility = this.visible()
      ? 'opacity-100 pointer-events-auto'
      : 'opacity-0 pointer-events-none';

    return `${base} ${position} ${visibility}`;
  });

  readonly positionClasses = computed(() => {
    const positionMap: Record<DialogPosition, string> = {
      center: 'items-center justify-center',
      top: 'items-start justify-center pt-12',
      bottom: 'items-end justify-center pb-12',
      left: 'items-center justify-start pl-12',
      right: 'items-center justify-end pr-12',
      'top-left': 'items-start justify-start pt-12 pl-12',
      'top-right': 'items-start justify-end pt-12 pr-12',
      'bottom-left': 'items-end justify-start pb-12 pl-12',
      'bottom-right': 'items-end justify-end pb-12 pr-12',
    };
    return positionMap[this.position()];
  });

  readonly backdropClasses = computed(() => {
    const base = 'absolute inset-0 transition-opacity duration-200';
    const modal = this.modal() ? 'bg-black/50 dark:bg-black/70' : '';
    const visibility = this.visible() ? 'opacity-100' : 'opacity-0';

    return `${base} ${modal} ${visibility}`;
  });

  readonly dialogClasses = computed(() => {
    const base = [
      'relative bg-white dark:bg-gray-900',
      'rounded-lg shadow-2xl',
      'flex flex-col',
      'transform transition-all duration-200',
      this.styleClass(),
    ];

    if (this.visible()) {
      base.push('scale-100 opacity-100');
    } else {
      base.push('scale-95 opacity-0');
    }

    if (this.isMaximized()) {
      base.push('!w-screen !h-screen !max-w-none !max-h-none !rounded-none');
    }

    if (this.resizable() && !this.isMaximized()) {
      base.push('resize overflow-auto');
    }

    return base.join(' ');
  });

  readonly dialogStyles = computed(() => {
    if (this.isMaximized()) {
      return {};
    }

    const styles: Record<string, string> = {
      width: this.width(),
      minWidth: this.minWidth(),
      height: this.height(),
      minHeight: this.minHeight(),
    };

    if (this.draggable() && (this.dragPosition().x !== 0 || this.dragPosition().y !== 0)) {
      styles['transform'] = `translate(${this.dragPosition().x}px, ${this.dragPosition().y}px)`;
    }

    return styles;
  });

  constructor() {
    // Handle escape key
    effect(() => {
      if (this.visible() && this.closeOnEscape()) {
        const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            this.close();
          }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
      return;
    });

    // Handle body scroll
    effect(() => {
      if (this.visible() && this.blockScroll()) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
      return;
    });

    // Emit show/hide events
    effect(() => {
      if (this.visible()) {
        this.onShow.emit();
      }
    });
  }

  close(): void {
    this.visible.set(false);
    this.onHide.emit();
  }

  onMaskClick(event: MouseEvent): void {
    if (this.dismissableMask() && event.target === event.currentTarget) {
      this.close();
    }
  }

  toggleMaximize(): void {
    this.isMaximized.update((v) => !v);
    this.onMaximize.emit({ maximized: this.isMaximized() });
  }

  onDragStart(event: MouseEvent): void {
    if (!this.draggable() || this.isMaximized()) return;

    this.isDragging.set(true);
    const startX = event.clientX - this.dragPosition().x;
    const startY = event.clientY - this.dragPosition().y;

    const onMouseMove = (e: MouseEvent) => {
      this.dragPosition.set({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const onMouseUp = () => {
      this.isDragging.set(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
