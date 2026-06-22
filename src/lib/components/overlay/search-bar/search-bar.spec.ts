import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSearchBarComponent } from './search-bar.component';

describe('UiSearchBarComponent', () => {
  let fixture: ComponentFixture<UiSearchBarComponent>;
  let component: UiSearchBarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSearchBarComponent] });
    fixture = TestBed.createComponent(UiSearchBarComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('has empty value by default', () => {
    fixture.detectChanges();
    expect(component.value()).toBe('');
  });

  it('value model reflects inputValue signal', () => {
    fixture.detectChanges();
    component.inputValue.set('hello');
    component.value.set('hello');
    expect(component.value()).toBe('hello');
    expect(component.inputValue()).toBe('hello');
  });

  it('clearValue resets value and emits cleared', () => {
    let clearedEmitted = false;
    fixture.detectChanges();

    component.value.set('some query');
    component.inputValue.set('some query');
    component.cleared.subscribe(() => (clearedEmitted = true));

    component.clearValue();

    expect(component.value()).toBe('');
    expect(component.inputValue()).toBe('');
    expect(clearedEmitted).toBe(true);
  });

  it('showDropdown is false when not focused', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('suggestions', [{ label: 'test' }]);
    });
    fixture.detectChanges();
    expect(component.showDropdown()).toBe(false);
  });

  it('showDropdown is true when focused and suggestions exist', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('suggestions', [{ label: 'test' }]);
    });
    fixture.detectChanges();
    component.focused.set(true);
    expect(component.showDropdown()).toBe(true);
  });

  it('selectSuggestion sets value and emits suggestionSelected', () => {
    let emitted = '';
    fixture.detectChanges();
    component.suggestionSelected.subscribe((v) => (emitted = v));
    component.selectSuggestion({ label: 'Angular' });
    expect(component.value()).toBe('Angular');
    expect(emitted).toBe('Angular');
  });
});
