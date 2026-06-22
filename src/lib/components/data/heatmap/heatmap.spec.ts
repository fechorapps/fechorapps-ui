import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiHeatmapComponent, HeatmapCell } from './heatmap.component';

const testCells: HeatmapCell[] = [
  { row: 'Row A', col: 'Col 1', value: 10 },
  { row: 'Row A', col: 'Col 2', value: 50 },
  { row: 'Row B', col: 'Col 1', value: 30 },
  { row: 'Row B', col: 'Col 2', value: 90 },
];

describe('UiHeatmapComponent', () => {
  let fixture: ComponentFixture<UiHeatmapComponent>;
  let component: UiHeatmapComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiHeatmapComponent] });
    fixture = TestBed.createComponent(UiHeatmapComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes rows correctly', () => {
    fixture.componentRef.setInput('cells', testCells);
    fixture.detectChanges();
    expect(component.rows()).toEqual(['Row A', 'Row B']);
  });

  it('computes cols correctly', () => {
    fixture.componentRef.setInput('cells', testCells);
    fixture.detectChanges();
    expect(component.cols()).toEqual(['Col 1', 'Col 2']);
  });

  it('getCellOpacity returns 0.1 for min value', () => {
    fixture.componentRef.setInput('cells', testCells);
    fixture.detectChanges();
    const opacity = component.getCellOpacity(10); // min value
    expect(opacity).toBeCloseTo(0.1, 2);
  });

  it('getCellOpacity returns 1 for max value', () => {
    fixture.componentRef.setInput('cells', testCells);
    fixture.detectChanges();
    const opacity = component.getCellOpacity(90); // max value
    expect(opacity).toBeCloseTo(1.0, 2);
  });

  it('getCellOpacity returns value within 0.1-1.0 range', () => {
    fixture.componentRef.setInput('cells', testCells);
    fixture.detectChanges();
    const opacity = component.getCellOpacity(50);
    expect(opacity).toBeGreaterThanOrEqual(0.1);
    expect(opacity).toBeLessThanOrEqual(1.0);
  });

  it('getCell returns correct cell for row/col combination', () => {
    fixture.componentRef.setInput('cells', testCells);
    fixture.detectChanges();
    const cell = component.getCell('Row A', 'Col 2');
    expect(cell?.value).toBe(50);
  });

  it('shows loading spinner when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
  });

  it('hoveredCell starts as null', () => {
    fixture.detectChanges();
    expect(component.hoveredCell()).toBeNull();
  });
});
