import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiProductCardComponent, Product } from './product-card.component';

const sampleProduct: Product = {
  id: '1',
  name: 'Premium Wireless Headphones',
  description: 'High-quality over-ear headphones with active noise cancellation.',
  price: 79.99,
  originalPrice: 129.99,
  currency: '$',
  image: 'https://picsum.photos/seed/headphones/400/400',
  badge: 'Sale',
  rating: 4.5,
  reviewCount: 128,
  inStock: true,
};

const outOfStockProduct: Product = {
  id: '2',
  name: 'Smart Watch Series X',
  description: 'Advanced fitness tracking with heart rate monitor.',
  price: 249.99,
  currency: '$',
  image: 'https://picsum.photos/seed/watch/400/400',
  badge: 'New',
  rating: 4.8,
  reviewCount: 52,
  inStock: false,
};

const simpleProduct: Product = {
  id: '3',
  name: 'Basic Cotton T-Shirt',
  price: 19.99,
  currency: '$',
  inStock: true,
};

const meta: Meta<UiProductCardComponent> = {
  title: 'Ecommerce/ProductCard',
  component: UiProductCardComponent,
  decorators: [
    moduleMetadata({
      imports: [UiProductCardComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    showRating: { control: 'boolean' },
    showBadge: { control: 'boolean' },
    orientation: { control: { type: 'radio', options: ['vertical', 'horizontal'] } },
  },
};

export default meta;
type Story = StoryObj<UiProductCardComponent>;

export const Default: Story = {
  args: {
    product: sampleProduct,
    showRating: true,
    showBadge: true,
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 240px;">
        <ui-product-card
          [product]="product"
          [showRating]="showRating"
          [showBadge]="showBadge"
          [orientation]="orientation"
        />
      </div>
    `,
  }),
};

export const OutOfStock: Story = {
  args: {
    product: outOfStockProduct,
    showRating: true,
    showBadge: true,
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 240px;">
        <ui-product-card
          [product]="product"
          [showRating]="showRating"
          [showBadge]="showBadge"
          [orientation]="orientation"
        />
      </div>
    `,
  }),
};

export const Horizontal: Story = {
  args: {
    product: sampleProduct,
    showRating: true,
    showBadge: true,
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 380px;">
        <ui-product-card
          [product]="product"
          [showRating]="showRating"
          [showBadge]="showBadge"
          [orientation]="orientation"
        />
      </div>
    `,
  }),
};

export const NoImageMinimal: Story = {
  args: {
    product: simpleProduct,
    showRating: false,
    showBadge: false,
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 240px;">
        <ui-product-card
          [product]="product"
          [showRating]="showRating"
          [showBadge]="showBadge"
          [orientation]="orientation"
        />
      </div>
    `,
  }),
};
