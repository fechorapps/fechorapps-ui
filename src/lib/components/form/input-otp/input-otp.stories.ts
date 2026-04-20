import type { Meta, StoryObj } from '@storybook/angular';

import { UiInputOtpComponent } from './input-otp.component';

const meta: Meta<UiInputOtpComponent> = {
  title: 'Form/InputOtp',
  component: UiInputOtpComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**InputOtp** is used to enter one time passwords for verification flows.

## API Reference

Based on [PrimeNG InputOtp](https://primeng.org/inputotp)

### Features
- Configurable length (4-8 digits)
- Integer only or alphanumeric input
- Masked mode for secure entry
- Auto-focus and auto-advance
- Paste support for full codes
- Keyboard navigation with arrow keys

### Events
| Event | Description |
|-------|-------------|
| \`onComplete\` | Callback when all inputs are filled |
| \`onFocus\` | Callback when input receives focus |
| \`onBlur\` | Callback when input loses focus |
        `,
      },
    },
  },
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Visual style variant of the inputs.',
      table: {
        type: { summary: 'InputOtpVariant' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input boxes.',
      table: {
        type: { summary: 'InputOtpSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },

    // Configuration
    length: {
      control: { type: 'number', min: 4, max: 8 },
      description: 'Number of input characters/boxes.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
        category: 'Configuration',
      },
    },
    integerOnly: {
      control: 'boolean',
      description: 'When true, only integers can be accepted as input.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },
    mask: {
      control: 'boolean',
      description: 'When true, hides the values like a password field.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Configuration',
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'When true, automatically focuses the first input on load.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Configuration',
      },
    },

    // Labels
    label: {
      control: 'text',
      description: 'Label text displayed above the inputs.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below the inputs.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'When true, the component cannot be edited and focused.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    readonly: {
      control: 'boolean',
      description: 'When true, the component is readonly.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'When true, applies invalid styling to indicate failed validation.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiInputOtpComponent>;

export const Default: Story = {
  args: {
    label: 'Verification Code',
    length: 6,
  },
};

export const FourDigits: Story = {
  args: {
    label: 'PIN Code',
    length: 4,
  },
};

export const EightDigits: Story = {
  args: {
    label: 'Recovery Code',
    length: 8,
    helpText: 'Enter your 8-digit recovery code',
  },
};

export const MaskedInput: Story = {
  args: {
    label: 'Secure Code',
    length: 6,
    mask: true,
    helpText: 'Your code will be hidden',
  },
};

export const AlphanumericAllowed: Story = {
  args: {
    label: 'Alphanumeric Code',
    length: 6,
    integerOnly: false,
    helpText: 'Letters and numbers allowed',
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8 items-center">
        <ui-input-otp variant="default" label="Default" [length]="4"></ui-input-otp>
        <ui-input-otp variant="filled" label="Filled" [length]="4"></ui-input-otp>
        <ui-input-otp variant="outlined" label="Outlined" [length]="4"></ui-input-otp>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8 items-center">
        <ui-input-otp size="sm" label="Small" [length]="4"></ui-input-otp>
        <ui-input-otp size="md" label="Medium" [length]="4"></ui-input-otp>
        <ui-input-otp size="lg" label="Large" [length]="4"></ui-input-otp>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Verification Code',
    length: 6,
    disabled: true,
    value: '123456',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Verification Code',
    length: 6,
    invalid: true,
    helpText: 'Invalid code. Please try again.',
  },
};

export const PrefilledValue: Story = {
  args: {
    label: 'Prefilled Code',
    length: 6,
    value: '123456',
  },
};

export const VerificationFlow: Story = {
  render: () => ({
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-sm text-center">
        <div class="mb-4">
          <div class="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Verify Your Email</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            We've sent a 6-digit code to your email address
          </p>
        </div>
        <ui-input-otp [length]="6" helpText="Didn't receive it? Resend code"></ui-input-otp>
        <button class="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Verify Code
        </button>
      </div>
    `,
  }),
};

export const TwoFactorAuth: Story = {
  render: () => ({
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-sm text-center">
        <div class="mb-4">
          <div class="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter the code from your authenticator app
          </p>
        </div>
        <ui-input-otp [length]="6" size="lg"></ui-input-otp>
        <button class="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Authenticate
        </button>
      </div>
    `,
  }),
};
