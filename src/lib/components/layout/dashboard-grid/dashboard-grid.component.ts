import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { LucideAngularModule, GripHorizontal } from 'lucide-angular';

export interface GridItem {
  id: string;
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
  imports: [LucideAngularModule],
  templateUrl: './dashboard-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardGridComponent {
  readonly icons = { GripHorizontal };

  // ─── Inputs ───────────────────────────────────────────────────────────────
  items = model<GridItem[]>([]);
  readonly columns = input<number>(12);
  readonly rowHeight = input<number>(80);
  readonly gap = input<number>(16);
  readonly editable = input<boolean>(true);
  readonly compact = input<boolean>(true);

  // ─── Outputs ──────────────────────────────────────────────────────────────
  readonly layoutChange = output<GridItem[]>();

  // ─── Internal state ───────────────────────────────────────────────────────
  containerWidth = signal<number>(960);
  hostEl = inject(ElementRef);

  // ─── Computed ─────────────────────────────────────────────────────────────
  cellWidth = computed(() => this.containerWidth() / this.columns());

  gridHeight = computed(() => {
    const its = this.items();
    const maxY = its.length ? Math.max(...its.map(i => i.y + i.h)) : 0;
    return maxY * this.rowHeight() + this.gap();
  });

  constructor() {
    afterNextRender(() => {
      const el = this.hostEl.nativeElement as HTMLElement;
      this.containerWidth.set(el.offsetWidth || 960);
    });
  }

  // ─── Style computation ────────────────────────────────────────────────────
  itemStyle(item: GridItem): Record<string, string> {
    const cw = this.cellWidth();
    const rh = this.rowHeight();
    const g = this.gap();
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
    if (!this.editable() || item.static) {
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
    const rect = (this.hostEl.nativeElement as HTMLElement).getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / this.cellWidth());
    const y = Math.floor((e.clientY - rect.top) / this.rowHeight());
    this.items.update(its =>
      its.map(i => (i.id === id ? { ...i, x: Math.max(0, x), y: Math.max(0, y) } : i))
    );
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
