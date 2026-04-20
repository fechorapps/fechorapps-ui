import type { Meta, StoryObj } from '@storybook/angular';

import { UiDatePickerComponent } from './datepicker.component';

const meta: Meta<UiDatePickerComponent> = {
  title: 'Form/DatePicker',
  component: UiDatePickerComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'DatePicker size',
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'Selection mode',
    },
    showButtonBar: {
      control: 'boolean',
      description: 'Show Today/Clear buttons',
    },
    inline: {
      control: 'boolean',
      description: 'Inline mode (always visible)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid state',
    },
  },
};

export default meta;
type Story = StoryObj<UiDatePickerComponent>;

export const Default: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select a date',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Birth Date',
    placeholder: 'Select date',
    value: new Date(2000, 0, 15),
  },
};

export const WithButtonBar: Story = {
  args: {
    label: 'Appointment Date',
    placeholder: 'Select date',
    showButtonBar: true,
  },
};

export const RangeSelection: Story = {
  args: {
    label: 'Date Range',
    placeholder: 'Select date range',
    selectionMode: 'range',
  },
};

export const MultipleSelection: Story = {
  args: {
    label: 'Select Dates',
    placeholder: 'Select multiple dates',
    selectionMode: 'multiple',
  },
};

export const Inline: Story = {
  args: {
    label: 'Select Date',
    inline: true,
    showButtonBar: true,
  },
};

export const WithMinMax: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    return {
      props: {
        minDate,
        maxDate,
      },
      template: `
        <ui-datepicker
          label="Booking Date"
          placeholder="Select date"
          [minDate]="minDate"
          [maxDate]="maxDate"
          helpText="Select a date within the next 2 months"
        ></ui-datepicker>
      `,
    };
  },
};

export const DisabledWeekends: Story = {
  args: {
    label: 'Business Day',
    placeholder: 'Select a weekday',
    disabledDays: [0, 6],
    helpText: 'Weekends are disabled',
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-datepicker variant="default" label="Default" placeholder="Select date"></ui-datepicker>
        <ui-datepicker variant="filled" label="Filled" placeholder="Select date"></ui-datepicker>
        <ui-datepicker variant="outlined" label="Outlined" placeholder="Select date"></ui-datepicker>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-datepicker size="sm" label="Small" placeholder="Select date"></ui-datepicker>
        <ui-datepicker size="md" label="Medium" placeholder="Select date"></ui-datepicker>
        <ui-datepicker size="lg" label="Large" placeholder="Select date"></ui-datepicker>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select date',
    disabled: true,
    value: new Date(),
  },
};

export const Invalid: Story = {
  args: {
    label: 'Required Date',
    placeholder: 'Select a date',
    invalid: true,
    helpText: 'Please select a date',
  },
};

export const BookingForm: Story = {
  render: () => ({
    template: `
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Book Appointment</h3>
        <div class="space-y-4">
          <ui-datepicker
            label="Check-in Date"
            placeholder="Select check-in"
            [disabledDays]="[0]"
          ></ui-datepicker>
          <ui-datepicker
            label="Check-out Date"
            placeholder="Select check-out"
            [disabledDays]="[0]"
          ></ui-datepicker>
        </div>
      </div>
    `,
  }),
};
