import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiOrganizationChartComponent, OrgChartNode } from './organization-chart.component';

const companyOrg: OrgChartNode = {
  label: 'CEO',
  type: 'Executive',
  expanded: true,
  children: [
    {
      label: 'CTO',
      type: 'Executive',
      expanded: true,
      children: [
        {
          label: 'Engineering Manager',
          type: 'Manager',
          children: [
            { label: 'Senior Developer', type: 'Employee' },
            { label: 'Developer', type: 'Employee' },
            { label: 'Junior Developer', type: 'Employee' },
          ],
        },
        {
          label: 'QA Manager',
          type: 'Manager',
          children: [
            { label: 'QA Lead', type: 'Employee' },
            { label: 'QA Engineer', type: 'Employee' },
          ],
        },
      ],
    },
    {
      label: 'CFO',
      type: 'Executive',
      children: [
        {
          label: 'Finance Manager',
          type: 'Manager',
          children: [
            { label: 'Accountant', type: 'Employee' },
            { label: 'Financial Analyst', type: 'Employee' },
          ],
        },
      ],
    },
    {
      label: 'CMO',
      type: 'Executive',
      children: [
        {
          label: 'Marketing Manager',
          type: 'Manager',
          children: [
            { label: 'Content Writer', type: 'Employee' },
            { label: 'SEO Specialist', type: 'Employee' },
            { label: 'Social Media Manager', type: 'Employee' },
          ],
        },
      ],
    },
  ],
};

const meta: Meta<UiOrganizationChartComponent> = {
  title: 'Data/OrganizationChart',
  component: UiOrganizationChartComponent,
  decorators: [
    moduleMetadata({
      imports: [UiOrganizationChartComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    selectionMode: {
      control: { type: 'select' },
      options: [null, 'single', 'multiple'],
      description: 'Selection mode',
      table: { category: 'Selection' },
    },
    preserveSpace: {
      control: { type: 'boolean' },
      description: 'Preserve space when collapsing',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiOrganizationChartComponent>;

export const Default: Story = {
  args: {
    value: companyOrg,
  },
};

export const SingleSelection: Story = {
  render: (args) => ({
    props: {
      ...args,
      org: companyOrg,
      selectedNode: null,
    },
    template: `
      <div class="space-y-4">
        <ui-organization-chart
          [value]="org"
          selectionMode="single"
          [(selection)]="selectedNode"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <strong>Selected:</strong>
          {{ selectedNode ? selectedNode.label + ' (' + selectedNode.type + ')' : 'None' }}
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
      org: companyOrg,
      selectedNodes: [],
    },
    template: `
      <div class="space-y-4">
        <p class="text-sm text-gray-500">Click nodes to select/deselect</p>

        <ui-organization-chart
          [value]="org"
          selectionMode="multiple"
          [(selection)]="selectedNodes"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <strong>Selected ({{ selectedNodes.length }}):</strong>
          <div class="flex flex-wrap gap-1 mt-2">
            @for (node of selectedNodes; track node.label) {
              <span class="px-2 py-1 bg-primary-100 text-primary-800 rounded text-sm">
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

export const CustomTemplate: Story = {
  render: (args) => ({
    props: {
      ...args,
      org: {
        label: 'John Smith',
        type: 'CEO',
        data: { avatar: 'JS', email: 'john@company.com' },
        expanded: true,
        children: [
          {
            label: 'Sarah Johnson',
            type: 'CTO',
            data: { avatar: 'SJ', email: 'sarah@company.com' },
            children: [
              {
                label: 'Mike Wilson',
                type: 'Dev Lead',
                data: { avatar: 'MW', email: 'mike@company.com' },
              },
              {
                label: 'Emma Davis',
                type: 'QA Lead',
                data: { avatar: 'ED', email: 'emma@company.com' },
              },
            ],
          },
          {
            label: 'Robert Brown',
            type: 'CFO',
            data: { avatar: 'RB', email: 'robert@company.com' },
          },
        ],
      },
    },
    template: `
      <ui-organization-chart [value]="org" selectionMode="single">
        <ng-template #node let-node let-selected="selected">
          <div class="flex items-center gap-3 min-w-[200px]">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              [class.bg-primary-600]="node.type === 'CEO'"
              [class.bg-blue-500]="node.type === 'CTO' || node.type === 'CFO'"
              [class.bg-green-500]="node.type !== 'CEO' && node.type !== 'CTO' && node.type !== 'CFO'"
            >
              {{ node.data?.avatar }}
            </div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-gray-100">
                {{ node.label }}
              </div>
              <div class="text-xs text-gray-500">{{ node.type }}</div>
              <div class="text-xs text-primary-500">{{ node.data?.email }}</div>
            </div>
          </div>
        </ng-template>
      </ui-organization-chart>
    `,
  }),
  args: {},
};

export const DepartmentChart: Story = {
  render: (args) => ({
    props: {
      ...args,
      org: {
        label: 'Company HQ',
        type: 'Headquarters',
        expanded: true,
        children: [
          {
            label: 'Engineering',
            type: 'Department',
            data: { headcount: 45, budget: '$2.5M' },
            expanded: true,
            children: [
              { label: 'Frontend Team', type: 'Team', data: { headcount: 12 } },
              { label: 'Backend Team', type: 'Team', data: { headcount: 15 } },
              { label: 'DevOps Team', type: 'Team', data: { headcount: 8 } },
              { label: 'QA Team', type: 'Team', data: { headcount: 10 } },
            ],
          },
          {
            label: 'Sales',
            type: 'Department',
            data: { headcount: 30, budget: '$1.8M' },
            children: [
              { label: 'Enterprise', type: 'Team', data: { headcount: 12 } },
              { label: 'SMB', type: 'Team', data: { headcount: 10 } },
              { label: 'Partners', type: 'Team', data: { headcount: 8 } },
            ],
          },
          {
            label: 'Marketing',
            type: 'Department',
            data: { headcount: 20, budget: '$1.2M' },
            children: [
              { label: 'Growth', type: 'Team', data: { headcount: 8 } },
              { label: 'Content', type: 'Team', data: { headcount: 7 } },
              { label: 'Brand', type: 'Team', data: { headcount: 5 } },
            ],
          },
        ],
      },
    },
    template: `
      <ui-organization-chart [value]="org">
        <ng-template #node let-node>
          <div class="text-center min-w-[120px]">
            <div
              class="text-xs font-medium uppercase tracking-wide mb-1"
              [class.text-primary-600]="node.type === 'Headquarters'"
              [class.text-blue-600]="node.type === 'Department'"
              [class.text-green-600]="node.type === 'Team'"
            >
              {{ node.type }}
            </div>
            <div class="font-semibold text-gray-900 dark:text-gray-100">
              {{ node.label }}
            </div>
            @if (node.data?.headcount) {
              <div class="text-xs text-gray-500 mt-1">
                {{ node.data.headcount }} people
              </div>
            }
            @if (node.data?.budget) {
              <div class="text-xs text-primary-500">
                {{ node.data.budget }}
              </div>
            }
          </div>
        </ng-template>
      </ui-organization-chart>
    `,
  }),
  args: {},
};

export const Simple: Story = {
  args: {
    value: {
      label: 'Root',
      children: [
        {
          label: 'Child 1',
          children: [{ label: 'Grandchild 1.1' }, { label: 'Grandchild 1.2' }],
        },
        { label: 'Child 2' },
        {
          label: 'Child 3',
          children: [{ label: 'Grandchild 3.1' }],
        },
      ],
    },
  },
};
