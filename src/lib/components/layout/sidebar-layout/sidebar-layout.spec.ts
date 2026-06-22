import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSidebarLayoutComponent } from './sidebar-layout.component';

describe('UiSidebarLayoutComponent', () => {
  let fixture: ComponentFixture<UiSidebarLayoutComponent>;
  let component: UiSidebarLayoutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSidebarLayoutComponent] });
    fixture = TestBed.createComponent(UiSidebarLayoutComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows sidebar when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const aside = fixture.nativeElement.querySelector('aside');
    expect(aside).toBeTruthy();
  });

  it('hides sidebar when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    const aside = fixture.nativeElement.querySelector('aside');
    expect(aside).toBeFalsy();
  });

  it('applies left position by default', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).not.toContain('flex-row-reverse');
  });

  it('applies right position when position is right', () => {
    fixture.componentRef.setInput('position', 'right');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('flex-row-reverse');
  });

  it('toggles visible and emits events', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const hideSpy = jasmine.createSpy('onHide');
    component.onHide.subscribe(hideSpy);

    component.toggle();
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(hideSpy).toHaveBeenCalled();
  });

  it('emits onShow when toggled from hidden to visible', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();

    const showSpy = jasmine.createSpy('onShow');
    component.onShow.subscribe(showSpy);

    component.toggle();
    fixture.detectChanges();

    expect(component.visible()).toBe(true);
    expect(showSpy).toHaveBeenCalled();
  });

  it('applies width to sidebar', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('width', '320px');
    fixture.detectChanges();
    const aside = fixture.nativeElement.querySelector('aside');
    expect(aside.style.width).toBe('320px');
  });
});
