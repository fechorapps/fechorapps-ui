import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiAudioPlayerComponent } from './audio-player.component';

const meta: Meta<UiAudioPlayerComponent> = {
  title: 'Media/AudioPlayer',
  component: UiAudioPlayerComponent,
  decorators: [
    moduleMetadata({
      imports: [UiAudioPlayerComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Audio source URL',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    title: {
      control: { type: 'text' },
      description: 'Track title',
      table: { category: 'Content', defaultValue: { summary: 'Audio' } },
    },
    artist: {
      control: { type: 'text' },
      description: 'Artist name shown below the title',
      table: { category: 'Content', defaultValue: { summary: 'undefined' } },
    },
    coverImage: {
      control: { type: 'text' },
      description: 'Cover art image URL',
      table: { category: 'Content', defaultValue: { summary: 'undefined' } },
    },
    autoplay: {
      control: { type: 'boolean' },
      description: 'Start playing automatically',
      table: { category: 'Behaviour', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    src: '',
    title: 'Audio',
    artist: undefined,
    coverImage: undefined,
    autoplay: false,
  },
};

export default meta;
type Story = StoryObj<UiAudioPlayerComponent>;

export const Default: Story = {
  args: {
    src: '',
    title: 'No Track Loaded',
  },
};

export const WithSource: Story = {
  args: {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'SoundHelix Song 1',
    artist: 'SoundHelix',
  },
};

export const WithCover: Story = {
  args: {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    title: 'SoundHelix Song 2',
    artist: 'SoundHelix',
    coverImage: 'https://picsum.photos/48/48',
  },
};

export const WithArtist: Story = {
  args: {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    title: 'SoundHelix Song 3',
    artist: 'Various Artists',
  },
};
