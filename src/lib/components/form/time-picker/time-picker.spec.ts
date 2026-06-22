import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTimePickerComponent } from './time-picker.component';

describe('UiTimePickerComponent', () => {
  let fixture: ComponentFixture<UiTimePickerComponent>;
  let component: UiTimePickerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTimePickerComponent] });
    fixture = TestBed.createComponent(UiTimePickerComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays the current value', () => {
    fixture.componentRef.setInput('value', '14:30');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('14:30');
  });

  it('hourOptions has 24 entries for 24h mode', () => {
    fixture.componentRef.setInput('use24h', true);
    fixture.detectChanges();
    expect(component.hourOptions().length).toBe(24);
  });

  it('hourOptions has 12 entries for 12h mode', () => {
    fixture.componentRef.setInput('use24h', false);
    fixture.detectChanges();
    expect(component.hourOptions().length).toBe(12);
  });

  it('pad formats single digit numbers', () => {
    expect(component.pad(5)).toBe('05');
    expect(component.pad(12)).toBe('12');
  });
});
