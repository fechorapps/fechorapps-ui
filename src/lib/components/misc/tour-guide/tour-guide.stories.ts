import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiTourGuideComponent } from './tour-guide.component';
import type { TourStep } from './tour-guide.component';

const sampleSteps: TourStep[] = [
  {
    target: '#step-1',
    title: 'Welcome to the Dashboard',
    content: 'This is your main overview. Here you can see all your key metrics at a glance.',
    placement: 'bottom',
  },
  {
    target: '#step-2',
    title: 'Navigation Menu',
    content: 'Use the sidebar to navigate between different sections of the application.',
    placement: 'right',
  },
  {
    target: '#step-3',
    title: 'Quick Actions',
    content: 'Access frequently used actions from this toolbar. Click any icon to get started.',
    placement: 'top',
  },
];

const meta: Meta<UiTourGuideComponent> = {
  title: 'Misc/TourGuide',
  component: UiTourGuideComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTourGuideComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: { type: 'boolean' },
      description: 'Whether the tour is active',
      table: { category: 'State' },
    },
    currentStep: {
      control: { type: 'number' },
      description: 'Current step index (0-based)',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<UiTourGuideComponent>;

export const ActiveFirstStep: Story = {
  render: () => ({
    props: {
      steps: sampleSteps,
      active: true,
      currentStep: 0,
    },
    template: `
      <div style="padding: 40px; position: relative;">
        <div id="step-1" style="display:inline-block; padding: 8px 16px; background: #e2e8f0; border-radius: 8px;">
          Dashboard Overview
        </div>
        <ui-tour-guide [steps]="steps" [(active)]="active" [(currentStep)]="currentStep" />
      </div>
    `,
  }),
};

export const ActiveMiddleStep: Story = {
  render: () => ({
    props: {
      steps: sampleSteps,
      active: true,
      currentStep: 1,
    },
    template: `
      <div style="padding: 40px; position: relative;">
        <div id="step-2" style="display:inline-block; padding: 8px 16px; background: #e2e8f0; border-radius: 8px;">
          Navigation Menu
        </div>
        <ui-tour-guide [steps]="steps" [(active)]="active" [(currentStep)]="currentStep" />
      </div>
    `,
  }),
};

export const ActiveLastStep: Story = {
  render: () => ({
    props: {
      steps: sampleSteps,
      active: true,
      currentStep: 2,
    },
    template: `
      <div style="padding: 40px; position: relative;">
        <div id="step-3" style="display:inline-block; padding: 8px 16px; background: #e2e8f0; border-radius: 8px;">
          Quick Actions Toolbar
        </div>
        <ui-tour-guide [steps]="steps" [(active)]="active" [(currentStep)]="currentStep" />
      </div>
    `,
  }),
};

export const Inactive: Story = {
  args: {
    steps: sampleSteps,
    active: false,
    currentStep: 0,
  },
};
