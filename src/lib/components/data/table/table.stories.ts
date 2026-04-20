import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiTableComponent, TableColumn } from './table.component';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: string;
}

const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Home', 'Sports'][i % 4],
  price: Math.floor(Math.random() * 200) + 20,
  quantity: Math.floor(Math.random() * 100),
  status: ['In Stock', 'Low Stock', 'Out of Stock'][i % 3],
}));

const columns: TableColumn[] = [
  { field: 'id', header: 'ID', width: '80px', align: 'center' },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'category', header: 'Category', sortable: true },
  { field: 'price', header: 'Price', sortable: true, align: 'right' },
  { field: 'quantity', header: 'Quantity', sortable: true, align: 'center' },
  { field: 'status', header: 'Status' },
];

const meta: Meta<UiTableComponent<Product>> = {
  title: 'Data/Table',
  component: UiTableComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTableComponent],
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
    paginator: {
      control: { type: 'boolean' },
      description: 'Enable pagination',
      table: { category: 'Pagination' },
    },
    rows: {
      control: { type: 'number' },
      description: 'Rows per page',
      table: { category: 'Pagination' },
    },
    sortable: {
      control: { type: 'boolean' },
      description: 'Enable sorting',
      table: { category: 'Features' },
    },
    globalFilter: {
      control: { type: 'boolean' },
      description: 'Enable global filter',
      table: { category: 'Features' },
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Striped rows',
      table: { category: 'Appearance' },
    },
    showGridlines: {
      control: { type: 'boolean' },
      description: 'Show grid lines',
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
type Story = StoryObj<UiTableComponent<Product>>;

export const Default: Story = {
  args: {
    value: products.slice(0, 10),
    columns,
    sortable: true,
    rowHover: true,
  },
};

export const WithPagination: Story = {
  args: {
    value: products,
    columns,
    paginator: true,
    rows: 10,
    sortable: true,
    showCurrentPageReport: true,
  },
};

export const WithGlobalFilter: Story = {
  args: {
    value: products,
    columns,
    paginator: true,
    rows: 10,
    globalFilter: true,
    globalFilterPlaceholder: 'Search products...',
    globalFilterFields: ['name', 'category'],
  },
};

export const SingleSelection: Story = {
  render: (args) => ({
    props: {
      ...args,
      products,
      columns,
      selectedProduct: null,
    },
    template: `
      <div class="space-y-4">
        <ui-table
          [value]="products"
          [columns]="columns"
          selectionMode="single"
          [(selection)]="selectedProduct"
          dataKey="id"
          [paginator]="true"
          [rows]="5"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <strong>Selected:</strong>
          {{ selectedProduct ? selectedProduct.name : 'None' }}
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
      products,
      columns,
      selectedProducts: [],
    },
    template: `
      <div class="space-y-4">
        <ui-table
          [value]="products"
          [columns]="columns"
          selectionMode="multiple"
          [(selection)]="selectedProducts"
          dataKey="id"
          [paginator]="true"
          [rows]="5"
        />

        <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <strong>Selected ({{ selectedProducts.length }}):</strong>
          <span class="ml-2">
            {{ selectedProducts.length ? selectedProducts.map(p => p.name).join(', ') : 'None' }}
          </span>
        </div>
      </div>
    `,
  }),
  args: {},
};

export const Striped: Story = {
  args: {
    value: products.slice(0, 10),
    columns,
    striped: true,
    sortable: true,
  },
};

export const WithGridlines: Story = {
  args: {
    value: products.slice(0, 10),
    columns,
    showGridlines: true,
    sortable: true,
  },
};

export const SmallSize: Story = {
  args: {
    value: products.slice(0, 10),
    columns,
    size: 'sm',
    sortable: true,
  },
};

export const LargeSize: Story = {
  args: {
    value: products.slice(0, 10),
    columns,
    size: 'lg',
    sortable: true,
  },
};

export const ScrollableTable: Story = {
  args: {
    value: products,
    columns,
    scrollable: true,
    scrollHeight: '300px',
    sortable: true,
  },
};

export const Loading: Story = {
  args: {
    value: products.slice(0, 10),
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

export const CustomBodyTemplate: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: products.slice(0, 10),
      columns,
      getStatusClass(status: string) {
        const classes: Record<string, string> = {
          'In Stock': 'bg-green-100 text-green-800',
          'Low Stock': 'bg-yellow-100 text-yellow-800',
          'Out of Stock': 'bg-red-100 text-red-800',
        };
        return classes[status] || '';
      },
    },
    template: `
      <ui-table
        [value]="products"
        [columns]="columns"
        [sortable]="true"
      >
        <ng-template #body let-product let-columns="columns">
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-center">
            {{ product.id }}
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div class="font-medium text-gray-900 dark:text-gray-100">{{ product.name }}</div>
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ product.category }}</span>
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-right">
            <span class="font-semibold text-primary-600">\${{ product.price }}</span>
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-center">
            {{ product.quantity }}
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <span
              class="px-2 py-1 rounded-full text-xs font-medium"
              [class]="getStatusClass(product.status)"
            >
              {{ product.status }}
            </span>
          </td>
        </ng-template>
      </ui-table>
    `,
  }),
  args: {},
};

export const WithCaption: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: products.slice(0, 10),
      columns,
    },
    template: `
      <ui-table
        [value]="products"
        [columns]="columns"
        [sortable]="true"
      >
        <ng-template #caption>
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">Product Inventory</h2>
              <p class="text-sm text-gray-500">Manage your product catalog</p>
            </div>
            <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              Add Product
            </button>
          </div>
        </ng-template>
      </ui-table>
    `,
  }),
  args: {},
};

export const FullFeatured: Story = {
  render: (args) => ({
    props: {
      ...args,
      products,
      columns,
      selectedProducts: [],
      getStatusClass(status: string) {
        const classes: Record<string, string> = {
          'In Stock': 'bg-green-100 text-green-800',
          'Low Stock': 'bg-yellow-100 text-yellow-800',
          'Out of Stock': 'bg-red-100 text-red-800',
        };
        return classes[status] || '';
      },
    },
    template: `
      <ui-table
        [value]="products"
        [columns]="columns"
        [sortable]="true"
        [paginator]="true"
        [rows]="10"
        [globalFilter]="true"
        globalFilterPlaceholder="Search products..."
        [globalFilterFields]="['name', 'category', 'status']"
        selectionMode="multiple"
        [(selection)]="selectedProducts"
        dataKey="id"
        [striped]="true"
        [rowHover]="true"
      >
        <ng-template #caption>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">
              Products ({{ selectedProducts.length }} selected)
            </h2>
          </div>
        </ng-template>

        <ng-template #body let-product>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-center">
            {{ product.id }}
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            {{ product.name }}
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            {{ product.category }}
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-right">
            \${{ product.price }}
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-center">
            {{ product.quantity }}
          </td>
          <td class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <span
              class="px-2 py-1 rounded-full text-xs font-medium"
              [class]="getStatusClass(product.status)"
            >
              {{ product.status }}
            </span>
          </td>
        </ng-template>
      </ui-table>
    `,
  }),
  args: {},
};
