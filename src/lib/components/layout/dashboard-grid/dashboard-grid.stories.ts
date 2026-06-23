import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiDashboardGridComponent, GridItem } from './dashboard-grid.component';

const DEFAULT_ITEMS: GridItem[] = [
  { id: 'Sales', x: 0, y: 0, w: 4, h: 2 },
  { id: 'Revenue', x: 4, y: 0, w: 4, h: 2 },
  { id: 'Users', x: 8, y: 0, w: 4, h: 2 },
  { id: 'Activity', x: 0, y: 2, w: 8, h: 3 },
];

const meta: Meta<UiDashboardGridComponent> = {
  title: 'Layout/DashboardGrid',
  component: UiDashboardGridComponent,
  decorators: [moduleMetadata({ imports: [UiDashboardGridComponent] })],
  tags: ['autodocs'],
  argTypes: {
    columns: { control: { type: 'number', min: 1, max: 24, step: 1 } },
    rowHeight: { control: { type: 'number', min: 40, max: 200, step: 8 } },
    gap: { control: { type: 'number', min: 0, max: 32, step: 4 } },
    editable: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
  args: {
    columns: 12,
    rowHeight: 80,
    gap: 16,
    editable: true,
    compact: true,
    items: DEFAULT_ITEMS,
  },
};

export default meta;
type Story = StoryObj<UiDashboardGridComponent>;

/** Four draggable widgets in a standard 12-column grid. */
export const Default4Items: Story = {
  name: 'Default — 4 Items',
  args: {
    items: DEFAULT_ITEMS,
    editable: true,
    compact: true,
  },
  render: args => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 16px; background: hsl(var(--background));">
        <ui-dashboard-grid
          [items]="items"
          [columns]="columns"
          [rowHeight]="rowHeight"
          [gap]="gap"
          [editable]="editable"
          [compact]="compact">
        </ui-dashboard-grid>
      </div>
    `,
  }),
};

/** Grid is locked — no items can be dragged. */
export const NonEditable: Story = {
  name: 'Non-Editable',
  args: {
    items: DEFAULT_ITEMS,
    editable: false,
    compact: false,
  },
  render: args => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 16px; background: hsl(var(--background));">
        <ui-dashboard-grid
          [items]="items"
          [columns]="columns"
          [rowHeight]="rowHeight"
          [gap]="gap"
          [editable]="editable"
          [compact]="compact">
        </ui-dashboard-grid>
      </div>
    `,
  }),
};

/** Compact mode pushes items upward after every drop. */
export const CompactMode: Story = {
  name: 'Compact Mode',
  args: {
    items: [
      { id: 'Widget A', x: 0, y: 0, w: 6, h: 2 },
      { id: 'Widget B', x: 6, y: 3, w: 6, h: 2 },
      { id: 'Widget C', x: 0, y: 5, w: 12, h: 2 },
    ],
    editable: true,
    compact: true,
  },
  render: args => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 16px; background: hsl(var(--background));">
        <p style="margin-bottom: 12px; font-size: 13px; color: hsl(var(--muted-foreground));">
          Drag a widget — compact mode will close the gap automatically.
        </p>
        <ui-dashboard-grid
          [items]="items"
          [columns]="columns"
          [rowHeight]="rowHeight"
          [gap]="gap"
          [editable]="editable"
          [compact]="compact">
        </ui-dashboard-grid>
      </div>
    `,
  }),
};

/** One static item that cannot be moved. */
export const WithStaticItem: Story = {
  name: 'With Static Item',
  args: {
    items: [
      { id: 'Header (static)', x: 0, y: 0, w: 12, h: 1, static: true },
      { id: 'Panel A', x: 0, y: 1, w: 6, h: 3 },
      { id: 'Panel B', x: 6, y: 1, w: 6, h: 3 },
    ],
    editable: true,
    compact: true,
  },
  render: args => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 16px; background: hsl(var(--background));">
        <p style="margin-bottom: 12px; font-size: 13px; color: hsl(var(--muted-foreground));">
          The "Header" row is static and cannot be dragged. Other panels are freely moveable.
        </p>
        <ui-dashboard-grid
          [items]="items"
          [columns]="columns"
          [rowHeight]="rowHeight"
          [gap]="gap"
          [editable]="editable"
          [compact]="compact">
        </ui-dashboard-grid>
      </div>
    `,
  }),
};
