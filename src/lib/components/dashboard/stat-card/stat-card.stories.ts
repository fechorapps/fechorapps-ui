import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiStatCardComponent } from './stat-card.component';
import { Users } from 'lucide-angular';

const meta: Meta<UiStatCardComponent> = {
  title: 'Dashboard/StatCard',
  component: UiStatCardComponent,
  decorators: [moduleMetadata({ imports: [UiStatCardComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiStatCardComponent>;

export const Default: Story = {
  args: { label: 'Total Revenue', value: '$48,295' },
};

export const WithIcon: Story = {
  args: { label: 'New Users', value: '1,234', icon: Users, trend: 'up', trendValue: '+12%' },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-4 p-4">
        <ui-stat-card label="Default" value="100" variant="default"></ui-stat-card>
        <ui-stat-card label="Primary" value="200" variant="primary"></ui-stat-card>
        <ui-stat-card label="Success" value="300" variant="success" trend="up" trendValue="+5%"></ui-stat-card>
        <ui-stat-card label="Warning" value="400" variant="warning" trend="neutral"></ui-stat-card>
        <ui-stat-card label="Danger" value="500" variant="danger" trend="down" trendValue="-8%"></ui-stat-card>
      </div>
    `,
    imports: [UiStatCardComponent],
  }),
};

export const Loading: Story = {
  args: { label: 'Revenue', value: '0', loading: true },
};
