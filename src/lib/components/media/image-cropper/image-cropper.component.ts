import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  viewChild,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Crop, Check, X } from 'lucide-angular';

@Component({
  selector: 'ui-image-cropper',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './image-cropper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiImageCropperComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly src = input<string>('');
  readonly aspectRatio = input<number | undefined>(undefined);
  readonly outputWidth = input<number>(300);
  readonly outputHeight = input<number>(300);
  readonly quality = input<number>(0.9);

  readonly cropped = output<string>();
  readonly cancelled = output<void>();

  readonly cropX = signal<number>(20);
  readonly cropY = signal<number>(20);
  readonly cropW = signal<number>(150);
  readonly cropH = signal<number>(150);
  readonly imageLoaded = signal<boolean>(false);
  readonly isDragging = signal<boolean>(false);

  private dragStart: { mx: number; my: number; cx: number; cy: number } | null = null;

  readonly cropIcon = Crop;
  readonly checkIcon = Check;
  readonly xIcon = X;

  readonly containerRef = viewChild<ElementRef<HTMLDivElement>>('container');
  readonly imgElRef = viewChild<ElementRef<HTMLImageElement>>('imgEl');

  onImageLoad(): void {
    this.imageLoaded.set(true);
    const img = this.imgElRef()?.nativeElement;
    if (img) {
      const w = Math.min(150, img.offsetWidth - 40);
      const ratio = this.aspectRatio();
      const h = ratio ? w / ratio : Math.min(150, img.offsetHeight - 40);
      this.cropW.set(w);
      this.cropH.set(h);
    }
  }

  startDrag(e: MouseEvent): void {
    e.preventDefault();
    this.isDragging.set(true);
    this.dragStart = { mx: e.clientX, my: e.clientY, cx: this.cropX(), cy: this.cropY() };
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isDragging() || !this.dragStart) return;
    const dx = e.clientX - this.dragStart.mx;
    const dy = e.clientY - this.dragStart.my;
    const container = this.containerRef()?.nativeElement;
    const maxX = container ? container.offsetWidth - this.cropW() : 500;
    const maxY = container ? container.offsetHeight - this.cropH() : 500;
    this.cropX.set(Math.max(0, Math.min(maxX, this.dragStart.cx + dx)));
    this.cropY.set(Math.max(0, Math.min(maxY, this.dragStart.cy + dy)));
  }

  stopDrag(): void {
    this.isDragging.set(false);
    this.dragStart = null;
  }

  crop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const img = this.imgElRef()?.nativeElement;
    if (!img) return;
    const scaleX = img.naturalWidth / img.offsetWidth;
    const scaleY = img.naturalHeight / img.offsetHeight;
    const canvas = document.createElement('canvas');
    canvas.width = this.outputWidth();
    canvas.height = this.outputHeight();
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
      img,
      this.cropX() * scaleX,
      this.cropY() * scaleY,
      this.cropW() * scaleX,
      this.cropH() * scaleY,
      0,
      0,
      this.outputWidth(),
      this.outputHeight(),
    );
    this.cropped.emit(canvas.toDataURL('image/jpeg', this.quality()));
  }
}
