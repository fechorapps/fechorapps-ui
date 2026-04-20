import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ChartData } from 'chart.js';

import { UiChartComponent } from './chart.component';

const meta: Meta<UiChartComponent> = {
  title: 'Chart/Chart',
  component: UiChartComponent,
  decorators: [
    moduleMetadata({
      imports: [UiChartComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea', 'bubble', 'scatter'],
      description: 'Chart type',
      table: { category: 'Type' },
    },
    width: {
      control: { type: 'text' },
      description: 'Chart width',
      table: { category: 'Size' },
    },
    height: {
      control: { type: 'text' },
      description: 'Chart height',
      table: { category: 'Size' },
    },
    responsive: {
      control: { type: 'boolean' },
      description: 'Responsive chart',
      table: { category: 'Behavior' },
    },
    maintainAspectRatio: {
      control: { type: 'boolean' },
      description: 'Maintain aspect ratio',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiChartComponent>;

const lineData: ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: '#3B82F6',
      tension: 0.4,
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      borderColor: '#10B981',
      tension: 0.4,
    },
  ],
};

const barData: ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: '#3B82F6',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: 'Revenue',
      backgroundColor: '#10B981',
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

const pieData: ChartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      data: [300, 50, 100, 80, 120],
      backgroundColor: ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'],
      hoverBackgroundColor: ['#DC2626', '#2563EB', '#D97706', '#059669', '#7C3AED'],
    },
  ],
};

const doughnutData: ChartData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [540, 325, 135],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
      hoverBackgroundColor: ['#2563EB', '#059669', '#D97706'],
    },
  ],
};

const radarData: ChartData = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'Person A',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: '#3B82F6',
      pointBackgroundColor: '#3B82F6',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: 'Person B',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: '#10B981',
      pointBackgroundColor: '#10B981',
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const polarAreaData: ChartData = {
  labels: ['Red', 'Green', 'Yellow', 'Blue', 'Purple'],
  datasets: [
    {
      data: [11, 16, 7, 14, 10],
      backgroundColor: [
        'rgba(239, 68, 68, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(139, 92, 246, 0.6)',
      ],
    },
  ],
};

export const Line: Story = {
  args: {
    type: 'line',
    data: lineData,
    height: '400px',
  },
};

export const Bar: Story = {
  args: {
    type: 'bar',
    data: barData,
    height: '400px',
  },
};

export const HorizontalBar: Story = {
  args: {
    type: 'bar',
    data: barData,
    height: '400px',
    options: {
      indexAxis: 'y',
    },
  },
};

export const Pie: Story = {
  args: {
    type: 'pie',
    data: pieData,
    height: '400px',
  },
};

export const Doughnut: Story = {
  args: {
    type: 'doughnut',
    data: doughnutData,
    height: '400px',
  },
};

export const Radar: Story = {
  args: {
    type: 'radar',
    data: radarData,
    height: '400px',
  },
};

export const PolarArea: Story = {
  args: {
    type: 'polarArea',
    data: polarAreaData,
    height: '400px',
  },
};

export const StackedBar: Story = {
  args: {
    type: 'bar',
    data: barData,
    height: '400px',
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  },
};

export const LineWithFill: Story = {
  args: {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3B82F6',
          tension: 0.4,
        },
      ],
    },
    height: '400px',
  },
};

export const MultiAxis: Story = {
  args: {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#3B82F6',
          yAxisID: 'y',
        },
        {
          label: 'Dataset 2',
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: '#10B981',
          yAxisID: 'y1',
        },
      ],
    },
    height: '400px',
    options: {
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  },
};

export const WithTitle: Story = {
  args: {
    type: 'bar',
    data: barData,
    height: '400px',
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Monthly Sales Report',
          font: { size: 18 },
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  },
};

export const WithCallback: Story = {
  render: () => ({
    props: {
      data: barData,
      selectedData: null as unknown,
      onDataSelect(event: {
        element?: { index: number };
        dataset?: { label: string; data: number[] };
      }) {
        if (event.element && event.dataset) {
          this['selectedData'] = {
            dataset: event.dataset.label,
            value: event.dataset.data[event.element.index],
          };
        }
      },
    },
    template: `
      <div class="space-y-4">
        <ui-chart
          type="bar"
          [data]="data"
          height="400px"
          (onDataSelect)="onDataSelect($event)"
        />

        @if (selectedData) {
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p class="text-sm">
              <strong>Selected:</strong> {{ selectedData.dataset }} - {{ selectedData.value }}
            </p>
          </div>
        }
      </div>
    `,
  }),
};

export const ComboChart: Story = {
  args: {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Trend',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#EF4444',
          fill: false,
        },
        {
          type: 'bar',
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: '#3B82F6',
        },
      ],
    } as ChartData,
    height: '400px',
  },
};

export const CustomColors: Story = {
  args: {
    type: 'doughnut',
    data: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      datasets: [
        {
          data: [300, 150, 100, 50],
          backgroundColor: [
            '#0EA5E9', // Sky
            '#8B5CF6', // Violet
            '#EC4899', // Pink
            '#F97316', // Orange
          ],
        },
      ],
    },
    height: '400px',
    options: {
      plugins: {
        legend: {
          position: 'right',
        },
      },
    },
  },
};

export const Dashboard: Story = {
  render: () => ({
    props: {
      lineData,
      barData,
      pieData,
    },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Sales Trend</h3>
          <ui-chart type="line" [data]="lineData" height="250px" />
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Monthly Revenue</h3>
          <ui-chart type="bar" [data]="barData" height="250px" />
        </div>
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg col-span-2">
          <h3 class="text-lg font-semibold mb-4">Category Distribution</h3>
          <ui-chart type="pie" [data]="pieData" height="300px" />
        </div>
      </div>
    `,
  }),
};
