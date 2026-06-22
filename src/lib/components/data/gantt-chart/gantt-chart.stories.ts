import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiGanttChartComponent, GanttTask } from './gantt-chart.component';

const today = new Date();
const d = (offsetDays: number): Date => {
  const date = new Date(today);
  date.setDate(date.getDate() + offsetDays);
  return date;
};

const sampleTasks: GanttTask[] = [
  { id: '1', label: 'Design Phase', start: d(0), end: d(7), color: '#8b5cf6', group: 'Design' },
  { id: '2', label: 'Development', start: d(5), end: d(20), color: '#3b82f6', group: 'Dev' },
  { id: '3', label: 'Testing', start: d(18), end: d(28), color: '#22c55e', group: 'QA' },
];

const tasksWithProgress: GanttTask[] = [
  { id: '1', label: 'Research', start: d(0), end: d(5), color: '#f59e0b', progress: 100 },
  { id: '2', label: 'Implementation', start: d(3), end: d(15), color: '#3b82f6', progress: 60 },
  { id: '3', label: 'Deployment', start: d(14), end: d(21), color: '#22c55e', progress: 0 },
];

const meta: Meta<UiGanttChartComponent> = {
  title: 'Data/GanttChart',
  component: UiGanttChartComponent,
  decorators: [moduleMetadata({ imports: [UiGanttChartComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiGanttChartComponent>;

export const Default: Story = {
  args: { tasks: sampleTasks },
};

export const WithProgress: Story = {
  args: { tasks: tasksWithProgress },
};

export const Loading: Story = {
  args: { tasks: [], loading: true },
};

export const Empty: Story = {
  args: { tasks: [] },
};
