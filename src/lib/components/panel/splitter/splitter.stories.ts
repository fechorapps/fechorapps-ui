import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiSplitterComponent } from './splitter.component';

const meta: Meta<UiSplitterComponent> = {
  title: 'Panel/Splitter',
  component: UiSplitterComponent,
  decorators: [
    moduleMetadata({
      imports: [UiSplitterComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Splitter orientation',
    },
    panelSizes: {
      control: { type: 'object' },
      description: 'Initial panel sizes in percentages',
    },
  },
};

export default meta;
type Story = StoryObj<UiSplitterComponent>;

export const Horizontal: Story = {
  render: () => ({
    template: `
      <div class="h-64 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <ui-splitter [panelSizes]="[30, 70]">
          <div splitterPanel1 class="h-full p-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 class="font-semibold mb-2">Panel 1</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Drag the gutter to resize</p>
          </div>
          <div splitterPanel2 class="h-full p-4 bg-green-50 dark:bg-green-900/20">
            <h3 class="font-semibold mb-2">Panel 2</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Content on the right side</p>
          </div>
        </ui-splitter>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div class="h-80 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <ui-splitter layout="vertical" [panelSizes]="[40, 60]">
          <div splitterPanel1 class="h-full p-4 bg-purple-50 dark:bg-purple-900/20">
            <h3 class="font-semibold mb-2">Top Panel</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Drag the gutter vertically</p>
          </div>
          <div splitterPanel2 class="h-full p-4 bg-orange-50 dark:bg-orange-900/20">
            <h3 class="font-semibold mb-2">Bottom Panel</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Content on the bottom</p>
          </div>
        </ui-splitter>
      </div>
    `,
  }),
};

export const WithMinSizes: Story = {
  render: () => ({
    template: `
      <div class="h-64 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <ui-splitter [panelSizes]="[50, 50]" [minSizes]="[20, 20]">
          <div splitterPanel1 class="h-full p-4 bg-gray-50 dark:bg-gray-800">
            <h3 class="font-semibold mb-2">Panel 1 (min 20%)</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Cannot be smaller than 20%</p>
          </div>
          <div splitterPanel2 class="h-full p-4 bg-gray-100 dark:bg-gray-700">
            <h3 class="font-semibold mb-2">Panel 2 (min 20%)</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Also has a minimum size</p>
          </div>
        </ui-splitter>
      </div>
    `,
  }),
};

export const FileExplorer: Story = {
  render: () => ({
    template: `
      <div class="h-96 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <ui-splitter [panelSizes]="[25, 75]" [minSizes]="[15, 50]">
          <div splitterPanel1 class="h-full bg-gray-50 dark:bg-gray-800">
            <div class="p-2 font-semibold border-b border-gray-200 dark:border-gray-700">
              Explorer
            </div>
            <ul class="p-2 text-sm">
              <li class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">📁 src</li>
              <li class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">📁 node_modules</li>
              <li class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">📄 package.json</li>
              <li class="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">📄 README.md</li>
            </ul>
          </div>
          <div splitterPanel2 class="h-full">
            <div class="p-2 font-semibold border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              Editor - main.ts
            </div>
            <pre class="p-4 text-sm font-mono bg-gray-900 text-gray-100 h-full overflow-auto">
import &#123; bootstrapApplication &#125; from '&#64;angular/platform-browser';
import &#123; AppComponent &#125; from './app/app.component';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
            </pre>
          </div>
        </ui-splitter>
      </div>
    `,
  }),
};
