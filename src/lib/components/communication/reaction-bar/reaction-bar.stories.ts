import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiReactionBarComponent, Reaction } from './reaction-bar.component';

const defaultReactions: Reaction[] = [
  { emoji: '👍', label: 'Like', count: 12, reacted: true },
  { emoji: '❤️', label: 'Love', count: 5, reacted: false },
  { emoji: '😂', label: 'Haha', count: 3, reacted: false },
  { emoji: '😮', label: 'Wow', count: 1, reacted: false },
  { emoji: '🔥', label: 'Fire', count: 7, reacted: false },
];

const meta: Meta<UiReactionBarComponent> = {
  title: 'Communication/ReactionBar',
  component: UiReactionBarComponent,
  decorators: [
    moduleMetadata({
      imports: [UiReactionBarComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showCounts: { control: 'boolean' },
    showAddButton: { control: 'boolean' },
  },
  args: {
    reactions: defaultReactions,
    showCounts: true,
    showAddButton: true,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<UiReactionBarComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4">
        <ui-reaction-bar
          [reactions]="reactions"
          [showCounts]="showCounts"
          [showAddButton]="showAddButton"
          [size]="size"
        />
      </div>
    `,
  }),
};

export const NoAdd: Story = {
  args: {
    showAddButton: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4">
        <ui-reaction-bar
          [reactions]="reactions"
          [showCounts]="showCounts"
          [showAddButton]="showAddButton"
          [size]="size"
        />
      </div>
    `,
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4">
        <ui-reaction-bar
          [reactions]="reactions"
          [showCounts]="showCounts"
          [showAddButton]="showAddButton"
          [size]="size"
        />
      </div>
    `,
  }),
};
