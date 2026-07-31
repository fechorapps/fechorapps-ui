import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiWidgetTableComponent } from './widget-table.component';

const meta: Meta<UiWidgetTableComponent> = {
  title: 'Layout/WidgetDashboard/WidgetTable',
  component: UiWidgetTableComponent,
  decorators: [moduleMetadata({ imports: [UiWidgetTableComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiWidgetTableComponent>;

export const WithRows: Story = {
  name: 'With Rows',
  args: {
    columns: [
      { key: 'name', label: 'Contrato' },
      { key: 'status', label: 'Estatus' },
      { key: 'amount', label: 'Monto' },
    ],
    rows: [
      { name: 'SEDENA-DN8-045-2024', status: 'Vigente', amount: 4500000 },
      { name: 'SEDENA-DN8-052-2024', status: 'Finiquitado', amount: 2100000 },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 480px; border: 1px solid hsl(var(--border)); border-radius: 8px;">
        <ui-widget-table [columns]="columns" [rows]="rows"></ui-widget-table>
      </div>
    `,
  }),
};

export const Empty: Story = {
  name: 'Empty',
  args: {
    columns: [{ key: 'name', label: 'Contrato' }],
    rows: [],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 480px; border: 1px solid hsl(var(--border)); border-radius: 8px;">
        <ui-widget-table [columns]="columns" [rows]="rows"></ui-widget-table>
      </div>
    `,
  }),
};
