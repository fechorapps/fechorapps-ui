import type { Meta, StoryObj } from '@storybook/angular';

import { UiFloatLabelComponent } from './float-label.component';

const meta: Meta<UiFloatLabelComponent> = {
  title: 'Form/FloatLabel',
  component: UiFloatLabelComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**FloatLabel** provides a floating label animation for form inputs.

## API Reference

Based on [PrimeNG FloatLabel](https://primeng.org/floatlabel)

### Features
- Floating label animation on focus
- Multiple variants (default, in, on)
- Support for any input component
- Invalid state styling

### Variants
| Variant | Description |
|---------|-------------|
| \`default\` | Label floats above the input border |
| \`in\` | Label floats inside the input |
| \`on\` | Label floats on the input border |
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text to display.',
      table: {
        type: { summary: 'string' },
        category: 'Configuration',
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'in', 'on'],
      description: 'The visual variant of the floating label.',
      table: {
        type: { summary: 'FloatLabelVariant' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    filled: {
      control: 'boolean',
      description: 'Whether the input has a value (controls label position).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Whether to show invalid state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiFloatLabelComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <ui-float-label label="Username">
          <input
            type="text"
            class="peer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            placeholder=" "
          />
        </ui-float-label>
      </div>
    `,
  }),
};

export const Filled: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <ui-float-label label="Username" [filled]="true">
          <input
            type="text"
            value="johndoe"
            class="peer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            placeholder=" "
          />
        </ui-float-label>
      </div>
    `,
  }),
};

export const VariantIn: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <ui-float-label label="Email" variant="in">
          <input
            type="email"
            class="peer w-full px-3 pt-6 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            placeholder=" "
          />
        </ui-float-label>
      </div>
    `,
  }),
};

export const VariantOn: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <ui-float-label label="Password" variant="on">
          <input
            type="password"
            class="peer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            placeholder=" "
          />
        </ui-float-label>
      </div>
    `,
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `
      <div class="w-72">
        <ui-float-label label="Email" [invalid]="true">
          <input
            type="email"
            class="peer w-full px-3 py-2 border border-red-500 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            placeholder=" "
          />
        </ui-float-label>
        <p class="text-xs text-red-500 mt-1">Please enter a valid email</p>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <div class="w-72">
          <p class="text-sm text-gray-500 mb-2">Default (floats above)</p>
          <ui-float-label label="Username" variant="default">
            <input
              type="text"
              class="peer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder=" "
            />
          </ui-float-label>
        </div>

        <div class="w-72">
          <p class="text-sm text-gray-500 mb-2">In (floats inside)</p>
          <ui-float-label label="Email" variant="in">
            <input
              type="email"
              class="peer w-full px-3 pt-6 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder=" "
            />
          </ui-float-label>
        </div>

        <div class="w-72">
          <p class="text-sm text-gray-500 mb-2">On (floats on border)</p>
          <ui-float-label label="Password" variant="on">
            <input
              type="password"
              class="peer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder=" "
            />
          </ui-float-label>
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const LoginForm: Story = {
  render: () => ({
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-sm">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sign In</h3>
        <div class="space-y-6">
          <ui-float-label label="Email">
            <input
              type="email"
              class="peer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder=" "
            />
          </ui-float-label>

          <ui-float-label label="Password">
            <input
              type="password"
              class="peer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder=" "
            />
          </ui-float-label>

          <button class="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    `,
  }),
};
