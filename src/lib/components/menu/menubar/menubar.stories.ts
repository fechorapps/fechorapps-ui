import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  Home,
  User,
  Settings,
  FileText,
  Edit,
  Copy,
  Trash,
  HelpCircle,
  Info,
  LogOut,
  Plus,
} from 'lucide-angular';

import { UiMenubarComponent, MenubarItem } from './menubar.component';

const meta: Meta<UiMenubarComponent> = {
  title: 'Menu/Menubar',
  component: UiMenubarComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMenubarComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiMenubarComponent>;

const basicItems: MenubarItem[] = [
  { label: 'Home', icon: Home },
  {
    label: 'File',
    items: [
      { label: 'New', icon: Plus },
      { label: 'Open', icon: FileText },
      { separator: true },
      { label: 'Save' },
      { label: 'Save As...' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Cut', icon: Edit },
      { label: 'Copy', icon: Copy },
      { label: 'Paste' },
      { separator: true },
      { label: 'Delete', icon: Trash },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'Documentation', icon: FileText },
      { label: 'Support', icon: HelpCircle },
      { separator: true },
      { label: 'About', icon: Info },
    ],
  },
];

export const Default: Story = {
  args: {
    model: basicItems,
  },
};

export const SimpleMenu: Story = {
  args: {
    model: [
      { label: 'Home', icon: Home },
      { label: 'Profile', icon: User },
      { label: 'Settings', icon: Settings },
    ],
  },
};

export const WithStartContent: Story = {
  render: () => ({
    props: {
      items: basicItems,
    },
    template: `
      <ui-menubar [model]="items">
        <ng-template #start>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <span class="font-semibold text-gray-900 dark:text-gray-100">App</span>
          </div>
        </ng-template>
      </ui-menubar>
    `,
  }),
};

export const WithEndContent: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Home', icon: Home },
        { label: 'Products' },
        { label: 'Services' },
        { label: 'Contact' },
      ] as MenubarItem[],
    },
    template: `
      <ui-menubar [model]="items">
        <ng-template #end>
          <div class="flex items-center gap-2">
            <button class="px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              Sign In
            </button>
            <button class="px-4 py-1.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg">
              Sign Up
            </button>
          </div>
        </ng-template>
      </ui-menubar>
    `,
  }),
};

export const FullNavbar: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Dashboard', icon: Home },
        {
          label: 'Projects',
          items: [
            { label: 'All Projects' },
            { label: 'Active' },
            { label: 'Archived' },
            { separator: true },
            { label: 'Create New', icon: Plus },
          ],
        },
        {
          label: 'Team',
          items: [{ label: 'Members' }, { label: 'Roles' }, { label: 'Invite', icon: Plus }],
        },
        { label: 'Reports' },
      ] as MenubarItem[],
    },
    template: `
      <ui-menubar [model]="items">
        <ng-template #start>
          <div class="flex items-center gap-2 mr-4">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <span class="font-semibold text-gray-900 dark:text-gray-100">Acme Inc</span>
          </div>
        </ng-template>

        <ng-template #end>
          <div class="flex items-center gap-3">
            <button class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </ng-template>
      </ui-menubar>
    `,
  }),
};

export const WithDisabledItems: Story = {
  args: {
    model: [
      { label: 'Home', icon: Home },
      {
        label: 'File',
        items: [
          { label: 'New', icon: Plus },
          { label: 'Open', icon: FileText },
          { separator: true },
          { label: 'Save', disabled: true },
          { label: 'Save As...', disabled: true },
        ],
      },
      { label: 'Edit', disabled: true },
      { label: 'View' },
    ],
  },
};

export const ApplicationMenu: Story = {
  render: () => ({
    props: {
      items: [
        {
          label: 'File',
          items: [
            { label: 'New Project', icon: Plus },
            { label: 'Open Project', icon: FileText },
            { label: 'Open Recent' },
            { separator: true },
            { label: 'Save', icon: FileText },
            { label: 'Save As...' },
            { label: 'Export' },
            { separator: true },
            { label: 'Exit', icon: LogOut },
          ],
        },
        {
          label: 'Edit',
          items: [
            { label: 'Undo' },
            { label: 'Redo' },
            { separator: true },
            { label: 'Cut' },
            { label: 'Copy' },
            { label: 'Paste' },
            { separator: true },
            { label: 'Find' },
            { label: 'Replace' },
          ],
        },
        {
          label: 'View',
          items: [
            { label: 'Zoom In' },
            { label: 'Zoom Out' },
            { label: 'Reset Zoom' },
            { separator: true },
            { label: 'Full Screen' },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Documentation' },
            { label: 'Keyboard Shortcuts' },
            { separator: true },
            { label: 'About' },
          ],
        },
      ] as MenubarItem[],
    },
    template: `
      <ui-menubar [model]="items" styleClass="rounded-none border-x-0 border-t-0" />
    `,
  }),
};
