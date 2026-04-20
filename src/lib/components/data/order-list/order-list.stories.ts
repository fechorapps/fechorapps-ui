import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiOrderListComponent } from './order-list.component';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Bamboo Watch', category: 'Accessories', price: 65 },
  { id: 2, name: 'Black Watch', category: 'Accessories', price: 72 },
  { id: 3, name: 'Blue Band', category: 'Fitness', price: 79 },
  { id: 4, name: 'Blue T-Shirt', category: 'Clothing', price: 29 },
  { id: 5, name: 'Bracelet', category: 'Accessories', price: 15 },
  { id: 6, name: 'Brown Purse', category: 'Accessories', price: 120 },
  { id: 7, name: 'Chakra Bracelet', category: 'Accessories', price: 32 },
  { id: 8, name: 'Galaxy Earrings', category: 'Accessories', price: 34 },
];

const meta: Meta<UiOrderListComponent<Product>> = {
  title: 'Data/OrderList',
  component: UiOrderListComponent,
  decorators: [
    moduleMetadata({
      imports: [UiOrderListComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: { type: 'text' },
      description: 'Header text',
      table: { category: 'Content' },
    },
    dragDrop: {
      control: { type: 'boolean' },
      description: 'Enable drag and drop',
      table: { category: 'Features' },
    },
    filter: {
      control: { type: 'boolean' },
      description: 'Enable filtering',
      table: { category: 'Features' },
    },
    filterPlaceholder: {
      control: { type: 'text' },
      description: 'Filter input placeholder',
      table: { category: 'Features' },
    },
    controlsPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'none'],
      description: 'Position of control buttons',
      table: { category: 'Layout' },
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Striped rows',
      table: { category: 'Appearance' },
    },
    listHeight: {
      control: { type: 'text' },
      description: 'List height',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<UiOrderListComponent<Product>>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [...products],
    },
    template: `
      <ui-order-list
        [(value)]="products"
        [header]="header"
        [dragDrop]="dragDrop"
        [controlsPosition]="controlsPosition"
      >
        <ng-template #item let-product>
          <div class="flex items-center gap-3">
            <div>
              <div class="font-medium text-gray-900 dark:text-gray-100">{{ product.name }}</div>
              <div class="text-sm text-gray-500">{{ product.category }}</div>
            </div>
          </div>
        </ng-template>
      </ui-order-list>
    `,
  }),
  args: {
    header: 'Products',
    dragDrop: true,
    controlsPosition: 'left',
  },
};

export const WithFilter: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [...products],
    },
    template: `
      <ui-order-list
        [(value)]="products"
        header="Products"
        [filter]="true"
        filterBy="name"
        filterPlaceholder="Search products..."
        [dragDrop]="true"
      >
        <ng-template #item let-product>
          <div class="flex justify-between items-center w-full">
            <div>
              <div class="font-medium text-gray-900 dark:text-gray-100">{{ product.name }}</div>
              <div class="text-sm text-gray-500">{{ product.category }}</div>
            </div>
            <div class="text-primary-600 font-semibold">\${{ product.price }}</div>
          </div>
        </ng-template>
      </ui-order-list>
    `,
  }),
  args: {},
};

export const ControlsRight: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [...products],
    },
    template: `
      <ui-order-list
        [(value)]="products"
        header="Products"
        controlsPosition="right"
        [dragDrop]="true"
      >
        <ng-template #item let-product>
          <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
        </ng-template>
      </ui-order-list>
    `,
  }),
  args: {},
};

export const NoControls: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [...products],
    },
    template: `
      <ui-order-list
        [(value)]="products"
        header="Drag to Reorder"
        controlsPosition="none"
        [dragDrop]="true"
      >
        <ng-template #item let-product>
          <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
        </ng-template>
      </ui-order-list>
    `,
  }),
  args: {},
};

export const Striped: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [...products],
    },
    template: `
      <ui-order-list
        [(value)]="products"
        header="Products"
        [striped]="true"
        [dragDrop]="true"
      >
        <ng-template #item let-product>
          <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
        </ng-template>
      </ui-order-list>
    `,
  }),
  args: {},
};

export const CustomHeader: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [...products],
    },
    template: `
      <ui-order-list
        [(value)]="products"
        [dragDrop]="true"
      >
        <ng-template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100">Product List</h3>
            <span class="text-sm text-gray-500">{{ products.length }} items</span>
          </div>
        </ng-template>
        <ng-template #item let-product>
          <div class="flex justify-between items-center w-full">
            <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
            <span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {{ product.category }}
            </span>
          </div>
        </ng-template>
      </ui-order-list>
    `,
  }),
  args: {},
};

export const SimpleStrings: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
    },
    template: `
      <ui-order-list
        [(value)]="items"
        header="Fruits"
        [dragDrop]="true"
        [filter]="true"
        filterPlaceholder="Search fruits..."
      />
    `,
  }),
  args: {},
};

export const TaskPriority: Story = {
  render: (args) => ({
    props: {
      ...args,
      tasks: [
        { id: 1, title: 'Review PR #42', priority: 'high', status: 'pending' },
        { id: 2, title: 'Fix login bug', priority: 'critical', status: 'in-progress' },
        { id: 3, title: 'Update documentation', priority: 'low', status: 'pending' },
        { id: 4, title: 'Deploy to staging', priority: 'medium', status: 'pending' },
        { id: 5, title: 'Write unit tests', priority: 'medium', status: 'pending' },
      ],
      getPriorityColor(priority: string) {
        const colors: Record<string, string> = {
          critical: 'bg-red-100 text-red-800',
          high: 'bg-orange-100 text-orange-800',
          medium: 'bg-yellow-100 text-yellow-800',
          low: 'bg-green-100 text-green-800',
        };
        return colors[priority] || colors['medium'];
      },
    },
    template: `
      <div class="max-w-md">
        <ui-order-list
          [(value)]="tasks"
          header="Task Priority Queue"
          [dragDrop]="true"
          listHeight="400px"
        >
          <ng-template #item let-task>
            <div class="flex items-center justify-between w-full gap-2">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {{ task.title }}
                </div>
              </div>
              <span
                class="text-xs px-2 py-1 rounded-full shrink-0"
                [class]="getPriorityColor(task.priority)"
              >
                {{ task.priority }}
              </span>
            </div>
          </ng-template>
        </ui-order-list>
        <p class="mt-2 text-sm text-gray-500">
          Drag items to change priority order
        </p>
      </div>
    `,
  }),
  args: {},
};

export const Disabled: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [...products],
    },
    template: `
      <ui-order-list
        [(value)]="products"
        header="Products (Disabled)"
        [dragDrop]="true"
        [disabled]="true"
      >
        <ng-template #item let-product>
          <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
        </ng-template>
      </ui-order-list>
    `,
  }),
  args: {},
};
