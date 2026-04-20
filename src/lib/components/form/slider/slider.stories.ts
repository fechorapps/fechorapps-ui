import type { Meta, StoryObj } from '@storybook/angular';

import { UiSliderComponent } from './slider.component';

const meta: Meta<UiSliderComponent> = {
  title: 'Form/Slider',
  component: UiSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Slider size',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step value',
    },
    range: {
      control: 'boolean',
      description: 'Enable range selection',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show value tooltip on drag',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show min/max labels',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether slider is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<UiSliderComponent>;

export const Default: Story = {
  args: {
    label: 'Volume',
    value: 50,
    min: 0,
    max: 100,
  },
};

export const WithLabels: Story = {
  args: {
    label: 'Brightness',
    value: 75,
    min: 0,
    max: 100,
    showLabels: true,
  },
};

export const WithStep: Story = {
  args: {
    label: 'Temperature',
    value: 22,
    min: 16,
    max: 30,
    step: 0.5,
    helpText: 'Set temperature in °C',
  },
};

export const Range: Story = {
  args: {
    label: 'Price Range',
    value: [20, 80],
    min: 0,
    max: 100,
    range: true,
    showTooltip: true,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8 py-4">
        <ui-slider size="sm" label="Small" [value]="30" [min]="0" [max]="100"></ui-slider>
        <ui-slider size="md" label="Medium" [value]="50" [min]="0" [max]="100"></ui-slider>
        <ui-slider size="lg" label="Large" [value]="70" [min]="0" [max]="100"></ui-slider>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Locked Value',
    value: 60,
    min: 0,
    max: 100,
    disabled: true,
  },
};

export const NoTooltip: Story = {
  args: {
    label: 'Simple Slider',
    value: 40,
    min: 0,
    max: 100,
    showTooltip: false,
  },
};

export const CustomRange: Story = {
  args: {
    label: 'Year',
    value: 2020,
    min: 1990,
    max: 2024,
    step: 1,
    showLabels: true,
  },
};
