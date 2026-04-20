import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiTreeComponent, TreeNode } from './tree.component';

const fileSystemNodes: TreeNode[] = [
  {
    key: '0',
    label: 'Documents',
    children: [
      {
        key: '0-0',
        label: 'Work',
        children: [
          { key: '0-0-0', label: 'Expenses.doc', leaf: true },
          { key: '0-0-1', label: 'Resume.doc', leaf: true },
        ],
      },
      {
        key: '0-1',
        label: 'Personal',
        children: [
          { key: '0-1-0', label: 'Vacation.jpg', leaf: true },
          { key: '0-1-1', label: 'Notes.txt', leaf: true },
        ],
      },
    ],
  },
  {
    key: '1',
    label: 'Pictures',
    children: [
      { key: '1-0', label: 'barcelona.jpg', leaf: true },
      { key: '1-1', label: 'logo.png', leaf: true },
      { key: '1-2', label: 'primeui.png', leaf: true },
    ],
  },
  {
    key: '2',
    label: 'Movies',
    children: [
      {
        key: '2-0',
        label: 'Al Pacino',
        children: [
          { key: '2-0-0', label: 'Scarface', leaf: true },
          { key: '2-0-1', label: 'Serpico', leaf: true },
        ],
      },
      {
        key: '2-1',
        label: 'Robert De Niro',
        children: [
          { key: '2-1-0', label: 'Goodfellas', leaf: true },
          { key: '2-1-1', label: 'Untouchables', leaf: true },
        ],
      },
    ],
  },
];

