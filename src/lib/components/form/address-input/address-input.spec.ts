import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UiAddressInputComponent } from './address-input.component';
import type { AddressSuggestion } from './address-input.component';

const MOCK_SUGGESTIONS: AddressSuggestion[] = [
  { id: '1', label: '123 Main St, Springfield', value: { street: '123 Main St', city: 'Springfield', raw: '123 Main' } },
  { id: '2', label: '456 Oak Ave, Shelbyville', value: { street: '456 Oak Ave', city: 'Shelbyville', raw: '456 Oak' } },
];

const mockSearchFn = async (q: string): Promise<AddressSuggestion[]> =>
  MOCK_SUGGESTIONS.filter(s => s.label.toLowerCase().includes(q.toLowerCase()));

const emptySearchFn = async (_q: string): Promise<AddressSuggestion[]> => [];

describe('UiAddressInputComponent', () => {
  let fixture: ComponentFixture<UiAddressInputComponent>;
  let component: UiAddressInputComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiAddressInputComponent] });
    fixture = TestBed.createComponent(UiAddressInputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('searchFn', mockSearchFn);
    fixture.detectChanges();
  });

  it('renders the component', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  // =========================================================================
  // minChars guard
  // =========================================================================

  it('does not call searchFn when query is below minChars', fakeAsync(() => {
    const spy = jasmine.createSpy('searchFn').and.returnValue(Promise.resolve(MOCK_SUGGESTIONS));
    fixture.componentRef.setInput('searchFn', spy);
    fixture.detectChanges();

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'ab' } }); // 2 chars < minChars(3)
    component.onQueryInput(event);
    tick(500);

    expect(spy).not.toHaveBeenCalled();
    expect(component.suggestions()).toEqual([]);
  }));

  it('clears suggestions when query drops below minChars', fakeAsync(() => {
    // First bring suggestions in
    component.suggestions.set(MOCK_SUGGESTIONS);
    component.showDropdown.set(true);

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'ab' } });
    component.onQueryInput(event);
    tick(10);

    expect(component.suggestions()).toEqual([]);
    expect(component.showDropdown()).toBeFalse();
  }));

  // =========================================================================
  // Debounce + searchFn call
  // =========================================================================

  it('calls searchFn after debounce when query meets minChars', fakeAsync(() => {
    const spy = jasmine.createSpy('searchFn').and.returnValue(Promise.resolve(MOCK_SUGGESTIONS));
    fixture.componentRef.setInput('searchFn', spy);
    fixture.componentRef.setInput('debounceMs', 200);
    fixture.detectChanges();

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'Main' } });
    component.onQueryInput(event);

    expect(spy).not.toHaveBeenCalled(); // not yet

    tick(200); // debounce fires
    expect(spy).toHaveBeenCalledWith('Main');
  }));

  it('sets loading=true while searchFn is in-flight and loading=false after', fakeAsync(() => {
    let resolveSearch!: (v: AddressSuggestion[]) => void;
    const pendingSearch = new Promise<AddressSuggestion[]>(r => (resolveSearch = r));
    fixture.componentRef.setInput('searchFn', () => pendingSearch);
    fixture.componentRef.setInput('debounceMs', 0);
    fixture.detectChanges();

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'Main' } });
    component.onQueryInput(event);
    tick(0); // debounce fires

    expect(component.loading()).toBeTrue();

    resolveSearch(MOCK_SUGGESTIONS);
    tick(0);

    expect(component.loading()).toBeFalse();
    expect(component.suggestions()).toEqual(MOCK_SUGGESTIONS);
  }));

  it('shows dropdown after search returns results', fakeAsync(() => {
    fixture.componentRef.setInput('searchFn', async () => MOCK_SUGGESTIONS);
    fixture.componentRef.setInput('debounceMs', 0);
    fixture.detectChanges();

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'Main' } });
    component.onQueryInput(event);
    tick(0);

    expect(component.showDropdown()).toBeTrue();
  }));

  // =========================================================================
  // selectSuggestion
  // =========================================================================

  it('selectSuggestion sets value, query, closes dropdown, and emits addressSelected', () => {
    const emitSpy = jasmine.createSpy('addressSelected');
    component.addressSelected.subscribe(emitSpy);
    component.showDropdown.set(true);

    const s = MOCK_SUGGESTIONS[0];
    component.selectSuggestion(s);

    expect(component.value()).toEqual(s.value);
    expect(component.query()).toBe(s.label);
    expect(component.showDropdown()).toBeFalse();
    expect(emitSpy).toHaveBeenCalledWith(s.value);
  });

  // =========================================================================
  // Manual entry form
  // =========================================================================

  it('showManualForm is false by default', () => {
    expect(component.showManualForm()).toBeFalse();
  });

  it('toggleManualForm shows the manual entry form', () => {
    component.toggleManualForm();
    expect(component.showManualForm()).toBeTrue();
  });

  it('toggleManualForm hides the manual entry form when called again', () => {
    component.showManualForm.set(true);
    component.toggleManualForm();
    expect(component.showManualForm()).toBeFalse();
  });

  it('manual entry form appears in DOM when showManualForm is true', () => {
    fixture.componentRef.setInput('showManualEntry', true);
    component.showManualForm.set(true);
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('.grid');
    expect(form).toBeTruthy();
  });

  it('"Enter address manually" button is rendered when showManualEntry=true', () => {
    fixture.componentRef.setInput('showManualEntry', true);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button[type="button"]');
    expect(btn).toBeTruthy();
  });

  it('"Enter address manually" button is not rendered when showManualEntry=false', () => {
    fixture.componentRef.setInput('showManualEntry', false);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).not.toContain('Enter address manually');
  });

  it('applyManualValue sets value, emits addressSelected, and hides form', () => {
    const emitSpy = jasmine.createSpy('addressSelected');
    component.addressSelected.subscribe(emitSpy);

    component.showManualForm.set(true);
    component.manualValue.set({ street: '1 Elm St', city: 'Portland', state: 'OR', postalCode: '97201', country: 'US' });

    component.applyManualValue();

    expect(component.value()).toEqual({ street: '1 Elm St', city: 'Portland', state: 'OR', postalCode: '97201', country: 'US' });
    expect(emitSpy).toHaveBeenCalledWith({ street: '1 Elm St', city: 'Portland', state: 'OR', postalCode: '97201', country: 'US' });
    expect(component.showManualForm()).toBeFalse();
  });

  it('onManualFieldInput updates the correct field in manualValue', () => {
    component.manualValue.set({});

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: 'Chicago' } });
    component.onManualFieldInput('city', event);

    expect(component.manualValue().city).toBe('Chicago');
  });

  // =========================================================================
  // clearValue
  // =========================================================================

  it('clearValue resets value, query, and suggestions', () => {
    component.value.set({ raw: 'Something' });
    component.query.set('Something');
    component.suggestions.set(MOCK_SUGGESTIONS);
    component.showDropdown.set(true);

    component.clearValue();

    expect(component.value()).toBeNull();
    expect(component.query()).toBe('');
    expect(component.suggestions()).toEqual([]);
    expect(component.showDropdown()).toBeFalse();
  });

  // =========================================================================
  // Disabled state
  // =========================================================================

  it('renders input as disabled when disabled=true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input?.disabled).toBeTrue();
  });

  it('does not show "Enter manually" button when disabled=true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('showManualEntry', true);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).not.toContain('Enter address manually');
  });

  // =========================================================================
  // Placeholder
  // =========================================================================

  it('uses the placeholder input on the text input', () => {
    fixture.componentRef.setInput('placeholder', 'Find a location');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input?.placeholder).toBe('Find a location');
  });
});
