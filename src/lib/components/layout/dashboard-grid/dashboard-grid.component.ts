import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  OnDestroy,
  TemplateRef,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LucideAngularModule, GripHorizontal } from 'lucide-angular';

export interface GridItem {
  id: string;
  label?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
}

/**
 * UiDashboardGridComponent
 *
 * A draggable, compactable grid layout for dashboard widgets.
 * Supports HTML5 drag-and-drop to reposition items.
 *
 * @example
 * ```html
 * <ui-dashboard-grid [(items)]="widgets" [columns]="12" [editable]="true">
 *   <ng-template #cell let-item>
 *     <div>{{ item.id }}</div>
 *   </ng-template>
 * </ui-dashboard-grid>
 * ```
 */
@Component({
  selector: 'ui-dashboard-grid',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet],
  templateUrl: './dashboard-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardGridComponent implements OnDestroy {
  readonly icons = { GripHorizontal };

  @ContentChild('cell', { read: TemplateRef })
  cellTemplate?: TemplateRef<{ $implicit: GridItem }>;

  // ─── Inputs ───────────────────────────────────────────────────────────────
  items = model<GridItem[]>([]);
  readonly columns = input<number>(12);
  readonly rowHeight = input<number>(80);
  readonly gap = input<number>(16);
  readonly editable = input<boolean>(true);
  readonly compact = input<boolean>(true);
  // Below this container width, items stack into a single full-width column
  // in document order instead of using their x/y/w grid coordinates. A fixed
  // `columns()` count sized for desktop (e.g. 12) has no way to reflow itself
  // on a narrow viewport — three 4-wide cards side by side simply do not fit
  // in 360px, regardless of how correctly `cellWidth` is computed.
  readonly mobileBreakpoint = input<number>(640);

  // ─── Outputs ──────────────────────────────────────────────────────────────
  readonly layoutChange = output<GridItem[]>();

  // ─── Internal state ───────────────────────────────────────────────────────
  containerWidth = signal<number>(960);
  hostEl = inject(ElementRef);
  private resizeObserver?: ResizeObserver;

  // ─── Computed ─────────────────────────────────────────────────────────────
  cellWidth = computed(() => this.containerWidth() / this.columns());
  isMobile = computed(() => this.containerWidth() < this.mobileBreakpoint());

  gridHeight = computed(() => {
    const its = this.items();
    if (its.length && this.isMobile()) {
      const rh = this.rowHeight();
      const g = this.gap();
      return its.reduce((total, i) => total + i.h * rh + g, 0);
    }
    const maxY = its.length ? Math.max(...its.map(i => i.y + i.h)) : 0;
    return maxY * this.rowHeight() + this.gap();
  });

  constructor() {
    afterNextRender(() => {
      const el = this.hostEl.nativeElement as HTMLElement;
      this.containerWidth.set(el.offsetWidth || 960);
      // Keeps `containerWidth` (and therefore `cellWidth`/`isMobile`) in sync
      // with the element's actual rendered width — sidebar collapse/expand,
      // window resize, and device rotation all change this without a reload.
      // Guarded: not every test/SSR environment implements ResizeObserver.
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(entries => {
          const width = entries[0]?.contentRect.width;
          if (width) this.containerWidth.set(width);
        });
        this.resizeObserver.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  // ─── Style computation ────────────────────────────────────────────────────
  itemStyle(item: GridItem): Record<string, string> {
    const rh = this.rowHeight();
    const g = this.gap();

    if (this.isMobile()) {
      const its = this.items();
      const index = its.findIndex(i => i.id === item.id);
      const top = its.slice(0, Math.max(0, index)).reduce((t, i) => t + i.h * rh + g, 0);
      return {
        position: 'absolute',
        left: '0px',
        top: `${top}px`,
        width: '100%',
        height: `${item.h * rh - g}px`,
        transition: 'top 0.2s',
      };
    }

    const cw = this.cellWidth();
    return {
      position: 'absolute',
      left: `${item.x * cw + (item.x > 0 ? g : 0)}px`,
      top: `${item.y * rh + (item.y > 0 ? g : 0)}px`,
      width: `${item.w * cw - g}px`,
      height: `${item.h * rh - g}px`,
      transition: 'left 0.2s, top 0.2s',
    };
  }

  // ─── Drag handlers ────────────────────────────────────────────────────────
  onItemDragStart(e: DragEvent, item: GridItem): void {
    // Reordering by absolute pixel drop position has no meaningful mapping
    // once items are stacked in document order (mobile) — HTML5 drag-and-drop
    // on touch devices is unreliable regardless, so this is a deliberate
    // scope cut, not an oversight.
    if (!this.editable() || this.isMobile() || item.static) {
      e.preventDefault();
      return;
    }
    e.dataTransfer?.setData('itemId', item.id);
  }

  onGridDragOver(e: DragEvent): void {
    e.preventDefault();
  }

  onGridDrop(e: DragEvent): void {
    e.preventDefault();
    const id = e.dataTransfer?.getData('itemId');
    if (!id) return;
    const dragged = this.items().find(i => i.id === id);
    if (!dragged) return;
    const rect = (this.hostEl.nativeElement as HTMLElement).getBoundingClientRect();
    const maxX = Math.max(0, this.columns() - dragged.w);
    const x = Math.min(maxX, Math.max(0, Math.floor((e.clientX - rect.left) / this.cellWidth())));
    const y = Math.max(0, Math.floor((e.clientY - rect.top) / this.rowHeight()));
    this.items.update(its => its.map(i => (i.id === id ? { ...i, x, y } : i)));
    if (this.compact()) this.runCompact();
    this.layoutChange.emit(this.items());
  }

  // ─── Compaction ───────────────────────────────────────────────────────────
  private runCompact(): void {
    const its = [...this.items()].sort((a, b) => a.y - b.y || a.x - b.x);
    const placed: GridItem[] = [];
    for (const item of its) {
      let y = 0;
      while (this.collides(placed, { ...item, y })) y++;
      placed.push({ ...item, y });
    }
    this.items.set(placed);
  }

  private collides(placed: GridItem[], item: GridItem): boolean {
    return placed.some(
      p =>
        p.id !== item.id &&
        p.x < item.x + item.w &&
        p.x + p.w > item.x &&
        p.y < item.y + item.h &&
        p.y + p.h > item.y
    );
  }

  // ─── Public access for tests ──────────────────────────────────────────────
  testCollides(placed: GridItem[], item: GridItem): boolean {
    return this.collides(placed, item);
  }

  testRunCompact(): void {
    this.runCompact();
  }
}
