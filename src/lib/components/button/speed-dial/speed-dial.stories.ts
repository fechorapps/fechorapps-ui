import {
  Copy,
  Edit,
  Facebook,
  Github,
  Link,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Printer,
  Save,
  Share2,
  Trash2,
  Twitter,
  Upload,
} from 'lucide-angular';

import type { Meta, StoryObj } from '@storybook/angular';

import { UiSpeedDialComponent, SpeedDialItem } from './speed-dial.component';

const basicActions: SpeedDialItem[] = [
  { icon: Edit, label: 'Edit', command: () => console.log('Edit clicked') },
  { icon: Copy, label: 'Copy', command: () => console.log('Copy clicked') },
  { icon: Save, label: 'Save', command: () => console.log('Save clicked') },
  { icon: Trash2, label: 'Delete', color: 'danger', command: () => console.log('Delete clicked') },
];

const shareActions: SpeedDialItem[] = [
  { icon: Facebook, label: 'Facebook', color: 'info' },
  { icon: Twitter, label: 'Twitter', color: 'info' },
  { icon: Linkedin, label: 'LinkedIn', color: 'info' },
  { icon: Link, label: 'Copy Link', color: 'secondary' },
];

const contactActions: SpeedDialItem[] = [
  { icon: Phone, label: 'Call', color: 'success' },
  { icon: Mail, label: 'Email', color: 'primary' },
  { icon: MessageCircle, label: 'Chat', color: 'info' },
];

const meta: Meta<UiSpeedDialComponent> = {
  title: 'Button/SpeedDial',
  component: UiSpeedDialComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**SpeedDial** is a floating action button that reveals multiple action buttons on click.

## API Reference

Based on [PrimeNG SpeedDial](https://primeng.org/speeddial)

### Features
- Multiple direction layouts (up, down, left, right)
- Circular and semi-circular arrangements
- Custom icons and colors per action
- Mask overlay option
- Tooltip labels for actions
- Keyboard navigation support

### Direction Options
| Direction | Description |
|-----------|-------------|
| \`up\` | Items appear above the button |
| \`down\` | Items appear below the button |
| \`left\` | Items appear to the left |
| \`right\` | Items appear to the right |
| \`up-left\` | Items appear diagonally up-left |
| \`up-right\` | Items appear diagonally up-right |
| \`down-left\` | Items appear diagonally down-left |
| \`down-right\` | Items appear diagonally down-right |
| \`circle\` | Items arranged in a full circle |
| \`semi-circle-*\` | Items in half circle (up/down/left/right) |

### SpeedDialItem Interface
\`\`\`typescript
interface SpeedDialItem {
  icon: LucideIconData;
  label?: string;
  command?: () => void;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}
\`\`\`

### Events
| Event | Description |
|-------|-------------|
| \`onVisibleChange\` | Callback when visibility changes |
| \`onShow\` | Callback when menu opens |
| \`onHide\` | Callback when menu closes |
| \`onItemClick\` | Callback when an item is clicked |
        `,
      },
    },
  },
  argTypes: {
    // Configuration
    direction: {
      control: 'select',
      options: [
        'up',
        'down',
        'left',
        'right',
        'up-left',
        'up-right',
        'down-left',
        'down-right',
        'circle',
        'semi-circle-up',
        'semi-circle-down',
        'semi-circle-left',
        'semi-circle-right',
      ],
      description: 'Direction in which the action buttons appear.',
      table: {
        type: { summary: 'SpeedDialDirection' },
        defaultValue: { summary: 'up' },
        category: 'Configuration',
      },
    },
    radius: {
      control: { type: 'number', min: 40, max: 200 },
      description: 'Radius in pixels for circular layouts.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '80' },
        category: 'Configuration',
      },
    },
    mask: {
      control: 'boolean',
      description: 'When true, displays a dark overlay behind the menu.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Configuration',
      },
    },
    hideOnClickOutside: {
      control: 'boolean',
      description: 'When true, closes the menu when clicking outside.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },
    rotateAnimation: {
      control: 'boolean',
      description: 'When true, rotates the trigger icon 45 degrees when open.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the speed dial buttons.',
      table: {
        type: { summary: 'SpeedDialSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'When true, the speed dial is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },

    // Accessibility
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for the trigger button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Speed Dial' },
        category: 'Accessibility',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiSpeedDialComponent>;

export const Default: Story = {
  args: {
    model: basicActions,
    direction: 'up',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-64 flex items-end justify-center pb-4">
        <ui-speed-dial [model]="model" [direction]="direction"></ui-speed-dial>
      </div>
    `,
  }),
};

export const DirectionUp: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="h-64 flex items-end justify-center pb-4">
        <ui-speed-dial [model]="model" direction="up"></ui-speed-dial>
      </div>
    `,
  }),
};

export const DirectionDown: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="h-64 flex items-start justify-center pt-4">
        <ui-speed-dial [model]="model" direction="down"></ui-speed-dial>
      </div>
    `,
  }),
};

export const DirectionLeft: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="h-32 flex items-center justify-end pr-4">
        <ui-speed-dial [model]="model" direction="left"></ui-speed-dial>
      </div>
    `,
  }),
};

