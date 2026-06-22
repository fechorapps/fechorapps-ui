import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPopoverComponent } from './popover.component';

describe('UiPopoverComponent', () => {
  let fixture: ComponentFixture<UiPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPopoverComponent] });
    fixture = TestBed.createComponent(UiPopoverComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders the popover dialog element', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('shows popover with opacity-100 class when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const dialog: HTMLElement = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog.classList.contains('opacity-100')).toBeTrue();
  });

  it('hides popover with opacity-0 class when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    const dialog: HTMLElement = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog.classList.contains('opacity-0')).toBeTrue();
  });

  it('shows close button when showCloseIcon is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('showCloseIcon', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button[aria-label="Close"]')).toBeTruthy();
  });

  it('hides close button when showCloseIcon is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.componentRef.setInput('showCloseIcon', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button[aria-label="Close"]')).toBeNull();
  });

  it('emits onShow when show() is called', () => {
    fixture.detectChanges();
    const showSpy = jasmine.createSpy('onShow');
    fixture.componentInstance.onShow.subscribe(showSpy);
    fixture.componentInstance.show();
    expect(showSpy).toHaveBeenCalled();
  });

  it('emits onHide when hide() is called', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const hideSpy = jasmine.createSpy('onHide');
    fixture.componentInstance.onHide.subscribe(hideSpy);
    fixture.componentInstance.hide();
    expect(hideSpy).toHaveBeenCalled();
  });

  it('toggle sets visible to true when it was false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    fixture.componentInstance.toggle();
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBeTrue();
  });
});
