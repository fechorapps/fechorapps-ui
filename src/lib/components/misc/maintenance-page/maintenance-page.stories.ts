import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiMaintenancePageComponent } from './maintenance-page.component';

const future = new Date(Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000); // 2.5 hours from now

const meta: Meta<UiMaintenancePageComponent> = {
  title: 'Misc/MaintenancePage',
  component: UiMaintenancePageComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMaintenancePageComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    showCountdown: {
      control: { type: 'boolean' },
      description: 'Show live countdown timer',
      table: { category: 'Behavior' },
    },
    title: {
      control: { type: 'text' },
      description: 'Page title',
      table: { category: 'Content' },
    },
    message: {
      control: { type: 'text' },
      description: 'Description message',
      table: { category: 'Content' },
    },
    estimatedTime: {
      control: { type: 'text' },
      description: 'Static estimated completion time string',
      table: { category: 'Content' },
    },
    contactEmail: {
      control: { type: 'text' },
      description: 'Contact email address',
      table: { category: 'Content' },
    },
  },
};

export default meta;
type Story = StoryObj<UiMaintenancePageComponent>;

export const Default: Story = {
  args: {
    title: 'Under Maintenance',
    message: "We're performing scheduled maintenance. We'll be back soon.",
    estimatedTime: null,
    showCountdown: false,
    returnTime: null,
    contactEmail: null,
  },
};

export const WithEstimatedTime: Story = {
  args: {
    title: 'Under Maintenance',
    message: "We're upgrading our systems to serve you better.",
    estimatedTime: 'Sunday, June 22 at 6:00 AM UTC',
    showCountdown: false,
    contactEmail: 'support@example.com',
  },
};

export const WithCountdown: Story = {
  args: {
    title: 'Scheduled Maintenance',
    message: 'Our systems will be back online shortly.',
    showCountdown: true,
    returnTime: future,
    contactEmail: 'ops@example.com',
  },
};

export const MinimalNoContact: Story = {
  args: {
    title: 'Temporarily Offline',
    message: 'We are working to restore service as quickly as possible.',
    showCountdown: false,
    estimatedTime: null,
    contactEmail: null,
  },
};
