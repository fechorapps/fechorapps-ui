import { Component, ChangeDetectionStrategy, model, output, type Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { UiDashboardGridComponent } from '../dashboard-grid/dashboard-grid.component';
import type { GridItem } from '../dashboard-grid/dashboard-grid.component';
import { WIDGET_REGISTRY } from './widget-registry';
import { isWidgetType } from './widget-types';
import type { WidgetConfig } from './widget-types';

@Component({
  selector: 'ui-widget-dashboard',
  standalone: true,
  imports: [UiDashboardGridComponent, NgComponentOutlet],
  templateUrl: './widget-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiWidgetDashboardComponent {
  items = model<WidgetConfig[]>([]);
  readonly layoutChange = output<WidgetConfig[]>();

  widgetComponent(item: WidgetConfig): Type<unknown> | null {
    if (!isWidgetType(item.widgetType)) return null;
    return WIDGET_REGISTRY[item.widgetType]?.component ?? null;
  }

  widgetInputs(item: WidgetConfig): Record<string, unknown> {
    if (!isWidgetType(item.widgetType)) return {};
    return WIDGET_REGISTRY[item.widgetType]?.resolveInputs(item) ?? {};
  }

  /**
   * UiDashboardGridComponent mutates items via `{ ...i, x, y }` (see its
   * onGridDrop), so the objects it emits back are still full WidgetConfig
   * instances at runtime — only its own GridItem-shaped view of them is
   * narrower. Safe to treat the emitted array as WidgetConfig[].
   */
  onGridLayoutChange(gridItems: GridItem[]): void {
    const updated = gridItems as WidgetConfig[];
    this.items.set(updated);
    this.layoutChange.emit(updated);
  }
}
