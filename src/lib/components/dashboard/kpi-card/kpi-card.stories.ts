import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiKpiCardComponent } from './kpi-card.component';

const meta: Meta<UiKpiCardComponent> = {
  title: 'Dashboard/KpiCard',
  component: UiKpiCardComponent,
  decorators: [moduleMetadata({ imports: [UiKpiCardComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiKpiCardComponent>;

export const Default: Story = {
  args: { label: 'Monthly Revenue', value: 48295, format: 'currency' },
};

export const WithTarget: Story = {
  args: { label: 'Sales Goal', value: 75000, target: 100000, format: 'currency' },
};

export const AllFormats: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-4 p-4">
        <ui-kpi-card label="Number" [value]="12345" format="number"></ui-kpi-card>
        <ui-kpi-card label="Currency" [value]="9876.50" format="currency" currency="USD"></ui-kpi-card>
        <ui-kpi-card label="Percent" [value]="87.3" format="percent" [target]="100"></ui-kpi-card>
      </div>
    `,
    imports: [UiKpiCardComponent],
  }),
};
