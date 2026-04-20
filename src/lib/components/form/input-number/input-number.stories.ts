import type { Meta, StoryObj } from '@storybook/angular';

import { UiInputNumberComponent } from './input-number.component';

const meta: Meta<UiInputNumberComponent> = {
  title: 'Form/InputNumber',
  component: UiInputNumberComponent,
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
      description: 'Input size',
    },
    buttonLayout: {
      control: 'select',
      options: ['stacked', 'horizontal', 'none'],
      description: 'Button layout',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether input is disabled',
    },
    showButtons: {
      control: 'boolean',
      description: 'Show increment/decrement buttons',
    },
  },
};

export default meta;
type Story = StoryObj<UiInputNumberComponent>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    value: 1,
    min: 0,
    max: 100,
  },
};

export const HorizontalButtons: Story = {
  args: {
    label: 'Amount',
    value: 5,
    buttonLayout: 'horizontal',
    min: 0,
  },
};

export const NoButtons: Story = {
  args: {
    label: 'Value',
    value: 50,
    buttonLayout: 'none',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Rating (1-10)',
    value: 5,
    min: 1,
    max: 10,
    helpText: 'Enter a value between 1 and 10',
  },
};

export const WithStep: Story = {
  args: {
    label: 'Price',
    value: 10.5,
    step: 0.5,
    decimals: 2,
    prefix: '$',
  },
};

export const Currency: Story = {
  args: {
    label: 'Amount',
    value: 1500,
    prefix: '$',
    useGrouping: true,
    decimals: 2,
  },
};

export const Percentage: Story = {
  args: {
    label: 'Discount',
    value: 25,
    suffix: '%',
    min: 0,
    max: 100,
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-input-number variant="default" label="Default" [value]="10"></ui-input-number>
        <ui-input-number variant="filled" label="Filled" [value]="10"></ui-input-number>
        <ui-input-number variant="outlined" label="Outlined" [value]="10"></ui-input-number>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-input-number size="sm" label="Small" [value]="5"></ui-input-number>
        <ui-input-number size="md" label="Medium" [value]="5"></ui-input-number>
        <ui-input-number size="lg" label="Large" [value]="5"></ui-input-number>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Quantity',
    value: 10,
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Age',
    value: 15,
    min: 18,
    invalid: true,
    helpText: 'Must be 18 or older',
  },
};
