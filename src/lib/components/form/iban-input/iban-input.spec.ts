import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiIbanInputComponent } from './iban-input.component';

describe('UiIbanInputComponent', () => {
  let fixture: ComponentFixture<UiIbanInputComponent>;
  let component: UiIbanInputComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiIbanInputComponent] });
    fixture = TestBed.createComponent(UiIbanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  // =========================================================================
  // VALIDITY — ES (24 chars)
  // =========================================================================

  it('isValid is true for a 24-char Spanish IBAN', () => {
    simulateInput(component, 'ES9121000418450200051332');
    fixture.detectChanges();
    expect(component.isValid()).toBeTrue();
  });

  it('isValid is false when Spanish IBAN is too short', () => {
    simulateInput(component, 'ES912100041845020005133'); // 23 chars
    fixture.detectChanges();
    expect(component.isValid()).toBeFalse();
  });

  it('isValid is false when Spanish IBAN is too long', () => {
    simulateInput(component, 'ES91210004184502000513320'); // 25 chars
    fixture.detectChanges();
    expect(component.isValid()).toBeFalse();
  });

  // =========================================================================
  // VALIDITY — DE (22 chars)
  // =========================================================================

  it('isValid is true for a 22-char German IBAN', () => {
    simulateInput(component, 'DE89370400440532013000');
    fixture.detectChanges();
    expect(component.isValid()).toBeTrue();
  });

  it('isValid is false for too-short German IBAN', () => {
    simulateInput(component, 'DE8937040044053201300'); // 21 chars
    fixture.detectChanges();
    expect(component.isValid()).toBeFalse();
  });

  // =========================================================================
  // VALIDITY — empty / unknown
  // =========================================================================

  it('isValid is false when value is empty', () => {
    expect(component.isValid()).toBeFalse();
  });

  it('isValid is false for unknown country code', () => {
    simulateInput(component, 'ZZ1234567890123456');
    fixture.detectChanges();
    expect(component.isValid()).toBeFalse();
  });

  // =========================================================================
  // FORMATTED DISPLAY — spaces every 4 chars
  // =========================================================================

  it('formats display value in groups of 4', () => {
    simulateInput(component, 'ES9121000418450200051332');
    fixture.detectChanges();
    expect(component.displayValue()).toBe('ES91 2100 0418 4502 0005 1332');
  });

  it('formats partial IBAN in groups of 4', () => {
    simulateInput(component, 'DE89370400');
    fixture.detectChanges();
    expect(component.displayValue()).toBe('DE89 3704 00');
  });

  it('strips spaces and non-alphanumeric chars from raw input', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'DE89 3704 0044 0532 0130 00' } });
    component.onInput(event);
    fixture.detectChanges();
    expect(component.value()).toBe('DE89370400440532013000');
  });

  it('uppercases raw value', () => {
    simulateInput(component, 'de89370400440532013000');
    fixture.detectChanges();
    expect(component.value()).toBe('DE89370400440532013000');
  });

  // =========================================================================
  // COUNTRY DETECTION
  // =========================================================================

  it('detects country from first 2 chars of value', () => {
    simulateInput(component, 'ES9121000418450200051332');
    fixture.detectChanges();
    expect(component.detectedCountry()).toBe('ES');
  });

  it('detectedCountry falls back to country input when value < 2 chars', () => {
    fixture.componentRef.setInput('country', 'FR');
    fixture.detectChanges();
    expect(component.detectedCountry()).toBe('FR');
  });

  it('expectedLength is 24 for ES', () => {
    simulateInput(component, 'ES9121000418450200051332');
    fixture.detectChanges();
    expect(component.expectedLength()).toBe(24);
  });

  it('expectedLength is 22 for DE', () => {
    simulateInput(component, 'DE89370400440532013000');
    fixture.detectChanges();
    expect(component.expectedLength()).toBe(22);
  });

  it('expectedLength is null for unknown country', () => {
    simulateInput(component, 'ZZ1234');
    fixture.detectChanges();
    expect(component.expectedLength()).toBeNull();
  });

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  it('emits ibanChange with raw value on input', () => {
    const spy = jasmine.createSpy('ibanChange');
    component.ibanChange.subscribe(spy);
    simulateInput(component, 'ES9121000418450200051332');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('ES9121000418450200051332');
  });

  it('emits validChange true when IBAN becomes valid', () => {
    const spy = jasmine.createSpy('validChange');
    component.validChange.subscribe(spy);
    simulateInput(component, 'ES9121000418450200051332');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('emits validChange false when IBAN is invalid', () => {
    const spy = jasmine.createSpy('validChange');
    component.validChange.subscribe(spy);
    simulateInput(component, 'ES912');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(false);
  });

  // =========================================================================
  // COPY TO CLIPBOARD
  // =========================================================================

  it('copyToClipboard writes raw value to clipboard', async () => {
    simulateInput(component, 'ES9121000418450200051332');
    fixture.detectChanges();

    const writeTextSpy = jasmine.createSpy('writeText').and.returnValue(Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextSpy },
      configurable: true,
    });

    component.copyToClipboard();
    await fixture.whenStable();

    expect(writeTextSpy).toHaveBeenCalledWith('ES9121000418450200051332');
  });

  it('copied signal becomes true after copyToClipboard', async () => {
    simulateInput(component, 'ES9121000418450200051332');
    fixture.detectChanges();

    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jasmine.createSpy().and.returnValue(Promise.resolve()) },
      configurable: true,
    });

    component.copyToClipboard();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.copied()).toBeTrue();
  });

  // =========================================================================
  // INPUTS (disabled, label)
  // =========================================================================

  it('disables the input when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBeTrue();
  });

  it('shows custom label', () => {
    fixture.componentRef.setInput('label', 'Bank Account');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent.trim()).toBe('Bank Account');
  });

  it('shows default label IBAN', () => {
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent.trim()).toBe('IBAN');
  });
});

// =========================================================================
// HELPERS
// =========================================================================

function simulateInput(component: UiIbanInputComponent, raw: string): void {
  const event = new Event('input');
  Object.defineProperty(event, 'target', { value: { value: raw } });
  component.onInput(event);
}
