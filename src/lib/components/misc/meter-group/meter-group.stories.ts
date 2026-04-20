import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { HardDrive, Cloud, Archive } from 'lucide-angular';

import { UiMeterGroupComponent, MeterItem } from './meter-group.component';

const storageData: MeterItem[] = [
  { label: 'Documents', value: 30, color: 'bg-blue-500' },
  { label: 'Photos', value: 25, color: 'bg-green-500' },
  { label: 'Videos', value: 20, color: 'bg-yellow-500' },
  { label: 'Other', value: 10, color: 'bg-purple-500' },
];

const meta: Meta<UiMeterGroupComponent> = {
  title: 'Misc/MeterGroup',
  component: UiMeterGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMeterGroupComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Meter orientation',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Label position relative to meter',
    },
  },
};

export default meta;
type Story = StoryObj<UiMeterGroupComponent>;

export const Default: Story = {
  render: () => ({
    props: { data: storageData },
    template: `
      <div class="max-w-lg">
        <ui-meter-group [value]="data" [max]="100"></ui-meter-group>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      data: [
        { label: 'Local Storage', value: 40, color: 'bg-blue-500', icon: HardDrive },
        { label: 'Cloud Storage', value: 35, color: 'bg-green-500', icon: Cloud },
        { label: 'Archive', value: 15, color: 'bg-gray-500', icon: Archive },
      ],
      HardDrive,
      Cloud,
      Archive,
    },
    template: `
      <div class="max-w-lg">
        <ui-meter-group [value]="data" [max]="100"></ui-meter-group>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    props: { data: storageData },
    template: `
      <div class="h-64">
        <ui-meter-group [value]="data" [max]="100" orientation="vertical"></ui-meter-group>
      </div>
    `,
  }),
};

export const DiskUsage: Story = {
  render: () => ({
    props: {
      data: [
        { label: 'Used Space', value: 75, color: 'bg-red-500' },
        { label: 'Free Space', value: 25, color: 'bg-gray-300' },
      ],
    },
    template: `
      <div class="max-w-lg p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 class="font-semibold mb-4">Disk Usage</h3>
        <ui-meter-group [value]="data" [max]="100"></ui-meter-group>
        <p class="text-sm text-gray-500 mt-2">75 GB used of 100 GB</p>
      </div>
    `,
  }),
};

export const MultipleMeters: Story = {
  render: () => ({
    props: {
      cpuData: [{ label: 'CPU', value: 65, color: 'bg-blue-500' }],
      memoryData: [{ label: 'Memory', value: 80, color: 'bg-green-500' }],
      diskData: [{ label: 'Disk', value: 45, color: 'bg-yellow-500' }],
    },
    template: `
      <div class="space-y-6 max-w-lg">
        <div>
          <h4 class="text-sm font-medium mb-2">CPU Usage (65%)</h4>
          <ui-meter-group [value]="cpuData" [max]="100"></ui-meter-group>
        </div>
        <div>
          <h4 class="text-sm font-medium mb-2">Memory Usage (80%)</h4>
          <ui-meter-group [value]="memoryData" [max]="100"></ui-meter-group>
        </div>
        <div>
          <h4 class="text-sm font-medium mb-2">Disk Usage (45%)</h4>
          <ui-meter-group [value]="diskData" [max]="100"></ui-meter-group>
        </div>
      </div>
    `,
  }),
};
