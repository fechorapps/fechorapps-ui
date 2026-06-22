import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTooltipComponent } from './tooltip.component';

describe('UiTooltipComponent', () => {
  let fixture: ComponentFixture<UiTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTooltipComponent] });
    fixture = TestBed.createComponent(UiTooltipComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders tooltip element when text is provided', () => {
    fixture.componentRef.setInput('text', 'Tooltip content');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="tooltip"]')).toBeTruthy();
  });

  it('does not render tooltip element when text is empty', () => {
    fixture.componentRef.setInput('text', '');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('displays the tooltip text content', () => {
    fixture.componentRef.setInput('text', 'Helpful hint');
    fixture.detectChanges();
    const tooltip: HTMLElement = fixture.nativeElement.querySelector('[role="tooltip"]');
    expect(tooltip.textContent).toContain('Helpful hint');
  });

  it('tooltip is invisible (opacity-0) when isVisible is false', () => {
    fixture.componentRef.setInput('text', 'Hello');
    fixture.detectChanges();
    const tooltip: HTMLElement = fixture.nativeElement.querySelector('[role="tooltip"]');
    expect(tooltip.classList.contains('opacity-0')).toBeTrue();
  });

  it('tooltip becomes visible (opacity-100) after show() is called', () => {
    fixture.componentRef.setInput('text', 'Hello');
    fixture.detectChanges();
    fixture.componentInstance.show();
    fixture.detectChanges();
    const tooltip: HTMLElement = fixture.nativeElement.querySelector('[role="tooltip"]');
    expect(tooltip.classList.contains('opacity-100')).toBeTrue();
  });

  it('tooltip returns to invisible after hide() is called', () => {
    fixture.componentRef.setInput('text', 'Hello');
    fixture.detectChanges();
    fixture.componentInstance.show();
    fixture.detectChanges();
    fixture.componentInstance.hide();
    fixture.detectChanges();
    const tooltip: HTMLElement = fixture.nativeElement.querySelector('[role="tooltip"]');
    expect(tooltip.classList.contains('opacity-0')).toBeTrue();
  });

  it('does not show when disabled is true', () => {
    fixture.componentRef.setInput('text', 'Hello');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.componentInstance.show();
    fixture.detectChanges();
    expect(fixture.componentInstance.isVisible()).toBeFalse();
  });
});
