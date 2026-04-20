import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiTimelineComponent, TimelineEvent } from './timeline.component';

const sampleEvents: TimelineEvent[] = [
  {
    status: 'Ordered',
    date: '15/10/2024 10:30',
    color: 'primary',
  },
  {
    status: 'Processing',
    date: '15/10/2024 14:00',
    color: 'info',
  },
  {
    status: 'Shipped',
    date: '15/10/2024 16:15',
    color: 'warning',
  },
  {
    status: 'Delivered',
    date: '16/10/2024 10:00',
    color: 'success',
  },
];

const projectEvents: TimelineEvent[] = [
  {
    status: 'Project Kickoff',
    date: 'January 2024',
    color: 'primary',
    description: 'Initial planning and team formation',
  },
  {
    status: 'Design Phase',
    date: 'February 2024',
    color: 'info',
    description: 'UI/UX design and architecture planning',
  },
  {
    status: 'Development',
    date: 'March - May 2024',
    color: 'warning',
    description: 'Core features implementation',
  },
  {
    status: 'Testing',
    date: 'June 2024',
    color: 'secondary',
    description: 'QA and user acceptance testing',
  },
  {
    status: 'Launch',
    date: 'July 2024',
    color: 'success',
    description: 'Production deployment',
  },
];

const meta: Meta<UiTimelineComponent> = {
  title: 'Data/Timeline',
  component: UiTimelineComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTimelineComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout direction',
      table: { category: 'Layout' },
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'right', 'alternate', 'top', 'bottom'],
      description: 'Content alignment',
      table: { category: 'Layout' },
    },
  },
};

export default meta;
type Story = StoryObj<UiTimelineComponent>;

export const Default: Story = {
  args: {
    value: sampleEvents,
    layout: 'vertical',
    align: 'left',
  },
};

export const RightAligned: Story = {
  args: {
    value: sampleEvents,
    layout: 'vertical',
    align: 'right',
  },
};

export const Alternate: Story = {
  args: {
    value: projectEvents,
    layout: 'vertical',
    align: 'alternate',
  },
};

export const Horizontal: Story = {
  args: {
    value: sampleEvents,
    layout: 'horizontal',
    align: 'top',
  },
};

export const HorizontalBottom: Story = {
  args: {
    value: sampleEvents,
    layout: 'horizontal',
    align: 'bottom',
  },
};

export const HorizontalAlternate: Story = {
  args: {
    value: sampleEvents,
    layout: 'horizontal',
    align: 'alternate',
  },
};

export const CustomContent: Story = {
  render: (args) => ({
    props: {
      ...args,
      events: projectEvents,
    },
    template: `
      <ui-timeline [value]="events" align="alternate">
        <ng-template #content let-event let-index="index">
          <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100">
              {{ event.status }}
            </h3>
            <p class="text-sm text-primary-500 font-medium mt-1">
              {{ event.date }}
            </p>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              {{ event.description }}
            </p>
          </div>
        </ng-template>
        <ng-template #opposite let-event>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ event.date }}
          </div>
        </ng-template>
      </ui-timeline>
    `,
  }),
  args: {
    layout: 'vertical',
    align: 'alternate',
  },
};

export const OrderTracking: Story = {
  render: (args) => ({
    props: {
      ...args,
      events: [
        { status: 'Order Placed', date: 'Dec 20, 2024 9:00 AM', color: 'success', completed: true },
        {
          status: 'Payment Confirmed',
          date: 'Dec 20, 2024 9:05 AM',
          color: 'success',
          completed: true,
        },
        { status: 'Processing', date: 'Dec 20, 2024 10:30 AM', color: 'success', completed: true },
        { status: 'Shipped', date: 'Dec 21, 2024 2:00 PM', color: 'primary', completed: false },
        {
          status: 'Out for Delivery',
          date: 'Expected Dec 23',
          color: 'secondary',
          completed: false,
        },
        { status: 'Delivered', date: 'Expected Dec 23', color: 'secondary', completed: false },
      ],
    },
    template: `
      <div class="max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Order #12345</h2>
        <ui-timeline [value]="events" align="left">
          <ng-template #content let-event>
            <div class="pb-2">
              <div class="flex items-center gap-2">
                <h4
                  class="font-medium"
                  [class.text-gray-900]="event.completed"
                  [class.dark:text-gray-100]="event.completed"
                  [class.text-gray-400]="!event.completed"
                  [class.dark:text-gray-500]="!event.completed"
                >
                  {{ event.status }}
                </h4>
                @if (event.completed) {
                  <span class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                }
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ event.date }}
              </p>
            </div>
          </ng-template>
        </ui-timeline>
      </div>
    `,
  }),
  args: {},
};

