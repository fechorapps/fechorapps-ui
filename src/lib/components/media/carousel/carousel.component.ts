import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  effect,
  OnDestroy,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface CarouselPageEvent {
  page: number;
}

@Component({
  selector: 'ui-carousel',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCarouselComponent<T> implements OnDestroy {
  // Inputs
  readonly value = input<T[]>([]);
  readonly numVisible = input<number>(3);
  readonly numScroll = input<number>(1);
  readonly page = input<number>(0);
  readonly circular = input<boolean>(false);
  readonly autoplayInterval = input<number>(0);
  readonly showIndicators = input<boolean>(true);
  readonly showNavigators = input<boolean>(true);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onPage = output<CarouselPageEvent>();

  // State
  readonly currentPage = signal<number>(0);
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      this.currentPage.set(this.page());
    });

    effect(() => {
      this.setupAutoplay();
    });
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }

  private setupAutoplay(): void {
    this.clearAutoplay();
    const interval = this.autoplayInterval();
    if (interval > 0) {
      this.autoplayTimer = setInterval(() => {
        this.next();
      }, interval);
    }
  }

  private clearAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  readonly totalPages = computed(() => {
    const items = this.value();
    const visible = this.numVisible();
    const scroll = this.numScroll();
    return Math.ceil((items.length - visible) / scroll) + 1;
  });

  readonly visibleItems = computed(() => {
    const items = this.value();
    const page = this.currentPage();
    const visible = this.numVisible();
    const scroll = this.numScroll();
    const start = page * scroll;
    return items.slice(start, start + visible);
  });

  readonly canGoPrev = computed(() => {
    return this.circular() || this.currentPage() > 0;
  });

  readonly canGoNext = computed(() => {
    return this.circular() || this.currentPage() < this.totalPages() - 1;
  });

  prev(): void {
    const page = this.currentPage();
    if (page > 0) {
      this.setPage(page - 1);
    } else if (this.circular()) {
      this.setPage(this.totalPages() - 1);
    }
  }

  next(): void {
    const page = this.currentPage();
    if (page < this.totalPages() - 1) {
      this.setPage(page + 1);
    } else if (this.circular()) {
      this.setPage(0);
    }
  }

  setPage(page: number): void {
    this.currentPage.set(page);
    this.onPage.emit({ page });
  }

  getItemClass(): string {
    const visible = this.numVisible();
    return `flex-shrink-0 w-[${100 / visible}%]`;
  }

  readonly containerClasses = computed(() => {
    const base = ['relative overflow-hidden'];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });
}
