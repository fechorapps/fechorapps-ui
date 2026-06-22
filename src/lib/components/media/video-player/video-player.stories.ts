import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiVideoPlayerComponent } from './video-player.component';

const meta: Meta<UiVideoPlayerComponent> = {
  title: 'Media/VideoPlayer',
  component: UiVideoPlayerComponent,
  decorators: [
    moduleMetadata({
      imports: [UiVideoPlayerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Video source URL',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    poster: {
      control: { type: 'text' },
      description: 'Poster image URL shown before play',
      table: { category: 'Content', defaultValue: { summary: 'undefined' } },
    },
    autoplay: {
      control: { type: 'boolean' },
      description: 'Start playing automatically',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
    loop: {
      control: { type: 'boolean' },
      description: 'Loop the video',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
    muted: {
      control: { type: 'boolean' },
      description: 'Start muted',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
    controls: {
      control: { type: 'boolean' },
      description: 'Show custom controls overlay',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
  },
  args: {
    src: '',
    poster: undefined,
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
  },
};

export default meta;
type Story = StoryObj<UiVideoPlayerComponent>;

export const Default: Story = {
  args: {
    src: '',
  },
};

export const WithSource: Story = {
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://picsum.photos/640/360',
  },
};

export const Autoplay: Story = {
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    autoplay: true,
    muted: true,
    loop: true,
  },
};

export const NoControls: Story = {
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    controls: false,
  },
};
