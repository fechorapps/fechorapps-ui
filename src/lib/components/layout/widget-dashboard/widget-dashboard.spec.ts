import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiWidgetDashboardComponent } from './widget-dashboard.component';
import type { WidgetConfig } from './widget-types';

const ITEMS: WidgetConfig[] = [
  {
    id: 'Techo Presupuestal',
    x: 0,
    y: 0,
    w: 4,
    h: 2,
    widgetType: 'kpi',
    title: 'Techo Presupuestal',
    data: { value: 120000000, format: 'currency', currency: 'MXN' },
  },
  {
    id: 'Contratos por Estatus',
    x: 4,
    y: 0,
    w: 8,
    h: 3,
    widgetType: 'barChart',
    title: 'Contratos por Estatus',
    data: { labels: ['Vigente', 'Cerrado'], datasets: [{ data: [10, 3] }] },
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
    const movedByGrid = ITEMS.map((item) => (item.id === 'Techo Presupuestal' ? { ...item, x: 8, y: 1 } : item));
    fixture.componentInstance.onGridLayoutChange(movedByGrid);

    expect(emitted.length).toBe(1);
    expect(emitted[0][0].x).toBe(8);
    expect(emitted[0][0].y).toBe(1);
    expect(emitted[0][0].widgetType).toBe('kpi'); // widget-specific field survived the round trip
    expect(fixture.componentInstance.items()[0].x).toBe(8);
  });
});
