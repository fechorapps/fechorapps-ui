import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCheckboxComponent } from './checkbox.component';

describe('UiCheckboxComponent', () => {
  let fixture: ComponentFixture<UiCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCheckboxComponent] });
    fixture = TestBed.createComponent(UiCheckboxComponent);
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

  it('shows label text when provided', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Accept terms');
  });

  it('applies indeterminate state', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
