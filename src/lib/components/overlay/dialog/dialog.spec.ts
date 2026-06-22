import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDialogComponent } from './dialog.component';

describe('UiDialogComponent', () => {
  let fixture: ComponentFixture<UiDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiDialogComponent] });
    fixture = TestBed.createComponent(UiDialogComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows dialog when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('hides dialog when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it('displays the header text', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('header', 'My Dialog Title');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('My Dialog Title');
  });

  it('shows close button when closable is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button[aria-label="Close"]')).toBeTruthy();
  });

  it('hides close button when closable is false', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('closable', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button[aria-label="Close"]')).toBeNull();
  });

  it('closes dialog when close button is clicked', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Close"]');
    closeButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBeFalse();
  });

  it('emits onHide when dialog is closed', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const hideSpy = jasmine.createSpy('onHide');
    fixture.componentInstance.onHide.subscribe(hideSpy);
    fixture.componentInstance.close();
    expect(hideSpy).toHaveBeenCalled();
  });
});
