import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiAlertComponent } from './alert.component';

const meta: Meta<UiAlertComponent> = {
  title: 'Misc/Alert',
  component: UiAlertComponent,
  decorators: [
    moduleMetadata({
      imports: [UiAlertComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Alert variant',
      table: { category: 'Appearance' },
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title',
      table: { category: 'Content' },
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether the alert can be dismissed',
      table: { category: 'Behavior' },
    },
    banner: {
      control: { type: 'boolean' },
      description: 'Display as full-width banner',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<UiAlertComponent>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-alert [variant]="variant" [title]="title">
        This is an informational alert message.
      </ui-alert>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 p-4">
        <ui-alert variant="info" title="Information">
          This is an info alert with some helpful information.
        </ui-alert>
        <ui-alert variant="success" title="Success">
          Your action was completed successfully.
        </ui-alert>
        <ui-alert variant="warning" title="Warning">
          Please review before proceeding with this action.
        </ui-alert>
        <ui-alert variant="danger" title="Error">
          Something went wrong. Please try again.
        </ui-alert>
      </div>
    `,
  }),
};

export const Dismissible: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 p-4">
        <ui-alert variant="info" title="Dismissible Alert" [dismissible]="true">
          Click the X button to dismiss this alert.
        </ui-alert>
        <ui-alert variant="success" title="Success" [dismissible]="true">
          This success alert can also be dismissed.
        </ui-alert>
      </div>
    `,
  }),
};
