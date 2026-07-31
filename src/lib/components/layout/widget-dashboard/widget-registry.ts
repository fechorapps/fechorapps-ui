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

export interface WidgetRegistryEntry {
  component: Type<unknown>;
  resolveInputs: (config: WidgetConfig) => Record<string, unknown>;
}

export const WIDGET_REGISTRY: Record<WidgetType, WidgetRegistryEntry> = {
  kpi: {
    component: UiKpiCardComponent,
    resolveInputs: (config) => {
      const data = config.data as KpiWidgetData;
      return {
        label: config.title,
        value: data.value,
        target: data.target,
        format: data.format ?? 'number',
        currency: data.currency ?? 'USD',
      };
    },
  },
  barChart: {
    component: UiChartComponent,
    resolveInputs: (config) => ({ type: 'bar', data: config.data as ChartData }),
  },
  lineChart: {
    component: UiChartComponent,
    resolveInputs: (config) => ({ type: 'line', data: config.data as ChartData }),
  },
  table: {
    component: UiWidgetTableComponent,
    resolveInputs: (config) => {
      const data = config.data as TableWidgetData;
      return { title: config.title, columns: data.columns, rows: data.rows };
    },
  },
};
