import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiMessageComponent } from './message.component';

const meta: Meta<UiMessageComponent> = {
  title: 'Messages/Message',
  component: UiMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMessageComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['info', 'success', 'warn', 'error', 'secondary', 'contrast'],
      description: 'Message severity type',
      table: { category: 'Appearance' },
    },
    text: {
      control: { type: 'text' },
      description: 'Message text content',
      table: { category: 'Content' },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button',
      table: { category: 'Behavior' },
    },
    icon: {
      control: { type: 'boolean' },
      description: 'Show severity icon',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<UiMessageComponent>;

export const Info: Story = {
  args: {
    severity: 'info',
    text: 'This is an informational message.',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    text: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warn',
    text: 'Please review your input before proceeding.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    text: 'An error occurred while processing your request.',
  },
};

export const Secondary: Story = {
  args: {
    severity: 'secondary',
    text: 'This is a secondary message for general information.',
  },
};

export const Contrast: Story = {
  args: {
    severity: 'contrast',
    text: 'This is a high-contrast message for important notices.',
  },
};

export const Closable: Story = {
  args: {
    severity: 'info',
    text: 'This message can be closed by clicking the X button.',
    closable: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    severity: 'success',
    text: 'This message has no icon.',
    icon: false,
  },
};

export const WithContent: Story = {
  render: () => ({
    template: `
      <ui-message severity="info">
        <strong>Note:</strong> You can use custom content with HTML formatting.
      </ui-message>
    `,
  }),
};

export const AllSeverities: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-message severity="info" text="Info: General information message" />
        <ui-message severity="success" text="Success: Operation completed successfully" />
        <ui-message severity="warn" text="Warning: Please review before continuing" />
        <ui-message severity="error" text="Error: Something went wrong" />
        <ui-message severity="secondary" text="Secondary: Neutral information" />
        <ui-message severity="contrast" text="Contrast: High visibility message" />
      </div>
    `,
  }),
};

export const ClosableMessages: Story = {
  render: () => ({
    props: {
      messages: [
        { severity: 'info', text: 'Info message - click to close' },
        { severity: 'success', text: 'Success message - click to close' },
        { severity: 'warn', text: 'Warning message - click to close' },
        { severity: 'error', text: 'Error message - click to close' },
      ] as { severity: 'info' | 'success' | 'warn' | 'error'; text: string }[],
      closeMessage(index: number) {
        this['messages'] = this['messages'].filter((_: unknown, i: number) => i !== index);
      },
    },
    template: `
      <div class="space-y-4">
        @for (msg of messages; track $index) {
          <ui-message
            [severity]="msg.severity"
            [text]="msg.text"
            [closable]="true"
            (onClose)="closeMessage($index)"
          />
        }

        @if (messages.length === 0) {
          <p class="text-gray-500">All messages have been closed.</p>
        }
      </div>
    `,
  }),
};

export const InlineFormValidation: Story = {
  render: () => ({
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            value="invalid-email"
          />
          <div class="mt-2">
            <ui-message severity="error" text="Please enter a valid email address" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            value="weak"
          />
          <div class="mt-2">
            <ui-message severity="warn" text="Password should be at least 8 characters" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            class="w-full px-3 py-2 border border-green-500 rounded-lg bg-white dark:bg-gray-800"
            value="validuser123"
          />
          <div class="mt-2">
            <ui-message severity="success" text="Username is available" />
          </div>
        </div>
      </div>
    `,
  }),
};
