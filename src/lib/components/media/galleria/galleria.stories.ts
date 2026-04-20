import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiGalleriaComponent, GalleriaImage } from './galleria.component';

const galleriaImages: GalleriaImage[] = [
  {
    src: 'https://picsum.photos/seed/g1/800/600',
    thumbnailSrc: 'https://picsum.photos/seed/g1/100/100',
    alt: 'Image 1',
    title: 'Beautiful Landscape',
  },
  {
    src: 'https://picsum.photos/seed/g2/800/600',
    thumbnailSrc: 'https://picsum.photos/seed/g2/100/100',
    alt: 'Image 2',
    title: 'Mountain View',
  },
  {
    src: 'https://picsum.photos/seed/g3/800/600',
    thumbnailSrc: 'https://picsum.photos/seed/g3/100/100',
    alt: 'Image 3',
    title: 'Ocean Sunset',
  },
  {
    src: 'https://picsum.photos/seed/g4/800/600',
    thumbnailSrc: 'https://picsum.photos/seed/g4/100/100',
    alt: 'Image 4',
    title: 'Forest Path',
  },
  {
    src: 'https://picsum.photos/seed/g5/800/600',
    thumbnailSrc: 'https://picsum.photos/seed/g5/100/100',
    alt: 'Image 5',
    title: 'City Skyline',
  },
  {
    src: 'https://picsum.photos/seed/g6/800/600',
    thumbnailSrc: 'https://picsum.photos/seed/g6/100/100',
    alt: 'Image 6',
    title: 'Desert Dunes',
  },
];

const meta: Meta<UiGalleriaComponent> = {
  title: 'Media/Galleria',
  component: UiGalleriaComponent,
  decorators: [
    moduleMetadata({
      imports: [UiGalleriaComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    thumbnailsPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of thumbnails',
    },
    numVisible: {
      control: { type: 'number', min: 3, max: 7 },
      description: 'Number of visible thumbnails',
    },
  },
};

export default meta;
type Story = StoryObj<UiGalleriaComponent>;

export const Default: Story = {
  render: () => ({
    props: { images: galleriaImages },
    template: `
      <div class="max-w-3xl">
        <ui-galleria [value]="images"></ui-galleria>
      </div>
    `,
  }),
};

export const WithCaption: Story = {
  render: () => ({
    props: { images: galleriaImages },
    template: `
      <div class="max-w-3xl">
        <ui-galleria [value]="images" [showCaption]="true"></ui-galleria>
      </div>
    `,
  }),
};

export const ThumbnailsLeft: Story = {
  render: () => ({
    props: { images: galleriaImages },
    template: `
      <div class="max-w-4xl">
        <ui-galleria [value]="images" thumbnailsPosition="left" [numVisible]="4"></ui-galleria>
      </div>
    `,
  }),
};

export const ThumbnailsRight: Story = {
  render: () => ({
    props: { images: galleriaImages },
    template: `
      <div class="max-w-4xl">
        <ui-galleria [value]="images" thumbnailsPosition="right" [numVisible]="4"></ui-galleria>
      </div>
    `,
  }),
};

export const WithIndicators: Story = {
  render: () => ({
    props: { images: galleriaImages },
    template: `
      <div class="max-w-3xl">
        <ui-galleria [value]="images" [showThumbnails]="false" [showIndicators]="true"></ui-galleria>
      </div>
    `,
  }),
};

export const Fullscreen: Story = {
  render: () => ({
    props: { images: galleriaImages },
    template: `
      <div class="max-w-3xl">
        <ui-galleria [value]="images" [fullScreen]="true" [showCaption]="true"></ui-galleria>
        <p class="text-sm text-gray-500 mt-2">Click the maximize button or the image to enter fullscreen mode</p>
      </div>
    `,
  }),
};

export const Circular: Story = {
  render: () => ({
    props: { images: galleriaImages },
    template: `
      <div class="max-w-3xl">
        <ui-galleria [value]="images" [circular]="true"></ui-galleria>
      </div>
    `,
  }),
};

export const MinimalNavigators: Story = {
  render: () => ({
    props: { images: galleriaImages },
    template: `
      <div class="max-w-3xl">
        <ui-galleria [value]="images" [showThumbnails]="false" [showNavigators]="true"></ui-galleria>
      </div>
    `,
  }),
};
