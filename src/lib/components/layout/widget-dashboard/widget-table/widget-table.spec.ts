import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiWidgetTableComponent } from './widget-table.component';

describe('UiWidgetTableComponent', () => {
  let fixture: ComponentFixture<UiWidgetTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiWidgetTableComponent] });
    fixture = TestBed.createComponent(UiWidgetTableComponent);
  });

  it('renders a header cell per column', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', label: 'Nombre' },
      { key: 'amount', label: 'Monto' },
    ]);
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toContain('Nombre');
    expect(headers[1].textContent).toContain('Monto');
  });

  it('renders a row per data item, cell values by column key', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', label: 'Nombre' },
      { key: 'amount', label: 'Monto' },
    ]);
    fixture.componentRef.setInput('rows', [
      { name: 'Contrato A', amount: 1000 },
      { name: 'Contrato B', amount: 2000 },
    ]);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Contrato A');
    expect(rows[0].textContent).toContain('1000');
  });

  it('shows an empty state when there are no rows', () => {
    fixture.componentRef.setInput('columns', [{ key: 'name', label: 'Nombre' }]);
    fixture.componentRef.setInput('rows', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Sin datos');
  });
});
