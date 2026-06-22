import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiQrCodeComponent } from './qr-code.component';

describe('UiQrCodeComponent', () => {
  let fixture: ComponentFixture<UiQrCodeComponent>;
  let component: UiQrCodeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiQrCodeComponent] });
    fixture = TestBed.createComponent(UiQrCodeComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('dataUrl starts as empty string', () => {
    fixture.detectChanges();
    expect(component.dataUrl()).toBe('');
  });

  it('download method exists', () => {
    expect(typeof component.download).toBe('function');
  });

  it('size defaults to 200', () => {
    fixture.detectChanges();
    expect(component.size()).toBe(200);
  });

  it('errorCorrectionLevel defaults to M', () => {
    fixture.detectChanges();
    expect(component.errorCorrectionLevel()).toBe('M');
  });

  it('color defaults to #000000', () => {
    fixture.detectChanges();
    expect(component.color()).toBe('#000000');
  });

  it('backgroundColor defaults to #ffffff', () => {
    fixture.detectChanges();
    expect(component.backgroundColor()).toBe('#ffffff');
  });

  it('showValue defaults to false', () => {
    fixture.detectChanges();
    expect(component.showValue()).toBe(false);
  });

  it('value defaults to empty string', () => {
    fixture.detectChanges();
    expect(component.value()).toBe('');
  });
});
