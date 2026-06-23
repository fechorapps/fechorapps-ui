import type { Meta, StoryObj } from '@storybook/angular';
import { UiWizardComponent, WizardStep } from './wizard.component';

const meta: Meta<UiWizardComponent> = {
  title: 'Form/Wizard',
  component: UiWizardComponent,
  tags: ['autodocs'],
  argTypes: {
    linear: {
      control: 'boolean',
      description: 'Restrict navigation to sequential order',
    },
    showStepNumbers: {
      control: 'boolean',
      description: 'Show numeric indices inside step indicators',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the step indicator bar',
    },
    nextLabel: {
      control: 'text',
      description: 'Label for the Next button',
    },
    backLabel: {
      control: 'text',
      description: 'Label for the Back button',
    },
    finishLabel: {
      control: 'text',
      description: 'Label for the Finish button (last step)',
    },
  },
};

export default meta;
type Story = StoryObj<UiWizardComponent>;

// ---------------------------------------------------------------------------
// Story helpers
// ---------------------------------------------------------------------------

const THREE_STEPS: WizardStep[] = [
  { label: 'Personal Info', description: 'Your basic details' },
  { label: 'Address', description: 'Where do you live?' },
  { label: 'Review', description: 'Confirm & submit' },
];

// ---------------------------------------------------------------------------
// ThreeStepLinear — default linear wizard
// ---------------------------------------------------------------------------

export const ThreeStepLinear: Story = {
  render: () => ({
    props: {
      steps: THREE_STEPS,
      current: 0,
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <ui-wizard [steps]="steps" [(currentStep)]="current">
          <div [hidden]="current !== 0" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Personal Info</h3>
            <p class="text-muted-foreground">Enter your name and email address here.</p>
          </div>
          <div [hidden]="current !== 1" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Address</h3>
            <p class="text-muted-foreground">Provide your shipping or billing address.</p>
          </div>
          <div [hidden]="current !== 2" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Review</h3>
            <p class="text-muted-foreground">Everything looks great — click Finish to submit.</p>
          </div>
        </ui-wizard>
      </div>
    `,
  }),
};

// ---------------------------------------------------------------------------
// NonLinear — free navigation between all steps
// ---------------------------------------------------------------------------

export const NonLinear: Story = {
  render: () => ({
    props: {
      steps: THREE_STEPS,
      current: 0,
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <p class="text-sm text-muted-foreground mb-4">
          Non-linear mode: click any step header to jump directly to it.
        </p>
        <ui-wizard [steps]="steps" [(currentStep)]="current" [linear]="false">
          <div [hidden]="current !== 0" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Personal Info</h3>
            <p class="text-muted-foreground">You can jump to any step freely.</p>
          </div>
          <div [hidden]="current !== 1" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Address</h3>
            <p class="text-muted-foreground">Accessible without completing step 1.</p>
          </div>
          <div [hidden]="current !== 2" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Review</h3>
            <p class="text-muted-foreground">Accessible at any time.</p>
          </div>
        </ui-wizard>
      </div>
    `,
  }),
};

// ---------------------------------------------------------------------------
// WithValidation — step 1 has valid=false, blocking Next
// ---------------------------------------------------------------------------

export const WithValidation: Story = {
  render: () => ({
    props: {
      steps: [
        { label: 'Personal Info', description: 'Step blocked until valid', valid: false },
        { label: 'Address' },
        { label: 'Review' },
      ] as WizardStep[],
      current: 0,
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <p class="text-sm text-muted-foreground mb-4">
          Step 1 has <code class="font-mono">valid: false</code> — the Next button is disabled.
        </p>
        <ui-wizard [steps]="steps" [(currentStep)]="current">
          <div [hidden]="current !== 0" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Personal Info</h3>
            <p class="text-muted-foreground text-red-500">
              This step is invalid — Next is blocked.
            </p>
          </div>
          <div [hidden]="current !== 1" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Address</h3>
          </div>
          <div [hidden]="current !== 2" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Review</h3>
          </div>
        </ui-wizard>
      </div>
    `,
  }),
};

// ---------------------------------------------------------------------------
// Vertical — vertical orientation
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  render: () => ({
    props: {
      steps: [
        { label: 'Account', description: 'Create your account' },
        { label: 'Profile', description: 'Set up your profile', optional: true },
        { label: 'Preferences', description: 'Choose your preferences' },
        { label: 'Done', description: 'All set!' },
      ] as WizardStep[],
      current: 0,
    },
    template: `
      <div class="p-6 max-w-lg mx-auto">
        <ui-wizard [steps]="steps" [(currentStep)]="current" orientation="vertical">
          <div [hidden]="current !== 0" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Account Setup</h3>
            <p class="text-muted-foreground">Enter your email and password.</p>
          </div>
          <div [hidden]="current !== 1" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Profile</h3>
            <p class="text-muted-foreground">This step is optional — you can skip it.</p>
          </div>
          <div [hidden]="current !== 2" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Preferences</h3>
            <p class="text-muted-foreground">Choose notification and display settings.</p>
          </div>
          <div [hidden]="current !== 3" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">All Done!</h3>
            <p class="text-muted-foreground">Click Finish to complete setup.</p>
          </div>
        </ui-wizard>
      </div>
    `,
  }),
};

// ---------------------------------------------------------------------------
// WithOptionalStep — shows Skip button
// ---------------------------------------------------------------------------

export const WithOptionalStep: Story = {
  render: () => ({
    props: {
      steps: [
        { label: 'Required Step' },
        { label: 'Optional Step', description: 'You may skip this', optional: true },
        { label: 'Final Step' },
      ] as WizardStep[],
      current: 0,
    },
    template: `
      <div class="p-6 max-w-2xl mx-auto">
        <p class="text-sm text-muted-foreground mb-4">
          Step 2 is optional — a Skip button appears when it is active.
        </p>
        <ui-wizard [steps]="steps" [(currentStep)]="current">
          <div [hidden]="current !== 0" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Required Step</h3>
          </div>
          <div [hidden]="current !== 1" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Optional Step</h3>
            <p class="text-muted-foreground">Click Skip to bypass this step.</p>
          </div>
          <div [hidden]="current !== 2" class="py-4 text-foreground">
            <h3 class="text-lg font-semibold mb-2">Final Step</h3>
          </div>
        </ui-wizard>
      </div>
    `,
  }),
};
