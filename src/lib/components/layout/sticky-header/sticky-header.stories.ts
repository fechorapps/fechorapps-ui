import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiStickyHeaderComponent } from './sticky-header.component';

const meta: Meta<UiStickyHeaderComponent> = {
  title: 'Layout/StickyHeader',
  component: UiStickyHeaderComponent,
  decorators: [moduleMetadata({ imports: [UiStickyHeaderComponent] })],
  tags: ['autodocs'],
  argTypes: {
    scrollThreshold: { control: 'number' },
    shrink: { control: 'boolean' },
    blur: { control: 'boolean' },
    hideOnScrollDown: { control: 'boolean' },
    zIndex: { control: 'number' },
  },
  args: {
    scrollThreshold: 60,
    shrink: true,
    blur: true,
    hideOnScrollDown: false,
    zIndex: 50,
  },
};

export default meta;
type Story = StoryObj<UiStickyHeaderComponent>;

// Stories demonstrate visual states rather than live scroll behavior,
// since window.scrollY won't fire inside a fixed-height container.

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; overflow-y: scroll; position: relative; border: 1px solid #ccc;">
        <ui-sticky-header
          [scrollThreshold]="scrollThreshold"
          [shrink]="shrink"
          [blur]="blur"
          [hideOnScrollDown]="hideOnScrollDown"
          [zIndex]="zIndex"
        >
          <div class="flex items-center justify-between px-6 py-2">
            <span class="font-bold text-lg text-foreground">My App</span>
            <nav class="flex gap-4 text-sm text-muted-foreground">
              <a href="#" class="hover:text-foreground">Home</a>
              <a href="#" class="hover:text-foreground">About</a>
              <a href="#" class="hover:text-foreground">Contact</a>
            </nav>
          </div>
        </ui-sticky-header>
        <div style="height: 1200px; padding: 1rem;">
          <p class="text-muted-foreground">Scroll down inside this container to see the header behavior. In a real app, scroll events fire on the window object.</p>
        </div>
      </div>
    `,
  }),
};

export const ScrolledState: Story = {
  name: 'Scrolled State (Visual)',
  render: (args) => ({
    props: { ...args, isScrolledOverride: true },
    template: `
      <div style="height: 400px; overflow-y: scroll; position: relative; border: 1px solid #ccc;">
        <ui-sticky-header
          [scrollThreshold]="scrollThreshold"
          [shrink]="shrink"
          [blur]="blur"
          [hideOnScrollDown]="hideOnScrollDown"
          [zIndex]="zIndex"
        >
          <div class="flex items-center justify-between px-6 py-2">
            <span class="font-bold text-lg text-foreground">My App</span>
            <nav class="flex gap-4 text-sm text-muted-foreground">
              <a href="#" class="hover:text-foreground">Home</a>
              <a href="#" class="hover:text-foreground">About</a>
              <a href="#" class="hover:text-foreground">Contact</a>
            </nav>
          </div>
        </ui-sticky-header>
        <div style="height: 1200px; padding: 1rem; padding-top: 2rem;">
          <div class="backdrop-blur-md bg-background/80 border-b border-border shadow-sm py-2 sticky top-0 w-full z-50 transition-all duration-300" style="margin-bottom: 1rem;">
            <div class="flex items-center justify-between px-6 py-2">
              <span class="font-bold text-lg text-foreground">My App (Scrolled Preview)</span>
              <nav class="flex gap-4 text-sm text-muted-foreground">
                <a href="#" class="hover:text-foreground">Home</a>
                <a href="#" class="hover:text-foreground">About</a>
                <a href="#" class="hover:text-foreground">Contact</a>
              </nav>
            </div>
          </div>
          <p class="text-muted-foreground text-sm">The header above simulates the scrolled+blur visual state.</p>
        </div>
      </div>
    `,
  }),
};

export const WithBlur: Story = {
  args: {
    blur: true,
    shrink: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; overflow-y: scroll; position: relative; border: 1px solid #ccc;">
        <ui-sticky-header
          [scrollThreshold]="scrollThreshold"
          [shrink]="shrink"
          [blur]="blur"
          [hideOnScrollDown]="hideOnScrollDown"
          [zIndex]="zIndex"
        >
          <div class="flex items-center justify-between px-6 py-2">
            <span class="font-bold text-lg text-foreground">Blurry Header</span>
            <nav class="flex gap-4 text-sm text-muted-foreground">
              <a href="#" class="hover:text-foreground">Dashboard</a>
              <a href="#" class="hover:text-foreground">Settings</a>
            </nav>
          </div>
        </ui-sticky-header>
        <div style="height: 1200px; padding: 1rem;">
          <p class="text-muted-foreground">blur=true — after scrollThreshold px, backdrop-blur-md and bg-background/80 are applied.</p>
        </div>
      </div>
    `,
  }),
};

export const HideOnScrollDown: Story = {
  args: {
    hideOnScrollDown: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; overflow-y: scroll; position: relative; border: 1px solid #ccc;">
        <ui-sticky-header
          [scrollThreshold]="scrollThreshold"
          [shrink]="shrink"
          [blur]="blur"
          [hideOnScrollDown]="hideOnScrollDown"
          [zIndex]="zIndex"
        >
          <div class="flex items-center justify-between px-6 py-2">
            <span class="font-bold text-lg text-foreground">Auto-Hide Header</span>
            <nav class="flex gap-4 text-sm text-muted-foreground">
              <a href="#" class="hover:text-foreground">Home</a>
              <a href="#" class="hover:text-foreground">Docs</a>
            </nav>
          </div>
        </ui-sticky-header>
        <div style="height: 1200px; padding: 1rem;">
          <p class="text-muted-foreground">hideOnScrollDown=true — header slides out on scroll down, reappears on scroll up. Behavior is driven by window scroll events.</p>
        </div>
      </div>
    `,
  }),
};

export const NoShrink: Story = {
  args: {
    shrink: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; overflow-y: scroll; position: relative; border: 1px solid #ccc;">
        <ui-sticky-header
          [scrollThreshold]="scrollThreshold"
          [shrink]="shrink"
          [blur]="blur"
          [hideOnScrollDown]="hideOnScrollDown"
          [zIndex]="zIndex"
        >
          <div class="flex items-center justify-between px-6 py-2">
            <span class="font-bold text-lg text-foreground">Fixed-Height Header</span>
            <nav class="flex gap-4 text-sm text-muted-foreground">
              <a href="#" class="hover:text-foreground">Home</a>
              <a href="#" class="hover:text-foreground">About</a>
            </nav>
          </div>
        </ui-sticky-header>
        <div style="height: 1200px; padding: 1rem;">
          <p class="text-muted-foreground">shrink=false — header keeps py-4 padding even after scrolling past threshold.</p>
        </div>
      </div>
    `,
  }),
};
