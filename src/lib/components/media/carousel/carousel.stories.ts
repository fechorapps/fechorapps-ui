import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiCarouselComponent } from './carousel.component';

interface CarouselItem {
  title: string;
  description: string;
  image: string;
}

const carouselItems: CarouselItem[] = [
  {
    title: 'Product 1',
    description: 'Description for product 1',
    image: 'https://picsum.photos/seed/1/400/300',
  },
  {
    title: 'Product 2',
    description: 'Description for product 2',
    image: 'https://picsum.photos/seed/2/400/300',
  },
  {
    title: 'Product 3',
    description: 'Description for product 3',
    image: 'https://picsum.photos/seed/3/400/300',
  },
  {
    title: 'Product 4',
    description: 'Description for product 4',
    image: 'https://picsum.photos/seed/4/400/300',
  },
  {
    title: 'Product 5',
    description: 'Description for product 5',
    image: 'https://picsum.photos/seed/5/400/300',
  },
  {
    title: 'Product 6',
    description: 'Description for product 6',
    image: 'https://picsum.photos/seed/6/400/300',
  },
];

const meta: Meta<UiCarouselComponent<CarouselItem>> = {
  title: 'Media/Carousel',
  component: UiCarouselComponent,
  decorators: [
    moduleMetadata({
      imports: [UiCarouselComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    numVisible: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of visible items',
    },
    numScroll: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Number of items to scroll',
    },
    circular: {
      control: { type: 'boolean' },
      description: 'Enable circular navigation',
    },
  },
};

export default meta;
type Story = StoryObj<UiCarouselComponent<CarouselItem>>;

export const Default: Story = {
  render: () => ({
    props: { items: carouselItems },
    template: `
      <ui-carousel [value]="items" [numVisible]="3" [numScroll]="1">
        <ng-template let-item>
          <div class="p-2">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img [src]="item.image" [alt]="item.title" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-carousel>
    `,
  }),
};

export const SingleItem: Story = {
  render: () => ({
    props: { items: carouselItems },
    template: `
      <ui-carousel [value]="items" [numVisible]="1" [numScroll]="1">
        <ng-template let-item>
          <div class="p-2">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img [src]="item.image" [alt]="item.title" class="w-full h-64 object-cover" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-carousel>
    `,
  }),
};

export const Circular: Story = {
  render: () => ({
    props: { items: carouselItems },
    template: `
      <ui-carousel [value]="items" [numVisible]="3" [numScroll]="1" [circular]="true">
        <ng-template let-item>
          <div class="p-2">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img [src]="item.image" [alt]="item.title" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-carousel>
    `,
  }),
};

export const Autoplay: Story = {
  render: () => ({
    props: { items: carouselItems },
    template: `
      <ui-carousel [value]="items" [numVisible]="3" [numScroll]="1" [circular]="true" [autoplayInterval]="3000">
        <ng-template let-item>
          <div class="p-2">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img [src]="item.image" [alt]="item.title" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-carousel>
    `,
  }),
};

export const WithoutIndicators: Story = {
  render: () => ({
    props: { items: carouselItems },
    template: `
      <ui-carousel [value]="items" [numVisible]="3" [numScroll]="1" [showIndicators]="false">
        <ng-template let-item>
          <div class="p-2">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img [src]="item.image" [alt]="item.title" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ item.title }}</h3>
              </div>
            </div>
          </div>
        </ng-template>
      </ui-carousel>
    `,
  }),
};
