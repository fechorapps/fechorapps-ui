import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Home, Folder, FileText, Settings, User } from 'lucide-angular';

import { UiBreadcrumbComponent, BreadcrumbItem } from './breadcrumb.component';

const meta: Meta<UiBreadcrumbComponent> = {
  title: 'Menu/Breadcrumb',
  component: UiBreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [UiBreadcrumbComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiBreadcrumbComponent>;

const basicItems: BreadcrumbItem[] = [
  { label: 'Electronics' },
  { label: 'Computers' },
  { label: 'Laptops' },
];

export const Default: Story = {
  args: {
    model: basicItems,
    home: { icon: Home },
  },
};

export const WithUrls: Story = {
  args: {
    model: [
      { label: 'Products', url: '/products' },
      { label: 'Electronics', url: '/products/electronics' },
      { label: 'Laptops' },
    ],
    home: { icon: Home, url: '/' },
  },
};

export const WithIcons: Story = {
  args: {
    model: [
      { label: 'Documents', icon: Folder },
      { label: 'Projects', icon: Folder },
      { label: 'Report.pdf', icon: FileText },
    ],
    home: { icon: Home },
  },
};

export const NoHome: Story = {
  args: {
    model: [{ label: 'Category' }, { label: 'Subcategory' }, { label: 'Product' }],
  },
};

export const HomeWithLabel: Story = {
  args: {
    model: [{ label: 'Settings', icon: Settings }, { label: 'Account' }],
    home: { label: 'Home', icon: Home },
  },
};

export const LongPath: Story = {
  args: {
    model: [
      { label: 'Users' },
      { label: 'Management' },
      { label: 'Permissions' },
      { label: 'Roles' },
      { label: 'Admin' },
    ],
    home: { icon: Home },
  },
};

export const WithDisabled: Story = {
  args: {
    model: [
      { label: 'Products', url: '/products' },
      { label: 'Electronics', disabled: true },
      { label: 'Laptops' },
    ],
    home: { icon: Home },
  },
};

export const CustomSeparator: Story = {
  render: () => ({
    props: {
      items: [{ label: 'Home' }, { label: 'Products' }, { label: 'Details' }] as BreadcrumbItem[],
    },
    template: `
      <ui-breadcrumb [model]="items">
        <ng-template #separator>
          <span class="mx-2 text-gray-400">/</span>
        </ng-template>
      </ui-breadcrumb>
    `,
  }),
};

export const CustomTemplate: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Dashboard', icon: Home },
        { label: 'Users', icon: User },
        { label: 'Profile' },
      ] as BreadcrumbItem[],
    },
    template: `
      <ui-breadcrumb [model]="items">
        <ng-template #item let-item let-last="last">
          <span
            class="px-2 py-1 rounded"
            [class.bg-primary-100]="last"
            [class.text-primary-700]="last"
            [class.dark:bg-primary-900]="last"
            [class.dark:text-primary-300]="last"
          >
            {{ item.label }}
          </span>
        </ng-template>
      </ui-breadcrumb>
    `,
  }),
};

export const PageHeader: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Projects', url: '/projects' },
        { label: 'Website Redesign' },
      ] as BreadcrumbItem[],
      home: { icon: Home, url: '/' } as BreadcrumbItem,
    },
    template: `
      <div class="space-y-2">
        <ui-breadcrumb [model]="items" [home]="home" />
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Website Redesign
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Project details and management
        </p>
      </div>
    `,
  }),
};
