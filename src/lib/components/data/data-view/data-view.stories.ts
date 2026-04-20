import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiDataViewComponent } from './data-view.component';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  rating: number;
}

const products: Product[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Home', 'Sports'][i % 4],
  price: Math.floor(Math.random() * 200) + 20,
  status: i % 3 === 0 ? 'In Stock' : i % 3 === 1 ? 'Low Stock' : 'Out of Stock',
  rating: Math.floor(Math.random() * 5) + 1,
}));

const meta: Meta<UiDataViewComponent<Product>> = {
  title: 'Data/DataView',
  component: UiDataViewComponent,
  decorators: [
    moduleMetadata({
      imports: [UiDataViewComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['list', 'grid'],
      description: 'Current layout mode',
      table: { category: 'Layout' },
    },
    paginator: {
      control: { type: 'boolean' },
      description: 'Enable pagination',
      table: { category: 'Features' },
    },
    rows: {
      control: { type: 'number' },
      description: 'Rows per page',
      table: { category: 'Pagination' },
    },
    filter: {
      control: { type: 'boolean' },
      description: 'Enable filtering',
      table: { category: 'Features' },
    },
    gridColumns: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of grid columns',
      table: { category: 'Layout' },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
      table: { category: 'State' },
    },
    showLayoutSwitcher: {
      control: { type: 'boolean' },
      description: 'Show layout switcher buttons',
      table: { category: 'Layout' },
    },
  },
};

export default meta;
type Story = StoryObj<UiDataViewComponent<Product>>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      products,
    },
    template: `
      <ui-data-view
        [value]="products"
        [layout]="layout"
        [paginator]="paginator"
        [rows]="rows"
      >
        <ng-template #listItem let-product>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">{{ product.category }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-primary-600">\${{ product.price }}</p>
              <p class="text-xs text-gray-500">{{ product.status }}</p>
            </div>
          </div>
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {
    layout: 'list',
    paginator: true,
    rows: 5,
  },
};

export const GridLayout: Story = {
  render: (args) => ({
    props: {
      ...args,
      products,
    },
    template: `
      <ui-data-view
        [value]="products"
        layout="grid"
        [gridColumns]="gridColumns"
        [paginator]="true"
        [rows]="6"
      >
        <ng-template #gridItem let-product>
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
              <span class="text-4xl">📦</span>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ product.name }}</h3>
            <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
            <div class="flex items-center justify-between">
              <span class="font-bold text-primary-600">\${{ product.price }}</span>
              <span
                class="text-xs px-2 py-1 rounded-full"
                [class.bg-green-100]="product.status === 'In Stock'"
                [class.text-green-800]="product.status === 'In Stock'"
                [class.bg-yellow-100]="product.status === 'Low Stock'"
                [class.text-yellow-800]="product.status === 'Low Stock'"
                [class.bg-red-100]="product.status === 'Out of Stock'"
                [class.text-red-800]="product.status === 'Out of Stock'"
              >
                {{ product.status }}
              </span>
            </div>
          </div>
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {
    gridColumns: 3,
  },
};

export const WithFilter: Story = {
  render: (args) => ({
    props: {
      ...args,
      products,
    },
    template: `
      <ui-data-view
        [value]="products"
        [paginator]="true"
        [rows]="5"
        [filter]="true"
        filterBy="name"
        filterPlaceholder="Search products..."
      >
        <ng-template #listItem let-product>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">{{ product.category }}</p>
            </div>
            <span class="font-bold text-primary-600">\${{ product.price }}</span>
          </div>
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {},
};

export const WithRowsPerPageOptions: Story = {
  render: (args) => ({
    props: {
      ...args,
      products,
    },
    template: `
      <ui-data-view
        [value]="products"
        [paginator]="true"
        [rows]="5"
        [rowsPerPageOptions]="[5, 10, 20]"
      >
        <ng-template #listItem let-product>
          <div class="flex items-center justify-between">
            <span class="text-gray-900 dark:text-gray-100">{{ product.name }}</span>
            <span class="text-primary-600">\${{ product.price }}</span>
          </div>
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {},
};

export const Loading: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [],
    },
    template: `
      <ui-data-view [value]="products" [loading]="true">
        <ng-template #listItem let-product>
          {{ product.name }}
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {},
};

export const Empty: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [],
    },
    template: `
      <ui-data-view [value]="products" emptyMessage="No products found">
        <ng-template #listItem let-product>
          {{ product.name }}
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {},
};

export const CustomEmptyTemplate: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: [],
    },
    template: `
      <ui-data-view [value]="products">
        <ng-template #empty>
          <div class="text-center py-8">
            <span class="text-6xl mb-4 block">🛒</span>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No products yet
            </h3>
            <p class="text-gray-500 mb-4">Add some products to get started</p>
            <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              Add Product
            </button>
          </div>
        </ng-template>
        <ng-template #listItem let-product>
          {{ product.name }}
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {},
};

export const NoLayoutSwitcher: Story = {
  render: (args) => ({
    props: {
      ...args,
      products,
    },
    template: `
      <ui-data-view
        [value]="products"
        layout="grid"
        [gridColumns]="4"
        [showLayoutSwitcher]="false"
        [paginator]="true"
        [rows]="8"
      >
        <ng-template #gridItem let-product>
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center">
            <div class="text-2xl mb-2">📦</div>
            <p class="font-medium text-gray-900 dark:text-gray-100 text-sm">{{ product.name }}</p>
            <p class="text-primary-600 font-bold">\${{ product.price }}</p>
          </div>
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {},
};

export const ProductCatalog: Story = {
  render: (args) => ({
    props: {
      ...args,
      products,
      getStars(rating: number) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
      },
    },
    template: `
      <ui-data-view
        [value]="products"
        [paginator]="true"
        [rows]="6"
        [rowsPerPageOptions]="[6, 12, 24]"
        [filter]="true"
        filterBy="name"
        [gridColumns]="3"
      >
        <ng-template #listItem let-product>
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
              <span class="text-2xl">📦</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">{{ product.category }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-yellow-500 text-sm">{{ getStars(product.rating) }}</span>
                <span class="text-xs text-gray-400">({{ product.rating }}/5)</span>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-primary-600">\${{ product.price }}</p>
              <span
                class="text-xs px-2 py-1 rounded-full"
                [class.bg-green-100]="product.status === 'In Stock'"
                [class.text-green-800]="product.status === 'In Stock'"
                [class.bg-yellow-100]="product.status === 'Low Stock'"
                [class.text-yellow-800]="product.status === 'Low Stock'"
                [class.bg-red-100]="product.status === 'Out of Stock'"
                [class.text-red-800]="product.status === 'Out of Stock'"
              >
                {{ product.status }}
              </span>
            </div>
          </div>
        </ng-template>

        <ng-template #gridItem let-product>
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div class="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span class="text-5xl">📦</span>
            </div>
            <div class="p-4">
              <span class="text-xs text-gray-500 uppercase">{{ product.category }}</span>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100 mt-1">{{ product.name }}</h3>
              <div class="flex items-center gap-1 mt-2">
                <span class="text-yellow-500 text-sm">{{ getStars(product.rating) }}</span>
              </div>
              <div class="flex items-center justify-between mt-3">
                <span class="text-lg font-bold text-primary-600">\${{ product.price }}</span>
                <button class="px-3 py-1.5 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-data-view>
    `,
  }),
  args: {},
};
