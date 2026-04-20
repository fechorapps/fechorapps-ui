import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiDialogComponent } from './dialog.component';

const meta: Meta<UiDialogComponent> = {
  title: 'Overlay/Dialog',
  component: UiDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [UiDialogComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: { type: 'text' },
      description: 'Dialog header text',
      table: { category: 'Content' },
    },
    position: {
      control: { type: 'select' },
      options: [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      description: 'Dialog position',
      table: { category: 'Position' },
    },
    modal: {
      control: { type: 'boolean' },
      description: 'Show modal backdrop',
      table: { category: 'Behavior' },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button',
      table: { category: 'Behavior' },
    },
    draggable: {
      control: { type: 'boolean' },
      description: 'Enable drag',
      table: { category: 'Behavior' },
    },
    resizable: {
      control: { type: 'boolean' },
      description: 'Enable resize',
      table: { category: 'Behavior' },
    },
    maximizable: {
      control: { type: 'boolean' },
      description: 'Show maximize button',
      table: { category: 'Behavior' },
    },
    dismissableMask: {
      control: { type: 'boolean' },
      description: 'Close on backdrop click',
      table: { category: 'Behavior' },
    },
    width: {
      control: { type: 'text' },
      description: 'Dialog width',
      table: { category: 'Size' },
    },
  },
};

export default meta;
type Story = StoryObj<UiDialogComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-dialog
        [(visible)]="visible"
        header="Dialog Title"
        [modal]="true"
        [closable]="true"
      >
        <p class="text-gray-600 dark:text-gray-300">
          This is the dialog content. You can put any content here including forms,
          text, images, or other components.
        </p>
      </ui-dialog>
    `,
  }),
};

export const WithFooter: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-dialog
        [(visible)]="visible"
        header="Confirm Action"
        [modal]="true"
      >
        <p class="text-gray-600 dark:text-gray-300">
          Are you sure you want to proceed with this action?
        </p>

        <ng-template #footer>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              (click)="visible = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="px-4 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
              (click)="visible = false"
            >
              Confirm
            </button>
          </div>
        </ng-template>
      </ui-dialog>
    `,
  }),
};

export const CustomHeader: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-dialog [(visible)]="visible" [modal]="true">
        <ng-template #header>
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span class="font-semibold text-gray-900 dark:text-gray-100">Custom Header</span>
          </div>
        </ng-template>

        <p class="text-gray-600 dark:text-gray-300">
          This dialog has a custom header with an icon.
        </p>
      </ui-dialog>
    `,
  }),
};

export const Draggable: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-dialog
        [(visible)]="visible"
        header="Draggable Dialog"
        [modal]="true"
        [draggable]="true"
      >
        <p class="text-gray-600 dark:text-gray-300">
          Drag the header to move this dialog around.
        </p>
      </ui-dialog>
    `,
  }),
};

export const Maximizable: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-dialog
        [(visible)]="visible"
        header="Maximizable Dialog"
        [modal]="true"
        [maximizable]="true"
      >
        <p class="text-gray-600 dark:text-gray-300">
          Click the maximize button to expand this dialog to full screen.
        </p>
      </ui-dialog>
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
      <ui-dialog
        [(visible)]="visible"
        header="Click Outside to Close"
        [modal]="true"
        [dismissableMask]="true"
      >
        <p class="text-gray-600 dark:text-gray-300">
          Click the backdrop to close this dialog.
        </p>
      </ui-dialog>
    `,
  }),
};

export const TopPosition: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-dialog
        [(visible)]="visible"
        header="Top Position"
        [modal]="true"
        position="top"
      >
        <p class="text-gray-600 dark:text-gray-300">
          This dialog appears at the top of the screen.
        </p>
      </ui-dialog>
    `,
  }),
};

export const BottomRightPosition: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-dialog
        [(visible)]="visible"
        header="Bottom Right"
        [modal]="true"
        position="bottom-right"
        width="400px"
      >
        <p class="text-gray-600 dark:text-gray-300">
          This dialog appears at the bottom right corner.
        </p>
      </ui-dialog>
    `,
  }),
};

export const NonModal: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          This content is still visible and interactive behind the dialog.
        </p>
        <button class="px-4 py-2 bg-primary-500 text-white rounded-lg">
          Clickable Button
        </button>
      </div>

      <ui-dialog
        [(visible)]="visible"
        header="Non-Modal Dialog"
        [modal]="false"
        position="top-right"
        width="350px"
      >
        <p class="text-gray-600 dark:text-gray-300">
          This dialog doesn't block the content behind it.
        </p>
      </ui-dialog>
    `,
  }),
};

export const CustomWidth: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
    },
    template: `
      <ui-dialog
        [(visible)]="visible"
        header="Custom Width Dialog"
        [modal]="true"
        width="80vw"
        minWidth="300px"
      >
        <p class="text-gray-600 dark:text-gray-300">
          This dialog has a custom width of 80vw.
        </p>
      </ui-dialog>
    `,
  }),
};

export const FormDialog: Story = {
  render: (args) => ({
    props: {
      ...args,
      visible: true,
      formData: { name: '', email: '' },
    },
    template: `
      <ui-dialog
        [(visible)]="visible"
        header="Create User"
        [modal]="true"
        width="500px"
      >
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter email"
            />
          </div>
        </form>

        <ng-template #footer>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              (click)="visible = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
            >
              Create
            </button>
          </div>
        </ng-template>
      </ui-dialog>
    `,
  }),
};
