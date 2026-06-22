import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiCalendarViewComponent, CalendarEvent } from './calendar-view.component';

const sampleEvents: CalendarEvent[] = [
  { id: '1', title: 'Team Meeting', start: new Date(), color: '#3b82f6' },
  { id: '2', title: 'Launch', start: new Date(new Date().getFullYear(), new Date().getMonth(), 15), color: '#22c55e' },
];

const meta: Meta<UiCalendarViewComponent> = {
  title: 'Data/CalendarView',
  component: UiCalendarViewComponent,
  decorators: [
    moduleMetadata({
      imports: [UiCalendarViewComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: { type: 'select' },
      options: ['month', 'week', 'day'],
      description: 'Calendar view mode',
      table: { category: 'State' },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<UiCalendarViewComponent>;

export const Default: Story = {
  args: {
    events: [],
    view: 'month',
    loading: false,
  },
};

export const WithEvents: Story = {
  args: {
    events: sampleEvents,
    view: 'month',
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    events: [],
    view: 'month',
    loading: true,
  },
};
