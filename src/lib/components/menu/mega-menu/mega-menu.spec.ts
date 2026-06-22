import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMegaMenuComponent, MegaMenuItem } from './mega-menu.component';

describe('UiMegaMenuComponent', () => {
  let fixture: ComponentFixture<UiMegaMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMegaMenuComponent] });
    fixture = TestBed.createComponent(UiMegaMenuComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults orientation to horizontal', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.orientation()).toBe('horizontal');
  });

  it('renders menu items', () => {
    const items: MegaMenuItem[] = [
      { label: 'Products' },
      { label: 'Solutions' },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Products');
    expect(fixture.nativeElement.textContent).toContain('Solutions');
  });

  it('no active submenu by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex()).toBeNull();
  });

  it('toggles submenu on toggleSubmenu call', () => {
    const item: MegaMenuItem = {
      label: 'Products',
      items: [[{ label: 'Sub 1' }]],
    };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    fixture.componentInstance.toggleSubmenu(0, item);
    expect(fixture.componentInstance.activeIndex()).toBe(0);
  });

  it('applies vertical orientation class', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('flex-col');
  });
});
