import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSplitScreenComponent } from './split-screen.component';

describe('UiSplitScreenComponent', () => {
  let fixture: ComponentFixture<UiSplitScreenComponent>;
  let component: UiSplitScreenComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSplitScreenComponent] });
    fixture = TestBed.createComponent(UiSplitScreenComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows both panels by default (left-first)', () => {
    fixture.detectChanges();
    const panels = fixture.nativeElement.querySelectorAll('div > div');
    expect(panels.length).toBe(2);
  });

  it('hides the right panel when mobileStack is right-hidden', () => {
    fixture.componentRef.setInput('mobileStack', 'right-hidden');
    fixture.detectChanges();
    const panels = fixture.nativeElement.querySelectorAll('div > div');
    expect(panels.length).toBe(1);
  });

  it('applies correct ratio classes for 50/50', () => {
    fixture.componentRef.setInput('ratio', '50/50');
    fixture.detectChanges();
    expect(component.leftClass()).toContain('md:w-1/2');
    expect(component.rightClass()).toContain('md:w-1/2');
  });

  it('applies correct ratio classes for 60/40', () => {
    fixture.componentRef.setInput('ratio', '60/40');
    fixture.detectChanges();
    expect(component.leftClass()).toContain('md:w-3/5');
    expect(component.rightClass()).toContain('md:w-2/5');
  });

  it('applies correct ratio classes for 40/60', () => {
    fixture.componentRef.setInput('ratio', '40/60');
    fixture.detectChanges();
    expect(component.leftClass()).toContain('md:w-2/5');
    expect(component.rightClass()).toContain('md:w-3/5');
  });

  it('applies correct ratio classes for 30/70', () => {
    fixture.componentRef.setInput('ratio', '30/70');
    fixture.detectChanges();
    expect(component.leftClass()).toContain('md:w-[30%]');
    expect(component.rightClass()).toContain('md:w-[70%]');
  });

  it('applies correct ratio classes for 70/30', () => {
    fixture.componentRef.setInput('ratio', '70/30');
    fixture.detectChanges();
    expect(component.leftClass()).toContain('md:w-[70%]');
    expect(component.rightClass()).toContain('md:w-[30%]');
  });

  it('applies flex-col for left-first mobileStack', () => {
    fixture.componentRef.setInput('mobileStack', 'left-first');
    fixture.detectChanges();
    expect(component.mobileOrder()).toBe('flex-col');
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('flex-col');
  });

  it('applies flex-col-reverse for right-first mobileStack', () => {
    fixture.componentRef.setInput('mobileStack', 'right-first');
    fixture.detectChanges();
    expect(component.mobileOrder()).toBe('flex-col-reverse');
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('flex-col-reverse');
  });

  it('adds min-h-screen when fullHeight is true (default)', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('min-h-screen');
  });

  it('omits min-h-screen when fullHeight is false', () => {
    fixture.componentRef.setInput('fullHeight', false);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).not.toContain('min-h-screen');
  });

  it('adds gap-4 when gap is true', () => {
    fixture.componentRef.setInput('gap', true);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('gap-4');
  });

  it('omits gap-4 when gap is false (default)', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).not.toContain('gap-4');
  });
});
