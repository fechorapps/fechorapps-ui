import type { Meta, StoryObj } from '@storybook/angular';

import { UiPhoneInputComponent } from './phone-input.component';

/**
 * The PhoneInput component provides a full-featured phone number field
 * with embedded country selector, E.164 output, and real-time validation.
 */
const meta: Meta<UiPhoneInputComponent> = {
  title: 'Form/PhoneInput',
  component: UiPhoneInputComponent,
  tags: ['autodocs'],
  argTypes: {
    defaultCountry: {
      control: 'select',
      options: ['MX', 'US', 'CA', 'GB', 'ES', 'FR', 'DE', 'IT', 'BR', 'AR', 'CO', 'CL', 'PE', 'JP', 'CN', 'IN', 'AU'],
      description: 'ISO 3166-1 alpha-2 country code to pre-select',
      table: { defaultValue: { summary: 'MX' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the number input',
    },
    label: {
      control: 'text',
      description: 'Label displayed above the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
  args: {
    defaultCountry: 'MX',
    placeholder: '',
    label: '',
    disabled: false,
    preferredCountries: [],
  },
};

export default meta;
type Story = StoryObj<UiPhoneInputComponent>;

// =============================================================================
// BASIC STORIES
// =============================================================================

/**
 * Default story with México pre-selected.
 */
export const Default: Story = {
  args: {
    defaultCountry: 'MX',
    placeholder: 'Enter phone number',
  },
};

/**
 * US country pre-selected.
 */
export const USDefault: Story = {
  args: {
    defaultCountry: 'US',
    placeholder: '(555) 000-0000',
  },
};

/**
 * With preferred countries shown first in the dropdown list.
 * US, MX, and ES appear at the top.
 */
export const WithPreferredCountries: Story = {
  args: {
    defaultCountry: 'MX',
    preferredCountries: ['US', 'MX', 'ES'],
    placeholder: 'Enter phone number',
  },
};

/**
 * With a visible label above the input.
 */
export const WithLabel: Story = {
  args: {
    defaultCountry: 'MX',
    label: 'Phone Number',
    placeholder: 'Enter your phone',
  },
};

/**
 * Disabled state — the button and input are both inert.
 */
export const Disabled: Story = {
  args: {
    defaultCountry: 'US',
    label: 'Phone Number',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

// =============================================================================
// REAL WORLD EXAMPLES
// =============================================================================

/**
 * Contact form with phone input alongside other fields.
 */
export const ContactForm: Story = {
  render: () => ({
    template: `
      <div class="max-w-md space-y-4 p-6 border border-border rounded-xl bg-card">
        <h3 class="text-xl font-semibold text-foreground">Contact Information</h3>
        <div class="space-y-4">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-foreground">Full Name</label>
            <input type="text" placeholder="John Doe"
              class="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm outline-none focus:border-primary" />
          </div>
          <ui-phone-input label="Phone Number" defaultCountry="US" placeholder="Enter your phone"></ui-phone-input>
        </div>
      </div>
    `,
    imports: [UiPhoneInputComponent],
  }),
  parameters: { controls: { disable: true } },
};

/**
 * All supported countries displayed.
 */
export const AllCountriesPreferred: Story = {
  args: {
    defaultCountry: 'GB',
    preferredCountries: ['GB', 'US', 'CA', 'AU'],
    label: 'International Phone',
    placeholder: 'Enter number',
  },
};
