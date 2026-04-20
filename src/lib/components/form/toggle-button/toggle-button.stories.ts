import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sun,
  Moon,
  Heart,
  Star,
  Bookmark,
  Check,
  X,
} from 'lucide-angular';

import type { Meta, StoryObj } from '@storybook/angular';

import { UiToggleButtonComponent } from './toggle-button.component';

const meta: Meta<UiToggleButtonComponent> = {
  title: 'Form/ToggleButton',
  component: UiToggleButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**ToggleButton** is used to select a boolean value using a button.

## API Reference

Based on [PrimeNG ToggleButton](https://primeng.org/togglebutton)

### Features
- On/off state toggling
- Custom on/off labels and icons
- Multiple visual variants
- Icon-only mode for compact UI
- Integrates with Angular forms

### Events
| Event | Description |
|-------|-------------|
| \`checkedChange\` | Callback when toggle state changes |
        `,
      },
    },
  },
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'text'],
      description: 'Visual style variant of the button.',
      table: {
        type: { summary: 'ToggleButtonVariant' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle button.',
      table: {
        type: { summary: 'ToggleButtonSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },

    // Configuration
    onLabel: {
      control: 'text',
      description: 'Label for the on state.',
      table: {
        type: { summary: 'string' },
        category: 'Configuration',
      },
    },
    offLabel: {
      control: 'text',
      description: 'Label for the off state.',
      table: {
        type: { summary: 'string' },
        category: 'Configuration',
      },
    },
    onIcon: {
      control: false,
      description: 'Icon to display when checked (Lucide icon component).',
      table: {
        type: { summary: 'LucideIconData' },
        category: 'Configuration',
      },
    },
    offIcon: {
      control: false,
      description: 'Icon to display when unchecked (Lucide icon component).',
      table: {
        type: { summary: 'LucideIconData' },
        category: 'Configuration',
      },
    },
    icon: {
      control: false,
      description: 'Icon displayed in both states (Lucide icon component).',
      table: {
        type: { summary: 'LucideIconData' },
        category: 'Configuration',
      },
    },

    // State
    checked: {
      control: 'boolean',
      description: 'Whether the button is in checked/on state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, the component cannot be interacted with.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiToggleButtonComponent>;

export const Default: Story = {
  render: () => ({
    template: `<ui-toggle-button>Toggle</ui-toggle-button>`,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    props: { icon: Star },
    template: `<ui-toggle-button [icon]="icon">Favorite</ui-toggle-button>`,
  }),
};

export const IconOnly: Story = {
  render: () => ({
    props: { icon: Heart },
    template: `<ui-toggle-button [icon]="icon"></ui-toggle-button>`,
  }),
};

export const OnOffLabels: Story = {
  render: () => ({
    template: `<ui-toggle-button onLabel="ON" offLabel="OFF"></ui-toggle-button>`,
  }),
};

export const OnOffIcons: Story = {
  render: () => ({
    props: { checkIcon: Check, xIcon: X },
    template: `<ui-toggle-button [onIcon]="checkIcon" [offIcon]="xIcon"></ui-toggle-button>`,
  }),
};

export const ThemeToggle: Story = {
  render: () => ({
    props: { sunIcon: Sun, moonIcon: Moon },
    template: `<ui-toggle-button [onIcon]="moonIcon" [offIcon]="sunIcon" onLabel="Dark" offLabel="Light"></ui-toggle-button>`,
  }),
};

export const Variants: Story = {
  render: () => ({
    props: { icon: Star },
    template: `
      <div class="flex gap-4">
        <ui-toggle-button variant="default" [icon]="icon" [checked]="true">Default</ui-toggle-button>
        <ui-toggle-button variant="outlined" [icon]="icon" [checked]="true">Outlined</ui-toggle-button>
        <ui-toggle-button variant="text" [icon]="icon" [checked]="true">Text</ui-toggle-button>
      </div>
    `,
  }),
};

export const VariantsUnchecked: Story = {
  render: () => ({
    props: { icon: Star },
    template: `
      <div class="flex gap-4">
        <ui-toggle-button variant="default" [icon]="icon">Default</ui-toggle-button>
        <ui-toggle-button variant="outlined" [icon]="icon">Outlined</ui-toggle-button>
        <ui-toggle-button variant="text" [icon]="icon">Text</ui-toggle-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { icon: Star },
    template: `
      <div class="flex items-center gap-4">
        <ui-toggle-button size="sm" [icon]="icon">Small</ui-toggle-button>
        <ui-toggle-button size="md" [icon]="icon">Medium</ui-toggle-button>
        <ui-toggle-button size="lg" [icon]="icon">Large</ui-toggle-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: { icon: Star },
    template: `
      <div class="flex gap-4">
        <ui-toggle-button [disabled]="true" [icon]="icon">Disabled Off</ui-toggle-button>
        <ui-toggle-button [disabled]="true" [checked]="true" [icon]="icon">Disabled On</ui-toggle-button>
      </div>
    `,
  }),
};

export const TextEditor: Story = {
  render: () => ({
    props: {
      boldIcon: Bold,
      italicIcon: Italic,
      underlineIcon: Underline,
    },
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex gap-1 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <ui-toggle-button variant="text" [icon]="boldIcon" size="sm"></ui-toggle-button>
          <ui-toggle-button variant="text" [icon]="italicIcon" size="sm"></ui-toggle-button>
          <ui-toggle-button variant="text" [icon]="underlineIcon" size="sm"></ui-toggle-button>
        </div>
        <div class="text-gray-500 dark:text-gray-400 text-sm">
          Type your text here...
        </div>
      </div>
    `,
  }),
};

export const AlignmentToolbar: Story = {
  render: () => ({
    props: {
      alignLeftIcon: AlignLeft,
      alignCenterIcon: AlignCenter,
      alignRightIcon: AlignRight,
    },
    template: `
      <div class="flex gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg inline-flex">
        <ui-toggle-button variant="text" [icon]="alignLeftIcon" [checked]="true" size="sm"></ui-toggle-button>
        <ui-toggle-button variant="text" [icon]="alignCenterIcon" size="sm"></ui-toggle-button>
        <ui-toggle-button variant="text" [icon]="alignRightIcon" size="sm"></ui-toggle-button>
      </div>
    `,
  }),
};

export const SocialActions: Story = {
  render: () => ({
    props: {
      heartIcon: Heart,
      bookmarkIcon: Bookmark,
    },
    template: `
      <div class="flex gap-4">
        <ui-toggle-button variant="text" [icon]="heartIcon" size="sm">Like</ui-toggle-button>
        <ui-toggle-button variant="text" [icon]="bookmarkIcon" size="sm">Save</ui-toggle-button>
      </div>
    `,
  }),
};
