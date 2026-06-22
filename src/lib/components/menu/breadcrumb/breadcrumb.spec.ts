import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiBreadcrumbComponent, BreadcrumbItem } from './breadcrumb.component';

describe('UiBreadcrumbComponent', () => {
  let fixture: ComponentFixture<UiBreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiBreadcrumbComponent] });
    fixture = TestBed.createComponent(UiBreadcrumbComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders model items', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home' },
      { label: 'Library' },
      { label: 'Data' },
    ];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Library');
  });

  it('renders home item when provided', () => {
    const home: BreadcrumbItem = { label: 'Home' };
    fixture.componentRef.setInput('home', home);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Home');
  });

  it('emits onItemClick when an item is clicked', () => {
    const items: BreadcrumbItem[] = [{ label: 'Products', id: 'prod' }];
    fixture.componentRef.setInput('model', items);
    fixture.detectChanges();
    const emitted: unknown[] = [];
    fixture.componentInstance.onItemClick.subscribe((e) => emitted.push(e));
    const event = new MouseEvent('click');
    fixture.componentInstance.onItemClicked(event, items[0]);
    expect(emitted.length).toBe(1);
  });

  it('does not emit onItemClick for disabled items', () => {
    const item: BreadcrumbItem = { label: 'Disabled', disabled: true };
    fixture.componentRef.setInput('model', [item]);
    fixture.detectChanges();
    const emitted: unknown[] = [];
    fixture.componentInstance.onItemClick.subscribe((e) => emitted.push(e));
    const event = new MouseEvent('click');
    fixture.componentInstance.onItemClicked(event, item);
    expect(emitted.length).toBe(0);
  });

  it('appends styleClass to breadcrumb classes', () => {
    fixture.componentRef.setInput('styleClass', 'custom-bc');
    fixture.detectChanges();
    expect(fixture.componentInstance.breadcrumbClasses()).toContain('custom-bc');
  });
});
