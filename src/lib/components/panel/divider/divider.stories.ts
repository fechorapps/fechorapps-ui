import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiDividerComponent } from './divider.component';

const meta: Meta<UiDividerComponent> = {
  title: 'Panel/Divider',
  component: UiDividerComponent,
  decorators: [
    moduleMetadata({
      imports: [UiDividerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    type: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted'],
      description: 'Line type',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Content alignment',
    },
  },
};

export default meta;
type Story = StoryObj<UiDividerComponent>;

export const Basic: Story = {
  render: () => ({
    template: `
      <div>
        <p class="text-gray-600 dark:text-gray-400">Content above</p>
        <ui-divider />
        <p class="text-gray-600 dark:text-gray-400">Content below</p>
      </div>
    `,
  }),
};

export const WithText: Story = {
  render: () => ({
    template: `
      <div>
        <p class="text-gray-600 dark:text-gray-400">Content above</p>
        <ui-divider>OR</ui-divider>
        <p class="text-gray-600 dark:text-gray-400">Content below</p>
      </div>
    `,
  }),
};

export const TextAlignments: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-divider align="left">Left</ui-divider>
        <ui-divider align="center">Center</ui-divider>
        <ui-divider align="right">Right</ui-divider>
      </div>
    `,
  }),
};

export const Types: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-divider type="solid">Solid</ui-divider>
        <ui-divider type="dashed">Dashed</ui-divider>
        <ui-divider type="dotted">Dotted</ui-divider>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div class="flex items-center h-24">
        <span class="text-gray-600 dark:text-gray-400">Left</span>
        <ui-divider layout="vertical" />
        <span class="text-gray-600 dark:text-gray-400">Center</span>
        <ui-divider layout="vertical" />
        <span class="text-gray-600 dark:text-gray-400">Right</span>
      </div>
    `,
  }),
};

export const LoginForm: Story = {
  render: () => ({
    template: `
      <div class="max-w-sm mx-auto space-y-4">
        <button class="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          Continue with Google
        </button>
        <button class="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          Continue with GitHub
        </button>

        <ui-divider>or continue with email</ui-divider>

        <input
          type="email"
          placeholder="Email"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        />
        <button class="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
          Sign In
        </button>
      </div>
    `,
  }),
};
