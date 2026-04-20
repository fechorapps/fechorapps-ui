import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiBlockUiComponent } from './block-ui.component';

const meta: Meta<UiBlockUiComponent> = {
  title: 'Misc/BlockUI',
  component: UiBlockUiComponent,
  decorators: [
    moduleMetadata({
      imports: [UiBlockUiComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    blocked: {
      control: { type: 'boolean' },
      description: 'Whether the content is blocked',
    },
    message: {
      control: { type: 'text' },
      description: 'Message to display while blocked',
    },
  },
};

export default meta;
type Story = StoryObj<UiBlockUiComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <ui-block-ui [blocked]="true">
        <div class="p-8 bg-white dark:bg-gray-800 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Blocked Content</h3>
          <p class="text-gray-600 dark:text-gray-400">This content is currently blocked and cannot be interacted with.</p>
        </div>
      </ui-block-ui>
    `,
  }),
};

export const WithMessage: Story = {
  render: () => ({
    template: `
      <ui-block-ui [blocked]="true" message="Loading...">
        <div class="p-8 bg-white dark:bg-gray-800 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Content with Message</h3>
          <p class="text-gray-600 dark:text-gray-400">A loading message is displayed over this content.</p>
        </div>
      </ui-block-ui>
    `,
  }),
};

export const Unblocked: Story = {
  render: () => ({
    template: `
      <ui-block-ui [blocked]="false">
        <div class="p-8 bg-white dark:bg-gray-800 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Active Content</h3>
          <p class="text-gray-600 dark:text-gray-400">This content is not blocked and can be interacted with.</p>
          <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Click Me</button>
        </div>
      </ui-block-ui>
    `,
  }),
};

export const FormBlocking: Story = {
  render: () => ({
    props: { isBlocked: false },
    template: `
      <div class="space-y-4">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          (click)="isBlocked = !isBlocked"
        >
          {{ isBlocked ? 'Unblock' : 'Block' }} Form
        </button>

        <ui-block-ui [blocked]="isBlocked" message="Saving...">
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name</label>
              <input type="text" class="w-full px-3 py-2 border rounded-md" placeholder="Enter name" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input type="email" class="w-full px-3 py-2 border rounded-md" placeholder="Enter email" />
            </div>
            <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Submit</button>
          </div>
        </ui-block-ui>
      </div>
    `,
  }),
};
