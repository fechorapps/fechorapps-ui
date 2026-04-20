import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { UiKeyFilterDirective } from './key-filter.directive';

const meta: Meta = {
  title: 'Form/KeyFilter',
  decorators: [
    moduleMetadata({
      imports: [UiKeyFilterDirective],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**KeyFilter** restricts input to specific character patterns.

## API Reference

Based on [PrimeNG KeyFilter](https://primeng.org/keyfilter)

### Features
- Predefined patterns for common use cases
- Custom regex pattern support
- Blocks invalid keystrokes
- Validates paste events
- Filters autofill/mobile input

### Predefined Patterns
| Pattern | Description | Allowed Characters |
|---------|-------------|-------------------|
| \`int\` | Integers | 0-9, - |
| \`pint\` | Positive integers | 0-9 |
| \`num\` | Numbers | 0-9, -, . |
| \`pnum\` | Positive numbers | 0-9, . |
| \`money\` | Money format | 0-9, ., , |
| \`hex\` | Hexadecimal | 0-9, a-f, A-F |
| \`alpha\` | Alphabetic | a-z, A-Z |
| \`alphanum\` | Alphanumeric | a-z, A-Z, 0-9 |
| \`email\` | Email characters | a-z, A-Z, 0-9, @, ., _, - |
| \`phone\` | Phone numbers | 0-9, +, -, (, ), space |

### Usage
\`\`\`html
<input type="text" uiKeyFilter="int" />
<input type="text" [uiKeyFilter]="customRegex" />
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const IntegersOnly: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Integer Input
        </label>
        <input
          type="text"
          uiKeyFilter="int"
          placeholder="Only integers allowed"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
        <p class="text-xs text-gray-500 mt-1">Allows: 0-9, -</p>
      </div>
    `,
  }),
};

export const PositiveIntegers: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Positive Integer
        </label>
        <input
          type="text"
          uiKeyFilter="pint"
          placeholder="Only positive integers"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
        <p class="text-xs text-gray-500 mt-1">Allows: 0-9 only</p>
      </div>
    `,
  }),
};

export const Numbers: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Number Input
        </label>
        <input
          type="text"
          uiKeyFilter="num"
          placeholder="Numbers with decimals"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
        <p class="text-xs text-gray-500 mt-1">Allows: 0-9, -, .</p>
      </div>
    `,
  }),
};

export const Money: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Price
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="text"
            uiKeyFilter="money"
            placeholder="0.00"
            class="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <p class="text-xs text-gray-500 mt-1">Allows: 0-9, ., ,</p>
      </div>
    `,
  }),
};

export const Hexadecimal: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Color Code
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">#</span>
          <input
            type="text"
            uiKeyFilter="hex"
            placeholder="FF5733"
            maxlength="6"
            class="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 uppercase"
          />
        </div>
        <p class="text-xs text-gray-500 mt-1">Allows: 0-9, A-F</p>
      </div>
    `,
  }),
};

export const AlphaOnly: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Name
        </label>
        <input
          type="text"
          uiKeyFilter="alpha"
          placeholder="Letters only"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
        <p class="text-xs text-gray-500 mt-1">Allows: a-z, A-Z</p>
      </div>
    `,
  }),
};

export const Alphanumeric: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Username
        </label>
        <input
          type="text"
          uiKeyFilter="alphanum"
          placeholder="Letters and numbers"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
        <p class="text-xs text-gray-500 mt-1">Allows: a-z, A-Z, 0-9</p>
      </div>
    `,
  }),
};

export const Email: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Email
        </label>
        <input
          type="text"
          uiKeyFilter="email"
          placeholder="user@example.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
        <p class="text-xs text-gray-500 mt-1">Allows: a-z, A-Z, 0-9, @, ., _, -</p>
      </div>
    `,
  }),
};

export const Phone: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Phone Number
        </label>
        <input
          type="text"
          uiKeyFilter="phone"
          placeholder="+1 (555) 123-4567"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
        <p class="text-xs text-gray-500 mt-1">Allows: 0-9, +, -, (, ), space</p>
      </div>
    `,
  }),
};

export const AllPatterns: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Integer (int)</label>
          <input type="text" uiKeyFilter="int" placeholder="-123" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Positive Int (pint)</label>
          <input type="text" uiKeyFilter="pint" placeholder="123" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Number (num)</label>
          <input type="text" uiKeyFilter="num" placeholder="-123.45" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Positive Number (pnum)</label>
          <input type="text" uiKeyFilter="pnum" placeholder="123.45" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Money</label>
          <input type="text" uiKeyFilter="money" placeholder="1,234.56" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Hex</label>
          <input type="text" uiKeyFilter="hex" placeholder="FF00AA" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 uppercase" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Alpha</label>
          <input type="text" uiKeyFilter="alpha" placeholder="Letters" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Alphanum</label>
          <input type="text" uiKeyFilter="alphanum" placeholder="Abc123" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
          <input type="text" uiKeyFilter="email" placeholder="user@test.com" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
          <input type="text" uiKeyFilter="phone" placeholder="+1 (555) 123" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500" />
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const RegistrationForm: Story = {
  render: () => ({
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Registration</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
            <input
              type="text"
              uiKeyFilter="alphanum"
              placeholder="johndoe123"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <input
              type="text"
              uiKeyFilter="email"
              placeholder="john@example.com"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
            <input
              type="text"
              uiKeyFilter="phone"
              placeholder="+52 (55) 1234-5678"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Age</label>
            <input
              type="text"
              uiKeyFilter="pint"
              placeholder="25"
              maxlength="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <button class="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Register
          </button>
        </div>
      </div>
    `,
  }),
};
