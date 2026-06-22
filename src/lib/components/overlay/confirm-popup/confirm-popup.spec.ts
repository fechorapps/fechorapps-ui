import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiConfirmPopupComponent } from './confirm-popup.component';

describe('UiConfirmPopupComponent', () => {
  let fixture: ComponentFixture<UiConfirmPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiConfirmPopupComponent] });
    fixture = TestBed.createComponent(UiConfirmPopupComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows popup content when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    // When visible the popup has opacity-100 class
    const popup = fixture.nativeElement.querySelector('.opacity-100');
    expect(popup).toBeTruthy();
  });

  it('hides popup when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    // When not visible the popup has pointer-events-none
    const popup = fixture.nativeElement.querySelector('.pointer-events-none');
    expect(popup).toBeTruthy();
  });

  it('displays the message text', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('message', 'Are you really sure?');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Are you really sure?');
  });

  it('displays custom accept and reject labels', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('acceptLabel', 'OK');
    fixture.componentRef.setInput('rejectLabel', 'Nope');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('OK');
    expect(fixture.nativeElement.textContent).toContain('Nope');
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
});