export const DirectionRight: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="h-32 flex items-center justify-start pl-4">
        <ui-speed-dial [model]="model" direction="right"></ui-speed-dial>
      </div>
    `,
  }),
};

export const Circle: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="h-64 flex items-center justify-center">
        <ui-speed-dial [model]="model" direction="circle" [radius]="80"></ui-speed-dial>
      </div>
    `,
  }),
};

export const SemiCircleUp: Story = {
  render: () => ({
    props: { model: contactActions },
    template: `
      <div class="h-48 flex items-end justify-center pb-4">
        <ui-speed-dial [model]="model" direction="semi-circle-up" [radius]="70"></ui-speed-dial>
      </div>
    `,
  }),
};

export const SemiCircleDown: Story = {
  render: () => ({
    props: { model: contactActions },
    template: `
      <div class="h-48 flex items-start justify-center pt-4">
        <ui-speed-dial [model]="model" direction="semi-circle-down" [radius]="70"></ui-speed-dial>
      </div>
    `,
  }),
};

export const QuarterCircle: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="grid grid-cols-2 gap-8 p-8">
        <div class="h-48 flex items-end justify-end">
          <p class="absolute top-2 left-2 text-sm text-gray-500">up-left</p>
          <ui-speed-dial [model]="model" direction="up-left"></ui-speed-dial>
        </div>
        <div class="h-48 flex items-end justify-start">
          <p class="absolute top-2 right-2 text-sm text-gray-500">up-right</p>
          <ui-speed-dial [model]="model" direction="up-right"></ui-speed-dial>
        </div>
        <div class="h-48 flex items-start justify-end">
          <p class="absolute bottom-2 left-2 text-sm text-gray-500">down-left</p>
          <ui-speed-dial [model]="model" direction="down-left"></ui-speed-dial>
        </div>
        <div class="h-48 flex items-start justify-start">
          <p class="absolute bottom-2 right-2 text-sm text-gray-500">down-right</p>
          <ui-speed-dial [model]="model" direction="down-right"></ui-speed-dial>
        </div>
      </div>
    `,
  }),
};

export const WithMask: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="h-64 flex items-end justify-center pb-4">
        <ui-speed-dial [model]="model" direction="up" [mask]="true"></ui-speed-dial>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="h-64 flex items-end justify-center gap-16 pb-4">
        <div class="text-center">
          <ui-speed-dial [model]="model" direction="up" size="sm"></ui-speed-dial>
          <p class="mt-2 text-sm text-gray-500">Small</p>
        </div>
        <div class="text-center">
          <ui-speed-dial [model]="model" direction="up" size="md"></ui-speed-dial>
          <p class="mt-2 text-sm text-gray-500">Medium</p>
        </div>
        <div class="text-center">
          <ui-speed-dial [model]="model" direction="up" size="lg"></ui-speed-dial>
          <p class="mt-2 text-sm text-gray-500">Large</p>
        </div>
      </div>
    `,
  }),
};

