import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UiStepperComponent, StepperStep } from './stepper.component';

const meta: Meta<UiStepperComponent> = {
  title: 'Panel/Stepper',
  component: UiStepperComponent,
  decorators: [moduleMetadata({ imports: [UiStepperComponent] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiStepperComponent>;

const defaultSteps: StepperStep[] = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Review' },
];

const stepsWithDesc: StepperStep[] = [
  { label: 'Account', description: 'Setup your account' },
  { label: 'Profile', description: 'Add your details', optional: true },
  { label: 'Review', description: 'Confirm and submit' },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 0,
    orientation: 'horizontal',
    linear: true,
  },
};

export const WithDescriptions: Story = {
  args: {
    steps: stepsWithDesc,
    activeStep: 1,
    orientation: 'horizontal',
    linear: true,
  },
};

export const Vertical: Story = {
  args: {
    steps: stepsWithDesc,
    activeStep: 0,
    orientation: 'vertical',
    linear: false,
  },
};
