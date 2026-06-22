import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiChatWindowComponent, ChatMessage } from './chat-window.component';

const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hey! How are you doing?',
    sender: 'Alice',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    content: "I'm doing great, thanks! Working on the new design system.",
    sender: 'me',
    timestamp: new Date(Date.now() - 3500000),
    isOwn: true,
  },
  {
    id: '3',
    content: 'Oh nice! I saw the components you pushed yesterday. They look amazing!',
    sender: 'Alice',
    timestamp: new Date(Date.now() - 3400000),
  },
  {
    id: '4',
    content: 'Thanks! Still a lot to do though.',
    sender: 'me',
    timestamp: new Date(Date.now() - 3300000),
    isOwn: true,
    status: 'read',
  },
  {
    id: '5',
    content: "Can't wait to see the final result 🚀",
    sender: 'Alice',
    timestamp: new Date(Date.now() - 3200000),
  },
];

const meta: Meta<UiChatWindowComponent> = {
  title: 'Communication/ChatWindow',
  component: UiChatWindowComponent,
  decorators: [
    moduleMetadata({
      imports: [UiChatWindowComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    placeholder: { control: 'text' },
    currentUser: { control: 'text' },
    loading: { control: 'boolean' },
  },
  args: {
    title: 'Chat',
    subtitle: undefined,
    placeholder: 'Type a message...',
    currentUser: 'me',
    loading: false,
    messages: [],
  },
};

export default meta;
type Story = StoryObj<UiChatWindowComponent>;

export const Empty: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 420px; width: 380px;">
        <ui-chat-window
          [title]="title"
          [subtitle]="subtitle"
          [placeholder]="placeholder"
          [currentUser]="currentUser"
          [loading]="loading"
          [messages]="messages"
        />
      </div>
    `,
  }),
};

export const WithMessages: Story = {
  args: {
    title: 'Alice',
    subtitle: 'Online',
    messages: sampleMessages,
    currentUser: 'me',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 480px; width: 380px;">
        <ui-chat-window
          [title]="title"
          [subtitle]="subtitle"
          [placeholder]="placeholder"
          [currentUser]="currentUser"
          [loading]="loading"
          [messages]="messages"
        />
      </div>
    `,
  }),
};

export const Loading: Story = {
  args: {
    title: 'Support Chat',
    loading: true,
    messages: [],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 420px; width: 380px;">
        <ui-chat-window
          [title]="title"
          [subtitle]="subtitle"
          [placeholder]="placeholder"
          [currentUser]="currentUser"
          [loading]="loading"
          [messages]="messages"
        />
      </div>
    `,
  }),
};
