import type { Type } from '@angular/core';
import type { ChartData } from 'chart.js';
import { UiKpiCardComponent } from '../../dashboard/kpi-card/kpi-card.component';
import { UiChartComponent } from '../../chart/chart/chart.component';
import { UiWidgetTableComponent } from './widget-table/widget-table.component';
import type { WidgetTableColumn, WidgetTableRow } from './widget-table/widget-table.component';
import type { WidgetConfig, WidgetType } from './widget-types';

interface KpiWidgetData {
  value: number;
  target?: number;
  format?: 'number' | 'currency' | 'percent';
  currency?: string;
}

interface TableWidgetData {
  columns: WidgetTableColumn[];
  rows: WidgetTableRow[];
}

const EMPTY_CHART_DATA: ChartData = { labels: [], datasets: [] };

export interface WidgetRegistryEntry {
  component: Type<unknown>;
  resolveInputs: (config: WidgetConfig) => Record<string, unknown>;
}

export const WIDGET_REGISTRY: Record<WidgetType, WidgetRegistryEntry> = {
  kpi: {
    component: UiKpiCardComponent,
    // No `label` here on purpose: UiDashboardGridComponent's own drag-handle
    // header already renders `config.title` (via GridItem.label) above every
    // cell, generically, for any widget type. Passing it again into
    // UiKpiCardComponent's own `label` input duplicated the same text twice
    // per card when rendered inside this grid — UiKpiCardComponent still
    // accepts `label` and renders it when used standalone outside the grid.
    resolveInputs: (config) => {
      const data = (config.data ?? {}) as Partial<KpiWidgetData>;
      return {
        value: data.value ?? 0,
        target: data.target,
        format: data.format ?? 'number',
        currency: data.currency ?? 'USD',
      };
    },
  },
  barChart: {
    component: UiChartComponent,
    resolveInputs: (config) => ({
      type: 'bar',
      data: (config.data as ChartData | undefined) ?? EMPTY_CHART_DATA,
      height: '100%',
      maintainAspectRatio: false,
    }),
  },
  lineChart: {
    component: UiChartComponent,
    resolveInputs: (config) => ({
      type: 'line',
      data: (config.data as ChartData | undefined) ?? EMPTY_CHART_DATA,
      height: '100%',
      maintainAspectRatio: false,
    }),
  },
  table: {
    component: UiWidgetTableComponent,
    resolveInputs: (config) => {
      const data = (config.data ?? {}) as Partial<TableWidgetData>;
      return { columns: data.columns ?? [], rows: data.rows ?? [] };
    },
  },
};
