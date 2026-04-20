import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiToastComponent, ToastMessage } from './toast.component';

const meta: Meta<UiToastComponent> = {
  title: 'Overlay/Toast',
  component: UiToastComponent,
  decorators: [
    moduleMetadata({
      imports: [UiToastComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: [
        'top-right',
        'top-left',
        'top-center',
        'bottom-right',
        'bottom-left',
        'bottom-center',
      ],
      description: 'Toast position',
      table: { category: 'Position' },
    },
  },
};

export default meta;
type Story = StoryObj<UiToastComponent>;

const successMessage: ToastMessage = {
  id: '1',
  severity: 'success',
  summary: 'Success',
  detail: 'Your changes have been saved successfully.',
};

const errorMessage: ToastMessage = {
  id: '2',
  severity: 'error',
  summary: 'Error',
  detail: 'An error occurred while processing your request.',
};

const warnMessage: ToastMessage = {
  id: '3',
  severity: 'warn',
  summary: 'Warning',
  detail: 'This action may have unintended consequences.',
};

const infoMessage: ToastMessage = {
  id: '4',
  severity: 'info',
  summary: 'Information',
  detail: 'A new version is available for download.',
};

export const Success: Story = {
  args: {
    position: 'top-right',
    messages: [successMessage],
  },
};

export const Error: Story = {
  args: {
    position: 'top-right',
    messages: [errorMessage],
  },
};

export const Warning: Story = {
  args: {
    position: 'top-right',
    messages: [warnMessage],
  },
};

export const Info: Story = {
  args: {
    position: 'top-right',
    messages: [infoMessage],
  },
};

export const MultipleToasts: Story = {
  args: {
    position: 'top-right',
    messages: [successMessage, errorMessage, warnMessage, infoMessage],
  },
};

export const TopLeft: Story = {
  args: {
    position: 'top-left',
    messages: [successMessage],
  },
};

export const TopCenter: Story = {
  args: {
    position: 'top-center',
    messages: [successMessage],
  },
};

export const BottomRight: Story = {
  args: {
    position: 'bottom-right',
    messages: [successMessage],
  },
};

export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
    messages: [successMessage],
  },
};

export const BottomCenter: Story = {
  args: {
    position: 'bottom-center',
    messages: [successMessage],
  },
};

export const NoDetail: Story = {
  args: {
    position: 'top-right',
    messages: [
      {
        id: '1',
        severity: 'success',
        summary: 'File uploaded successfully',
      },
    ],
  },
};

export const LongContent: Story = {
  args: {
    position: 'top-right',
    messages: [
      {
        id: '1',
        severity: 'info',
        summary: 'System Maintenance Scheduled',
        detail:
          'The system will undergo scheduled maintenance on Saturday, December 28th from 2:00 AM to 6:00 AM EST. During this time, the application may be temporarily unavailable.',
      },
    ],
  },
};

export const NonClosable: Story = {
  args: {
    position: 'top-right',
    messages: [
      {
        id: '1',
        severity: 'warn',
        summary: 'Session Expiring',
        detail: 'Your session will expire in 5 minutes.',
        closable: false,
      },
    ],
  },
};

export const AllSeverities: Story = {
  args: {
    position: 'top-right',
    messages: [
      { id: '1', severity: 'success', summary: 'Success', detail: 'Operation completed.' },
      { id: '2', severity: 'info', summary: 'Info', detail: 'FYI message here.' },
      { id: '3', severity: 'warn', summary: 'Warning', detail: 'Proceed with caution.' },
      { id: '4', severity: 'error', summary: 'Error', detail: 'Something went wrong.' },
    ],
  },
};
