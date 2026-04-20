import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface GalleriaImage {
  src: string;
  alt?: string;
  title?: string;
  thumbnailSrc?: string;
}

export interface GalleriaActiveIndexChangeEvent {
  index: number;
}

@Component({
  selector: 'ui-galleria',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './galleria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiGalleriaComponent {
  // Inputs
  readonly value = input<GalleriaImage[]>([]);
  readonly activeIndex = input<number>(0);
  readonly showThumbnails = input<boolean>(true);
  readonly showIndicators = input<boolean>(false);
  readonly showNavigators = input<boolean>(true);
  readonly showCaption = input<boolean>(false);
  readonly circular = input<boolean>(false);
  readonly fullScreen = input<boolean>(false);
  readonly thumbnailsPosition = input<'top' | 'bottom' | 'left' | 'right'>('bottom');
  readonly numVisible = input<number>(5);
  readonly styleClass = input<string>('');

  // Outputs
  readonly activeIndexChange = output<GalleriaActiveIndexChangeEvent>();
  readonly onFullScreenChange = output<boolean>();

  // State
  readonly currentIndex = signal<number>(0);
  readonly isFullScreen = signal<boolean>(false);

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.isFullScreen()) {
      switch (event.key) {
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
        case 'Escape':
          this.closeFullScreen();
          break;
      }
    }
  }

  readonly currentImage = computed(() => {
    const images = this.value();
    const index = this.currentIndex();
    return images[index] || null;
  });

  readonly canGoPrev = computed(() => {
    return this.circular() || this.currentIndex() > 0;
  });

  readonly canGoNext = computed(() => {
    return this.circular() || this.currentIndex() < this.value().length - 1;
  });

  readonly visibleThumbnails = computed(() => {
    const images = this.value();
    const current = this.currentIndex();
    const visible = this.numVisible();
    const half = Math.floor(visible / 2);

    let start = Math.max(0, current - half);
    const end = Math.min(images.length, start + visible);

    if (end - start < visible) {
      start = Math.max(0, end - visible);
    }

    return images.slice(start, end).map((img, i) => ({
      ...img,
      originalIndex: start + i,
    }));
  });

  prev(): void {
    const index = this.currentIndex();
    if (index > 0) {
      this.setActiveIndex(index - 1);
    } else if (this.circular()) {
      this.setActiveIndex(this.value().length - 1);
    }
  }

  next(): void {
    const index = this.currentIndex();
    if (index < this.value().length - 1) {
      this.setActiveIndex(index + 1);
    } else if (this.circular()) {
      this.setActiveIndex(0);
    }
  }

  setActiveIndex(index: number): void {
    this.currentIndex.set(index);
    this.activeIndexChange.emit({ index });
  }

  openFullScreen(): void {
    this.isFullScreen.set(true);
    this.onFullScreenChange.emit(true);
  }

  closeFullScreen(): void {
    this.isFullScreen.set(false);
    this.onFullScreenChange.emit(false);
  }

  getThumbnailSrc(image: GalleriaImage): string {
    return image.thumbnailSrc || image.src;
  }

  readonly containerClasses = computed(() => {
    const base = ['relative'];
    const pos = this.thumbnailsPosition();

    if (pos === 'left' || pos === 'right') {
      base.push('flex');
      if (pos === 'left') {
        base.push('flex-row-reverse');
      }
    }

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });

  readonly thumbnailsClasses = computed(() => {
    const pos = this.thumbnailsPosition();
    const base = ['flex gap-2 p-2'];

    if (pos === 'top' || pos === 'bottom') {
      base.push('justify-center');
      if (pos === 'top') {
        base.push('order-first');
      }
    } else {
      base.push('flex-col');
    }

    return base.join(' ');
  });
}
