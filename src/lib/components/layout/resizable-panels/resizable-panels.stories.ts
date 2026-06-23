import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiResizablePanelsComponent } from './resizable-panels.component';

const meta: Meta<UiResizablePanelsComponent> = {
  title: 'Layout/ResizablePanels',
  component: UiResizablePanelsComponent,
  decorators: [moduleMetadata({ imports: [UiResizablePanelsComponent] })],
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'radio', options: ['horizontal', 'vertical'] },
    gutterSize: { control: { type: 'number', min: 2, max: 24, step: 1 } },
  },
  args: {
    direction: 'horizontal',
    initialSizes: [50, 50],
    minSizes: [10, 10],
    gutterSize: 6,
  },
};

export default meta;
type Story = StoryObj<UiResizablePanelsComponent>;

export const Horizontal5050: Story = {
  name: 'Horizontal 50/50',
  args: {
    direction: 'horizontal',
    initialSizes: [50, 50],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-resizable-panels
          [direction]="direction"
          [initialSizes]="initialSizes"
          [minSizes]="minSizes"
          [gutterSize]="gutterSize">
          <div panel-1 class="p-4 h-full bg-card">
            <h3 class="font-semibold text-foreground">Panel 1</h3>
            <p class="text-sm text-muted-foreground mt-2">Drag the gutter to resize. Double-click to reset.</p>
          </div>
          <div panel-2 class="p-4 h-full bg-card">
            <h3 class="font-semibold text-foreground">Panel 2</h3>
            <p class="text-sm text-muted-foreground mt-2">This panel resizes as you drag the gutter.</p>
          </div>
        </ui-resizable-panels>
      </div>
    `,
  }),
};

export const Vertical3070: Story = {
  name: 'Vertical 30/70',
  args: {
    direction: 'vertical',
    initialSizes: [30, 70],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-resizable-panels
          [direction]="direction"
          [initialSizes]="initialSizes"
          [minSizes]="minSizes"
          [gutterSize]="gutterSize">
          <div panel-1 class="p-4 w-full bg-card">
            <h3 class="font-semibold text-foreground">Top Panel (30%)</h3>
            <p class="text-sm text-muted-foreground mt-2">Vertical split — drag the horizontal gutter to resize.</p>
          </div>
          <div panel-2 class="p-4 w-full bg-card">
            <h3 class="font-semibold text-foreground">Bottom Panel (70%)</h3>
            <p class="text-sm text-muted-foreground mt-2">This panel takes up the remaining vertical space.</p>
          </div>
        </ui-resizable-panels>
      </div>
    `,
  }),
};

export const WithMinSizes: Story = {
  name: 'With Min Sizes',
  args: {
    direction: 'horizontal',
    initialSizes: [50, 50],
    minSizes: [25, 25],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-resizable-panels
          [direction]="direction"
          [initialSizes]="initialSizes"
          [minSizes]="minSizes"
          [gutterSize]="gutterSize">
          <div panel-1 class="p-4 h-full bg-card">
            <h3 class="font-semibold text-foreground">Panel 1</h3>
            <p class="text-sm text-muted-foreground mt-2">Min size: 25% — cannot shrink below this.</p>
          </div>
          <div panel-2 class="p-4 h-full bg-card">
            <h3 class="font-semibold text-foreground">Panel 2</h3>
            <p class="text-sm text-muted-foreground mt-2">Min size: 25% — cannot shrink below this.</p>
          </div>
        </ui-resizable-panels>
      </div>
    `,
  }),
};

export const CustomGutter: Story = {
  name: 'Custom Gutter Size',
  args: {
    direction: 'horizontal',
    initialSizes: [40, 60],
    gutterSize: 16,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-resizable-panels
          [direction]="direction"
          [initialSizes]="initialSizes"
          [minSizes]="minSizes"
          [gutterSize]="gutterSize">
          <div panel-1 class="p-4 h-full bg-card">
            <h3 class="font-semibold text-foreground">Panel 1 (40%)</h3>
            <p class="text-sm text-muted-foreground mt-2">The gutter between panels is 16px wide.</p>
          </div>
          <div panel-2 class="p-4 h-full bg-card">
            <h3 class="font-semibold text-foreground">Panel 2 (60%)</h3>
            <p class="text-sm text-muted-foreground mt-2">Double-click the gutter to reset to initial sizes.</p>
          </div>
        </ui-resizable-panels>
      </div>
    `,
  }),
};
