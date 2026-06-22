import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiGaugeChartComponent } from './gauge-chart.component';

const meta: Meta<UiGaugeChartComponent> = {
  title: 'Dashboard/GaugeChart',
  component: UiGaugeChartComponent,
  decorators: [moduleMetadata({ imports: [UiGaugeChartComponent] })],
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number' } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    size: { control: { type: 'number' } },
  },
};
export default meta;
type Story = StoryObj<UiGaugeChartComponent>;

export const Default: Story = {
  args: {
    value: 75,
    min: 0,
    max: 100,
    label: 'Performance',
    unit: '%',
    size: 200,
    thresholds: [],
  },
};

export const WithThresholds: Story = {
  args: {
    value: 68,
    min: 0,
    max: 100,
    label: 'CPU Usage',
    unit: '%',
    size: 200,
    thresholds: [
      { value: 0, color: '#22c55e' },
      { value: 60, color: '#f59e0b' },
      { value: 80, color: '#ef4444' },
    ],
  },
};

export const SpeedoStyle: Story = {
  args: {
    value: 120,
    min: 0,
    max: 200,
    label: 'Speed',
    unit: ' km/h',
    size: 240,
    thresholds: [
      { value: 0, color: '#22c55e' },
      { value: 100, color: '#f59e0b' },
      { value: 150, color: '#ef4444' },
    ],
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    min: 0,
    max: 100,
    label: 'No Data',
    unit: '%',
    size: 200,
    thresholds: [],
  },
};
