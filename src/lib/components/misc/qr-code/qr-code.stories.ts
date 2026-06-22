import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiQrCodeComponent } from './qr-code.component';

const meta: Meta<UiQrCodeComponent> = {
  title: 'Misc/QrCode',
  component: UiQrCodeComponent,
  decorators: [
    moduleMetadata({
      imports: [UiQrCodeComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The value to encode into the QR code',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    size: {
      control: { type: 'number', min: 50, max: 600, step: 10 },
      description: 'QR code image size in pixels',
      table: { category: 'Appearance', defaultValue: { summary: '200' } },
    },
    errorCorrectionLevel: {
      control: { type: 'select' },
      options: ['L', 'M', 'Q', 'H'],
      description: 'Error correction level (L=7%, M=15%, Q=25%, H=30%)',
      table: { category: 'Behaviour', defaultValue: { summary: 'M' } },
    },
    color: {
      control: { type: 'color' },
      description: 'Dark module color',
      table: { category: 'Appearance', defaultValue: { summary: '#000000' } },
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Light module (background) color',
      table: { category: 'Appearance', defaultValue: { summary: '#ffffff' } },
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Show the encoded value as text below the QR code',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    value: 'https://fechorapps.com',
    size: 200,
    errorCorrectionLevel: 'M',
    color: '#000000',
    backgroundColor: '#ffffff',
    showValue: false,
  },
};

export default meta;
type Story = StoryObj<UiQrCodeComponent>;

export const Default: Story = {
  args: {
    value: 'https://fechorapps.com',
  },
};

export const ShowValue: Story = {
  args: {
    value: 'https://fechorapps.com',
    showValue: true,
  },
};

export const CustomColors: Story = {
  args: {
    value: 'https://fechorapps.com',
    color: '#6366f1',
    backgroundColor: '#f0f0ff',
    size: 250,
  },
};

export const Empty: Story = {
  args: {
    value: '',
  },
};

export const HighErrorCorrection: Story = {
  args: {
    value: 'https://fechorapps.com',
    errorCorrectionLevel: 'H',
    size: 250,
  },
};
