import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { LucideAngularModule, ZoomIn, ZoomOut, RotateCw, X, Download } from 'lucide-angular';

@Component({
  selector: 'ui-image',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiImageComponent {
  // Inputs
  readonly src = input.required<string>();
  readonly alt = input<string>('');
  readonly width = input<string>('');
  readonly height = input<string>('');
  readonly preview = input<boolean>(false);
  readonly previewWidth = input<string>('');
  readonly imageClass = input<string>('');
  readonly imageStyle = input<Record<string, string>>({});
  readonly containerClass = input<string>('');

  // Outputs
  readonly onShow = output<void>();
  readonly onHide = output<void>();
  readonly onError = output<Event>();

  // Icons
  readonly zoomInIcon = ZoomIn;
  readonly zoomOutIcon = ZoomOut;
  readonly rotateIcon = RotateCw;
  readonly closeIcon = X;
  readonly downloadIcon = Download;

  // State
  readonly previewVisible = signal<boolean>(false);
  readonly rotation = signal<number>(0);
  readonly scale = signal<number>(1);
  readonly isLoading = signal<boolean>(true);
  readonly hasError = signal<boolean>(false);

  private readonly MIN_SCALE = 0.5;
  private readonly MAX_SCALE = 4;
  private readonly SCALE_STEP = 0.5;

  // Computed
  readonly containerClasses = computed(() => {
    const base = ['inline-block', 'relative'];
    if (this.containerClass()) {
      base.push(this.containerClass());
    }
    return base.join(' ');
  });

  readonly imageClasses = computed(() => {
    const base = ['max-w-full', 'h-auto'];
    if (this.preview()) {
      base.push('cursor-pointer', 'hover:opacity-90', 'transition-opacity');
    }
    if (this.imageClass()) {
      base.push(this.imageClass());
    }
    return base.join(' ');
  });

  readonly previewTransform = computed(() => {
    return `rotate(${this.rotation()}deg) scale(${this.scale()})`;
  });

  readonly previewImageStyle = computed(() => {
    const style: Record<string, string> = {
      transform: this.previewTransform(),
      transition: 'transform 0.2s ease-in-out',
    };
    if (this.previewWidth()) {
      style['maxWidth'] = this.previewWidth();
    }
    return style;
  });

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.previewVisible()) {
      this.hidePreview();
    }
  }

  showPreview(): void {
    if (!this.preview()) return;
    this.previewVisible.set(true);
    this.rotation.set(0);
    this.scale.set(1);
    this.onShow.emit();
    document.body.style.overflow = 'hidden';
  }

  hidePreview(): void {
    this.previewVisible.set(false);
    this.onHide.emit();
    document.body.style.overflow = '';
  }

  zoomIn(): void {
    const current = this.scale();
    if (current < this.MAX_SCALE) {
      this.scale.set(Math.min(current + this.SCALE_STEP, this.MAX_SCALE));
    }
  }

  zoomOut(): void {
    const current = this.scale();
    if (current > this.MIN_SCALE) {
      this.scale.set(Math.max(current - this.SCALE_STEP, this.MIN_SCALE));
    }
  }

  rotateRight(): void {
    this.rotation.update((r) => (r + 90) % 360);
  }

  download(): void {
    const link = document.createElement('a');
    link.href = this.src();
    link.download = this.alt() || 'image';
    link.click();
  }

  onImageLoad(): void {
    this.isLoading.set(false);
    this.hasError.set(false);
  }

  onImageError(event: Event): void {
    this.isLoading.set(false);
    this.hasError.set(true);
    this.onError.emit(event);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('preview-backdrop')) {
      this.hidePreview();
    }
  }
}
