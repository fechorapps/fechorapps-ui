import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMetricGridComponent } from './metric-grid.component';
import { Component } from '@angular/core';

@Component({
  template: `<ui-metric-grid [columns]="cols" [gap]="gap"><div class="child"></div></ui-metric-grid>`,
  standalone: true,
  imports: [UiMetricGridComponent],
})
class TestHostComponent {
  cols: 2 | 3 | 4 = 3;
  gap: 'sm' | 'md' | 'lg' = 'md';
}

describe('UiMetricGridComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('grid class contains grid-cols-3 by default', () => {
    fixture.detectChanges();
    const grid: HTMLElement = fixture.nativeElement.querySelector('[class*="grid-cols-3"]');
    expect(grid).toBeTruthy();
  });

  it('grid class contains grid-cols-2 when columns=2', () => {
    fixture.componentInstance.cols = 2;
    fixture.detectChanges();
    const grid: HTMLElement = fixture.nativeElement.querySelector('[class*="grid-cols-2"]');
    expect(grid).toBeTruthy();
  });
});
