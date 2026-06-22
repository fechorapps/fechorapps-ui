import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiGaugeChartComponent } from './gauge-chart.component';

describe('UiGaugeChartComponent', () => {
  let fixture: ComponentFixture<UiGaugeChartComponent>;
  let component: UiGaugeChartComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiGaugeChartComponent] });
    fixture = TestBed.createComponent(UiGaugeChartComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders an SVG element', () => {
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('percentage is 0 when value equals min', () => {
    fixture.componentRef.setInput('value', 0);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    expect(component.percentage()).toBe(0);
  });

  it('percentage is 1 when value equals max', () => {
    fixture.componentRef.setInput('value', 100);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    expect(component.percentage()).toBe(1);
  });

  it('percentage is 0.75 when value is 75 of 100', () => {
    fixture.componentRef.setInput('value', 75);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    expect(component.percentage()).toBeCloseTo(0.75, 5);
  });

  it('percentage clamps to 1 above max', () => {
    fixture.componentRef.setInput('value', 150);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    expect(component.percentage()).toBe(1);
  });

  it('percentage clamps to 0 below min', () => {
    fixture.componentRef.setInput('value', -10);
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    expect(component.percentage()).toBe(0);
  });

  it('arcColor uses default blue when no thresholds', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.detectChanges();
    expect(component.arcColor()).toBe('#3b82f6');
  });

  it('arcColor uses first threshold color when below all thresholds', () => {
    fixture.componentRef.setInput('value', 10);
    fixture.componentRef.setInput('thresholds', [
      { value: 0, color: '#22c55e' },
      { value: 60, color: '#f59e0b' },
      { value: 80, color: '#ef4444' },
    ]);
    fixture.detectChanges();
    expect(component.arcColor()).toBe('#22c55e');
  });

  it('arcColor uses correct threshold color at value 68', () => {
    fixture.componentRef.setInput('value', 68);
    fixture.componentRef.setInput('thresholds', [
      { value: 0, color: '#22c55e' },
      { value: 60, color: '#f59e0b' },
      { value: 80, color: '#ef4444' },
    ]);
    fixture.detectChanges();
    expect(component.arcColor()).toBe('#f59e0b');
  });

  it('trackPath and valuePath are valid SVG path strings', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.detectChanges();
    expect(component.trackPath()).toMatch(/^M /);
    expect(component.valuePath()).toMatch(/^M /);
  });
});
