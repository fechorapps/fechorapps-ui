import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

/**
 * Scroll event interface
 */
export interface ScrollerScrollEvent {
  first: number;
  last: number;
}

/**
 * Scroller orientation
 */
export type ScrollerOrientation = 'vertical' | 'horizontal' | 'both';

/**
 * UiScroller Component
 *
 * A virtual scrolling component that renders only visible items.
 *
 * @example
 * ```html
 * <ui-scroller [items]="largeArray" [itemSize]="50" scrollHeight="400px">
 *   <ng-template #item let-item let-index="index">
 *     <div class="p-4">{{ item.name }}</div>
 *   </ng-template>
 * </ui-scroller>
 * ```
 */
@Component({
  selector: 'ui-scroller',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './scroller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiScrollerComponent<T = unknown> implements AfterViewInit, OnDestroy {
  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  readonly viewportRef = viewChild<ElementRef<HTMLDivElement>>('viewport');
  readonly contentRef = viewChild<ElementRef<HTMLDivElement>>('content');

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly itemTemplate = contentChild<TemplateRef<unknown>>('item');
  readonly loaderTemplate = contentChild<TemplateRef<unknown>>('loader');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Items to display */
  readonly items = input<T[]>([]);

  /** Height of each item (required for virtual scrolling) */
  readonly itemSize = input<number>(50);

  /** Scroll height */
  readonly scrollHeight = input<string>('400px');

  /** Scroll width (for horizontal scrolling) */
  readonly scrollWidth = input<string>('');

  /** Scroll orientation */
  readonly orientation = input<ScrollerOrientation>('vertical');

  /** Number of items to render before/after visible items */
  readonly numToleratedItems = input<number>(5);

  /** Enable lazy loading */
  readonly lazy = input<boolean>(false);

  /** Show loader when lazy loading */
  readonly showLoader = input<boolean>(false);

  /** Loading state */
  readonly loading = input<boolean>(false);

  /** Inline mode (no scroll container) */
  readonly inline = input<boolean>(false);

  /** Step for scrolling */
  readonly step = input<number>(0);

  /** Delay for scroll events (ms) */
  readonly delay = input<number>(0);

  /** Auto-size items */
  readonly autoSize = input<boolean>(false);

  /** Disabled state */
  readonly disabled = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when scroll position changes */
  readonly onScroll = output<ScrollerScrollEvent>();

  /** Emitted when lazy loading is needed */
  readonly onLazyLoad = output<ScrollerScrollEvent>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly scrollTop = signal<number>(0);
  readonly scrollLeft = signal<number>(0);
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly isVertical = computed(() => {
    const orient = this.orientation();
    return orient === 'vertical' || orient === 'both';
  });

  readonly isHorizontal = computed(() => {
    const orient = this.orientation();
    return orient === 'horizontal' || orient === 'both';
  });

  readonly totalContentHeight = computed(() => {
    return this.items().length * this.itemSize();
  });

  readonly totalContentWidth = computed(() => {
    if (!this.isHorizontal()) return 'auto';
    return `${this.items().length * this.itemSize()}px`;
  });

  readonly visibleRange = computed(() => {
    const scrollPos = this.isVertical() ? this.scrollTop() : this.scrollLeft();
    const itemSize = this.itemSize();
    const tolerance = this.numToleratedItems();

    const viewportSize = this.getViewportSize();
    const firstVisibleIndex = Math.floor(scrollPos / itemSize);
    const visibleCount = Math.ceil(viewportSize / itemSize);

    const first = Math.max(0, firstVisibleIndex - tolerance);
    const last = Math.min(this.items().length - 1, firstVisibleIndex + visibleCount + tolerance);

    return { first, last };
  });

  readonly visibleItems = computed(() => {
    const { first, last } = this.visibleRange();
    return this.items()
      .slice(first, last + 1)
      .map((item, index) => ({
        item,
        index: first + index,
      }));
  });

  readonly spacerStyle = computed(() => {
    const { first } = this.visibleRange();
    const offset = first * this.itemSize();

    if (this.isVertical()) {
      return { transform: `translateY(${offset}px)` };
    }
    return { transform: `translateX(${offset}px)` };
  });

  readonly contentStyle = computed(() => {
    const style: Record<string, string> = {};

    if (this.isVertical()) {
      style['height'] = `${this.totalContentHeight()}px`;
    }
    if (this.isHorizontal()) {
      style['width'] = this.totalContentWidth();
    }

    return style;
  });

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  readonly viewportClasses = computed(() => {
    const classes = ['relative', 'overflow-auto'];

    if (this.disabled()) {
      classes.push('opacity-50', 'pointer-events-none');
    }

    return classes.join(' ');
  });

  readonly viewportStyle = computed(() => {
    const style: Record<string, string> = {};

    if (this.scrollHeight()) {
      style['height'] = this.scrollHeight();
    }
    if (this.scrollWidth()) {
      style['width'] = this.scrollWidth();
    }

    return style;
  });

  readonly itemContainerClasses = computed(() => {
    const classes: string[] = [];

    if (this.orientation() === 'horizontal') {
      classes.push('flex', 'flex-row');
    }

    return classes.join(' ');
  });

  readonly itemStyle = computed(() => {
    const size = this.itemSize();

    if (this.isVertical()) {
      return { height: `${size}px` };
    }
    return { width: `${size}px` };
  });

  // =========================================================================
  // LIFECYCLE
  // =========================================================================

  ngAfterViewInit(): void {
    this.emitScrollEvent();
  }

  ngOnDestroy(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  // =========================================================================
  // METHODS
  // =========================================================================

  onViewportScroll(event: Event): void {
    const target = event.target as HTMLElement;

    if (this.delay() > 0) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.handleScroll(target);
      }, this.delay());
    } else {
      this.handleScroll(target);
    }
  }

  private handleScroll(element: HTMLElement): void {
    this.scrollTop.set(element.scrollTop);
    this.scrollLeft.set(element.scrollLeft);
    this.emitScrollEvent();
  }

  private emitScrollEvent(): void {
    const { first, last } = this.visibleRange();

    this.onScroll.emit({ first, last });

    if (this.lazy()) {
      this.onLazyLoad.emit({ first, last });
    }
  }

  scrollTo(options: ScrollToOptions): void {
    const viewport = this.viewportRef()?.nativeElement;
    if (viewport) {
      viewport.scrollTo(options);
    }
  }

  scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
    const offset = index * this.itemSize();

    this.scrollTo({
      top: this.isVertical() ? offset : undefined,
      left: this.isHorizontal() ? offset : undefined,
      behavior,
    });
  }

  private getViewportSize(): number {
    const viewport = this.viewportRef()?.nativeElement;
    if (!viewport) return 400; // Default

    return this.isVertical() ? viewport.clientHeight : viewport.clientWidth;
  }

  getItemContext(item: T, index: number) {
    return {
      $implicit: item,
      index,
      first: index === 0,
      last: index === this.items().length - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
    };
  }
}
