import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Home, User, Settings, Bell } from 'lucide-angular';

import { UiTabsComponent } from './tabs.component';
import { UiTabPanelComponent } from './tab-panel.component';

const meta: Meta<UiTabsComponent> = {
  title: 'Panel/Tabs',
  component: UiTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTabsComponent, UiTabPanelComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    activeIndex: {
      control: { type: 'number' },
      description: 'Active tab index',
    },
  },
};

export default meta;
type Story = StoryObj<UiTabsComponent>;

export const Basic: Story = {
  render: () => ({
    template: `
      <ui-tabs>
        <ui-tab-panel header="Tab 1">
          <p class="text-gray-600 dark:text-gray-400">Content of Tab 1</p>
        </ui-tab-panel>
        <ui-tab-panel header="Tab 2">
          <p class="text-gray-600 dark:text-gray-400">Content of Tab 2</p>
        </ui-tab-panel>
        <ui-tab-panel header="Tab 3">
          <p class="text-gray-600 dark:text-gray-400">Content of Tab 3</p>
        </ui-tab-panel>
      </ui-tabs>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      homeIcon: Home,
      userIcon: User,
      settingsIcon: Settings,
    },
    template: `
      <ui-tabs>
        <ui-tab-panel header="Home" [leftIcon]="homeIcon">
          <p class="text-gray-600 dark:text-gray-400">Welcome to the home tab!</p>
        </ui-tab-panel>
        <ui-tab-panel header="Profile" [leftIcon]="userIcon">
          <p class="text-gray-600 dark:text-gray-400">User profile content goes here.</p>
        </ui-tab-panel>
        <ui-tab-panel header="Settings" [leftIcon]="settingsIcon">
          <p class="text-gray-600 dark:text-gray-400">Application settings.</p>
        </ui-tab-panel>
      </ui-tabs>
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    template: `
      <ui-tabs>
        <ui-tab-panel header="Active Tab">
          <p class="text-gray-600 dark:text-gray-400">This tab is active.</p>
        </ui-tab-panel>
        <ui-tab-panel header="Disabled Tab" [disabled]="true">
          <p class="text-gray-600 dark:text-gray-400">This content is hidden.</p>
        </ui-tab-panel>
        <ui-tab-panel header="Another Tab">
          <p class="text-gray-600 dark:text-gray-400">This tab is also active.</p>
        </ui-tab-panel>
      </ui-tabs>
    `,
  }),
};

export const SettingsPage: Story = {
  render: () => ({
    props: {
      userIcon: User,
      bellIcon: Bell,
      settingsIcon: Settings,
    },
    template: `
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg">
        <ui-tabs>
          <ui-tab-panel header="Profile" [leftIcon]="userIcon">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" value="John Doe" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input type="email" value="john&#64;example.com" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
              </div>
            </div>
          </ui-tab-panel>
          <ui-tab-panel header="Notifications" [leftIcon]="bellIcon">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span>Email notifications</span>
                <input type="checkbox" checked />
              </div>
              <div class="flex items-center justify-between">
                <span>Push notifications</span>
                <input type="checkbox" />
              </div>
              <div class="flex items-center justify-between">
                <span>SMS notifications</span>
                <input type="checkbox" />
              </div>
            </div>
          </ui-tab-panel>
          <ui-tab-panel header="Security" [leftIcon]="settingsIcon">
            <div class="space-y-4">
              <button class="px-4 py-2 bg-primary-500 text-white rounded-lg">
                Change Password
              </button>
              <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                Enable 2FA
              </button>
            </div>
          </ui-tab-panel>
        </ui-tabs>
      </div>
    `,
  }),
};
