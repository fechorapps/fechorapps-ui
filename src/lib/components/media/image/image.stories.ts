import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiImageComponent } from './image.component';

const meta: Meta<UiImageComponent> = {
  title: 'Media/Image',
  component: UiImageComponent,
  decorators: [
    moduleMetadata({
      imports: [UiImageComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
      table: { category: 'Content' },
    },
    alt: {
      control: { type: 'text' },
      description: 'Alternative text',
      table: { category: 'Content' },
    },
    preview: {
      control: { type: 'boolean' },
      description: 'Enable preview on click',
      table: { category: 'Behavior' },
    },
    width: {
      control: { type: 'text' },
      description: 'Image width',
      table: { category: 'Size' },
    },
    height: {
      control: { type: 'text' },
      description: 'Image height',
      table: { category: 'Size' },
    },
  },
};

export default meta;
type Story = StoryObj<UiImageComponent>;

const sampleImage = 'https://picsum.photos/800/600';
const sampleImageAlt = 'Sample landscape image';

export const Basic: Story = {
  args: {
    src: sampleImage,
    alt: sampleImageAlt,
    width: '400px',
  },
};

export const WithPreview: Story = {
  args: {
    src: sampleImage,
    alt: sampleImageAlt,
    width: '400px',
    preview: true,
  },
};

export const FixedSize: Story = {
  args: {
    src: sampleImage,
    alt: sampleImageAlt,
    width: '300px',
    height: '200px',
    preview: true,
  },
};

export const FullWidth: Story = {
  args: {
    src: 'https://picsum.photos/1200/400',
    alt: 'Wide banner image',
    preview: true,
  },
};

export const Gallery: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-4">
        <ui-image
          src="https://picsum.photos/id/10/400/300"
          alt="Image 1"
          [preview]="true"
        />
        <ui-image
          src="https://picsum.photos/id/20/400/300"
          alt="Image 2"
          [preview]="true"
        />
        <ui-image
          src="https://picsum.photos/id/30/400/300"
          alt="Image 3"
          [preview]="true"
        />
        <ui-image
          src="https://picsum.photos/id/40/400/300"
          alt="Image 4"
          [preview]="true"
        />
        <ui-image
          src="https://picsum.photos/id/50/400/300"
          alt="Image 5"
          [preview]="true"
        />
        <ui-image
          src="https://picsum.photos/id/60/400/300"
          alt="Image 6"
          [preview]="true"
        />
      </div>
    `,
  }),
};

export const WithCustomClass: Story = {
  args: {
    src: sampleImage,
    alt: sampleImageAlt,
    width: '300px',
    imageClass: 'rounded-xl shadow-lg',
    preview: true,
  },
};

export const Circular: Story = {
  render: () => ({
    template: `
      <ui-image
        src="https://picsum.photos/id/64/300/300"
        alt="Profile picture"
        width="150px"
        height="150px"
        imageClass="rounded-full object-cover"
        [preview]="true"
      />
    `,
  }),
};

export const ProductCard: Story = {
  render: () => ({
    template: `
      <div class="max-w-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <ui-image
          src="https://picsum.photos/id/96/400/300"
          alt="Product image"
          imageClass="w-full h-48 object-cover"
          [preview]="true"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold">Premium Laptop</h3>
          <p class="text-gray-500 text-sm mt-1">High performance laptop for professionals</p>
          <div class="flex items-center justify-between mt-4">
            <span class="text-xl font-bold text-primary-600">$1,299</span>
            <button class="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};
