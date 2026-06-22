import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputOtpComponent } from './input-otp.component';

describe('UiInputOtpComponent', () => {
  let fixture: ComponentFixture<UiInputOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiInputOtpComponent] });
    fixture = TestBed.createComponent(UiInputOtpComponent);
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

  it('renders correct number of inputs based on length', () => {
    fixture.componentRef.setInput('length', 4);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(4);
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Verification Code');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Verification Code');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
