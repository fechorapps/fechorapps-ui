import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCollapsibleNavComponent, NavItem } from './collapsible-nav.component';
import { Home, Settings, Users } from 'lucide-angular';

const mockItems: NavItem[] = [
  { id: '1', label: 'Dashboard', icon: Home, route: '/dashboard' },
  { id: '2', label: 'Settings', icon: Settings, route: '/settings' },
  {
    id: '3',
    label: 'Users',
    icon: Users,
    children: [
      { id: '3-1', label: 'All Users', route: '/users' },
      { id: '3-2', label: 'Add User', route: '/users/add' },
    ],
  },
  { id: '4', label: 'Disabled Item', route: '/disabled', disabled: true },
];

const sectionItems: NavItem[] = [
  { id: 'a', label: 'Dashboard', route: '/dashboard', section: 'Main' },
  { id: 'b', label: 'Analytics', route: '/analytics', section: 'Main' },
  { id: 'c', label: 'Settings', route: '/settings', section: 'Admin' },
];

const badgeItems: NavItem[] = [
  { id: 'x', label: 'Messages', route: '/messages', badge: 5 },
  { id: 'y', label: 'Alerts', route: '/alerts', badge: 'New' },
];

describe('UiCollapsibleNavComponent', () => {
  let fixture: ComponentFixture<UiCollapsibleNavComponent>;
  let component: UiCollapsibleNavComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCollapsibleNavComponent] });
    fixture = TestBed.createComponent(UiCollapsibleNavComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders all top-level items', () => {
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    // header toggle + 4 items
    expect(buttons.length).toBeGreaterThanOrEqual(4);
    const labels = Array.from(buttons as NodeListOf<HTMLElement>).map(b => b.textContent?.trim() ?? '');
    expect(labels.some(l => l.includes('Dashboard'))).toBeTrue();
    expect(labels.some(l => l.includes('Settings'))).toBeTrue();
  });

  it('does not show children before expanding', () => {
    fixture.detectChanges();
    const allText = fixture.nativeElement.textContent as string;
    expect(allText).not.toContain('All Users');
  });

  it('toggleExpand shows children when expanded', () => {
    fixture.detectChanges();
    component.toggleExpand('3');
    fixture.detectChanges();
    const allText = fixture.nativeElement.textContent as string;
    expect(allText).toContain('All Users');
  });

  it('toggleExpand hides children again when toggled twice', () => {
    fixture.detectChanges();
    component.toggleExpand('3');
    fixture.detectChanges();
    component.toggleExpand('3');
    fixture.detectChanges();
    const allText = fixture.nativeElement.textContent as string;
    expect(allText).not.toContain('All Users');
  });

  it('active route highlights the matching item', () => {
    fixture.componentRef.setInput('activeRoute', '/dashboard');
    fixture.detectChanges();
    // The active button gets bg-accent class
    const activeBtn = fixture.nativeElement.querySelector('button.bg-accent') as HTMLButtonElement | null;
    expect(activeBtn).toBeTruthy();
    expect(activeBtn!.textContent).toContain('Dashboard');
  });

  it('collapsed mode changes width to collapsedWidth', () => {
    fixture.componentRef.setInput('collapsed', true);
    fixture.componentRef.setInput('collapsedWidth', '64px');
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.style.width).toBe('64px');
  });

  it('expanded mode uses width input', () => {
    fixture.componentRef.setInput('collapsed', false);
    fixture.componentRef.setInput('width', '260px');
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.style.width).toBe('260px');
  });

  it('disabled item does not emit itemClicked', () => {
    fixture.detectChanges();
    const emitSpy = jasmine.createSpy('itemClicked');
    component.itemClicked.subscribe(emitSpy);
    component.onItemClick(mockItems[3]); // disabled item
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('enabled item emits itemClicked', () => {
    fixture.detectChanges();
    const emitSpy = jasmine.createSpy('itemClicked');
    component.itemClicked.subscribe(emitSpy);
    component.onItemClick(mockItems[0]); // Dashboard
    expect(emitSpy).toHaveBeenCalledWith(mockItems[0]);
  });

  it('item with children does not emit itemClicked but toggles expand', () => {
    fixture.detectChanges();
    const emitSpy = jasmine.createSpy('itemClicked');
    component.itemClicked.subscribe(emitSpy);
    component.onItemClick(mockItems[2]); // Users (has children)
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.isExpanded('3')).toBeTrue();
  });

  it('toggleCollapse toggles collapsed model and emits collapsedChange', () => {
    fixture.componentRef.setInput('collapsed', false);
    fixture.detectChanges();
    const emitSpy = jasmine.createSpy('collapsedChange');
    component.collapsedChange.subscribe(emitSpy);
    component.toggleCollapse();
    expect(component.collapsed()).toBeTrue();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('collapses labels in collapsed mode', () => {
    fixture.componentRef.setInput('collapsed', true);
    fixture.detectChanges();
    // Labels should not be visible (spans with label text won't be in DOM when collapsed)
    const labelSpans = fixture.nativeElement.querySelectorAll('span.flex-1');
    expect(labelSpans.length).toBe(0);
  });

  it('renders section headers when items have sections', () => {
    fixture.componentRef.setInput('items', sectionItems);
    fixture.detectChanges();
    const allText = fixture.nativeElement.textContent as string;
    expect(allText).toContain('Main');
    expect(allText).toContain('Admin');
  });

  it('groups items correctly by section', () => {
    fixture.componentRef.setInput('items', sectionItems);
    fixture.detectChanges();
    const groups = component.groupedItems();
    expect(groups.length).toBe(2);
    expect(groups[0].section).toBe('Main');
    expect(groups[0].items.length).toBe(2);
    expect(groups[1].section).toBe('Admin');
    expect(groups[1].items.length).toBe(1);
  });

  it('renders badge values', () => {
    fixture.componentRef.setInput('items', badgeItems);
    fixture.detectChanges();
    const allText = fixture.nativeElement.textContent as string;
    expect(allText).toContain('5');
    expect(allText).toContain('New');
  });
});
