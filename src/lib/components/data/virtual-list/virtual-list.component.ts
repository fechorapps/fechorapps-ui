import { Component, ChangeDetectionStrategy, input, signal, computed } from '@angular/core';

export interface VirtualListItem { [key: string]: unknown; }

@Component({
  selector: 'ui-virtual-list',
  standalone: true,
  imports: [],
  templateUrl: './virtual-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiVirtualListComponent {
  readonly items = input<VirtualListItem[]>([]);
  readonly itemHeight = input<number>(48);
  readonly containerHeight = input<number>(400);
  readonly overscan = input<number>(3);
  readonly trackBy = input<string>('id');
  readonly labelField = input<string>('label');

  readonly scrollTop = signal<number>(0);

  readonly totalHeight = computed(() => this.items().length * this.itemHeight());

  readonly startIndex = computed(() =>
    Math.max(0, Math.floor(this.scrollTop() / this.itemHeight()) - this.overscan())
  );

  readonly endIndex = computed(() =>
    Math.min(
      this.items().length,
      Math.ceil((this.scrollTop() + this.containerHeight()) / this.itemHeight()) + this.overscan()
    )
  );

  readonly visibleItems = computed(() =>
    this.items()
      .slice(this.startIndex(), this.endIndex())
      .map((item, i) => ({ item, index: this.startIndex() + i }))
  );

  readonly offsetTop = computed(() => this.startIndex() * this.itemHeight());

  onScroll(e: Event): void {
    this.scrollTop.set((e.target as HTMLElement).scrollTop);
  }

  getLabel(item: VirtualListItem): string {
    return String(item[this.labelField()] ?? JSON.stringify(item).slice(0, 50));
  }
}
