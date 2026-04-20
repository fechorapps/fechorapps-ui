import type { Meta, StoryObj } from '@storybook/angular';

import { UiInputSwitchComponent } from './input-switch.component';

const meta: Meta<UiInputSwitchComponent> = {
  title: 'Form/InputSwitch',
  component: UiInputSwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
    },
    checked: {
      control: 'boolean',
      description: 'Whether switch is on',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether switch is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether switch is in invalid state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Label position',
    },
  },
};

export default meta;
type Story = StoryObj<UiInputSwitchComponent>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    checked: true,
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Auto-save',
    labelPosition: 'left',
    checked: true,
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Two-factor authentication',
    helpText: 'Add an extra layer of security to your account',
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Feature locked',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Always enabled',
    disabled: true,
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-input-switch size="sm" label="Small switch"></ui-input-switch>
        <ui-input-switch size="md" label="Medium switch"></ui-input-switch>
        <ui-input-switch size="lg" label="Large switch"></ui-input-switch>
      </div>
    `,
  }),
};

export const SettingsExample: Story = {
  render: () => ({
    template: `
      <div class="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Settings</h3>
        <ui-input-switch label="Email notifications" [checked]="true"></ui-input-switch>
        <ui-input-switch label="Push notifications" [checked]="false"></ui-input-switch>
        <ui-input-switch label="Marketing emails" [checked]="false"></ui-input-switch>
        <ui-input-switch label="Account updates" [checked]="true"></ui-input-switch>
      </div>
    `,
  }),
};
