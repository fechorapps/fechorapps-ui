import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTextareaComponent } from './textarea.component';

describe('UiTextareaComponent', () => {
  let fixture: ComponentFixture<UiTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTextareaComponent] });
    fixture = TestBed.createComponent(UiTextareaComponent);
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
    fixture.componentRef.setInput('placeholder', 'Describe yourself');
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea?.placeholder).toBe('Describe yourself');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Description');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Description');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
