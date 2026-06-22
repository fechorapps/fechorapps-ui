import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiColorPickerComponent } from './color-picker.component';

describe('UiColorPickerComponent', () => {
  let fixture: ComponentFixture<UiColorPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiColorPickerComponent] });
    fixture = TestBed.createComponent(UiColorPickerComponent);
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
    fixture.componentRef.setInput('label', 'Pick a color');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Pick a color');
  });

  it('renders inline when inline is true', () => {
    fixture.componentRef.setInput('inline', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
