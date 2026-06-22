import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiKanbanComponent, KanbanColumn } from './kanban.component';

const sampleColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: '#94a3b8',
    items: [
      { id: '1', title: 'Design mockups', tags: ['design'] },
      { id: '2', title: 'Setup CI/CD', description: 'Configure GitHub Actions' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: '#3b82f6',
    items: [
      { id: '3', title: 'Build components', tags: ['dev', 'ui'] },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: '#22c55e',
    items: [
      { id: '4', title: 'Setup project', description: 'Initial repo setup' },
    ],
  },
];

const meta: Meta<UiKanbanComponent> = {
  title: 'Data/Kanban',
  component: UiKanbanComponent,
  decorators: [
    moduleMetadata({
      imports: [UiKanbanComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    draggable: {
      control: { type: 'boolean' },
      description: 'Enable drag and drop',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiKanbanComponent>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    draggable: true,
  },
};

export const EmptyColumns: Story = {
  args: {
    columns: [
      { id: 'todo', title: 'To Do', color: '#94a3b8', items: [] },
      { id: 'in-progress', title: 'In Progress', color: '#3b82f6', items: [] },
      { id: 'done', title: 'Done', color: '#22c55e', items: [] },
    ],
    draggable: true,
  },
};

export const NoDrag: Story = {
  args: {
    columns: sampleColumns,
    draggable: false,
  },
};
