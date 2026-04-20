import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiAvatarComponent } from './avatar.component';

const meta: Meta<UiAvatarComponent> = {
  title: 'Misc/Avatar',
  component: UiAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [UiAvatarComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'normal', 'large', 'xlarge'],
      description: 'Avatar size',
      table: { category: 'Appearance', defaultValue: { summary: 'normal' } },
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      description: 'Avatar shape',
      table: { category: 'Appearance', defaultValue: { summary: 'circle' } },
    },
    image: {
      control: { type: 'text' },
      description: 'Image URL — takes priority over label and icon',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    label: {
      control: { type: 'text' },
      description: 'Text used to derive initials (e.g. "John Doe" → "JD")',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    icon: {
      control: { type: 'boolean' },
      description: 'Show default user icon when no image or label is set',
      table: { category: 'Content', defaultValue: { summary: 'false' } },
    },
    styleClass: {
      control: { type: 'text' },
      description: 'Additional CSS classes applied to the container',
      table: { category: 'Styling', defaultValue: { summary: '' } },
    },
  },
  args: {
    size: 'normal',
    shape: 'circle',
    image: '',
    label: 'John Doe',
    icon: false,
    styleClass: '',
  },
};

export default meta;
type Story = StoryObj<UiAvatarComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-avatar
        [image]="image"
        [label]="label"
        [icon]="icon"
        [size]="size"
        [shape]="shape"
        [styleClass]="styleClass"
      />
    `,
  }),
};

export const WithImage: Story = {
  args: {
    image: 'https://i.pravatar.cc/150?img=1',
    size: 'large',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'John Doe',
    size: 'large',
  },
};

export const WithIcon: Story = {
  args: {
    icon: true,
    size: 'large',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-avatar size="small" label="SM" />
        <ui-avatar size="normal" label="MD" />
        <ui-avatar size="large" label="LG" />
        <ui-avatar size="xlarge" label="XL" />
      </div>
    `,
  }),
};

export const ImageSizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-avatar size="small" image="https://i.pravatar.cc/150?img=1" />
        <ui-avatar size="normal" image="https://i.pravatar.cc/150?img=2" />
        <ui-avatar size="large" image="https://i.pravatar.cc/150?img=3" />
        <ui-avatar size="xlarge" image="https://i.pravatar.cc/150?img=4" />
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-avatar shape="circle" image="https://i.pravatar.cc/150?img=5" size="large" />
        <ui-avatar shape="square" image="https://i.pravatar.cc/150?img=6" size="large" />
      </div>
    `,
  }),
};

export const LabelInitials: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <ui-avatar label="John" size="large" />
        <ui-avatar label="John Doe" size="large" />
        <ui-avatar label="A" size="large" />
        <ui-avatar label="Alice Bob Charlie" size="large" />
      </div>
    `,
  }),
};

export const AvatarGroup: Story = {
  render: () => ({
    template: `
      <div class="flex -space-x-3">
        <ui-avatar image="https://i.pravatar.cc/150?img=1" styleClass="ring-2 ring-white dark:ring-gray-900" />
        <ui-avatar image="https://i.pravatar.cc/150?img=2" styleClass="ring-2 ring-white dark:ring-gray-900" />
        <ui-avatar image="https://i.pravatar.cc/150?img=3" styleClass="ring-2 ring-white dark:ring-gray-900" />
        <ui-avatar image="https://i.pravatar.cc/150?img=4" styleClass="ring-2 ring-white dark:ring-gray-900" />
        <ui-avatar label="+5" styleClass="ring-2 ring-white dark:ring-gray-900 bg-primary-500 text-white" />
      </div>
    `,
  }),
};

export const WithBadge: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-8">
        <div class="relative inline-block">
          <ui-avatar image="https://i.pravatar.cc/150?img=7" size="large" />
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
        </div>

        <div class="relative inline-block">
          <ui-avatar image="https://i.pravatar.cc/150?img=8" size="large" />
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white dark:border-gray-900 rounded-full"></span>
        </div>

        <div class="relative inline-block">
          <ui-avatar image="https://i.pravatar.cc/150?img=9" size="large" />
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
        </div>
      </div>
    `,
  }),
};

export const UserList: Story = {
  render: () => ({
    template: `
      <div class="space-y-3 max-w-xs">
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <ui-avatar image="https://i.pravatar.cc/150?img=10" />
          <div>
            <p class="font-medium text-sm">Alice Johnson</p>
            <p class="text-xs text-gray-500">Product Designer</p>
          </div>
        </div>
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <ui-avatar label="Bob Smith" />
          <div>
            <p class="font-medium text-sm">Bob Smith</p>
            <p class="text-xs text-gray-500">Developer</p>
          </div>
        </div>
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <ui-avatar image="https://i.pravatar.cc/150?img=12" />
          <div>
            <p class="font-medium text-sm">Carol Williams</p>
            <p class="text-xs text-gray-500">Project Manager</p>
          </div>
        </div>
      </div>
    `,
  }),
};
