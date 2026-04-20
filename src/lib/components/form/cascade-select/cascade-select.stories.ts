import type { Meta, StoryObj } from '@storybook/angular';

import { UiCascadeSelectComponent, CascadeSelectOption } from './cascade-select.component';

const locationOptions: CascadeSelectOption[] = [
  {
    label: 'México',
    children: [
      {
        label: 'Ciudad de México',
        children: [
          { label: 'Coyoacán', value: 'mx-cdmx-coyoacan' },
          { label: 'Benito Juárez', value: 'mx-cdmx-benitojuarez' },
          { label: 'Miguel Hidalgo', value: 'mx-cdmx-miguelhidalgo' },
        ],
      },
      {
        label: 'Jalisco',
        children: [
          { label: 'Guadalajara', value: 'mx-jal-guadalajara' },
          { label: 'Zapopan', value: 'mx-jal-zapopan' },
        ],
      },
      {
        label: 'Nuevo León',
        children: [
          { label: 'Monterrey', value: 'mx-nl-monterrey' },
          { label: 'San Pedro', value: 'mx-nl-sanpedro' },
        ],
      },
    ],
  },
  {
    label: 'United States',
    children: [
      {
        label: 'California',
        children: [
          { label: 'Los Angeles', value: 'us-ca-la' },
          { label: 'San Francisco', value: 'us-ca-sf' },
          { label: 'San Diego', value: 'us-ca-sd' },
        ],
      },
      {
        label: 'Texas',
        children: [
          { label: 'Houston', value: 'us-tx-houston' },
          { label: 'Austin', value: 'us-tx-austin' },
          { label: 'Dallas', value: 'us-tx-dallas' },
        ],
      },
    ],
  },
];

const categoryOptions: CascadeSelectOption[] = [
  {
    label: 'Electronics',
    children: [
      {
        label: 'Computers',
        children: [
          { label: 'Laptops', value: 'laptops' },
          { label: 'Desktops', value: 'desktops' },
          { label: 'Tablets', value: 'tablets' },
        ],
      },
      {
        label: 'Phones',
        children: [
          { label: 'Smartphones', value: 'smartphones' },
          { label: 'Feature Phones', value: 'feature-phones' },
        ],
      },
      {
        label: 'Audio',
        children: [
          { label: 'Headphones', value: 'headphones' },
          { label: 'Speakers', value: 'speakers' },
        ],
      },
    ],
  },
  {
    label: 'Clothing',
    children: [
      {
        label: 'Men',
        children: [
          { label: 'Shirts', value: 'men-shirts' },
          { label: 'Pants', value: 'men-pants' },
          { label: 'Shoes', value: 'men-shoes' },
        ],
      },
      {
        label: 'Women',
        children: [
          { label: 'Dresses', value: 'women-dresses' },
          { label: 'Tops', value: 'women-tops' },
          { label: 'Shoes', value: 'women-shoes' },
        ],
      },
    ],
  },
];

const meta: Meta<UiCascadeSelectComponent> = {
  title: 'Form/CascadeSelect',
  component: UiCascadeSelectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**CascadeSelect** displays a nested structure of options for hierarchical selection.

## API Reference

Based on [PrimeNG CascadeSelect](https://primeng.org/cascadeselect)

### Features
- Hierarchical option display
- Multi-level navigation
- Keyboard navigation support
- Custom option templates
- Form integration

### Option Interface
\`\`\`typescript
interface CascadeSelectOption {
  label: string;
  value?: unknown;
  children?: CascadeSelectOption[];
  disabled?: boolean;
}
\`\`\`

### Use Cases
- Location selection (Country → State → City)
- Category navigation
- Organization hierarchy
- File system navigation
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select' },
        category: 'Configuration',
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the select.',
      table: {
        type: { summary: 'string' },
        category: 'Configuration',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select.',
      table: {
        type: { summary: 'CascadeSelectSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the select is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'When true, displays invalid state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiCascadeSelectComponent>;

export const Default: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select a location',
    label: 'Location',
  },
};

export const WithValue: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select a location',
    label: 'Location',
    value: 'mx-cdmx-coyoacan',
  },
};

export const Categories: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select a category',
    label: 'Product Category',
  },
};

export const Sizes: Story = {
  render: () => ({
    props: { options: locationOptions },
    template: `
      <div class="flex flex-col gap-6 max-w-md">
        <ui-cascade-select
          [options]="options"
          placeholder="Small"
          label="Small"
          size="sm"
        ></ui-cascade-select>

        <ui-cascade-select
          [options]="options"
          placeholder="Medium (default)"
          label="Medium"
          size="md"
        ></ui-cascade-select>

        <ui-cascade-select
          [options]="options"
          placeholder="Large"
          label="Large"
          size="lg"
        ></ui-cascade-select>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select a location',
    label: 'Location',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select a location',
    label: 'Location',
    invalid: true,
    helpText: 'Please select a location',
  },
};

export const WithHelpText: Story = {
  args: {
    options: locationOptions,
    placeholder: 'Select a location',
    label: 'Delivery Location',
    helpText: 'Select the delivery location for your order',
  },
};

export const ShippingForm: Story = {
  render: () => ({
    props: { locationOptions },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Shipping Address</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <ui-cascade-select
            [options]="locationOptions"
            placeholder="Select location"
            label="Location"
          ></ui-cascade-select>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Street Address</label>
            <input
              type="text"
              placeholder="123 Main St"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Postal Code</label>
            <input
              type="text"
              placeholder="12345"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <button class="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Save Address
          </button>
        </div>
      </div>
    `,
  }),
};

export const ProductFilter: Story = {
  render: () => ({
    props: { categoryOptions },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Products</h3>
        <ui-cascade-select
          [options]="categoryOptions"
          placeholder="All Categories"
          label="Category"
          helpText="Select a category to filter products"
        ></ui-cascade-select>
      </div>
    `,
  }),
};
