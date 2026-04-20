import {
  Grid,
  List,
  LayoutGrid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Sun,
  Moon,
  Monitor,
} from 'lucide-angular';

import type { Meta, StoryObj } from '@storybook/angular';

import { UiSelectButtonComponent, type SelectButtonOption } from './select-button.component';

const basicOptions: SelectButtonOption<string>[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

const meta: Meta<UiSelectButtonComponent<string>> = {
  title: 'Form/SelectButton',
  component: UiSelectButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**SelectButton** is used to choose single or multiple items from a set of options presented as buttons.

## API Reference

Based on [PrimeNG SelectButton](https://primeng.org/selectbutton)

### Features
- Single or multiple selection modes
- Icon support for each option
- Icon-only compact mode
- Individual option disabling
- Empty selection control

### Option Interface
\`\`\`typescript
interface SelectButtonOption<T> {
  label: string;
  value: T;
  icon?: LucideIconData;
  disabled?: boolean;
}
\`\`\`

### Events
| Event | Description |
|-------|-------------|
| \`valueChange\` | Callback when selection changes |
        `,
      },
    },
  },
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button group.',
      table: {
        type: { summary: 'SelectButtonSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },

    // Configuration
    options: {
      control: 'object',
      description: 'Array of options to display as buttons.',
      table: {
        type: { summary: 'SelectButtonOption<T>[]' },
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
    allowEmpty: {
      control: 'boolean',
      description: 'When false, at least one option must be selected.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'When true, disables the entire component.',
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
type Story = StoryObj<UiSelectButtonComponent<string>>;

export const Default: Story = {
  args: {
    options: basicOptions,
    value: 'opt1',
  },
};

export const MultipleSelection: Story = {
  args: {
    options: basicOptions,
    multiple: true,
    value: ['opt1', 'opt2'],
  },
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      options: [
        { label: 'List', value: 'list', icon: List },
        { label: 'Grid', value: 'grid', icon: Grid },
        { label: 'Gallery', value: 'gallery', icon: LayoutGrid },
      ],
    },
    template: `<ui-select-button [options]="options" value="grid"></ui-select-button>`,
  }),
};

export const IconsOnly: Story = {
  render: () => ({
    props: {
      options: [
        { label: '', value: 'left', icon: AlignLeft },
        { label: '', value: 'center', icon: AlignCenter },
        { label: '', value: 'right', icon: AlignRight },
        { label: '', value: 'justify', icon: AlignJustify },
      ],
    },
    template: `<ui-select-button [options]="options" value="left"></ui-select-button>`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { options: basicOptions },
    template: `
      <div class="flex flex-col gap-4">
        <ui-select-button size="sm" [options]="options" value="opt1"></ui-select-button>
        <ui-select-button size="md" [options]="options" value="opt1"></ui-select-button>
        <ui-select-button size="lg" [options]="options" value="opt1"></ui-select-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    value: 'opt1',
    disabled: true,
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2', disabled: true },
      { label: 'Option 3', value: 'opt3' },
    ],
    value: 'opt1',
  },
};

export const Invalid: Story = {
  args: {
    options: basicOptions,
    invalid: true,
    value: null,
  },
};

export const NoEmptySelection: Story = {
  args: {
    options: basicOptions,
    value: 'opt1',
    allowEmpty: false,
  },
};

export const ThemeSelector: Story = {
  render: () => ({
    props: {
      options: [
        { label: 'Light', value: 'light', icon: Sun },
        { label: 'Dark', value: 'dark', icon: Moon },
        { label: 'System', value: 'system', icon: Monitor },
      ],
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 inline-block">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Theme</p>
        <ui-select-button [options]="options" value="system"></ui-select-button>
      </div>
    `,
  }),
};

export const ViewToggle: Story = {
  render: () => ({
    props: {
      options: [
        { label: '', value: 'list', icon: List },
        { label: '', value: 'grid', icon: Grid },
      ],
    },
    template: `
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600 dark:text-gray-400">View:</span>
        <ui-select-button [options]="options" value="grid" size="sm"></ui-select-button>
      </div>
    `,
  }),
};

export const PaymentPeriod: Story = {
  render: () => ({
    props: {
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Annually', value: 'annually' },
      ],
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 inline-block text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Billing Period</p>
        <ui-select-button [options]="options" value="annually"></ui-select-button>
        <p class="text-xs text-green-600 mt-2">Save 20% with annual billing</p>
      </div>
    `,
  }),
};

export const MultipleWithIcons: Story = {
  render: () => ({
    props: {
      options: [
        { label: 'Left', value: 'left', icon: AlignLeft },
        { label: 'Center', value: 'center', icon: AlignCenter },
        { label: 'Right', value: 'right', icon: AlignRight },
      ],
    },
    template: `
      <ui-select-button
        [options]="options"
        [multiple]="true"
        [value]="['left', 'right']"
      ></ui-select-button>
    `,
  }),
};

export const SizeComparison: Story = {
  render: () => ({
    props: {
      options: [
        { label: 'XS', value: 'xs' },
        { label: 'S', value: 's' },
        { label: 'M', value: 'm' },
        { label: 'L', value: 'l' },
        { label: 'XL', value: 'xl' },
      ],
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 inline-block">
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Size</p>
        <ui-select-button [options]="options" value="m"></ui-select-button>
      </div>
    `,
  }),
};
