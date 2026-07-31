import { isWidgetType } from './widget-types';

describe('isWidgetType', () => {
  it('accepts every known widget type', () => {
    expect(isWidgetType('kpi')).toBe(true);
    expect(isWidgetType('barChart')).toBe(true);
    expect(isWidgetType('lineChart')).toBe(true);
    expect(isWidgetType('table')).toBe(true);
  });

  it('rejects unknown strings', () => {
    expect(isWidgetType('pieChart')).toBe(false);
    expect(isWidgetType('')).toBe(false);
  });

  it('rejects non-string values', () => {
    expect(isWidgetType(42)).toBe(false);
    expect(isWidgetType(null)).toBe(false);
    expect(isWidgetType(undefined)).toBe(false);
  });
});
