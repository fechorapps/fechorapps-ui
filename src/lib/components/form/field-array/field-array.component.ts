import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { GripVertical, LucideAngularModule, Trash2 } from 'lucide-angular';
import type { DynamicField } from '../dynamic-form';

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * UiFieldArrayComponent — an editable list of rows driven by a schema.
 *
 * Each row renders one input per schema column. Rows can be added, removed,
 * and optionally reordered via HTML5 drag-and-drop.
 *
 * @example
 * ```html
 * <ui-field-array [schema]="schema" [(value)]="rows" />
 * ```
 */
@Component({
  selector: 'ui-field-array',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './field-array.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiFieldArrayComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly gripVerticalIcon = GripVertical;
  protected readonly trash2Icon = Trash2;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Column schema that defines the fields in each row (required) */
  readonly schema = input.required<DynamicField[]>();

  /** Minimum number of rows — remove is disabled when at this count */
  readonly minItems = input<number>(0);

  /** Maximum number of rows — add is disabled when at this count (null = unlimited) */
  readonly maxItems = input<number | null>(null);

  /** Label for the "add row" button */
  readonly addLabel = input<string>('Add item');

  /** Whether rows can be drag-reordered */
  readonly sortable = input<boolean>(false);

  /** Whether the entire component is disabled */
  readonly disabled = input<boolean>(false);

  // =========================================================================
  // MODEL
  // =========================================================================

  /** Two-way bindable array of row data */
  readonly value = model<Record<string, unknown>[]>([]);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted whenever the array value changes */
  readonly valueChange = output<Record<string, unknown>[]>();

  // =========================================================================
  // STATE
  // =========================================================================

  /** Internal rows signal — initialised lazily from the model */
  readonly rows = signal<Record<string, unknown>[]>([]);

  /** The row index being dragged, or null when not dragging */
  readonly dragIndex = signal<number | null>(null);

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** True when a new row can be added */
  readonly canAdd = computed(() => {
    const max = this.maxItems();
    return max === null || this.rows().length < max;
  });

  /** True when the current number of rows is above the minimum */
  readonly canRemove = computed(() => this.rows().length > this.minItems());

  // =========================================================================
  // METHODS
  // =========================================================================

  /** Append a new empty row using the schema keys. */
  addRow(): void {
    if (!this.canAdd() || this.disabled()) return;
    const empty = Object.fromEntries(this.schema().map((f) => [f.key, '']));
    this.rows.update((r) => [...r, empty]);
    this.emit();
  }

  /** Remove the row at the given index. */
  removeRow(index: number): void {
    if (!this.canRemove() || this.disabled()) return;
    this.rows.update((r) => r.filter((_, i) => i !== index));
    this.emit();
  }

  /** Update a single cell value. */
  updateCell(rowIndex: number, key: string, val: unknown): void {
    if (this.disabled()) return;
    this.rows.update((r) =>
      r.map((row, i) => (i === rowIndex ? { ...row, [key]: val } : row))
    );
    this.emit();
  }

  // -------------------------------------------------------------------------
  // Drag & Drop (HTML5 Drag API)
  // -------------------------------------------------------------------------

  /** Store the source row index when dragging starts. */
  onDragStart(index: number): void {
    this.dragIndex.set(index);
  }

  /** Prevent default to allow drop events. */
  onDragOver(e: DragEvent, _index: number): void {
    e.preventDefault();
  }

  /** Reorder rows by splicing the dragged item to the target position. */
  onDrop(targetIndex: number): void {
    const from = this.dragIndex();
    if (from === null || from === targetIndex) return;
    this.rows.update((r) => {
      const arr = [...r];
      const [item] = arr.splice(from, 1);
      arr.splice(targetIndex, 0, item);
      return arr;
    });
    this.dragIndex.set(null);
    this.emit();
  }

  // -------------------------------------------------------------------------
  // Helpers for template
  // -------------------------------------------------------------------------

  /** Return the current string value for an input cell. */
  cellValue(rowIndex: number, key: string): string {
    const v = this.rows()[rowIndex]?.[key];
    return v == null ? '' : String(v);
  }

  // =========================================================================
  // PRIVATE
  // =========================================================================

  private emit(): void {
    this.value.set(this.rows());
    this.valueChange.emit(this.rows());
  }
}
