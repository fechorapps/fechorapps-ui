import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCalendarViewComponent } from './calendar-view.component';

describe('UiCalendarViewComponent', () => {
  let fixture: ComponentFixture<UiCalendarViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCalendarViewComponent] });
    fixture = TestBed.createComponent(UiCalendarViewComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('monthDays computed has 42 entries', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.monthDays().length).toBe(42);
  });

  it('isSameMonth returns true for current month date', () => {
    fixture.detectChanges();
    const currentDate = fixture.componentInstance.currentDate();
    const sameMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
    expect(fixture.componentInstance.isSameMonth(sameMonthDate)).toBe(true);
  });
});
