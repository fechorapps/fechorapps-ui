import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiSkeletonComponent } from './skeleton.component';

const meta: Meta<UiSkeletonComponent> = {
  title: 'Misc/Skeleton',
  component: UiSkeletonComponent,
  decorators: [
    moduleMetadata({
      imports: [UiSkeletonComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'text' },
      description: 'Skeleton width',
      table: { category: 'Size' },
    },
    height: {
      control: { type: 'text' },
      description: 'Skeleton height',
      table: { category: 'Size' },
    },
    shape: {
      control: { type: 'select' },
      options: ['rectangle', 'circle', 'square'],
      description: 'Skeleton shape',
      table: { category: 'Appearance' },
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', 'none'],
      description: 'Animation type',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiSkeletonComponent>;

export const Basic: Story = {
  args: {
    width: '100%',
    height: '1rem',
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
    width: '4rem',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    width: '4rem',
  },
};

export const LargeBlock: Story = {
  args: {
    width: '100%',
    height: '10rem',
  },
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-skeleton shape="circle" width="4rem" />
        <ui-skeleton shape="square" width="4rem" />
        <ui-skeleton shape="rectangle" width="8rem" height="4rem" />
      </div>
    `,
  }),
};

export const TextLines: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <ui-skeleton width="100%" height="1rem" />
        <ui-skeleton width="100%" height="1rem" />
        <ui-skeleton width="75%" height="1rem" />
      </div>
    `,
  }),
};

export const CardSkeleton: Story = {
  render: () => ({
    template: `
      <div class="max-w-sm p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <ui-skeleton width="100%" height="12rem" borderRadius="0.5rem" styleClass="mb-4" />
        <ui-skeleton width="60%" height="1.5rem" styleClass="mb-2" />
        <ui-skeleton width="100%" height="1rem" styleClass="mb-1" />
        <ui-skeleton width="100%" height="1rem" styleClass="mb-1" />
        <ui-skeleton width="80%" height="1rem" />
      </div>
    `,
  }),
};

export const UserCardSkeleton: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg max-w-md">
        <ui-skeleton shape="circle" width="3rem" />
        <div class="flex-1 space-y-2">
          <ui-skeleton width="40%" height="1rem" />
          <ui-skeleton width="60%" height="0.75rem" />
        </div>
      </div>
    `,
  }),
};

export const ListSkeleton: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        @for (item of [1, 2, 3, 4]; track item) {
          <div class="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <ui-skeleton shape="circle" width="2.5rem" />
            <div class="flex-1 space-y-2">
              <ui-skeleton width="30%" height="0.875rem" />
              <ui-skeleton width="50%" height="0.75rem" />
            </div>
            <ui-skeleton width="4rem" height="2rem" borderRadius="0.5rem" />
          </div>
        }
      </div>
    `,
  }),
};

export const TableSkeleton: Story = {
  render: () => ({
    template: `
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <ui-skeleton width="20%" height="1rem" />
          <ui-skeleton width="25%" height="1rem" />
          <ui-skeleton width="20%" height="1rem" />
          <ui-skeleton width="15%" height="1rem" />
        </div>

        <!-- Rows -->
        @for (row of [1, 2, 3, 4, 5]; track row) {
          <div class="flex gap-4 p-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <ui-skeleton width="20%" height="0.875rem" />
            <ui-skeleton width="25%" height="0.875rem" />
            <ui-skeleton width="20%" height="0.875rem" />
            <ui-skeleton width="15%" height="0.875rem" />
          </div>
        }
      </div>
    `,
  }),
};

export const DashboardSkeleton: Story = {
  render: () => ({
    template: `
      <div class="space-y-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-4">
          @for (card of [1, 2, 3, 4]; track card) {
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <ui-skeleton width="40%" height="0.75rem" styleClass="mb-2" />
              <ui-skeleton width="60%" height="1.5rem" />
            </div>
          }
        </div>

        <!-- Chart Area -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <ui-skeleton width="30%" height="1.25rem" styleClass="mb-4" />
          <ui-skeleton width="100%" height="16rem" />
        </div>

        <!-- Table -->
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <ui-skeleton width="25%" height="1.25rem" styleClass="mb-4" />
          <div class="space-y-3">
            @for (row of [1, 2, 3]; track row) {
              <div class="flex gap-4">
                <ui-skeleton width="15%" height="0.875rem" />
                <ui-skeleton width="30%" height="0.875rem" />
                <ui-skeleton width="20%" height="0.875rem" />
                <ui-skeleton width="15%" height="0.875rem" />
              </div>
            }
          </div>
        </div>
      </div>
    `,
  }),
};
