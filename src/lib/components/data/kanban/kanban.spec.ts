import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiKanbanComponent, KanbanColumn } from './kanban.component';

const testColumns: KanbanColumn[] = [
  { id: 'col1', title: 'Column 1', items: [{ id: 'item1', title: 'Item 1' }] },
  { id: 'col2', title: 'Column 2', items: [] },
];

describe('UiKanbanComponent', () => {
  let fixture: ComponentFixture<UiKanbanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiKanbanComponent] });
    fixture = TestBed.createComponent(UiKanbanComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays columns', () => {
    fixture.componentRef.setInput('columns', testColumns);
    fixture.detectChanges();
    const columnEls = fixture.nativeElement.querySelectorAll('h3');
    expect(columnEls.length).toBe(2);
    expect(columnEls[0].textContent.trim()).toBe('Column 1');
  });

  it('emits itemClicked when item is clicked', () => {
    fixture.componentRef.setInput('columns', testColumns);
    fixture.detectChanges();
    let emittedItem: unknown;
    fixture.componentInstance.itemClicked.subscribe((item) => (emittedItem = item));
    const itemEl = fixture.nativeElement.querySelector('.bg-card');
    itemEl.click();
    expect(emittedItem).toEqual(testColumns[0].items[0]);
  });
});
