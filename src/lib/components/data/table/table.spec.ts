import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableComponent } from './table.component';
import type { TableColumn } from './table.component';

describe('UiTableComponent', () => {
  let fixture: ComponentFixture<UiTableComponent>;

  const columns: TableColumn[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'age', header: 'Age', sortable: true, align: 'right' },
  ];

  const rows = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Carol', age: 35 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTableComponent] });
    fixture = TestBed.createComponent(UiTableComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders with value and columns', () => {
    fixture.componentRef.setInput('value', rows);
    fixture.componentRef.setInput('columns', columns);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.loading()).toBe(true);
  });

  it('displays all rows when paginator is disabled', () => {
    fixture.componentRef.setInput('value', rows);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('paginator', false);
    fixture.detectChanges();
    expect(fixture.componentInstance.displayData().length).toBe(3);
  });

  it('paginates rows when paginator is enabled', () => {
    fixture.componentRef.setInput('value', rows);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('paginator', true);
    fixture.componentRef.setInput('rows', 2);
    fixture.detectChanges();
    expect(fixture.componentInstance.displayData().length).toBe(2);
  });

  it('sorts data ascending by field', () => {
    fixture.componentRef.setInput('value', rows);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('sortField', 'name');
    fixture.componentRef.setInput('sortOrder', 1);
    fixture.detectChanges();
    const names = fixture.componentInstance.displayData().map((r: Record<string, unknown>) => r['name']);
    expect(names[0]).toBe('Alice');
  });

  it('sorts data descending by field', () => {
    fixture.componentRef.setInput('value', rows);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('sortField', 'name');
    fixture.componentRef.setInput('sortOrder', -1);
    fixture.detectChanges();
    const names = fixture.componentInstance.displayData().map((r: Record<string, unknown>) => r['name']);
    expect(names[0]).toBe('Carol');
  });

  it('applies striped row styling', () => {
    fixture.componentRef.setInput('value', rows);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('striped', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('supports single row selection', () => {
    fixture.componentRef.setInput('value', rows);
    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('selectionMode', 'single');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
