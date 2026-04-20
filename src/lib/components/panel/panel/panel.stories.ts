import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiPanelComponent } from './panel.component';

const meta: Meta<UiPanelComponent> = {
  title: 'Panel/Panel',
  component: UiPanelComponent,
  decorators: [
    moduleMetadata({
      imports: [UiPanelComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: { type: 'text' },
      description: 'Panel header text',
    },
    toggleable: {
      control: { type: 'boolean' },
      description: 'Allow collapse/expand',
    },
    collapsed: {
      control: { type: 'boolean' },
      description: 'Initial collapsed state',
    },
  },
};

export default meta;
type Story = StoryObj<UiPanelComponent>;

export const Basic: Story = {
  render: () => ({
    template: `
      <ui-panel header="Panel Title">
        <p class="text-gray-600 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </ui-panel>
    `,
  }),
};

export const Toggleable: Story = {
  render: () => ({
    template: `
      <ui-panel header="Toggleable Panel" [toggleable]="true">
        <p class="text-gray-600 dark:text-gray-400">
          Click the icon in the header to collapse or expand this panel.
        </p>
      </ui-panel>
    `,
  }),
};

export const InitiallyCollapsed: Story = {
  render: () => ({
    template: `
      <ui-panel header="Collapsed Panel" [toggleable]="true" [collapsed]="true">
        <p class="text-gray-600 dark:text-gray-400">
          This panel was initially collapsed.
        </p>
      </ui-panel>
    `,
  }),
};

export const MultiplePanels: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-panel header="User Profile" [toggleable]="true">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div>
              <h3 class="font-medium">John Doe</h3>
              <p class="text-sm text-gray-500">john.doe&#64;example.com</p>
            </div>
          </div>
        </ui-panel>

        <ui-panel header="Account Settings" [toggleable]="true">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" checked />
            </div>
            <div class="flex items-center justify-between">
              <span>Two-Factor Auth</span>
              <input type="checkbox" />
            </div>
          </div>
        </ui-panel>

        <ui-panel header="Danger Zone" [toggleable]="true" [collapsed]="true">
          <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete Account
          </button>
        </ui-panel>
      </div>
    `,
  }),
};

export const Dashboard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-2 gap-4">
        <ui-panel header="Revenue">
          <div class="text-3xl font-bold text-green-500">$24,500</div>
          <p class="text-sm text-gray-500 mt-1">+12% from last month</p>
        </ui-panel>

        <ui-panel header="Users">
          <div class="text-3xl font-bold text-blue-500">1,234</div>
          <p class="text-sm text-gray-500 mt-1">+5% from last month</p>
        </ui-panel>

        <ui-panel header="Orders">
          <div class="text-3xl font-bold text-purple-500">567</div>
          <p class="text-sm text-gray-500 mt-1">+8% from last month</p>
        </ui-panel>

        <ui-panel header="Conversion">
          <div class="text-3xl font-bold text-orange-500">3.2%</div>
          <p class="text-sm text-gray-500 mt-1">-1% from last month</p>
        </ui-panel>
      </div>
    `,
  }),
};
