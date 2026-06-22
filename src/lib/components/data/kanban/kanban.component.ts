import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  items: KanbanItem[];
}

export interface KanbanMoveEvent {
  itemId: string;
  fromColumnId: string;
  toColumnId: string;
  newIndex: number;
}

@Component({
  selector: 'ui-kanban',
  standalone: true,
  imports: [],
  templateUrl: './kanban.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiKanbanComponent {
  readonly columns = input<KanbanColumn[]>([]);
  readonly draggable = input<boolean>(true);

  readonly itemMoved = output<KanbanMoveEvent>();
  readonly itemClicked = output<KanbanItem>();

  readonly draggedItemId = signal<string | null>(null);
  readonly dragSourceColId = signal<string | null>(null);

  onDragStart(item: KanbanItem, colId: string): void {
    this.draggedItemId.set(item.id);
    this.dragSourceColId.set(colId);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetColId: string, targetIndex: number): void {
    event.preventDefault();
    const itemId = this.draggedItemId();
    const sourceColId = this.dragSourceColId();
    if (!itemId || !sourceColId) return;
    this.itemMoved.emit({ itemId, fromColumnId: sourceColId, toColumnId: targetColId, newIndex: targetIndex });
    this.draggedItemId.set(null);
    this.dragSourceColId.set(null);
  }
}
