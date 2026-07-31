import type { GridItem } from '../dashboard-grid/dashboard-grid.component';

/**
 * Mirrors the backend's WidgetType smart enum (see the design doc). Fixed
 * catalog, extended by deploy — no runtime-editable widget types.
 */
export type WidgetType = 'kpi' | 'barChart' | 'lineChart' | 'table';

const WIDGET_TYPES: readonly WidgetType[] = ['kpi', 'barChart', 'lineChart', 'table'];

export function isWidgetType(value: unknown): value is WidgetType {
  return typeof value === 'string' && (WIDGET_TYPES as readonly string[]).includes(value);
}

/**
 * One widget instance placed on a dashboard.
 *
 * `id` must still be a dashboard-unique string — it drives `UiDashboardGridComponent`'s
 * `track`, the HTML5 drag `dataTransfer` payload, and (via `ContentChild`/
 * `NgTemplateOutlet`) which item each rendered cell corresponds to. It is no
 * longer the visible label: set `GridItem.label` for that, or the grid falls
 * back to displaying `id` itself if `label` is omitted.
 *
 * `widgetKey` is the stable identity of *which widget this is* (matches the
 * backend's WidgetKey smart enum) — distinct from `id`, which only needs to
 * be unique within one dashboard instance. Callers persisting layout
 * (UserDashboardLayout) key off `widgetKey`, not `id`.
 *
 * `data` is opaque on purpose: this library does not know how to turn "rows
 * from a report" into a KPI number or a Chart.js dataset — the caller
 * shapes `data` into whatever `WIDGET_REGISTRY[widgetType].resolveInputs`
 * expects (documented per-type in widget-registry.ts). A missing or
 * malformed `data` is handled gracefully by every resolveInputs
 * implementation (falls back to empty/zero values) rather than throwing.
 */
export interface WidgetConfig extends GridItem {
  widgetKey: string;
  widgetType: WidgetType;
  title: string;
  data: unknown;
}
