import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UiDateRangePickerComponent } from './date-range-picker.component';

const meta: Meta<UiDateRangePickerComponent> = {
  title: 'Form/DateRangePicker',
  component: UiDateRangePickerComponent,
  decorators: [moduleMetadata({ imports: [UiDateRangePickerComponent] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiDateRangePickerComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Select date range',
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    value: { start: new Date(2025, 0, 10), end: new Date(2025, 0, 20) },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Select date range',
  },
};
