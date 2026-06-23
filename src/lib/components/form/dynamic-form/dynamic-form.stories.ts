import type { Meta, StoryObj } from '@storybook/angular';
import { UiDynamicFormComponent, DynamicFormSchema } from './dynamic-form.component';

const meta: Meta<UiDynamicFormComponent> = {
  title: 'Form/DynamicForm',
  component: UiDynamicFormComponent,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['single', 'two-column', 'auto'],
      description: 'Grid layout mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all fields',
    },
  },
};

export default meta;
type Story = StoryObj<UiDynamicFormComponent>;

// =============================================================================
// SimpleLogin — email + password
// =============================================================================

const LOGIN_SCHEMA: DynamicFormSchema = {
  fields: [
    {
      key: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'you@example.com',
      required: true,
      validation: { pattern: '^[^@]+@[^@]+\\.[^@]+$' },
      colspan: 2,
    },
    {
      key: 'password',
      type: 'password',
      label: 'Password',
      placeholder: '••••••••',
      required: true,
      validation: { minLength: 8 },
      colspan: 2,
    },
  ],
  submitLabel: 'Sign In',
};

export const SimpleLogin: Story = {
  render: () => ({
    props: {
      schema: LOGIN_SCHEMA,
      layout: 'single' as const,
      onSubmit: (v: Record<string, unknown>) => console.log('Login submitted:', v),
    },
    template: `
      <div class="p-6 max-w-md mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-4">Sign In</h2>
        <ui-dynamic-form
          [schema]="schema"
          [layout]="layout"
          (formSubmit)="onSubmit($event)"
        />
      </div>
    `,
  }),
};

// =============================================================================
// ContactForm — text + email + textarea
// =============================================================================

const CONTACT_SCHEMA: DynamicFormSchema = {
  fields: [
    {
      key: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'John',
      required: true,
    },
    {
      key: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Doe',
      required: true,
    },
    {
      key: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'john@example.com',
      required: true,
      colspan: 2,
    },
    {
      key: 'subject',
      type: 'select',
      label: 'Subject',
      placeholder: 'Choose a topic',
      colspan: 2,
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Support', value: 'support' },
        { label: 'Billing', value: 'billing' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      key: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Your message…',
      required: true,
      validation: { minLength: 20, maxLength: 1000 },
      colspan: 2,
    },
  ],
  submitLabel: 'Send Message',
};

export const ContactForm: Story = {
  render: () => ({
    props: {
      schema: CONTACT_SCHEMA,
      onSubmit: (v: Record<string, unknown>) => console.log('Contact form submitted:', v),
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
        <ui-dynamic-form
          [schema]="schema"
          (formSubmit)="onSubmit($event)"
        />
      </div>
    `,
  }),
};

// =============================================================================
// ConditionalFields — shows extra field when checkbox ticked
// =============================================================================

const CONDITIONAL_SCHEMA: DynamicFormSchema = {
  fields: [
    {
      key: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Your name',
      required: true,
      colspan: 2,
    },
    {
      key: 'isBusiness',
      type: 'checkbox',
      label: 'I am registering on behalf of a company',
      colspan: 2,
    },
    {
      key: 'companyName',
      type: 'text',
      label: 'Company Name',
      placeholder: 'Acme Corp',
      required: true,
      showWhen: { field: 'isBusiness', equals: true },
      colspan: 2,
    },
    {
      key: 'vatNumber',
      type: 'text',
      label: 'VAT Number',
      placeholder: 'GB123456789',
      showWhen: { field: 'isBusiness', equals: true },
    },
    {
      key: 'industry',
      type: 'select',
      label: 'Industry',
      placeholder: 'Select industry',
      showWhen: { field: 'isBusiness', equals: true },
      options: [
        { label: 'Technology', value: 'tech' },
        { label: 'Finance', value: 'finance' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Other', value: 'other' },
      ],
    },
  ],
  submitLabel: 'Register',
};

export const ConditionalFields: Story = {
  render: () => ({
    props: {
      schema: CONDITIONAL_SCHEMA,
      onSubmit: (v: Record<string, unknown>) => console.log('Registration submitted:', v),
      onValueChange: (v: Record<string, unknown>) => console.log('Value changed:', v),
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-1">Registration</h2>
        <p class="text-sm text-muted-foreground mb-4">
          Tick the checkbox to reveal company fields.
        </p>
        <ui-dynamic-form
          [schema]="schema"
          (formSubmit)="onSubmit($event)"
          (valueChange)="onValueChange($event)"
        />
      </div>
    `,
  }),
};

// =============================================================================
// TwoColumnLayout — survey with various field types
// =============================================================================

const TWO_COLUMN_SCHEMA: DynamicFormSchema = {
  fields: [
    {
      key: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'John',
      required: true,
    },
    {
      key: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Doe',
      required: true,
    },
    {
      key: 'age',
      type: 'number',
      label: 'Age',
      placeholder: '25',
      validation: { min: 18, max: 120 },
    },
    {
      key: 'birthDate',
      type: 'date',
      label: 'Date of Birth',
    },
    {
      key: 'country',
      type: 'select',
      label: 'Country',
      placeholder: 'Select country',
      options: [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
      ],
    },
    {
      key: 'gender',
      type: 'radio',
      label: 'Gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Prefer not to say', value: 'none' },
      ],
    },
    {
      key: 'interests',
      type: 'multi-select',
      label: 'Interests',
      colspan: 2,
      options: [
        { label: 'Technology', value: 'tech' },
        { label: 'Sports', value: 'sports' },
        { label: 'Music', value: 'music' },
        { label: 'Travel', value: 'travel' },
      ],
    },
    {
      key: 'newsletter',
      type: 'toggle',
      label: 'Subscribe to newsletter',
      colspan: 2,
    },
    {
      key: 'terms',
      type: 'checkbox',
      label: 'I accept the terms and conditions',
      required: true,
      colspan: 2,
    },
  ],
  submitLabel: 'Complete Survey',
};

export const TwoColumnLayout: Story = {
  render: () => ({
    props: {
      schema: TWO_COLUMN_SCHEMA,
      onSubmit: (v: Record<string, unknown>) => console.log('Survey submitted:', v),
    },
    template: `
      <div class="p-6 max-w-3xl mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-1">User Survey</h2>
        <p class="text-sm text-muted-foreground mb-4">
          All field types shown in two-column layout.
        </p>
        <ui-dynamic-form
          [schema]="schema"
          layout="two-column"
          (formSubmit)="onSubmit($event)"
        />
      </div>
    `,
  }),
};

// =============================================================================
// DisabledState — all fields disabled
// =============================================================================

export const DisabledState: Story = {
  render: () => ({
    props: {
      schema: LOGIN_SCHEMA,
    },
    template: `
      <div class="p-6 max-w-md mx-auto">
        <h2 class="text-xl font-semibold text-foreground mb-4">Disabled Form</h2>
        <ui-dynamic-form
          [schema]="schema"
          [disabled]="true"
          layout="single"
        />
      </div>
    `,
  }),
};
