import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiColorThemeSwitcherComponent, DEFAULT_PALETTES } from './color-theme-switcher.component';

const meta: Meta<UiColorThemeSwitcherComponent> = {
  title: 'Misc/ColorThemeSwitcher',
  component: UiColorThemeSwitcherComponent,
  decorators: [
    moduleMetadata({
      imports: [UiColorThemeSwitcherComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    currentTheme: {
      control: { type: 'text' },
      description: 'Currently selected theme name',
      table: { category: 'State' },
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Show "Theme:" label',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<UiColorThemeSwitcherComponent>;

export const Default: Story = {
  args: {
    currentTheme: 'Blue',
    showLabel: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    currentTheme: 'Purple',
    showLabel: false,
  },
};

export const CustomThemes: Story = {
  render: () => ({
    props: {
      themes: [
        { name: 'Ocean', color: '#0ea5e9' },
        { name: 'Sunset', color: '#f59e0b' },
        { name: 'Forest', color: '#16a34a' },
        { name: 'Night', color: '#6366f1' },
      ],
      currentTheme: 'Ocean',
    },
    template: `
      <ui-color-theme-switcher
        [themes]="themes"
        [currentTheme]="currentTheme"
        [showLabel]="true"
      />
    `,
  }),
};
