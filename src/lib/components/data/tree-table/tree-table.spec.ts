import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTreeTableComponent } from './tree-table.component';
import type { TreeTableNode, TreeTableColumn } from './tree-table.component';

describe('UiTreeTableComponent', () => {
  let fixture: ComponentFixture<UiTreeTableComponent>;

  interface FileItem {
    name: string;
    size: string;
    type: string;
  }

  const columns: TreeTableColumn[] = [
    { field: 'name', header: 'Name', expander: true },
    { field: 'size', header: 'Size' },
    { field: 'type', header: 'Type' },
  ];

  const nodes: TreeTableNode<FileItem>[] = [
    {
      data: { name: 'Applications', size: '200mb', type: 'Folder' },
      children: [
        { data: { name: 'Angular', size: '25mb', type: 'Folder' }, leaf: true },
        { data: { name: 'Chrome', size: '25mb', type: 'App' }, leaf: true },
      ],
    },
    {
      data: { name: 'Cloud', size: '20mb', type: 'Folder' },
      leaf: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTreeTableComponent] });
    fixture = TestBed.createComponent(UiTreeTableComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders with nodes and columns', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('columns', columns);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.loading()).toBe(true);
  });

  it('flattens only root nodes initially (children collapsed)', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('columns', columns);
    fixture.detectChanges();
    expect(fixture.componentInstance.flattenedNodes().length).toBe(2);
  });

  it('expands a node to show its children', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('columns', columns);
    fixture.detectChanges();
    const event = new MouseEvent('click');
    fixture.componentInstance.toggleNode(event, nodes[0]);
    expect(fixture.componentInstance.flattenedNodes().length).toBe(4);
  });

  it('detects nodes with children', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('columns', columns);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasChildren(nodes[0])).toBe(true);
    expect(fixture.componentInstance.hasChildren(nodes[1])).toBe(false);
  });

  it('identifies expander column correctly', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('columns', columns);
    fixture.detectChanges();
    expect(fixture.componentInstance.isExpanderColumn(columns[0])).toBe(true);
    expect(fixture.componentInstance.isExpanderColumn(columns[1])).toBe(false);
  });

  it('supports checkbox selection mode', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('selectionMode', 'checkbox');
    fixture.detectChanges();
    expect(fixture.componentInstance.isCheckboxMode()).toBe(true);
  });
});
