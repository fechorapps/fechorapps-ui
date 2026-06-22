import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiErrorPageComponent } from './error-page.component';

const meta: Meta<UiErrorPageComponent> = {
  title: 'Misc/ErrorPage',
  component: UiErrorPageComponent,
  decorators: [
    moduleMetadata({
      imports: [UiErrorPageComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: { type: 'select' },
      options: [404, 500, 403, 503],
      description: 'HTTP error code',
      table: { category: 'Content' },
    },
    showHomeButton: {
      control: { type: 'boolean' },
      description: 'Show home button',
      table: { category: 'Behavior' },
    },
    showBackButton: {
      control: { type: 'boolean' },
      description: 'Show back button',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiErrorPageComponent>;

export const NotFound404: Story = {
  args: {
    code: 404,
    showHomeButton: true,
    showBackButton: true,
  },
};

export const ServerError500: Story = {
  args: {
    code: 500,
    showHomeButton: true,
    showBackButton: true,
  },
};

export const Forbidden403: Story = {
  args: {
    code: 403,
    showHomeButton: true,
    showBackButton: false,
  },
};
