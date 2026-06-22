import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiCookieBannerComponent } from './cookie-banner.component';

const meta: Meta<UiCookieBannerComponent> = {
  title: 'Misc/CookieBanner',
  component: UiCookieBannerComponent,
  decorators: [
    moduleMetadata({
      imports: [UiCookieBannerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
      description: 'Fixed position on screen',
      table: { category: 'Layout' },
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Whether the banner is visible',
      table: { category: 'State' },
    },
    showSettings: {
      control: { type: 'boolean' },
      description: 'Show cookie settings link',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiCookieBannerComponent>;

export const Default: Story = {
  args: {
    visible: true,
    position: 'bottom',
    message: 'We use cookies to improve your experience.',
    acceptLabel: 'Accept All',
    rejectLabel: 'Reject',
    settingsLabel: 'Cookie Settings',
    showSettings: true,
  },
};

export const TopPosition: Story = {
  args: {
    visible: true,
    position: 'top',
    message: 'We use cookies to improve your experience.',
    acceptLabel: 'Accept All',
    rejectLabel: 'Reject',
    settingsLabel: 'Cookie Settings',
    showSettings: true,
  },
};

export const NoSettings: Story = {
  args: {
    visible: true,
    position: 'bottom',
    message: 'This site uses cookies for analytics and performance.',
    acceptLabel: 'Got it',
    rejectLabel: 'No thanks',
    showSettings: false,
  },
};

export const CustomMessage: Story = {
  args: {
    visible: true,
    position: 'bottom',
    message:
      'We and our partners use cookies and similar technologies to personalise content and ads, provide social media features, and analyse our traffic.',
    acceptLabel: 'Accept All Cookies',
    rejectLabel: 'Decline',
    settingsLabel: 'Manage Preferences',
    showSettings: true,
  },
};
