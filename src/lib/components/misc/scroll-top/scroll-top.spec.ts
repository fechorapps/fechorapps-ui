import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiScrollTopComponent } from './scroll-top.component';

describe('UiScrollTopComponent', () => {
  let fixture: ComponentFixture<UiScrollTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiScrollTopComponent] });
    fixture = TestBed.createComponent(UiScrollTopComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('is hidden by default (visible signal is false)', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('applies opacity-0 and pointer-events-none when not visible', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('opacity-0');
    expect(fixture.componentInstance.containerClasses()).toContain('pointer-events-none');
  });

  it('applies opacity-100 when visible', () => {
    fixture.detectChanges();
    fixture.componentInstance.visible.set(true);
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('opacity-100');
    expect(fixture.componentInstance.containerClasses()).not.toContain('opacity-0');
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'bottom-4');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('bottom-4');
  });

  it('becomes visible when scroll position exceeds threshold', () => {
    fixture.componentRef.setInput('threshold', 100);
    fixture.detectChanges();

    // Simulate scroll beyond threshold
    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
    fixture.componentInstance['onScroll']();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(true);
  });

  it('remains hidden when scroll position is below threshold', () => {
    fixture.componentRef.setInput('threshold', 400);
    fixture.detectChanges();

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    fixture.componentInstance['onScroll']();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
  });
});
