import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { UiInplaceComponent } from './inplace.component';

const meta: Meta<UiInplaceComponent> = {
  title: 'Misc/Inplace',
  component: UiInplaceComponent,
  decorators: [
    moduleMetadata({
      imports: [UiInplaceComponent, FormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button when active',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable inline editing',
    },
  },
};

export default meta;
type Story = StoryObj<UiInplaceComponent>;

export const Default: Story = {
  render: () => ({
    props: { value: 'Click to Edit' },
    template: `
      <ui-inplace>
        <span inplaceDisplay>{{ value }}</span>
        <input
          inplaceContent
          type="text"
          [(ngModel)]="value"
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </ui-inplace>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <ui-inplace [disabled]="true">
        <span inplaceDisplay>This cannot be edited</span>
        <input inplaceContent type="text" class="px-3 py-2 border rounded-md" />
      </ui-inplace>
    `,
  }),
};

export const WithoutCloseButton: Story = {
  render: () => ({
    props: { value: 'Edit me' },
    template: `
      <ui-inplace [closable]="false">
        <span inplaceDisplay>{{ value }}</span>
        <input
          inplaceContent
          type="text"
          [(ngModel)]="value"
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
        />
      </ui-inplace>
    `,
  }),
};

export const ImageEdit: Story = {
  render: () => ({
    props: {
      imageUrl: 'https://picsum.photos/seed/inplace/200/200',
    },
    template: `
      <ui-inplace>
        <div inplaceDisplay>
          <img [src]="imageUrl" alt="Preview" class="w-24 h-24 rounded-lg object-cover" />
        </div>
        <div inplaceContent class="flex flex-col gap-2">
          <input
            type="text"
            [(ngModel)]="imageUrl"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            placeholder="Enter image URL"
          />
          <img [src]="imageUrl" alt="Preview" class="w-24 h-24 rounded-lg object-cover" />
        </div>
      </ui-inplace>
    `,
  }),
};
