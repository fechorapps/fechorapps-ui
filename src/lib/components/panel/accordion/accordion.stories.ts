import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiAccordionComponent } from './accordion.component';
import { UiAccordionTabComponent } from './accordion-tab.component';

const meta: Meta<UiAccordionComponent> = {
  title: 'Panel/Accordion',
  component: UiAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [UiAccordionComponent, UiAccordionTabComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple tabs open',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<UiAccordionComponent>;

export const Basic: Story = {
  render: () => ({
    template: `
      <ui-accordion>
        <ui-accordion-tab header="Section 1">
          <p class="text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </ui-accordion-tab>
        <ui-accordion-tab header="Section 2">
          <p class="text-gray-600 dark:text-gray-400">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </ui-accordion-tab>
        <ui-accordion-tab header="Section 3">
          <p class="text-gray-600 dark:text-gray-400">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </ui-accordion-tab>
      </ui-accordion>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    template: `
      <ui-accordion [multiple]="true">
        <ui-accordion-tab header="First Tab">
          <p class="text-gray-600 dark:text-gray-400">Content of first tab</p>
        </ui-accordion-tab>
        <ui-accordion-tab header="Second Tab">
          <p class="text-gray-600 dark:text-gray-400">Content of second tab</p>
        </ui-accordion-tab>
        <ui-accordion-tab header="Third Tab">
          <p class="text-gray-600 dark:text-gray-400">Content of third tab</p>
        </ui-accordion-tab>
      </ui-accordion>
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    template: `
      <ui-accordion>
        <ui-accordion-tab header="Active Tab">
          <p class="text-gray-600 dark:text-gray-400">This tab is active and can be opened.</p>
        </ui-accordion-tab>
        <ui-accordion-tab header="Disabled Tab" [disabled]="true">
          <p class="text-gray-600 dark:text-gray-400">This content is hidden.</p>
        </ui-accordion-tab>
        <ui-accordion-tab header="Another Active Tab">
          <p class="text-gray-600 dark:text-gray-400">This tab is also active.</p>
        </ui-accordion-tab>
      </ui-accordion>
    `,
  }),
};

export const FAQ: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <h2 class="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <ui-accordion>
          <ui-accordion-tab header="What is your return policy?">
            <p class="text-gray-600 dark:text-gray-400">
              We offer a 30-day return policy on all items. Products must be in original condition with tags attached.
            </p>
          </ui-accordion-tab>
          <ui-accordion-tab header="How long does shipping take?">
            <p class="text-gray-600 dark:text-gray-400">
              Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.
            </p>
          </ui-accordion-tab>
          <ui-accordion-tab header="Do you offer international shipping?">
            <p class="text-gray-600 dark:text-gray-400">
              Yes, we ship to over 50 countries worldwide. International shipping typically takes 10-14 business days.
            </p>
          </ui-accordion-tab>
          <ui-accordion-tab header="How can I track my order?">
            <p class="text-gray-600 dark:text-gray-400">
              Once your order ships, you'll receive an email with a tracking number. You can track your package on our website or the carrier's site.
            </p>
          </ui-accordion-tab>
        </ui-accordion>
      </div>
    `,
  }),
};
