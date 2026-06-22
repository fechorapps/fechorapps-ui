import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiGalleriaComponent, GalleriaImage } from './galleria.component';

const IMAGES: GalleriaImage[] = [
  { src: 'img1.jpg', alt: 'Image 1', title: 'First' },
  { src: 'img2.jpg', alt: 'Image 2', title: 'Second' },
  { src: 'img3.jpg', alt: 'Image 3', title: 'Third' },
];

describe('UiGalleriaComponent', () => {
  let fixture: ComponentFixture<UiGalleriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiGalleriaComponent] });
    fixture = TestBed.createComponent(UiGalleriaComponent);
  });

  it('renders', () => {
    fixture.componentRef.setInput('value', IMAGES);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('starts at index 0 by default', () => {
    fixture.componentRef.setInput('value', IMAGES);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentIndex()).toBe(0);
  });

  it('computes currentImage from value and currentIndex', () => {
    fixture.componentRef.setInput('value', IMAGES);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentImage()).toEqual(IMAGES[0]);
  });

  it('navigates to next image', () => {
    fixture.componentRef.setInput('value', IMAGES);
    fixture.detectChanges();
    fixture.componentInstance.next();
    expect(fixture.componentInstance.currentIndex()).toBe(1);
  });

  it('navigates to previous image', () => {
    fixture.componentRef.setInput('value', IMAGES);
    fixture.detectChanges();
    fixture.componentInstance.next();
    fixture.componentInstance.prev();
    expect(fixture.componentInstance.currentIndex()).toBe(0);
  });

  it('emits activeIndexChange on navigation', () => {
    fixture.componentRef.setInput('value', IMAGES);
    fixture.detectChanges();

    const spy = jasmine.createSpy('activeIndexChange');
    fixture.componentInstance.activeIndexChange.subscribe(spy);
    fixture.componentInstance.next();

    expect(spy).toHaveBeenCalledWith({ index: 1 });
  });

  it('opens and closes fullscreen', () => {
    fixture.componentRef.setInput('value', IMAGES);
    fixture.detectChanges();

    fixture.componentInstance.openFullScreen();
    expect(fixture.componentInstance.isFullScreen()).toBe(true);

    fixture.componentInstance.closeFullScreen();
    expect(fixture.componentInstance.isFullScreen()).toBe(false);
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('value', IMAGES);
    fixture.componentRef.setInput('styleClass', 'custom-gallery');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('custom-gallery');
  });
});
