import type { Meta, StoryObj } from '@storybook/angular';
import { UiFieldArrayComponent } from './field-array.component';
import type { DynamicField } from '../dynamic-form';

const meta: Meta<UiFieldArrayComponent> = {
  title: 'Form/FieldArray',
  component: UiFieldArrayComponent,
  tags: ['autodocs'],
  argTypes: {
    addLabel: {
      control: 'text',
      description: 'Label for the add-row button',
    },
    sortable: {
      control: 'boolean',
      description: 'Enable drag-and-drop row reordering',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all interactions',
    },
    minItems: {
      control: 'number',
      description: 'Minimum number of rows (remove blocked below this)',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of rows (add blocked at this count)',
    },
  },
};

export default meta;
type Story = StoryObj<UiFieldArrayComponent>;

// =============================================================================
// Schema helpers
// =============================================================================

const NAME_EMAIL_SCHEMA: DynamicField[] = [
  { key: 'name', type: 'text', label: 'Name', placeholder: 'Full name' },
  { key: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com' },
];

const PRODUCT_SCHEMA: DynamicField[] = [
  { key: 'product', type: 'text', label: 'Product', placeholder: 'Product name' },
  { key: 'qty', type: 'number', label: 'Qty', placeholder: '1' },
  {
    key: 'category',
    type: 'select',
    label: 'Category',
    placeholder: 'Pick one',
    options: [
      { label: 'Electronics', value: 'electronics' },
      { label: 'Clothing', value: 'clothing' },
      { label: 'Food', value: 'food' },
    ],
  },
];

// =============================================================================
// Simple — name + email rows, no constraints
// =============================================================================

export const Simple: Story = {
  render: () => ({
    props: {
      schema: NAME_EMAIL_SCHEMA,
      value: [
        { name: 'Alice Smith', email: 'alice@example.com' },
        { name: 'Bob Jones', email: 'bob@example.com' },
      ],
      onValueChange: (v: Record<string, unknown>[]) =>
        console.log('Field array value:', v),
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-1">Team Members</h2>
        <p class="text-sm text-muted-foreground mb-4">Add and manage team member rows.</p>
        <ui-field-array
          [schema]="schema"
          [value]="value"
          (valueChange)="onValueChange($event)"
        />
      </div>
    `,
  }),
};

// =============================================================================
// WithMinMax — min 1, max 5
// =============================================================================

export const WithMinMax: Story = {
  render: () => ({
    props: {
      schema: NAME_EMAIL_SCHEMA,
      value: [{ name: 'Required Row', email: 'required@example.com' }],
      onValueChange: (v: Record<string, unknown>[]) =>
        console.log('WithMinMax value:', v),
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-1">Contacts (1–5)</h2>
        <p class="text-sm text-muted-foreground mb-4">
          At least 1 row required. Maximum 5 rows allowed.
        </p>
        <ui-field-array
          [schema]="schema"
          [value]="value"
          [minItems]="1"
          [maxItems]="5"
          addLabel="Add contact"
          (valueChange)="onValueChange($event)"
        />
      </div>
    `,
  }),
};

// =============================================================================
// Sortable — drag handles enabled
// =============================================================================

export const Sortable: Story = {
  render: () => ({
    props: {
      schema: PRODUCT_SCHEMA,
      value: [
        { product: 'Widget A', qty: 10, category: 'electronics' },
        { product: 'Widget B', qty: 5, category: 'clothing' },
        { product: 'Widget C', qty: 3, category: 'food' },
      ],
      onValueChange: (v: Record<string, unknown>[]) =>
        console.log('Sortable value:', v),
    },
    template: `
      <div class="p-6 max-w-3xl mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-1">Order Lines</h2>
        <p class="text-sm text-muted-foreground mb-4">
          Drag the grip handle to reorder rows.
        </p>
        <ui-field-array
          [schema]="schema"
          [value]="value"
          [sortable]="true"
          addLabel="Add line"
          (valueChange)="onValueChange($event)"
        />
      </div>
    `,
  }),
};

// =============================================================================
// Disabled — all interactions locked
// =============================================================================

export const Disabled: Story = {
  render: () => ({
    props: {
      schema: NAME_EMAIL_SCHEMA,
      value: [
        { name: 'Alice Smith', email: 'alice@example.com' },
        { name: 'Bob Jones', email: 'bob@example.com' },
      ],
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-1">Read-only Members</h2>
        <p class="text-sm text-muted-foreground mb-4">
          All inputs and buttons are disabled.
        </p>
        <ui-field-array
          [schema]="schema"
          [value]="value"
          [disabled]="true"
        />
      </div>
    `,
  }),
};
