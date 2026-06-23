import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiResizablePanelsComponent } from './resizable-panels.component';

describe('UiResizablePanelsComponent', () => {
  let fixture: ComponentFixture<UiResizablePanelsComponent>;
  let component: UiResizablePanelsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiResizablePanelsComponent] });
    fixture = TestBed.createComponent(UiResizablePanelsComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies initialSizes on init', () => {
    fixture.componentRef.setInput('initialSizes', [30, 70] as [number, number]);
    fixture.detectChanges();
    expect(component.sizes()).toEqual([30, 70]);
  });

  it('applies new initialSizes when input changes', () => {
    fixture.componentRef.setInput('initialSizes', [60, 40] as [number, number]);
    fixture.detectChanges();
    expect(component.sizes()).toEqual([60, 40]);
  });

  it('resets to initialSizes on double-click', () => {
    fixture.componentRef.setInput('initialSizes', [40, 60] as [number, number]);
    fixture.detectChanges();
    // Manually change sizes
    component.sizes.set([70, 30]);
    fixture.detectChanges();
    expect(component.sizes()).toEqual([70, 30]);

    // Double-click resets
    component.onGutterDblClick();
    fixture.detectChanges();
    expect(component.sizes()).toEqual([40, 60]);
  });

  it('emits sizesChange on double-click reset', () => {
    fixture.componentRef.setInput('initialSizes', [40, 60] as [number, number]);
    fixture.detectChanges();

    const emittedValues: [number, number][] = [];
    component.sizesChange.subscribe((v) => emittedValues.push(v));

    component.onGutterDblClick();
    fixture.detectChanges();

    expect(emittedValues.length).toBe(1);
    expect(emittedValues[0]).toEqual([40, 60]);
  });

  it('does not allow sizes below minSizes during drag', () => {
    fixture.componentRef.setInput('minSizes', [20, 20] as [number, number]);
    fixture.detectChanges();

    // Mock the host element bounding rect
    const mockRect = { left: 0, top: 0, width: 500, height: 300 };
    spyOn(component.hostEl.nativeElement, 'getBoundingClientRect').and.returnValue(mockRect as DOMRect);

    // Simulate pointerdown to start drag
    const pointerDownEvent = new PointerEvent('pointerdown', { clientX: 250, clientY: 150 });
    component.onGutterPointerDown(pointerDownEvent);
    fixture.detectChanges();

    // Fire a pointermove event to a position that would go below minA (20%)
    // 5% of 500px = 25px from left
    const pointermoveEvent = new PointerEvent('pointermove', { clientX: 25, clientY: 150 });
    window.dispatchEvent(pointermoveEvent);
    fixture.detectChanges();

    // Should be clamped at minA=20%
    expect(component.sizes()[0]).toBeGreaterThanOrEqual(20);

    // Cleanup
    const pointerUpEvent = new PointerEvent('pointerup');
    window.dispatchEvent(pointerUpEvent);
  });

  it('does not allow sizes above (100 - minB) during drag', () => {
    fixture.componentRef.setInput('minSizes', [10, 15] as [number, number]);
    fixture.detectChanges();

    const mockRect = { left: 0, top: 0, width: 400, height: 300 };
    spyOn(component.hostEl.nativeElement, 'getBoundingClientRect').and.returnValue(mockRect as DOMRect);

    const pointerDownEvent = new PointerEvent('pointerdown', { clientX: 200, clientY: 150 });
    component.onGutterPointerDown(pointerDownEvent);
    fixture.detectChanges();

    // Move to near the right edge (95% of 400px = 380px) — would exceed 100 - minB (85%)
    const pointermoveEvent = new PointerEvent('pointermove', { clientX: 380, clientY: 150 });
    window.dispatchEvent(pointermoveEvent);
    fixture.detectChanges();

    // Should be clamped at 100 - 15 = 85%
    expect(component.sizes()[0]).toBeLessThanOrEqual(85);

    // Cleanup
    const pointerUpEvent = new PointerEvent('pointerup');
    window.dispatchEvent(pointerUpEvent);
  });

  it('sets isDragging to true on pointerdown and false on pointerup', () => {
    fixture.detectChanges();
    const mockRect = { left: 0, top: 0, width: 500, height: 300 };
    spyOn(component.hostEl.nativeElement, 'getBoundingClientRect').and.returnValue(mockRect as DOMRect);

    expect(component.isDragging()).toBe(false);

    const pointerDownEvent = new PointerEvent('pointerdown', { clientX: 250, clientY: 150 });
    component.onGutterPointerDown(pointerDownEvent);
    fixture.detectChanges();

    expect(component.isDragging()).toBe(true);

    const pointerUpEvent = new PointerEvent('pointerup');
    window.dispatchEvent(pointerUpEvent);
    fixture.detectChanges();

    expect(component.isDragging()).toBe(false);
  });

  it('emits sizesChange during drag (pointermove)', () => {
    fixture.detectChanges();
    const mockRect = { left: 0, top: 0, width: 400, height: 300 };
    spyOn(component.hostEl.nativeElement, 'getBoundingClientRect').and.returnValue(mockRect as DOMRect);

    const emittedValues: [number, number][] = [];
    component.sizesChange.subscribe((v) => emittedValues.push(v));

    const pointerDownEvent = new PointerEvent('pointerdown', { clientX: 200, clientY: 150 });
    component.onGutterPointerDown(pointerDownEvent);

    // Move to 50% position (200px)
    const pointermoveEvent = new PointerEvent('pointermove', { clientX: 200, clientY: 150 });
    window.dispatchEvent(pointermoveEvent);
    fixture.detectChanges();

    expect(emittedValues.length).toBeGreaterThanOrEqual(1);
    expect(emittedValues[0][0] + emittedValues[0][1]).toBeCloseTo(100, 5);

    // Cleanup
    const pointerUpEvent = new PointerEvent('pointerup');
    window.dispatchEvent(pointerUpEvent);
  });

  it('uses vertical direction for vertical layout', () => {
    fixture.componentRef.setInput('direction', 'vertical');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('div');
    expect(container.className).toContain('flex-col');
  });
});
