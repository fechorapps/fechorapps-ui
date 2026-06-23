import type { Meta, StoryObj } from '@storybook/angular';

import { UiIbanInputComponent } from './iban-input.component';

/**
 * The IbanInput component provides a smart IBAN field with automatic country
 * detection from the first two characters, length-based validation, formatted
 * display in groups of 4 characters, a validity indicator (green check / red X),
 * and a one-click clipboard copy button.
 */
const meta: Meta<UiIbanInputComponent> = {
  title: 'Form/IbanInput',
  component: UiIbanInputComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
      table: { defaultValue: { summary: 'IBAN' } },
    },
    country: {
      control: 'text',
      description: 'Override country code (auto-detected from value when not set)',
      table: { defaultValue: { summary: 'null' } },
    },
    showBankName: {
      control: 'boolean',
      description: 'Whether to show a bank name hint below the input',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'IBAN',
    country: null,
    showBankName: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<UiIbanInputComponent>;

// =============================================================================
// BASIC STORIES
// =============================================================================

/**
 * Empty state — no value entered yet.
 * The country badge, validity indicator, and copy button are all hidden.
 */
export const Empty: Story = {
  args: {
    label: 'IBAN',
    disabled: false,
  },
};

/**
 * Valid Spanish IBAN — ES9121000418450200051332 (24 characters).
 * The component auto-detects the ES country code and shows a green check icon.
 */
export const ValidSpanish: Story = {
  render: () => ({
    template: `
      <div class="max-w-md">
        <ui-iban-input [value]="iban" label="IBAN (Spain)"></ui-iban-input>
      </div>
    `,
    imports: [UiIbanInputComponent],
    props: {
      iban: 'ES9121000418450200051332',
    },
  }),
  parameters: { controls: { disable: true } },
};

/**
 * Valid German IBAN — DE89370400440532013000 (22 characters).
 * Demonstrates DE country detection and a different expected length.
 */
export const ValidGerman: Story = {
  render: () => ({
    template: `
      <div class="max-w-md">
        <ui-iban-input [value]="iban" label="IBAN (Germany)"></ui-iban-input>
      </div>
    `,
    imports: [UiIbanInputComponent],
    props: {
      iban: 'DE89370400440532013000',
    },
  }),
  parameters: { controls: { disable: true } },
};

/**
 * Invalid IBAN — value is present but too short for the detected country.
 * The component shows a red X icon to signal the error.
 */
export const Invalid: Story = {
  render: () => ({
    template: `
      <div class="max-w-md">
        <ui-iban-input [value]="iban" label="IBAN (incomplete)"></ui-iban-input>
      </div>
    `,
    imports: [UiIbanInputComponent],
    props: {
      iban: 'GB29NWBK601613',
    },
  }),
  parameters: { controls: { disable: true } },
};

/**
 * Disabled state — the input and copy button are inert.
 */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div class="max-w-md">
        <ui-iban-input [value]="iban" [disabled]="true" label="IBAN (read-only)"></ui-iban-input>
      </div>
    `,
    imports: [UiIbanInputComponent],
    props: {
      iban: 'ES9121000418450200051332',
    },
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// REAL WORLD EXAMPLES
// =============================================================================

/**
 * Bank transfer form — IBAN field embedded in a realistic payment context.
 */
export const BankTransferForm: Story = {
  render: () => ({
    template: `
      <div class="max-w-md space-y-5 p-6 border border-border rounded-xl bg-card shadow-sm">
        <div>
          <h3 class="text-lg font-semibold text-foreground">Bank Transfer</h3>
          <p class="text-sm text-muted-foreground mt-1">
            Enter the recipient's IBAN to proceed with the transfer.
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-foreground">Recipient name</label>
          <input
            type="text"
            placeholder="e.g. Acme Corp"
            class="px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm outline-none focus:border-primary placeholder:text-muted-foreground"
          />
        </div>

        <ui-iban-input label="Recipient IBAN"></ui-iban-input>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-foreground">Reference</label>
          <input
            type="text"
            placeholder="Payment reference"
            class="px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm outline-none focus:border-primary placeholder:text-muted-foreground"
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Send Transfer
        </button>
      </div>
    `,
    imports: [UiIbanInputComponent],
  }),
  parameters: { controls: { disable: true } },
};
