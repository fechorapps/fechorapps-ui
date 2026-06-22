import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiImageCropperComponent } from './image-cropper.component';

describe('UiImageCropperComponent', () => {
  let fixture: ComponentFixture<UiImageCropperComponent>;
  let component: UiImageCropperComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiImageCropperComponent] });
    fixture = TestBed.createComponent(UiImageCropperComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('imageLoaded starts as false', () => {
    fixture.detectChanges();
    expect(component.imageLoaded()).toBe(false);
  });

  it('crop() method exists', () => {
    expect(typeof component.crop).toBe('function');
  });

  it('cropX and cropY start at 20', () => {
    fixture.detectChanges();
    expect(component.cropX()).toBe(20);
    expect(component.cropY()).toBe(20);
  });

  it('cropW and cropH start at 150', () => {
    fixture.detectChanges();
    expect(component.cropW()).toBe(150);
    expect(component.cropH()).toBe(150);
  });

  it('isDragging starts as false', () => {
    fixture.detectChanges();
    expect(component.isDragging()).toBe(false);
  });

  it('stopDrag sets isDragging to false', () => {
    fixture.detectChanges();
    component.isDragging.set(true);
    component.stopDrag();
    expect(component.isDragging()).toBe(false);
  });

  it('cancelled output exists', () => {
    expect(component.cancelled).toBeTruthy();
  });

  it('cropped output exists', () => {
    expect(component.cropped).toBeTruthy();
  });
});