const permissionNodes: TreeNode[] = [
  {
    key: 'users',
    label: 'Users',
    children: [
      { key: 'users-read', label: 'Read', leaf: true },
      { key: 'users-write', label: 'Write', leaf: true },
      { key: 'users-delete', label: 'Delete', leaf: true },
    ],
  },
  {
    key: 'posts',
    label: 'Posts',
    children: [
      { key: 'posts-read', label: 'Read', leaf: true },
      { key: 'posts-write', label: 'Write', leaf: true },
      { key: 'posts-delete', label: 'Delete', leaf: true },
      { key: 'posts-publish', label: 'Publish', leaf: true },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    children: [
      { key: 'settings-view', label: 'View', leaf: true },
      { key: 'settings-modify', label: 'Modify', leaf: true },
    ],
  },
];

const meta: Meta<UiTreeComponent> = {
  title: 'Data/Tree',
  component: UiTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTreeComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'checkbox'],
      description: 'Selection mode',
      table: { category: 'Selection' },
    },
    filter: {
      control: { type: 'boolean' },
      description: 'Enable filtering',
      table: { category: 'Features' },
    },
    filterPlaceholder: {
      control: { type: 'text' },
      description: 'Filter placeholder',
      table: { category: 'Features' },
    },
    filterMode: {
      control: { type: 'select' },
      options: ['lenient', 'strict'],
      description: 'Filter mode',
      table: { category: 'Features' },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
      table: { category: 'State' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: { category: 'State' },
    },
    scrollHeight: {
      control: { type: 'text' },
      description: 'Scroll height',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<UiTreeComponent>;

export const Default: Story = {
  args: {
    value: fileSystemNodes,
    selectionMode: 'single',
  },
};

export const SingleSelection: Story = {
  render: (args) => ({
    props: {
      ...args,
      nodes: fileSystemNodes,
      selectedNode: null,
    },
    template: `
      <div class="space-y-4">
        <ui-tree
          [value]="nodes"
          selectionMode="single"
          [(selection)]="selectedNode"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <strong>Selected:</strong>
          {{ selectedNode ? selectedNode.label : 'None' }}
        </div>
      </div>
    `,
  }),
  args: {},
};

export const MultipleSelection: Story = {
  render: (args) => ({
    props: {
      ...args,
      nodes: fileSystemNodes,
      selectedNodes: [],
    },
    template: `
      <div class="space-y-4">
        <p class="text-sm text-gray-500">Hold Ctrl/Cmd to select multiple nodes</p>

        <ui-tree
          [value]="nodes"
          selectionMode="multiple"
          [(selection)]="selectedNodes"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <strong>Selected ({{ selectedNodes.length }}):</strong>
          {{ selectedNodes.length ? (selectedNodes | json) : 'None' }}
        </div>
      </div>
    `,
  }),
  args: {},
};

export const CheckboxSelection: Story = {
  render: (args) => ({
    props: {
      ...args,
      nodes: permissionNodes,
      selectedNodes: [],
    },
    template: `
      <div class="space-y-4">
        <h3 class="font-semibold text-gray-900 dark:text-gray-100">Select Permissions</h3>

        <ui-tree
          [value]="nodes"
          selectionMode="checkbox"
          [(selection)]="selectedNodes"
          [propagateSelectionDown]="true"
          [propagateSelectionUp]="true"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <strong>Selected Permissions ({{ selectedNodes.length }}):</strong>
          <div class="flex flex-wrap gap-1 mt-2">
            @for (node of selectedNodes; track node.key) {
              <span class="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                {{ node.label }}
              </span>
            }
          </div>
        </div>
      </div>
    `,
  }),
  args: {},
};

export const WithFilter: Story = {
  args: {
    value: fileSystemNodes,
    selectionMode: 'single',
    filter: true,
    filterPlaceholder: 'Search files...',
  },
};

export const FilterStrict: Story = {
  args: {
    value: fileSystemNodes,
    selectionMode: 'single',
    filter: true,
    filterMode: 'strict',
    filterPlaceholder: 'Strict search...',
  },
};

export const WithScrollHeight: Story = {
  args: {
    value: fileSystemNodes,
    selectionMode: 'checkbox',
    scrollHeight: '200px',
  },
};

export const Loading: Story = {
  args: {
    value: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    value: [],
  },
};

export const CustomTemplate: Story = {
  render: (args) => ({
    props: {
      ...args,
      nodes: [
        {
          key: 'team',
          label: 'Development Team',
          data: { type: 'team', count: 5 },
          children: [
            {
              key: 'alice',
              label: 'Alice Johnson',
              data: { role: 'Tech Lead', avatar: 'AJ' },
              leaf: true,
            },
            {
              key: 'bob',
              label: 'Bob Smith',
              data: { role: 'Senior Dev', avatar: 'BS' },
              leaf: true,
            },
            {
              key: 'carol',
              label: 'Carol White',
              data: { role: 'Developer', avatar: 'CW' },
              leaf: true,
            },
          ],
        },
        {
          key: 'design',
          label: 'Design Team',
          data: { type: 'team', count: 3 },
          children: [
            {
              key: 'david',
              label: 'David Brown',
              data: { role: 'Lead Designer', avatar: 'DB' },
              leaf: true,
            },
            {
              key: 'eva',
              label: 'Eva Garcia',
              data: { role: 'UX Designer', avatar: 'EG' },
              leaf: true,
            },
          ],
        },
      ],
    },
    template: `
      <ui-tree [value]="nodes" selectionMode="single">
        <ng-template #node let-node let-hasChildren="hasChildren">
          @if (hasChildren) {
            <div class="flex items-center gap-2">
              <span class="font-semibold text-gray-900 dark:text-gray-100">{{ node.label }}</span>
              <span class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {{ node.data.count }} members
              </span>
            </div>
          } @else {
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-medium">
                {{ node.data.avatar }}
              </div>
              <div>
                <div class="text-sm text-gray-900 dark:text-gray-100">{{ node.label }}</div>
                <div class="text-xs text-gray-500">{{ node.data.role }}</div>
              </div>
            </div>
          }
        </ng-template>
      </ui-tree>
    `,
  }),
  args: {},
};

export const Disabled: Story = {
  args: {
    value: fileSystemNodes,
    selectionMode: 'single',
    disabled: true,
  },
};

export const ExpandCollapseAll: Story = {
  render: (args) => ({
    props: {
      ...args,
      nodes: fileSystemNodes,
    },
    template: `
      <div class="space-y-4">
        <div class="flex gap-2">
          <button
            class="px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            (click)="tree.expandAll()"
          >
            Expand All
          </button>
          <button
            class="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            (click)="tree.collapseAll()"
          >
            Collapse All
          </button>
        </div>

        <ui-tree #tree [value]="nodes" selectionMode="single" />
      </div>
    `,
  }),
  args: {},
};
