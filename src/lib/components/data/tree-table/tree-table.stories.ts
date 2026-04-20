import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiTreeTableComponent, TreeTableNode, TreeTableColumn } from './tree-table.component';

interface FileNode {
  name: string;
  size: string;
  type: string;
}

const fileNodes: TreeTableNode<FileNode>[] = [
  {
    data: { name: 'Documents', size: '75kb', type: 'Folder' },
    children: [
      {
        data: { name: 'Work', size: '55kb', type: 'Folder' },
        children: [
          { data: { name: 'report.pdf', size: '25kb', type: 'PDF' }, leaf: true },
          { data: { name: 'presentation.pptx', size: '30kb', type: 'PowerPoint' }, leaf: true },
        ],
      },
      {
        data: { name: 'Personal', size: '20kb', type: 'Folder' },
        children: [
          { data: { name: 'resume.docx', size: '10kb', type: 'Word' }, leaf: true },
          { data: { name: 'photo.jpg', size: '10kb', type: 'Image' }, leaf: true },
        ],
      },
    ],
  },
  {
    data: { name: 'Pictures', size: '150kb', type: 'Folder' },
    children: [
      { data: { name: 'vacation.jpg', size: '50kb', type: 'Image' }, leaf: true },
      { data: { name: 'family.png', size: '100kb', type: 'Image' }, leaf: true },
    ],
  },
  {
    data: { name: 'Downloads', size: '200kb', type: 'Folder' },
    children: [
      { data: { name: 'installer.exe', size: '150kb', type: 'Application' }, leaf: true },
      { data: { name: 'archive.zip', size: '50kb', type: 'Archive' }, leaf: true },
    ],
  },
];

const columns: TreeTableColumn[] = [
  { field: 'name', header: 'Name', expander: true },
  { field: 'size', header: 'Size', sortable: true, width: '120px', align: 'right' },
  { field: 'type', header: 'Type', sortable: true, width: '150px' },
];

