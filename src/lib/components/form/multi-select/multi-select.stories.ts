import type { Meta, StoryObj } from '@storybook/angular';

import { UiMultiSelectComponent } from './multi-select.component';

const meta: Meta<UiMultiSelectComponent> = {
  title: 'Form/MultiSelect',
  component: UiMultiSelectComponent,
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
    chips: {
      control: 'boolean',
      description: 'Show chips for selected items',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Show select all option',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether select is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<UiMultiSelectComponent>;

const skillOptions = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Angular', value: 'angular' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Node.js', value: 'node' },
  { label: 'Python', value: 'python' },
  { label: 'Go', value: 'go' },
];

export const Default: Story = {
  args: {
    label: 'Skills',
    placeholder: 'Select skills',
    options: skillOptions,
  },
};

export const WithChips: Story = {
  args: {
    label: 'Technologies',
    placeholder: 'Select technologies',
    options: skillOptions,
    chips: true,
    value: ['js', 'ts', 'angular'],
  },
};

export const WithFilter: Story = {
  args: {
    label: 'Skills',
    placeholder: 'Search and select...',
    options: skillOptions,
    filter: true,
  },
};

export const WithSelectAll: Story = {
  args: {
    label: 'Languages',
    placeholder: 'Select languages',
    options: skillOptions,
    showSelectAll: true,
  },
};

export const MaxChips: Story = {
  args: {
    label: 'Skills',
    placeholder: 'Select skills',
    options: skillOptions,
    chips: true,
    maxChips: 2,
    value: ['js', 'ts', 'angular', 'react'],
  },
};

export const Variants: Story = {
  render: () => ({
    props: {
      options: skillOptions,
    },
    template: `
      <div class="flex flex-col gap-6">
        <ui-multi-select variant="default" label="Default" placeholder="Select..." [options]="options"></ui-multi-select>
        <ui-multi-select variant="filled" label="Filled" placeholder="Select..." [options]="options"></ui-multi-select>
        <ui-multi-select variant="outlined" label="Outlined" placeholder="Select..." [options]="options"></ui-multi-select>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: {
      options: skillOptions,
    },
    template: `
      <div class="flex flex-col gap-6">
        <ui-multi-select size="sm" label="Small" placeholder="Select..." [options]="options"></ui-multi-select>
        <ui-multi-select size="md" label="Medium" placeholder="Select..." [options]="options"></ui-multi-select>
        <ui-multi-select size="lg" label="Large" placeholder="Select..." [options]="options"></ui-multi-select>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Skills',
    placeholder: 'Select skills',
    options: skillOptions,
    disabled: true,
    value: ['js'],
  },
};

export const Invalid: Story = {
  args: {
    label: 'Required Skills',
    placeholder: 'Select at least one skill',
    options: skillOptions,
    invalid: true,
    helpText: 'Please select at least one skill',
  },
};