export const ActivityFeed: Story = {
  render: (args) => ({
    props: {
      ...args,
      activities: [
        {
          status: 'John Doe commented',
          date: '2 minutes ago',
          color: 'info',
          message: 'Great work on this feature!',
          avatar: 'JD',
        },
        {
          status: 'Jane Smith merged PR #42',
          date: '15 minutes ago',
          color: 'success',
          message: 'feat: add user authentication',
          avatar: 'JS',
        },
        {
          status: 'Build #123 failed',
          date: '1 hour ago',
          color: 'danger',
          message: 'Test suite failed: 3 tests',
          avatar: 'CI',
        },
        {
          status: 'Mike Johnson pushed to main',
          date: '2 hours ago',
          color: 'primary',
          message: '5 commits pushed',
          avatar: 'MJ',
        },
      ],
    },
    template: `
      <div class="max-w-lg">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Activity Feed</h2>
        <ui-timeline [value]="activities" align="left">
          <ng-template #marker let-event>
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
              [class.bg-blue-500]="event.color === 'info'"
              [class.bg-green-500]="event.color === 'success'"
              [class.bg-red-500]="event.color === 'danger'"
              [class.bg-primary-500]="event.color === 'primary'"
            >
              {{ event.avatar }}
            </div>
          </ng-template>
          <ng-template #content let-event>
            <div class="pb-4">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900 dark:text-gray-100">
                  {{ event.status }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ event.date }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {{ event.message }}
              </p>
            </div>
          </ng-template>
        </ui-timeline>
      </div>
    `,
  }),
  args: {},
};

export const StepByStep: Story = {
  render: (args) => ({
    props: {
      ...args,
      steps: [
        {
          status: 'Step 1: Account Setup',
          color: 'success',
          description: 'Create your account and verify email',
        },
        {
          status: 'Step 2: Profile',
          color: 'success',
          description: 'Complete your profile information',
        },
        {
          status: 'Step 3: Preferences',
          color: 'primary',
          description: 'Set your preferences and notifications',
        },
        { status: 'Step 4: Connect', color: 'secondary', description: 'Link external accounts' },
        { status: 'Step 5: Complete', color: 'secondary', description: 'Start using the platform' },
      ],
      currentStep: 2,
    },
    template: `
      <ui-timeline [value]="steps" layout="horizontal" align="top">
        <ng-template #marker let-event let-index="index">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            [class.bg-green-500]="index < currentStep"
            [class.bg-primary-500]="index === currentStep"
            [class.bg-gray-300]="index > currentStep"
            [class.dark:bg-gray-600]="index > currentStep"
          >
            @if (index < currentStep) {
              <span>✓</span>
            } @else {
              {{ index + 1 }}
            }
          </div>
        </ng-template>
        <ng-template #content let-event let-index="index">
          <div class="text-center max-w-[150px]">
            <h4
              class="font-medium text-sm"
              [class.text-gray-900]="index <= currentStep"
              [class.dark:text-gray-100]="index <= currentStep"
              [class.text-gray-400]="index > currentStep"
            >
              {{ event.status }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ event.description }}
            </p>
          </div>
        </ng-template>
      </ui-timeline>
    `,
  }),
  args: {},
};
