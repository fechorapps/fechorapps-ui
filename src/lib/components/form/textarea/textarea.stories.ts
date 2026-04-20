import type { Meta, StoryObj } from '@storybook/angular';

import { UiTextareaComponent } from './textarea.component';

const meta: Meta<UiTextareaComponent> = {
  title: 'Form/Textarea',
  component: UiTextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Textarea size',
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows',
    },
    autoResize: {
      control: 'boolean',
      description: 'Enable auto-resize',
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether textarea is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether textarea is in invalid state',
    },
  },
};

export default meta;
type Story = StoryObj<UiTextareaComponent>;

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    showCount: true,
    maxLength: 200,
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Start typing...',
    autoResize: true,
    rows: 2,
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-textarea variant="default" label="Default" placeholder="Default variant"></ui-textarea>
        <ui-textarea variant="filled" label="Filled" placeholder="Filled variant"></ui-textarea>
        <ui-textarea variant="outlined" label="Outlined" placeholder="Outlined variant"></ui-textarea>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <ui-textarea size="sm" label="Small" placeholder="Small size"></ui-textarea>
        <ui-textarea size="md" label="Medium" placeholder="Medium size"></ui-textarea>
        <ui-textarea size="lg" label="Large" placeholder="Large size"></ui-textarea>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit...',
    disabled: true,
    value: 'This content is read-only',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Enter your feedback...',
    invalid: true,
    helpText: 'Please provide at least 50 characters',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add any additional notes...',
    helpText: 'This information will be visible to your team',
  },
};
