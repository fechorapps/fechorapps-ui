import type { Meta, StoryObj } from '@storybook/angular';

import { UiTriStateCheckboxComponent } from './tri-state-checkbox.component';

const meta: Meta<UiTriStateCheckboxComponent> = {
  title: 'Form/TriStateCheckbox',
  component: UiTriStateCheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**TriStateCheckbox** is a checkbox with three states: checked, unchecked, and indeterminate.

## API Reference

Based on [PrimeNG TriStateCheckbox](https://primeng.org/tristatecheckbox)

### Features
- Three states: true, false, null (indeterminate)
- Visual feedback for each state
- Keyboard accessible
- Form integration with ngModel/reactive forms

### States
| Value | Visual | Description |
|-------|--------|-------------|
| \`true\` | Checkmark | Checked state |
| \`false\` | Empty | Unchecked state |
| \`null\` | Minus | Indeterminate/partial state |

### Use Cases
- "Select all" checkbox with partial selection
- Permission checkboxes (grant, deny, inherit)
- Filter options with "any" state
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed next to the checkbox.',
      table: {
        type: { summary: 'string' },
        category: 'Configuration',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the checkbox is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'When true, displays invalid state styling.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiTriStateCheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Accept Terms',
    value: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked State',
    value: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate State',
    value: null,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked State',
    value: false,
  },
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <ui-tri-state-checkbox label="Disabled (unchecked)" [disabled]="true" [value]="false"></ui-tri-state-checkbox>
        <ui-tri-state-checkbox label="Disabled (checked)" [disabled]="true" [value]="true"></ui-tri-state-checkbox>
        <ui-tri-state-checkbox label="Disabled (indeterminate)" [disabled]="true" [value]="null"></ui-tri-state-checkbox>
      </div>
    `,
  }),
};

export const Invalid: Story = {
  args: {
    label: 'Required field',
    value: false,
    invalid: true,
  },
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <ui-tri-state-checkbox label="Click to cycle through states" [value]="false"></ui-tri-state-checkbox>
        </div>
        <p class="text-sm text-gray-500">
          States cycle: Unchecked → Checked → Indeterminate → Unchecked
        </p>
      </div>
    `,
  }),
};

export const PermissionsExample: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Permissions</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700 dark:text-gray-300">Read</span>
            <ui-tri-state-checkbox [value]="true"></ui-tri-state-checkbox>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700 dark:text-gray-300">Write</span>
            <ui-tri-state-checkbox [value]="null"></ui-tri-state-checkbox>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700 dark:text-gray-300">Delete</span>
            <ui-tri-state-checkbox [value]="false"></ui-tri-state-checkbox>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-700 dark:text-gray-300">Admin</span>
            <ui-tri-state-checkbox [value]="false"></ui-tri-state-checkbox>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500">
            ✓ = Granted &nbsp; − = Inherited &nbsp; ☐ = Denied
          </p>
        </div>
      </div>
    `,
  }),
};

export const SelectAllExample: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <div class="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
          <ui-tri-state-checkbox [value]="null"></ui-tri-state-checkbox>
          <span class="text-sm font-medium text-gray-900 dark:text-white">Select All Items</span>
        </div>
        <div class="space-y-2 mt-3">
          <div class="flex items-center gap-2">
            <input type="checkbox" checked class="w-4 h-4 rounded border-gray-300" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Item 1</span>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" checked class="w-4 h-4 rounded border-gray-300" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Item 2</span>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Item 3</span>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Item 4</span>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-3">
          Parent checkbox shows indeterminate when some items are selected
        </p>
      </div>
    `,
  }),
};

export const FilterExample: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-sm">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Products</h3>
        <div class="space-y-3">
          <div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">In Stock</span>
            <div class="flex gap-4">
              <ui-tri-state-checkbox label="Yes" [value]="true"></ui-tri-state-checkbox>
              <ui-tri-state-checkbox label="No" [value]="false"></ui-tri-state-checkbox>
              <ui-tri-state-checkbox label="Any" [value]="null"></ui-tri-state-checkbox>
            </div>
          </div>
          <div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">On Sale</span>
            <div class="flex gap-4">
              <ui-tri-state-checkbox label="Yes" [value]="false"></ui-tri-state-checkbox>
              <ui-tri-state-checkbox label="No" [value]="false"></ui-tri-state-checkbox>
              <ui-tri-state-checkbox label="Any" [value]="null"></ui-tri-state-checkbox>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
