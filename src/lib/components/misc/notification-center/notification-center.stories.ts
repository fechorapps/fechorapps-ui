import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiNotificationCenterComponent } from './notification-center.component';
import type { UiNotification } from './notification-center.component';

const baseNotifications: UiNotification[] = [
  {
    id: '1',
    title: 'Deployment successful',
    message: 'Your app was deployed to production.',
    type: 'success',
    read: true,
    timestamp: new Date(),
  },
  {
    id: '2',
    title: 'New comment on your post',
    message: 'Ricardo left a comment on "Angular Signals".',
    type: 'info',
    read: true,
    timestamp: new Date(),
  },
  {
    id: '3',
    title: 'Disk usage warning',
    message: 'Your storage is at 85% capacity.',
    type: 'warning',
    read: true,
    timestamp: new Date(),
  },
];

const unreadNotifications: UiNotification[] = [
  {
    id: '4',
    title: 'Critical error detected',
    message: 'An unhandled exception occurred in production.',
    type: 'danger',
    read: false,
    timestamp: new Date(),
  },
  {
    id: '5',
    title: 'Build failed',
    message: 'Pipeline step "test" exited with code 1.',
    type: 'danger',
    read: false,
    timestamp: new Date(),
  },
  {
    id: '6',
    title: 'PR approved',
    message: 'Your pull request #42 was approved.',
    type: 'success',
    read: false,
    timestamp: new Date(),
  },
  ...baseNotifications,
];

const meta: Meta<UiNotificationCenterComponent> = {
  title: 'Misc/NotificationCenter',
  component: UiNotificationCenterComponent,
  decorators: [
    moduleMetadata({
      imports: [UiNotificationCenterComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    maxVisible: {
      control: { type: 'number' },
      description: 'Maximum number of notifications to display',
    },
    placement: {
      control: { type: 'select' },
      options: ['top-right', 'bottom-right'],
      description: 'Popover placement relative to bell button',
    },
  },
};

export default meta;
type Story = StoryObj<UiNotificationCenterComponent>;

export const Empty: Story = {
  render: () => ({
    props: {
      notifications: [],
    },
    template: `
      <div class="p-8 flex justify-end">
        <ui-notification-center [notifications]="notifications" />
      </div>
    `,
  }),
};

export const WithNotifications: Story = {
  render: () => ({
    props: {
      notifications: baseNotifications,
    },
    template: `
      <div class="p-8 flex justify-end">
        <ui-notification-center [notifications]="notifications" />
      </div>
    `,
  }),
};

export const WithUnread: Story = {
  render: () => ({
    props: {
      notifications: unreadNotifications,
    },
    template: `
      <div class="p-8 flex justify-end">
        <ui-notification-center [notifications]="notifications" />
      </div>
    `,
  }),
};
