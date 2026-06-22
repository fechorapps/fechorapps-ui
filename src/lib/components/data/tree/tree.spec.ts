import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTreeComponent } from './tree.component';
import type { TreeNode } from './tree.component';

describe('UiTreeComponent', () => {
  let fixture: ComponentFixture<UiTreeComponent>;

  const nodes: TreeNode[] = [
    {
      key: '0',
      label: 'Documents',
      children: [
        { key: '0-0', label: 'Work', children: [{ key: '0-0-0', label: 'Expenses.doc', leaf: true }] },
        { key: '0-1', label: 'Home', leaf: true },
      ],
    },
    {
      key: '1',
      label: 'Pictures',
      leaf: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTreeComponent] });
    fixture = TestBed.createComponent(UiTreeComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders with nodes', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.loading()).toBe(true);
  });

  it('expands a node via toggleExpand', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.detectChanges();
    const event = new MouseEvent('click');
    fixture.componentInstance.toggleExpand(event, nodes[0]);
    expect(fixture.componentInstance.isExpanded(nodes[0])).toBe(true);
  });

  it('collapses an expanded node via toggleExpand', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.detectChanges();
    const event = new MouseEvent('click');
    fixture.componentInstance.toggleExpand(event, nodes[0]);
    fixture.componentInstance.toggleExpand(event, nodes[0]);
    expect(fixture.componentInstance.isExpanded(nodes[0])).toBe(false);
  });

  it('detects nodes with children', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasChildren(nodes[0])).toBe(true);
    expect(fixture.componentInstance.hasChildren(nodes[1])).toBe(false);
  });

  it('supports checkbox selection mode', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('selectionMode', 'checkbox');
    fixture.detectChanges();
    expect(fixture.componentInstance.isCheckboxMode()).toBe(true);
  });

  it('disables interaction when disabled is true', () => {
    fixture.componentRef.setInput('value', nodes);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.disabled()).toBe(true);
  });
});
