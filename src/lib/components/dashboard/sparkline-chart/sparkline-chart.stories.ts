import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiSparklineChartComponent } from './sparkline-chart.component';

const meta: Meta<UiSparklineChartComponent> = {
  title: 'Dashboard/SparklineChart',
  component: UiSparklineChartComponent,
  decorators: [moduleMetadata({ imports: [UiSparklineChartComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiSparklineChartComponent>;

export const Default: Story = {
  args: {
    data: [10, 25, 15, 40, 30, 55, 45, 60, 50, 70],
    type: 'line',
    color: '#3b82f6',
    width: 120,
    height: 40,
  },
};

export const BarType: Story = {
  args: {
    data: [10, 25, 15, 40, 30, 55, 45, 60, 50, 70],
    type: 'bar',
    color: '#10b981',
    width: 120,
    height: 40,
  },
};

export const AreaType: Story = {
  args: {
    data: [5, 20, 10, 35, 25, 50, 40, 55, 45, 65],
    type: 'area',
    color: '#8b5cf6',
    width: 150,
    height: 50,
  },
};
