import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  Home,
  FileText,
  Settings,
  Users,
  Mail,
  Calendar,
  BarChart,
  Shield,
  Database,
  HelpCircle,
} from 'lucide-angular';

import { UiPanelMenuComponent, PanelMenuItem } from './panel-menu.component';

const panelMenuItems: PanelMenuItem[] = [
  {
    label: 'Dashboard',
    icon: Home,
    expanded: true,
    items: [
      { label: 'Overview', icon: BarChart },
      { label: 'Analytics', icon: BarChart },
      { label: 'Reports', icon: FileText },
    ],
  },
  {
    label: 'Users',
    icon: Users,
    items: [
      { label: 'All Users', icon: Users },
      { label: 'Roles', icon: Shield },
      { label: 'Permissions', icon: Shield },
    ],
  },
  {
    label: 'Content',
    icon: FileText,
    items: [
      {
        label: 'Documents',
        icon: FileText,
        items: [
          { label: 'All Documents', icon: FileText },
          { label: 'Drafts', icon: FileText },
          { label: 'Archived', icon: Database },
        ],
      },
      { label: 'Media', icon: FileText },
    ],
  },
  {
    label: 'Communication',
    icon: Mail,
    items: [
      { label: 'Messages', icon: Mail },
      { label: 'Calendar', icon: Calendar },
    ],
  },
  {
    label: 'Settings',
    icon: Settings,
    items: [
      { label: 'General', icon: Settings },
      { label: 'Security', icon: Shield },
      { label: 'Database', icon: Database },
    ],
  },
  {
    label: 'Help',
    icon: HelpCircle,
  },
];

const meta: Meta<UiPanelMenuComponent> = {
  title: 'Menu/PanelMenu',
  component: UiPanelMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [UiPanelMenuComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple panels to be expanded',
    },
  },
};

export default meta;
type Story = StoryObj<UiPanelMenuComponent>;

export const Default: Story = {
  render: () => ({
    props: { items: panelMenuItems },
    template: `
      <div class="w-80">
        <ui-panel-menu [model]="items"></ui-panel-menu>
      </div>
    `,
  }),
};

export const SingleExpand: Story = {
  render: () => ({
    props: { items: panelMenuItems },
    template: `
      <div class="w-80">
        <ui-panel-menu [model]="items" [multiple]="false"></ui-panel-menu>
      </div>
    `,
  }),
};

export const WithDisabled: Story = {
  render: () => ({
    props: {
      items: [
        {
          label: 'Active Section',
          icon: Home,
          items: [
            { label: 'Item 1', icon: FileText },
            { label: 'Disabled Item', icon: Settings, disabled: true },
            { label: 'Item 3', icon: Mail },
          ],
        },
        {
          label: 'Disabled Section',
          icon: Settings,
          disabled: true,
          items: [{ label: 'Hidden Item', icon: FileText }],
        },
      ],
    },
    template: `
      <div class="w-80">
        <ui-panel-menu [model]="items"></ui-panel-menu>
      </div>
    `,
  }),
};

export const NestedMenu: Story = {
  render: () => ({
    props: {
      items: [
        {
          label: 'Level 1',
          icon: Home,
          expanded: true,
          items: [
            {
              label: 'Level 2',
              icon: FileText,
              expanded: true,
              items: [
                {
                  label: 'Level 3',
                  icon: Settings,
                  items: [{ label: 'Level 4 Item', icon: Mail }],
                },
              ],
            },
          ],
        },
      ],
    },
    template: `
      <div class="w-80">
        <ui-panel-menu [model]="items"></ui-panel-menu>
      </div>
    `,
  }),
};
