import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAppShellComponent } from './app-shell.component';

describe('UiAppShellComponent', () => {
  let fixture: ComponentFixture<UiAppShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiAppShellComponent] });
    fixture = TestBed.createComponent(UiAppShellComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies sidebarWidth when not collapsed', () => {
    fixture.componentRef.setInput('sidebarCollapsed', false);
    fixture.componentRef.setInput('sidebarWidth', '300px');
    fixture.detectChanges();
    const aside = fixture.nativeElement.querySelector('aside');
    expect(aside.style.width).toBe('300px');
  });

  it('applies sidebarCollapsedWidth when collapsed', () => {
    fixture.componentRef.setInput('sidebarCollapsed', true);
    fixture.componentRef.setInput('sidebarCollapsedWidth', '64px');
    fixture.detectChanges();
    const aside = fixture.nativeElement.querySelector('aside');
    expect(aside.style.width).toBe('64px');
  });

  it('hides header when showHeader is false', () => {
    fixture.componentRef.setInput('showHeader', false);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('header');
    expect(header).toBeFalsy();
  });

  it('shows header when showHeader is true', () => {
    fixture.componentRef.setInput('showHeader', true);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('header');
    expect(header).toBeTruthy();
  });
});
