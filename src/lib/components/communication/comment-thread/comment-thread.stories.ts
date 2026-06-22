import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiCommentThreadComponent, Comment } from './comment-thread.component';

const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'Alice Johnson',
    content: 'This is a great design system! The components look really polished.',
    timestamp: new Date(Date.now() - 7200000),
    likes: 4,
    liked: false,
    replies: [
      {
        id: '1-1',
        author: 'Bob Smith',
        content: 'Totally agree! The typography is especially clean.',
        timestamp: new Date(Date.now() - 3600000),
        likes: 2,
        liked: true,
      },
    ],
  },
  {
    id: '2',
    author: 'Carol Williams',
    content: 'Have you thought about adding dark mode support?',
    timestamp: new Date(Date.now() - 1800000),
    likes: 1,
    liked: false,
    replies: [],
  },
  {
    id: '3',
    author: 'David Brown',
    content: 'The Storybook integration is really helpful for development.',
    timestamp: new Date(Date.now() - 900000),
    likes: 3,
    liked: false,
  },
];

const deepComments: Comment[] = [
  {
    id: 'd1',
    author: 'Eve Davis',
    content: 'Level 1 comment — great work on this!',
    timestamp: new Date(Date.now() - 5400000),
    likes: 5,
    replies: [
      {
        id: 'd1-1',
        author: 'Frank Miller',
        content: 'Level 2 reply — totally agree.',
        timestamp: new Date(Date.now() - 3600000),
        likes: 2,
        replies: [
          {
            id: 'd1-1-1',
            author: 'Grace Lee',
            content: 'Level 3 reply — deep nesting here.',
            timestamp: new Date(Date.now() - 1800000),
            likes: 1,
          },
        ],
      },
    ],
  },
];

const meta: Meta<UiCommentThreadComponent> = {
  title: 'Communication/CommentThread',
  component: UiCommentThreadComponent,
  decorators: [
    moduleMetadata({
      imports: [UiCommentThreadComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    maxDepth: { control: { type: 'number', min: 0, max: 5 } },
    showReplyInput: { control: 'boolean' },
    currentUser: { control: 'text' },
  },
  args: {
    comments: sampleComments,
    maxDepth: 2,
    showReplyInput: true,
    currentUser: 'You',
  },
};

export default meta;
type Story = StoryObj<UiCommentThreadComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 560px;" class="p-4">
        <ui-comment-thread
          [comments]="comments"
          [maxDepth]="maxDepth"
          [showReplyInput]="showReplyInput"
          [currentUser]="currentUser"
        />
      </div>
    `,
  }),
};

export const NoReplies: Story = {
  args: {
    showReplyInput: false,
    maxDepth: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 560px;" class="p-4">
        <ui-comment-thread
          [comments]="comments"
          [maxDepth]="maxDepth"
          [showReplyInput]="showReplyInput"
          [currentUser]="currentUser"
        />
      </div>
    `,
  }),
};

export const Deep: Story = {
  args: {
    comments: deepComments,
    maxDepth: 3,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 560px;" class="p-4">
        <ui-comment-thread
          [comments]="comments"
          [maxDepth]="maxDepth"
          [showReplyInput]="showReplyInput"
          [currentUser]="currentUser"
        />
      </div>
    `,
  }),
};
