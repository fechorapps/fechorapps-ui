import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMenuComponent, MenuItem } from './menu.component';

describe('UiMenuComponent', () => {
  let fixture: ComponentFixture<UiMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMenuComponent] });
    fixture = TestBed.createComponent(UiMenuComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders model items', () => {
    const items: MenuItem[] = [
      { label: 'New File' },
      { label: 'Open' },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('New File');
    expect(fixture.nativeElement.textContent).toContain('Open');
  });

  it('filters hidden items from visibleItems', () => {
    const items: MenuItem[] = [
      { label: 'Visible' },
      { label: 'Hidden', visible: false },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleItems().length).toBe(1);
  });

  it('applies disabled item classes', () => {
    const item: MenuItem = { label: 'Disabled', disabled: true };
    fixture.detectChanges();
    const classes = fixture.componentInstance.getItemClasses(item);
    expect(classes).toContain('cursor-not-allowed');
  });

  it('calls item command on click', () => {
    let called = false;
    const item: MenuItem = {
      label: 'Action',
      command: () => { called = true; },
    };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    fixture.componentInstance.onItemClick(new MouseEvent('click'), item);
    expect(called).toBe(true);
  });

  it('appends styleClass to menu classes', () => {
    fixture.componentRef.setInput('styleClass', 'my-menu');
    fixture.detectChanges();
    expect(fixture.componentInstance.menuClasses()).toContain('my-menu');
  });
});
