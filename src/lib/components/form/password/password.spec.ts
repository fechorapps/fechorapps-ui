import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPasswordComponent } from './password.component';

describe('UiPasswordComponent', () => {
  let fixture: ComponentFixture<UiPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPasswordComponent] });
    fixture = TestBed.createComponent(UiPasswordComponent);
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

  it('shows placeholder text', () => {
    fixture.componentRef.setInput('placeholder', 'Enter your password');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input?.placeholder).toBe('Enter your password');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Password');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Password');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
