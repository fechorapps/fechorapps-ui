import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiBlockUiComponent } from './block-ui.component';

describe('UiBlockUiComponent', () => {
  let fixture: ComponentFixture<UiBlockUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiBlockUiComponent] });
    fixture = TestBed.createComponent(UiBlockUiComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('does not show overlay when blocked is false', () => {
    fixture.componentRef.setInput('blocked', false);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('[class*="inset-0"]');
    expect(overlay).toBeNull();
  });

  it('shows overlay when blocked is true', () => {
    fixture.componentRef.setInput('blocked', true);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('[class*="bg-black"]');
    expect(overlay).toBeTruthy();
  });

  it('uses absolute positioning for container target', () => {
    fixture.componentRef.setInput('blocked', true);
    fixture.componentRef.setInput('target', 'container');
    fixture.detectChanges();
    expect(fixture.componentInstance.overlayClasses()).toContain('absolute');
    expect(fixture.componentInstance.overlayClasses()).not.toContain('fixed');
  });

  it('uses fixed positioning for document target', () => {
    fixture.componentRef.setInput('blocked', true);
    fixture.componentRef.setInput('target', 'document');
    fixture.detectChanges();
    expect(fixture.componentInstance.overlayClasses()).toContain('fixed');
    expect(fixture.componentInstance.overlayClasses()).not.toContain('absolute');
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'h-64');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('h-64');
  });
});
