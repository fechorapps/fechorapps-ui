import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDrawerComponent } from './drawer.component';

describe('UiDrawerComponent', () => {
  let fixture: ComponentFixture<UiDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiDrawerComponent] });
    fixture = TestBed.createComponent(UiDrawerComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders dialog element always', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('sets aria-hidden false when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const dialog: HTMLElement = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog.getAttribute('aria-hidden')).toBe('false');
  });

  it('sets aria-hidden true when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    const dialog: HTMLElement = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog.getAttribute('aria-hidden')).toBe('true');
  });

  it('displays the header text', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('header', 'Settings Panel');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Settings Panel');
  });

  it('shows close button when showCloseIcon and closable are true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('showCloseIcon', true);
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button[aria-label="Close"]')).toBeTruthy();
  });

  it('hides close button when showCloseIcon is false', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('showCloseIcon', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button[aria-label="Close"]')).toBeNull();
  });

  it('emits onShow when visible becomes true', () => {
    const showSpy = jasmine.createSpy('onShow');
    fixture.componentInstance.onShow.subscribe(showSpy);
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    expect(showSpy).toHaveBeenCalled();
  });

  it('emits onHide when close() is called', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const hideSpy = jasmine.createSpy('onHide');
    fixture.componentInstance.onHide.subscribe(hideSpy);
    fixture.componentInstance.close();
    expect(hideSpy).toHaveBeenCalled();
  });
});
