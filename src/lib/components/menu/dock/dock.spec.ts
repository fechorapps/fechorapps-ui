import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDockComponent, DockItem } from './dock.component';
import { Home, Settings } from 'lucide-angular';

describe('UiDockComponent', () => {
  let fixture: ComponentFixture<UiDockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiDockComponent] });
    fixture = TestBed.createComponent(UiDockComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults position to bottom', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.position()).toBe('bottom');
  });

  it('renders dock items', () => {
    const items: DockItem[] = [
      { label: 'Home', icon: Home },
      { label: 'Settings', icon: Settings },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.componentInstance.model().length).toBe(2);
  });

  it('emits onItemClick when a non-disabled item is clicked', () => {
    const item: DockItem = { label: 'Home', icon: Home };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    const emitted: DockItem[] = [];
    fixture.componentInstance.onItemClick.subscribe((i: DockItem) => emitted.push(i));
    fixture.componentInstance.handleClick(item, new MouseEvent('click'));
    expect(emitted.length).toBe(1);
    expect(emitted[0].label).toBe('Home');
  });

  it('does not emit onItemClick for disabled items', () => {
    const item: DockItem = { label: 'Disabled', icon: Home, disabled: true };
    fixture.detectChanges();
    const emitted: DockItem[] = [];
    fixture.componentInstance.onItemClick.subscribe((i: DockItem) => emitted.push(i));
    fixture.componentInstance.handleClick(item, new MouseEvent('click'));
    expect(emitted.length).toBe(0);
  });

  it('applies correct scale for hovered item', () => {
    fixture.detectChanges();
    fixture.componentInstance.handleMouseEnter(1);
    expect(fixture.componentInstance.getScale(1)).toBe(1.5);
    expect(fixture.componentInstance.getScale(0)).toBe(1.25);
  });

  it('applies top position wrapper classes', () => {
    fixture.componentRef.setInput('position', 'top');
    fixture.detectChanges();
    expect(fixture.componentInstance.wrapperClasses()).toContain('top-4');
  });
});
