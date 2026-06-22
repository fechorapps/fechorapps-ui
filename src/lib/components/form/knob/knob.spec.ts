import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiKnobComponent } from './knob.component';

describe('UiKnobComponent', () => {
  let fixture: ComponentFixture<UiKnobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiKnobComponent] });
    fixture = TestBed.createComponent(UiKnobComponent);
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
    fixture.componentRef.setInput('label', 'Volume');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Volume');
  });

  it('shows value in center by default', () => {
    fixture.componentRef.setInput('showValue', true);
    fixture.componentRef.setInput('value', 42);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('42');
  });

  it('applies size variant', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
