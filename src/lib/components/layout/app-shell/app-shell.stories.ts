import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiAppShellComponent } from './app-shell.component';

const meta: Meta<UiAppShellComponent> = {
  title: 'Layout/AppShell',
  component: UiAppShellComponent,
  decorators: [moduleMetadata({ imports: [UiAppShellComponent] })],
  tags: ['autodocs'],
  argTypes: {
    sidebarCollapsed: { control: 'boolean' },
    sidebarWidth: { control: 'text' },
    sidebarCollapsedWidth: { control: 'text' },
    showHeader: { control: 'boolean' },
    headerHeight: { control: 'text' },
  },
  args: {
    sidebarCollapsed: false,
    sidebarWidth: '260px',
    sidebarCollapsedWidth: '64px',
    showHeader: true,
    headerHeight: '64px',
  },
};

export default meta;
type Story = StoryObj<UiAppShellComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px;">
        <ui-app-shell [sidebarCollapsed]="sidebarCollapsed" [sidebarWidth]="sidebarWidth" [sidebarCollapsedWidth]="sidebarCollapsedWidth" [showHeader]="showHeader" [headerHeight]="headerHeight">
          <div sidebar class="p-4 h-full">
            <p class="font-semibold text-foreground">Sidebar</p>
            <nav class="mt-4 space-y-2">
              <a href="#" class="block text-muted-foreground hover:text-foreground">Dashboard</a>
              <a href="#" class="block text-muted-foreground hover:text-foreground">Settings</a>
            </nav>
          </div>
          <div header class="flex items-center gap-4">
            <span class="font-semibold">My App</span>
          </div>
          <div content class="p-6">
            <h2 class="text-xl font-bold">Main Content</h2>
            <p class="text-muted-foreground mt-2">This is the main content area.</p>
          </div>
          <div footer class="p-4 text-sm text-muted-foreground">Footer area</div>
        </ui-app-shell>
      </div>
    `,
  }),
};

export const Collapsed: Story = {
  args: { sidebarCollapsed: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px;">
        <ui-app-shell [sidebarCollapsed]="sidebarCollapsed" [sidebarWidth]="sidebarWidth" [sidebarCollapsedWidth]="sidebarCollapsedWidth" [showHeader]="showHeader" [headerHeight]="headerHeight">
          <div sidebar class="p-2 h-full flex flex-col items-center gap-4 pt-4">
            <span class="w-8 h-8 rounded bg-primary"></span>
            <span class="w-8 h-8 rounded bg-muted"></span>
          </div>
          <div header>
            <span class="font-semibold">My App (Collapsed Sidebar)</span>
          </div>
          <div content class="p-6">
            <h2 class="text-xl font-bold">Content with Collapsed Sidebar</h2>
          </div>
        </ui-app-shell>
      </div>
    `,
  }),
};

export const WithHeader: Story = {
  args: { showHeader: true, headerHeight: '80px' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px;">
        <ui-app-shell [sidebarCollapsed]="sidebarCollapsed" [sidebarWidth]="sidebarWidth" [sidebarCollapsedWidth]="sidebarCollapsedWidth" [showHeader]="showHeader" [headerHeight]="headerHeight">
          <div sidebar class="p-4 h-full">
            <p class="font-semibold">Navigation</p>
          </div>
          <div header class="flex items-center justify-between w-full">
            <span class="font-bold text-lg">Brand</span>
            <div class="flex items-center gap-2">
              <button class="px-3 py-1 rounded bg-primary text-primary-foreground text-sm">Login</button>
            </div>
          </div>
          <div content class="p-6">Main content here</div>
        </ui-app-shell>
      </div>
    `,
  }),
};
