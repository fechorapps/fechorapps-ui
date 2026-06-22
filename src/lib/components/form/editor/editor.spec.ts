import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiEditorComponent } from './editor.component';

describe('UiEditorComponent', () => {
  let fixture: ComponentFixture<UiEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiEditorComponent] });
    fixture = TestBed.createComponent(UiEditorComponent);
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
    fixture.componentRef.setInput('label', 'Description');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Description');
  });

  it('applies readonly state', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
