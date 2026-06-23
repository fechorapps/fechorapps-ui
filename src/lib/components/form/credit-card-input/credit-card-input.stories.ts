import type { Meta, StoryObj } from '@storybook/angular';

import { UiCreditCardInputComponent } from './credit-card-input.component';

/**
 * The CreditCardInput component provides a full-featured credit card form
 * with automatic card type detection, Amex 4-6-5 formatting, expiry auto-slash,
 * CVV masking toggle, and real-time validation signals.
 */
const meta: Meta<UiCreditCardInputComponent> = {
  title: 'Form/CreditCardInput',
  component: UiCreditCardInputComponent,
  tags: ['autodocs'],
  argTypes: {
    showCvv: {
      control: 'boolean',
      description: 'Whether to show the CVV field',
      table: { defaultValue: { summary: 'true' } },
    },
    showCardIcon: {
      control: 'boolean',
      description: 'Whether to show the detected card type icon',
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all inputs are disabled',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    showCvv: true,
    showCardIcon: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<UiCreditCardInputComponent>;

// =============================================================================
// BASIC STORIES
// =============================================================================

/**
 * Empty state — all fields are blank, card type is unknown.
 */
export const Empty: Story = {
  args: {
    showCvv: true,
    showCardIcon: true,
    disabled: false,
  },
};

/**
 * Filled with a valid Visa card number.
 * Shows the Visa logo, standard 4-4-4-4 formatting, and a 3-digit CVV.
 */
export const FilledVisa: Story = {
  render: () => ({
    template: `
      <div class="max-w-sm">
        <ui-credit-card-input></ui-credit-card-input>
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Type: 4111 1111 1111 1111 / Exp: 12/25 / CVV: 123 to see Visa
      </p>
    `,
    imports: [UiCreditCardInputComponent],
  }),
  parameters: { controls: { disable: true } },
};

/**
 * Filled with a valid American Express card number.
 * Shows the Amex logo and the unique 4-6-5 digit formatting with 4-digit CVV.
 */
export const FilledAmex: Story = {
  render: () => ({
    template: `
      <div class="max-w-sm">
        <ui-credit-card-input></ui-credit-card-input>
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Type: 3782 822463 10005 / Exp: 12/26 / CVV: 1234 to see Amex (4-6-5 format)
      </p>
    `,
    imports: [UiCreditCardInputComponent],
  }),
  parameters: { controls: { disable: true } },
};

/**
 * Disabled state — all inputs are inert.
 */
export const Disabled: Story = {
  args: {
    showCvv: true,
    showCardIcon: true,
    disabled: true,
  },
};

/**
 * Without CVV field — useful for card-on-file or display-only scenarios.
 */
export const WithoutCvv: Story = {
  args: {
    showCvv: false,
    showCardIcon: true,
    disabled: false,
  },
};

/**
 * Without card icon — minimal UI variant.
 */
export const WithoutCardIcon: Story = {
  args: {
    showCvv: true,
    showCardIcon: false,
    disabled: false,
  },
};

// =============================================================================
// REAL WORLD EXAMPLES
// =============================================================================

/**
 * Payment checkout form with billing context.
 */
export const CheckoutForm: Story = {
  render: () => ({
    template: `
      <div class="max-w-md space-y-6 p-6 border border-border rounded-xl bg-card shadow-sm">
        <div>
          <h3 class="text-lg font-semibold text-foreground">Payment Details</h3>
          <p class="text-sm text-muted-foreground mt-1">Enter your card information to complete checkout.</p>
        </div>

        <ui-credit-card-input [showCvv]="true" [showCardIcon]="true"></ui-credit-card-input>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-foreground">Name on Card</label>
          <input type="text" placeholder="John Doe"
            class="px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm outline-none focus:border-primary placeholder:text-muted-foreground" />
        </div>

        <button type="submit"
          class="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          Pay Now
        </button>
      </div>
    `,
    imports: [UiCreditCardInputComponent],
  }),
  parameters: { controls: { disable: true } },
};
