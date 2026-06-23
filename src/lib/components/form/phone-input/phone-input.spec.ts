import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPhoneInputComponent } from './phone-input.component';

describe('UiPhoneInputComponent', () => {
  let fixture: ComponentFixture<UiPhoneInputComponent>;
  let component: UiPhoneInputComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPhoneInputComponent] });
    fixture = TestBed.createComponent(UiPhoneInputComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults to MX country', () => {
    fixture.detectChanges();
    expect(component.selectedCountry().code).toBe('MX');
    expect(fixture.nativeElement.textContent).toContain('🇲🇽');
    expect(fixture.nativeElement.textContent).toContain('+52');
  });

  it('uses defaultCountry input to select country', () => {
    fixture.componentRef.setInput('defaultCountry', 'US');
    fixture.detectChanges();
    expect(component.selectedCountry().code).toBe('US');
    expect(fixture.nativeElement.textContent).toContain('🇺🇸');
  });

  it('emits validChange true when typing 10 digits for MX', async () => {
    const validChangeSpy = jasmine.createSpy('validChange');
    component.validChange.subscribe(validChangeSpy);

    fixture.componentRef.setInput('defaultCountry', 'MX');
    fixture.detectChanges();

    // Simulate input of 10 digits
    const input = fixture.nativeElement.querySelector('input[type="tel"]');
    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { value: { value: '1234567890' } });
    component.onInput(event);
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.rawDigits()).toBe('1234567890');
    expect(component.isValid()).toBeTrue();
    expect(validChangeSpy).toHaveBeenCalledWith(true);
  });

  it('emits validChange false when typing 5 digits for MX', async () => {
    const validChangeSpy = jasmine.createSpy('validChange');
    component.validChange.subscribe(validChangeSpy);

    fixture.componentRef.setInput('defaultCountry', 'MX');
    fixture.detectChanges();

    // Simulate input of 5 digits
    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { value: { value: '12345' } });
    component.onInput(event);
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.rawDigits()).toBe('12345');
    expect(component.isValid()).toBeFalse();
    expect(validChangeSpy).toHaveBeenCalledWith(false);
  });

  it('shows preferred countries first in dropdown', () => {
    fixture.componentRef.setInput('preferredCountries', ['US', 'ES']);
    fixture.detectChanges();

    const countries = component.filteredCountries();
    expect(countries[0].code).toBe('US');
    expect(countries[1].code).toBe('ES');
    // MX should appear but not in first 2
    const mxIndex = countries.findIndex(c => c.code === 'MX');
    expect(mxIndex).toBeGreaterThan(1);
  });

  it('selectCountry updates selectedCountry and closes dropdown', () => {
    fixture.detectChanges();
    component.showDropdown.set(true);

    const us = component.filteredCountries().find(c => c.code === 'US')!;
    component.selectCountry(us);
    fixture.detectChanges();

    expect(component.selectedCountry().code).toBe('US');
    expect(component.showDropdown()).toBeFalse();
  });

  it('toggleDropdown opens and closes the dropdown', () => {
    fixture.detectChanges();
    expect(component.showDropdown()).toBeFalse();

    component.toggleDropdown();
    expect(component.showDropdown()).toBeTrue();

    component.toggleDropdown();
    expect(component.showDropdown()).toBeFalse();
  });

  it('does not toggle dropdown when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.toggleDropdown();
    expect(component.showDropdown()).toBeFalse();
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Phone Number');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Phone Number');
  });

  it('shows placeholder on the input', () => {
    fixture.componentRef.setInput('placeholder', 'Enter number');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="tel"]');
    expect(input?.placeholder).toBe('Enter number');
  });

  it('formattedValue includes dialCode and rawDigits', () => {
    fixture.componentRef.setInput('defaultCountry', 'MX');
    fixture.detectChanges();

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: '5512345678' } });
    component.onInput(event);
    fixture.detectChanges();

    expect(component.formattedValue()).toBe('+525512345678');
  });

  it('strips non-digit characters from input', () => {
    fixture.detectChanges();

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: '(55) 1234-5678' } });
    component.onInput(event);
    fixture.detectChanges();

    expect(component.rawDigits()).toBe('5512345678');
  });

  it('shows invalid message when rawDigits is present but invalid', () => {
    fixture.componentRef.setInput('defaultCountry', 'MX');
    fixture.detectChanges();

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: '123' } });
    component.onInput(event);
    fixture.detectChanges();

    const errorMsg = fixture.nativeElement.querySelector('.text-red-500');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toContain('Invalid phone number');
  });

  it('has at least 17 countries in COUNTRIES array', () => {
    fixture.detectChanges();
    expect(component.filteredCountries().length).toBeGreaterThanOrEqual(17);
  });
});
