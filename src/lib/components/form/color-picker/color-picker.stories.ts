import type { Meta, StoryObj } from '@storybook/angular';

import { UiColorPickerComponent } from './color-picker.component';

const meta: Meta<UiColorPickerComponent> = {
  title: 'Form/ColorPicker',
  component: UiColorPickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**ColorPicker** is an input component to select a color with various formats and presets.

## API Reference

Based on [PrimeNG ColorPicker](https://primeng.org/colorpicker)

### Features
- Multiple color formats (HEX, RGB, HSL)
- Preset color palettes
- Inline or popup mode
- Custom preset colors
- Color input field for manual entry

### Events
| Event | Description |
|-------|-------------|
| \`colorChange\` | Callback when color value changes |
        `,
      },
    },
  },
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Visual style variant of the trigger.',
      table: {
        type: { summary: 'ColorPickerVariant' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the color picker trigger.',
      table: {
        type: { summary: 'ColorPickerSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    inline: {
      control: 'boolean',
      description: 'When true, displays the picker inline instead of as a popup.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },

    // Configuration
    format: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
      description: 'Color format for the output value.',
      table: {
        type: { summary: 'ColorFormat' },
        defaultValue: { summary: 'hex' },
        category: 'Configuration',
      },
    },
    showInput: {
      control: 'boolean',
      description: 'When true, shows a text input for manual color entry.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },
    showPresets: {
      control: 'boolean',
      description: 'When true, displays preset color swatches.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },

    // Labels
    label: {
      control: 'text',
      description: 'Label text displayed above the color picker.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below the color picker.',
      table: {
        type: { summary: 'string' },
        category: 'Labels',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'When true, the component cannot be edited and focused.',
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
type Story = StoryObj<UiColorPickerComponent>;

export const Default: Story = {
  args: {
    label: 'Color',
    value: '#3b82f6',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Brand Color',
    value: '#ef4444',
    helpText: 'Select your brand color',
  },
};

export const RGBFormat: Story = {
  args: {
    label: 'Color (RGB)',
    value: '#22c55e',
    format: 'rgb',
  },
};

export const HSLFormat: Story = {
  args: {
    label: 'Color (HSL)',
    value: '#a855f7',
    format: 'hsl',
  },
};

export const Inline: Story = {
  args: {
    label: 'Pick a Color',
    inline: true,
    value: '#3b82f6',
  },
};

export const NoPresets: Story = {
  args: {
    label: 'Color',
    showPresets: false,
    value: '#3b82f6',
  },
};

export const NoInput: Story = {
  args: {
    label: 'Color',
    showInput: false,
    value: '#3b82f6',
  },
};

export const CustomPresets: Story = {
  args: {
    label: 'Theme Color',
    value: '#1e3a5f',
    presets: [
      { name: 'Primary', value: '#1e3a5f' },
      { name: 'Secondary', value: '#2d4a6f' },
      { name: 'Accent', value: '#00b4d8' },
      { name: 'Success', value: '#06d6a0' },
      { name: 'Warning', value: '#ffd166' },
      { name: 'Error', value: '#ef476f' },
    ],
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-color-picker variant="default" label="Default" value="#3b82f6"></ui-color-picker>
        <ui-color-picker variant="filled" label="Filled" value="#22c55e"></ui-color-picker>
        <ui-color-picker variant="outlined" label="Outlined" value="#ef4444"></ui-color-picker>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-color-picker size="sm" label="Small" value="#3b82f6"></ui-color-picker>
        <ui-color-picker size="md" label="Medium" value="#22c55e"></ui-color-picker>
        <ui-color-picker size="lg" label="Large" value="#ef4444"></ui-color-picker>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Color',
    value: '#6b7280',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Color',
    value: '#3b82f6',
    invalid: true,
    helpText: 'Please select a valid color',
  },
};

export const ThemeCustomizer: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme Customization</h3>
        <div class="space-y-4">
          <ui-color-picker label="Primary Color" value="#3b82f6"></ui-color-picker>
          <ui-color-picker label="Secondary Color" value="#6b7280"></ui-color-picker>
          <ui-color-picker label="Accent Color" value="#f59e0b"></ui-color-picker>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button class="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Apply Theme
          </button>
        </div>
      </div>
    `,
  }),
};

export const DesignSystem: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-lg">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Design System Colors</h3>
        <div class="grid grid-cols-2 gap-4">
          <ui-color-picker
            size="sm"
            label="Background"
            value="#ffffff"
            [presets]="[
              { name: 'White', value: '#ffffff' },
              { name: 'Light Gray', value: '#f9fafb' },
              { name: 'Dark', value: '#111827' }
            ]"
          ></ui-color-picker>
          <ui-color-picker
            size="sm"
            label="Text"
            value="#111827"
            [presets]="[
              { name: 'Black', value: '#111827' },
              { name: 'Gray', value: '#6b7280' },
              { name: 'White', value: '#ffffff' }
            ]"
          ></ui-color-picker>
          <ui-color-picker
            size="sm"
            label="Border"
            value="#e5e7eb"
            [presets]="[
              { name: 'Light', value: '#e5e7eb' },
              { name: 'Medium', value: '#d1d5db' },
              { name: 'Dark', value: '#374151' }
            ]"
          ></ui-color-picker>
          <ui-color-picker
            size="sm"
            label="Focus Ring"
            value="#3b82f6"
            [presets]="[
              { name: 'Blue', value: '#3b82f6' },
              { name: 'Purple', value: '#8b5cf6' },
              { name: 'Green', value: '#10b981' }
            ]"
          ></ui-color-picker>
        </div>
      </div>
    `,
  }),
};
