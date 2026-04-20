import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { User, Star, Settings, Tag } from 'lucide-angular';

import { UiChipComponent } from './chip.component';

const meta: Meta<UiChipComponent> = {
  title: 'Misc/Chip',
  component: UiChipComponent,
  decorators: [
    moduleMetadata({
      imports: [UiChipComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Chip label',
      table: { category: 'Content' },
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Show remove button',
      table: { category: 'Behavior' },
    },
    image: {
      control: { type: 'text' },
      description: 'Image URL',
      table: { category: 'Content' },
    },
  },
};

export default meta;
type Story = StoryObj<UiChipComponent>;

export const Basic: Story = {
  args: {
    label: 'Chip Label',
  },
};

export const Removable: Story = {
  args: {
    label: 'Removable Chip',
    removable: true,
  },
};

export const WithImage: Story = {
  args: {
    label: 'John Doe',
    image: 'https://i.pravatar.cc/150?img=1',
    removable: true,
  },
};

export const WithIcon: Story = {
  render: () => ({
    props: {
      userIcon: User,
      starIcon: Star,
      settingsIcon: Settings,
      tagIcon: Tag,
    },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <ui-chip label="User" [icon]="userIcon" />
        <ui-chip label="Favorite" [icon]="starIcon" />
        <ui-chip label="Settings" [icon]="settingsIcon" />
        <ui-chip label="Tag" [icon]="tagIcon" />
      </div>
    `,
  }),
};

export const ColoredChips: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <ui-chip label="Primary" styleClass="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300" />
        <ui-chip label="Success" styleClass="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" />
        <ui-chip label="Warning" styleClass="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300" />
        <ui-chip label="Danger" styleClass="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" />
        <ui-chip label="Info" styleClass="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" />
      </div>
    `,
  }),
};

export const TeamMembers: Story = {
  render: () => ({
    props: {
      members: [
        { name: 'Alice', image: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Bob', image: 'https://i.pravatar.cc/150?img=2' },
        { name: 'Carol', image: 'https://i.pravatar.cc/150?img=3' },
        { name: 'David', image: 'https://i.pravatar.cc/150?img=4' },
      ],
      removeMember(index: number) {
        this['members'] = this['members'].filter((_: unknown, i: number) => i !== index);
      },
    },
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Team Members</label>
        <div class="flex flex-wrap items-center gap-2">
          @for (member of members; track $index) {
            <ui-chip
              [label]="member.name"
              [image]="member.image"
              [removable]="true"
              (onRemove)="removeMember($index)"
            />
          }
        </div>
      </div>
    `,
  }),
};

export const Tags: Story = {
  render: () => ({
    props: {
      tags: ['Angular', 'TypeScript', 'Tailwind', 'PrimeNG', 'Storybook'],
      tagIcon: Tag,
      removeTag(index: number) {
        this['tags'] = this['tags'].filter((_: string, i: number) => i !== index);
      },
    },
    template: `
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Technologies</label>
        <div class="flex flex-wrap items-center gap-2">
          @for (tag of tags; track $index) {
            <ui-chip
              [label]="tag"
              [icon]="tagIcon"
              [removable]="true"
              (onRemove)="removeTag($index)"
            />
          }
        </div>
      </div>
    `,
  }),
};
