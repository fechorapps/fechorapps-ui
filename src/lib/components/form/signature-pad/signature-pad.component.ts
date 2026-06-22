import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  viewChild,
  ElementRef,
  effect,
  PLATFORM_ID,
  inject,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Trash2, Download } from 'lucide-angular';

@Component({
  selector: 'ui-signature-pad',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './signature-pad.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSignaturePadComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private ctx: CanvasRenderingContext2D | null = null;
  private lastX = 0;
  private lastY = 0;

  readonly width = input<number>(400);
  readonly height = input<number>(200);
  readonly penColor = input<string>('#000000');
  readonly penWidth = input<number>(2);
  readonly backgroundColor = input<string>('#ffffff');
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('Sign here');

  readonly signed = output<string>();
  readonly cleared = output<void>();

  readonly isEmpty = signal<boolean>(true);
  readonly isDrawing = signal<boolean>(false);

  protected readonly trashIcon = Trash2;
  protected readonly downloadIcon = Download;

  constructor() {
    effect(() => {
      const canvas = this.canvasRef()?.nativeElement;
      if (canvas && isPlatformBrowser(this.platformId)) {
        this.ctx = canvas.getContext('2d');
        this.fillBackground();
      }
    });
  }

  private fillBackground(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas || !this.ctx) return;
    this.ctx.fillStyle = this.backgroundColor();
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  getPos(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  startDrawing(e: MouseEvent | TouchEvent): void {
    if (this.disabled()) return;
    e.preventDefault();
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const pos = this.getPos(e, canvas);
    this.lastX = pos.x;
    this.lastY = pos.y;
    this.isDrawing.set(true);
  }

  draw(e: MouseEvent | TouchEvent): void {
    if (!this.isDrawing() || !this.ctx || this.disabled()) return;
    e.preventDefault();
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const pos = this.getPos(e, canvas);
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.strokeStyle = this.penColor();
    this.ctx.lineWidth = this.penWidth();
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();
    this.lastX = pos.x;
    this.lastY = pos.y;
    this.isEmpty.set(false);
  }

  stopDrawing(): void {
    if (!this.isDrawing()) return;
    this.isDrawing.set(false);
    const canvas = this.canvasRef()?.nativeElement;
    if (canvas) this.signed.emit(canvas.toDataURL('image/png'));
  }

  clear(): void {
    this.fillBackground();
    this.isEmpty.set(true);
    this.cleared.emit();
  }

  download(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas || this.isEmpty()) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'signature.png';
    a.click();
  }

  ngOnDestroy(): void {}
}
