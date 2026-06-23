import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDashboardGridComponent, GridItem } from './dashboard-grid.component';

const SAMPLE_ITEMS: GridItem[] = [
  { id: 'a', x: 0, y: 0, w: 4, h: 2 },
  { id: 'b', x: 4, y: 0, w: 4, h: 2 },
  { id: 'c', x: 8, y: 0, w: 4, h: 2 },
  { id: 'd', x: 0, y: 2, w: 6, h: 2 },
];

describe('UiDashboardGridComponent', () => {
  let fixture: ComponentFixture<UiDashboardGridComponent>;
  let component: UiDashboardGridComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiDashboardGridComponent],
    });
    fixture = TestBed.createComponent(UiDashboardGridComponent);
    component = fixture.componentInstance;
  });

  it('renders without errors', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders the correct number of item elements', () => {
    fixture.componentRef.setInput('items', SAMPLE_ITEMS);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('[draggable]');
    expect(cards.length).toBe(SAMPLE_ITEMS.length);
  });

  describe('itemStyle()', () => {
    it('returns absolute position with left=0 and top=0 for item at x=0, y=0', () => {
      component.containerWidth.set(960);
      fixture.detectChanges();
      const item: GridItem = { id: 'x', x: 0, y: 0, w: 4, h: 2 };
      const style = component.itemStyle(item);
      expect(style['position']).toBe('absolute');
      expect(style['left']).toBe('0px');
      expect(style['top']).toBe('0px');
    });

    it('calculates width as w * cellWidth - gap', () => {
      component.containerWidth.set(960);
      fixture.detectChanges();
      const item: GridItem = { id: 'x', x: 0, y: 0, w: 4, h: 1 };
      const style = component.itemStyle(item);
      // cellWidth = 960/12 = 80; width = 4*80 - 16 = 304
      expect(style['width']).toBe('304px');
    });

    it('calculates height as h * rowHeight - gap', () => {
      component.containerWidth.set(960);
      fixture.detectChanges();
      const item: GridItem = { id: 'x', x: 0, y: 0, w: 4, h: 2 };
      const style = component.itemStyle(item);
      // height = 2*80 - 16 = 144
      expect(style['height']).toBe('144px');
    });

    it('offsets left by gap when x > 0', () => {
      component.containerWidth.set(960);
      fixture.componentRef.setInput('gap', 16);
      fixture.detectChanges();
      const item: GridItem = { id: 'x', x: 4, y: 0, w: 4, h: 2 };
      const style = component.itemStyle(item);
      // left = 4 * 80 + 16 = 336
      expect(style['left']).toBe('336px');
    });

    it('includes transition property', () => {
      const item: GridItem = { id: 'x', x: 0, y: 0, w: 1, h: 1 };
      const style = component.itemStyle(item);
      expect(style['transition']).toBe('left 0.2s, top 0.2s');
    });
  });

  describe('gridHeight', () => {
    it('computes gridHeight as max(y+h) * rowHeight + gap', () => {
      fixture.componentRef.setInput('items', SAMPLE_ITEMS);
      fixture.componentRef.setInput('rowHeight', 80);
      fixture.componentRef.setInput('gap', 16);
      fixture.detectChanges();
      // max y+h = max(0+2, 0+2, 0+2, 2+2) = 4; 4*80+16 = 336
      expect(component.gridHeight()).toBe(336);
    });

    it('returns gap when items is empty', () => {
      fixture.componentRef.setInput('items', []);
      fixture.componentRef.setInput('gap', 16);
      fixture.detectChanges();
      expect(component.gridHeight()).toBe(16);
    });
  });

  describe('collides()', () => {
    it('detects overlap between two items', () => {
      const placed: GridItem[] = [{ id: 'a', x: 0, y: 0, w: 4, h: 2 }];
      const overlapping: GridItem = { id: 'b', x: 2, y: 1, w: 4, h: 2 };
      expect(component.testCollides(placed, overlapping)).toBe(true);
    });

    it('returns false for non-overlapping items', () => {
      const placed: GridItem[] = [{ id: 'a', x: 0, y: 0, w: 4, h: 2 }];
      const noOverlap: GridItem = { id: 'b', x: 4, y: 0, w: 4, h: 2 };
      expect(component.testCollides(placed, noOverlap)).toBe(false);
    });

    it('returns false when checking item against itself (same id)', () => {
      const item: GridItem = { id: 'a', x: 0, y: 0, w: 4, h: 2 };
      expect(component.testCollides([item], item)).toBe(false);
    });

    it('returns false for vertically adjacent items', () => {
      const placed: GridItem[] = [{ id: 'a', x: 0, y: 0, w: 4, h: 2 }];
      const below: GridItem = { id: 'b', x: 0, y: 2, w: 4, h: 2 };
      expect(component.testCollides(placed, below)).toBe(false);
    });
  });

  describe('compact mode (runCompact)', () => {
    it('moves items upward after compaction', () => {
      const items: GridItem[] = [
        { id: 'a', x: 0, y: 0, w: 4, h: 2 },
        { id: 'b', x: 4, y: 5, w: 4, h: 2 }, // gap — should compact up
      ];
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('compact', true);
      fixture.detectChanges();

      component.testRunCompact();
      fixture.detectChanges();

      const result = component.items();
      const b = result.find(i => i.id === 'b')!;
      // 'b' doesn't overlap 'a' (different x), should compact to y=0
      expect(b.y).toBe(0);
    });

    it('prevents collision after compaction', () => {
      const items: GridItem[] = [
        { id: 'a', x: 0, y: 0, w: 12, h: 2 },
        { id: 'b', x: 0, y: 5, w: 12, h: 2 },
      ];
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();

      component.testRunCompact();
      fixture.detectChanges();

      const result = component.items();
      const a = result.find(i => i.id === 'a')!;
      const b = result.find(i => i.id === 'b')!;
      // 'a' at y=0, 'b' must be at y=2 (after 'a' which spans h=2)
      expect(a.y).toBe(0);
      expect(b.y).toBe(2);
    });
  });

  describe('static items', () => {
    it('static items are not draggable', () => {
      const items: GridItem[] = [
        { id: 'a', x: 0, y: 0, w: 4, h: 2, static: true },
        { id: 'b', x: 4, y: 0, w: 4, h: 2 },
      ];
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('editable', true);
      fixture.detectChanges();

      // Static item drag is prevented — dragstart calls e.preventDefault()
      const dragEvent = new DragEvent('dragstart');
      const preventDefaultSpy = spyOn(dragEvent, 'preventDefault');
      component.onItemDragStart(dragEvent, items[0]);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('non-static items can be dragged in editable mode', () => {
      const item: GridItem = { id: 'b', x: 0, y: 0, w: 4, h: 2 };
      fixture.componentRef.setInput('editable', true);
      fixture.detectChanges();

      const dt = { setData: jasmine.createSpy('setData') } as unknown as DataTransfer;
      const dragEvent = new DragEvent('dragstart');
      Object.defineProperty(dragEvent, 'dataTransfer', { value: dt });
      const preventDefaultSpy = spyOn(dragEvent, 'preventDefault');

      component.onItemDragStart(dragEvent, item);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
      expect(dt.setData).toHaveBeenCalledWith('itemId', 'b');
    });

    it('does not allow drag when editable is false', () => {
      const item: GridItem = { id: 'b', x: 0, y: 0, w: 4, h: 2 };
      fixture.componentRef.setInput('editable', false);
      fixture.detectChanges();

      const dragEvent = new DragEvent('dragstart');
      const preventDefaultSpy = spyOn(dragEvent, 'preventDefault');
      component.onItemDragStart(dragEvent, item);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('layoutChange output', () => {
    it('emits layoutChange after a drop', () => {
      const items: GridItem[] = [{ id: 'a', x: 0, y: 0, w: 4, h: 2 }];
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();

      const emitted: GridItem[][] = [];
      component.layoutChange.subscribe(v => emitted.push(v));

      // Mock getBoundingClientRect
      spyOn(component.hostEl.nativeElement, 'getBoundingClientRect').and.returnValue({
        left: 0,
        top: 0,
        right: 960,
        bottom: 500,
        width: 960,
        height: 500,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);

      component.containerWidth.set(960);
      fixture.detectChanges();

      const dt = { getData: () => 'a' } as unknown as DataTransfer;
      const dropEvent = new DragEvent('drop', { clientX: 100, clientY: 50 });
      Object.defineProperty(dropEvent, 'dataTransfer', { value: dt });
      spyOn(dropEvent, 'preventDefault');

      component.onGridDrop(dropEvent);
      fixture.detectChanges();

      expect(emitted.length).toBe(1);
      expect(emitted[0]).toEqual(component.items());
    });
  });
});
