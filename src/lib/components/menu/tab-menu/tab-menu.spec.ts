import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTabMenuComponent, TabMenuItem } from './tab-menu.component';

describe('UiTabMenuComponent', () => {
  let fixture: ComponentFixture<UiTabMenuComponent>;

  const defaultItems: TabMenuItem[] = [
    { label: 'Home', id: 'home' },
    { label: 'Profile', id: 'profile' },
    { label: 'Settings', id: 'settings' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTabMenuComponent] });
    fixture = TestBed.createComponent(UiTabMenuComponent);
  });

  it('renders', () => {
    fixture.componentRef.setInput('model', defaultItems);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders tab labels', () => {
    fixture.componentRef.setInput('model', defaultItems);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Home');
    expect(fixture.nativeElement.textContent).toContain('Profile');
  });

  it('no active item by default', () => {
    fixture.componentRef.setInput('model', defaultItems);
    fixture.detectChanges();
    expect(fixture.componentInstance.activeItem()).toBeNull();
  });

  it('activates item on click', () => {
    fixture.componentRef.setInput('model', defaultItems);
    fixture.detectChanges();
    fixture.componentInstance.onItemClick(new MouseEvent('click'), defaultItems[0], 0);
    expect(fixture.componentInstance.isActive(defaultItems[0])).toBe(true);
  });

  it('does not activate disabled items', () => {
    const items: TabMenuItem[] = [{ label: 'Disabled', disabled: true }];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    fixture.componentInstance.onItemClick(new MouseEvent('click'), items[0], 0);
    expect(fixture.componentInstance.activeItem()).toBeNull();
  });

  it('filters hidden items from visibleItems', () => {
    const items: TabMenuItem[] = [
      { label: 'Visible' },
      { label: 'Hidden', visible: false },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleItems().length).toBe(1);
  });

  it('applies styleClass to tab menu', () => {
    fixture.componentRef.setInput('model', defaultItems);
    fixture.componentRef.setInput('styleClass', 'my-tabs');
    fixture.detectChanges();
    expect(fixture.componentInstance.tabMenuClasses()).toContain('my-tabs');
  });
});
