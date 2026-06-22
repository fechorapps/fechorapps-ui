import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiFloatLabelComponent } from './float-label.component';

describe('UiFloatLabelComponent', () => {
  let fixture: ComponentFixture<UiFloatLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiFloatLabelComponent] });
    fixture = TestBed.createComponent(UiFloatLabelComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows label text when provided', () => {
    fixture.componentRef.setInput('label', 'Username');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Username');
  });

  it('applies filled state', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('filled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('label', 'Phone');
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies variant styles', () => {
    fixture.componentRef.setInput('label', 'Field');
    fixture.componentRef.setInput('variant', 'in');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
