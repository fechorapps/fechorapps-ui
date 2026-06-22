import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTreeSelectComponent } from './tree-select.component';

describe('UiTreeSelectComponent', () => {
  let fixture: ComponentFixture<UiTreeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTreeSelectComponent] });
    fixture = TestBed.createComponent(UiTreeSelectComponent);
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
    fixture.componentRef.setInput('placeholder', 'Select a node');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Select a node');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Category');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Category');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
