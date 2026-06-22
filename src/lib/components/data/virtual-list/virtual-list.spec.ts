import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiVirtualListComponent, VirtualListItem } from './virtual-list.component';

const generateItems = (count: number): VirtualListItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    label: `Item ${i + 1}`,
  }));

describe('UiVirtualListComponent', () => {
  let fixture: ComponentFixture<UiVirtualListComponent>;
  let component: UiVirtualListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiVirtualListComponent] });
    fixture = TestBed.createComponent(UiVirtualListComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('totalHeight equals items.length * itemHeight', () => {
    const items = generateItems(100);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('itemHeight', 48);
    fixture.detectChanges();
    expect(component.totalHeight()).toBe(100 * 48);
  });

  it('visibleItems count is less than total items for large datasets', () => {
    const items = generateItems(1000);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('itemHeight', 48);
    fixture.componentRef.setInput('containerHeight', 400);
    fixture.componentRef.setInput('overscan', 3);
    fixture.detectChanges();
    expect(component.visibleItems().length).toBeLessThan(items.length);
  });

  it('startIndex is 0 when not scrolled', () => {
    fixture.componentRef.setInput('items', generateItems(100));
    fixture.detectChanges();
    expect(component.startIndex()).toBe(0);
  });

  it('updates scrollTop on scroll event', () => {
    fixture.detectChanges();
    const fakeTarget = { scrollTop: 200 } as HTMLElement;
    component.onScroll({ target: fakeTarget } as unknown as Event);
    expect(component.scrollTop()).toBe(200);
  });

  it('getLabel returns label field value', () => {
    const item: VirtualListItem = { id: 1, label: 'My Label' };
    fixture.detectChanges();
    expect(component.getLabel(item)).toBe('My Label');
  });

  it('getLabel falls back to JSON for missing field', () => {
    const item: VirtualListItem = { id: 1, name: 'No label here' };
    fixture.detectChanges();
    const label = component.getLabel(item);
    expect(label).toBeTruthy();
  });
});
