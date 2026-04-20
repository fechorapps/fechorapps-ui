import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, fn } from 'storybook/test';

import {
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  LucideAngularModule,
  Mail,
  Plus,
  Save,
  Settings,
  Trash2,
} from 'lucide-angular';

import { UiButtonComponent } from './button.component';

/**
 * The Button component is a fundamental UI element used for triggering actions.
 * It supports multiple variants, sizes, states, and Lucide icons.
 *
 * ## Actions
 * Click on the button and check the **Actions** panel (bottom) to see events being logged.
 */
const meta: Meta<UiButtonComponent> = {
  title: 'Button/Button',
  component: UiButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [LucideAngularModule],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'The visual style variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether button should take full width',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether button should only show icon (no text)',
    },
    // Define clicked as an action
    clicked: {
      action: 'clicked',
      description: 'Emitted when button is clicked',
      table: {
        category: 'Events',
      },
    },
  },
  // Default args
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        [iconOnly]="iconOnly"
        (clicked)="clicked($event)"
      >Button</ui-button>
    `,
  }),
};

export default meta;
type Story = StoryObj<UiButtonComponent>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
  },
};

// =============================================================================
// SIZE STORIES
// =============================================================================

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
  },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithLeftIcon: Story = {
  render: (args) => ({
    props: { ...args, icon: Check },
    template: `<ui-button variant="primary" [icon]="icon">Confirm</ui-button>`,
  }),
};

export const WithRightIcon: Story = {
  render: (args) => ({
    props: { ...args, iconEnd: ArrowRight },
    template: `<ui-button variant="primary" [iconEnd]="iconEnd">Continue</ui-button>`,
  }),
};

export const WithBothIcons: Story = {
  render: (args) => ({
    props: { ...args, icon: Download, iconEnd: ExternalLink },
    template: `<ui-button variant="secondary" [icon]="icon" [iconEnd]="iconEnd">Download</ui-button>`,
  }),
};

export const IconOnly: Story = {
  render: (args) => ({
    props: { ...args, icon: Settings },
    template: `<ui-button variant="ghost" [icon]="icon" [iconOnly]="true" aria-label="Settings"></ui-button>`,
  }),
};

export const IconOnlyVariants: Story = {
  render: () => ({
    props: {
      plus: Plus,
      settings: Settings,
      trash: Trash2,
      mail: Mail,
    },
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ui-button variant="primary" [icon]="plus" [iconOnly]="true" aria-label="Add"></ui-button>
        <ui-button variant="secondary" [icon]="settings" [iconOnly]="true" aria-label="Settings"></ui-button>
        <ui-button variant="outline" [icon]="mail" [iconOnly]="true" aria-label="Email"></ui-button>
        <ui-button variant="danger" [icon]="trash" [iconOnly]="true" aria-label="Delete"></ui-button>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// ALL VARIANTS
// =============================================================================

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ui-button variant="primary">Primary</ui-button>
        <ui-button variant="secondary">Secondary</ui-button>
        <ui-button variant="outline">Outline</ui-button>
        <ui-button variant="ghost">Ghost</ui-button>
        <ui-button variant="danger">Danger</ui-button>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <ui-button size="sm">Small</ui-button>
        <ui-button size="md">Medium</ui-button>
        <ui-button size="lg">Large</ui-button>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const ButtonsWithIcons: Story = {
  render: () => ({
    props: {
      save: Save,
      plus: Plus,
      trash: Trash2,
      download: Download,
    },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ui-button variant="primary" [icon]="save">Save</ui-button>
        <ui-button variant="secondary" [icon]="plus">Add New</ui-button>
        <ui-button variant="outline" [icon]="download">Download</ui-button>
        <ui-button variant="danger" [icon]="trash">Delete</ui-button>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const LoadingStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <ui-button variant="primary" [loading]="true">Saving...</ui-button>
        <ui-button variant="secondary" [loading]="true">Processing...</ui-button>
        <ui-button variant="outline" [loading]="true">Loading...</ui-button>
      </div>
      <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
        Note: Buttons in loading state don't emit click events
      </p>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// INTERACTIONS - Automated testing with play function
// =============================================================================

// Spy for tracking clicks in interactions
const clickSpy = fn();

/**
 * This story demonstrates Storybook Interactions.
 * Click the "Interactions" tab (bottom panel) to see the test steps.
 */
export const ClickInteraction: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => {
    clickSpy.mockClear(); // Reset spy for each render
    return {
      props: {
        ...args,
        handleClick: clickSpy,
      },
      template: `
        <ui-button
          [variant]="variant"
          [size]="size"
          [disabled]="disabled"
          [loading]="loading"
          (clicked)="handleClick($event)"
        >Click Me</ui-button>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    // Simulate a user click
    await userEvent.click(button);

    // Verify the click handler was called
    await expect(clickSpy).toHaveBeenCalledTimes(1);
  },
};

// Spy for disabled button test
const disabledClickSpy = fn();

/**
 * Test that disabled buttons don't emit click events.
 */
export const DisabledInteraction: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
  render: (args) => {
    disabledClickSpy.mockClear();
    return {
      props: {
        ...args,
        handleClick: disabledClickSpy,
      },
      template: `
        <ui-button
          [variant]="variant"
          [disabled]="disabled"
          (clicked)="handleClick($event)"
        >Disabled Button</ui-button>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });

    // Try to click the disabled button
    await userEvent.click(button);

    // Verify click handler was NOT called
    await expect(disabledClickSpy).not.toHaveBeenCalled();
  },
};

// Spy for multiple clicks test
const multiClickSpy = fn();

/**
 * Test multiple clicks.
 */
export const MultipleClicks: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => {
    multiClickSpy.mockClear();
    return {
      props: {
        ...args,
        handleClick: multiClickSpy,
      },
      template: `
        <ui-button
          [variant]="variant"
          (clicked)="handleClick($event)"
        >Click Multiple Times</ui-button>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Click 3 times
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);

    // Verify 3 clicks
    await expect(multiClickSpy).toHaveBeenCalledTimes(3);
  },
};
