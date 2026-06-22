import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiMetricGridComponent } from './metric-grid.component';
import { UiStatCardComponent } from '../stat-card/stat-card.component';

const meta: Meta<UiMetricGridComponent> = {
  title: 'Dashboard/MetricGrid',
  component: UiMetricGridComponent,
  decorators: [moduleMetadata({ imports: [UiMetricGridComponent, UiStatCardComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiMetricGridComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <ui-metric-grid [columns]="3" gap="md">
        <ui-stat-card label="Revenue" value="$48,295" trend="up" trendValue="+12%"></ui-stat-card>
        <ui-stat-card label="Users" value="1,234" trend="up" trendValue="+5%"></ui-stat-card>
        <ui-stat-card label="Orders" value="892" trend="down" trendValue="-3%"></ui-stat-card>
      </ui-metric-grid>
    `,
    imports: [UiMetricGridComponent, UiStatCardComponent],
  }),
};

export const TwoColumns: Story = {
  render: () => ({
    template: `
      <ui-metric-grid [columns]="2" gap="lg">
        <ui-stat-card label="Revenue" value="$48,295"></ui-stat-card>
        <ui-stat-card label="Users" value="1,234"></ui-stat-card>
      </ui-metric-grid>
    `,
    imports: [UiMetricGridComponent, UiStatCardComponent],
  }),
};
