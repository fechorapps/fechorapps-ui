import type { Meta, StoryObj } from '@storybook/angular';

import {
  UiListboxComponent,
  type ListboxOption,
  type ListboxOptionGroup,
} from './listbox.component';

const basicOptions: ListboxOption<string>[] = [
  { label: 'New York', value: 'ny' },
  { label: 'Los Angeles', value: 'la' },
  { label: 'Chicago', value: 'chi' },
  { label: 'Houston', value: 'hou' },
  { label: 'Phoenix', value: 'phx' },
];

const countryOptions: ListboxOption<string>[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'Mexico', value: 'mx' },
  { label: 'Brazil', value: 'br' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Colombia', value: 'co' },
  { label: 'Peru', value: 'pe' },
  { label: 'Chile', value: 'cl' },
];

const groupedOptions: ListboxOptionGroup<string>[] = [
  {
    label: 'North America',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'Mexico', value: 'mx' },
    ],
  },
  {
    label: 'South America',
    options: [
      { label: 'Brazil', value: 'br' },
      { label: 'Argentina', value: 'ar' },
      { label: 'Colombia', value: 'co' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
    ],
  },
];

const meta: Meta<UiListboxComponent<string>> = {
  title: 'Form/Listbox',
  component: UiListboxComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Listbox** is used to select one or more values from a list of items.

## API Reference

Based on [PrimeNG Listbox](https://primeng.org/listbox)

### Features
- Single or multiple selection modes
- Checkbox mode for multi-select
- Built-in filtering/search
- Option grouping support
- Customizable list height
- Individual option disabling

### Option Interface
\`\`\`typescript
interface ListboxOption<T> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface ListboxOptionGroup<T> {
  label: string;
  options: ListboxOption<T>[];
}
\`\`\`

### Events
| Event | Description |
|-------|-------------|
| \`valueChange\` | Callback when selection changes |
| \`filter\` | Callback when filter input changes |
        `,
      },
    },
  },
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the listbox items.',
      table: {
        type: { summary: 'ListboxSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    listHeight: {
      control: 'text',
      description: 'Max height of the list area (CSS value).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '200px' },
        category: 'Appearance',
      },
    },

    // Configuration
    options: {
      control: 'object',
      description: 'Array of options to display.',
      table: {
        type: { summary: 'ListboxOption<T>[]' },
        category: 'Configuration',
      },
    },
    optionGroups: {
      control: 'object',
      description: 'Array of option groups for categorized options.',
      table: {
        type: { summary: 'ListboxOptionGroup<T>[]' },
        category: 'Configuration',
      },
    },
    multiple: {
      control: 'boolean',
      description: 'When true, allows selecting multiple options.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Configuration',
      },
    },
    checkbox: {
      control: 'boolean',
      description: 'When true, displays checkboxes for selection (requires multiple).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Configuration',
      },
    },
    filter: {
      control: 'boolean',
      description: 'When true, displays a filter input above the list.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Configuration',
      },
    },
    filterPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the filter input.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Search...' },
        category: 'Configuration',
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when there are no options or filter returns empty.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No results found' },
        category: 'Configuration',
      },
    },

    // Labels
    label: {
      control: 'text',
      description: 'Label text displayed above the listbox.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below the listbox.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'When true, disables the entire listbox.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'When true, applies invalid styling to indicate failed validation.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiListboxComponent<string>>;

export const Default: Story = {
  args: {
    options: basicOptions,
    value: 'ny',
    label: 'Select City',
  },
};

export const MultipleSelection: Story = {
  args: {
    options: basicOptions,
    multiple: true,
    value: ['ny', 'la'],
    label: 'Select Cities',
  },
};

export const WithCheckboxes: Story = {
  args: {
    options: basicOptions,
    multiple: true,
    checkbox: true,
    value: ['ny', 'chi'],
    label: 'Select Cities',
  },
};

export const WithFilter: Story = {
  args: {
    options: countryOptions,
    filter: true,
    filterPlaceholder: 'Search countries...',
    label: 'Select Country',
  },
};

export const GroupedOptions: Story = {
  args: {
    optionGroups: groupedOptions,
    label: 'Select Country',
    listHeight: '250px',
  },
};

export const GroupedWithFilter: Story = {
  args: {
    optionGroups: groupedOptions,
    filter: true,
    filterPlaceholder: 'Search...',
    label: 'Select Country',
    listHeight: '250px',
  },
};

export const Sizes: Story = {
  render: () => ({
    props: { options: basicOptions.slice(0, 3) },
    template: `
      <div class="flex gap-8">
        <div class="w-48">
          <ui-listbox size="sm" [options]="options" value="ny" label="Small"></ui-listbox>
        </div>
        <div class="w-48">
          <ui-listbox size="md" [options]="options" value="ny" label="Medium"></ui-listbox>
        </div>
        <div class="w-48">
          <ui-listbox size="lg" [options]="options" value="ny" label="Large"></ui-listbox>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    value: 'ny',
    disabled: true,
    label: 'Select City',
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      { label: 'New York', value: 'ny' },
      { label: 'Los Angeles', value: 'la', disabled: true },
      { label: 'Chicago', value: 'chi' },
      { label: 'Houston', value: 'hou', disabled: true },
      { label: 'Phoenix', value: 'phx' },
    ],
    value: 'ny',
    label: 'Select City',
    helpText: 'Some cities are unavailable',
  },
};

export const Invalid: Story = {
  args: {
    options: basicOptions,
    invalid: true,
    label: 'Select City',
    helpText: 'Please select a city',
  },
};

export const EmptyState: Story = {
  args: {
    options: [],
    filter: true,
    emptyMessage: 'No cities available',
    label: 'Select City',
  },
};

export const CompactList: Story = {
  args: {
    options: basicOptions,
    size: 'sm',
    listHeight: '120px',
    label: 'Quick Select',
  },
};

export const SkillsSelector: Story = {
  render: () => ({
    props: {
      options: [
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Python', value: 'py' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'Ruby', value: 'ruby' },
      ],
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-64">
        <ui-listbox
          [options]="options"
          [multiple]="true"
          [checkbox]="true"
          [filter]="true"
          filterPlaceholder="Search skills..."
          label="Programming Skills"
          helpText="Select all that apply"
          [value]="['ts', 'py']"
        ></ui-listbox>
      </div>
    `,
  }),
};

export const TeamMemberSelector: Story = {
  render: () => ({
    props: {
      groups: [
        {
          label: 'Engineering',
          options: [
            { label: 'Alice Johnson', value: 'alice' },
            { label: 'Bob Smith', value: 'bob' },
            { label: 'Charlie Brown', value: 'charlie' },
          ],
        },
        {
          label: 'Design',
          options: [
            { label: 'Diana Prince', value: 'diana' },
            { label: 'Eve Wilson', value: 'eve' },
          ],
        },
        {
          label: 'Product',
          options: [
            { label: 'Frank Miller', value: 'frank' },
            { label: 'Grace Lee', value: 'grace' },
          ],
        },
      ],
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-72">
        <ui-listbox
          [optionGroups]="groups"
          [multiple]="true"
          [checkbox]="true"
          [filter]="true"
          filterPlaceholder="Search team members..."
          label="Assign Team Members"
          listHeight="280px"
        ></ui-listbox>
      </div>
    `,
  }),
};
