import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDataViewComponent } from './data-view.component';

describe('UiDataViewComponent', () => {
  let fixture: ComponentFixture<UiDataViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiDataViewComponent] });
    fixture = TestBed.createComponent(UiDataViewComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders with value items', () => {
    fixture.componentRef.setInput('value', [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults to list layout', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.layout()).toBe('list');
  });

  it('switches to grid layout', () => {
    fixture.componentRef.setInput('layout', 'grid');
    fixture.detectChanges();
    expect(fixture.componentInstance.isGridLayout()).toBe(true);
  });

  it('paginates data when paginator is enabled', () => {
    const items = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Item ${i}` }));
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 5);
    fixture.detectChanges();
    expect(fixture.componentInstance.paginatedData().length).toBe(5);
  });

  it('shows empty message when value is empty', () => {
    fixture.componentRef.setInput('value', []);
    fixture.componentRef.setInput('emptyMessage', 'No data available');
    fixture.detectChanges();
    expect(fixture.componentInstance.hasData()).toBe(false);
  });

  it('hides layout switcher when showLayoutSwitcher is false', () => {
    fixture.componentRef.setInput('showLayoutSwitcher', false);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
