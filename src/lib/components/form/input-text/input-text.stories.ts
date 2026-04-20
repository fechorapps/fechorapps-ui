import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { AtSign, Lock, LucideAngularModule, Mail, Phone, Search, User } from 'lucide-angular';

import { UiInputTextComponent } from './input-text.component';

/**
 * The InputText component is a customizable text input that supports
 * multiple variants, sizes, icons, validation states, and float labels.
 */
const meta: Meta<UiInputTextComponent> = {
  title: 'Form/InputText',
  component: UiInputTextComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [LucideAngularModule],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: 'The visual style variant',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
      table: { defaultValue: { summary: 'md' } },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The input type',
      table: { defaultValue: { summary: 'text' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helpText: {
      control: 'text',
      description: 'Help text displayed below input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input is in invalid state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether input takes full width',
    },
    floatLabel: {
      control: 'select',
      options: ['never', 'always', 'auto'],
      description: 'Float label mode',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    type: 'text',
    placeholder: 'Enter text...',
    disabled: false,
    readonly: false,
    invalid: false,
    fullWidth: true,
    floatLabel: 'never',
  },
};

export default meta;
type Story = StoryObj<UiInputTextComponent>;

// =============================================================================
// BASIC STORIES
// =============================================================================

export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helpText: 'We will never share your email with anyone else.',
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

export const VariantDefault: Story = {
  args: {
    variant: 'default',
    label: 'Default Variant',
    placeholder: 'Default style input',
  },
};

export const VariantFilled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled Variant',
    placeholder: 'Filled style input',
  },
};

export const VariantOutlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Variant',
    placeholder: 'Outlined style input',
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-input-text variant="default" label="Default" placeholder="Default variant"></ui-input-text>
        <ui-input-text variant="filled" label="Filled" placeholder="Filled variant"></ui-input-text>
        <ui-input-text variant="outlined" label="Outlined" placeholder="Outlined variant"></ui-input-text>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// SIZES
// =============================================================================

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
    label: 'Medium Input',
    placeholder: 'Medium size',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-input-text size="sm" label="Small" placeholder="Small input"></ui-input-text>
        <ui-input-text size="md" label="Medium" placeholder="Medium input"></ui-input-text>
        <ui-input-text size="lg" label="Large" placeholder="Large input"></ui-input-text>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithLeftIcon: Story = {
  render: () => ({
    props: { icon: User },
    template: `<ui-input-text [icon]="icon" label="Username" placeholder="Enter username"></ui-input-text>`,
  }),
};

export const WithRightIcon: Story = {
  render: () => ({
    props: { iconEnd: Search },
    template: `<ui-input-text [iconEnd]="iconEnd" placeholder="Search..."></ui-input-text>`,
  }),
};

export const WithBothIcons: Story = {
  render: () => ({
    props: { icon: Mail, iconEnd: AtSign },
    template: `<ui-input-text [icon]="icon" [iconEnd]="iconEnd" label="Email" placeholder="Enter email"></ui-input-text>`,
  }),
};

