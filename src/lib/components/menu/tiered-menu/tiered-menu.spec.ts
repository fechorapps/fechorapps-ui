import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTieredMenuComponent, TieredMenuItem } from './tiered-menu.component';

describe('UiTieredMenuComponent', () => {
  let fixture: ComponentFixture<UiTieredMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTieredMenuComponent] });
    fixture = TestBed.createComponent(UiTieredMenuComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders model items', () => {
    const items: TieredMenuItem[] = [
      { label: 'File' },
      { label: 'Edit' },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('File');
    expect(fixture.nativeElement.textContent).toContain('Edit');
  });

  it('is visible by default (non-popup mode)', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(true);
  });

  it('filters hidden items from visibleItems', () => {
    const items: TieredMenuItem[] = [
      { label: 'Visible' },
      { label: 'Hidden', visible: false },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleItems().length).toBe(1);
  });

  it('calls item command on click', () => {
    let called = false;
    const item: TieredMenuItem = {
      label: 'Action',
      command: () => { called = true; },
    };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    fixture.componentInstance.onItemClick(new MouseEvent('click'), item);
    expect(called).toBe(true);
  });

  it('applies styleClass to menu', () => {
    fixture.componentRef.setInput('styleClass', 'tiered-custom');
    fixture.detectChanges();
    expect(fixture.componentInstance.menuClasses()).toContain('tiered-custom');
  });
});
