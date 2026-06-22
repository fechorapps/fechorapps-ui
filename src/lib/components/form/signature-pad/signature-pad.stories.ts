import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UiSignaturePadComponent } from './signature-pad.component';

const meta: Meta<UiSignaturePadComponent> = {
  title: 'Form/SignaturePad',
  component: UiSignaturePadComponent,
  decorators: [moduleMetadata({ imports: [UiSignaturePadComponent] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiSignaturePadComponent>;

export const Default: Story = {
  args: {
    width: 400,
    height: 200,
    penColor: '#000000',
    penWidth: 2,
    backgroundColor: '#ffffff',
    placeholder: 'Sign here',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    width: 400,
    height: 200,
    disabled: true,
    placeholder: 'Signature disabled',
  },
};

export const CustomColors: Story = {
  args: {
    width: 400,
    height: 200,
    penColor: '#2563eb',
    penWidth: 3,
    backgroundColor: '#f8fafc',
    placeholder: 'Sign with blue pen',
  },
};
