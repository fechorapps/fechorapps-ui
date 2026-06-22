import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSparklineChartComponent } from './sparkline-chart.component';

describe('UiSparklineChartComponent', () => {
  let fixture: ComponentFixture<UiSparklineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSparklineChartComponent] });
    fixture = TestBed.createComponent(UiSparklineChartComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders canvas element', () => {
    fixture.detectChanges();
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });
});
