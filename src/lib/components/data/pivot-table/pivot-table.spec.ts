import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPivotTableComponent, PivotConfig } from './pivot-table.component';

const testData: Record<string, unknown>[] = [
  { region: 'North', product: 'A', sales: 100 },
  { region: 'North', product: 'B', sales: 200 },
  { region: 'South', product: 'A', sales: 150 },
  { region: 'South', product: 'B', sales: 50 },
];

const testConfig: PivotConfig = {
  rowField: 'region',
  colField: 'product',
  valueField: 'sales',
  aggregation: 'sum',
};

describe('UiPivotTableComponent', () => {
  let fixture: ComponentFixture<UiPivotTableComponent>;
  let component: UiPivotTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPivotTableComponent] });
    fixture = TestBed.createComponent(UiPivotTableComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.componentRef.setInput('config', testConfig);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes rowValues correctly', () => {
    fixture.componentRef.setInput('data', testData);
    fixture.componentRef.setInput('config', testConfig);
    fixture.detectChanges();
    expect(component.rowValues()).toEqual(['North', 'South']);
  });

  it('computes colValues correctly', () => {
    fixture.componentRef.setInput('data', testData);
    fixture.componentRef.setInput('config', testConfig);
    fixture.detectChanges();
    expect(component.colValues()).toEqual(['A', 'B']);
  });

  it('computes pivotData with sum aggregation', () => {
    fixture.componentRef.setInput('data', testData);
    fixture.componentRef.setInput('config', testConfig);
    fixture.detectChanges();
    expect(component.pivotData()['North']['A']).toBe(100);
    expect(component.pivotData()['South']['B']).toBe(50);
  });

  it('computes rowTotals correctly', () => {
    fixture.componentRef.setInput('data', testData);
    fixture.componentRef.setInput('config', testConfig);
    fixture.detectChanges();
    expect(component.rowTotals()['North']).toBe(300);
    expect(component.rowTotals()['South']).toBe(200);
  });

  it('shows loading spinner when loading', () => {
    fixture.componentRef.setInput('config', testConfig);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
  });
});
