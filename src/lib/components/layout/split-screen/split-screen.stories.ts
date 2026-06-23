import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiSplitScreenComponent } from './split-screen.component';

const meta: Meta<UiSplitScreenComponent> = {
  title: 'Layout/SplitScreen',
  component: UiSplitScreenComponent,
  decorators: [moduleMetadata({ imports: [UiSplitScreenComponent] })],
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'select',
      options: ['50/50', '40/60', '60/40', '30/70', '70/30'],
    },
    mobileStack: {
      control: 'select',
      options: ['left-first', 'right-first', 'right-hidden'],
    },
    gap: { control: 'boolean' },
    fullHeight: { control: 'boolean' },
  },
  args: {
    ratio: '50/50',
    mobileStack: 'left-first',
    gap: false,
    fullHeight: true,
  },
};

export default meta;
type Story = StoryObj<UiSplitScreenComponent>;

export const Equal5050: Story = {
  args: {
    ratio: '50/50',
    mobileStack: 'left-first',
    gap: false,
    fullHeight: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-split-screen
          [ratio]="ratio"
          [mobileStack]="mobileStack"
          [gap]="gap"
          [fullHeight]="fullHeight"
        >
          <div left class="p-8 bg-blue-50 flex items-center justify-center min-h-48">
            <div>
              <h2 class="text-xl font-bold text-blue-800">Left Panel</h2>
              <p class="text-blue-600 mt-2">50% width on desktop</p>
            </div>
          </div>
          <div right class="p-8 bg-green-50 flex items-center justify-center min-h-48">
            <div>
              <h2 class="text-xl font-bold text-green-800">Right Panel</h2>
              <p class="text-green-600 mt-2">50% width on desktop</p>
            </div>
          </div>
        </ui-split-screen>
      </div>
    `,
  }),
};

export const AsymmetricLogin: Story = {
  args: {
    ratio: '60/40',
    mobileStack: 'right-hidden',
    gap: false,
    fullHeight: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-split-screen
          [ratio]="ratio"
          [mobileStack]="mobileStack"
          [gap]="gap"
          [fullHeight]="fullHeight"
        >
          <div left class="p-8 bg-indigo-600 flex items-center justify-center min-h-64">
            <div class="text-white text-center">
              <h1 class="text-3xl font-bold">Welcome Back</h1>
              <p class="mt-2 text-indigo-200">Your journey continues here.</p>
            </div>
          </div>
          <div right class="p-8 bg-white flex items-center justify-center min-h-64">
            <div class="w-full max-w-sm">
              <h2 class="text-2xl font-semibold mb-4">Sign In</h2>
              <p class="text-gray-500 text-sm">
                Right panel is hidden on mobile (right-hidden). Only the hero is shown.
              </p>
            </div>
          </div>
        </ui-split-screen>
      </div>
    `,
  }),
};

export const Comparison: Story = {
  args: {
    ratio: '50/50',
    mobileStack: 'left-first',
    gap: true,
    fullHeight: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; padding: 16px; background: #f9fafb;">
        <ui-split-screen
          [ratio]="ratio"
          [mobileStack]="mobileStack"
          [gap]="gap"
          [fullHeight]="fullHeight"
        >
          <div left class="p-6 bg-white rounded-lg shadow-sm min-h-48">
            <h3 class="text-lg font-semibold text-gray-800">Plan A — Basic</h3>
            <ul class="mt-3 space-y-2 text-sm text-gray-600">
              <li>✓ 5 users</li>
              <li>✓ 10 GB storage</li>
              <li>✗ Priority support</li>
            </ul>
            <p class="mt-4 text-2xl font-bold">$9/mo</p>
          </div>
          <div right class="p-6 bg-white rounded-lg shadow-sm min-h-48">
            <h3 class="text-lg font-semibold text-gray-800">Plan B — Pro</h3>
            <ul class="mt-3 space-y-2 text-sm text-gray-600">
              <li>✓ Unlimited users</li>
              <li>✓ 100 GB storage</li>
              <li>✓ Priority support</li>
            </ul>
            <p class="mt-4 text-2xl font-bold">$29/mo</p>
          </div>
        </ui-split-screen>
      </div>
    `,
  }),
};

export const WithGap: Story = {
  args: {
    ratio: '40/60',
    mobileStack: 'left-first',
    gap: true,
    fullHeight: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; padding: 8px; background: #f3f4f6;">
        <ui-split-screen
          [ratio]="ratio"
          [mobileStack]="mobileStack"
          [gap]="gap"
          [fullHeight]="fullHeight"
        >
          <div left class="p-6 bg-amber-50 rounded-lg flex items-center justify-center min-h-40">
            <div class="text-center">
              <p class="font-bold text-amber-700">Sidebar (40%)</p>
              <p class="text-xs text-amber-500 mt-1">With gap between panels</p>
            </div>
          </div>
          <div right class="p-6 bg-purple-50 rounded-lg flex items-center justify-center min-h-40">
            <div class="text-center">
              <p class="font-bold text-purple-700">Main Content (60%)</p>
              <p class="text-xs text-purple-500 mt-1">gap-4 applied between panels</p>
            </div>
          </div>
        </ui-split-screen>
      </div>
    `,
  }),
};
