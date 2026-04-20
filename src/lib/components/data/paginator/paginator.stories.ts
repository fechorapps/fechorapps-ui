import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiPaginatorComponent } from './paginator.component';

const meta: Meta<UiPaginatorComponent> = {
  title: 'Data/Paginator',
  component: UiPaginatorComponent,
  decorators: [
    moduleMetadata({
      imports: [UiPaginatorComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    totalRecords: {
      control: { type: 'number' },
      description: 'Total number of records',
      table: { category: 'Data' },
    },
    rows: {
      control: { type: 'number' },
      description: 'Number of rows per page',
      table: { category: 'Data' },
    },
    pageLinkSize: {
      control: { type: 'number' },
      description: 'Number of page links to display',
      table: { category: 'Appearance' },
    },
    showFirstLastButtons: {
      control: { type: 'boolean' },
      description: 'Show first/last navigation buttons',
      table: { category: 'Appearance' },
    },
    showPrevNextButtons: {
      control: { type: 'boolean' },
      description: 'Show previous/next navigation buttons',
      table: { category: 'Appearance' },
    },
    showPageLinks: {
      control: { type: 'boolean' },
      description: 'Show page number links',
      table: { category: 'Appearance' },
    },
    showCurrentPageReport: {
      control: { type: 'boolean' },
      description: 'Show current page report text',
      table: { category: 'Appearance' },
    },
    currentPageReportTemplate: {
      control: { type: 'text' },
      description: 'Template for current page report',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the paginator',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<UiPaginatorComponent>;

export const Default: Story = {
  args: {
    totalRecords: 120,
    rows: 10,
    showFirstLastButtons: true,
    showPrevNextButtons: true,
    showPageLinks: true,
    showCurrentPageReport: true,
  },
};

export const SmallDataset: Story = {
  args: {
    totalRecords: 25,
    rows: 10,
    showCurrentPageReport: true,
  },
};

export const LargeDataset: Story = {
  args: {
    totalRecords: 1000,
    rows: 25,
    pageLinkSize: 7,
    showCurrentPageReport: true,
    currentPageReportTemplate: 'Page {page} of {pageCount} ({totalRecords} total)',
  },
};

export const WithRowsPerPageOptions: Story = {
  args: {
    totalRecords: 200,
    rows: 10,
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    showCurrentPageReport: true,
  },
};

export const MinimalControls: Story = {
  args: {
    totalRecords: 100,
    rows: 10,
    showFirstLastButtons: false,
    showPageLinks: false,
    showCurrentPageReport: true,
  },
};

export const PageLinksOnly: Story = {
  args: {
    totalRecords: 80,
    rows: 10,
    showFirstLastButtons: false,
    showPrevNextButtons: false,
    showCurrentPageReport: false,
  },
};

export const CustomTemplate: Story = {
  args: {
    totalRecords: 500,
    rows: 20,
    currentPageReportTemplate: 'Displaying {first}-{last} of {totalRecords} items',
    showCurrentPageReport: true,
  },
};

export const Disabled: Story = {
  args: {
    totalRecords: 100,
    rows: 10,
    disabled: true,
    showCurrentPageReport: true,
  },
};

export const SinglePage: Story = {
  args: {
    totalRecords: 5,
    rows: 10,
    showCurrentPageReport: true,
  },
};

export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      first: 0,
      onPageChange: (event: { first: number; rows: number; page: number }) => {
        console.log('Page changed:', event);
      },
    },
    template: `
      <div class="space-y-4">
        <ui-paginator
          [totalRecords]="totalRecords"
          [rows]="rows"
          [(first)]="first"
          [showCurrentPageReport]="true"
          [rowsPerPageOptions]="[10, 20, 50]"
          (onPageChange)="onPageChange($event)"
        />

        <div class="p-4 bg-muted rounded-lg">
          <p class="text-sm text-muted-foreground">
            Current first index: {{ first }}
          </p>
        </div>
      </div>
    `,
  }),
  args: {
    totalRecords: 150,
    rows: 10,
  },
};

export const TableIntegration: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        status: i % 2 === 0 ? 'Active' : 'Inactive',
      })),
      first: 0,
      rows: 5,
      get displayedItems() {
        return this['items'].slice(this['first'], this['first'] + this['rows']);
      },
      onPageChange(event: { first: number; rows: number }) {
        this['first'] = event.first;
        this['rows'] = event.rows;
      },
    },
    template: `
      <div class="border border-border rounded-lg overflow-hidden">
        <!-- Simple Table -->
        <table class="w-full text-sm">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-foreground">ID</th>
              <th class="px-4 py-3 text-left font-medium text-foreground">Name</th>
              <th class="px-4 py-3 text-left font-medium text-foreground">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            @for (item of displayedItems; track item.id) {
              <tr class="bg-card">
                <td class="px-4 py-3 text-muted-foreground">{{ item.id }}</td>
                <td class="px-4 py-3 text-foreground">{{ item.name }}</td>
                <td class="px-4 py-3">
                  <span
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    [class.bg-green-100]="item.status === 'Active'"
                    [class.text-green-700]="item.status === 'Active'"
                    [class.bg-muted]="item.status === 'Inactive'"
                    [class.text-muted-foreground]="item.status === 'Inactive'"
                  >
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>

        <!-- Paginator -->
        <ui-paginator
          [totalRecords]="items.length"
          [rows]="rows"
          [(first)]="first"
          [rowsPerPageOptions]="[5, 10, 25]"
          [showCurrentPageReport]="true"
          (onPageChange)="onPageChange($event)"
        />
      </div>
    `,
  }),
  args: {},
};
