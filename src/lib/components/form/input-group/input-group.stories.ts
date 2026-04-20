import { Mail, Globe, Search, Phone, DollarSign, Percent, AtSign, Hash } from 'lucide-angular';

import type { Meta, StoryObj } from '@storybook/angular';

import { UiInputGroupComponent } from './input-group.component';

const meta: Meta<UiInputGroupComponent> = {
  title: 'Form/InputGroup',
  component: UiInputGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input group size',
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
type Story = StoryObj<UiInputGroupComponent>;

export const WithPrefix: Story = {
  render: () => ({
    template: `
      <ui-input-group prefix="$">
        <input
          type="number"
          placeholder="0.00"
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
        />
      </ui-input-group>
    `,
  }),
};

export const WithSuffix: Story = {
  render: () => ({
    template: `
      <ui-input-group suffix=".00">
        <input
          type="number"
          placeholder="Amount"
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
        />
      </ui-input-group>
    `,
  }),
};

export const BothAddons: Story = {
  render: () => ({
    template: `
      <ui-input-group prefix="$" suffix="USD">
        <input
          type="number"
          placeholder="0.00"
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
        />
      </ui-input-group>
    `,
  }),
};

export const WithPrefixIcon: Story = {
  render: () => ({
    props: { icon: Mail },
    template: `
      <ui-input-group [prefixIcon]="icon">
        <input
          type="email"
          placeholder="Enter your email"
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
        />
      </ui-input-group>
    `,
  }),
};

export const WithSuffixIcon: Story = {
  render: () => ({
    props: { icon: Search },
    template: `
      <ui-input-group [suffixIcon]="icon">
        <input
          type="text"
          placeholder="Search..."
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
        />
      </ui-input-group>
    `,
  }),
};

export const WebsiteInput: Story = {
  render: () => ({
    props: { icon: Globe },
    template: `
      <ui-input-group prefix="https://" [suffixIcon]="icon">
        <input
          type="text"
          placeholder="www.example.com"
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
        />
      </ui-input-group>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { icon: DollarSign },
    template: `
      <div class="flex flex-col gap-4">
        <ui-input-group size="sm" prefix="$">
          <input
            type="number"
            placeholder="Small"
            class="w-full h-8 px-2.5 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
          />
        </ui-input-group>
        <ui-input-group size="md" prefix="$">
          <input
            type="number"
            placeholder="Medium"
            class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
          />
        </ui-input-group>
        <ui-input-group size="lg" prefix="$">
          <input
            type="number"
            placeholder="Large"
            class="w-full h-12 px-4 text-base bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
          />
        </ui-input-group>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <ui-input-group prefix="$" [disabled]="true">
        <input
          type="number"
          placeholder="0.00"
          disabled
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none disabled:cursor-not-allowed"
        />
      </ui-input-group>
    `,
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `
      <div>
        <ui-input-group prefix="$" [invalid]="true">
          <input
            type="number"
            placeholder="0.00"
            class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
          />
        </ui-input-group>
        <p class="text-xs text-red-600 mt-1.5">Please enter a valid amount</p>
      </div>
    `,
  }),
};

export const FormExample: Story = {
  render: () => ({
    props: {
      dollarIcon: DollarSign,
      percentIcon: Percent,
      phoneIcon: Phone,
      atIcon: AtSign,
      globeIcon: Globe,
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Settings</h3>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Price</label>
          <ui-input-group prefix="$" suffix="USD">
            <input
              type="number"
              placeholder="0.00"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
          </ui-input-group>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Discount</label>
          <ui-input-group [suffixIcon]="percentIcon">
            <input
              type="number"
              placeholder="0"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
          </ui-input-group>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
          <ui-input-group [prefixIcon]="atIcon">
            <input
              type="text"
              placeholder="username"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
          </ui-input-group>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Website</label>
          <ui-input-group prefix="https://">
            <input
              type="text"
              placeholder="www.example.com"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
          </ui-input-group>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
          <ui-input-group prefix="+1" [prefixIcon]="phoneIcon">
            <input
              type="tel"
              placeholder="(555) 123-4567"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
            />
          </ui-input-group>
        </div>
      </div>
    `,
  }),
};

export const VariousAddonTypes: Story = {
  render: () => ({
    props: {
      hashIcon: Hash,
      percentIcon: Percent,
    },
    template: `
      <div class="flex flex-col gap-4 max-w-md">
        <ui-input-group prefix="ID-">
          <input
            type="text"
            placeholder="Enter ID"
            class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
          />
        </ui-input-group>

        <ui-input-group [prefixIcon]="hashIcon" suffix="units">
          <input
            type="number"
            placeholder="0"
            class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
          />
        </ui-input-group>

        <ui-input-group prefix="Tax:" [suffixIcon]="percentIcon">
          <input
            type="number"
            placeholder="0"
            class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border-0 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
          />
        </ui-input-group>
      </div>
    `,
  }),
};
