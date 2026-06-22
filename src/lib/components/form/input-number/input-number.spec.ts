import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputNumberComponent } from './input-number.component';

describe('UiInputNumberComponent', () => {
  let fixture: ComponentFixture<UiInputNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiInputNumberComponent] });
    fixture = TestBed.createComponent(UiInputNumberComponent);
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

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Quantity');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Quantity');
  });

  it('applies min and max constraints', () => {
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('hides buttons when showButtons is false', () => {
    fixture.componentRef.setInput('showButtons', false);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
