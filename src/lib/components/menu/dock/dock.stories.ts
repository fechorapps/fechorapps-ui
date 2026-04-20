import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Home, Mail, Calendar, Settings, User, FileText } from 'lucide-angular';

import { UiDockComponent, DockItem } from './dock.component';

const dockItems: DockItem[] = [
  { label: 'Home', icon: Home },
  { label: 'Mail', icon: Mail, badge: '3' },
  { label: 'Calendar', icon: Calendar },
  { label: 'Documents', icon: FileText },
  { label: 'Settings', icon: Settings },
  { label: 'Profile', icon: User },
];

const meta: Meta<UiDockComponent> = {
  title: 'Menu/Dock',
  component: UiDockComponent,
  decorators: [
    moduleMetadata({
      imports: [UiDockComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Dock position on the screen',
    },
  },
};

export default meta;
type Story = StoryObj<UiDockComponent>;

export const Bottom: Story = {
  render: () => ({
    props: { items: dockItems },
    template: `
      <div class="h-96 relative bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg">
        <ui-dock [model]="items" position="bottom"></ui-dock>
      </div>
    `,
  }),
};

export const Top: Story = {
  render: () => ({
    props: { items: dockItems },
    template: `
      <div class="h-96 relative bg-gradient-to-br from-green-400 to-teal-500 rounded-lg">
        <ui-dock [model]="items" position="top"></ui-dock>
      </div>
    `,
  }),
};

export const Left: Story = {
  render: () => ({
    props: { items: dockItems },
    template: `
      <div class="h-96 relative bg-gradient-to-br from-orange-400 to-red-500 rounded-lg">
        <ui-dock [model]="items" position="left"></ui-dock>
      </div>
    `,
  }),
};

export const Right: Story = {
  render: () => ({
    props: { items: dockItems },
    template: `
      <div class="h-96 relative bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg">
        <ui-dock [model]="items" position="right"></ui-dock>
      </div>
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Home', icon: Home },
        { label: 'Mail', icon: Mail, disabled: true },
        { label: 'Calendar', icon: Calendar },
        { label: 'Settings', icon: Settings, disabled: true },
      ],
    },
    template: `
      <div class="h-96 relative bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg">
        <ui-dock [model]="items" position="bottom"></ui-dock>
      </div>
    `,
  }),
};
