import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiConfirmPopupComponent } from './confirm-popup.component';

const meta: Meta<UiConfirmPopupComponent> = {
  title: 'Overlay/ConfirmPopup',
  component: UiConfirmPopupComponent,
  decorators: [
    moduleMetadata({
      imports: [UiConfirmPopupComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger', 'help'],
      description: 'Popup severity',
      table: { category: 'Appearance' },
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Popup position',
      table: { category: 'Position' },
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
type Story = StoryObj<UiConfirmPopupComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="Are you sure you want to proceed?"
        >
          <button trigger class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Click me
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const Warning: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="This action cannot be undone."
          severity="warning"
          acceptLabel="Yes, I'm sure"
          rejectLabel="Cancel"
        >
          <button trigger class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Warning Action
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const Danger: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="Delete this item permanently?"
          severity="danger"
          acceptLabel="Delete"
          rejectLabel="Keep"
        >
          <button trigger class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const Info: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="Enable notifications?"
          severity="info"
          acceptLabel="Enable"
          rejectLabel="Not now"
        >
          <button trigger class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Notifications
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const Success: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="Save your changes?"
          severity="success"
          acceptLabel="Save"
          rejectLabel="Discard"
        >
          <button trigger class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Save
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const Help: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="Start the tutorial?"
          severity="help"
          acceptLabel="Start"
          rejectLabel="Skip"
        >
          <button trigger class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Help
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const TopPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="Confirm this action?"
          position="top"
        >
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Top
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const LeftPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="Confirm this action?"
          position="left"
        >
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Left
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const RightPosition: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center p-32">
        <ui-confirm-popup
          message="Confirm this action?"
          position="right"
        >
          <button trigger class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            Right
          </button>
        </ui-confirm-popup>
      </div>
    `,
  }),
};

export const WithCallbacks: Story = {
  render: () => ({
    props: {
      result: '',
      onAccept() {
        this['result'] = 'User accepted the action';
      },
      onReject() {
        this['result'] = 'User rejected the action';
      },
    },
    template: `
      <div class="flex flex-col items-center justify-center gap-4 p-32">
        <ui-confirm-popup
          message="Proceed with this action?"
          (onAccept)="onAccept()"
          (onReject)="onReject()"
        >
          <button trigger class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Open Confirm
          </button>
        </ui-confirm-popup>

        @if (result) {
          <div class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
            {{ result }}
          </div>
        }
      </div>
    `,
  }),
};

export const InTableRow: Story = {
  render: () => ({
    props: {
      items: [
        { id: 1, name: 'Product A', price: '$99.00' },
        { id: 2, name: 'Product B', price: '$149.00' },
        { id: 3, name: 'Product C', price: '$199.00' },
      ],
      deleteItem(id: number) {
        this['items'] = this['items'].filter((item: { id: number }) => item.id !== id);
      },
    },
    template: `
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-800">
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Price</th>
            <th class="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items; track item.id) {
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3">{{ item.name }}</td>
              <td class="p-3">{{ item.price }}</td>
              <td class="p-3 text-right">
                <ui-confirm-popup
                  message="Delete this item?"
                  severity="danger"
                  acceptLabel="Delete"
                  position="left"
                  (onAccept)="deleteItem(item.id)"
                >
                  <button trigger class="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </ui-confirm-popup>
              </td>
            </tr>
          }
        </tbody>
      </table>
    `,
  }),
};
