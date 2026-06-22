import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCookieBannerComponent } from './cookie-banner.component';

describe('UiCookieBannerComponent', () => {
  let fixture: ComponentFixture<UiCookieBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCookieBannerComponent] });
    fixture = TestBed.createComponent(UiCookieBannerComponent);
    fixture.detectChanges();
  });

  it('renders when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const banner = fixture.nativeElement.querySelector('[class*="fixed"]');
    expect(banner).toBeTruthy();
  });

  it('hides when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    const banner = fixture.nativeElement.querySelector('[class*="fixed"]');
    expect(banner).toBeNull();
  });

  it('emits accepted and sets visible false on accept', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    let emitted = false;
    fixture.componentInstance.accepted.subscribe(() => (emitted = true));
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const acceptBtn = Array.from(buttons as NodeListOf<HTMLButtonElement>).find((b) =>
      b.textContent?.includes('Accept')
    );
    acceptBtn?.click();
    expect(emitted).toBe(true);
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('emits rejected and sets visible false on reject', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    let emitted = false;
    fixture.componentInstance.rejected.subscribe(() => (emitted = true));
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const rejectBtn = Array.from(buttons as NodeListOf<HTMLButtonElement>).find((b) =>
      b.textContent?.includes('Reject')
    );
    rejectBtn?.click();
    expect(emitted).toBe(true);
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('emits settingsClicked when settings button clicked', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('showSettings', true);
    fixture.detectChanges();
    let emitted = false;
    fixture.componentInstance.settingsClicked.subscribe(() => (emitted = true));
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const settingsBtn = Array.from(buttons as NodeListOf<HTMLButtonElement>).find((b) =>
      b.textContent?.includes('Settings')
    );
    settingsBtn?.click();
    expect(emitted).toBe(true);
  });

  it('hides settings button when showSettings is false', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('showSettings', false);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const settingsBtn = Array.from(buttons as NodeListOf<HTMLButtonElement>).find((b) =>
      b.textContent?.includes('Settings')
    );
    expect(settingsBtn).toBeUndefined();
  });

  it('applies bottom class by default', () => {
    expect(fixture.componentInstance.positionClass()).toBe('bottom-0');
  });

  it('applies top class when position is top', () => {
    fixture.componentRef.setInput('position', 'top');
    fixture.detectChanges();
    expect(fixture.componentInstance.positionClass()).toBe('top-0');
  });
});
