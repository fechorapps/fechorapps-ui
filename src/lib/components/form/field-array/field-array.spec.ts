import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiFieldArrayComponent } from './field-array.component';
import type { DynamicField } from '../dynamic-form';

// =============================================================================
// TEST HELPERS
// =============================================================================

const NAME_EMAIL_SCHEMA: DynamicField[] = [
  { key: 'name', type: 'text', label: 'Name', placeholder: 'Full name' },
  { key: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com' },
];

describe('UiFieldArrayComponent', () => {
  let fixture: ComponentFixture<UiFieldArrayComponent>;
  let component: UiFieldArrayComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiFieldArrayComponent] });
    fixture = TestBed.createComponent(UiFieldArrayComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('schema', NAME_EMAIL_SCHEMA);
    fixture.detectChanges();
  });

  // ===========================================================================
  // Basic rendering
  // ===========================================================================

  it('renders without crashing', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders schema column headers', () => {
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Name');
    expect(text).toContain('Email');
  });

  it('renders the add button with default label', () => {
    expect(fixture.nativeElement.textContent).toContain('Add item');
  });

  it('renders a custom addLabel', () => {
    fixture.componentRef.setInput('addLabel', 'Add row');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Add row');
  });

  // ===========================================================================
  // addRow()
  // ===========================================================================

  it('addRow appends an empty row', () => {
    component.addRow();
    expect(component.rows().length).toBe(1);
  });

  it('addRow row has keys from schema with empty string values', () => {
    component.addRow();
    const row = component.rows()[0];
    expect(row['name']).toBe('');
    expect(row['email']).toBe('');
  });

  it('addRow appends multiple rows', () => {
    component.addRow();
    component.addRow();
    component.addRow();
    expect(component.rows().length).toBe(3);
  });

  it('addRow emits valueChange', () => {
    const emitted: Record<string, unknown>[][] = [];
    component.valueChange.subscribe((v) => emitted.push(v));
    component.addRow();
    expect(emitted.length).toBe(1);
    expect(emitted[0].length).toBe(1);
  });

  // ===========================================================================
  // removeRow()
  // ===========================================================================

  it('removeRow removes the row at the given index', () => {
    component.addRow();
    component.addRow();
    component.updateCell(0, 'name', 'Alice');
    component.updateCell(1, 'name', 'Bob');

    component.removeRow(0);

    expect(component.rows().length).toBe(1);
    expect(component.rows()[0]['name']).toBe('Bob');
  });

  it('removeRow removes the last row', () => {
    component.addRow();
    component.addRow();
    component.removeRow(1);
    expect(component.rows().length).toBe(1);
  });

  it('removeRow emits valueChange', () => {
    component.addRow();
    component.addRow();
    const emitted: Record<string, unknown>[][] = [];
    component.valueChange.subscribe((v) => emitted.push(v));
    component.removeRow(0);
    expect(emitted.length).toBe(1);
  });

  // ===========================================================================
  // updateCell()
  // ===========================================================================

  it('updateCell updates the correct cell', () => {
    component.addRow();
    component.updateCell(0, 'name', 'Alice');
    expect(component.rows()[0]['name']).toBe('Alice');
  });

  it('updateCell does not mutate other rows', () => {
    component.addRow();
    component.addRow();
    component.updateCell(0, 'name', 'Alice');
    component.updateCell(1, 'name', 'Bob');
    expect(component.rows()[0]['name']).toBe('Alice');
    expect(component.rows()[1]['name']).toBe('Bob');
  });

  it('updateCell emits valueChange', () => {
    component.addRow();
    const emitted: Record<string, unknown>[][] = [];
    component.valueChange.subscribe((v) => emitted.push(v));
    component.updateCell(0, 'name', 'Alice');
    expect(emitted.length).toBe(1);
  });

  // ===========================================================================
  // canAdd — maxItems
  // ===========================================================================

  it('canAdd is true when no maxItems set', () => {
    expect(component.canAdd()).toBeTrue();
  });

  it('canAdd is false when rows.length === maxItems', () => {
    fixture.componentRef.setInput('maxItems', 2);
    component.addRow();
    component.addRow();
    fixture.detectChanges();
    expect(component.canAdd()).toBeFalse();
  });

  it('canAdd is true when rows.length < maxItems', () => {
    fixture.componentRef.setInput('maxItems', 3);
    component.addRow();
    fixture.detectChanges();
    expect(component.canAdd()).toBeTrue();
  });

  it('addRow does nothing when at maxItems', () => {
    fixture.componentRef.setInput('maxItems', 1);
    component.addRow();
    component.addRow(); // should be ignored
    expect(component.rows().length).toBe(1);
  });

  // ===========================================================================
  // canRemove — minItems
  // ===========================================================================

  it('canRemove is false when rows.length === minItems', () => {
    fixture.componentRef.setInput('minItems', 1);
    component.addRow();
    fixture.detectChanges();
    expect(component.canRemove()).toBeFalse();
  });

  it('canRemove is true when rows.length > minItems', () => {
    fixture.componentRef.setInput('minItems', 1);
    component.addRow();
    component.addRow();
    fixture.detectChanges();
    expect(component.canRemove()).toBeTrue();
  });

  it('removeRow does nothing when at minItems', () => {
    fixture.componentRef.setInput('minItems', 1);
    component.addRow();
    component.removeRow(0); // should be ignored
    expect(component.rows().length).toBe(1);
  });

  // ===========================================================================
  // Drag-and-drop — onDrop reorders rows
  // ===========================================================================

  it('onDrop reorders rows from index 0 to index 2', () => {
    component.addRow();
    component.addRow();
    component.addRow();
    component.updateCell(0, 'name', 'Alice');
    component.updateCell(1, 'name', 'Bob');
    component.updateCell(2, 'name', 'Carol');

    component.onDragStart(0);
    component.onDrop(2);

    expect(component.rows()[0]['name']).toBe('Bob');
    expect(component.rows()[1]['name']).toBe('Carol');
    expect(component.rows()[2]['name']).toBe('Alice');
  });

  it('onDrop reorders rows from index 2 to index 0', () => {
    component.addRow();
    component.addRow();
    component.addRow();
    component.updateCell(0, 'name', 'Alice');
    component.updateCell(1, 'name', 'Bob');
    component.updateCell(2, 'name', 'Carol');

    component.onDragStart(2);
    component.onDrop(0);

    expect(component.rows()[0]['name']).toBe('Carol');
    expect(component.rows()[1]['name']).toBe('Alice');
    expect(component.rows()[2]['name']).toBe('Bob');
  });

  it('onDrop does nothing when source equals target', () => {
    component.addRow();
    component.addRow();
    component.updateCell(0, 'name', 'Alice');
    component.updateCell(1, 'name', 'Bob');

    component.onDragStart(0);
    component.onDrop(0);

    expect(component.rows()[0]['name']).toBe('Alice');
    expect(component.rows()[1]['name']).toBe('Bob');
  });

  it('onDrop resets dragIndex to null', () => {
    component.addRow();
    component.addRow();
    component.onDragStart(0);
    component.onDrop(1);
    expect(component.dragIndex()).toBeNull();
  });

  it('onDrop emits valueChange', () => {
    component.addRow();
    component.addRow();
    const emitted: Record<string, unknown>[][] = [];
    component.valueChange.subscribe((v) => emitted.push(v));
    component.onDragStart(0);
    component.onDrop(1);
    expect(emitted.length).toBe(1);
  });

  // ===========================================================================
  // Disabled state
  // ===========================================================================

  it('addRow does nothing when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    component.addRow();
    expect(component.rows().length).toBe(0);
  });

  it('removeRow does nothing when disabled', () => {
    component.addRow();
    fixture.componentRef.setInput('disabled', true);
    component.removeRow(0);
    expect(component.rows().length).toBe(1);
  });

  it('updateCell does nothing when disabled', () => {
    component.addRow();
    fixture.componentRef.setInput('disabled', true);
    component.updateCell(0, 'name', 'Should not be set');
    expect(component.rows()[0]['name']).toBe('');
  });

  // ===========================================================================
  // cellValue helper
  // ===========================================================================

  it('cellValue returns empty string for missing row', () => {
    expect(component.cellValue(99, 'name')).toBe('');
  });

  it('cellValue converts value to string', () => {
    component.addRow();
    component.updateCell(0, 'name', 42);
    expect(component.cellValue(0, 'name')).toBe('42');
  });
});
