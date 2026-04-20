import { Search, Mail, Lock, User, Phone, Globe, Calendar, CreditCard } from 'lucide-angular';

import type { Meta, StoryObj } from '@storybook/angular';

import { UiIconFieldComponent } from './icon-field.component';

const meta: Meta<UiIconFieldComponent> = {
  title: 'Form/IconField',
  component: UiIconFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Icon field size',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
  },
};

export default meta;
type Story = StoryObj<UiIconFieldComponent>;

export const Default: Story = {
  render: () => ({
    props: { icon: Search },
    template: `
      <ui-icon-field [icon]="icon">
        <input
          type="text"
          placeholder="Search..."
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
      </ui-icon-field>
    `,
  }),
};

export const RightIcon: Story = {
  render: () => ({
    props: { icon: Search },
    template: `
      <ui-icon-field [icon]="icon" iconPosition="right">
        <input
          type="text"
          placeholder="Search..."
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
      </ui-icon-field>
    `,
  }),
};

export const BothIcons: Story = {
  render: () => ({
    props: { icon: Mail, iconEnd: Lock },
    template: `
      <ui-icon-field [icon]="icon" [iconEnd]="iconEnd">
        <input
          type="email"
          placeholder="Enter your email..."
          class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
      </ui-icon-field>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { icon: User },
    template: `
      <div class="flex flex-col gap-4">
        <ui-icon-field [icon]="icon" size="sm">
          <input
            type="text"
            placeholder="Small"
            class="w-full h-8 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500"
          />
        </ui-icon-field>
        <ui-icon-field [icon]="icon" size="md">
          <input
            type="text"
            placeholder="Medium"
            class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500"
          />
        </ui-icon-field>
        <ui-icon-field [icon]="icon" size="lg">
          <input
            type="text"
            placeholder="Large"
            class="w-full h-12 px-4 text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500"
          />
        </ui-icon-field>
      </div>
    `,
  }),
};

export const FormExample: Story = {
  render: () => ({
    props: {
      userIcon: User,
      mailIcon: Mail,
      phoneIcon: Phone,
      globeIcon: Globe,
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Form</h3>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
          <ui-icon-field [icon]="userIcon">
            <input
              type="text"
              placeholder="John Doe"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </ui-icon-field>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
          <ui-icon-field [icon]="mailIcon">
            <input
              type="email"
              placeholder="john@example.com"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </ui-icon-field>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
          <ui-icon-field [icon]="phoneIcon">
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </ui-icon-field>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Website</label>
          <ui-icon-field [icon]="globeIcon">
            <input
              type="url"
              placeholder="https://example.com"
              class="w-full h-10 px-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </ui-icon-field>
        </div>
      </div>
    `,
  }),
};
