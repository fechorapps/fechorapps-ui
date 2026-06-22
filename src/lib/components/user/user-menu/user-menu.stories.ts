import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiUserMenuComponent, UserProfile, UserMenuItem } from './user-menu.component';
import { User as UserIcon, Settings as SettingsIcon, LogOut as LogOutIcon } from 'lucide-angular';

const sampleUser: UserProfile = { name: 'John Doe', email: 'john@example.com', role: 'Admin' };
const sampleUserWithAvatar: UserProfile = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'Editor',
  avatar: 'https://i.pravatar.cc/150?img=47',
};
const sampleItems: UserMenuItem[] = [
  { label: 'Profile', icon: UserIcon },
  { label: 'Settings', icon: SettingsIcon },
  { divider: true },
  { label: 'Sign out', icon: LogOutIcon },
];

const meta: Meta<UiUserMenuComponent> = {
  title: 'User/UserMenu',
  component: UiUserMenuComponent,
  decorators: [moduleMetadata({ imports: [UiUserMenuComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiUserMenuComponent>;

export const Default: Story = {
  args: {
    user: sampleUser,
    menuItems: sampleItems,
    placement: 'bottom-right',
  },
};

export const WithPlacement: Story = {
  args: {
    user: sampleUser,
    menuItems: sampleItems,
    placement: 'bottom-left',
  },
};

export const WithAvatar: Story = {
  args: {
    user: sampleUserWithAvatar,
    menuItems: sampleItems,
    placement: 'bottom-right',
  },
};
