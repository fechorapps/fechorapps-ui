import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiDrawerComponent } from './drawer.component';

const meta: Meta<UiDrawerComponent> = {
  title: 'Overlay/Drawer',
  component: UiDrawerComponent,
  decorators: [
    moduleMetadata({
      imports: [UiDrawerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer position',
      table: { category: 'Position' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Drawer size',
      table: { category: 'Size' },
    },
    modal: {
      control: { type: 'boolean' },
      description: 'Show modal backdrop',
      table: { category: 'Behavior' },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Allow closing',
      table: { category: 'Behavior' },
    },
    dismissableMask: {
      control: { type: 'boolean' },
      description: 'Close on backdrop click',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiDrawerComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Drawer Title">
        <p class="text-gray-600 dark:text-gray-300">
          This is the drawer content. You can put any content here.
        </p>
      </ui-drawer>
    `,
  }),
};

export const LeftPosition: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Left Drawer" position="left">
        <p class="text-gray-600 dark:text-gray-300">
          This drawer slides in from the left side.
        </p>
      </ui-drawer>
    `,
  }),
};

export const TopPosition: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Top Drawer" position="top" size="md">
        <p class="text-gray-600 dark:text-gray-300">
          This drawer slides in from the top.
        </p>
      </ui-drawer>
    `,
  }),
};

export const BottomPosition: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Bottom Drawer" position="bottom" size="md">
        <p class="text-gray-600 dark:text-gray-300">
          This drawer slides in from the bottom.
        </p>
      </ui-drawer>
    `,
  }),
};

export const SmallSize: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Small Drawer" size="sm">
        <p class="text-gray-600 dark:text-gray-300">
          A small drawer for compact content.
        </p>
      </ui-drawer>
    `,
  }),
};

export const LargeSize: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Large Drawer" size="lg">
        <p class="text-gray-600 dark:text-gray-300">
          A larger drawer for more content.
        </p>
      </ui-drawer>
    `,
  }),
};

export const FullSize: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Full Size Drawer" size="full">
        <p class="text-gray-600 dark:text-gray-300">
          A full-width drawer that takes the entire side.
        </p>
      </ui-drawer>
    `,
  }),
};

export const WithFooter: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Edit Profile">
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value="John Doe"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value="john@example.com"
            />
          </div>
        </form>

        <ng-template #footer>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              (click)="visible = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="px-4 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-lg"
            >
              Save
            </button>
          </div>
        </ng-template>
      </ui-drawer>
    `,
  }),
};

export const DismissableMask: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer
        [(visible)]="visible"
        header="Click Outside to Close"
        [dismissableMask]="true"
      >
        <p class="text-gray-600 dark:text-gray-300">
          Click the backdrop to close this drawer.
        </p>
      </ui-drawer>
    `,
  }),
};

export const NonModal: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          This content is visible behind the drawer.
        </p>
        <button class="px-4 py-2 bg-primary-500 text-white rounded-lg">
          Clickable Button
        </button>
      </div>

      <ui-drawer
        [(visible)]="visible"
        header="Non-Modal Drawer"
        [modal]="false"
        size="sm"
      >
        <p class="text-gray-600 dark:text-gray-300">
          This drawer doesn't block the content behind it.
        </p>
      </ui-drawer>
    `,
  }),
};

export const NavigationDrawer: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
      menuItems: [
        { icon: 'home', label: 'Home' },
        { icon: 'user', label: 'Profile' },
        { icon: 'settings', label: 'Settings' },
        { icon: 'help-circle', label: 'Help' },
      ],
    },
    template: `
      <ui-drawer [(visible)]="visible" header="Menu" position="left">
        <nav class="space-y-1">
          @for (item of menuItems; track item.label) {
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>
      </ui-drawer>
    `,
  }),
};

export const CustomHeader: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-drawer [(visible)]="visible">
        <ng-template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-900 dark:text-gray-100">John Doe</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
            </div>
          </div>
        </ng-template>

        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-300">User profile content goes here.</p>
        </div>
      </ui-drawer>
    `,
  }),
};
