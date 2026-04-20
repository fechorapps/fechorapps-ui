import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiProgressBarComponent } from './progress-bar.component';

const meta: Meta<UiProgressBarComponent> = {
  title: 'Misc/ProgressBar',
  component: UiProgressBarComponent,
  decorators: [
    moduleMetadata({
      imports: [UiProgressBarComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
      table: { category: 'Value' },
    },
    mode: {
      control: { type: 'select' },
      options: ['determinate', 'indeterminate'],
      description: 'Progress mode',
      table: { category: 'Behavior' },
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Show percentage value',
      table: { category: 'Appearance' },
    },
    color: {
      control: { type: 'color' },
      description: 'Custom bar color',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<UiProgressBarComponent>;

export const Basic: Story = {
  args: {
    value: 50,
  },
};

export const FullProgress: Story = {
  args: {
    value: 100,
  },
};

export const WithoutValue: Story = {
  args: {
    value: 75,
    showValue: false,
  },
};

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
  },
};

export const CustomColor: Story = {
  args: {
    value: 65,
    color: '#10B981',
  },
};

export const MultipleProgress: Story = {
  render: () => ({
    template: `
      <div class="space-y-6">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600 dark:text-gray-400">Storage</span>
            <span class="text-gray-800 dark:text-gray-200">8.2 GB / 15 GB</span>
          </div>
          <ui-progress-bar [value]="55" [showValue]="false" />
        </div>

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600 dark:text-gray-400">Bandwidth</span>
            <span class="text-gray-800 dark:text-gray-200">45.6 GB / 100 GB</span>
          </div>
          <ui-progress-bar [value]="45" [showValue]="false" color="#3B82F6" />
        </div>

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600 dark:text-gray-400">CPU Usage</span>
            <span class="text-gray-800 dark:text-gray-200">85%</span>
          </div>
          <ui-progress-bar [value]="85" [showValue]="false" color="#EF4444" />
        </div>
      </div>
    `,
  }),
};

export const StepProgress: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <ui-progress-bar [value]="25" [showValue]="false" />
          </div>
          <span class="text-sm font-medium w-20 text-right">Step 1/4</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex-1">
            <ui-progress-bar [value]="50" [showValue]="false" />
          </div>
          <span class="text-sm font-medium w-20 text-right">Step 2/4</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex-1">
            <ui-progress-bar [value]="75" [showValue]="false" />
          </div>
          <span class="text-sm font-medium w-20 text-right">Step 3/4</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex-1">
            <ui-progress-bar [value]="100" [showValue]="false" color="#10B981" />
          </div>
          <span class="text-sm font-medium w-20 text-right">Complete</span>
        </div>
      </div>
    `,
  }),
};

export const ColorVariants: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-progress-bar [value]="60" color="#3B82F6" [showValue]="false" />
        <ui-progress-bar [value]="60" color="#10B981" [showValue]="false" />
        <ui-progress-bar [value]="60" color="#F59E0B" [showValue]="false" />
        <ui-progress-bar [value]="60" color="#EF4444" [showValue]="false" />
        <ui-progress-bar [value]="60" color="#8B5CF6" [showValue]="false" />
      </div>
    `,
  }),
};

export const FileUploadProgress: Story = {
  render: () => ({
    props: {
      files: [
        { name: 'document.pdf', progress: 100 },
        { name: 'image.png', progress: 75 },
        { name: 'video.mp4', progress: 30 },
      ],
    },
    template: `
      <div class="space-y-4 max-w-md">
        @for (file of files; track file.name) {
          <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div class="flex justify-between text-sm mb-2">
              <span class="font-medium">{{ file.name }}</span>
              <span class="text-gray-500">{{ file.progress }}%</span>
            </div>
            <ui-progress-bar
              [value]="file.progress"
              [showValue]="false"
              [color]="file.progress === 100 ? '#10B981' : ''"
            />
          </div>
        }
      </div>
    `,
  }),
};
