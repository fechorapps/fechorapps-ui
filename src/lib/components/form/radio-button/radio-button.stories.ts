import type { Meta, StoryObj } from '@storybook/angular';

import { UiRadioButtonComponent } from './radio-button.component';

const meta: Meta<UiRadioButtonComponent> = {
  title: 'Form/RadioButton',
  component: UiRadioButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether radio is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether radio is in invalid state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
  },
};

export default meta;
type Story = StoryObj<UiRadioButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    value: 'option1',
    name: 'demo-radio',
  },
};

export const RadioGroup: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-3">
        <ui-radio-button name="payment" [value]="'credit'" label="Credit Card"></ui-radio-button>
        <ui-radio-button name="payment" [value]="'debit'" label="Debit Card"></ui-radio-button>
        <ui-radio-button name="payment" [value]="'paypal'" label="PayPal"></ui-radio-button>
      </div>
    `,
  }),
};

export const Horizontal: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-6">
        <ui-radio-button name="size" [value]="'s'" label="Small"></ui-radio-button>
        <ui-radio-button name="size" [value]="'m'" label="Medium"></ui-radio-button>
        <ui-radio-button name="size" [value]="'l'" label="Large"></ui-radio-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    value: 'disabled',
    disabled: true,
  },
};

export const Invalid: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-3">
        <ui-radio-button name="required" [value]="'a'" label="Option A" [invalid]="true"></ui-radio-button>
        <ui-radio-button name="required" [value]="'b'" label="Option B" [invalid]="true"></ui-radio-button>
        <p class="text-xs text-red-500 mt-1">Please select an option</p>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <ui-radio-button name="size-demo" [value]="'sm'" size="sm" label="Small radio"></ui-radio-button>
        <ui-radio-button name="size-demo" [value]="'md'" size="md" label="Medium radio"></ui-radio-button>
        <ui-radio-button name="size-demo" [value]="'lg'" size="lg" label="Large radio"></ui-radio-button>
      </div>
    `,
  }),
};
