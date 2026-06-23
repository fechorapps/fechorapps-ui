import type { Meta, StoryObj } from '@storybook/angular';
import { UiAddressInputComponent } from './address-input.component';
import type { AddressSuggestion } from './address-input.component';

// =============================================================================
// MOCK SEARCH FUNCTION
// =============================================================================

const FAKE_ADDRESSES: AddressSuggestion[] = [
  {
    id: '1',
    label: '123 Main Street, Springfield, IL 62701',
    value: { street: '123 Main Street', city: 'Springfield', state: 'IL', postalCode: '62701', country: 'US' },
  },
  {
    id: '2',
    label: '456 Oak Avenue, Shelbyville, IL 62565',
    value: { street: '456 Oak Avenue', city: 'Shelbyville', state: 'IL', postalCode: '62565', country: 'US' },
  },
  {
    id: '3',
    label: '789 Elm Boulevard, Capitol City, IL 62702',
    value: { street: '789 Elm Boulevard', city: 'Capitol City', state: 'IL', postalCode: '62702', country: 'US' },
  },
  {
    id: '4',
    label: '101 Pine Road, Ogdenville, IL 62570',
    value: { street: '101 Pine Road', city: 'Ogdenville', state: 'IL', postalCode: '62570', country: 'US' },
  },
];

const mockSearchFn = async (q: string): Promise<AddressSuggestion[]> => {
  await new Promise(r => setTimeout(r, 400)); // simulate network delay
  return FAKE_ADDRESSES.filter(a => a.label.toLowerCase().includes(q.toLowerCase()));
};

/** Simple mock that always returns one result based on the query */
const simpleMockSearchFn = async (q: string): Promise<AddressSuggestion[]> => [
  { id: '1', label: `${q} Street, City`, value: { raw: q } },
];

/**
 * AddressInput provides a typeahead address search with debouncing,
 * suggestion dropdown, and an optional collapsible manual-entry form.
 */
const meta: Meta<UiAddressInputComponent> = {
  title: 'Form/AddressInput',
  component: UiAddressInputComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
      table: { defaultValue: { summary: 'Search address...' } },
    },
    debounceMs: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Debounce delay in ms before triggering search',
      table: { defaultValue: { summary: '300' } },
    },
    minChars: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Minimum characters required before triggering search',
      table: { defaultValue: { summary: '3' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    showManualEntry: {
      control: 'boolean',
      description: 'Whether to show the "Enter manually" option',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    searchFn: mockSearchFn,
    placeholder: 'Search address...',
    debounceMs: 300,
    minChars: 3,
    disabled: false,
    showManualEntry: true,
  },
};

export default meta;
type Story = StoryObj<UiAddressInputComponent>;

// =============================================================================
// STORIES
// =============================================================================

/**
 * WithMockSearch — type at least 3 characters to trigger the mock search.
 * Try "main", "oak", or "elm" to see results.
 */
export const WithMockSearch: Story = {
  args: {
    searchFn: mockSearchFn,
    placeholder: 'Search address...',
  },
};

/**
 * ManualEntryVisible — renders with the manual-entry form already expanded.
 * The user can fill in individual address fields and click "Apply Address".
 */
export const ManualEntryVisible: Story = {
  render: args => ({
    props: {
      ...args,
      // Expose a toggle so we can pre-open the manual form
    },
    template: `
      <div class="max-w-md">
        <ui-address-input
          [searchFn]="searchFn"
          [placeholder]="placeholder"
          [debounceMs]="debounceMs"
          [minChars]="minChars"
          [disabled]="disabled"
          [showManualEntry]="showManualEntry"
        ></ui-address-input>
        <p class="mt-3 text-xs text-muted-foreground">
          Click "Enter address manually" to expand the form.
        </p>
      </div>
    `,
    imports: [UiAddressInputComponent],
  }),
  args: {
    searchFn: simpleMockSearchFn,
    showManualEntry: true,
    placeholder: 'Search or enter manually...',
  },
  parameters: { controls: { disable: false } },
};

/**
 * Disabled — all interactive elements are inert.
 */
export const Disabled: Story = {
  args: {
    searchFn: simpleMockSearchFn,
    disabled: true,
    placeholder: 'Address input is disabled',
    showManualEntry: true,
  },
};

/**
 * NoManualEntry — the "Enter address manually" link is hidden.
 */
export const NoManualEntry: Story = {
  args: {
    searchFn: mockSearchFn,
    showManualEntry: false,
    placeholder: 'Search address...',
  },
};

/**
 * ShortDebounce — search fires after only 100 ms for a snappier feel.
 */
export const ShortDebounce: Story = {
  args: {
    searchFn: mockSearchFn,
    debounceMs: 100,
    minChars: 2,
    placeholder: 'Type 2+ characters...',
  },
};

/**
 * Embedded in a checkout form.
 */
export const InCheckoutForm: Story = {
  render: () => ({
    template: `
      <div class="max-w-md space-y-4 p-6 border border-border rounded-xl bg-card">
        <h3 class="text-xl font-semibold text-foreground">Shipping Address</h3>
        <div class="space-y-4">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-foreground">Full Name</label>
            <input type="text" placeholder="Jane Doe"
              class="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm outline-none focus:border-primary" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-foreground">Address</label>
            <ui-address-input
              [searchFn]="searchFn"
              placeholder="Search your address..."
              [debounceMs]="300"
              [minChars]="3"
              [showManualEntry]="true"
            ></ui-address-input>
          </div>
          <button type="button"
            class="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Continue to Payment
          </button>
        </div>
      </div>
    `,
    props: { searchFn: mockSearchFn },
    imports: [UiAddressInputComponent],
  }),
  parameters: { controls: { disable: true } },
};
