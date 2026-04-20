import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ArrowUp, ChevronUp, ChevronsUp } from 'lucide-angular';

import { UiScrollTopComponent } from './scroll-top.component';

const meta: Meta<UiScrollTopComponent> = {
  title: 'Misc/ScrollTop',
  component: UiScrollTopComponent,
  decorators: [
    moduleMetadata({
      imports: [UiScrollTopComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'Scroll position threshold to show button',
    },
    behavior: {
      control: { type: 'select' },
      options: ['smooth', 'auto', 'instant'],
      description: 'Scroll behavior',
    },
  },
};

export default meta;
type Story = StoryObj<UiScrollTopComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="h-[200vh] p-4 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <p class="text-lg font-semibold mb-4">Scroll down to see the ScrollTop button</p>
        <p class="text-gray-600 dark:text-gray-400">
          The button will appear after scrolling past 400px (default threshold).
        </p>
        <ui-scroll-top></ui-scroll-top>
      </div>
    `,
  }),
};

export const LowThreshold: Story = {
  render: () => ({
    template: `
      <div class="h-[200vh] p-4 bg-gradient-to-b from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
        <p class="text-lg font-semibold mb-4">Low Threshold (100px)</p>
        <p class="text-gray-600 dark:text-gray-400">
          The button appears sooner with a lower threshold value.
        </p>
        <ui-scroll-top [threshold]="100"></ui-scroll-top>
      </div>
    `,
  }),
};

export const CustomIcon: Story = {
  render: () => ({
    props: { ArrowUp },
    template: `
      <div class="h-[200vh] p-4 bg-gradient-to-b from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
        <p class="text-lg font-semibold mb-4">Custom Icon</p>
        <p class="text-gray-600 dark:text-gray-400">
          Using a custom arrow icon instead of the default chevron.
        </p>
        <ui-scroll-top [icon]="ArrowUp"></ui-scroll-top>
      </div>
    `,
  }),
};

export const CustomStyle: Story = {
  render: () => ({
    template: `
      <div class="h-[200vh] p-4 bg-gradient-to-b from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900">
        <p class="text-lg font-semibold mb-4">Custom Style</p>
        <p class="text-gray-600 dark:text-gray-400">
          Button with custom colors and positioning.
        </p>
        <ui-scroll-top styleClass="!bg-purple-500 hover:!bg-purple-600 !bottom-4 !right-4"></ui-scroll-top>
      </div>
    `,
  }),
};
