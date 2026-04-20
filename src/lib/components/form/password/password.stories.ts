import type { Meta, StoryObj } from '@storybook/angular';

import { UiPasswordComponent } from './password.component';

const meta: Meta<UiPasswordComponent> = {
  title: 'Form/Password',
  component: UiPasswordComponent,
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
    showStrength: {
      control: 'boolean',
      description: 'Show password strength meter',
    },
    toggleable: {
      control: 'boolean',
      description: 'Allow toggling visibility',
    },
    feedback: {
      control: 'boolean',
      description: 'Show strength feedback text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid state',
    },
  },
};

export default meta;
type Story = StoryObj<UiPasswordComponent>;

export const Default: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const WithStrengthMeter: Story = {
  args: {
    label: 'Create Password',
    placeholder: 'Enter a strong password',
    showStrength: true,
    value: 'weak',
  },
};

export const StrongPassword: Story = {
  args: {
    label: 'Password',
    showStrength: true,
    value: 'MyStr0ng!Pass@123',
  },
};

export const NoToggle: Story = {
  args: {
    label: 'Secure Password',
    placeholder: 'Enter password',
    toggleable: false,
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-password variant="default" label="Default" placeholder="Enter password"></ui-password>
        <ui-password variant="filled" label="Filled" placeholder="Enter password"></ui-password>
        <ui-password variant="outlined" label="Outlined" placeholder="Enter password"></ui-password>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-password size="sm" label="Small" placeholder="Enter password"></ui-password>
        <ui-password size="md" label="Medium" placeholder="Enter password"></ui-password>
        <ui-password size="lg" label="Large" placeholder="Enter password"></ui-password>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Password',
    value: 'secretpassword',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    invalid: true,
    helpText: 'Password is required',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'New Password',
    placeholder: 'Create a password',
    showStrength: true,
    helpText: 'Use 8+ characters with a mix of letters, numbers & symbols',
  },
};

export const RegistrationForm: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Create Account</h3>
        <div class="space-y-4">
          <ui-password
            label="Password"
            placeholder="Create a password"
            [showStrength]="true"
            helpText="Minimum 8 characters"
          ></ui-password>
          <ui-password
            label="Confirm Password"
            placeholder="Confirm your password"
          ></ui-password>
        </div>
      </div>
    `,
  }),
};
