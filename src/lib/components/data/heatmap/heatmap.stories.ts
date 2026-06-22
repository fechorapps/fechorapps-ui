import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiHeatmapComponent, HeatmapCell } from './heatmap.component';

const generateGrid = (rows: string[], cols: string[]): HeatmapCell[] => {
  const cells: HeatmapCell[] = [];
  for (const row of rows) {
    for (const col of cols) {
      cells.push({ row, col, value: Math.floor(Math.random() * 100) });
    }
  }
  return cells;
};

const sampleRows = ['Mon', 'Tue', 'Wed', 'Thu'];
const sampleCols = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
const sampleCells = generateGrid(sampleRows, sampleCols);

const largeCells = generateGrid(
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  ['Q1', 'Q2', 'Q3', 'Q4']
);

const meta: Meta<UiHeatmapComponent> = {
  title: 'Data/Heatmap',
  component: UiHeatmapComponent,
  decorators: [moduleMetadata({ imports: [UiHeatmapComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiHeatmapComponent>;

export const Default: Story = {
  args: {
    cells: sampleCells,
    showValues: true,
    showTooltip: true,
  },
};

export const NoValues: Story = {
  args: {
    cells: sampleCells,
    showValues: false,
    showTooltip: true,
  },
};

export const Large: Story = {
  args: {
    cells: largeCells,
    showValues: true,
    showTooltip: true,
  },
};

export const Loading: Story = {
  args: {
    cells: [],
    loading: true,
  },
};
