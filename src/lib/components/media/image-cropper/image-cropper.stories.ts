import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiImageCropperComponent } from './image-cropper.component';

const meta: Meta<UiImageCropperComponent> = {
  title: 'Media/ImageCropper',
  component: UiImageCropperComponent,
  decorators: [
    moduleMetadata({
      imports: [UiImageCropperComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Image URL to crop',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    aspectRatio: {
      control: { type: 'number' },
      description: 'Aspect ratio constraint (e.g. 1 for square, 1.778 for 16:9). Undefined means free.',
      table: { category: 'Behaviour', defaultValue: { summary: 'undefined' } },
    },
    outputWidth: {
      control: { type: 'number' },
      description: 'Output canvas width in pixels',
      table: { category: 'Output', defaultValue: { summary: '300' } },
    },
    outputHeight: {
      control: { type: 'number' },
      description: 'Output canvas height in pixels',
      table: { category: 'Output', defaultValue: { summary: '300' } },
    },
    quality: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      description: 'JPEG quality (0–1)',
      table: { category: 'Output', defaultValue: { summary: '0.9' } },
    },
  },
  args: {
    src: '',
    aspectRatio: undefined,
    outputWidth: 300,
    outputHeight: 300,
    quality: 0.9,
  },
};

export default meta;
type Story = StoryObj<UiImageCropperComponent>;

export const WithImage: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
  },
};

export const NoImage: Story = {
  args: {
    src: '',
  },
};

export const SquareAspectRatio: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    aspectRatio: 1,
    outputWidth: 300,
    outputHeight: 300,
  },
};

export const WidescreenAspectRatio: Story = {
  args: {
    src: 'https://picsum.photos/640/360',
    aspectRatio: 16 / 9,
    outputWidth: 640,
    outputHeight: 360,
  },
};
