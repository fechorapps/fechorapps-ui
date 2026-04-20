import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiTerminalComponent } from './terminal.component';

const meta: Meta<UiTerminalComponent> = {
  title: 'Misc/Terminal',
  component: UiTerminalComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTerminalComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    welcomeMessage: {
      control: { type: 'text' },
      description: 'Welcome message displayed on terminal start',
    },
    prompt: {
      control: { type: 'text' },
      description: 'Command prompt symbol',
    },
  },
};

export default meta;
type Story = StoryObj<UiTerminalComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <ui-terminal
          welcomeMessage="Welcome to Terminal v1.0"
          (onCommand)="handleCommand($event)"
        ></ui-terminal>
      </div>
    `,
    props: {
      handleCommand: (cmd: string) => console.log('Command:', cmd),
    },
  }),
};

export const CustomPrompt: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <ui-terminal
          welcomeMessage="Node.js REPL"
          prompt=">"
          (onCommand)="handleCommand($event)"
        ></ui-terminal>
      </div>
    `,
    props: {
      handleCommand: (cmd: string) => console.log('Command:', cmd),
    },
  }),
};

export const PythonStyle: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <ui-terminal
          welcomeMessage="Python 3.11.0 (main, Oct 24 2022)&#10;Type 'help' for more information."
          prompt=">>>"
          (onCommand)="handleCommand($event)"
        ></ui-terminal>
      </div>
    `,
    props: {
      handleCommand: (cmd: string) => console.log('Command:', cmd),
    },
  }),
};

export const GitBash: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <ui-terminal
          welcomeMessage="Git Bash v2.40.0"
          prompt="user@host MINGW64 ~"
          (onCommand)="handleCommand($event)"
        ></ui-terminal>
      </div>
    `,
    props: {
      handleCommand: (cmd: string) => console.log('Command:', cmd),
    },
  }),
};

export const NoWelcome: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <ui-terminal
          welcomeMessage=""
          (onCommand)="handleCommand($event)"
        ></ui-terminal>
      </div>
    `,
    props: {
      handleCommand: (cmd: string) => console.log('Command:', cmd),
    },
  }),
};
