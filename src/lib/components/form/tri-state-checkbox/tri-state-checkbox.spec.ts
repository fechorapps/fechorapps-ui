import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTriStateCheckboxComponent } from './tri-state-checkbox.component';

describe('UiTriStateCheckboxComponent', () => {
  let fixture: ComponentFixture<UiTriStateCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTriStateCheckboxComponent] });
    fixture = TestBed.createComponent(UiTriStateCheckboxComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button?.disabled).toBeTrue();
  });

  it('shows label text when provided', () => {
    fixture.componentRef.setInput('label', 'Select all');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Select all');
  });

  it('reflects checked state with aria-checked true', () => {
    fixture.componentRef.setInput('value', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('[role="checkbox"]');
    expect(button?.getAttribute('aria-checked')).toBe('true');
  });

  it('reflects indeterminate state with aria-checked mixed', () => {
    fixture.componentRef.setInput('value', null);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('[role="checkbox"]');
    expect(button?.getAttribute('aria-checked')).toBe('mixed');
  });
});
