import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiImageComponent } from './image.component';

describe('UiImageComponent', () => {
  let fixture: ComponentFixture<UiImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiImageComponent] });
    fixture = TestBed.createComponent(UiImageComponent);
    fixture.componentRef.setInput('src', 'test.jpg');
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('includes cursor-pointer class when preview is enabled', () => {
    fixture.componentRef.setInput('preview', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.imageClasses()).toContain('cursor-pointer');
  });

  it('does not include cursor-pointer class when preview is disabled', () => {
    fixture.componentRef.setInput('preview', false);
    fixture.detectChanges();
    expect(fixture.componentInstance.imageClasses()).not.toContain('cursor-pointer');
  });

  it('applies containerClass to container classes', () => {
    fixture.componentRef.setInput('containerClass', 'my-container');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('my-container');
  });

  it('applies imageClass to image classes', () => {
    fixture.componentRef.setInput('imageClass', 'rounded-lg');
    fixture.detectChanges();
    expect(fixture.componentInstance.imageClasses()).toContain('rounded-lg');
  });

  it('opens preview when showPreview is called and preview is enabled', () => {
    fixture.componentRef.setInput('preview', true);
    fixture.detectChanges();
    fixture.componentInstance.showPreview();
    expect(fixture.componentInstance.previewVisible()).toBe(true);
  });

  it('does not open preview when preview is disabled', () => {
    fixture.componentRef.setInput('preview', false);
    fixture.detectChanges();
    fixture.componentInstance.showPreview();
    expect(fixture.componentInstance.previewVisible()).toBe(false);
  });

  it('hides preview and emits onHide', () => {
    fixture.componentRef.setInput('preview', true);
    fixture.detectChanges();
    fixture.componentInstance.showPreview();

    const spy = jasmine.createSpy('onHide');
    fixture.componentInstance.onHide.subscribe(spy);
    fixture.componentInstance.hidePreview();

    expect(fixture.componentInstance.previewVisible()).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('increments scale on zoomIn', () => {
    fixture.detectChanges();
    const initial = fixture.componentInstance.scale();
    fixture.componentInstance.zoomIn();
    expect(fixture.componentInstance.scale()).toBeGreaterThan(initial);
  });

  it('decrements scale on zoomOut', () => {
    fixture.detectChanges();
    fixture.componentInstance.zoomIn();
    const afterZoomIn = fixture.componentInstance.scale();
    fixture.componentInstance.zoomOut();
    expect(fixture.componentInstance.scale()).toBeLessThan(afterZoomIn);
  });

  it('increments rotation by 90 on rotateRight', () => {
    fixture.detectChanges();
    fixture.componentInstance.rotateRight();
    expect(fixture.componentInstance.rotation()).toBe(90);
  });
});
