import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiPricingTableComponent, PricingPlan } from './pricing-table.component';

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects.',
    price: 9,
    originalPrice: 9,
    period: 'mo',
    currency: '$',
    ctaLabel: 'Start Free Trial',
    features: [
      { label: '5 Projects', included: true },
      { label: '10 GB Storage', included: true },
      { label: 'Email Support', included: true },
      { label: 'Custom Domain', included: false },
      { label: 'Analytics', included: false },
      { label: 'API Access', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams who need more power.',
    price: 29,
    originalPrice: 29,
    period: 'mo',
    currency: '$',
    badge: 'Most Popular',
    highlighted: true,
    ctaLabel: 'Get Pro',
    features: [
      { label: 'Unlimited Projects', included: true },
      { label: '100 GB Storage', included: true },
      { label: 'Priority Support', included: true },
      { label: 'Custom Domain', included: true },
      { label: 'Analytics', included: true },
      { label: 'API Access', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Full power for large organizations.',
    price: 99,
    originalPrice: 99,
    period: 'mo',
    currency: '$',
    ctaLabel: 'Contact Sales',
    features: [
      { label: 'Unlimited Projects', included: true },
      { label: '1 TB Storage', included: true },
      { label: '24/7 Support', included: true },
      { label: 'Custom Domain', included: true },
      { label: 'Advanced Analytics', included: true },
      { label: 'API Access', included: true },
    ],
  },
];

const meta: Meta<UiPricingTableComponent> = {
  title: 'Ecommerce/PricingTable',
  component: UiPricingTableComponent,
  decorators: [
    moduleMetadata({
      imports: [UiPricingTableComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    billing: { control: { type: 'radio', options: ['monthly', 'yearly'] } },
    yearlyDiscount: { control: { type: 'number', min: 0, max: 80 } },
  },
};

export default meta;
type Story = StoryObj<UiPricingTableComponent>;

export const Monthly: Story = {
  args: {
    plans,
    billing: 'monthly',
    yearlyDiscount: 20,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 900px; padding: 24px;">
        <ui-pricing-table
          [plans]="plans"
          [billing]="billing"
          [yearlyDiscount]="yearlyDiscount"
        />
      </div>
    `,
  }),
};

export const Yearly: Story = {
  args: {
    plans,
    billing: 'yearly',
    yearlyDiscount: 20,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 900px; padding: 24px;">
        <ui-pricing-table
          [plans]="plans"
          [billing]="billing"
          [yearlyDiscount]="yearlyDiscount"
        />
      </div>
    `,
  }),
};

export const TwoPlans: Story = {
  args: {
    plans: plans.slice(0, 2),
    billing: 'monthly',
    yearlyDiscount: 25,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 600px; padding: 24px;">
        <ui-pricing-table
          [plans]="plans"
          [billing]="billing"
          [yearlyDiscount]="yearlyDiscount"
        />
      </div>
    `,
  }),
};
