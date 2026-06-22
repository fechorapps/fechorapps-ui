import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedDialItem, UiSpeedDialComponent } from './speed-dial.component';

const MOCK_ITEMS: SpeedDialItem[] = [
  { id: '1', icon: {} as never, label: 'Add' },
  { id: '2', icon: {} as never, label: 'Edit' },
  { id: '3', icon: {} as never, label: 'Delete', disabled: true },
];

describe('UiSpeedDialComponent', () => {
  let fixture: ComponentFixture<UiSpeedDialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSpeedDialComponent] });
    fixture = TestBed.createComponent(UiSpeedDialComponent);
    fixture.componentRef.setInput('model', MOCK_ITEMS);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('is closed by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('opens when toggle() is called and emits onShow', () => {
    fixture.detectChanges();
    const showSpy = jasmine.createSpy('onShow');
    fixture.componentInstance.onShow.subscribe(showSpy);

    fixture.componentInstance.toggle();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(true);
    expect(showSpy).toHaveBeenCalledTimes(1);
  });

  it('closes when toggle() is called twice and emits onHide', () => {
    fixture.detectChanges();
    const hideSpy = jasmine.createSpy('onHide');
    fixture.componentInstance.onHide.subscribe(hideSpy);

    fixture.componentInstance.toggle();
    fixture.componentInstance.toggle();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
    expect(hideSpy).toHaveBeenCalledTimes(1);
  });

  it('emits onVisibleChange with correct boolean on each toggle', () => {
    fixture.detectChanges();
    const visibleChangeSpy = jasmine.createSpy('onVisibleChange');
    fixture.componentInstance.onVisibleChange.subscribe(visibleChangeSpy);

    fixture.componentInstance.toggle();
    expect(visibleChangeSpy).toHaveBeenCalledWith(true);

    fixture.componentInstance.toggle();
    expect(visibleChangeSpy).toHaveBeenCalledWith(false);
  });

  it('does not toggle when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const showSpy = jasmine.createSpy('onShow');
    fixture.componentInstance.onShow.subscribe(showSpy);

    fixture.componentInstance.toggle();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
    expect(showSpy).not.toHaveBeenCalled();
  });

  it('adds disabled classes to trigger button when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerClasses()).toContain('opacity-50');
    expect(fixture.componentInstance.triggerClasses()).toContain('cursor-not-allowed');
  });

  it('emits onItemClick when a non-disabled item is clicked', () => {
    fixture.detectChanges();
    fixture.componentInstance.show();
    fixture.detectChanges();

    const itemSpy = jasmine.createSpy('onItemClick');
    fixture.componentInstance.onItemClick.subscribe(itemSpy);

    const event = new MouseEvent('click');
    fixture.componentInstance.onItemClicked(MOCK_ITEMS[0], event);

    expect(itemSpy).toHaveBeenCalledWith(MOCK_ITEMS[0]);
  });

  it('does not emit onItemClick for a disabled item', () => {
    fixture.detectChanges();
    fixture.componentInstance.show();
    fixture.detectChanges();

    const itemSpy = jasmine.createSpy('onItemClick');
    fixture.componentInstance.onItemClick.subscribe(itemSpy);

    const event = new MouseEvent('click');
    fixture.componentInstance.onItemClicked(MOCK_ITEMS[2], event);

    expect(itemSpy).not.toHaveBeenCalled();
  });

  it('closes after a non-disabled item is clicked', () => {
    fixture.detectChanges();
    fixture.componentInstance.show();
    fixture.detectChanges();

    const event = new MouseEvent('click');
    fixture.componentInstance.onItemClicked(MOCK_ITEMS[0], event);
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('applies correct size classes for md size (default)', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerClasses()).toContain('w-12');
    expect(fixture.componentInstance.triggerClasses()).toContain('h-12');
  });

  it('applies correct size classes for lg size', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerClasses()).toContain('w-14');
    expect(fixture.componentInstance.triggerClasses()).toContain('h-14');
  });

  it('computes isCircular as true for circle direction', () => {
    fixture.componentRef.setInput('direction', 'circle');
    fixture.detectChanges();
    expect(fixture.componentInstance.isCircular()).toBe(true);
  });

  it('computes isCircular as false for up direction', () => {
    fixture.componentRef.setInput('direction', 'up');
    fixture.detectChanges();
    expect(fixture.componentInstance.isCircular()).toBe(false);
  });
});
