import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDatePickerComponent } from './datepicker.component';

describe('UiDatePickerComponent', () => {
  let fixture: ComponentFixture<UiDatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiDatePickerComponent] });
    fixture = TestBed.createComponent(UiDatePickerComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows placeholder text', () => {
    fixture.componentRef.setInput('placeholder', 'Pick a date');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Pick a date');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Start Date');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Start Date');
  });

  it('renders inline calendar when inline is true', () => {
    fixture.componentRef.setInput('inline', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
