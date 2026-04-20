import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiMessagesComponent, Message } from './messages.component';

const meta: Meta<UiMessagesComponent> = {
  title: 'Messages/Messages',
  component: UiMessagesComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMessagesComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button on all messages',
      table: { category: 'Behavior' },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Show severity icon on all messages',
      table: { category: 'Appearance' },
    },
    life: {
      control: { type: 'number' },
      description: 'Auto-close after milliseconds (0 = disabled)',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiMessagesComponent>;

const sampleMessages: Message[] = [
  { severity: 'info', summary: 'Info', detail: 'This is an informational message' },
  { severity: 'success', summary: 'Success', detail: 'Operation completed successfully' },
  { severity: 'warn', summary: 'Warning', detail: 'Please review before proceeding' },
];

export const Basic: Story = {
  args: {
    value: sampleMessages,
    closable: true,
    showIcon: true,
  },
};

export const WithoutCloseButton: Story = {
  args: {
    value: sampleMessages,
    closable: false,
    showIcon: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    value: sampleMessages,
    closable: true,
    showIcon: false,
  },
};

export const SingleMessage: Story = {
  args: {
    value: [
      {
        severity: 'error',
        summary: 'Error',
        detail: 'An error occurred while processing your request',
      },
    ],
    closable: true,
  },
};

export const AllSeverities: Story = {
  args: {
    value: [
      { severity: 'info', summary: 'Info', detail: 'General information message' },
      { severity: 'success', summary: 'Success', detail: 'Operation completed successfully' },
      { severity: 'warn', summary: 'Warning', detail: 'Please review before continuing' },
      { severity: 'error', summary: 'Error', detail: 'Something went wrong' },
      { severity: 'secondary', summary: 'Note', detail: 'Neutral information' },
      { severity: 'contrast', summary: 'Important', detail: 'High visibility message' },
    ],
    closable: true,
  },
};

export const SummaryOnly: Story = {
  args: {
    value: [
      { severity: 'info', summary: 'Information message without details' },
      { severity: 'success', summary: 'Success message without details' },
      { severity: 'warn', summary: 'Warning message without details' },
    ],
    closable: true,
  },
};

export const DetailOnly: Story = {
  args: {
    value: [
      { severity: 'info', detail: 'This message only has detail text' },
      { severity: 'success', detail: 'Another message with only detail' },
    ],
    closable: true,
  },
};

export const Interactive: Story = {
  render: () => ({
    props: {
      messages: [] as Message[],
      addInfo() {
        this['messages'] = [
          ...this['messages'],
          {
            severity: 'info',
            summary: 'Info',
            detail: `Message added at ${new Date().toLocaleTimeString()}`,
          },
        ];
      },
      addSuccess() {
        this['messages'] = [
          ...this['messages'],
          {
            severity: 'success',
            summary: 'Success',
            detail: `Action completed at ${new Date().toLocaleTimeString()}`,
          },
        ];
      },
      addWarn() {
        this['messages'] = [
          ...this['messages'],
          {
            severity: 'warn',
            summary: 'Warning',
            detail: `Warning at ${new Date().toLocaleTimeString()}`,
          },
        ];
      },
      addError() {
        this['messages'] = [
          ...this['messages'],
          {
            severity: 'error',
            summary: 'Error',
            detail: `Error occurred at ${new Date().toLocaleTimeString()}`,
          },
        ];
      },
      clearAll() {
        this['messages'] = [];
      },
      onClose(event: { message: Message; index: number }) {
        this['messages'] = this['messages'].filter((_: Message, i: number) => i !== event.index);
      },
    },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
            (click)="addInfo()"
          >
            Add Info
          </button>
          <button
            type="button"
            class="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
            (click)="addSuccess()"
          >
            Add Success
          </button>
          <button
            type="button"
            class="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
            (click)="addWarn()"
          >
            Add Warning
          </button>
          <button
            type="button"
            class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            (click)="addError()"
          >
            Add Error
          </button>
          <button
            type="button"
            class="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
            (click)="clearAll()"
          >
            Clear All
          </button>
        </div>

        <ui-messages
          [value]="messages"
          [closable]="true"
          (onClose)="onClose($event)"
          (valueChange)="messages = $event"
        />

        @if (messages.length === 0) {
          <p class="text-gray-500 text-sm">No messages. Click the buttons above to add messages.</p>
        }
      </div>
    `,
  }),
};

export const FormValidation: Story = {
  render: () => ({
    props: {
      messages: [
        { severity: 'error', summary: 'Email', detail: 'Email is required' },
        {
          severity: 'error',
          summary: 'Password',
          detail: 'Password must be at least 8 characters',
        },
        { severity: 'warn', summary: 'Terms', detail: 'You must accept the terms and conditions' },
      ] as Message[],
      onClose(event: { message: Message; index: number }) {
        this['messages'] = this['messages'].filter((_: Message, i: number) => i !== event.index);
      },
    },
    template: `
      <div class="max-w-md p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Registration Form</h3>

        <ui-messages
          [value]="messages"
          [closable]="true"
          (onClose)="onClose($event)"
          (valueChange)="messages = $event"
        />

        @if (messages.length > 0) {
          <div class="mt-4 text-sm text-gray-500">
            Please fix the {{ messages.length }} error(s) above to continue.
          </div>
        } @else {
          <div class="mt-4 text-sm text-green-600">
            All validations passed!
          </div>
        }
      </div>
    `,
  }),
};
