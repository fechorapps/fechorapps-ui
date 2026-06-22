import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UiTimePickerComponent } from './time-picker.component';

const meta: Meta<UiTimePickerComponent> = {
  title: 'Form/TimePicker',
  component: UiTimePickerComponent,
  decorators: [moduleMetadata({ imports: [UiTimePickerComponent] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiTimePickerComponent>;

export const Default: Story = {
  args: {
    value: '09:30',
    use24h: true,
    disabled: false,
  },
};

export const TwelveHour: Story = {
  args: {
    value: '03:45',
    use24h: false,
  },
};

export const WithSeconds: Story = {
  args: {
    value: '14:30:00',
    use24h: true,
    showSeconds: true,
  },
};
