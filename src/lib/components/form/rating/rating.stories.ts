import type { Meta, StoryObj } from '@storybook/angular';

import { UiRatingComponent } from './rating.component';

const meta: Meta<UiRatingComponent> = {
  title: 'Form/Rating',
  component: UiRatingComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Rating size',
    },
    stars: {
      control: 'number',
      description: 'Number of stars',
    },
    value: {
      control: 'number',
      description: 'Current rating value',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    allowCancel: {
      control: 'boolean',
      description: 'Allow canceling rating',
    },
  },
};

export default meta;
type Story = StoryObj<UiRatingComponent>;

export const Default: Story = {
  args: {
    label: 'Rate this product',
    value: 3,
  },
};

export const TenStars: Story = {
  args: {
    label: 'Rating (1-10)',
    stars: 10,
    value: 7,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Average Rating',
    value: 4,
    readonly: true,
    helpText: 'Based on 128 reviews',
  },
};

export const NoCancel: Story = {
  args: {
    label: 'Required Rating',
    value: 3,
    allowCancel: false,
    helpText: 'Click a star to change, cannot be cleared',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-rating size="sm" label="Small" [value]="3"></ui-rating>
        <ui-rating size="md" label="Medium" [value]="4"></ui-rating>
        <ui-rating size="lg" label="Large" [value]="5"></ui-rating>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Rating',
    value: 2,
    disabled: true,
  },
};

export const Empty: Story = {
  args: {
    label: 'Rate your experience',
    value: null,
    helpText: 'Click to rate',
  },
};

export const ProductReview: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Leave a Review</h3>
        <div class="space-y-4">
          <ui-rating label="Quality" [value]="4"></ui-rating>
          <ui-rating label="Value for Money" [value]="3"></ui-rating>
          <ui-rating label="Shipping" [value]="5"></ui-rating>
        </div>
      </div>
    `,
  }),
};
