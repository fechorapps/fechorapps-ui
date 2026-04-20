import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CheckCircle, Clock, XCircle, AlertCircle, Tag as TagIcon } from 'lucide-angular';

import { UiTagComponent } from './tag.component';

const meta: Meta<UiTagComponent> = {
  title: 'Misc/Tag',
  component: UiTagComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTagComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'info', 'warn', 'danger', 'contrast'],
      description: 'Tag severity',
      table: { category: 'Appearance' },
    },
    value: {
      control: { type: 'text' },
      description: 'Tag value',
      table: { category: 'Content' },
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Rounded corners',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<UiTagComponent>;

export const Basic: Story = {
  args: {
    value: 'Tag',
    severity: 'primary',
  },
};

export const Severities: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <ui-tag value="Primary" severity="primary" />
        <ui-tag value="Secondary" severity="secondary" />
        <ui-tag value="Success" severity="success" />
        <ui-tag value="Info" severity="info" />
        <ui-tag value="Warning" severity="warn" />
        <ui-tag value="Danger" severity="danger" />
        <ui-tag value="Contrast" severity="contrast" />
      </div>
    `,
  }),
};

export const Rounded: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <ui-tag value="Primary" severity="primary" [rounded]="true" />
        <ui-tag value="Success" severity="success" [rounded]="true" />
        <ui-tag value="Warning" severity="warn" [rounded]="true" />
        <ui-tag value="Danger" severity="danger" [rounded]="true" />
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      checkIcon: CheckCircle,
      clockIcon: Clock,
      xIcon: XCircle,
      alertIcon: AlertCircle,
    },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <ui-tag value="Approved" severity="success" [icon]="checkIcon" />
        <ui-tag value="Pending" severity="warn" [icon]="clockIcon" />
        <ui-tag value="Rejected" severity="danger" [icon]="xIcon" />
        <ui-tag value="Review" severity="info" [icon]="alertIcon" />
      </div>
    `,
  }),
};

export const StatusIndicators: Story = {
  render: () => ({
    props: {
      checkIcon: CheckCircle,
      clockIcon: Clock,
      xIcon: XCircle,
    },
    template: `
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-3 px-4 font-medium">Task</th>
            <th class="text-left py-3 px-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="py-3 px-4">Design Review</td>
            <td class="py-3 px-4">
              <ui-tag value="Completed" severity="success" [icon]="checkIcon" [rounded]="true" />
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="py-3 px-4">Development</td>
            <td class="py-3 px-4">
              <ui-tag value="In Progress" severity="info" [icon]="clockIcon" [rounded]="true" />
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="py-3 px-4">Testing</td>
            <td class="py-3 px-4">
              <ui-tag value="Pending" severity="warn" [icon]="clockIcon" [rounded]="true" />
            </td>
          </tr>
          <tr>
            <td class="py-3 px-4">Deployment</td>
            <td class="py-3 px-4">
              <ui-tag value="Blocked" severity="danger" [icon]="xIcon" [rounded]="true" />
            </td>
          </tr>
        </tbody>
      </table>
    `,
  }),
};

export const CategoryTags: Story = {
  render: () => ({
    props: {
      tagIcon: TagIcon,
    },
    template: `
      <div class="space-y-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="font-semibold mb-2">Blog Post Title</h3>
          <p class="text-gray-500 text-sm mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div class="flex flex-wrap gap-2">
            <ui-tag value="Angular" severity="primary" [icon]="tagIcon" />
            <ui-tag value="TypeScript" severity="info" [icon]="tagIcon" />
            <ui-tag value="Tutorial" severity="secondary" [icon]="tagIcon" />
          </div>
        </div>
      </div>
    `,
  }),
};
