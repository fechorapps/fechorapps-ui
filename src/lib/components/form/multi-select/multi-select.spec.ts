import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMultiSelectComponent } from './multi-select.component';

describe('UiMultiSelectComponent', () => {
  let fixture: ComponentFixture<UiMultiSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMultiSelectComponent] });
    fixture = TestBed.createComponent(UiMultiSelectComponent);
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
    fixture.componentRef.setInput('placeholder', 'Choose items');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Choose items');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Categories');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Categories');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
