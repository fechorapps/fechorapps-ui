import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitButtonItem, UiSplitButtonComponent } from './split-button.component';

const MOCK_ITEMS: SplitButtonItem[] = [
  { label: 'Save draft', command: jasmine.createSpy('saveDraft') },
  { label: 'Duplicate', command: jasmine.createSpy('duplicate') },
  { label: 'Delete', disabled: true },
  { label: '', separator: true },
  { label: 'Hidden item', visible: false },
];

describe('UiSplitButtonComponent', () => {
  let fixture: ComponentFixture<UiSplitButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSplitButtonComponent] });
    fixture = TestBed.createComponent(UiSplitButtonComponent);
    fixture.componentRef.setInput('label', 'Save');
    fixture.componentRef.setInput('items', MOCK_ITEMS);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays the label', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Save');
  });

  it('dropdown is closed by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen()).toBe(false);
  });

  it('toggles dropdown open when toggleDropdown() is called', () => {
    fixture.detectChanges();
    const event = new MouseEvent('click');
    fixture.componentInstance.toggleDropdown(event);
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen()).toBe(true);
  });

  it('emits onDropdownClick when dropdown button is clicked', () => {
    fixture.detectChanges();
    const spy = jasmine.createSpy('onDropdownClick');
    fixture.componentInstance.onDropdownClick.subscribe(spy);

    const event = new MouseEvent('click');
    fixture.componentInstance.toggleDropdown(event);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not open dropdown when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const event = new MouseEvent('click');
    fixture.componentInstance.toggleDropdown(event);
    fixture.detectChanges();

    expect(fixture.componentInstance.isOpen()).toBe(false);
  });

  it('emits onClick when main button is clicked and not disabled', () => {
    fixture.detectChanges();
    const spy = jasmine.createSpy('onClick');
    fixture.componentInstance.onClick.subscribe(spy);

    const event = new MouseEvent('click');
    fixture.componentInstance.onMainClick(event);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not emit onClick when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const spy = jasmine.createSpy('onClick');
    fixture.componentInstance.onClick.subscribe(spy);

    const event = new MouseEvent('click');
    fixture.componentInstance.onMainClick(event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('emits onItemClick and closes dropdown when a menu item is clicked', () => {
    fixture.detectChanges();
    fixture.componentInstance.isOpen.set(true);
    fixture.detectChanges();

    const spy = jasmine.createSpy('onItemClick');
    fixture.componentInstance.onItemClick.subscribe(spy);

    const event = new MouseEvent('click');
    fixture.componentInstance.onMenuItemClick(MOCK_ITEMS[0], event);

    expect(spy).toHaveBeenCalledWith(MOCK_ITEMS[0]);
    expect(fixture.componentInstance.isOpen()).toBe(false);
  });

  it('does not emit onItemClick for a disabled item', () => {
    fixture.detectChanges();
    const spy = jasmine.createSpy('onItemClick');
    fixture.componentInstance.onItemClick.subscribe(spy);

    const event = new MouseEvent('click');
    fixture.componentInstance.onMenuItemClick(MOCK_ITEMS[2], event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('does not emit onItemClick for a separator item', () => {
    fixture.detectChanges();
    const spy = jasmine.createSpy('onItemClick');
    fixture.componentInstance.onItemClick.subscribe(spy);

    const event = new MouseEvent('click');
    fixture.componentInstance.onMenuItemClick(MOCK_ITEMS[3], event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('filters out hidden items in visibleItems computed', () => {
    fixture.detectChanges();
    const visible = fixture.componentInstance.visibleItems();
    const hiddenItem = visible.find((i) => i.label === 'Hidden item');
    expect(hiddenItem).toBeUndefined();
  });

  it('applies primary variant classes by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.mainButtonClasses()).toContain('bg-primary');
  });

  it('applies danger variant classes when variant is danger', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    expect(fixture.componentInstance.mainButtonClasses()).toContain('bg-red-500');
  });

  it('applies disabled classes when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.mainButtonClasses()).toContain('opacity-50');
    expect(fixture.componentInstance.mainButtonClasses()).toContain('cursor-not-allowed');
  });

  it('applies rounded-l-full when rounded is true', () => {
    fixture.componentRef.setInput('rounded', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.mainButtonClasses()).toContain('rounded-l-full');
  });

  it('applies shadow classes when raised is true', () => {
    fixture.componentRef.setInput('raised', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.mainButtonClasses()).toContain('shadow-md');
  });

  it('returns correct iconSize for sm size', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(fixture.componentInstance.iconSize()).toBe(14);
  });

  it('returns correct iconSize for lg size', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.componentInstance.iconSize()).toBe(18);
  });
});
