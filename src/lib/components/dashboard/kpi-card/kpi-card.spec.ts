import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiKpiCardComponent } from './kpi-card.component';

describe('UiKpiCardComponent', () => {
  let fixture: ComponentFixture<UiKpiCardComponent>;
  let component: UiKpiCardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiKpiCardComponent] });
    fixture = TestBed.createComponent(UiKpiCardComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows formatted value as currency', () => {
    fixture.componentRef.setInput('value', 1000);
    fixture.componentRef.setInput('format', 'currency');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('$1,000.00');
  });

  it('computes progress correctly', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.componentRef.setInput('target', 100);
    fixture.detectChanges();
    expect(component.progress()).toBe(50);
  });

  it('progress is null when no target', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.detectChanges();
    expect(component.progress()).toBeNull();
  });
});
