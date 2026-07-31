import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiWidgetDashboardComponent } from './widget-dashboard.component';
import type { WidgetConfig } from './widget-types';

const ITEMS: WidgetConfig[] = [
  {
    id: 'budget-ceiling',
    label: 'Techo Presupuestal',
    x: 0,
    y: 0,
    w: 4,
    h: 2,
    widgetKey: 'BudgetCeiling',
    widgetType: 'kpi',
    title: 'Techo Presupuestal',
    data: { value: 120000000, format: 'currency', currency: 'MXN' },
  },
  {
    id: 'contracts-by-status',
    label: 'Contratos por Estatus',
    x: 4,
    y: 0,
    w: 8,
    h: 3,
    widgetKey: 'ContractsByStatus',
    widgetType: 'barChart',
    title: 'Contratos por Estatus',
    data: { labels: ['Vigente', 'Cerrado'], datasets: [{ data: [10, 3] }] },
  },
  {
    id: 'top-contracts',
    label: 'Contratos Principales',
    x: 0,
    y: 3,
    w: 6,
    h: 3,
    widgetKey: 'TopContracts',
    widgetType: 'table',
    title: 'Contratos Principales',
    data: {
      columns: [{ key: 'name', label: 'Contrato' }],
      rows: [{ name: 'SEDENA-DN8-045-2024' }],
    },
  },
];

describe('UiWidgetDashboardComponent', () => {
  let fixture: ComponentFixture<UiWidgetDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiWidgetDashboardComponent] });
    fixture = TestBed.createComponent(UiWidgetDashboardComponent);
  });

  it('renders one resolved widget component per item', () => {
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('ui-kpi-card')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ui-chart')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ui-widget-table')).toBeTruthy();
  });

  it('passes the underlying grid the same items (id, x, y, w, h intact)', () => {
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();

    const grid = fixture.nativeElement.querySelector('ui-dashboard-grid');
    expect(grid).toBeTruthy();
  });

  it('re-emits layoutChange from the underlying grid, preserving widget fields', () => {
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();

    const emitted: WidgetConfig[][] = [];
    fixture.componentInstance.layoutChange.subscribe((v) => emitted.push(v));

    // Simulate what the grid emits after a drag: same objects, x/y updated.
    const movedByGrid = ITEMS.map((item) => (item.id === 'budget-ceiling' ? { ...item, x: 8, y: 1 } : item));
    fixture.componentInstance.onGridLayoutChange(movedByGrid);

    expect(emitted.length).toBe(1);
    expect(emitted[0][0].x).toBe(8);
    expect(emitted[0][0].y).toBe(1);
    expect(emitted[0][0].widgetType).toBe('kpi'); // widget-specific field survived the round trip
    expect(fixture.componentInstance.items()[0].x).toBe(8);
  });

  it('renders a table widget with real row data, not just tag presence', () => {
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('ui-widget-table');
    expect(table).toBeTruthy();
    expect(table.textContent).toContain('SEDENA-DN8-045-2024');
  });

  it('shows a fallback instead of crashing when widgetType is unknown', () => {
    const badItems: WidgetConfig[] = [
      {
        id: 'broken',
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        widgetKey: 'SomeFutureWidget',
        widgetType: 'pieChart' as WidgetConfig['widgetType'],
        title: 'Not Yet Supported',
        data: null,
      },
    ];

    fixture.componentRef.setInput('items', badItems);
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(fixture.nativeElement.textContent).toContain('No se pudo mostrar este widget');
  });
});
