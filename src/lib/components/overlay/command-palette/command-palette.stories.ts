import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { File, Settings, User, Home, Search } from 'lucide-angular';

import { UiCommandPaletteComponent } from './command-palette.component';
import type { CommandGroup } from './command-palette.component';

const sampleGroups: CommandGroup[] = [
  {
    label: 'Navigation',
    items: [
      { id: 'home', label: 'Go to Home', icon: Home, shortcut: '⌘H', action: () => alert('Home') },
      { id: 'settings', label: 'Open Settings', icon: Settings, shortcut: '⌘,', action: () => alert('Settings') },
    ],
  },
  {
    label: 'Files',
    items: [
      { id: 'new-file', label: 'New File', icon: File, shortcut: '⌘N', action: () => alert('New file') },
      { id: 'find-file', label: 'Find File', icon: Search, shortcut: '⌘P', action: () => alert('Find file') },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'profile', label: 'View Profile', icon: User, action: () => alert('Profile') },
    ],
  },
];

const meta: Meta<UiCommandPaletteComponent> = {
  title: 'Overlay/CommandPalette',
  component: UiCommandPaletteComponent,
  decorators: [
    moduleMetadata({
      imports: [UiCommandPaletteComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Input placeholder text',
    },
    closeOnSelect: {
      control: { type: 'boolean' },
      description: 'Close palette after selecting an item',
    },
  },
};

export default meta;
type Story = StoryObj<UiCommandPaletteComponent>;

export const Closed: Story = {
  render: () => ({
    props: {
      visible: false,
      groups: sampleGroups,
    },
    template: `
      <div class="p-8">
        <p class="text-sm text-muted-foreground mb-4">Press <kbd class="bg-muted px-1.5 py-0.5 rounded text-xs">⌘K</kbd> or click the button to open the command palette.</p>
        <button
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
          (click)="visible = true"
        >
          Open Command Palette
        </button>
        <ui-command-palette [(visible)]="visible" [groups]="groups" />
      </div>
    `,
  }),
};

export const WithGroups: Story = {
  render: () => ({
    props: {
      visible: true,
      groups: sampleGroups,
    },
    template: `
      <ui-command-palette [(visible)]="visible" [groups]="groups" />
    `,
  }),
};

export const Empty: Story = {
  render: () => ({
    props: {
      visible: true,
      groups: [],
    },
    template: `
      <ui-command-palette [(visible)]="visible" [groups]="groups" placeholder="No commands available..." />
    `,
  }),
};
