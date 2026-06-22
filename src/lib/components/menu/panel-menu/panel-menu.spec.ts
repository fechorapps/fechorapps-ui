import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPanelMenuComponent, PanelMenuItem } from './panel-menu.component';

describe('UiPanelMenuComponent', () => {
  let fixture: ComponentFixture<UiPanelMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPanelMenuComponent] });
    fixture = TestBed.createComponent(UiPanelMenuComponent);
  });

  it('renders', () => {
    fixture.componentRef.setInput('model', []);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders model items', () => {
    const items: PanelMenuItem[] = [
      { label: 'Documents' },
      { label: 'Photos' },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Documents');
    expect(fixture.nativeElement.textContent).toContain('Photos');
  });

  it('defaults multiple to true', () => {
    fixture.componentRef.setInput('model', []);
    fixture.detectChanges();
    expect(fixture.componentInstance.multiple()).toBe(true);
  });

  it('expands item with sub-items on toggleItem', () => {
    const item: PanelMenuItem = {
      label: 'Documents',
      items: [{ label: 'Resume' }],
    };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    fixture.componentInstance.toggleItem(item, '0', new MouseEvent('click'));
    expect(fixture.componentInstance.isExpanded('0')).toBe(true);
  });

  it('collapses already-expanded item on second toggle', () => {
    const item: PanelMenuItem = {
      label: 'Documents',
      items: [{ label: 'Resume' }],
    };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    const event = new MouseEvent('click');
    fixture.componentInstance.toggleItem(item, '0', event);
    fixture.componentInstance.toggleItem(item, '0', event);
    expect(fixture.componentInstance.isExpanded('0')).toBe(false);
  });

  it('emits onItemClick when item is toggled', () => {
    const item: PanelMenuItem = { label: 'Photos' };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    const emitted: PanelMenuItem[] = [];
    fixture.componentInstance.onItemClick.subscribe((i: PanelMenuItem) => emitted.push(i));
    fixture.componentInstance.toggleItem(item, '0', new MouseEvent('click'));
    expect(emitted.length).toBe(1);
  });
});
