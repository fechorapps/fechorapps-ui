import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiConfirmDialogComponent } from './confirm-dialog.component';

const meta: Meta<UiConfirmDialogComponent> = {
  title: 'Overlay/ConfirmDialog',
  component: UiConfirmDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [UiConfirmDialogComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger', 'help'],
      description: 'Dialog severity',
      table: { category: 'Appearance' },
    },
    header: {
      control: { type: 'text' },
      description: 'Dialog header',
      table: { category: 'Content' },
    },
    message: {
      control: { type: 'text' },
      description: 'Confirmation message',
      table: { category: 'Content' },
    },
    acceptLabel: {
      control: { type: 'text' },
      description: 'Accept button label',
      table: { category: 'Labels' },
    },
    rejectLabel: {
      control: { type: 'text' },
      description: 'Reject button label',
      table: { category: 'Labels' },
    },
  },
};

export default meta;
type Story = StoryObj<UiConfirmDialogComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-confirm-dialog
        [(visible)]="visible"
        header="Confirmation"
        message="Are you sure you want to proceed?"
      />
    `,
  }),
};

export const Warning: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-confirm-dialog
        [(visible)]="visible"
        header="Warning"
        message="This action cannot be undone. Are you sure?"
        severity="warning"
        acceptLabel="Yes, I'm sure"
        rejectLabel="Cancel"
      />
    `,
  }),
};

export const Danger: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-confirm-dialog
        [(visible)]="visible"
        header="Delete Item"
        message="Are you sure you want to delete this item? This action is permanent and cannot be reversed."
        severity="danger"
        acceptLabel="Delete"
        rejectLabel="Keep"
      />
    `,
  }),
};

export const Info: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-confirm-dialog
        [(visible)]="visible"
        header="Information"
        message="Would you like to enable notifications for this event?"
        severity="info"
        acceptLabel="Enable"
        rejectLabel="Not now"
      />
    `,
  }),
};

export const Success: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-confirm-dialog
        [(visible)]="visible"
        header="Confirm Save"
        message="Your changes will be saved. Do you want to continue?"
        severity="success"
        acceptLabel="Save"
        rejectLabel="Discard"
      />
    `,
  }),
};

export const Help: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-confirm-dialog
        [(visible)]="visible"
        header="Need Help?"
        message="Would you like to start the interactive tutorial?"
        severity="help"
        acceptLabel="Start Tutorial"
        rejectLabel="Maybe Later"
      />
    `,
  }),
};

export const WithCallbacks: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
      result: '',
      onAccept() {
        this['result'] = 'User accepted';
        this['visible'] = false;
      },
      onReject() {
        this['result'] = 'User rejected';
        this['visible'] = false;
      },
    },
    template: `
      <div class="space-y-4">
        <button
          type="button"
          class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          (click)="visible = true"
        >
          Open Confirm Dialog
        </button>

        @if (result) {
          <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            Result: {{ result }}
          </div>
        }

        <ui-confirm-dialog
          [(visible)]="visible"
          header="Confirm Action"
          message="Are you sure you want to proceed with this action?"
          severity="warning"
          (onAccept)="onAccept()"
          (onReject)="onReject()"
        />
      </div>
    `,
  }),
};

export const DismissableMask: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-confirm-dialog
        [(visible)]="visible"
        header="Click Outside"
        message="Click outside this dialog to close it."
        [dismissableMask]="true"
      />
    `,
  }),
};

export const NonClosable: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-confirm-dialog
        [(visible)]="visible"
        header="Required Action"
        message="You must make a choice to continue."
        [closable]="false"
        [closeOnEscape]="false"
      />
    `,
  }),
};
