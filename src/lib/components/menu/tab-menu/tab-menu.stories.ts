import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Home, User, Settings, Bell, FileText, Mail } from 'lucide-angular';

import { UiTabMenuComponent, TabMenuItem } from './tab-menu.component';

const meta: Meta<UiTabMenuComponent> = {
  title: 'Menu/TabMenu',
  component: UiTabMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTabMenuComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiTabMenuComponent>;

const basicItems: TabMenuItem[] = [
  { label: 'Home', icon: Home },
  { label: 'Profile', icon: User },
  { label: 'Settings', icon: Settings },
];

export const Default: Story = {
  render: () => ({
    props: {
      items: basicItems,
      activeItem: basicItems[0],
    },
    template: `
      <ui-tab-menu [model]="items" [(activeItem)]="activeItem" />
    `,
  }),
};

export const IconsOnly: Story = {
  render: () => ({
    props: {
      items: [{ icon: Home }, { icon: User }, { icon: Settings }, { icon: Bell }] as TabMenuItem[],
      activeItem: null as TabMenuItem | null,
    },
    template: `
      <ui-tab-menu [model]="items" [(activeItem)]="activeItem" />
    `,
  }),
};

export const TextOnly: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Overview' },
        { label: 'Details' },
        { label: 'Reviews' },
        { label: 'FAQ' },
      ] as TabMenuItem[],
      activeItem: null as TabMenuItem | null,
    },
    template: `
      <ui-tab-menu [model]="items" [(activeItem)]="activeItem" />
    `,
  }),
};

export const WithBadges: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Inbox', icon: Mail, badge: '5' },
        {
          label: 'Notifications',
          icon: Bell,
          badge: '12',
          badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        },
        { label: 'Documents', icon: FileText },
      ] as TabMenuItem[],
      activeItem: null as TabMenuItem | null,
    },
    template: `
      <ui-tab-menu [model]="items" [(activeItem)]="activeItem" />
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'General', icon: Home },
        { label: 'Security', icon: Settings },
        { label: 'Billing', icon: FileText, disabled: true },
        { label: 'Notifications', icon: Bell },
      ] as TabMenuItem[],
      activeItem: null as TabMenuItem | null,
    },
    template: `
      <ui-tab-menu [model]="items" [(activeItem)]="activeItem" />
    `,
  }),
};

export const WithContent: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Overview', id: 'overview' },
        { label: 'Details', id: 'details' },
        { label: 'Reviews', id: 'reviews' },
      ] as TabMenuItem[],
      activeItem: { label: 'Overview', id: 'overview' } as TabMenuItem,
    },
    template: `
      <div class="space-y-4">
        <ui-tab-menu [model]="items" [(activeItem)]="activeItem" />

        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          @switch (activeItem?.id) {
            @case ('overview') {
              <h3 class="font-semibold mb-2">Overview</h3>
              <p class="text-gray-600 dark:text-gray-400">This is the overview content.</p>
            }
            @case ('details') {
              <h3 class="font-semibold mb-2">Details</h3>
              <p class="text-gray-600 dark:text-gray-400">This is the details content.</p>
            }
            @case ('reviews') {
              <h3 class="font-semibold mb-2">Reviews</h3>
              <p class="text-gray-600 dark:text-gray-400">This is the reviews content.</p>
            }
          }
        </div>
      </div>
    `,
  }),
};

export const SettingsPage: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Profile', icon: User },
        { label: 'Account', icon: Settings },
        { label: 'Notifications', icon: Bell },
        { label: 'Security' },
        { label: 'Billing' },
      ] as TabMenuItem[],
      activeItem: null as TabMenuItem | null,
    },
    template: `
      <div class="max-w-2xl">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Settings</h1>
        <ui-tab-menu [model]="items" [(activeItem)]="activeItem" />
      </div>
    `,
  }),
};
