import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { User, CreditCard, Check, FileText, Mail, Settings } from 'lucide-angular';

import { UiStepsComponent, StepItem } from './steps.component';

const meta: Meta<UiStepsComponent> = {
  title: 'Menu/Steps',
  component: UiStepsComponent,
  decorators: [
    moduleMetadata({
      imports: [UiStepsComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Steps orientation',
      table: { category: 'Layout' },
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Disable navigation',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiStepsComponent>;

const basicItems: StepItem[] = [
  { label: 'Personal' },
  { label: 'Payment' },
  { label: 'Confirmation' },
];

export const Default: Story = {
  args: {
    model: basicItems,
    activeIndex: 0,
  },
};

export const SecondStep: Story = {
  args: {
    model: basicItems,
    activeIndex: 1,
  },
};

export const Completed: Story = {
  args: {
    model: basicItems,
    activeIndex: 2,
  },
};

export const WithIcons: Story = {
  args: {
    model: [
      { label: 'Account', icon: User },
      { label: 'Payment', icon: CreditCard },
      { label: 'Complete', icon: Check },
    ],
    activeIndex: 1,
  },
};

export const Readonly: Story = {
  args: {
    model: basicItems,
    activeIndex: 1,
    readonly: true,
  },
};

export const WithDisabled: Story = {
  args: {
    model: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3', disabled: true },
      { label: 'Step 4', disabled: true },
    ],
    activeIndex: 1,
  },
};

export const Vertical: Story = {
  args: {
    model: [
      { label: 'Select Plan', icon: FileText },
      { label: 'Account Info', icon: User },
      { label: 'Payment', icon: CreditCard },
      { label: 'Confirmation', icon: Check },
    ],
    activeIndex: 1,
    orientation: 'vertical',
  },
};

export const ManySteps: Story = {
  args: {
    model: [
      { label: 'Start' },
      { label: 'Info' },
      { label: 'Address' },
      { label: 'Payment' },
      { label: 'Review' },
      { label: 'Complete' },
    ],
    activeIndex: 2,
  },
};

export const CheckoutWizard: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Cart', icon: FileText },
        { label: 'Shipping', icon: Mail },
        { label: 'Payment', icon: CreditCard },
        { label: 'Confirm', icon: Check },
      ] as StepItem[],
      activeIndex: 0,
      nextStep() {
        if (this['activeIndex'] < this['items'].length - 1) {
          this['activeIndex']++;
        }
      },
      prevStep() {
        if (this['activeIndex'] > 0) {
          this['activeIndex']--;
        }
      },
    },
    template: `
      <div class="max-w-2xl mx-auto">
        <ui-steps [model]="items" [(activeIndex)]="activeIndex" [readonly]="true" />

        <div class="mt-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          @switch (activeIndex) {
            @case (0) {
              <h3 class="text-lg font-semibold mb-4">Shopping Cart</h3>
              <p class="text-gray-600 dark:text-gray-400">Review your items before checkout.</p>
            }
            @case (1) {
              <h3 class="text-lg font-semibold mb-4">Shipping Information</h3>
              <p class="text-gray-600 dark:text-gray-400">Enter your shipping address.</p>
            }
            @case (2) {
              <h3 class="text-lg font-semibold mb-4">Payment Details</h3>
              <p class="text-gray-600 dark:text-gray-400">Enter your payment information.</p>
            }
            @case (3) {
              <h3 class="text-lg font-semibold mb-4">Order Confirmation</h3>
              <p class="text-gray-600 dark:text-gray-400">Review and confirm your order.</p>
            }
          }
        </div>

        <div class="mt-6 flex justify-between">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
            [disabled]="activeIndex === 0"
            (click)="prevStep()"
          >
            Previous
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg disabled:opacity-50"
            [disabled]="activeIndex === items.length - 1"
            (click)="nextStep()"
          >
            {{ activeIndex === items.length - 1 ? 'Complete' : 'Next' }}
          </button>
        </div>
      </div>
    `,
  }),
};

export const RegistrationFlow: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Account' },
        { label: 'Profile' },
        { label: 'Settings' },
        { label: 'Done' },
      ] as StepItem[],
      activeIndex: 0,
    },
    template: `
      <div class="max-w-xl mx-auto">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Create Your Account
        </h2>
        <ui-steps [model]="items" [(activeIndex)]="activeIndex" />
      </div>
    `,
  }),
};

export const VerticalTimeline: Story = {
  render: () => ({
    props: {
      items: [
        { label: 'Order Placed', icon: FileText },
        { label: 'Processing', icon: Settings },
        { label: 'Shipped', icon: Mail },
        { label: 'Delivered', icon: Check },
      ] as StepItem[],
    },
    template: `
      <div class="max-w-sm">
        <h3 class="text-lg font-semibold mb-4">Order Status</h3>
        <ui-steps [model]="items" [activeIndex]="2" orientation="vertical" [readonly]="true" />
      </div>
    `,
  }),
};