const meta: Meta<UiTreeTableComponent<FileNode>> = {
  title: 'Data/TreeTable',
  component: UiTreeTableComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTreeTableComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    selectionMode: {
      control: { type: 'select' },
      options: [null, 'single', 'multiple', 'checkbox'],
      description: 'Selection mode',
      table: { category: 'Selection' },
    },
    sortable: {
      control: { type: 'boolean' },
      description: 'Enable sorting',
      table: { category: 'Features' },
    },
    scrollable: {
      control: { type: 'boolean' },
      description: 'Enable scrolling',
      table: { category: 'Features' },
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Striped rows',
      table: { category: 'Appearance' },
    },
    rowHover: {
      control: { type: 'boolean' },
      description: 'Row hover effect',
      table: { category: 'Appearance' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Table size',
      table: { category: 'Appearance' },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<UiTreeTableComponent<FileNode>>;

export const Default: Story = {
  args: {
    value: fileNodes,
    columns,
    sortable: true,
    rowHover: true,
  },
};

export const SingleSelection: Story = {
  render: (args) => ({
    props: {
      ...args,
      fileNodes,
      columns,
      selectedNode: null,
    },
    template: `
      <div class="space-y-4">
        <ui-tree-table
          [value]="fileNodes"
          [columns]="columns"
          selectionMode="single"
          [(selection)]="selectedNode"
          [sortable]="true"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <strong>Selected:</strong>
          {{ selectedNode ? selectedNode.data.name : 'None' }}
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
      fileNodes,
      columns,
      selectedNodes: [],
    },
    template: `
      <div class="space-y-4">
        <ui-tree-table
          [value]="fileNodes"
          [columns]="columns"
          selectionMode="multiple"
          [(selection)]="selectedNodes"
          [sortable]="true"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <strong>Selected ({{ selectedNodes.length }}):</strong>
          <span class="ml-2">
            {{ selectedNodes.length ? selectedNodes.map(n => n.data.name).join(', ') : 'None' }}
          </span>
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
      fileNodes,
      columns,
      selectedNodes: [],
    },
    template: `
      <div class="space-y-4">
        <ui-tree-table
          [value]="fileNodes"
          [columns]="columns"
          selectionMode="checkbox"
          [(selection)]="selectedNodes"
          [sortable]="true"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <strong>Selected ({{ selectedNodes.length }}):</strong>
          <span class="ml-2">
            {{ selectedNodes.length ? selectedNodes.map(n => n.data.name).join(', ') : 'None' }}
          </span>
        </div>
      </div>
    `,
  }),
  args: {},
};

export const Striped: Story = {
  args: {
    value: fileNodes,
    columns,
    striped: true,
    sortable: true,
  },
};

export const SmallSize: Story = {
  args: {
    value: fileNodes,
    columns,
    size: 'sm',
    sortable: true,
  },
};

export const LargeSize: Story = {
  args: {
    value: fileNodes,
    columns,
    size: 'lg',
    sortable: true,
  },
};

export const ScrollableTable: Story = {
  args: {
    value: fileNodes,
    columns,
    scrollable: true,
    scrollHeight: '200px',
    sortable: true,
  },
};

export const Loading: Story = {
  args: {
    value: fileNodes,
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    value: [],
    columns,
  },
};

export const PreExpanded: Story = {
  render: (args) => ({
    props: {
      ...args,
      expandedNodes: [
        {
          data: { name: 'Documents', size: '75kb', type: 'Folder' },
          expanded: true,
          children: [
            {
              data: { name: 'Work', size: '55kb', type: 'Folder' },
              expanded: true,
              children: [
                { data: { name: 'report.pdf', size: '25kb', type: 'PDF' }, leaf: true },
                {
                  data: { name: 'presentation.pptx', size: '30kb', type: 'PowerPoint' },
                  leaf: true,
                },
              ],
            },
            {
              data: { name: 'Personal', size: '20kb', type: 'Folder' },
              children: [
                { data: { name: 'resume.docx', size: '10kb', type: 'Word' }, leaf: true },
                { data: { name: 'photo.jpg', size: '10kb', type: 'Image' }, leaf: true },
              ],
            },
          ],
        },
        {
          data: { name: 'Pictures', size: '150kb', type: 'Folder' },
          children: [
            { data: { name: 'vacation.jpg', size: '50kb', type: 'Image' }, leaf: true },
            { data: { name: 'family.png', size: '100kb', type: 'Image' }, leaf: true },
          ],
        },
      ] as TreeTableNode<FileNode>[],
      columns,
    },
    template: `
      <ui-tree-table
        [value]="expandedNodes"
        [columns]="columns"
        [sortable]="true"
      />
    `,
  }),
  args: {},
};

export const CustomBodyTemplate: Story = {
  render: (args) => ({
    props: {
      ...args,
      fileNodes,
      columns,
      getTypeIcon(type: string) {
        const icons: Record<string, string> = {
          Folder: '📁',
          PDF: '📄',
          Word: '📝',
          PowerPoint: '📊',
          Image: '🖼️',
          Application: '⚙️',
          Archive: '📦',
        };
        return icons[type] || '📄';
      },
    },
    template: `
      <ui-tree-table
        [value]="fileNodes"
        [columns]="columns"
        [sortable]="true"
      >
        <ng-template #body let-node let-level="level" let-expanded="expanded" let-hasChildren="hasChildren">
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2" [style.paddingLeft.px]="level * 24">
              @if (hasChildren) {
                <button
                  type="button"
                  class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {{ expanded ? '▼' : '▶' }}
                </button>
              } @else {
                <span class="w-6"></span>
              }
              <span>{{ getTypeIcon(node.data.type) }}</span>
              <span class="font-medium">{{ node.data.name }}</span>
            </div>
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-right text-sm text-gray-500">
            {{ node.data.size }}
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <span class="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-800">
              {{ node.data.type }}
            </span>
          </td>
        </ng-template>
      </ui-tree-table>
    `,
  }),
  args: {},
};
