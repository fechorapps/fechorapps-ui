import type { Meta, StoryObj } from '@storybook/angular';

import { UiKnobComponent } from './knob.component';

const meta: Meta<UiKnobComponent> = {
  title: 'Form/Knob',
  component: UiKnobComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Knob** is a circular dial-like control for selecting numeric values visually.

## API Reference

Based on [PrimeNG Knob](https://primeng.org/knob)

### Features
- Circular arc display with customizable range
- Mouse drag, wheel scroll and keyboard support
- Custom value display templates
- Customizable colors for value and range arcs
- Multiple sizes from small to extra large

### Keyboard Support
| Key | Description |
|-----|-------------|
| \`Arrow Up/Right\` | Increment value by step |
| \`Arrow Down/Left\` | Decrement value by step |
| \`Home\` | Set to minimum value |
| \`End\` | Set to maximum value |
| \`Page Up\` | Increment by step × 10 |
| \`Page Down\` | Decrement by step × 10 |

### Events
| Event | Description |
|-------|-------------|
| \`onChange\` | Callback when value changes |
        `,
      },
    },
  },
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the knob component.',
      table: {
        type: { summary: 'KnobSize' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    strokeWidth: {
      control: { type: 'number', min: 4, max: 30 },
      description: 'Width of the circular stroke in pixels.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '14' },
        category: 'Appearance',
      },
    },
    valueColor: {
      control: 'color',
      description: 'Color of the value arc.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--color-primary-500)' },
        category: 'Appearance',
      },
    },
    rangeColor: {
      control: 'color',
      description: 'Color of the background range arc.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--color-gray-200)' },
        category: 'Appearance',
      },
    },

    // Configuration
    min: {
      control: { type: 'number' },
      description: 'Minimum boundary value.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Configuration',
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum boundary value.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
        category: 'Configuration',
      },
    },
    step: {
      control: { type: 'number', min: 0.1 },
      description: 'Step factor to increment/decrement the value.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Configuration',
      },
    },
    showValue: {
      control: 'boolean',
      description: 'When true, displays the current value in the center.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },
    valueTemplate: {
      control: 'text',
      description: 'Template string for value display. Use {value} as placeholder.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '{value}' },
        category: 'Configuration',
      },
    },

    // Labels
    label: {
      control: 'text',
      description: 'Label text displayed below the knob.',
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
    readonly: {
      control: 'boolean',
      description: 'When true, the value cannot be changed but the component can be focused.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiKnobComponent>;

export const Default: Story = {
  args: {
    value: 50,
    label: 'Volume',
  },
};

export const WithPercentage: Story = {
  args: {
    value: 75,
    valueTemplate: '{value}%',
    label: 'Progress',
  },
};

export const CustomRange: Story = {
  args: {
    value: 25,
    min: 0,
    max: 50,
    step: 5,
    label: 'Temperature',
    valueTemplate: '{value}°C',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-end gap-8">
        <ui-knob size="sm" [value]="30" label="Small"></ui-knob>
        <ui-knob size="md" [value]="50" label="Medium"></ui-knob>
        <ui-knob size="lg" [value]="70" label="Large"></ui-knob>
        <ui-knob size="xl" [value]="90" label="XL"></ui-knob>
      </div>
    `,
  }),
};

export const CustomColors: Story = {
  render: () => ({
    template: `
      <div class="flex items-end gap-8">
        <ui-knob [value]="25" valueColor="#ef4444" label="Red"></ui-knob>
        <ui-knob [value]="50" valueColor="#22c55e" label="Green"></ui-knob>
        <ui-knob [value]="75" valueColor="#f59e0b" label="Orange"></ui-knob>
        <ui-knob [value]="100" valueColor="#8b5cf6" label="Purple"></ui-knob>
      </div>
    `,
  }),
};

export const WithoutValue: Story = {
  args: {
    value: 60,
    showValue: false,
    label: 'Balance',
  },
};

export const Disabled: Story = {
  args: {
    value: 50,
    disabled: true,
    label: 'Disabled',
  },
};

export const Readonly: Story = {
  args: {
    value: 75,
    readonly: true,
    label: 'Readonly',
  },
};

export const FineTuning: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 0.5,
    label: 'Fine Control',
    valueTemplate: '{value}',
  },
};

export const AudioMixer: Story = {
  render: () => ({
    template: `
      <div class="p-6 bg-gray-900 rounded-lg inline-block">
        <h3 class="text-white text-lg font-medium mb-6 text-center">Audio Mixer</h3>
        <div class="flex gap-8">
          <div class="flex flex-col items-center gap-2">
            <ui-knob
              size="md"
              [value]="75"
              valueColor="#22c55e"
              rangeColor="#374151"
              valueTemplate="{value}"
            ></ui-knob>
            <span class="text-gray-400 text-sm">Master</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ui-knob
              size="md"
              [value]="60"
              valueColor="#3b82f6"
              rangeColor="#374151"
              valueTemplate="{value}"
            ></ui-knob>
            <span class="text-gray-400 text-sm">Treble</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ui-knob
              size="md"
              [value]="45"
              valueColor="#f59e0b"
              rangeColor="#374151"
              valueTemplate="{value}"
            ></ui-knob>
            <span class="text-gray-400 text-sm">Bass</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ui-knob
              size="md"
              [value]="50"
              valueColor="#ec4899"
              rangeColor="#374151"
              valueTemplate="{value}"
            ></ui-knob>
            <span class="text-gray-400 text-sm">Pan</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ProgressIndicator: Story = {
  render: () => ({
    template: `
      <div class="flex gap-8">
        <div class="text-center">
          <ui-knob
            size="lg"
            [value]="85"
            [readonly]="true"
            valueTemplate="{value}%"
            valueColor="#22c55e"
          ></ui-knob>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Storage Used</p>
        </div>
        <div class="text-center">
          <ui-knob
            size="lg"
            [value]="45"
            [readonly]="true"
            valueTemplate="{value}%"
            valueColor="#3b82f6"
          ></ui-knob>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">CPU Usage</p>
        </div>
        <div class="text-center">
          <ui-knob
            size="lg"
            [value]="68"
            [readonly]="true"
            valueTemplate="{value}%"
            valueColor="#f59e0b"
          ></ui-knob>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Memory</p>
        </div>
      </div>
    `,
  }),
};

export const ThermostatControl: Story = {
  render: () => ({
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 inline-block">
        <h3 class="text-gray-900 dark:text-white text-lg font-medium mb-4 text-center">Thermostat</h3>
        <ui-knob
          size="xl"
          [value]="22"
          [min]="16"
          [max]="30"
          valueTemplate="{value}°C"
          valueColor="#ef4444"
          [strokeWidth]="18"
        ></ui-knob>
        <div class="mt-4 flex justify-center gap-4">
          <span class="text-xs text-gray-500">Min: 16°C</span>
          <span class="text-xs text-gray-500">Max: 30°C</span>
        </div>
      </div>
    `,
  }),
};
