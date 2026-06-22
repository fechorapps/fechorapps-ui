import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMaintenancePageComponent } from './maintenance-page.component';

describe('UiMaintenancePageComponent', () => {
  let fixture: ComponentFixture<UiMaintenancePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMaintenancePageComponent] });
    fixture = TestBed.createComponent(UiMaintenancePageComponent);
    fixture.detectChanges();
  });

  it('renders with default title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('Under Maintenance');
  });

  it('renders custom title', () => {
    fixture.componentRef.setInput('title', 'System Upgrade');
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('System Upgrade');
  });

  it('renders message', () => {
    fixture.componentRef.setInput('message', 'Back at midnight.');
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p?.textContent?.trim()).toBe('Back at midnight.');
  });

  it('shows estimated time when provided and showCountdown is false', () => {
    fixture.componentRef.setInput('estimatedTime', 'Monday 6:00 AM');
    fixture.componentRef.setInput('showCountdown', false);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Monday 6:00 AM');
  });

  it('does not show estimated time when showCountdown is true', () => {
    const future = new Date(Date.now() + 3600 * 1000);
    fixture.componentRef.setInput('estimatedTime', 'Monday 6:00 AM');
    fixture.componentRef.setInput('showCountdown', true);
    fixture.componentRef.setInput('returnTime', future);
    fixture.detectChanges();
    const estimatedDiv = fixture.nativeElement.querySelector('[class*="bg-accent"]');
    expect(estimatedDiv).toBeNull();
  });

  it('shows countdown when showCountdown is true and returnTime is set', () => {
    const future = new Date(Date.now() + 3600 * 1000);
    fixture.componentRef.setInput('showCountdown', true);
    fixture.componentRef.setInput('returnTime', future);
    fixture.detectChanges();
    expect(fixture.componentInstance.countdown()).toBeTruthy();
    expect(fixture.componentInstance.formattedCountdown()).toBeTruthy();
  });

  it('shows contact link when contactEmail is set', () => {
    fixture.componentRef.setInput('contactEmail', 'help@example.com');
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a[href^="mailto:"]');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('mailto:help@example.com');
  });

  it('hides contact link when contactEmail is null', () => {
    fixture.componentRef.setInput('contactEmail', null);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a[href^="mailto:"]');
    expect(link).toBeNull();
  });

  it('computes mailtoLink correctly', () => {
    fixture.componentRef.setInput('contactEmail', 'test@test.com');
    fixture.detectChanges();
    expect(fixture.componentInstance.mailtoLink()).toBe('mailto:test@test.com');
  });

  it('mailtoLink returns null when no email', () => {
    fixture.componentRef.setInput('contactEmail', null);
    fixture.detectChanges();
    expect(fixture.componentInstance.mailtoLink()).toBeNull();
  });
});
