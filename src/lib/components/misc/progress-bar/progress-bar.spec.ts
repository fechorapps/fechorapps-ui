import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiProgressBarComponent } from './progress-bar.component';

describe('UiProgressBarComponent', () => {
  let fixture: ComponentFixture<UiProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiProgressBarComponent] });
    fixture = TestBed.createComponent(UiProgressBarComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes displayValue as rounded value', () => {
    fixture.componentRef.setInput('value', 42.7);
    fixture.detectChanges();
    expect(fixture.componentInstance.displayValue()).toBe(43);
  });

  it('sets bar width to value percentage in determinate mode', () => {
    fixture.componentRef.setInput('value', 75);
    fixture.detectChanges();
    expect(fixture.componentInstance.barStyle()['width']).toBe('75%');
  });

  it('clamps bar width to 100% when value exceeds 100', () => {
    fixture.componentRef.setInput('value', 150);
    fixture.detectChanges();
    expect(fixture.componentInstance.barStyle()['width']).toBe('100%');
  });

  it('clamps bar width to 0% when value is negative', () => {
    fixture.componentRef.setInput('value', -10);
    fixture.detectChanges();
    expect(fixture.componentInstance.barStyle()['width']).toBe('0%');
  });

  it('sets bar width to 40% in indeterminate mode', () => {
    fixture.componentRef.setInput('mode', 'indeterminate');
    fixture.detectChanges();
    expect(fixture.componentInstance.barStyle()['width']).toBe('40%');
  });

  it('applies indeterminate animation class in indeterminate mode', () => {
    fixture.componentRef.setInput('mode', 'indeterminate');
    fixture.detectChanges();
    expect(fixture.componentInstance.barClasses()).toContain('animate-progress-indeterminate');
  });

  it('applies bg-primary class when no custom color', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.barClasses()).toContain('bg-primary');
  });

  it('applies custom background color via barStyle', () => {
    fixture.componentRef.setInput('color', '#ff0000');
    fixture.detectChanges();
    expect(fixture.componentInstance.barStyle()['backgroundColor']).toBe('#ff0000');
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'rounded-none');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('rounded-none');
  });
});
