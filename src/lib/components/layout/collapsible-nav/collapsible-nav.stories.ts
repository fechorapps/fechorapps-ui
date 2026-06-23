import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiCollapsibleNavComponent, NavItem } from './collapsible-nav.component';
import { Home, Settings, Users, BarChart2, Bell, FileText, HelpCircle, Shield } from 'lucide-angular';

const meta: Meta<UiCollapsibleNavComponent> = {
  title: 'Layout/CollapsibleNav',
  component: UiCollapsibleNavComponent,
  decorators: [moduleMetadata({ imports: [UiCollapsibleNavComponent] })],
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    activeRoute: { control: 'text' },
    width: { control: 'text' },
    collapsedWidth: { control: 'text' },
    showHeader: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UiCollapsibleNavComponent>;

const basicItems: NavItem[] = [
  { id: '1', label: 'Dashboard', icon: Home, route: '/dashboard' },
  { id: '2', label: 'Analytics', icon: BarChart2, route: '/analytics' },
  { id: '3', label: 'Users', icon: Users, route: '/users' },
  { id: '4', label: 'Settings', icon: Settings, route: '/settings' },
];

const sectionItems: NavItem[] = [
  { id: 'a1', label: 'Dashboard', icon: Home, route: '/dashboard', section: 'Main' },
  { id: 'a2', label: 'Analytics', icon: BarChart2, route: '/analytics', section: 'Main' },
  { id: 'b1', label: 'Users', icon: Users, route: '/users', section: 'Management' },
  { id: 'b2', label: 'Roles', icon: Shield, route: '/roles', section: 'Management' },
  { id: 'c1', label: 'Settings', icon: Settings, route: '/settings', section: 'System' },
  { id: 'c2', label: 'Help', icon: HelpCircle, route: '/help', section: 'System' },
];

const badgeItems: NavItem[] = [
  { id: 'm1', label: 'Inbox', icon: Bell, route: '/inbox', badge: 12 },
  { id: 'm2', label: 'Documents', icon: FileText, route: '/documents', badge: 'New' },
  { id: 'm3', label: 'Dashboard', icon: Home, route: '/dashboard' },
  { id: 'm4', label: 'Settings', icon: Settings, route: '/settings', disabled: true },
];

const nestedItems: NavItem[] = [
  { id: 'n1', label: 'Dashboard', icon: Home, route: '/dashboard' },
  {
    id: 'n2',
    label: 'Users',
    icon: Users,
    children: [
      { id: 'n2-1', label: 'All Users', route: '/users' },
      { id: 'n2-2', label: 'Add User', route: '/users/add' },
      { id: 'n2-3', label: 'Roles', route: '/users/roles' },
    ],
  },
  {
    id: 'n3',
    label: 'Reports',
    icon: BarChart2,
    children: [
      { id: 'n3-1', label: 'Monthly', route: '/reports/monthly' },
      { id: 'n3-2', label: 'Annual', route: '/reports/annual' },
    ],
  },
  { id: 'n4', label: 'Settings', icon: Settings, route: '/settings' },
];

export const Default: Story = {
  args: {
    items: basicItems,
    collapsed: false,
    activeRoute: '/dashboard',
    width: '260px',
    collapsedWidth: '64px',
    showHeader: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; display: flex; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-collapsible-nav
          [items]="items"
          [collapsed]="collapsed"
          [activeRoute]="activeRoute"
          [width]="width"
          [collapsedWidth]="collapsedWidth"
          [showHeader]="showHeader"
        ></ui-collapsible-nav>
        <div style="flex:1; padding: 24px; background: #f9fafb;">
          <h2 style="margin:0 0 8px; font-weight:600;">Main Content</h2>
          <p style="color:#6b7280; font-size:14px;">Use the toggle button to collapse/expand the sidebar.</p>
        </div>
      </div>
    `,
  }),
};

export const WithSections: Story = {
  args: {
    items: sectionItems,
    collapsed: false,
    activeRoute: '/dashboard',
    width: '260px',
    collapsedWidth: '64px',
    showHeader: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 480px; display: flex; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-collapsible-nav
          [items]="items"
          [collapsed]="collapsed"
          [activeRoute]="activeRoute"
          [width]="width"
          [collapsedWidth]="collapsedWidth"
          [showHeader]="showHeader"
        ></ui-collapsible-nav>
        <div style="flex:1; padding: 24px; background: #f9fafb;">
          <h2 style="margin:0 0 8px; font-weight:600;">Sectioned Navigation</h2>
          <p style="color:#6b7280; font-size:14px;">Items are grouped by section with labeled headers.</p>
        </div>
      </div>
    `,
  }),
};

export const WithBadges: Story = {
  args: {
    items: badgeItems,
    collapsed: false,
    activeRoute: '/inbox',
    width: '260px',
    collapsedWidth: '64px',
    showHeader: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; display: flex; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-collapsible-nav
          [items]="items"
          [collapsed]="collapsed"
          [activeRoute]="activeRoute"
          [width]="width"
          [collapsedWidth]="collapsedWidth"
          [showHeader]="showHeader"
        ></ui-collapsible-nav>
        <div style="flex:1; padding: 24px; background: #f9fafb;">
          <h2 style="margin:0 0 8px; font-weight:600;">Badges & Disabled</h2>
          <p style="color:#6b7280; font-size:14px;">Items can show numeric or text badges. Disabled items are non-interactive.</p>
        </div>
      </div>
    `,
  }),
};

export const Collapsed: Story = {
  args: {
    items: basicItems,
    collapsed: true,
    activeRoute: '/dashboard',
    width: '260px',
    collapsedWidth: '64px',
    showHeader: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; display: flex; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-collapsible-nav
          [items]="items"
          [collapsed]="collapsed"
          [activeRoute]="activeRoute"
          [width]="width"
          [collapsedWidth]="collapsedWidth"
          [showHeader]="showHeader"
        ></ui-collapsible-nav>
        <div style="flex:1; padding: 24px; background: #f9fafb;">
          <h2 style="margin:0 0 8px; font-weight:600;">Collapsed Mode</h2>
          <p style="color:#6b7280; font-size:14px;">Only icons are visible. Hover over an icon to see its tooltip label.</p>
        </div>
      </div>
    `,
  }),
};

export const WithActiveRoute: Story = {
  args: {
    items: nestedItems,
    collapsed: false,
    activeRoute: '/settings',
    width: '260px',
    collapsedWidth: '64px',
    showHeader: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 480px; display: flex; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <ui-collapsible-nav
          [items]="items"
          [collapsed]="collapsed"
          [activeRoute]="activeRoute"
          [width]="width"
          [collapsedWidth]="collapsedWidth"
          [showHeader]="showHeader"
        ></ui-collapsible-nav>
        <div style="flex:1; padding: 24px; background: #f9fafb;">
          <h2 style="margin:0 0 8px; font-weight:600;">Active Route Highlighted</h2>
          <p style="color:#6b7280; font-size:14px;">The active route item is highlighted. Nested items expand on click.</p>
        </div>
      </div>
    `,
  }),
};
