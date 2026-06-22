import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiCartSummaryComponent, CartItem } from './cart-summary.component';

const items: CartItem[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    image: 'https://picsum.photos/seed/headphones/80/80',
    price: 79.99,
    quantity: 1,
    variant: 'Midnight Black',
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    image: 'https://picsum.photos/seed/watch/80/80',
    price: 249.99,
    quantity: 2,
    variant: 'Silver / 44mm',
  },
  {
    id: '3',
    name: 'Basic Cotton T-Shirt',
    price: 19.99,
    quantity: 3,
    variant: 'White / M',
  },
];

const meta: Meta<UiCartSummaryComponent> = {
  title: 'Ecommerce/CartSummary',
  component: UiCartSummaryComponent,
  decorators: [
    moduleMetadata({
      imports: [UiCartSummaryComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    currency: { control: 'text' },
    discount: { control: { type: 'number', min: 0 } },
    tax: { control: { type: 'number', min: 0 } },
    shippingCost: { control: { type: 'number', min: 0 } },
    freeShippingThreshold: { control: { type: 'number', min: 0 } },
    checkoutLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UiCartSummaryComponent>;

export const WithItems: Story = {
  args: {
    items,
    currency: '$',
    discount: 0,
    tax: 0,
    shippingCost: 5.99,
    freeShippingThreshold: null,
    checkoutLabel: 'Proceed to Checkout',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 420px;">
        <ui-cart-summary
          [items]="items"
          [currency]="currency"
          [discount]="discount"
          [tax]="tax"
          [shippingCost]="shippingCost"
          [freeShippingThreshold]="freeShippingThreshold"
          [checkoutLabel]="checkoutLabel"
        />
      </div>
    `,
  }),
};

export const WithDiscountAndTax: Story = {
  args: {
    items,
    currency: '$',
    discount: 20,
    tax: 35.42,
    shippingCost: 0,
    freeShippingThreshold: null,
    checkoutLabel: 'Proceed to Checkout',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 420px;">
        <ui-cart-summary
          [items]="items"
          [currency]="currency"
          [discount]="discount"
          [tax]="tax"
          [shippingCost]="shippingCost"
          [freeShippingThreshold]="freeShippingThreshold"
          [checkoutLabel]="checkoutLabel"
        />
      </div>
    `,
  }),
};

export const WithFreeShippingProgress: Story = {
  args: {
    items: [items[0]],
    currency: '$',
    discount: 0,
    tax: 0,
    shippingCost: 0,
    freeShippingThreshold: 150,
    checkoutLabel: 'Proceed to Checkout',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 420px;">
        <ui-cart-summary
          [items]="items"
          [currency]="currency"
          [discount]="discount"
          [tax]="tax"
          [shippingCost]="shippingCost"
          [freeShippingThreshold]="freeShippingThreshold"
          [checkoutLabel]="checkoutLabel"
        />
      </div>
    `,
  }),
};

export const EmptyCart: Story = {
  args: {
    items: [],
    currency: '$',
    discount: 0,
    tax: 0,
    shippingCost: 0,
    freeShippingThreshold: null,
    checkoutLabel: 'Proceed to Checkout',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 420px;">
        <ui-cart-summary
          [items]="items"
          [currency]="currency"
          [discount]="discount"
          [tax]="tax"
          [shippingCost]="shippingCost"
          [freeShippingThreshold]="freeShippingThreshold"
          [checkoutLabel]="checkoutLabel"
        />
      </div>
    `,
  }),
};
