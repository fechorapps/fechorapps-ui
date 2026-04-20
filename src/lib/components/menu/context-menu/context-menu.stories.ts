import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Edit, Copy, Trash, FileText, FolderOpen, Download, Share, Eye } from 'lucide-angular';

import { UiContextMenuComponent, ContextMenuItem } from './context-menu.component';

const meta: Meta<UiContextMenuComponent> = {
  title: 'Menu/ContextMenu',
  component: UiContextMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [UiContextMenuComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiContextMenuComponent>;

const basicItems: ContextMenuItem[] = [
  { label: 'View', icon: Eye },
  { label: 'Edit', icon: Edit },
  { label: 'Copy', icon: Copy },
  { separator: true },
  { label: 'Delete', icon: Trash },
];

export const Default: Story = {
  render: () => ({
    props: {
      items: basicItems,
    },
    template: `
      <div class="p-8">
        <div
          id="context-target"
          class="p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center text-gray-500 dark:text-gray-400"
        >
          Right-click here to open context menu
        </div>
        <ui-context-menu [model]="items" target="#context-target" />
      </div>
    `,
  }),
};

export const WithSubmenus: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Open', icon: FolderOpen },
        { label: 'Download', icon: Download },
        { separator: true },
        {
          label: 'Share',
          icon: Share,
          items: [{ label: 'Email' }, { label: 'Link' }, { label: 'Social Media' }],
        },
        {
          label: 'Export',
          items: [{ label: 'PDF' }, { label: 'Word' }, { label: 'Excel' }],
        },
        { separator: true },
        { label: 'Delete', icon: Trash },
      ] as ContextMenuItem[],
    },
    template: `
      <div class="p-8">
        <div
          id="submenu-target"
          class="p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center text-gray-500 dark:text-gray-400"
        >
          Right-click here (has submenus)
        </div>
        <ui-context-menu [model]="items" target="#submenu-target" />
      </div>
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'View', icon: Eye },
        { label: 'Edit', icon: Edit },
        { label: 'Copy', icon: Copy, disabled: true },
        { separator: true },
        { label: 'Delete', icon: Trash, disabled: true },
      ] as ContextMenuItem[],
    },
    template: `
      <div class="p-8">
        <div
          id="disabled-target"
          class="p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center text-gray-500 dark:text-gray-400"
        >
          Right-click here (some items disabled)
        </div>
        <ui-context-menu [model]="items" target="#disabled-target" />
      </div>
    `,
  }),
};

export const FileManager: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Open', icon: FolderOpen },
        { label: 'Open With...' },
        { separator: true },
        { label: 'Cut', icon: Edit },
        { label: 'Copy', icon: Copy },
        { label: 'Paste', disabled: true },
        { separator: true },
        { label: 'Rename' },
        { label: 'Delete', icon: Trash },
        { separator: true },
        { label: 'Properties' },
      ] as ContextMenuItem[],
      files: [
        { name: 'Documents', type: 'folder' },
        { name: 'report.pdf', type: 'file' },
        { name: 'image.png', type: 'file' },
      ],
    },
    template: `
      <div class="p-4">
        <div id="file-manager" class="space-y-1">
          @for (file of files; track file.name) {
            <div class="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
              <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                {{ file.type === 'folder' ? '📁' : '📄' }}
              </div>
              <span class="text-gray-700 dark:text-gray-300">{{ file.name }}</span>
            </div>
          }
        </div>
        <ui-context-menu [model]="items" target="#file-manager" />
      </div>
    `,
  }),
};

export const TableRow: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'View Details', icon: Eye },
        { label: 'Edit', icon: Edit },
        { separator: true },
        { label: 'Duplicate', icon: Copy },
        { label: 'Delete', icon: Trash },
      ] as ContextMenuItem[],
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com' },
      ],
    },
    template: `
      <div class="p-4">
        <table id="users-table" class="w-full">
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-800">
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            @for (user of users; track user.id) {
              <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-3">{{ user.name }}</td>
                <td class="p-3">{{ user.email }}</td>
              </tr>
            }
          </tbody>
        </table>
        <ui-context-menu [model]="items" target="#users-table" />
        <p class="mt-4 text-sm text-gray-500">Right-click any row for options</p>
      </div>
    `,
  }),
};
