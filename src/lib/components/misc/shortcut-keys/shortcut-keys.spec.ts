import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiShortcutKeysComponent } from './shortcut-keys.component';
import type { ShortcutGroup } from './shortcut-keys.component';

const mockShortcuts: ShortcutGroup[] = [
  {
    group: 'General',
    items: [
      { label: 'Save', keys: ['Ctrl', 'S'] },
      { label: 'Undo', keys: ['Ctrl', 'Z'] },
    ],
  },
  {
    group: 'Navigation',
    items: [{ label: 'Go to file', keys: ['Ctrl', 'P'] }],
  },
];

describe('UiShortcutKeysComponent', () => {
  let fixture: ComponentFixture<UiShortcutKeysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiShortcutKeysComponent] });
    fixture = TestBed.createComponent(UiShortcutKeysComponent);
    fixture.componentRef.setInput('shortcuts', mockShortcuts);
    fixture.detectChanges();
  });

  it('renders when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('.fixed.left-1\\/2');
    expect(panel).toBeTruthy();
  });

  it('hides when visible is false', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('.fixed.left-1\\/2');
    expect(panel).toBeNull();
  });

  it('shows all groups by default', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.filteredGroups().length).toBe(2);
  });

  it('filters groups by label', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    fixture.componentInstance.searchTerm.set('save');
    fixture.detectChanges();
    const groups = fixture.componentInstance.filteredGroups();
    expect(groups.length).toBe(1);
    expect(groups[0].items[0].label).toBe('Save');
  });

  it('filters groups by key', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    fixture.componentInstance.searchTerm.set('ctrl');
    fixture.detectChanges();
    expect(fixture.componentInstance.filteredGroups().length).toBe(2);
  });

  it('shows no results when filter matches nothing', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    fixture.componentInstance.searchTerm.set('xyzabc');
    fixture.detectChanges();
    expect(fixture.componentInstance.hasResults()).toBe(false);
  });

  it('close sets visible to false and emits closed', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    let emitted = false;
    fixture.componentInstance.closed.subscribe(() => (emitted = true));
    fixture.componentInstance.close();
    expect(fixture.componentInstance.visible()).toBe(false);
    expect(emitted).toBe(true);
  });

  it('shows search input when searchable is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('searchable', true);
    fixture.detectChanges();
    const searchInput = fixture.nativeElement.querySelector('input');
    expect(searchInput).toBeTruthy();
  });

  it('hides search input when searchable is false', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('searchable', false);
    fixture.detectChanges();
    const searchInput = fixture.nativeElement.querySelector('input');
    expect(searchInput).toBeNull();
  });
});
