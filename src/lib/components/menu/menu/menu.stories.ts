import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Home, User, Settings, LogOut, FileText, Bell, HelpCircle, Mail } from 'lucide-angular';

import { UiMenuComponent, MenuItem } from './menu.component';

const meta: Meta<UiMenuComponent> = {
  title: 'Menu/Menu',
  component: UiMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMenuComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiMenuComponent>;

const basicItems: MenuItem[] = [
  { label: 'Home', icon: Home },
  { label: 'Profile', icon: User },
  { label: 'Settings', icon: Settings },
  { separator: true },
  { label: 'Logout', icon: LogOut },
];

export const Default: Story = {
  args: {
    model: basicItems,
  },
};

export const WithBadges: Story = {
  args: {
    model: [
      { label: 'Inbox', icon: Mail, badge: '5' },
      {
        label: 'Notifications',
        icon: Bell,
        badge: '12',
        badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      },
      {
        label: 'Documents',
        icon: FileText,
        badge: 'New',
        badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    model: [
      {
        label: 'Account',
        items: [
          { label: 'Profile', icon: User },
          { label: 'Settings', icon: Settings },
        ],
      },
      {
        label: 'Support',
        items: [
          { label: 'Help', icon: HelpCircle },
          { label: 'Contact', icon: Mail },
        ],
      },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    model: [
      { label: 'Home', icon: Home },
      { label: 'Profile', icon: User },
      { label: 'Settings', icon: Settings, disabled: true },
      { separator: true },
      { label: 'Logout', icon: LogOut, disabled: true },
    ],
  },
};

export const WithCommands: Story = {
  render: () => ({
    props: {
      lastAction: '',
      items: [
        {
          label: 'New',
          icon: FileText,
          command: () => {
            (window as unknown as { lastAction: string }).lastAction = 'New clicked';
          },
        },
        {
          label: 'Open',
          icon: FileText,
          command: () => {
            (window as unknown as { lastAction: string }).lastAction = 'Open clicked';
          },
        },
        { separator: true },
        {
          label: 'Settings',
          icon: Settings,
          command: () => {
            (window as unknown as { lastAction: string }).lastAction = 'Settings clicked';
          },
        },
      ] as MenuItem[],
    },
    template: `
      <div class="space-y-4">
        <ui-menu [model]="items" />
        @if (lastAction) {
          <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
            Last action: {{ lastAction }}
          </div>
        }
      </div>
    `,
  }),
};

export const WithLinks: Story = {
  args: {
    model: [
      { label: 'Google', url: 'https://google.com', target: '_blank' },
      { label: 'GitHub', url: 'https://github.com', target: '_blank' },
      { label: 'Angular', url: 'https://angular.io', target: '_blank' },
    ],
  },
};

export const MixedContent: Story = {
  args: {
    model: [
      { label: 'Dashboard', icon: Home },
      { label: 'Profile', icon: User, badge: 'Pro' },
      { separator: true },
      {
        label: 'Documents',
        items: [
          { label: 'Recent', icon: FileText },
          { label: 'Shared', icon: FileText },
          { label: 'Archived', icon: FileText, disabled: true },
        ],
      },
      { separator: true },
      { label: 'Settings', icon: Settings },
      { label: 'Help', icon: HelpCircle, url: '/help' },
      { separator: true },
      { label: 'Logout', icon: LogOut },
    ],
  },
};

export const Compact: Story = {
  args: {
    model: [
      { label: 'Edit' },
      { label: 'Copy' },
      { label: 'Paste' },
      { separator: true },
      { label: 'Delete' },
    ],
  },
};

export const CustomTemplate: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'John Doe', icon: User, badge: 'Admin' },
        { label: 'Jane Smith', icon: User, badge: 'User' },
        { label: 'Bob Wilson', icon: User, badge: 'Guest' },
      ] as MenuItem[],
    },
    template: `
      <ui-menu [model]="items">
        <ng-template #item let-item>
          <button class="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800">
            <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {{ item.label.charAt(0) }}
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-gray-100">{{ item.label }}</p>
              <p class="text-xs text-gray-500">{{ item.badge }}</p>
            </div>
          </button>
        </ng-template>
      </ui-menu>
    `,
  }),
};
