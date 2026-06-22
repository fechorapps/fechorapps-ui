import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDateRangePickerComponent, DateRange } from './date-range-picker.component';

describe('UiDateRangePickerComponent', () => {
  let fixture: ComponentFixture<UiDateRangePickerComponent>;
  let component: UiDateRangePickerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiDateRangePickerComponent] });
    fixture = TestBed.createComponent(UiDateRangePickerComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays placeholder when no date selected', () => {
    fixture.componentRef.setInput('placeholder', 'Pick a range');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Pick a range');
  });

  it('selectDay sets start on first click', () => {
    fixture.detectChanges();
    const day = new Date(2025, 0, 15);
    component.selectDay(day);
    expect(component.value().start).toEqual(day);
    expect(component.value().end).toBeNull();
  });

  it('selectDay sets end on second click', () => {
    fixture.detectChanges();
    const start = new Date(2025, 0, 10);
    const end = new Date(2025, 0, 20);
    component.selectDay(start);
    component.selectDay(end);
    expect(component.value().start).toEqual(start);
    expect(component.value().end).toEqual(end);
  });
});
