import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMenubarComponent, MenubarItem } from './menubar.component';

describe('UiMenubarComponent', () => {
  let fixture: ComponentFixture<UiMenubarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMenubarComponent] });
    fixture = TestBed.createComponent(UiMenubarComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders model items', () => {
    const items: MenubarItem[] = [
      { label: 'File' },
      { label: 'Edit' },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('File');
    expect(fixture.nativeElement.textContent).toContain('Edit');
  });

  it('filters hidden items from visibleItems', () => {
    const items: MenubarItem[] = [
      { label: 'Visible' },
      { label: 'Hidden', visible: false },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleItems().length).toBe(1);
  });

  it('no active item by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.activeItem()).toBeNull();
  });

  it('toggles dropdown on item with sub-items', () => {
    const item: MenubarItem = {
      label: 'File',
      items: [{ label: 'New' }],
    };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    fixture.componentInstance.onItemClick(new MouseEvent('click'), item);
    expect(fixture.componentInstance.isActive(item)).toBe(true);
  });

  it('applies styleClass to menubar', () => {
    fixture.componentRef.setInput('styleClass', 'my-menubar');
    fixture.detectChanges();
    expect(fixture.componentInstance.menubarClasses()).toContain('my-menubar');
  });
});
