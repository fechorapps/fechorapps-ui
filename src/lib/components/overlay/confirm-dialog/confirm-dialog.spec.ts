import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiConfirmDialogComponent } from './confirm-dialog.component';

describe('UiConfirmDialogComponent', () => {
  let fixture: ComponentFixture<UiConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiConfirmDialogComponent] });
    fixture = TestBed.createComponent(UiConfirmDialogComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows dialog when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alertdialog"]')).toBeTruthy();
  });

  it('hides dialog when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alertdialog"]')).toBeNull();
  });

  it('displays the header text', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('header', 'Delete Item');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Delete Item');
  });

  it('displays the message text', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('message', 'This action cannot be undone.');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('This action cannot be undone.');
  });

  it('displays custom accept and reject labels', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('acceptLabel', 'Confirm');
    fixture.componentRef.setInput('rejectLabel', 'Cancel');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Confirm');
    expect(fixture.nativeElement.textContent).toContain('Cancel');
  });

  it('emits onAccept when accept button is clicked', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const acceptSpy = jasmine.createSpy('onAccept');
    fixture.componentInstance.onAccept.subscribe(acceptSpy);
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const acceptButton = Array.from(buttons as NodeListOf<HTMLButtonElement>).find((b) =>
      b.textContent?.trim() === fixture.componentInstance.acceptLabel()
    );
    acceptButton?.click();
    expect(acceptSpy).toHaveBeenCalled();
  });

  it('emits onReject when reject button is clicked', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const rejectSpy = jasmine.createSpy('onReject');
    fixture.componentInstance.onReject.subscribe(rejectSpy);
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const rejectButton = Array.from(buttons as NodeListOf<HTMLButtonElement>).find((b) =>
      b.textContent?.trim() === fixture.componentInstance.rejectLabel()
    );
    rejectButton?.click();
    expect(rejectSpy).toHaveBeenCalled();
  });

  it('hides close button when closable is false', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('closable', false);
    fixture.detectChanges();
    const closeButton = fixture.nativeElement.querySelector('button[aria-label="Close"]');
    expect(closeButton).toBeNull();
  });
});
