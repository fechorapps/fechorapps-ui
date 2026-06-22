import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiChartComponent } from './chart.component';
import type { ChartData } from 'chart.js';

const MOCK_DATA: ChartData = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{ label: 'Sales', data: [10, 20, 30] }],
};

describe('UiChartComponent', () => {
  let fixture: ComponentFixture<UiChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiChartComponent] });
    fixture = TestBed.createComponent(UiChartComponent);
    fixture.componentRef.setInput('type', 'bar');
    fixture.componentRef.setInput('data', MOCK_DATA);
  });

  it('renders without error', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders a canvas element', () => {
    fixture.detectChanges();
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('applies default width and height styles', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.containerStyles()).toEqual({
      width: '100%',
      height: '400px',
    });
  });

  it('applies custom width and height inputs', () => {
    fixture.componentRef.setInput('width', '600px');
    fixture.componentRef.setInput('height', '300px');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerStyles()).toEqual({
      width: '600px',
      height: '300px',
    });
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'shadow-lg');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('shadow-lg');
  });

  it('destroys chart instance on component destroy', () => {
    fixture.detectChanges();
    // Ensure no error is thrown during destroy lifecycle
    expect(() => fixture.destroy()).not.toThrow();
  });
});
