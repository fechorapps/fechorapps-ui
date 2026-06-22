import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiMentionInputComponent, MentionUser } from './mention-input.component';

const sampleUsers: MentionUser[] = [
  { id: '1', name: 'Alice Johnson', username: 'alice' },
  { id: '2', name: 'Bob Smith', username: 'bobsmith' },
  { id: '3', name: 'Carol Williams', username: 'carol_w' },
  { id: '4', name: 'David Brown', username: 'dbrown' },
  { id: '5', name: 'Eve Davis', username: 'eve' },
];

const meta: Meta<UiMentionInputComponent> = {
  title: 'Communication/MentionInput',
  component: UiMentionInputComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMentionInputComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    triggerChar: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    value: '',
    users: sampleUsers,
    placeholder: 'Type @ to mention someone...',
    disabled: false,
    triggerChar: '@',
  },
};

export default meta;
type Story = StoryObj<UiMentionInputComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px;" class="p-4">
        <ui-mention-input
          [value]="value"
          [users]="users"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [triggerChar]="triggerChar"
        />
      </div>
    `,
  }),
};

export const Populated: Story = {
  args: {
    value: 'Hey @Alice Johnson — can you check this out?',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px;" class="p-4">
        <ui-mention-input
          [value]="value"
          [users]="users"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [triggerChar]="triggerChar"
        />
      </div>
    `,
  }),
};

export const NoUsers: Story = {
  args: {
    users: [],
    value: '',
    placeholder: 'No users available...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px;" class="p-4">
        <ui-mention-input
          [value]="value"
          [users]="users"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [triggerChar]="triggerChar"
        />
      </div>
    `,
  }),
};
