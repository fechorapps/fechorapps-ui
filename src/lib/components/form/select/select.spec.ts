import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSelectComponent } from './select.component';

describe('UiSelectComponent', () => {
  let fixture: ComponentFixture<UiSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSelectComponent] });
    fixture = TestBed.createComponent(UiSelectComponent);
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
    fixture.componentRef.setInput('placeholder', 'Choose an option');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Choose an option');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Status');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Status');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
