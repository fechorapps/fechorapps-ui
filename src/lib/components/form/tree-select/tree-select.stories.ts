import type { Meta, StoryObj } from '@storybook/angular';

import { UiTreeSelectComponent, TreeNode } from './tree-select.component';

const fileSystemNodes: TreeNode[] = [
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'work',
        label: 'Work',
        children: [
          { key: 'reports', label: 'Reports' },
          { key: 'presentations', label: 'Presentations' },
          { key: 'spreadsheets', label: 'Spreadsheets' },
        ],
      },
      {
        key: 'personal',
        label: 'Personal',
        children: [
          { key: 'photos', label: 'Photos' },
          { key: 'videos', label: 'Videos' },
        ],
      },
    ],
  },
  {
    key: 'downloads',
    label: 'Downloads',
    children: [
      { key: 'software', label: 'Software' },
      { key: 'media', label: 'Media' },
    ],
  },
  {
    key: 'desktop',
    label: 'Desktop',
  },
];

const departmentNodes: TreeNode[] = [
  {
    key: 'engineering',
    label: 'Engineering',
    children: [
      {
        key: 'frontend',
        label: 'Frontend',
        children: [
          { key: 'react-team', label: 'React Team' },
          { key: 'angular-team', label: 'Angular Team' },
          { key: 'vue-team', label: 'Vue Team' },
        ],
      },
      {
        key: 'backend',
        label: 'Backend',
        children: [
          { key: 'api-team', label: 'API Team' },
          { key: 'database-team', label: 'Database Team' },
        ],
      },
      {
        key: 'devops',
        label: 'DevOps',
      },
    ],
  },
  {
    key: 'design',
    label: 'Design',
    children: [
      { key: 'ui-design', label: 'UI Design' },
      { key: 'ux-research', label: 'UX Research' },
    ],
  },
  {
    key: 'product',
    label: 'Product',
    children: [
      { key: 'product-managers', label: 'Product Managers' },
      { key: 'analysts', label: 'Analysts' },
    ],
  },
];

const permissionNodes: TreeNode[] = [
  {
    key: 'admin',
    label: 'Administrator',
    children: [
      { key: 'user-management', label: 'User Management' },
      { key: 'system-settings', label: 'System Settings' },
      { key: 'audit-logs', label: 'Audit Logs' },
    ],
  },
  {
    key: 'content',
    label: 'Content',
    children: [
      { key: 'create', label: 'Create' },
      { key: 'edit', label: 'Edit' },
      { key: 'delete', label: 'Delete' },
      { key: 'publish', label: 'Publish' },
    ],
  },
  {
    key: 'reports',
    label: 'Reports',
    children: [
      { key: 'view-reports', label: 'View Reports' },
      { key: 'export-reports', label: 'Export Reports' },
    ],
  },
];

const meta: Meta<UiTreeSelectComponent> = {
  title: 'Form/TreeSelect',
  component: UiTreeSelectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**TreeSelect** displays a hierarchical tree structure for selecting one or more nodes.

## API Reference

Based on [PrimeNG TreeSelect](https://primeng.org/treeselect)

### Features
- Hierarchical tree display
- Single, multiple, and checkbox selection modes
- Expandable/collapsible nodes
- Search/filter functionality
- Keyboard navigation

### TreeNode Interface
\`\`\`typescript
interface TreeNode {
  key: string;
  label: string;
  data?: unknown;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  selectable?: boolean;
}
\`\`\`

### Selection Modes
| Mode | Description | Value Type |
|------|-------------|------------|
| \`single\` | Select one node | \`string\` |
| \`multiple\` | Select multiple nodes | \`string[]\` |
| \`checkbox\` | Checkbox selection with parent/child logic | \`Record<string, boolean>\` |
        `,
      },
    },
  },
  argTypes: {
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple', 'checkbox'],
      description: 'Selection mode.',
      table: {
        type: { summary: 'TreeSelectSelectionMode' },
        defaultValue: { summary: 'single' },
        category: 'Configuration',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select' },
        category: 'Configuration',
      },
    },
    filter: {
      control: 'boolean',
      description: 'Show filter input.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Configuration',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiTreeSelectComponent>;

export const SingleSelection: Story = {
  args: {
    options: fileSystemNodes,
    selectionMode: 'single',
    placeholder: 'Select a folder',
    label: 'Folder',
  },
};

export const MultipleSelection: Story = {
  args: {
    options: departmentNodes,
    selectionMode: 'multiple',
    placeholder: 'Select departments',
    label: 'Departments',
  },
};

export const CheckboxSelection: Story = {
  args: {
    options: permissionNodes,
    selectionMode: 'checkbox',
    placeholder: 'Select permissions',
    label: 'Permissions',
  },
};

export const WithFilter: Story = {
  args: {
    options: departmentNodes,
    selectionMode: 'single',
    placeholder: 'Search and select',
    label: 'Team',
    filter: true,
    filterPlaceholder: 'Search teams...',
  },
};

export const Disabled: Story = {
  args: {
    options: fileSystemNodes,
    selectionMode: 'single',
    placeholder: 'Select a folder',
    label: 'Folder',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    options: fileSystemNodes,
    selectionMode: 'single',
    placeholder: 'Select a folder',
    label: 'Folder',
    invalid: true,
    helpText: 'Please select a folder',
  },
};

export const PermissionsForm: Story = {
  render: () => ({
    props: { permissionNodes },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Role Permissions</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Role Name</label>
            <input
              type="text"
              placeholder="e.g., Editor"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <ui-tree-select
            [options]="permissionNodes"
            selectionMode="checkbox"
            placeholder="Select permissions"
            label="Permissions"
            helpText="Select the permissions for this role"
          ></ui-tree-select>
          <button class="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Create Role
          </button>
        </div>
      </div>
    `,
  }),
};

export const FileExplorer: Story = {
  render: () => ({
    props: { fileSystemNodes },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Save File</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">File Name</label>
            <input
              type="text"
              placeholder="document.pdf"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <ui-tree-select
            [options]="fileSystemNodes"
            selectionMode="single"
            placeholder="Select destination"
            label="Save Location"
            [filter]="true"
          ></ui-tree-select>
          <div class="flex gap-2">
            <button class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button class="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};

export const TeamAssignment: Story = {
  render: () => ({
    props: { departmentNodes },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assign to Teams</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Select the teams that should have access to this project.
        </p>
        <ui-tree-select
          [options]="departmentNodes"
          selectionMode="checkbox"
          placeholder="Select teams"
          label="Teams"
          [filter]="true"
          filterPlaceholder="Search teams..."
        ></ui-tree-select>
      </div>
    `,
  }),
};
