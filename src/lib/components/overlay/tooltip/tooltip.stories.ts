import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiTooltipComponent, UiTooltipDirective } from './tooltip.component';

const meta: Meta<UiTooltipComponent> = {
  title: 'Overlay/Tooltip',
  component: UiTooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTooltipComponent, UiTooltipDirective],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position',
      table: { category: 'Position' },
    },
    text: {
      control: { type: 'text' },
      description: 'Tooltip text',
      table: { category: 'Content' },
    },
    showDelay: {
      control: { type: 'number' },
      description: 'Show delay in ms',
      table: { category: 'Timing' },
    },
    hideDelay: {
      control: { type: 'number' },
      description: 'Hide delay in ms',
      table: { category: 'Timing' },
    },
  },
};

export default meta;
type Story = StoryObj<UiTooltipComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-16">
        <ui-tooltip text="This is a tooltip" position="top">
          <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Hover me
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const TopPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-16">
        <ui-tooltip text="Tooltip on top" position="top">
          <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Top
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const BottomPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-16">
        <ui-tooltip text="Tooltip on bottom" position="bottom">
          <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Bottom
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const LeftPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-16">
        <ui-tooltip text="Tooltip on left" position="left">
          <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Left
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const RightPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-16">
        <ui-tooltip text="Tooltip on right" position="right">
          <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Right
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const AllPositions: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center gap-8 p-16">
        <ui-tooltip text="Top tooltip" position="top">
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg">Top</button>
        </ui-tooltip>
        <ui-tooltip text="Bottom tooltip" position="bottom">
          <button class="px-4 py-2 bg-green-500 text-white rounded-lg">Bottom</button>
        </ui-tooltip>
        <ui-tooltip text="Left tooltip" position="left">
          <button class="px-4 py-2 bg-yellow-500 text-white rounded-lg">Left</button>
        </ui-tooltip>
        <ui-tooltip text="Right tooltip" position="right">
          <button class="px-4 py-2 bg-red-500 text-white rounded-lg">Right</button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const WithDelay: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-16">
        <ui-tooltip text="Delayed tooltip" position="top" [showDelay]="500" [hideDelay]="200">
          <button class="px-4 py-2 bg-primary-500 text-white rounded-lg">
            500ms delay
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-16">
        <ui-tooltip text="You won't see this" position="top" [disabled]="true">
          <button class="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
            Disabled tooltip
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const OnIcon: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center gap-4 p-16">
        <ui-tooltip text="Edit" position="top">
          <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </ui-tooltip>
        <ui-tooltip text="Delete" position="top">
          <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </ui-tooltip>
        <ui-tooltip text="Share" position="top">
          <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};

export const DirectiveUsage: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center gap-4 p-16">
        <button
          uiTooltip="Save changes"
          tooltipPosition="top"
          class="px-4 py-2 bg-primary-500 text-white rounded-lg"
        >
          Save
        </button>
        <button
          uiTooltip="Cancel and go back"
          tooltipPosition="bottom"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
      </div>
    `,
  }),
};

export const LongText: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-16">
        <ui-tooltip text="This is a longer tooltip message that provides more detailed information" position="top">
          <button class="px-4 py-2 bg-primary-500 text-white rounded-lg">
            Long tooltip
          </button>
        </ui-tooltip>
      </div>
    `,
  }),
};
