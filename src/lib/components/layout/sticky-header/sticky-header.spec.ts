import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiStickyHeaderComponent } from './sticky-header.component';

describe('UiStickyHeaderComponent', () => {
  let fixture: ComponentFixture<UiStickyHeaderComponent>;
  let component: UiStickyHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiStickyHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiStickyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the component', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders a header element', () => {
    const header = fixture.nativeElement.querySelector('header');
    expect(header).toBeTruthy();
  });

  it('isScrolled defaults to false', () => {
    expect(component.isScrolled()).toBeFalse();
  });

  it('isVisible defaults to true', () => {
    expect(component.isVisible()).toBeTrue();
  });

  it('headerClass includes sticky and transition classes by default', () => {
    const cls = component.headerClass();
    expect(cls).toContain('sticky');
    expect(cls).toContain('top-0');
    expect(cls).toContain('transition-all');
    expect(cls).toContain('duration-300');
  });

  it('headerClass includes bg-transparent when not scrolled', () => {
    expect(component.isScrolled()).toBeFalse();
    expect(component.headerClass()).toContain('bg-transparent');
  });

  it('headerClass includes backdrop-blur when scrolled and blur is true', () => {
    fixture.componentRef.setInput('blur', true);
    component.isScrolled.set(true);
    fixture.detectChanges();
    expect(component.headerClass()).toContain('backdrop-blur-md');
    expect(component.headerClass()).toContain('bg-background/80');
    expect(component.headerClass()).toContain('border-b');
    expect(component.headerClass()).toContain('border-border');
    expect(component.headerClass()).toContain('shadow-sm');
  });

  it('headerClass does not include backdrop-blur when scrolled but blur is false', () => {
    fixture.componentRef.setInput('blur', false);
    component.isScrolled.set(true);
    fixture.detectChanges();
    expect(component.headerClass()).not.toContain('backdrop-blur-md');
  });

  it('headerClass includes py-2 when scrolled and shrink is true', () => {
    fixture.componentRef.setInput('shrink', true);
    component.isScrolled.set(true);
    fixture.detectChanges();
    expect(component.headerClass()).toContain('py-2');
  });

  it('headerClass includes py-4 when scrolled and shrink is false', () => {
    fixture.componentRef.setInput('shrink', false);
    component.isScrolled.set(true);
    fixture.detectChanges();
    expect(component.headerClass()).toContain('py-4');
  });

  it('headerClass includes -translate-y-full when isVisible is false', () => {
    component.isVisible.set(false);
    fixture.detectChanges();
    expect(component.headerClass()).toContain('-translate-y-full');
  });

  it('headerClass does not include -translate-y-full when isVisible is true', () => {
    component.isVisible.set(true);
    fixture.detectChanges();
    expect(component.headerClass()).not.toContain('-translate-y-full');
  });

  it('headerClass uses provided zIndex', () => {
    fixture.componentRef.setInput('zIndex', 100);
    fixture.detectChanges();
    expect(component.headerClass()).toContain('z-[100]');
  });

  it('isScrolled becomes true after scroll past threshold', () => {
    fixture.componentRef.setInput('scrollThreshold', 60);
    fixture.detectChanges();

    // Simulate scrollY past threshold
    Object.defineProperty(window, 'scrollY', { value: 80, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();

    expect(component.isScrolled()).toBeTrue();
  });

  it('isScrolled becomes false when below threshold', () => {
    fixture.componentRef.setInput('scrollThreshold', 60);
    fixture.detectChanges();

    // Scroll past threshold first
    Object.defineProperty(window, 'scrollY', { value: 80, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();
    expect(component.isScrolled()).toBeTrue();

    // Scroll back above threshold
    Object.defineProperty(window, 'scrollY', { value: 30, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();
    expect(component.isScrolled()).toBeFalse();
  });

  it('isVisible becomes false on scroll down when hideOnScrollDown is true', () => {
    fixture.componentRef.setInput('hideOnScrollDown', true);
    fixture.detectChanges();

    // Simulate scroll down past threshold
    Object.defineProperty(window, 'scrollY', { value: 70, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();

    // Now scroll down further
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();

    expect(component.isVisible()).toBeFalse();
  });

  it('isVisible becomes true when scrolling up with hideOnScrollDown enabled', () => {
    fixture.componentRef.setInput('hideOnScrollDown', true);
    fixture.detectChanges();

    // Scroll down to hide
    Object.defineProperty(window, 'scrollY', { value: 70, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();
    expect(component.isVisible()).toBeFalse();

    // Scroll back up
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();
    expect(component.isVisible()).toBeTrue();
  });

  it('isVisible stays true when hideOnScrollDown is false even while scrolling down', () => {
    fixture.componentRef.setInput('hideOnScrollDown', false);
    fixture.detectChanges();

    Object.defineProperty(window, 'scrollY', { value: 70, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true, configurable: true });
    (component as unknown as { onScroll(): void }).onScroll();

    expect(component.isVisible()).toBeTrue();
  });

  it('ngOnDestroy does not throw', () => {
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
