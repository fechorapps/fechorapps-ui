import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiPivotTableComponent, PivotConfig } from './pivot-table.component';

const salesData: Record<string, unknown>[] = [
  { region: 'North', product: 'Widget A', sales: 120, units: 10 },
  { region: 'North', product: 'Widget B', sales: 200, units: 15 },
  { region: 'South', product: 'Widget A', sales: 80, units: 7 },
  { region: 'South', product: 'Widget B', sales: 150, units: 12 },
  { region: 'East', product: 'Widget A', sales: 95, units: 8 },
  { region: 'East', product: 'Widget B', sales: 175, units: 14 },
  { region: 'West', product: 'Widget A', sales: 110, units: 9 },
  { region: 'West', product: 'Widget B', sales: 220, units: 18 },
];

const defaultConfig: PivotConfig = {
  rowField: 'region',
  colField: 'product',
  valueField: 'sales',
  aggregation: 'sum',
};

const meta: Meta<UiPivotTableComponent> = {
  title: 'Data/PivotTable',
  component: UiPivotTableComponent,
  decorators: [moduleMetadata({ imports: [UiPivotTableComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiPivotTableComponent>;

export const Default: Story = {
  args: {
    data: salesData,
    config: defaultConfig,
  },
};

export const AggregationCount: Story = {
  args: {
    data: salesData,
    config: { ...defaultConfig, aggregation: 'count' },
  },
};

export const AggregationAvg: Story = {
  args: {
    data: salesData,
    config: { ...defaultConfig, aggregation: 'avg' },
  },
};

export const Loading: Story = {
  args: {
    data: [],
    config: defaultConfig,
    loading: true,
  },
};
