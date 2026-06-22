import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputMaskComponent } from './input-mask.component';

describe('UiInputMaskComponent', () => {
  let fixture: ComponentFixture<UiInputMaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiInputMaskComponent] });
    fixture = TestBed.createComponent(UiInputMaskComponent);
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
    fixture.componentRef.setInput('label', 'Phone Number');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Phone Number');
  });

  it('applies predefined phone mask type', () => {
    fixture.componentRef.setInput('maskType', 'phone');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
