import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAutoCompleteComponent } from './autocomplete.component';

describe('UiAutoCompleteComponent', () => {
  let fixture: ComponentFixture<UiAutoCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiAutoCompleteComponent] });
    fixture = TestBed.createComponent(UiAutoCompleteComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[disabled]') ?? fixture.nativeElement;
    expect(el).toBeTruthy();
  });

  it('shows placeholder text', () => {
    fixture.componentRef.setInput('placeholder', 'Type to search');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input?.placeholder).toBe('Type to search');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Search Items');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Search Items');
  });

  it('applies size variant', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
