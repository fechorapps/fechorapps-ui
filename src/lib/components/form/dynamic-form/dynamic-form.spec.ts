import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DynamicField,
  DynamicFormSchema,
  UiDynamicFormComponent,
} from './dynamic-form.component';

// =============================================================================
// TEST HELPERS
// =============================================================================

function makeSchema(fields: DynamicField[], submitLabel?: string): DynamicFormSchema {
  return { fields, submitLabel };
}

describe('UiDynamicFormComponent', () => {
  let fixture: ComponentFixture<UiDynamicFormComponent>;
  let component: UiDynamicFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiDynamicFormComponent] });
    fixture = TestBed.createComponent(UiDynamicFormComponent);
    component = fixture.componentInstance;
  });

  // ===========================================================================
  // Basic rendering
  // ===========================================================================

  it('renders without crashing', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name' },
    ]));
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders field labels in the DOM', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'email', type: 'email', label: 'Email Address' },
    ]));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Email Address');
  });

  it('renders the submit button with default label', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name' },
    ]));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Submit');
  });

  it('renders a custom submitLabel from schema', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name' },
    ], 'Send Now'));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Send Now');
  });

  // ===========================================================================
  // Validation — required field
  // ===========================================================================

  it('required field is invalid when empty', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    const error = component.validateField(
      { key: 'name', type: 'text', label: 'Name', required: true },
      ''
    );
    expect(error).toBe('Name is required');
  });

  it('required field is valid when filled', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    const error = component.validateField(
      { key: 'name', type: 'text', label: 'Name', required: true },
      'John'
    );
    expect(error).toBeNull();
  });

  it('required field is invalid when undefined', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    const error = component.validateField(
      { key: 'name', type: 'text', label: 'Name', required: true },
      undefined
    );
    expect(error).toBe('Name is required');
  });

  // ===========================================================================
  // Validation — minLength / maxLength
  // ===========================================================================

  it('validates minLength', () => {
    const field: DynamicField = {
      key: 'bio', type: 'textarea', label: 'Bio',
      validation: { minLength: 10 },
    };
    fixture.componentRef.setInput('schema', makeSchema([field]));
    fixture.detectChanges();

    expect(component.validateField(field, 'Short')).toBe('Min 10 characters');
    expect(component.validateField(field, 'This is long enough text')).toBeNull();
  });

  it('validates maxLength', () => {
    const field: DynamicField = {
      key: 'code', type: 'text', label: 'Code',
      validation: { maxLength: 5 },
    };
    fixture.componentRef.setInput('schema', makeSchema([field]));
    fixture.detectChanges();

    expect(component.validateField(field, 'TOOLONG')).toBe('Max 5 characters');
    expect(component.validateField(field, 'OK')).toBeNull();
  });

  // ===========================================================================
  // Validation — pattern
  // ===========================================================================

  it('validates pattern', () => {
    const field: DynamicField = {
      key: 'zip', type: 'text', label: 'ZIP Code',
      validation: { pattern: '^\\d{5}$' },
    };
    fixture.componentRef.setInput('schema', makeSchema([field]));
    fixture.detectChanges();

    expect(component.validateField(field, 'ABCDE')).toBe('Invalid format');
    expect(component.validateField(field, '12345')).toBeNull();
  });

  // ===========================================================================
  // Validation — min / max (number)
  // ===========================================================================

  it('validates min/max for numbers', () => {
    const field: DynamicField = {
      key: 'age', type: 'number', label: 'Age',
      validation: { min: 18, max: 99 },
    };
    fixture.componentRef.setInput('schema', makeSchema([field]));
    fixture.detectChanges();

    expect(component.validateField(field, 10)).toBe('Min value is 18');
    expect(component.validateField(field, 150)).toBe('Max value is 99');
    expect(component.validateField(field, 25)).toBeNull();
  });

  // ===========================================================================
  // Validation — custom validator
  // ===========================================================================

  it('calls custom validator and returns its message', () => {
    const customFn = jasmine.createSpy('custom').and.returnValue('Custom error');
    const field: DynamicField = {
      key: 'special', type: 'text', label: 'Special',
      validation: { custom: customFn },
    };
    fixture.componentRef.setInput('schema', makeSchema([field]));
    fixture.detectChanges();

    const result = component.validateField(field, 'test');
    expect(customFn).toHaveBeenCalledWith('test');
    expect(result).toBe('Custom error');
  });

  it('custom validator returning null means valid', () => {
    const field: DynamicField = {
      key: 'special', type: 'text', label: 'Special',
      validation: { custom: () => null },
    };
    fixture.componentRef.setInput('schema', makeSchema([field]));
    fixture.detectChanges();

    expect(component.validateField(field, 'anything')).toBeNull();
  });

  // ===========================================================================
  // showWhen — conditional field visibility
  // ===========================================================================

  it('hides field when showWhen condition is not met', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'subscribe', type: 'checkbox', label: 'Subscribe' },
      {
        key: 'newsletter', type: 'text', label: 'Newsletter Pref',
        showWhen: { field: 'subscribe', equals: true },
      },
    ]));
    fixture.detectChanges();

    // subscribe is not set (falsy) — newsletter should be hidden
    const visible = component.visibleFields();
    expect(visible.some((f) => f.key === 'newsletter')).toBeFalse();
  });

  it('shows field when showWhen condition is met', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'subscribe', type: 'checkbox', label: 'Subscribe' },
      {
        key: 'newsletter', type: 'text', label: 'Newsletter Pref',
        showWhen: { field: 'subscribe', equals: true },
      },
    ]));
    fixture.detectChanges();

    // Simulate setting subscribe to true
    component.updateField('subscribe', true);
    fixture.detectChanges();

    const visible = component.visibleFields();
    expect(visible.some((f) => f.key === 'newsletter')).toBeTrue();
  });

  it('hides field again when showWhen condition becomes unmet', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'type', type: 'select', label: 'Type' },
      {
        key: 'company', type: 'text', label: 'Company',
        showWhen: { field: 'type', equals: 'business' },
      },
    ]));
    fixture.detectChanges();

    component.updateField('type', 'business');
    expect(component.visibleFields().some((f) => f.key === 'company')).toBeTrue();

    component.updateField('type', 'personal');
    expect(component.visibleFields().some((f) => f.key === 'company')).toBeFalse();
  });

  // ===========================================================================
  // isValid / errors
  // ===========================================================================

  it('isValid is true when all visible required fields are filled', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    component.updateField('name', 'Alice');
    expect(component.isValid()).toBeTrue();
  });

  it('isValid is false when a required field is empty', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    expect(component.isValid()).toBeFalse();
  });

  it('errors are keyed by field key', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'email', type: 'email', label: 'Email', required: true },
    ]));
    fixture.detectChanges();

    const errs = component.errors();
    expect(errs['email']).toBe('Email is required');
  });

  // ===========================================================================
  // formSubmit — only emits when valid
  // ===========================================================================

  it('formSubmit is NOT emitted when form is invalid', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    const emitted: Record<string, unknown>[] = [];
    component.formSubmit.subscribe((v) => emitted.push(v));

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(emitted.length).toBe(0);
  });

  it('formSubmit IS emitted with field values when form is valid', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    const emitted: Record<string, unknown>[] = [];
    component.formSubmit.subscribe((v) => emitted.push(v));

    component.updateField('name', 'Alice');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(emitted.length).toBe(1);
    expect(emitted[0]['name']).toBe('Alice');
  });

  // ===========================================================================
  // updateField — value / valid change events
  // ===========================================================================

  it('updateField emits valueChange', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'x', type: 'text', label: 'X' },
    ]));
    fixture.detectChanges();

    const changes: Record<string, unknown>[] = [];
    component.valueChange.subscribe((v) => changes.push(v));

    component.updateField('x', 'hello');
    expect(changes.length).toBe(1);
    expect(changes[0]['x']).toBe('hello');
  });

  it('updateField emits validChange', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'y', type: 'text', label: 'Y', required: true },
    ]));
    fixture.detectChanges();

    const validValues: boolean[] = [];
    component.validChange.subscribe((v) => validValues.push(v));

    component.updateField('y', 'value');
    expect(validValues).toContain(true);
  });

  // ===========================================================================
  // Multi-select helper
  // ===========================================================================

  it('toggleMultiSelect adds and removes values', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'tags', type: 'multi-select', label: 'Tags',
        options: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }] },
    ]));
    fixture.detectChanges();

    component.toggleMultiSelect('tags', 'a');
    expect(component.isMultiSelected('tags', 'a')).toBeTrue();
    expect(component.isMultiSelected('tags', 'b')).toBeFalse();

    component.toggleMultiSelect('tags', 'a');
    expect(component.isMultiSelected('tags', 'a')).toBeFalse();
  });

  // ===========================================================================
  // Layout / colspan
  // ===========================================================================

  it('fieldColspanClass returns col-span-2 for colspan 2', () => {
    fixture.componentRef.setInput('schema', makeSchema([]));
    fixture.detectChanges();

    const field: DynamicField = { key: 'wide', type: 'text', label: 'Wide', colspan: 2 };
    expect(component.fieldColspanClass(field)).toBe('col-span-2');
  });

  it('fieldColspanClass returns col-span-1 for colspan 1', () => {
    fixture.componentRef.setInput('schema', makeSchema([]));
    fixture.detectChanges();

    const field: DynamicField = { key: 'normal', type: 'text', label: 'Normal', colspan: 1 };
    expect(component.fieldColspanClass(field)).toBe('col-span-1');
  });

  // ===========================================================================
  // Error display — only after submit
  // ===========================================================================

  it('fieldError returns null before submission', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    expect(component.fieldError('name')).toBeNull();
  });

  it('fieldError returns error message after submission attempt', () => {
    fixture.componentRef.setInput('schema', makeSchema([
      { key: 'name', type: 'text', label: 'Name', required: true },
    ]));
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.fieldError('name')).toBe('Name is required');
  });
});
