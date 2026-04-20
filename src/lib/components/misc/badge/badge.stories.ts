import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { LucideAngularModule, Bell, Mail, ShoppingCart } from 'lucide-angular';

import { UiBadgeComponent } from './badge.component';

const meta: Meta<UiBadgeComponent> = {
  title: 'Misc/Badge',
  component: UiBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [UiBadgeComponent, LucideAngularModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'info', 'warn', 'danger', 'contrast'],
      description: 'Badge severity',
      table: { category: 'Appearance' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'normal', 'large', 'xlarge'],
      description: 'Badge size',
      table: { category: 'Size' },
    },
    value: {
      control: { type: 'text' },
      description: 'Badge value',
      table: { category: 'Content' },
    },
  },
};

export default meta;
type Story = StoryObj<UiBadgeComponent>;

export const Basic: Story = {
  args: {
    value: '5',
    severity: 'primary',
  },
};

export const Severities: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-badge value="1" severity="primary" />
        <ui-badge value="2" severity="secondary" />
        <ui-badge value="3" severity="success" />
        <ui-badge value="4" severity="info" />
        <ui-badge value="5" severity="warn" />
        <ui-badge value="6" severity="danger" />
        <ui-badge value="7" severity="contrast" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-badge value="S" size="small" />
        <ui-badge value="M" size="normal" />
        <ui-badge value="L" size="large" />
        <ui-badge value="XL" size="xlarge" />
      </div>
    `,
  }),
};

export const DotBadges: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-badge severity="primary" size="small" />
        <ui-badge severity="success" size="normal" />
        <ui-badge severity="danger" size="large" />
        <ui-badge severity="info" size="xlarge" />
      </div>
    `,
  }),
};

export const LargeNumbers: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-badge value="99" severity="danger" />
        <ui-badge value="99+" severity="danger" />
        <ui-badge value="999" severity="danger" />
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    props: {
      bellIcon: Bell,
      mailIcon: Mail,
      cartIcon: ShoppingCart,
    },
    template: `
      <div class="flex items-center gap-8">
        <div class="relative inline-block">
          <button class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <lucide-icon [img]="bellIcon" [size]="24" />
          </button>
          <ui-badge value="3" severity="danger" styleClass="absolute -top-1 -right-1" />
        </div>

        <div class="relative inline-block">
          <button class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <lucide-icon [img]="mailIcon" [size]="24" />
          </button>
          <ui-badge value="12" severity="primary" styleClass="absolute -top-1 -right-1" />
        </div>

        <div class="relative inline-block">
          <button class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <lucide-icon [img]="cartIcon" [size]="24" />
          </button>
          <ui-badge severity="success" styleClass="absolute -top-1 -right-1" />
        </div>
      </div>
    `,
  }),
};

export const ButtonWithBadge: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <button class="relative px-4 py-2 bg-primary-500 text-white rounded-lg">
          Notifications
          <ui-badge value="5" severity="danger" styleClass="absolute -top-2 -right-2" />
        </button>

        <button class="relative px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg">
          Messages
          <ui-badge value="99+" severity="primary" styleClass="absolute -top-2 -right-2" />
        </button>
      </div>
    `,
  }),
};

export const ListWithBadges: Story = {
  render: () => ({
    template: `
      <div class="w-64 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
          <span>Inbox</span>
          <ui-badge value="24" severity="primary" size="small" />
        </div>
        <div class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
          <span>Starred</span>
          <ui-badge value="5" severity="warn" size="small" />
        </div>
        <div class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
          <span>Spam</span>
          <ui-badge value="3" severity="danger" size="small" />
        </div>
        <div class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
          <span>Drafts</span>
          <ui-badge value="1" severity="secondary" size="small" />
        </div>
      </div>
    `,
  }),
};
