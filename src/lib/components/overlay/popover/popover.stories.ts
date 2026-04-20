import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiPopoverComponent } from './popover.component';

const meta: Meta<UiPopoverComponent> = {
  title: 'Overlay/Popover',
  component: UiPopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [UiPopoverComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'],
      description: 'Popover position',
      table: { category: 'Position' },
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover', 'focus'],
      description: 'Trigger type',
      table: { category: 'Behavior' },
    },
    showCloseIcon: {
      control: { type: 'boolean' },
      description: 'Show close icon',
      table: { category: 'Appearance' },
    },
    dismissable: {
      control: { type: 'boolean' },
      description: 'Close on outside click',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiPopoverComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover>
          <button trigger class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Click me
          </button>
          <div class="p-4 min-w-48">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Popover Title</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              This is the popover content.
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const TopPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover position="top">
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Top
          </button>
          <div class="p-4 min-w-48">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Popover on top
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const LeftPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover position="left">
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Left
          </button>
          <div class="p-4 min-w-48">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Popover on left
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const RightPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover position="right">
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Right
          </button>
          <div class="p-4 min-w-48">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Popover on right
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const HoverTrigger: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover trigger="hover">
          <button trigger class="px-4 py-2 bg-primary-500 text-white rounded-lg">
            Hover me
          </button>
          <div class="p-4 min-w-48">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              This popover appears on hover.
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const FocusTrigger: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover trigger="focus">
          <input
            trigger
            type="text"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600"
            placeholder="Focus me"
          />
          <div class="p-4 min-w-48">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Enter your username here.
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const WithCloseIcon: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover [showCloseIcon]="true">
          <button trigger class="px-4 py-2 bg-primary-500 text-white rounded-lg">
            Open
          </button>
          <div class="p-4 pr-8 min-w-48">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">With Close Icon</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Click the X to close.
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const UserProfile: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover trigger="hover" position="bottom">
          <div trigger class="flex items-center gap-2 cursor-pointer">
            <div class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-medium">
              JD
            </div>
          </div>
          <div class="p-4 min-w-64">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-medium">
                JD
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-gray-100">John Doe</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
              </div>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1">
              <a href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Profile
              </a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Settings
              </a>
              <a href="#" class="block px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                Sign Out
              </a>
            </div>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const ActionMenu: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover position="bottom">
          <button trigger class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          <div class="py-1 min-w-40">
            <button class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Edit
            </button>
            <button class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Duplicate
            </button>
            <button class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Archive
            </button>
            <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <button class="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              Delete
            </button>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const BottomStart: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover position="bottom-start">
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Bottom Start
          </button>
          <div class="p-4 min-w-64">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-1">Bottom Start</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              El panel se alinea al borde izquierdo del trigger. La flecha apunta al centro del trigger.
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const BottomEnd: Story = {
  render: () => ({
    template: `
      <div class="flex items-end justify-end p-32">
        <ui-popover position="bottom-end">
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Bottom End
          </button>
          <div class="p-4 min-w-64">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-1">Bottom End</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              El panel se alinea al borde derecho del trigger. La flecha apunta al centro del trigger.
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const TopStart: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover position="top-start">
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Top Start
          </button>
          <div class="p-4 min-w-64">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-1">Top Start</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              El panel aparece arriba alineado al borde izquierdo del trigger.
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const TopEnd: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-end p-32">
        <ui-popover position="top-end">
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Top End
          </button>
          <div class="p-4 min-w-64">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-1">Top End</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              El panel aparece arriba alineado al borde derecho del trigger.
            </p>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};

export const AutoFlip: Story = {
  render: () => ({
    template: `
      <div class="relative" style="height: 100vh; width: 100%;">
        <div class="absolute bottom-2 right-2">
          <ui-popover position="bottom-end" trigger="hover">
            <div trigger class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-medium cursor-pointer">
              JD
            </div>
            <div class="p-4 min-w-56">
              <p class="font-medium text-gray-900 dark:text-gray-100">John Doe</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">john@example.com</p>
              <div class="border-t border-gray-200 dark:border-gray-700 pt-2 space-y-1">
                <a href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Profile</a>
                <a href="#" class="block px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Sign Out</a>
              </div>
            </div>
          </ui-popover>
        </div>
        <p class="p-4 text-sm text-gray-500 dark:text-gray-400">
          El avatar está en la esquina inferior derecha. Aunque position="bottom-end", el auto-flip lo muestra arriba (top-end).
        </p>
      </div>
    `,
  }),
};

export const NotificationPanel: Story = {
  render: () => ({
    props: {
      notifications: [
        { title: 'New message', description: 'You have a new message from Sarah', time: '2m ago' },
        { title: 'Task completed', description: 'Your report is ready', time: '1h ago' },
        { title: 'Meeting reminder', description: 'Team standup in 15 minutes', time: '3h ago' },
      ],
    },
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-popover position="bottom" [showCloseIcon]="true">
          <button trigger class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div class="w-80">
            <div class="p-3 border-b border-gray-200 dark:border-gray-700">
              <h4 class="font-medium text-gray-900 dark:text-gray-100">Notifications</h4>
            </div>
            <div class="max-h-64 overflow-auto">
              @for (notification of notifications; track notification.title) {
                <div class="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-800">
                  <p class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ notification.title }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ notification.description }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ notification.time }}</p>
                </div>
              }
            </div>
            <div class="p-3 text-center">
              <a href="#" class="text-sm text-primary-500 hover:text-primary-600">View all notifications</a>
            </div>
          </div>
        </ui-popover>
      </div>
    `,
  }),
};
