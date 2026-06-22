import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiSearchBarComponent } from './search-bar.component';
import type { SearchSuggestion } from './search-bar.component';

const sampleSuggestions: SearchSuggestion[] = [
  { label: 'Angular components', category: 'Docs' },
  { label: 'Tailwind CSS setup', category: 'Docs' },
  { label: 'Getting started', category: 'Guide' },
  { label: 'API Reference', category: 'Reference' },
];

const meta: Meta<UiSearchBarComponent> = {
  title: 'Overlay/SearchBar',
  component: UiSearchBarComponent,
  decorators: [
    moduleMetadata({
      imports: [UiSearchBarComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Input placeholder text',
    },
    debounce: {
      control: { type: 'number' },
      description: 'Debounce delay in milliseconds',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading spinner',
    },
    showHistory: {
      control: { type: 'boolean' },
      description: 'Show history hint when no suggestions',
    },
  },
};

export default meta;
type Story = StoryObj<UiSearchBarComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      value: '',
      suggestions: [],
    },
    template: `
      <div class="p-8 max-w-md">
        <ui-search-bar [(value)]="value" placeholder="Search..." />
        <p class="mt-2 text-xs text-muted-foreground">Value: {{ value }}</p>
      </div>
    `,
  }),
};

export const WithSuggestions: Story = {
  render: () => ({
    props: {
      value: '',
      suggestions: sampleSuggestions,
    },
    template: `
      <div class="p-8 max-w-md">
        <ui-search-bar
          [(value)]="value"
          [suggestions]="suggestions"
          placeholder="Search documentation..."
        />
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    props: {
      value: 'Angular',
      loading: true,
      suggestions: [],
    },
    template: `
      <div class="p-8 max-w-md">
        <ui-search-bar
          [(value)]="value"
          [loading]="loading"
          placeholder="Searching..."
        />
      </div>
    `,
  }),
};
