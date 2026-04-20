import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart,
  Mail,
  Calendar,
  Bell,
  Shield,
  Database,
  Cloud,
  Cpu,
} from 'lucide-angular';

import { UiMegaMenuComponent, MegaMenuItem } from './mega-menu.component';

const megaMenuItems: MegaMenuItem[] = [
  {
    label: 'Company',
    icon: Home,
    items: [
      [
        { label: 'About Us', icon: Users },
        { label: 'Careers', icon: FileText },
        { label: 'Press', icon: Mail },
      ],
      [
        { label: 'Blog', icon: FileText },
        { label: 'Events', icon: Calendar },
        { label: 'Contact', icon: Mail },
      ],
    ],
  },
  {
    label: 'Products',
    icon: Cpu,
    items: [
      [
        { label: 'Analytics', icon: BarChart },
        { label: 'Database', icon: Database },
        { label: 'Cloud Storage', icon: Cloud },
      ],
      [
        { label: 'Security', icon: Shield },
        { label: 'Notifications', icon: Bell },
        { label: 'Settings', icon: Settings },
      ],
    ],
  },
  {
    label: 'Resources',
    icon: FileText,
    items: [
      [
        { label: 'Documentation', icon: FileText },
        { label: 'API Reference', icon: Cpu },
        { label: 'Tutorials', icon: FileText },
      ],
    ],
  },
  {
    label: 'Contact',
    icon: Mail,
    command: () => console.log('Contact clicked'),
  },
];

const meta: Meta<UiMegaMenuComponent> = {
  title: 'Menu/MegaMenu',
  component: UiMegaMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMegaMenuComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Menu orientation',
    },
  },
};

export default meta;
type Story = StoryObj<UiMegaMenuComponent>;

export const Horizontal: Story = {
  render: () => ({
    props: { items: megaMenuItems },
    template: `
      <div class="p-8">
        <ui-mega-menu [model]="items"></ui-mega-menu>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    props: { items: megaMenuItems },
    template: `
      <div class="p-8">
        <ui-mega-menu [model]="items" orientation="vertical" styleClass="w-64"></ui-mega-menu>
      </div>
    `,
  }),
};

export const WithDisabledItems: Story = {
  render: () => ({
    props: {
      items: [
        {
          label: 'Active Menu',
          icon: Home,
          items: [
            [
              { label: 'Option 1', icon: FileText },
              { label: 'Disabled', icon: Settings, disabled: true },
              { label: 'Option 3', icon: Mail },
            ],
          ],
        },
        {
          label: 'Disabled Menu',
          icon: Settings,
          disabled: true,
          items: [[{ label: 'Should not see', icon: FileText }]],
        },
      ],
    },
    template: `
      <div class="p-8">
        <ui-mega-menu [model]="items"></ui-mega-menu>
      </div>
    `,
  }),
};
