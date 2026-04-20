import {
  Copy,
  Download,
  Edit,
  FileText,
  Mail,
  Printer,
  Save,
  Share2,
  Trash2,
  Upload,
} from 'lucide-angular';

import type { Meta, StoryObj } from '@storybook/angular';

import { UiSplitButtonComponent, SplitButtonItem } from './split-button.component';

const saveActions: SplitButtonItem[] = [
  { label: 'Save', icon: Save, command: () => console.log('Save') },
  { label: 'Save As...', icon: Copy, command: () => console.log('Save As') },
  { separator: true, label: '' },
  { label: 'Export as PDF', icon: FileText, command: () => console.log('Export PDF') },
  { label: 'Export as Word', icon: FileText, command: () => console.log('Export Word') },
];

const shareActions: SplitButtonItem[] = [
  { label: 'Share via Email', icon: Mail },
  { label: 'Copy Link', icon: Copy },
  { label: 'Download', icon: Download },
];

const meta: Meta<UiSplitButtonComponent> = {
  title: 'Button/SplitButton',
  component: UiSplitButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**SplitButton** combines a main action button with a dropdown menu containing additional choices.

## API Reference

Based on [PrimeNG SplitButton](https://primeng.org/splitbutton)

### Features
- Main button for primary action
- Dropdown menu for secondary actions
- Multiple variants and sizes
- Outlined, text, and raised styles
- Icon support for button and menu items
- Separator support in menu

### SplitButtonItem Interface
\`\`\`typescript
interface SplitButtonItem {
  label: string;
  icon?: LucideIconData;
  command?: () => void;
  disabled?: boolean;
  visible?: boolean;
  separator?: boolean;
}
\`\`\`

### Events
| Event | Description |
|-------|-------------|
| \`onClick\` | Callback when main button is clicked |
| \`onDropdownClick\` | Callback when dropdown toggle is clicked |
| \`onItemClick\` | Callback when a menu item is clicked |
        `,
      },
    },
  },
  argTypes: {
    // Configuration
    label: {
      control: 'text',
      description: 'Label text for the main button.',
      table: {
        type: { summary: 'string' },
        category: 'Configuration',
      },
    },
    iconPos: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to the label.',
      table: {
        type: { summary: 'left | right' },
        defaultValue: { summary: 'left' },
        category: 'Configuration',
      },
    },

    // Appearance
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Visual style variant of the button.',
      table: {
        type: { summary: 'SplitButtonVariant' },
        defaultValue: { summary: 'primary' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button.',
      table: {
        type: { summary: 'SplitButtonSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    outlined: {
      control: 'boolean',
      description: 'When true, displays outlined style.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },
    text: {
      control: 'boolean',
      description: 'When true, displays text-only style without background.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },
    raised: {
      control: 'boolean',
      description: 'When true, adds shadow for raised effect.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },
    rounded: {
      control: 'boolean',
      description: 'When true, applies fully rounded corners.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'When true, the button is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },

    // Accessibility
    dropdownAriaLabel: {
      control: 'text',
      description: 'ARIA label for the dropdown toggle button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'More options' },
        category: 'Accessibility',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiSplitButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Save',
    items: saveActions,
  },
};

export const WithIcon: Story = {
  render: () => ({
    props: {
      saveIcon: Save,
      items: saveActions,
    },
    template: `
      <ui-split-button label="Save" [icon]="saveIcon" [items]="items"></ui-split-button>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    props: { items: shareActions },
    template: `
      <div class="flex flex-wrap gap-4">
        <ui-split-button label="Primary" variant="primary" [items]="items"></ui-split-button>
        <ui-split-button label="Secondary" variant="secondary" [items]="items"></ui-split-button>
        <ui-split-button label="Success" variant="success" [items]="items"></ui-split-button>
        <ui-split-button label="Warning" variant="warning" [items]="items"></ui-split-button>
        <ui-split-button label="Danger" variant="danger" [items]="items"></ui-split-button>
        <ui-split-button label="Info" variant="info" [items]="items"></ui-split-button>
      </div>
    `,
  }),
};

export const Outlined: Story = {
  render: () => ({
    props: { items: shareActions },
    template: `
      <div class="flex flex-wrap gap-4">
        <ui-split-button label="Primary" variant="primary" [outlined]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Secondary" variant="secondary" [outlined]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Success" variant="success" [outlined]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Danger" variant="danger" [outlined]="true" [items]="items"></ui-split-button>
      </div>
    `,
  }),
};

export const Text: Story = {
  render: () => ({
    props: { items: shareActions },
    template: `
      <div class="flex flex-wrap gap-4">
        <ui-split-button label="Primary" variant="primary" [text]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Secondary" variant="secondary" [text]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Success" variant="success" [text]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Danger" variant="danger" [text]="true" [items]="items"></ui-split-button>
      </div>
    `,
  }),
};

export const Raised: Story = {
  render: () => ({
    props: { items: shareActions },
    template: `
      <div class="flex flex-wrap gap-4">
        <ui-split-button label="Primary" variant="primary" [raised]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Success" variant="success" [raised]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Danger" variant="danger" [raised]="true" [items]="items"></ui-split-button>
      </div>
    `,
  }),
};

export const Rounded: Story = {
  render: () => ({
    props: { items: shareActions },
    template: `
      <div class="flex flex-wrap gap-4">
        <ui-split-button label="Primary" variant="primary" [rounded]="true" [items]="items"></ui-split-button>
        <ui-split-button label="Outlined" variant="primary" [rounded]="true" [outlined]="true" [items]="items"></ui-split-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { items: shareActions },
    template: `
      <div class="flex items-center gap-4">
        <ui-split-button label="Small" size="sm" [items]="items"></ui-split-button>
        <ui-split-button label="Medium" size="md" [items]="items"></ui-split-button>
        <ui-split-button label="Large" size="lg" [items]="items"></ui-split-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Save',
    items: saveActions,
    disabled: true,
  },
};

export const DisabledItems: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Edit', icon: Edit },
        { label: 'Delete', icon: Trash2, disabled: true },
        { separator: true, label: '' },
        { label: 'Share', icon: Share2 },
        { label: 'Print', icon: Printer, disabled: true },
      ],
    },
    template: `
      <ui-split-button label="Actions" [items]="items"></ui-split-button>
    `,
  }),
};

export const WithSeparators: Story = {
  render: () => ({
    props: {
      saveIcon: Save,
      items: [
        { label: 'Save', icon: Save },
        { label: 'Save As...', icon: Copy },
        { separator: true, label: '' },
        { label: 'Export as PDF', icon: FileText },
        { label: 'Export as Word', icon: FileText },
        { separator: true, label: '' },
        { label: 'Print', icon: Printer },
      ],
    },
    template: `
      <ui-split-button label="Save" [icon]="saveIcon" [items]="items"></ui-split-button>
    `,
  }),
};

export const IconRight: Story = {
  render: () => ({
    props: {
      uploadIcon: Upload,
      items: [
        { label: 'Upload Image', icon: Upload },
        { label: 'Upload Document', icon: FileText },
      ],
    },
    template: `
      <ui-split-button label="Upload" [icon]="uploadIcon" iconPos="right" [items]="items"></ui-split-button>
    `,
  }),
};

export const DocumentEditor: Story = {
  render: () => ({
    props: {
      saveIcon: Save,
      items: [
        { label: 'Save', icon: Save, command: () => alert('Saved!') },
        { label: 'Save As...', icon: Copy },
        { separator: true, label: '' },
        { label: 'Export as PDF', icon: FileText },
        { label: 'Print', icon: Printer },
        { separator: true, label: '' },
        { label: 'Delete', icon: Trash2, disabled: true },
      ],
    },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Document.docx</h3>
          <ui-split-button label="Save" [icon]="saveIcon" [items]="items" variant="success"></ui-split-button>
        </div>
        <div class="h-48 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center">
          <p class="text-gray-400">Document content area</p>
        </div>
      </div>
    `,
  }),
};

export const ActionBar: Story = {
  render: () => ({
    props: {
      editIcon: Edit,
      shareIcon: Share2,
      editItems: [
        { label: 'Edit', icon: Edit },
        { label: 'Duplicate', icon: Copy },
        { separator: true, label: '' },
        { label: 'Delete', icon: Trash2 },
      ],
      shareItems: [
        { label: 'Share via Email', icon: Mail },
        { label: 'Copy Link', icon: Copy },
        { label: 'Download', icon: Download },
      ],
    },
    template: `
      <div class="flex gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <ui-split-button label="Edit" [icon]="editIcon" [items]="editItems" variant="primary"></ui-split-button>
        <ui-split-button label="Share" [icon]="shareIcon" [items]="shareItems" variant="secondary" [outlined]="true"></ui-split-button>
      </div>
    `,
  }),
};

export const CompactToolbar: Story = {
  render: () => ({
    props: {
      saveIcon: Save,
      items: saveActions,
    },
    template: `
      <div class="inline-flex items-center gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <ui-split-button label="Save" [icon]="saveIcon" [items]="items" size="sm" [text]="true"></ui-split-button>
      </div>
    `,
  }),
};
