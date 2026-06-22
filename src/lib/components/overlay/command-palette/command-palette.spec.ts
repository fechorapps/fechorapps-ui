import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCommandPaletteComponent } from './command-palette.component';
import type { CommandGroup } from './command-palette.component';

describe('UiCommandPaletteComponent', () => {
  let fixture: ComponentFixture<UiCommandPaletteComponent>;
  let component: UiCommandPaletteComponent;

  const sampleGroups: CommandGroup[] = [
    {
      label: 'Navigation',
      items: [
        { id: 'home', label: 'Go to Home', action: () => {} },
        { id: 'settings', label: 'Open Settings', action: () => {} },
      ],
    },
    {
      label: 'Files',
      items: [
        { id: 'new-file', label: 'New File', action: () => {} },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCommandPaletteComponent] });
    fixture = TestBed.createComponent(UiCommandPaletteComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('is hidden by default', () => {
    fixture.detectChanges();
    expect(component.visible()).toBe(false);
  });

  it('opens and closes via open()/close()', () => {
    fixture.detectChanges();
    component.open();
    expect(component.visible()).toBe(true);

    component.close();
    expect(component.visible()).toBe(false);
  });

  it('resets searchQuery on close', () => {
    component.open();
    component.searchQuery.set('test');
    component.close();
    expect(component.searchQuery()).toBe('');
  });

  it('filters groups by searchQuery case-insensitively', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('groups', sampleGroups);
    });
    fixture.detectChanges();

    component.searchQuery.set('home');
    const filtered = component.filteredGroups();
    expect(filtered.length).toBe(1);
    expect(filtered[0].items.length).toBe(1);
    expect(filtered[0].items[0].id).toBe('home');
  });

  it('returns all groups when searchQuery is empty', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('groups', sampleGroups);
    });
    fixture.detectChanges();

    component.searchQuery.set('');
    expect(component.filteredGroups().length).toBe(2);
  });

  it('flatItems returns all items from filteredGroups', () => {
    TestBed.runInInjectionContext(() => {
      fixture.componentRef.setInput('groups', sampleGroups);
    });
    fixture.detectChanges();

    expect(component.flatItems().length).toBe(3);
  });
});
