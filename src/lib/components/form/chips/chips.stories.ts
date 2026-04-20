import type { Meta, StoryObj } from '@storybook/angular';

import { UiChipsComponent } from './chips.component';

const meta: Meta<UiChipsComponent> = {
  title: 'Form/Chips',
  component: UiChipsComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chips size',
    },
    max: {
      control: 'number',
      description: 'Maximum number of chips',
    },
    allowDuplicates: {
      control: 'boolean',
      description: 'Allow duplicate values',
    },
    addOnBlur: {
      control: 'boolean',
      description: 'Add chip on blur',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid state',
    },
  },
};

export default meta;
type Story = StoryObj<UiChipsComponent>;

export const Default: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Add a tag...',
    value: ['Angular', 'TypeScript'],
  },
};

export const Empty: Story = {
  args: {
    label: 'Keywords',
    placeholder: 'Type and press Enter to add',
  },
};

export const WithMax: Story = {
  args: {
    label: 'Skills (max 5)',
    placeholder: 'Add skill...',
    max: 5,
    value: ['JavaScript', 'TypeScript', 'Angular'],
    helpText: 'You can add up to 5 skills',
  },
};

export const AllowDuplicates: Story = {
  args: {
    label: 'Items',
    placeholder: 'Add item...',
    allowDuplicates: true,
    value: ['Item 1', 'Item 1', 'Item 2'],
  },
};

export const CommaSeparator: Story = {
  args: {
    label: 'Email Recipients',
    placeholder: 'Enter emails separated by comma',
    separator: ',',
    value: ['user@example.com'],
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-chips variant="default" label="Default" placeholder="Add tag..." [value]="['Tag 1', 'Tag 2']"></ui-chips>
        <ui-chips variant="filled" label="Filled" placeholder="Add tag..." [value]="['Tag 1', 'Tag 2']"></ui-chips>
        <ui-chips variant="outlined" label="Outlined" placeholder="Add tag..." [value]="['Tag 1', 'Tag 2']"></ui-chips>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-chips size="sm" label="Small" placeholder="Add..." [value]="['Tag 1', 'Tag 2']"></ui-chips>
        <ui-chips size="md" label="Medium" placeholder="Add..." [value]="['Tag 1', 'Tag 2']"></ui-chips>
        <ui-chips size="lg" label="Large" placeholder="Add..." [value]="['Tag 1', 'Tag 2']"></ui-chips>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Categories',
    value: ['Technology', 'Science'],
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Required Tags',
    placeholder: 'Add at least one tag',
    invalid: true,
    helpText: 'Please add at least one tag',
  },
};

export const BlogPost: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-lg">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Blog Post</h3>
        <div class="space-y-4">
          <ui-chips
            label="Categories"
            placeholder="Add category..."
            [value]="['Technology', 'Programming']"
            [max]="3"
          ></ui-chips>
          <ui-chips
            label="Tags"
            placeholder="Add tags..."
            [value]="['angular', 'typescript', 'web']"
            helpText="Tags help readers find your post"
          ></ui-chips>
        </div>
      </div>
    `,
  }),
};
