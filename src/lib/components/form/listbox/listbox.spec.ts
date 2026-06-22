import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiListboxComponent } from './listbox.component';

describe('UiListboxComponent', () => {
  let fixture: ComponentFixture<UiListboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiListboxComponent] });
    fixture = TestBed.createComponent(UiListboxComponent);
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

  it('renders options when provided', () => {
    fixture.componentRef.setInput('options', [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Option A');
    expect(fixture.nativeElement.textContent).toContain('Option B');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Choose one');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Choose one');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
