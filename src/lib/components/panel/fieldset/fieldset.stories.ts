import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiFieldsetComponent } from './fieldset.component';

const meta: Meta<UiFieldsetComponent> = {
  title: 'Panel/Fieldset',
  component: UiFieldsetComponent,
  decorators: [
    moduleMetadata({
      imports: [UiFieldsetComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    legend: {
      control: { type: 'text' },
      description: 'Fieldset legend text',
    },
    toggleable: {
      control: { type: 'boolean' },
      description: 'Allow collapse/expand',
    },
    collapsed: {
      control: { type: 'boolean' },
      description: 'Initial collapsed state',
    },
  },
};

export default meta;
type Story = StoryObj<UiFieldsetComponent>;

export const Basic: Story = {
  render: () => ({
    template: `
      <ui-fieldset legend="Personal Information">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input type="email" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
          </div>
        </div>
      </ui-fieldset>
    `,
  }),
};

export const Toggleable: Story = {
  render: () => ({
    template: `
      <ui-fieldset legend="Advanced Options" [toggleable]="true">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <input type="checkbox" id="opt1" />
            <label for="opt1">Enable notifications</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="opt2" />
            <label for="opt2">Auto-save drafts</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="opt3" />
            <label for="opt3">Dark mode</label>
          </div>
        </div>
      </ui-fieldset>
    `,
  }),
};

export const InitiallyCollapsed: Story = {
  render: () => ({
    template: `
      <ui-fieldset legend="Click to expand" [toggleable]="true" [collapsed]="true">
        <p class="text-gray-600 dark:text-gray-400">
          This content was initially hidden.
        </p>
      </ui-fieldset>
    `,
  }),
};

export const MultipleFieldsets: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-fieldset legend="Billing Address" [toggleable]="true">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Street</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">City</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
            </div>
          </div>
        </ui-fieldset>

        <ui-fieldset legend="Shipping Address" [toggleable]="true">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Street</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">City</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
            </div>
          </div>
        </ui-fieldset>
      </div>
    `,
  }),
};
