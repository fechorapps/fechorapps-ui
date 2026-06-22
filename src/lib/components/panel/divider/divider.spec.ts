import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDividerComponent } from './divider.component';

describe('UiDividerComponent', () => {
  let fixture: ComponentFixture<UiDividerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiDividerComponent] });
    fixture = TestBed.createComponent(UiDividerComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults layout to horizontal', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.layout()).toBe('horizontal');
  });

  it('defaults type to solid', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.type()).toBe('solid');
  });

  it('applies vertical layout classes', () => {
    fixture.componentRef.setInput('layout', 'vertical');
    fixture.detectChanges();
    expect(fixture.componentInstance.dividerClasses()).toContain('flex-col');
  });

  it('applies dashed line classes', () => {
    fixture.componentRef.setInput('type', 'dashed');
    fixture.detectChanges();
    expect(fixture.componentInstance.lineClasses()).toContain('border-dashed');
  });

  it('applies dotted line classes', () => {
    fixture.componentRef.setInput('type', 'dotted');
    fixture.detectChanges();
    expect(fixture.componentInstance.lineClasses()).toContain('border-dotted');
  });

  it('hides left line when align is left', () => {
    fixture.componentRef.setInput('align', 'left');
    fixture.detectChanges();
    expect(fixture.componentInstance.showLeftLine()).toBe(false);
  });

  it('hides right line when align is right', () => {
    fixture.componentRef.setInput('align', 'right');
    fixture.detectChanges();
    expect(fixture.componentInstance.showRightLine()).toBe(false);
  });

  it('appends styleClass to divider classes', () => {
    fixture.componentRef.setInput('styleClass', 'my-divider');
    fixture.detectChanges();
    expect(fixture.componentInstance.dividerClasses()).toContain('my-divider');
  });
});