export const ColoredActions: Story = {
  render: () => ({
    props: {
      model: [
        { icon: Plus, label: 'Add', color: 'primary' },
        { icon: Edit, label: 'Edit', color: 'info' },
        { icon: Save, label: 'Save', color: 'success' },
        { icon: Upload, label: 'Upload', color: 'warning' },
        { icon: Trash2, label: 'Delete', color: 'danger' },
      ],
    },
    template: `
      <div class="h-80 flex items-end justify-center pb-4">
        <ui-speed-dial [model]="model" direction="up"></ui-speed-dial>
      </div>
    `,
  }),
};

export const ShareMenu: Story = {
  render: () => ({
    props: {
      model: shareActions,
      shareIcon: Share2,
    },
    template: `
      <div class="h-64 flex items-end justify-center pb-4">
        <ui-speed-dial
          [model]="model"
          [icon]="shareIcon"
          direction="up"
          [rotateAnimation]="false"
        ></ui-speed-dial>
      </div>
    `,
  }),
};

export const ContactButtons: Story = {
  render: () => ({
    props: { model: contactActions },
    template: `
      <div class="h-48 flex items-center justify-center">
        <ui-speed-dial [model]="model" direction="circle" [radius]="60"></ui-speed-dial>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: { model: basicActions },
    template: `
      <div class="h-32 flex items-center justify-center">
        <ui-speed-dial [model]="model" direction="up" [disabled]="true"></ui-speed-dial>
      </div>
    `,
  }),
};

export const DisabledItems: Story = {
  render: () => ({
    props: {
      model: [
        { icon: Edit, label: 'Edit' },
        { icon: Copy, label: 'Copy', disabled: true },
        { icon: Save, label: 'Save' },
        { icon: Trash2, label: 'Delete', disabled: true, color: 'danger' },
      ],
    },
    template: `
      <div class="h-64 flex items-end justify-center pb-4">
        <ui-speed-dial [model]="model" direction="up"></ui-speed-dial>
      </div>
    `,
  }),
};

export const FloatingActionButton: Story = {
  render: () => ({
    props: {
      model: [
        { icon: Edit, label: 'New Post', color: 'primary' },
        { icon: Upload, label: 'Upload Image', color: 'info' },
        { icon: MessageCircle, label: 'New Message', color: 'success' },
      ],
    },
    template: `
      <div class="relative h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div class="p-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Content Area</h3>
          <p class="text-gray-600 dark:text-gray-400 mt-2">
            The SpeedDial is positioned at the bottom-right corner like a typical FAB.
          </p>
        </div>
        <div class="absolute bottom-4 right-4">
          <ui-speed-dial [model]="model" direction="up"></ui-speed-dial>
        </div>
      </div>
    `,
  }),
};

export const SocialShare: Story = {
  render: () => ({
    props: {
      model: [
        { icon: Facebook, label: 'Share on Facebook', color: 'info' },
        { icon: Twitter, label: 'Share on Twitter', color: 'info' },
        { icon: Linkedin, label: 'Share on LinkedIn', color: 'info' },
        { icon: Github, label: 'Share on GitHub', color: 'secondary' },
        { icon: Mail, label: 'Share via Email', color: 'danger' },
      ],
      shareIcon: Share2,
    },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Share this article</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Click the share button to see social sharing options.
        </p>
        <div class="flex justify-end">
          <ui-speed-dial
            [model]="model"
            [icon]="shareIcon"
            direction="left"
            [rotateAnimation]="false"
            size="sm"
          ></ui-speed-dial>
        </div>
      </div>
    `,
  }),
};

export const DocumentActions: Story = {
  render: () => ({
    props: {
      model: [
        { icon: Save, label: 'Save Document', color: 'success' },
        { icon: Printer, label: 'Print', color: 'secondary' },
        { icon: Share2, label: 'Share', color: 'info' },
        { icon: Copy, label: 'Duplicate', color: 'primary' },
        { icon: Trash2, label: 'Delete', color: 'danger' },
      ],
    },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Document Editor</h3>
          <ui-speed-dial [model]="model" direction="down-left" size="sm"></ui-speed-dial>
        </div>
        <div class="h-48 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center">
          <p class="text-gray-400">Document content area</p>
        </div>
      </div>
    `,
  }),
};
