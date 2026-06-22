import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiVirtualListComponent, VirtualListItem } from './virtual-list.component';

const generateItems = (count: number): VirtualListItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    label: `Item #${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

const meta: Meta<UiVirtualListComponent> = {
  title: 'Data/VirtualList',
  component: UiVirtualListComponent,
  decorators: [moduleMetadata({ imports: [UiVirtualListComponent] })],
  tags: ['autodocs'],
  argTypes: {
    itemHeight: { control: { type: 'number' } },
    containerHeight: { control: { type: 'number' } },
    overscan: { control: { type: 'number' } },
  },
};
export default meta;
type Story = StoryObj<UiVirtualListComponent>;

export const Default: Story = {
  args: {
    items: generateItems(100),
    itemHeight: 48,
    containerHeight: 400,
    overscan: 3,
    labelField: 'label',
  },
};

export const LargeDataset: Story = {
  args: {
    items: generateItems(1000),
    itemHeight: 48,
    containerHeight: 400,
    overscan: 3,
    labelField: 'label',
  },
};

export const CustomHeight: Story = {
  args: {
    items: generateItems(200),
    itemHeight: 64,
    containerHeight: 500,
    overscan: 5,
    labelField: 'label',
  },
};
