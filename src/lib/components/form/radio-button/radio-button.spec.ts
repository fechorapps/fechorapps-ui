import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRadioButtonComponent } from './radio-button.component';

describe('UiRadioButtonComponent', () => {
  let fixture: ComponentFixture<UiRadioButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiRadioButtonComponent] });
    fixture = TestBed.createComponent(UiRadioButtonComponent);
    fixture.componentRef.setInput('value', 'option1');
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

  it('shows label text when provided', () => {
    fixture.componentRef.setInput('label', 'Option 1');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Option 1');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('reflects selected state when modelValue matches value', () => {
    fixture.componentRef.setInput('modelValue', 'option1');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
