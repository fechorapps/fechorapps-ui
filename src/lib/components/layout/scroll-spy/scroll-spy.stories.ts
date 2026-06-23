import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiScrollSpyComponent, ScrollSpyItem } from './scroll-spy.component';
import { BookOpen, Info, Star, Settings, Home, Users } from 'lucide-angular';

const meta: Meta<UiScrollSpyComponent> = {
  title: 'Layout/ScrollSpy',
  component: UiScrollSpyComponent,
  decorators: [moduleMetadata({ imports: [UiScrollSpyComponent] })],
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    smooth: { control: 'boolean' },
    offset: { control: 'number' },
    activeClass: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UiScrollSpyComponent>;

const basicItems: ScrollSpyItem[] = [
  { id: 'intro', label: 'Introduction' },
  { id: 'details', label: 'Details' },
  { id: 'examples', label: 'Examples' },
  { id: 'conclusion', label: 'Conclusion' },
];

const itemsWithIcons: ScrollSpyItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: Info },
  { id: 'features', label: 'Features', icon: Star },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'docs', label: 'Docs', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Vertical: Story = {
  args: {
    items: basicItems,
    orientation: 'vertical',
    smooth: true,
    offset: 80,
    activeClass: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 32px; font-family: sans-serif;">
        <!-- Scroll Spy Nav -->
        <div style="width: 200px; flex-shrink: 0; position: sticky; top: 16px; height: fit-content; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff;">
          <p style="font-size:11px; font-weight:600; text-transform:uppercase; color:#9ca3af; margin:0 0 8px;">On This Page</p>
          <ui-scroll-spy
            [items]="items"
            [orientation]="orientation"
            [smooth]="smooth"
            [offset]="offset"
            [activeClass]="activeClass"
          ></ui-scroll-spy>
        </div>
        <!-- Scrollable Content -->
        <div style="flex:1; max-height: 400px; overflow-y: auto; padding: 16px;">
          <section id="intro" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Introduction</h2>
            <p style="color:#6b7280; line-height:1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </section>
          <section id="details" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Details</h2>
            <p style="color:#6b7280; line-height:1.6;">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
          </section>
          <section id="examples" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Examples</h2>
            <p style="color:#6b7280; line-height:1.6;">Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
          </section>
          <section id="conclusion" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Conclusion</h2>
            <p style="color:#6b7280; line-height:1.6;">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          </section>
        </div>
      </div>
    `,
  }),
};

export const Horizontal: Story = {
  args: {
    items: basicItems,
    orientation: 'horizontal',
    smooth: true,
    offset: 80,
    activeClass: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="font-family: sans-serif;">
        <!-- Scroll Spy Nav (horizontal, acts as tab bar) -->
        <div style="padding: 8px 16px; border-bottom: 1px solid #e5e7eb; background: #fff; position: sticky; top: 0; z-index: 10;">
          <ui-scroll-spy
            [items]="items"
            [orientation]="orientation"
            [smooth]="smooth"
            [offset]="offset"
            [activeClass]="activeClass"
          ></ui-scroll-spy>
        </div>
        <!-- Scrollable Content -->
        <div style="max-height: 350px; overflow-y: auto; padding: 24px;">
          <section id="intro" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Introduction</h2>
            <p style="color:#6b7280; line-height:1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </section>
          <section id="details" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Details</h2>
            <p style="color:#6b7280; line-height:1.6;">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.</p>
          </section>
          <section id="examples" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Examples</h2>
            <p style="color:#6b7280; line-height:1.6;">Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.</p>
          </section>
          <section id="conclusion" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Conclusion</h2>
            <p style="color:#6b7280; line-height:1.6;">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed quia consequuntur magni dolores.</p>
          </section>
        </div>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    orientation: 'vertical',
    smooth: true,
    offset: 80,
    activeClass: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 32px; font-family: sans-serif;">
        <div style="width: 220px; flex-shrink: 0; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff;">
          <p style="font-size:11px; font-weight:600; text-transform:uppercase; color:#9ca3af; margin:0 0 8px;">Navigation</p>
          <ui-scroll-spy
            [items]="items"
            [orientation]="orientation"
            [smooth]="smooth"
            [offset]="offset"
            [activeClass]="activeClass"
          ></ui-scroll-spy>
        </div>
        <div style="flex:1; max-height: 400px; overflow-y: auto; padding: 16px;">
          <section id="home" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Home</h2>
            <p style="color:#6b7280; line-height:1.6;">Welcome to the home section. This demonstrates scroll spy with icon indicators.</p>
          </section>
          <section id="about" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">About</h2>
            <p style="color:#6b7280; line-height:1.6;">Information about the project and team. Scroll down to see active state change.</p>
          </section>
          <section id="features" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Features</h2>
            <p style="color:#6b7280; line-height:1.6;">Key features include IntersectionObserver-based tracking, smooth scrolling, and flexible orientation.</p>
          </section>
          <section id="users" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Users</h2>
            <p style="color:#6b7280; line-height:1.6;">User management and profiles section content placeholder text.</p>
          </section>
          <section id="docs" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Docs</h2>
            <p style="color:#6b7280; line-height:1.6;">Documentation and API reference. See how the nav item highlights as you scroll.</p>
          </section>
          <section id="settings" style="margin-bottom: 16px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Settings</h2>
            <p style="color:#6b7280; line-height:1.6;">Configuration and preferences. This is the last section in the scroll spy demo.</p>
          </section>
        </div>
      </div>
    `,
  }),
};

export const CustomActiveClass: Story = {
  args: {
    items: basicItems,
    orientation: 'vertical',
    smooth: true,
    offset: 80,
    activeClass: 'bg-accent border-l-2 border-primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 32px; font-family: sans-serif;">
        <div style="width: 200px; flex-shrink: 0; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff;">
          <p style="font-size:11px; font-weight:600; text-transform:uppercase; color:#9ca3af; margin:0 0 8px;">Contents</p>
          <ui-scroll-spy
            [items]="items"
            [orientation]="orientation"
            [smooth]="smooth"
            [offset]="offset"
            [activeClass]="activeClass"
          ></ui-scroll-spy>
        </div>
        <div style="flex:1; max-height: 400px; overflow-y: auto; padding: 16px;">
          <section id="intro" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Introduction</h2>
            <p style="color:#6b7280; line-height:1.6;">Custom active class applied: bg-accent with a left border indicator. This overrides the default styling.</p>
          </section>
          <section id="details" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Details</h2>
            <p style="color:#6b7280; line-height:1.6;">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </section>
          <section id="examples" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Examples</h2>
            <p style="color:#6b7280; line-height:1.6;">Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </section>
          <section id="conclusion" style="margin-bottom: 48px;">
            <h2 style="font-weight:700; font-size:20px; margin:0 0 8px;">Conclusion</h2>
            <p style="color:#6b7280; line-height:1.6;">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
          </section>
        </div>
      </div>
    `,
  }),
};
