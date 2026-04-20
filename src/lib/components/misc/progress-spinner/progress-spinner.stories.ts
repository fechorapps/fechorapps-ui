import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiProgressSpinnerComponent } from './progress-spinner.component';

const meta: Meta<UiProgressSpinnerComponent> = {
  title: 'Misc/ProgressSpinner',
  component: UiProgressSpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [UiProgressSpinnerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Spinner size',
    },
    strokeWidth: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Stroke width of the spinner',
    },
  },
};

export default meta;
type Story = StoryObj<UiProgressSpinnerComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <ui-progress-spinner></ui-progress-spinner>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-8">
        <div class="text-center">
          <ui-progress-spinner size="small"></ui-progress-spinner>
          <p class="mt-2 text-sm text-gray-500">Small</p>
        </div>
        <div class="text-center">
          <ui-progress-spinner size="medium"></ui-progress-spinner>
          <p class="mt-2 text-sm text-gray-500">Medium</p>
        </div>
        <div class="text-center">
          <ui-progress-spinner size="large"></ui-progress-spinner>
          <p class="mt-2 text-sm text-gray-500">Large</p>
        </div>
      </div>
    `,
  }),
};

export const CustomStrokeWidth: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-8">
        <div class="text-center">
          <ui-progress-spinner [strokeWidth]="2"></ui-progress-spinner>
          <p class="mt-2 text-sm text-gray-500">Thin</p>
        </div>
        <div class="text-center">
          <ui-progress-spinner [strokeWidth]="4"></ui-progress-spinner>
          <p class="mt-2 text-sm text-gray-500">Normal</p>
        </div>
        <div class="text-center">
          <ui-progress-spinner [strokeWidth]="8"></ui-progress-spinner>
          <p class="mt-2 text-sm text-gray-500">Thick</p>
        </div>
      </div>
    `,
  }),
};

export const InButton: Story = {
  render: () => ({
    template: `
      <button class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md" disabled>
        <ui-progress-spinner size="small" styleClass="[&_circle]:stroke-white [&_circle:first-child]:stroke-white/30"></ui-progress-spinner>
        <span>Loading...</span>
      </button>
    `,
  }),
};

export const LoadingCard: Story = {
  render: () => ({
    template: `
      <div class="w-64 p-6 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col items-center gap-4">
        <ui-progress-spinner size="large"></ui-progress-spinner>
        <p class="text-gray-600 dark:text-gray-400">Loading content...</p>
      </div>
    `,
  }),
};
