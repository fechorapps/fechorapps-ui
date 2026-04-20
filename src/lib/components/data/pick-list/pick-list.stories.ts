import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiPickListComponent } from './pick-list.component';

interface Product {
  id: number;
  name: string;
  category: string;
}

const availableProducts: Product[] = [
  { id: 1, name: 'Bamboo Watch', category: 'Accessories' },
  { id: 2, name: 'Black Watch', category: 'Accessories' },
  { id: 3, name: 'Blue Band', category: 'Fitness' },
  { id: 4, name: 'Blue T-Shirt', category: 'Clothing' },
  { id: 5, name: 'Bracelet', category: 'Accessories' },
];

const selectedProducts: Product[] = [
  { id: 6, name: 'Brown Purse', category: 'Accessories' },
  { id: 7, name: 'Chakra Bracelet', category: 'Accessories' },
];

const meta: Meta<UiPickListComponent<Product>> = {
  title: 'Data/PickList',
  component: UiPickListComponent,
  decorators: [
    moduleMetadata({
      imports: [UiPickListComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    sourceHeader: {
      control: { type: 'text' },
      description: 'Source list header',
      table: { category: 'Content' },
    },
    targetHeader: {
      control: { type: 'text' },
      description: 'Target list header',
      table: { category: 'Content' },
    },
    filter: {
      control: { type: 'boolean' },
      description: 'Enable filtering',
      table: { category: 'Features' },
    },
    showSourceControls: {
      control: { type: 'boolean' },
      description: 'Show reorder controls for source',
      table: { category: 'Features' },
    },
    showTargetControls: {
      control: { type: 'boolean' },
      description: 'Show reorder controls for target',
      table: { category: 'Features' },
    },
    listHeight: {
      control: { type: 'text' },
      description: 'List height',
      table: { category: 'Appearance' },
    },
    responsive: {
      control: { type: 'boolean' },
      description: 'Enable responsive layout',
      table: { category: 'Layout' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<UiPickListComponent<Product>>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      source: [...availableProducts],
      target: [...selectedProducts],
    },
    template: `
      <ui-pick-list
        [(source)]="source"
        [(target)]="target"
        [sourceHeader]="sourceHeader"
        [targetHeader]="targetHeader"
      >
        <ng-template #item let-product>
          <div>
            <div class="font-medium text-gray-900 dark:text-gray-100">{{ product.name }}</div>
            <div class="text-sm text-gray-500">{{ product.category }}</div>
          </div>
        </ng-template>
      </ui-pick-list>
    `,
  }),
  args: {
    sourceHeader: 'Available',
    targetHeader: 'Selected',
  },
};

export const WithFilter: Story = {
  render: (args) => ({
    props: {
      ...args,
      source: [...availableProducts],
      target: [...selectedProducts],
    },
    template: `
      <ui-pick-list
        [(source)]="source"
        [(target)]="target"
        sourceHeader="Available Products"
        targetHeader="Selected Products"
        [filter]="true"
        filterBy="name"
        sourceFilterPlaceholder="Search available..."
        targetFilterPlaceholder="Search selected..."
      >
        <ng-template #item let-product>
          <div>
            <div class="font-medium text-gray-900 dark:text-gray-100">{{ product.name }}</div>
            <div class="text-sm text-gray-500">{{ product.category }}</div>
          </div>
        </ng-template>
      </ui-pick-list>
    `,
  }),
  args: {},
};

export const WithReorderControls: Story = {
  render: (args) => ({
    props: {
      ...args,
      source: [...availableProducts],
      target: [...selectedProducts],
    },
    template: `
      <ui-pick-list
        [(source)]="source"
        [(target)]="target"
        sourceHeader="Available"
        targetHeader="Selected"
        [showSourceControls]="true"
        [showTargetControls]="true"
      >
        <ng-template #item let-product>
          <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
        </ng-template>
      </ui-pick-list>
    `,
  }),
  args: {},
};

export const SimpleStrings: Story = {
  render: (args) => ({
    props: {
      ...args,
      source: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
      target: ['Fig', 'Grape'],
    },
    template: `
      <ui-pick-list
        [(source)]="source"
        [(target)]="target"
        sourceHeader="Fruits Available"
        targetHeader="Fruits Selected"
        [filter]="true"
      />
    `,
  }),
  args: {},
};

export const PermissionsManager: Story = {
  render: (args) => ({
    props: {
      ...args,
      availablePermissions: [
        { id: 1, name: 'users:read', description: 'View users' },
        { id: 2, name: 'users:write', description: 'Create/edit users' },
        { id: 3, name: 'users:delete', description: 'Delete users' },
        { id: 4, name: 'posts:read', description: 'View posts' },
        { id: 5, name: 'posts:write', description: 'Create/edit posts' },
        { id: 6, name: 'posts:delete', description: 'Delete posts' },
        { id: 7, name: 'settings:read', description: 'View settings' },
        { id: 8, name: 'settings:write', description: 'Modify settings' },
      ],
      assignedPermissions: [{ id: 9, name: 'dashboard:view', description: 'Access dashboard' }],
    },
    template: `
      <div class="space-y-2">
        <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">Role Permissions</h2>
        <p class="text-sm text-gray-500">Assign permissions to the "Editor" role</p>

        <ui-pick-list
          [(source)]="availablePermissions"
          [(target)]="assignedPermissions"
          sourceHeader="Available Permissions"
          targetHeader="Assigned Permissions"
          [filter]="true"
          filterBy="name"
          [showTargetControls]="true"
          listHeight="300px"
        >
          <ng-template #item let-permission>
            <div>
              <div class="font-mono text-sm text-gray-900 dark:text-gray-100">
                {{ permission.name }}
              </div>
              <div class="text-xs text-gray-500">
                {{ permission.description }}
              </div>
            </div>
          </ng-template>
        </ui-pick-list>
      </div>
    `,
  }),
  args: {},
};

export const TeamBuilder: Story = {
  render: (args) => ({
    props: {
      ...args,
      availableMembers: [
        { id: 1, name: 'Alice Johnson', role: 'Developer', avatar: 'AJ' },
        { id: 2, name: 'Bob Smith', role: 'Designer', avatar: 'BS' },
        { id: 3, name: 'Carol White', role: 'PM', avatar: 'CW' },
        { id: 4, name: 'David Brown', role: 'Developer', avatar: 'DB' },
        { id: 5, name: 'Eva Garcia', role: 'QA', avatar: 'EG' },
      ],
      teamMembers: [{ id: 6, name: 'Frank Lee', role: 'Tech Lead', avatar: 'FL' }],
    },
    template: `
      <ui-pick-list
        [(source)]="availableMembers"
        [(target)]="teamMembers"
        sourceHeader="Available Team Members"
        targetHeader="Project Team"
        [filter]="true"
        filterBy="name"
        listHeight="280px"
      >
        <ng-template #item let-member>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-medium">
              {{ member.avatar }}
            </div>
            <div>
              <div class="font-medium text-gray-900 dark:text-gray-100">{{ member.name }}</div>
              <div class="text-xs text-gray-500">{{ member.role }}</div>
            </div>
          </div>
        </ng-template>
      </ui-pick-list>
    `,
  }),
  args: {},
};

export const CustomHeaders: Story = {
  render: (args) => ({
    props: {
      ...args,
      source: [...availableProducts],
      target: [...selectedProducts],
    },
    template: `
      <ui-pick-list
        [(source)]="source"
        [(target)]="target"
        [filter]="true"
        filterBy="name"
      >
        <ng-template #sourceHeader>
          <div class="flex items-center gap-2">
            <span class="text-2xl">📦</span>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-gray-100">Inventory</h3>
              <p class="text-xs text-gray-500">Available items</p>
            </div>
          </div>
        </ng-template>
        <ng-template #targetHeader>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🛒</span>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-gray-100">Cart</h3>
              <p class="text-xs text-gray-500">Items to order</p>
            </div>
          </div>
        </ng-template>
        <ng-template #item let-product>
          <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
        </ng-template>
      </ui-pick-list>
    `,
  }),
  args: {},
};

export const Disabled: Story = {
  render: (args) => ({
    props: {
      ...args,
      source: [...availableProducts],
      target: [...selectedProducts],
    },
    template: `
      <ui-pick-list
        [(source)]="source"
        [(target)]="target"
        sourceHeader="Available (Disabled)"
        targetHeader="Selected (Disabled)"
        [disabled]="true"
      >
        <ng-template #item let-product>
          <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
        </ng-template>
      </ui-pick-list>
    `,
  }),
  args: {},
};
