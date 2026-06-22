import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiShortcutKeysComponent } from './shortcut-keys.component';
import type { ShortcutGroup } from './shortcut-keys.component';

const sampleShortcuts: ShortcutGroup[] = [
  {
    group: 'General',
    items: [
      { label: 'Open command palette', keys: ['Ctrl', 'Shift', 'P'] },
      { label: 'Save file', keys: ['Ctrl', 'S'] },
      { label: 'Undo', keys: ['Ctrl', 'Z'] },
      { label: 'Redo', keys: ['Ctrl', 'Y'] },
    ],
  },
  {
    group: 'Navigation',
    items: [
      { label: 'Go to file', keys: ['Ctrl', 'P'] },
      { label: 'Go to line', keys: ['Ctrl', 'G'] },
      { label: 'Switch tab', keys: ['Ctrl', 'Tab'] },
    ],
  },
  {
    group: 'Editing',
    items: [
      { label: 'Find', keys: ['Ctrl', 'F'] },
      { label: 'Find and replace', keys: ['Ctrl', 'H'] },
      { label: 'Format document', keys: ['Shift', 'Alt', 'F'] },
      { label: 'Toggle comment', keys: ['Ctrl', '/'] },
    ],
  },
];

const meta: Meta<UiShortcutKeysComponent> = {
  title: 'Misc/ShortcutKeys',
  component: UiShortcutKeysComponent,
  decorators: [
    moduleMetadata({
      imports: [UiShortcutKeysComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: { type: 'boolean' },
      description: 'Whether the panel is visible',
      table: { category: 'State' },
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Show search input',
      table: { category: 'Behavior' },
    },
    title: {
      control: { type: 'text' },
      description: 'Panel title',
      table: { category: 'Content' },
    },
  },
};

export default meta;
type Story = StoryObj<UiShortcutKeysComponent>;

export const Default: Story = {
  args: {
    shortcuts: sampleShortcuts,
    visible: true,
    searchable: true,
    title: 'Keyboard Shortcuts',
  },
};

export const NoSearch: Story = {
  args: {
    shortcuts: sampleShortcuts,
    visible: true,
    searchable: false,
    title: 'Keyboard Shortcuts',
  },
};

export const CustomTitle: Story = {
  args: {
    shortcuts: sampleShortcuts,
    visible: true,
    searchable: true,
    title: 'Hotkeys Reference',
  },
};

export const FewGroups: Story = {
  args: {
    shortcuts: [sampleShortcuts[0]],
    visible: true,
    searchable: true,
    title: 'General Shortcuts',
  },
};
