import type { Meta, StoryObj } from '@storybook/angular';

import { UiCheckboxComponent } from './checkbox.component';

const meta: Meta<UiCheckboxComponent> = {
  title: 'Form/Checkbox',
  component: UiCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    checked: {
      control: 'boolean',
      description: 'Whether checkbox is checked',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether checkbox is in indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether checkbox is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether checkbox is in invalid state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helpText: {
      control: 'text',
      description: 'Help text',
    },
  },
};

export default meta;
type Story = StoryObj<UiCheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Remember me',
    helpText: 'Keep me signed in on this device',
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Required field',
    invalid: true,
    helpText: 'This field is required',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <ui-checkbox size="sm" label="Small checkbox"></ui-checkbox>
        <ui-checkbox size="md" label="Medium checkbox"></ui-checkbox>
        <ui-checkbox size="lg" label="Large checkbox"></ui-checkbox>
      </div>
    `,
  }),
};
