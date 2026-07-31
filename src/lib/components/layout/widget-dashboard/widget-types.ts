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
 * `id` is NOT an opaque key: `UiDashboardGridComponent` displays it as the
 * visible label in the drag-handle header, uses it for `track`, the
 * HTML5 drag `dataTransfer` payload, and the `[slot='{id}']` content-
 * projection selector (see dashboard-grid.component.html). Callers must set
 * `id` to a human-readable, dashboard-unique string — typically the
 * widget's own title, since V1 allows at most one instance per widget key
 * per user (see design doc, UserDashboardLayout PK).
 *
 * `data` is opaque on purpose: this library does not know how to turn "rows
 * from a report" into a KPI number or a Chart.js dataset — the caller
 * shapes `data` into whatever `WIDGET_REGISTRY[widgetType].resolveInputs`
 * expects (documented per-type in widget-registry.ts).
 */
export interface WidgetConfig extends GridItem {
  widgetType: WidgetType;
  title: string;
  data: unknown;
}
