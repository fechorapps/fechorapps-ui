import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UiLoadingScreenComponent } from './loading-screen.component';

describe('UiLoadingScreenComponent', () => {
  let fixture: ComponentFixture<UiLoadingScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiLoadingScreenComponent] });
    fixture = TestBed.createComponent(UiLoadingScreenComponent);
  });

  it('renders when visible is true (default)', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container).toBeTruthy();
  });

  it('shows the loading message', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading...');
  });

  it('shows a custom message', () => {
    fixture.componentRef.setInput('message', 'Please wait...');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Please wait...');
  });

  it('hides content after 300ms when visible is set to false', fakeAsync(() => {
    fixture.detectChanges();
    // Initially visible
    expect(fixture.nativeElement.querySelector('div')).toBeTruthy();

    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();

    // Still visible during animation (isAnimatingOut = true)
    expect(fixture.nativeElement.querySelector('div')).toBeTruthy();

    // After 300ms animation completes
    tick(300);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div')).toBeFalsy();
  }));

  it('emits hidden after the fade-out animation completes', fakeAsync(() => {
    fixture.detectChanges();
    const hiddenSpy = jasmine.createSpy('hidden');
    fixture.componentInstance.hidden.subscribe(hiddenSpy);

    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();

    expect(hiddenSpy).not.toHaveBeenCalled();

    tick(300);
    fixture.detectChanges();

    expect(hiddenSpy).toHaveBeenCalledTimes(1);
  }));

  it('shows progress bar with correct width when progress is provided', () => {
    fixture.componentRef.setInput('progress', 65);
    fixture.detectChanges();

    const progressBar = fixture.nativeElement.querySelector('[style*="width"]');
    expect(progressBar).toBeTruthy();
    expect(progressBar.style.width).toBe('65%');
  });

  it('shows percentage text when progress is provided', () => {
    fixture.componentRef.setInput('progress', 42);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('42%');
  });

  it('shows spinner when progress is null (indeterminate)', () => {
    fixture.componentRef.setInput('progress', null);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
  });

  it('does not show spinner when progress value is provided', () => {
    fixture.componentRef.setInput('progress', 50);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.animate-spin');
    expect(spinner).toBeFalsy();
  });

  it('applies fixed overlay classes when overlay is true', () => {
    fixture.componentRef.setInput('overlay', true);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('fixed');
    expect(container.className).toContain('inset-0');
  });

  it('applies min-h-screen classes when overlay is false', () => {
    fixture.componentRef.setInput('overlay', false);
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('min-h-screen');
  });
});