export const IconExamples: Story = {
  render: () => ({
    props: {
      user: User,
      mail: Mail,
      phone: Phone,
      lock: Lock,
      search: Search,
    },
    template: `
      <div class="space-y-4">
        <ui-input-text [icon]="user" label="Username" placeholder="Enter username"></ui-input-text>
        <ui-input-text [icon]="mail" label="Email" placeholder="Enter email" type="email"></ui-input-text>
        <ui-input-text [icon]="phone" label="Phone" placeholder="Enter phone" type="tel"></ui-input-text>
        <ui-input-text [icon]="lock" label="Password" placeholder="Enter password" type="password"></ui-input-text>
        <ui-input-text [icon]="search" placeholder="Search..."></ui-input-text>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// STATES
// =============================================================================

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const Readonly: Story = {
  render: () => ({
    template: `<ui-input-text label="Readonly Input" [readonly]="true" [value]="'This value cannot be changed'"></ui-input-text>`,
  }),
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    invalid: true,
    helpText: 'Please enter a valid email address.',
  },
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-input-text label="Normal" placeholder="Normal state"></ui-input-text>
        <ui-input-text label="Disabled" placeholder="Disabled state" [disabled]="true"></ui-input-text>
        <ui-input-text label="Invalid" placeholder="Invalid state" [invalid]="true" helpText="This field has an error"></ui-input-text>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// FLOAT LABEL
// =============================================================================

export const FloatLabelAuto: Story = {
  args: {
    label: 'Float Label',
    floatLabel: 'auto',
  },
};

export const FloatLabelAlways: Story = {
  args: {
    label: 'Always Floating',
    floatLabel: 'always',
  },
};

export const FloatLabelExamples: Story = {
  render: () => ({
    template: `
      <div class="space-y-6">
        <ui-input-text label="Normal Label" floatLabel="never" placeholder="With placeholder"></ui-input-text>
        <ui-input-text label="Float on Focus" floatLabel="auto"></ui-input-text>
        <ui-input-text label="Always Floating" floatLabel="always"></ui-input-text>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// INPUT TYPES
// =============================================================================

export const TypePassword: Story = {
  render: () => ({
    props: { icon: Lock },
    template: `<ui-input-text [icon]="icon" type="password" label="Password" placeholder="Enter password"></ui-input-text>`,
  }),
};

export const TypeEmail: Story = {
  render: () => ({
    props: { icon: Mail },
    template: `<ui-input-text [icon]="icon" type="email" label="Email" placeholder="Enter email"></ui-input-text>`,
  }),
};

export const TypeNumber: Story = {
  args: {
    type: 'number',
    label: 'Quantity',
    placeholder: 'Enter quantity',
  },
};

// =============================================================================
// REAL WORLD EXAMPLES
// =============================================================================

export const LoginForm: Story = {
  render: () => ({
    props: { mail: Mail, lock: Lock },
    template: `
      <div class="max-w-md space-y-4 p-6 border rounded-xl dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Iniciar Sesión</h3>
        <ui-input-text
          [icon]="mail"
          type="email"
          label="Correo electrónico"
          placeholder="tu@email.com"
        ></ui-input-text>
        <ui-input-text
          [icon]="lock"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
        ></ui-input-text>
        <button class="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          Iniciar Sesión
        </button>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

export const RegistrationForm: Story = {
  render: () => ({
    props: { user: User, mail: Mail, lock: Lock, phone: Phone },
    template: `
      <div class="max-w-md space-y-4 p-6 border rounded-xl dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Crear Cuenta</h3>
        <div class="grid grid-cols-2 gap-4">
          <ui-input-text label="Nombre" placeholder="Juan"></ui-input-text>
          <ui-input-text label="Apellido" placeholder="García"></ui-input-text>
        </div>
        <ui-input-text
          [icon]="mail"
          type="email"
          label="Correo electrónico"
          placeholder="tu@email.com"
          helpText="Usaremos este correo para enviarte notificaciones"
        ></ui-input-text>
        <ui-input-text
          [icon]="phone"
          type="tel"
          label="Teléfono"
          placeholder="+52 55 1234 5678"
        ></ui-input-text>
        <ui-input-text
          [icon]="lock"
          type="password"
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          helpText="Debe incluir mayúsculas, minúsculas y números"
        ></ui-input-text>
        <ui-input-text
          [icon]="lock"
          type="password"
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
        ></ui-input-text>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

export const SearchBar: Story = {
  render: () => ({
    props: { search: Search },
    template: `
      <div class="max-w-xl">
        <ui-input-text
          variant="filled"
          size="lg"
          [icon]="search"
          placeholder="Buscar exámenes, cursos, temas..."
        ></ui-input-text>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

export const ValidationExample: Story = {
  render: () => ({
    props: { mail: Mail },
    template: `
      <div class="max-w-md space-y-4">
        <ui-input-text
          [icon]="mail"
          type="email"
          label="Email válido"
          [value]="'usuario@email.com'"
          helpText="Email verificado correctamente"
        ></ui-input-text>
        <ui-input-text
          [icon]="mail"
          type="email"
          label="Email inválido"
          [value]="'email-incorrecto'"
          [invalid]="true"
          helpText="Por favor ingresa un email válido"
        ></ui-input-text>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};
