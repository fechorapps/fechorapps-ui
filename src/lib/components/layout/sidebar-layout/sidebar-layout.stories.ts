import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiSidebarLayoutComponent } from './sidebar-layout.component';

const meta: Meta<UiSidebarLayoutComponent> = {
  title: 'Layout/SidebarLayout',
  component: UiSidebarLayoutComponent,
  decorators: [moduleMetadata({ imports: [UiSidebarLayoutComponent] })],
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'radio', options: ['left', 'right'] },
    visible: { control: 'boolean' },
    overlay: { control: 'boolean' },
    width: { control: 'text' },
  },
  args: {
    position: 'left',
    visible: true,
    overlay: false,
    width: '280px',
  },
};

export default meta;
type Story = StoryObj<UiSidebarLayoutComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-sidebar-layout [position]="position" [visible]="visible" [overlay]="overlay" [width]="width">
          <nav sidebar class="p-4 h-full">
            <p class="font-semibold text-foreground mb-4">Navigation</p>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" class="hover:text-foreground">Dashboard</a></li>
              <li><a href="#" class="hover:text-foreground">Projects</a></li>
              <li><a href="#" class="hover:text-foreground">Team</a></li>
              <li><a href="#" class="hover:text-foreground">Settings</a></li>
            </ul>
          </nav>
          <div content class="p-6">
            <h2 class="text-xl font-bold">Main Content</h2>
            <p class="text-muted-foreground mt-2">Sidebar is on the left side by default.</p>
          </div>
        </ui-sidebar-layout>
      </div>
    `,
  }),
};

export const RightPosition: Story = {
  args: { position: 'right' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-sidebar-layout [position]="position" [visible]="visible" [overlay]="overlay" [width]="width">
          <nav sidebar class="p-4 h-full">
            <p class="font-semibold text-foreground mb-4">Right Sidebar</p>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>Details</li>
              <li>Properties</li>
              <li>History</li>
            </ul>
          </nav>
          <div content class="p-6">
            <h2 class="text-xl font-bold">Main Content</h2>
            <p class="text-muted-foreground mt-2">The sidebar is positioned on the right.</p>
          </div>
        </ui-sidebar-layout>
      </div>
    `,
  }),
};

export const OverlayMode: Story = {
  args: { overlay: true, visible: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-sidebar-layout [position]="position" [visible]="visible" [overlay]="overlay" [width]="width">
          <nav sidebar class="p-4 h-full bg-card shadow-lg">
            <p class="font-semibold text-foreground mb-4">Overlay Sidebar</p>
            <p class="text-xs text-muted-foreground">Click backdrop to close</p>
          </nav>
          <div content class="p-6">
            <h2 class="text-xl font-bold">Content Behind Overlay</h2>
            <p class="text-muted-foreground mt-2">The sidebar floats over the content in overlay mode.</p>
          </div>
        </ui-sidebar-layout>
      </div>
    `,
  }),
};

export const Hidden: Story = {
  args: { visible: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-sidebar-layout [position]="position" [visible]="visible" [overlay]="overlay" [width]="width">
          <nav sidebar class="p-4 h-full">
            <p>Sidebar content</p>
          </nav>
          <div content class="p-6">
            <h2 class="text-xl font-bold">Sidebar Hidden</h2>
            <p class="text-muted-foreground mt-2">The sidebar is not visible, content takes full width.</p>
          </div>
        </ui-sidebar-layout>
      </div>
    `,
  }),
};
