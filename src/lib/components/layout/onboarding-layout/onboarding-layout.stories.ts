import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BarChart2, Rocket, Shield, Zap, Users, Globe } from 'lucide-angular';
import { UiOnboardingLayoutComponent, OnboardingFeature } from './onboarding-layout.component';

const sampleFeatures: OnboardingFeature[] = [
  { icon: Rocket, title: 'Fast Setup', description: 'Get up and running in minutes with our guided wizard.' },
  { icon: Shield, title: 'Secure by Default', description: 'Enterprise-grade security built in from day one.' },
  { icon: Zap, title: 'Lightning Performance', description: 'Optimized for speed so your team stays productive.' },
];

const extendedFeatures: OnboardingFeature[] = [
  ...sampleFeatures,
  { icon: Users, title: 'Team Collaboration', description: 'Work together in real-time with your whole organization.' },
  { icon: Globe, title: 'Global Scale', description: 'Deploy across multiple regions with a single click.' },
  { icon: BarChart2, title: 'Actionable Analytics', description: 'Deep insights to help you make better decisions.' },
];

const meta: Meta<UiOnboardingLayoutComponent> = {
  title: 'Layout/OnboardingLayout',
  component: UiOnboardingLayoutComponent,
  decorators: [moduleMetadata({ imports: [UiOnboardingLayoutComponent] })],
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    primaryCta: { control: 'text' },
    secondaryCta: { control: 'text' },
    showProgress: { control: 'boolean' },
    currentStep: { control: { type: 'number', min: 0, max: 10 } },
    totalSteps: { control: { type: 'number', min: 0, max: 10 } },
  },
  args: {
    title: 'Welcome to FechorApps',
    subtitle: 'Everything you need to build great products — in one place.',
    primaryCta: 'Get Started',
    secondaryCta: null,
    showProgress: false,
    currentStep: 0,
    totalSteps: 0,
  },
};

export default meta;
type Story = StoryObj<UiOnboardingLayoutComponent>;

/** Welcome screen — no features, just a headline and a CTA. */
export const Welcome: Story = {
  args: {
    title: 'Welcome to FechorApps',
    subtitle: 'Everything you need to build great products — in one place.',
    features: [],
    primaryCta: 'Get Started',
    secondaryCta: null,
    showProgress: false,
    currentStep: 0,
    totalSteps: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-onboarding-layout
        [title]="title"
        [subtitle]="subtitle"
        [features]="features"
        [primaryCta]="primaryCta"
        [secondaryCta]="secondaryCta"
        [showProgress]="showProgress"
        [currentStep]="currentStep"
        [totalSteps]="totalSteps"
      >
        <div illustration class="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-5xl font-bold">
          F
        </div>
      </ui-onboarding-layout>
    `,
  }),
};

/** With three feature cards displayed in a responsive grid. */
export const WithFeatures: Story = {
  args: {
    title: 'Everything You Need',
    subtitle: 'Powerful tools crafted for modern teams.',
    features: sampleFeatures,
    primaryCta: 'Start Free Trial',
    secondaryCta: null,
    showProgress: false,
    currentStep: 0,
    totalSteps: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-onboarding-layout
        [title]="title"
        [subtitle]="subtitle"
        [features]="features"
        [primaryCta]="primaryCta"
        [secondaryCta]="secondaryCta"
        [showProgress]="showProgress"
        [currentStep]="currentStep"
        [totalSteps]="totalSteps"
      />
    `,
  }),
};

/** Step 2 of 4 — progress dots with the active step highlighted. */
export const WithProgress: Story = {
  args: {
    title: 'Set Up Your Profile',
    subtitle: 'Tell us a bit about yourself so we can personalise your experience.',
    features: [],
    primaryCta: 'Continue',
    secondaryCta: 'Back',
    showProgress: true,
    currentStep: 1,
    totalSteps: 4,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-onboarding-layout
        [title]="title"
        [subtitle]="subtitle"
        [features]="features"
        [primaryCta]="primaryCta"
        [secondaryCta]="secondaryCta"
        [showProgress]="showProgress"
        [currentStep]="currentStep"
        [totalSteps]="totalSteps"
      />
    `,
  }),
};

/** Both primary and secondary CTAs visible — useful for skip / learn-more patterns. */
export const WithSecondaryCta: Story = {
  args: {
    title: 'Ready to Explore?',
    subtitle: 'Jump straight in or take the guided tour first.',
    features: extendedFeatures,
    primaryCta: 'Get Started',
    secondaryCta: 'Take the Tour',
    showProgress: false,
    currentStep: 0,
    totalSteps: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-onboarding-layout
        [title]="title"
        [subtitle]="subtitle"
        [features]="features"
        [primaryCta]="primaryCta"
        [secondaryCta]="secondaryCta"
        [showProgress]="showProgress"
        [currentStep]="currentStep"
        [totalSteps]="totalSteps"
      >
        <p footer class="text-xs text-muted-foreground mt-6">
          By continuing you agree to our <a href="#" class="underline">Terms of Service</a>.
        </p>
      </ui-onboarding-layout>
    `,
  }),
};
