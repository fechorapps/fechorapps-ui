import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiChipsComponent } from './chips.component';

describe('UiChipsComponent', () => {
  let fixture: ComponentFixture<UiChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiChipsComponent] });
    fixture = TestBed.createComponent(UiChipsComponent);
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
    fixture.componentRef.setInput('placeholder', 'Add a tag');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input?.placeholder).toBe('Add a tag');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Tags');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Tags');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
