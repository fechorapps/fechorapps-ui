import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiUserCardComponent, UserProfile } from './user-card.component';

const sampleUser: UserProfile = { name: 'John Doe', email: 'john@example.com', role: 'Admin' };
const sampleUserWithAvatar: UserProfile = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'Editor',
  avatar: 'https://i.pravatar.cc/150?img=47',
};

const meta: Meta<UiUserCardComponent> = {
  title: 'User/UserCard',
  component: UiUserCardComponent,
  decorators: [moduleMetadata({ imports: [UiUserCardComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiUserCardComponent>;

export const Default: Story = {
  args: {
    user: sampleUser,
    variant: 'full',
    showStatus: true,
    status: 'online',
    clickable: false,
  },
};

export const Compact: Story = {
  args: {
    user: sampleUser,
    variant: 'compact',
    showStatus: true,
    status: 'away',
    clickable: false,
  },
};

export const Clickable: Story = {
  render: () => ({
    props: {
      users: [
        { user: sampleUser, status: 'online' },
        { user: { ...sampleUser, name: 'Jane Smith', email: 'jane@example.com' }, status: 'away' },
        { user: { ...sampleUser, name: 'Bob Johnson', email: 'bob@example.com' }, status: 'busy' },
        { user: { ...sampleUser, name: 'Alice Brown', email: 'alice@example.com' }, status: 'offline' },
      ],
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;max-width:320px">
        <ui-user-card [user]="users[0].user" [status]="users[0].status" [clickable]="true" />
        <ui-user-card [user]="users[1].user" [status]="users[1].status" [clickable]="true" />
        <ui-user-card [user]="users[2].user" [status]="users[2].status" [clickable]="true" />
        <ui-user-card [user]="users[3].user" [status]="users[3].status" [clickable]="true" />
      </div>
    `,
  }),
};
