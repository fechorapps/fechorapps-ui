import { WIDGET_REGISTRY } from './widget-registry';
import { UiKpiCardComponent } from '../../dashboard/kpi-card/kpi-card.component';
import { UiChartComponent } from '../../chart/chart/chart.component';
import { UiWidgetTableComponent } from './widget-table/widget-table.component';
import type { WidgetConfig } from './widget-types';

function baseConfig(overrides: Partial<WidgetConfig>): WidgetConfig {
  return {
    id: 'Test Widget',
    x: 0,
    y: 0,
    w: 4,
    h: 2,
    widgetType: 'kpi',
    title: 'Test Widget',
    data: {},
    ...overrides,
  };
}

describe('WIDGET_REGISTRY', () => {
  it('has an entry for every WidgetType', () => {
    expect(WIDGET_REGISTRY['kpi']).toBeDefined();
    expect(WIDGET_REGISTRY['barChart']).toBeDefined();
    expect(WIDGET_REGISTRY['lineChart']).toBeDefined();
    expect(WIDGET_REGISTRY['table']).toBeDefined();
  });

  it('maps kpi to UiKpiCardComponent with label/value/target/format resolved from data', () => {
    const entry = WIDGET_REGISTRY['kpi'];
    expect(entry.component).toBe(UiKpiCardComponent);

    const config = baseConfig({
      widgetType: 'kpi',
      title: 'Techo Presupuestal',
      data: { value: 120000000, target: 150000000, format: 'currency', currency: 'MXN' },
    });
    expect(entry.resolveInputs(config)).toEqual({
      label: 'Techo Presupuestal',
      value: 120000000,
      target: 150000000,
      format: 'currency',
      currency: 'MXN',
    });
  });

  it('defaults kpi format to number and currency to USD when absent', () => {
    const entry = WIDGET_REGISTRY['kpi'];
    const config = baseConfig({ widgetType: 'kpi', title: 'Count', data: { value: 5 } });
    expect(entry.resolveInputs(config)).toEqual({
      label: 'Count',
      value: 5,
      target: undefined,
      format: 'number',
      currency: 'USD',
    });
  });

  it('maps barChart to UiChartComponent with type bar and data passed through', () => {
    const entry = WIDGET_REGISTRY['barChart'];
    expect(entry.component).toBe(UiChartComponent);

    const chartData = { labels: ['A', 'B'], datasets: [{ data: [1, 2] }] };
    const config = baseConfig({ widgetType: 'barChart', title: 'Bar', data: chartData });
    expect(entry.resolveInputs(config)).toEqual({ type: 'bar', data: chartData });
  });

  it('maps lineChart to UiChartComponent with type line and data passed through', () => {
    const entry = WIDGET_REGISTRY['lineChart'];
    expect(entry.component).toBe(UiChartComponent);

    const chartData = { labels: ['A', 'B'], datasets: [{ data: [1, 2] }] };
    const config = baseConfig({ widgetType: 'lineChart', title: 'Line', data: chartData });
    expect(entry.resolveInputs(config)).toEqual({ type: 'line', data: chartData });
  });

  it('maps table to UiWidgetTableComponent with title/columns/rows resolved from data', () => {
    const entry = WIDGET_REGISTRY['table'];
    expect(entry.component).toBe(UiWidgetTableComponent);

    const tableData = {
      columns: [{ key: 'name', label: 'Nombre' }],
      rows: [{ name: 'Contrato A' }],
    };
    const config = baseConfig({ widgetType: 'table', title: 'Contratos', data: tableData });
    expect(entry.resolveInputs(config)).toEqual({
      title: 'Contratos',
      columns: tableData.columns,
      rows: tableData.rows,
    });
  });
});
