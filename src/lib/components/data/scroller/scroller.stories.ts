import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiScrollerComponent } from './scroller.component';

interface Item {
  id: number;
  name: string;
  description: string;
}

const generateItems = (count: number): Item[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

const meta: Meta<UiScrollerComponent<Item>> = {
  title: 'Data/Scroller',
  component: UiScrollerComponent,
  decorators: [
    moduleMetadata({
      imports: [UiScrollerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    itemSize: {
      control: { type: 'number' },
      description: 'Height/width of each item',
      table: { category: 'Configuration' },
    },
    scrollHeight: {
      control: { type: 'text' },
      description: 'Viewport height',
      table: { category: 'Appearance' },
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'both'],
      description: 'Scroll orientation',
      table: { category: 'Configuration' },
    },
    numToleratedItems: {
      control: { type: 'number' },
      description: 'Buffer items before/after visible area',
      table: { category: 'Performance' },
    },
    delay: {
      control: { type: 'number' },
      description: 'Scroll event delay (ms)',
      table: { category: 'Performance' },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
      table: { category: 'State' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<UiScrollerComponent<Item>>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: generateItems(10000),
    },
    template: `
      <ui-scroller
        [items]="items"
        [itemSize]="itemSize"
        [scrollHeight]="scrollHeight"
      >
        <ng-template #item let-item let-index="index">
          <div class="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-medium">
              {{ index + 1 }}
            </div>
            <div>
              <div class="font-medium text-gray-900 dark:text-gray-100">{{ item.name }}</div>
              <div class="text-sm text-gray-500">{{ item.description }}</div>
            </div>
          </div>
        </ng-template>
      </ui-scroller>
    `,
  }),
  args: {
    itemSize: 60,
    scrollHeight: '400px',
  },
};

export const LargeDataset: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: generateItems(100000),
    },
    template: `
      <div class="space-y-2">
        <p class="text-sm text-gray-500">Rendering 100,000 items with virtual scrolling</p>
        <ui-scroller
          [items]="items"
          [itemSize]="50"
          scrollHeight="300px"
        >
          <ng-template #item let-item let-index="index">
            <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-900 dark:text-gray-100">{{ item.name }}</span>
              <span class="text-xs text-gray-500">#{{ index + 1 }}</span>
            </div>
          </ng-template>
        </ui-scroller>
      </div>
    `,
  }),
  args: {},
};

export const Horizontal: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: generateItems(1000),
    },
    template: `
      <ui-scroller
        [items]="items"
        [itemSize]="150"
        orientation="horizontal"
        scrollHeight="200px"
        scrollWidth="100%"
      >
        <ng-template #item let-item let-index="index">
          <div class="h-full p-4 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
            <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl mb-2">
              {{ index + 1 }}
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
              {{ item.name }}
            </div>
          </div>
        </ng-template>
      </ui-scroller>
    `,
  }),
  args: {},
};

export const WithLoading: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: generateItems(1000),
    },
    template: `
      <ui-scroller
        [items]="items"
        [itemSize]="50"
        scrollHeight="300px"
        [loading]="true"
        [showLoader]="true"
      >
        <ng-template #item let-item>
          <div class="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            {{ item.name }}
          </div>
        </ng-template>
      </ui-scroller>
    `,
  }),
  args: {},
};

export const CustomLoader: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: generateItems(1000),
    },
    template: `
      <ui-scroller
        [items]="items"
        [itemSize]="50"
        scrollHeight="300px"
        [loading]="true"
        [showLoader]="true"
      >
        <ng-template #item let-item>
          <div class="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
            {{ item.name }}
          </div>
        </ng-template>
        <ng-template #loader>
          <div class="text-center">
            <div class="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p class="mt-2 text-gray-500">Loading more items...</p>
          </div>
        </ng-template>
      </ui-scroller>
    `,
  }),
  args: {},
};

export const ProductCards: Story = {
  render: (args) => ({
    props: {
      ...args,
      products: Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 200) + 20,
        rating: Math.floor(Math.random() * 5) + 1,
        category: ['Electronics', 'Clothing', 'Home', 'Sports'][i % 4],
      })),
    },
    template: `
      <ui-scroller
        [items]="products"
        [itemSize]="100"
        scrollHeight="500px"
      >
        <ng-template #item let-product let-index="index">
          <div class="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
              <span class="text-2xl">📦</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {{ product.name }}
                </h3>
                <span class="text-lg font-bold text-primary-600">\${{ product.price }}</span>
              </div>
              <div class="flex items-center justify-between mt-1">
                <span class="text-sm text-gray-500">{{ product.category }}</span>
                <span class="text-yellow-500 text-sm">
                  {{ '★'.repeat(product.rating) }}{{ '☆'.repeat(5 - product.rating) }}
                </span>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-scroller>
    `,
  }),
  args: {},
};

export const ChatMessages: Story = {
  render: (args) => ({
    props: {
      ...args,
      messages: Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        user: ['Alice', 'Bob', 'Carol', 'David'][i % 4],
        message: `This is message number ${i + 1}. Lorem ipsum dolor sit amet.`,
        time: new Date(Date.now() - i * 60000).toLocaleTimeString(),
        isMe: i % 3 === 0,
      })),
    },
    template: `
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div class="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Chat History</h3>
        </div>
        <ui-scroller
          [items]="messages"
          [itemSize]="80"
          scrollHeight="400px"
        >
          <ng-template #item let-msg>
            <div
              class="p-3"
              [class.flex-row-reverse]="msg.isMe"
              [class.flex]="true"
              [class.gap-2]="true"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                [class.bg-primary-500]="msg.isMe"
                [class.text-white]="msg.isMe"
                [class.bg-gray-200]="!msg.isMe"
                [class.dark:bg-gray-700]="!msg.isMe"
                [class.text-gray-700]="!msg.isMe"
                [class.dark:text-gray-300]="!msg.isMe"
              >
                {{ msg.user[0] }}
              </div>
              <div
                class="flex-1 rounded-lg p-2 max-w-[80%]"
                [class.bg-primary-100]="msg.isMe"
                [class.dark:bg-primary-900/30]="msg.isMe"
                [class.bg-gray-100]="!msg.isMe"
                [class.dark:bg-gray-800]="!msg.isMe"
              >
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {{ msg.user }}
                  </span>
                  <span class="text-xs text-gray-400">{{ msg.time }}</span>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ msg.message }}</p>
              </div>
            </div>
          </ng-template>
        </ui-scroller>
      </div>
    `,
  }),
  args: {},
};

export const SimpleStrings: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: Array.from({ length: 50000 }, (_, i) => `Item ${i + 1}`),
    },
    template: `
      <ui-scroller
        [items]="items"
        [itemSize]="40"
        scrollHeight="300px"
      />
    `,
  }),
  args: {},
};
