import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiWidgetDashboardComponent } from './widget-dashboard.component';
import type { WidgetConfig } from './widget-types';

const DEMO_ITEMS: WidgetConfig[] = [
  {
    id: 'budget-ceiling',
    label: 'Techo Presupuestal',
    x: 0, y: 0, w: 4, h: 2,
    widgetKey: 'BudgetCeiling',
    widgetType: 'kpi',
    title: 'Techo Presupuestal',
    data: { value: 120000000, format: 'currency', currency: 'MXN' },
  },
  {
    id: 'committed-works',
    label: 'Comprometido Obras',
    x: 4, y: 0, w: 4, h: 2,
    widgetKey: 'CommittedWorks',
    widgetType: 'kpi',
    title: 'Comprometido Obras',
    data: { value: 98050000, format: 'currency', currency: 'MXN' },
  },
  {
    id: 'contracts-by-status',
    label: 'Contratos por Estatus',
    x: 0, y: 2, w: 8, h: 4,
    widgetKey: 'ContractsByStatus',
    widgetType: 'barChart',
    title: 'Contratos por Estatus',
    data: {
      labels: ['Vigente', 'Finiquitado', 'Suspendido'],
      datasets: [{ label: 'Contratos', data: [12, 5, 1] }],
    },
  },
];

const meta: Meta<UiWidgetDashboardComponent> = {
  title: 'Layout/WidgetDashboard/Dashboard',
  component: UiWidgetDashboardComponent,
  decorators: [moduleMetadata({ imports: [UiWidgetDashboardComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiWidgetDashboardComponent>;

/** Drag a widget — layoutChange logs to the browser console. */
export const Default: Story = {
  name: 'Default — Kpi + BarChart',
  args: { items: DEMO_ITEMS },
  render: (args) => ({
    props: { ...args, onLayoutChange: (items: WidgetConfig[]) => console.log('layoutChange', items) },
    template: `
      <div style="width: 100%; padding: 16px; background: hsl(var(--background));">
        <ui-widget-dashboard [items]="items" (layoutChange)="onLayoutChange($event)"></ui-widget-dashboard>
      </div>
    `,
  }),
};
