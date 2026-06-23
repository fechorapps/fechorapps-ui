import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiLoadingScreenComponent } from './loading-screen.component';

const meta: Meta<UiLoadingScreenComponent> = {
  title: 'Layout/LoadingScreen',
  component: UiLoadingScreenComponent,
  decorators: [moduleMetadata({ imports: [UiLoadingScreenComponent] })],
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
    progress: { control: { type: 'number', min: 0, max: 100 } },
    message: { control: 'text' },
    overlay: { control: 'boolean' },
  },
  args: {
    visible: true,
    progress: null,
    message: 'Loading...',
    overlay: false,
  },
};

export default meta;
type Story = StoryObj<UiLoadingScreenComponent>;

export const Indeterminate: Story = {
  args: {
    visible: true,
    progress: null,
    message: 'Loading...',
    overlay: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; position: relative;">
        <ui-loading-screen
          [(visible)]="visible"
          [progress]="progress"
          [message]="message"
          [overlay]="overlay"
        />
      </div>
    `,
  }),
};

export const WithProgress50: Story = {
  args: {
    visible: true,
    progress: 50,
    message: 'Uploading files...',
    overlay: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; position: relative;">
        <ui-loading-screen
          [(visible)]="visible"
          [progress]="progress"
          [message]="message"
          [overlay]="overlay"
        />
      </div>
    `,
  }),
};

export const WithLogo: Story = {
  args: {
    visible: true,
    progress: null,
    message: 'Initializing application...',
    overlay: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; position: relative;">
        <ui-loading-screen
          [(visible)]="visible"
          [progress]="progress"
          [message]="message"
          [overlay]="overlay"
        >
          <div logo class="flex flex-col items-center gap-2">
            <div class="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-bold">
              A
            </div>
            <span class="text-xl font-semibold text-foreground">Acme Corp</span>
          </div>
        </ui-loading-screen>
      </div>
    `,
  }),
};

export const OverlayMode: Story = {
  args: {
    visible: true,
    progress: 75,
    message: 'Saving changes...',
    overlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; position: relative; background: #f0f0f0; padding: 1rem;">
        <p style="margin-bottom: 1rem;">Page content is behind the overlay</p>
        <ui-loading-screen
          [(visible)]="visible"
          [progress]="progress"
          [message]="message"
          [overlay]="overlay"
        />
      </div>
    `,
  }),
};
