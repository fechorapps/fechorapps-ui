import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCreditCardInputComponent } from './credit-card-input.component';

describe('UiCreditCardInputComponent', () => {
  let fixture: ComponentFixture<UiCreditCardInputComponent>;
  let component: UiCreditCardInputComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCreditCardInputComponent] });
    fixture = TestBed.createComponent(UiCreditCardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  // =========================================================================
  // CARD TYPE DETECTION
  // =========================================================================

  it('detects Visa prefix (4xxx)', () => {
    simulateNumberInput(component, '4111');
    fixture.detectChanges();
    expect(component.cardType()).toBe('visa');
  });

  it('detects Mastercard prefix (5[1-5]xxx)', () => {
    simulateNumberInput(component, '5123');
    fixture.detectChanges();
    expect(component.cardType()).toBe('mastercard');
  });

  it('detects Amex prefix (34 or 37)', () => {
    simulateNumberInput(component, '3782');
    fixture.detectChanges();
    expect(component.cardType()).toBe('amex');

    simulateNumberInput(component, '3456');
    fixture.detectChanges();
    expect(component.cardType()).toBe('amex');
  });

  it('detects Discover prefix (6011 or 65)', () => {
    simulateNumberInput(component, '6011');
    fixture.detectChanges();
    expect(component.cardType()).toBe('discover');

    simulateNumberInput(component, '6512');
    fixture.detectChanges();
    expect(component.cardType()).toBe('discover');
  });

  it('returns unknown for unrecognized prefix', () => {
    simulateNumberInput(component, '9999');
    fixture.detectChanges();
    expect(component.cardType()).toBe('unknown');
  });

  // =========================================================================
  // CARD NUMBER FORMATTING
  // =========================================================================

  it('formats standard card number as 4-4-4-4', () => {
    simulateNumberInput(component, '4111111111111111');
    fixture.detectChanges();
    expect(component.numberInput()).toBe('4111 1111 1111 1111');
  });

  it('formats Amex card number as 4-6-5', () => {
    simulateNumberInput(component, '378282246310005');
    fixture.detectChanges();
    expect(component.cardType()).toBe('amex');
    // 378282246310005 => 3782 822463 10005
    expect(component.numberInput()).toBe('3782 822463 10005');
  });

  it('strips non-digit characters from number input', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: '4111-1111-1111-1111' } });
    component.onNumberInput(event);
    fixture.detectChanges();
    expect(component.numberInput()).toBe('4111 1111 1111 1111');
  });

  it('limits standard card to 16 digits', () => {
    simulateNumberInput(component, '41111111111111119999');
    fixture.detectChanges();
    // Should only keep first 16 digits
    const raw = component.numberInput().replace(/\s/g, '');
    expect(raw.length).toBe(16);
  });

  it('limits Amex card to 15 digits', () => {
    simulateNumberInput(component, '3782822463100059999');
    fixture.detectChanges();
    const raw = component.numberInput().replace(/\s/g, '');
    expect(raw.length).toBe(15);
  });

  // =========================================================================
  // EXPIRY FORMATTING
  // =========================================================================

  it('auto-inserts slash after MM for expiry', () => {
    simulateExpiryInput(component, '1225');
    fixture.detectChanges();
    expect(component.expiryInput()).toBe('12/25');
  });

  it('handles partial expiry without slash', () => {
    simulateExpiryInput(component, '12');
    fixture.detectChanges();
    expect(component.expiryInput()).toBe('12');
  });

  it('strips non-digit characters from expiry', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: '12/25' } });
    component.onExpiryInput(event);
    fixture.detectChanges();
    expect(component.expiryInput()).toBe('12/25');
  });

  it('limits expiry to MM/YY format (4 digits + slash)', () => {
    simulateExpiryInput(component, '12259999');
    fixture.detectChanges();
    expect(component.expiryInput()).toBe('12/25');
  });

  // =========================================================================
  // CVV
  // =========================================================================

  it('accepts 3-digit CVV for non-Amex', () => {
    simulateNumberInput(component, '4111111111111111');
    simulateCvvInput(component, '123');
    fixture.detectChanges();
    expect(component.cvvInput()).toBe('123');
  });

  it('accepts 4-digit CVV for Amex', () => {
    simulateNumberInput(component, '378282246310005');
    simulateCvvInput(component, '1234');
    fixture.detectChanges();
    expect(component.cvvInput()).toBe('1234');
  });

  it('limits CVV to 3 digits for non-Amex', () => {
    simulateNumberInput(component, '4111111111111111');
    simulateCvvInput(component, '12345');
    fixture.detectChanges();
    expect(component.cvvInput()).toBe('123');
  });

  it('limits CVV to 4 digits for Amex', () => {
    simulateNumberInput(component, '378282246310005');
    simulateCvvInput(component, '12345');
    fixture.detectChanges();
    expect(component.cvvInput()).toBe('1234');
  });

  it('toggles CVV text visibility', () => {
    expect(component.showCvvText()).toBeFalse();
    component.toggleCvvVisibility();
    expect(component.showCvvText()).toBeTrue();
    component.toggleCvvVisibility();
    expect(component.showCvvText()).toBeFalse();
  });

  it('CVV input is password type by default', () => {
    fixture.componentRef.setInput('showCvv', true);
    fixture.detectChanges();
    const cvvInput = fixture.nativeElement.querySelector('input[autocomplete="cc-csc"]');
    expect(cvvInput?.type).toBe('password');
  });

  it('CVV input becomes text when showCvvText is true', () => {
    fixture.componentRef.setInput('showCvv', true);
    fixture.detectChanges();
    component.showCvvText.set(true);
    fixture.detectChanges();
    const cvvInput = fixture.nativeElement.querySelector('input[autocomplete="cc-csc"]');
    expect(cvvInput?.type).toBe('text');
  });

  // =========================================================================
  // VALIDITY
  // =========================================================================

  it('isValid is false when fields are empty', () => {
    expect(component.isValid()).toBeFalse();
  });

  it('isValid is true for a complete valid Visa card', () => {
    simulateNumberInput(component, '4111111111111111');
    simulateExpiryInput(component, '1225');
    simulateCvvInput(component, '123');
    fixture.detectChanges();
    expect(component.isValid()).toBeTrue();
  });

  it('isValid is true for a complete valid Amex card', () => {
    simulateNumberInput(component, '378282246310005');
    simulateExpiryInput(component, '1225');
    simulateCvvInput(component, '1234');
    fixture.detectChanges();
    expect(component.isValid()).toBeTrue();
  });

  it('isValid is false for Amex with only 3-digit CVV', () => {
    simulateNumberInput(component, '378282246310005');
    simulateExpiryInput(component, '1225');
    simulateCvvInput(component, '123');
    fixture.detectChanges();
    expect(component.isValid()).toBeFalse();
  });

  it('emits validChange when validity changes', async () => {
    const validChangeSpy = jasmine.createSpy('validChange');
    component.validChange.subscribe(validChangeSpy);

    simulateNumberInput(component, '4111111111111111');
    simulateExpiryInput(component, '1225');
    simulateCvvInput(component, '123');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(validChangeSpy).toHaveBeenCalledWith(true);
  });

  it('emits cardTypeChange when card type changes', async () => {
    const cardTypeChangeSpy = jasmine.createSpy('cardTypeChange');
    component.cardTypeChange.subscribe(cardTypeChangeSpy);

    simulateNumberInput(component, '4111');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(cardTypeChangeSpy).toHaveBeenCalledWith('visa');
  });

  it('emits cardChange when fields change', async () => {
    const cardChangeSpy = jasmine.createSpy('cardChange');
    component.cardChange.subscribe(cardChangeSpy);

    simulateNumberInput(component, '4111111111111111');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(cardChangeSpy).toHaveBeenCalled();
    const emitted = cardChangeSpy.calls.mostRecent().args[0];
    expect(emitted.number).toBe('4111111111111111');
  });

  // =========================================================================
  // INPUTS
  // =========================================================================

  it('hides CVV field when showCvv is false', () => {
    fixture.componentRef.setInput('showCvv', false);
    fixture.detectChanges();
    const cvvInput = fixture.nativeElement.querySelector('input[autocomplete="cc-csc"]');
    expect(cvvInput).toBeNull();
  });

  it('shows CVV field when showCvv is true', () => {
    fixture.componentRef.setInput('showCvv', true);
    fixture.detectChanges();
    const cvvInput = fixture.nativeElement.querySelector('input[autocomplete="cc-csc"]');
    expect(cvvInput).toBeTruthy();
  });

  it('disables inputs when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
      expect(input.disabled).toBeTrue();
    });
  });

  it('shows card icon by default', () => {
    fixture.componentRef.setInput('showCardIcon', true);
    fixture.detectChanges();
    const iconContainer = fixture.nativeElement.querySelector('svg[aria-label]');
    expect(iconContainer).toBeTruthy();
  });
});

// =========================================================================
// HELPERS
// =========================================================================

function simulateNumberInput(component: UiCreditCardInputComponent, digits: string): void {
  const event = new Event('input');
  Object.defineProperty(event, 'target', { value: { value: digits } });
  component.onNumberInput(event);
}

function simulateExpiryInput(component: UiCreditCardInputComponent, raw: string): void {
  const event = new Event('input');
  Object.defineProperty(event, 'target', { value: { value: raw } });
  component.onExpiryInput(event);
}

function simulateCvvInput(component: UiCreditCardInputComponent, digits: string): void {
  const event = new Event('input');
  Object.defineProperty(event, 'target', { value: { value: digits } });
  component.onCvvInput(event);
}
