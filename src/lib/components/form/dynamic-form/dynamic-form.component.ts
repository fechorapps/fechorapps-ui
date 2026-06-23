import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'multi-select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'toggle'
  | 'hidden';

export interface DynamicField {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: unknown }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (v: unknown) => string | null;
  };
  showWhen?: { field: string; equals: unknown };
  colspan?: 1 | 2;
}

export interface DynamicFormSchema {
  fields: DynamicField[];
  submitLabel?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * UiDynamicFormComponent — renders a fully dynamic form from a schema definition.
 *
 * Supports conditional field visibility via `showWhen`, built-in validation,
 * single/two-column layouts, and pure signal state (no Angular Forms).
 *
 * @example
 * ```html
 * <ui-dynamic-form [schema]="schema" [(value)]="formValues" (formSubmit)="onSubmit($event)" />
 * ```
 */
@Component({
  selector: 'ui-dynamic-form',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiDynamicFormComponent {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Form schema definition (required) */
  readonly schema = input.required<DynamicFormSchema>();

  /** Whether the entire form is disabled */
  readonly disabled = input<boolean>(false);

  /** Layout mode for the form fields */
  readonly layout = input<'single' | 'two-column' | 'auto'>('auto');

  // =========================================================================
  // MODEL
  // =========================================================================

  /** Two-way bindable form value */
  readonly value = model<Record<string, unknown>>({});

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when the form is submitted and valid */
  readonly formSubmit = output<Record<string, unknown>>();

  /** Emitted whenever any field value changes */
  readonly valueChange = output<Record<string, unknown>>();

  /** Emitted whenever the overall validity changes */
  readonly validChange = output<boolean>();

  // =========================================================================
  // STATE
  // =========================================================================

  /** Internal signal tracking all field values */
  readonly fieldValues = signal<Record<string, unknown>>({});

  /** Whether the form has been submitted (for showing errors) */
  readonly submitted = signal<boolean>(false);

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Fields visible based on showWhen conditions */
  readonly visibleFields = computed(() =>
    this.schema().fields.filter((f) => {
      if (!f.showWhen) return true;
      return this.fieldValues()[f.showWhen.field] === f.showWhen.equals;
    })
  );

  /** Validation errors keyed by field key */
  readonly errors = computed((): Record<string, string | null> => {
    const errs: Record<string, string | null> = {};
    for (const field of this.visibleFields()) {
      errs[field.key] = this.validateField(field, this.fieldValues()[field.key]);
    }
    return errs;
  });

  /** Whether all visible fields are valid */
  readonly isValid = computed(() => Object.values(this.errors()).every((e) => e === null));

  /** CSS grid classes based on layout */
  readonly gridClasses = computed(() => {
    const l = this.layout();
    if (l === 'single') return 'grid grid-cols-1 gap-4';
    if (l === 'two-column') return 'grid grid-cols-2 gap-4';
    return 'grid grid-cols-1 sm:grid-cols-2 gap-4';
  });

  /** Label for the submit button */
  readonly submitLabel = computed(() => this.schema().submitLabel ?? 'Submit');

  // =========================================================================
  // METHODS
  // =========================================================================

  /**
   * Validates a single field value against its rules.
   * Returns an error message string, or null if valid.
   */
  validateField(field: DynamicField, val: unknown): string | null {
    if (field.required && (val === null || val === undefined || val === '')) {
      return `${field.label} is required`;
    }
    const v = field.validation;
    if (!v) return null;
    if (typeof val === 'string') {
      if (v.minLength !== undefined && val.length < v.minLength)
        return `Min ${v.minLength} characters`;
      if (v.maxLength !== undefined && val.length > v.maxLength)
        return `Max ${v.maxLength} characters`;
      if (v.pattern && !new RegExp(v.pattern).test(val)) return 'Invalid format';
    }
    if (typeof val === 'number') {
      if (v.min !== undefined && val < v.min) return `Min value is ${v.min}`;
      if (v.max !== undefined && val > v.max) return `Max value is ${v.max}`;
    }
    return v.custom ? v.custom(val) : null;
  }

  /** Updates a single field value and emits change events. */
  updateField(key: string, val: unknown): void {
    this.fieldValues.update((fv) => ({ ...fv, [key]: val }));
    this.value.set(this.fieldValues());
    this.valueChange.emit(this.fieldValues());
    this.validChange.emit(this.isValid());
  }

  /** Returns the current value for a field key. */
  getFieldValue(key: string): unknown {
    return this.fieldValues()[key];
  }

  /** Returns whether a checkbox/toggle is checked. */
  isChecked(key: string): boolean {
    return this.fieldValues()[key] === true;
  }

  /** Returns whether a radio option is selected. */
  isRadioSelected(key: string, optionValue: unknown): boolean {
    return this.fieldValues()[key] === optionValue;
  }

  /** Returns whether a multi-select option is selected. */
  isMultiSelected(key: string, optionValue: unknown): boolean {
    const val = this.fieldValues()[key];
    if (!Array.isArray(val)) return false;
    return val.includes(optionValue);
  }

  /** Toggles a value in a multi-select field. */
  toggleMultiSelect(key: string, optionValue: unknown): void {
    const current = this.fieldValues()[key];
    const arr: unknown[] = Array.isArray(current) ? [...current] : [];
    const idx = arr.indexOf(optionValue);
    if (idx === -1) {
      arr.push(optionValue);
    } else {
      arr.splice(idx, 1);
    }
    this.updateField(key, arr);
  }

  /** Returns the colspan class for a field. */
  fieldColspanClass(field: DynamicField): string {
    if (field.colspan === 2) return 'col-span-2';
    return 'col-span-1';
  }

  /** Returns the error message for a field (only after submit or when touched). */
  fieldError(key: string): string | null {
    if (!this.submitted()) return null;
    return this.errors()[key] ?? null;
  }

  /** Handles form submission. */
  onSubmit(e: Event): void {
    e.preventDefault();
    this.submitted.set(true);
    if (this.isValid()) this.formSubmit.emit(this.fieldValues());
  }
}
