import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
  inject,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'ui-resizable-panels',
  standalone: true,
  imports: [],
  templateUrl: './resizable-panels.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiResizablePanelsComponent {
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly initialSizes = input<[number, number]>([50, 50]);
  readonly minSizes = input<[number, number]>([10, 10]);
  readonly gutterSize = input<number>(6);

  readonly sizesChange = output<[number, number]>();

  sizes = signal<[number, number]>([50, 50]);
  isDragging = signal<boolean>(false);
  hostEl = inject(ElementRef);

  constructor() {
    effect(() => {
      this.sizes.set([...this.initialSizes()] as [number, number]);
    });
  }

  onGutterPointerDown(e: PointerEvent): void {
    e.preventDefault();
    this.isDragging.set(true);
    const host = this.hostEl.nativeElement as HTMLElement;
    const rect = host.getBoundingClientRect();
    const isH = this.direction() === 'horizontal';
    const totalSize = isH ? rect.width : rect.height;
    const [minA, minB] = this.minSizes();

    const onMove = (me: PointerEvent) => {
      const pos = isH ? me.clientX - rect.left : me.clientY - rect.top;
      let pct = (pos / totalSize) * 100;
      pct = Math.max(minA, Math.min(100 - minB, pct));
      this.sizes.set([pct, 100 - pct]);
      this.sizesChange.emit([pct, 100 - pct]);
    };

    const onUp = () => {
      this.isDragging.set(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  onGutterDblClick(): void {
    this.sizes.set([...this.initialSizes()] as [number, number]);
    this.sizesChange.emit([...this.initialSizes()] as [number, number]);
  }
}
