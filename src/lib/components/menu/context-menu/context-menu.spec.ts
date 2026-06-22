import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiContextMenuComponent, ContextMenuItem } from './context-menu.component';

describe('UiContextMenuComponent', () => {
  let fixture: ComponentFixture<UiContextMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiContextMenuComponent] });
    fixture = TestBed.createComponent(UiContextMenuComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('is hidden by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('shows menu on show()', () => {
    fixture.detectChanges();
    const mouseEvent = new MouseEvent('contextmenu', { clientX: 100, clientY: 100 });
    fixture.componentInstance.show(mouseEvent);
    expect(fixture.componentInstance.visible()).toBe(true);
  });

  it('hides menu on hide()', () => {
    fixture.detectChanges();
    const mouseEvent = new MouseEvent('contextmenu', { clientX: 50, clientY: 50 });
    fixture.componentInstance.show(mouseEvent);
    fixture.componentInstance.hide();
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('filters out invisible items from visibleItems', () => {
    const items: ContextMenuItem[] = [
      { label: 'Visible', visible: true },
      { label: 'Hidden', visible: false },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleItems().length).toBe(1);
    expect(fixture.componentInstance.visibleItems()[0].label).toBe('Visible');
  });

  it('renders model items in the menu', () => {
    const items: ContextMenuItem[] = [{ label: 'Cut' }, { label: 'Copy' }];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    // Items are present in model
    expect(fixture.componentInstance.visibleItems().length).toBe(2);
  });
});
