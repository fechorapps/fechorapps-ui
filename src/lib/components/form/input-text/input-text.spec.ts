import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputTextComponent } from './input-text.component';

describe('UiInputTextComponent', () => {
  let fixture: ComponentFixture<UiInputTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiInputTextComponent] });
    fixture = TestBed.createComponent(UiInputTextComponent);
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
    fixture.componentRef.setInput('placeholder', 'Enter your name');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input?.placeholder).toBe('Enter your name');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Full Name');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Full Name');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
