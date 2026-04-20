import { Phone, CreditCard, Calendar, Hash } from 'lucide-angular';

import type { Meta, StoryObj } from '@storybook/angular';

import { UiInputMaskComponent } from './input-mask.component';

const meta: Meta<UiInputMaskComponent> = {
  title: 'Form/InputMask',
  component: UiInputMaskComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**InputMask** is used to enter input in a certain format such as numeric, date, currency and phone.

## API Reference

Based on [PrimeNG InputMask](https://primeng.org/inputmask)

### Mask Format Characters
| Character | Description |
|-----------|-------------|
| \`9\` | Numeric character (0-9) |
| \`a\` | Alphabetic character (a-z, A-Z) |
| \`*\` | Alphanumeric character |

### Events
| Event | Description |
|-------|-------------|
| \`onComplete\` | Callback when user completes the mask pattern |
| \`inputChange\` | Callback when value changes |
| \`inputFocus\` | Callback on focus |
| \`inputBlur\` | Callback on blur |
        `,
      },
    },
  },
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Visual style variant of the input.',
      table: {
        type: { summary: 'InputMaskVariant' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input component.',
      table: {
        type: { summary: 'InputMaskSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'When true, input takes full width of container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Appearance',
      },
    },

    // Mask Configuration
    maskType: {
      control: 'select',
      options: ['phone', 'phone-mx', 'credit-card', 'date', 'time', 'ssn', 'zip', 'custom'],
      description: 'Predefined mask type. Use "custom" with mask property for custom patterns.',
      table: {
        type: { summary: 'MaskType' },
        defaultValue: { summary: 'custom' },
        category: 'Mask',
      },
    },
    mask: {
      control: 'text',
      description: 'Custom mask pattern. 9=digit, a=letter, *=alphanumeric.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Mask',
      },
    },
    slotChar: {
      control: 'text',
      description: 'Placeholder character for unfilled mask positions.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '_' },
        category: 'Mask',
      },
    },
    unmask: {
      control: 'boolean',
      description: 'When true, returns raw value without mask characters.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Mask',
      },
    },
    showMaskGuide: {
      control: 'boolean',
      description: 'When true, shows mask placeholder as guide.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Mask',
      },
    },

    // Labels & Text
    label: {
      control: 'text',
      description: 'Label text displayed above the input.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when input is empty.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below the input.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'When true, the element cannot be edited and focused.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    readonly: {
      control: 'boolean',
      description: 'When true, the element is readonly.',
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

    // Accessibility
    inputId: {
      control: 'text',
      description: 'Identifier of the input element.',
      table: {
        type: { summary: 'string' },
        category: 'Accessibility',
      },
    },
    name: {
      control: 'text',
      description: 'Name of the input element.',
      table: {
        type: { summary: 'string' },
        category: 'Accessibility',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiInputMaskComponent>;

export const Default: Story = {
  args: {
    label: 'Phone Number',
    maskType: 'phone',
    placeholder: 'Enter phone number',
  },
};

export const PhoneMX: Story = {
  args: {
    label: 'Teléfono (México)',
    maskType: 'phone-mx',
  },
};

export const CreditCardMask: Story = {
  render: () => ({
    props: {
      icon: CreditCard,
    },
    template: `
      <ui-input-mask
        label="Credit Card"
        maskType="credit-card"
        [icon]="icon"
      ></ui-input-mask>
    `,
  }),
};

export const DateMask: Story = {
  render: () => ({
    props: {
      icon: Calendar,
    },
    template: `
      <ui-input-mask
        label="Birth Date"
        maskType="date"
        [icon]="icon"
        helpText="Format: DD/MM/YYYY"
      ></ui-input-mask>
    `,
  }),
};

export const TimeMask: Story = {
  args: {
    label: 'Time',
    maskType: 'time',
    helpText: 'Format: HH:MM',
  },
};

export const SSNMask: Story = {
  args: {
    label: 'Social Security Number',
    maskType: 'ssn',
    helpText: 'Format: XXX-XX-XXXX',
  },
};

export const ZipCode: Story = {
  args: {
    label: 'Zip Code',
    maskType: 'zip',
  },
};

export const CustomMask: Story = {
  args: {
    label: 'License Plate',
    mask: 'aaa-9999',
    placeholder: 'ABC-1234',
    helpText: 'Format: AAA-0000',
  },
};

export const CustomMaskMixed: Story = {
  args: {
    label: 'Product Code',
    mask: 'aa-9999-**',
    placeholder: 'AB-1234-X1',
    helpText: 'Format: AA-0000-XX (letters, numbers, alphanumeric)',
  },
};

export const WithIcon: Story = {
  render: () => ({
    props: {
      phoneIcon: Phone,
    },
    template: `
      <ui-input-mask
        label="Contact Phone"
        maskType="phone"
        [icon]="phoneIcon"
      ></ui-input-mask>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-input-mask variant="default" label="Default" maskType="phone"></ui-input-mask>
        <ui-input-mask variant="filled" label="Filled" maskType="phone"></ui-input-mask>
        <ui-input-mask variant="outlined" label="Outlined" maskType="phone"></ui-input-mask>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-input-mask size="sm" label="Small" maskType="phone"></ui-input-mask>
        <ui-input-mask size="md" label="Medium" maskType="phone"></ui-input-mask>
        <ui-input-mask size="lg" label="Large" maskType="phone"></ui-input-mask>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Phone Number',
    maskType: 'phone',
    disabled: true,
    value: '(555) 123-4567',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Phone Number',
    maskType: 'phone',
    invalid: true,
    helpText: 'Please enter a valid phone number',
  },
};

export const NoMaskGuide: Story = {
  args: {
    label: 'Phone Number',
    maskType: 'phone',
    showMaskGuide: false,
    placeholder: 'Enter phone',
  },
};

export const PaymentForm: Story = {
  render: () => ({
    props: {
      cardIcon: CreditCard,
      calendarIcon: Calendar,
      hashIcon: Hash,
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Details</h3>
        <div class="space-y-4">
          <ui-input-mask
            label="Card Number"
            maskType="credit-card"
            [icon]="cardIcon"
          ></ui-input-mask>
          <div class="grid grid-cols-2 gap-4">
            <ui-input-mask
              label="Expiry Date"
              mask="99/99"
              [icon]="calendarIcon"
              helpText="MM/YY"
            ></ui-input-mask>
            <ui-input-mask
              label="CVV"
              mask="999"
              [icon]="hashIcon"
            ></ui-input-mask>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ContactForm: Story = {
  render: () => ({
    props: {
      phoneIcon: Phone,
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information</h3>
        <div class="space-y-4">
          <ui-input-mask
            label="Phone"
            maskType="phone"
            [icon]="phoneIcon"
          ></ui-input-mask>
          <ui-input-mask
            label="Mobile (MX)"
            maskType="phone-mx"
            [icon]="phoneIcon"
          ></ui-input-mask>
          <ui-input-mask
            label="Zip Code"
            maskType="zip"
          ></ui-input-mask>
        </div>
      </div>
    `,
  }),
};
