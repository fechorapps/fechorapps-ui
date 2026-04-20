import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  FileText,
  Edit,
  Copy,
  Trash,
  Settings,
  User,
  Bell,
  Mail,
  HelpCircle,
  LogOut,
  Plus,
  FolderOpen,
} from 'lucide-angular';

import { UiTieredMenuComponent, TieredMenuItem } from './tiered-menu.component';

const meta: Meta<UiTieredMenuComponent> = {
  title: 'Menu/TieredMenu',
  component: UiTieredMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTieredMenuComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiTieredMenuComponent>;

const basicItems: TieredMenuItem[] = [
  {
    label: 'File',
    icon: FileText,
    items: [
      { label: 'New', icon: Plus },
      { label: 'Open', icon: FolderOpen },
      { separator: true },
      { label: 'Save' },
      { label: 'Save As...' },
    ],
  },
  {
    label: 'Edit',
    icon: Edit,
    items: [
      { label: 'Cut' },
      { label: 'Copy', icon: Copy },
      { label: 'Paste' },
      { separator: true },
      { label: 'Delete', icon: Trash },
    ],
  },
  { label: 'Settings', icon: Settings },
];

export const Default: Story = {
  args: {
    model: basicItems,
  },
};

export const NestedSubmenus: Story = {
  args: {
    model: [
      {
        label: 'File',
        icon: FileText,
        items: [
          { label: 'New', icon: Plus },
          {
            label: 'Open Recent',
            items: [
              { label: 'Project A' },
              { label: 'Project B' },
              { label: 'Project C' },
              { separator: true },
              { label: 'Clear Recent' },
            ],
          },
          { separator: true },
          {
            label: 'Export',
            items: [
              { label: 'PDF' },
              { label: 'Word' },
              {
                label: 'Image',
                items: [{ label: 'PNG' }, { label: 'JPG' }, { label: 'SVG' }],
              },
            ],
          },
        ],
      },
      {
        label: 'Edit',
        icon: Edit,
        items: [
          { label: 'Undo' },
          { label: 'Redo' },
          { separator: true },
          { label: 'Cut' },
          { label: 'Copy' },
          { label: 'Paste' },
        ],
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    model: [
      { label: 'Active Item', icon: FileText },
      { label: 'Disabled Item', icon: Edit, disabled: true },
      {
        label: 'Submenu',
        items: [
          { label: 'Sub Item 1' },
          { label: 'Disabled Sub', disabled: true },
          { label: 'Sub Item 3' },
        ],
      },
    ],
  },
};

export const UserMenu: Story = {
  args: {
    model: [
      { label: 'Profile', icon: User },
      { label: 'Settings', icon: Settings },
      {
        label: 'Notifications',
        icon: Bell,
        items: [
          { label: 'All Notifications' },
          { label: 'Mentions' },
          { label: 'Direct Messages' },
          { separator: true },
          { label: 'Notification Settings' },
        ],
      },
      { separator: true },
      { label: 'Help', icon: HelpCircle },
      { label: 'Logout', icon: LogOut },
    ],
  },
};

export const ApplicationMenu: Story = {
  args: {
    model: [
      {
        label: 'File',
        items: [
          { label: 'New Project', icon: Plus },
          { label: 'Open Project', icon: FolderOpen },
          {
            label: 'Open Recent',
            items: [
              { label: 'website-redesign.prj' },
              { label: 'mobile-app.prj' },
              { label: 'dashboard.prj' },
            ],
          },
          { separator: true },
          { label: 'Save' },
          { label: 'Save As...' },
          { separator: true },
          { label: 'Exit' },
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
          { label: 'Actual Size' },
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
    ],
  },
};

export const WithIcons: Story = {
  args: {
    model: [
      { label: 'New File', icon: Plus },
      { label: 'Open', icon: FolderOpen },
      { label: 'Save', icon: FileText },
      { separator: true },
      { label: 'Edit', icon: Edit },
      { label: 'Copy', icon: Copy },
      { label: 'Delete', icon: Trash },
    ],
  },
};
