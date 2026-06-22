import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiPageHeaderComponent } from './page-header.component';
import type { PageBreadcrumb } from './page-header.component';

const meta: Meta<UiPageHeaderComponent> = {
  title: 'Layout/PageHeader',
  component: UiPageHeaderComponent,
  decorators: [moduleMetadata({ imports: [UiPageHeaderComponent] })],
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    sticky: { control: 'boolean' },
  },
  args: {
    title: 'Dashboard',
    subtitle: undefined,
    breadcrumbs: [],
    sticky: false,
  },
};

export default meta;
type Story = StoryObj<UiPageHeaderComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ui-page-header [title]="title" [subtitle]="subtitle" [breadcrumbs]="breadcrumbs" [sticky]="sticky" />`,
  }),
};

export const WithSubtitle: Story = {
  args: {
    title: 'Analytics',
    subtitle: 'Track your key metrics and insights',
  },
  render: (args) => ({
    props: args,
    template: `<ui-page-header [title]="title" [subtitle]="subtitle" [breadcrumbs]="breadcrumbs" [sticky]="sticky" />`,
  }),
};

const sampleBreadcrumbs: PageBreadcrumb[] = [
  { label: 'Home', url: '/' },
  { label: 'Settings', url: '/settings' },
  { label: 'Profile' },
];

export const WithBreadcrumbs: Story = {
  args: {
    title: 'Profile',
    breadcrumbs: sampleBreadcrumbs,
  },
  render: (args) => ({
    props: args,
    template: `<ui-page-header [title]="title" [subtitle]="subtitle" [breadcrumbs]="breadcrumbs" [sticky]="sticky" />`,
  }),
};

export const WithActions: Story = {
  args: {
    title: 'Users',
    subtitle: 'Manage your team members',
    breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Users' }],
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-page-header [title]="title" [subtitle]="subtitle" [breadcrumbs]="breadcrumbs" [sticky]="sticky">
        <div actions class="flex items-center gap-2">
          <button class="px-4 py-2 rounded-md bg-muted text-muted-foreground text-sm hover:bg-muted/80">
            Export
          </button>
          <button class="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">
            Add User
          </button>
        </div>
      </ui-page-header>
    `,
  }),
};
