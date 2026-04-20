import type { Meta, StoryObj } from '@storybook/angular';

import { UiSelectComponent } from './select.component';

const meta: Meta<UiSelectComponent> = {
  title: 'Form/Select',
  component: UiSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
    },
    filter: {
      control: 'boolean',
      description: 'Enable filtering',
    },
    showClear: {
      control: 'boolean',
      description: 'Show clear button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether select is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether select is in invalid state',
    },
  },
};

export default meta;
type Story = StoryObj<UiSelectComponent>;

const countryOptions = [
  { label: 'Mexico', value: 'mx' },
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'Brazil', value: 'br' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Spain', value: 'es' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
];

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

export const WithFilter: Story = {
  args: {
    label: 'Country',
    placeholder: 'Search countries...',
    options: countryOptions,
    filter: true,
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    showClear: true,
  },
};

export const Variants: Story = {
  render: () => ({
    props: {
      options: countryOptions,
    },
    template: `
      <div class="flex flex-col gap-6">
        <ui-select variant="default" label="Default" placeholder="Select..." [options]="options"></ui-select>
        <ui-select variant="filled" label="Filled" placeholder="Select..." [options]="options"></ui-select>
        <ui-select variant="outlined" label="Outlined" placeholder="Select..." [options]="options"></ui-select>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: {
      options: countryOptions,
    },
    template: `
      <div class="flex flex-col gap-6">
        <ui-select size="sm" label="Small" placeholder="Select..." [options]="options"></ui-select>
        <ui-select size="md" label="Medium" placeholder="Select..." [options]="options"></ui-select>
        <ui-select size="lg" label="Large" placeholder="Select..." [options]="options"></ui-select>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
    invalid: true,
    helpText: 'Please select a country',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Subscription Plan',
    placeholder: 'Select a plan',
    options: [
      { label: 'Free', value: 'free' },
      { label: 'Basic', value: 'basic' },
      { label: 'Pro', value: 'pro' },
      { label: 'Enterprise (Coming Soon)', value: 'enterprise', disabled: true },
    ],
  },
};
