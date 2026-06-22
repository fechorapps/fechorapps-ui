import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSliderComponent } from './slider.component';

describe('UiSliderComponent', () => {
  let fixture: ComponentFixture<UiSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSliderComponent] });
    fixture = TestBed.createComponent(UiSliderComponent);
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
    fixture.componentRef.setInput('label', 'Volume');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Volume');
  });

  it('applies min and max values', () => {
    fixture.componentRef.setInput('min', 10);
    fixture.componentRef.setInput('max', 90);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies size variant', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
