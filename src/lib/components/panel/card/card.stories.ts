import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { userEvent, within, expect, fn } from 'storybook/test';

import { UiCardComponent } from './card.component';
import { UiButtonComponent } from '../../button/button/button.component';

/**
 * The Card component is a versatile container for displaying content.
 * It supports multiple variants, optional headers/footers, images, and click interactions.
 */
const meta: Meta<UiCardComponent> = {
  title: 'Panel/Card',
  component: UiCardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [UiButtonComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'ghost'],
      description: 'The visual style variant of the card',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The padding size of the card content',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    title: {
      control: 'text',
      description: 'Optional title displayed in header',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle displayed below title',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether card has hover effect',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether card is clickable',
    },
    dividers: {
      control: 'boolean',
      description: 'Whether to show dividers between sections',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether card takes full height of container',
    },
    imageUrl: {
      control: 'text',
      description: 'URL of image to display at top',
    },
    cardClick: {
      action: 'cardClick',
      description: 'Emitted when card is clicked',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
    hoverable: false,
    clickable: false,
    dividers: false,
    fullHeight: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-card
        [variant]="variant"
        [padding]="padding"
        [title]="title"
        [subtitle]="subtitle"
        [hoverable]="hoverable"
        [clickable]="clickable"
        [dividers]="dividers"
        [imageUrl]="imageUrl"
        (cardClick)="cardClick($event)"
      >
        <p class="text-gray-600 dark:text-gray-300">
          This is the card content. You can put any content here.
        </p>
      </ui-card>
    `,
  }),
};

export default meta;
type Story = StoryObj<UiCardComponent>;

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Optional subtitle text',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Elevated Card',
    subtitle: 'With shadow effect',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card',
    subtitle: 'With border emphasis',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    title: 'Ghost Card',
    subtitle: 'Subtle background',
  },
};

// =============================================================================
// PADDING STORIES
// =============================================================================

export const PaddingSmall: Story = {
  args: {
    padding: 'sm',
    title: 'Small Padding',
  },
};

export const PaddingMedium: Story = {
  args: {
    padding: 'md',
    title: 'Medium Padding',
  },
};

export const PaddingLarge: Story = {
  args: {
    padding: 'lg',
    title: 'Large Padding',
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    title: 'No Padding',
  },
};

// =============================================================================
// INTERACTIVE STORIES
// =============================================================================

export const Hoverable: Story = {
  args: {
    variant: 'elevated',
    title: 'Hover Me',
    subtitle: 'I have a hover effect',
    hoverable: true,
  },
};

export const Clickable: Story = {
  args: {
    variant: 'default',
    title: 'Click Me',
    subtitle: 'I am clickable',
    clickable: true,
    hoverable: true,
  },
};

// =============================================================================
// WITH IMAGE
// =============================================================================

export const WithImage: Story = {
  args: {
    variant: 'elevated',
    title: 'Card with Image',
    subtitle: 'Beautiful imagery',
    imageUrl: 'https://picsum.photos/seed/card1/400/200',
  },
};

// =============================================================================
// WITH DIVIDERS
// =============================================================================

export const WithDividers: Story = {
  args: {
    title: 'Card with Dividers',
    subtitle: 'Sections are separated',
    dividers: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-card
        [variant]="variant"
        [title]="title"
        [subtitle]="subtitle"
        [dividers]="dividers"
      >
        <p class="text-gray-600 dark:text-gray-300">
          Main content area with some text.
        </p>
        <div footer class="flex gap-2 justify-end">
          <ui-button variant="ghost">Cancel</ui-button>
          <ui-button variant="primary">Save</ui-button>
        </div>
      </ui-card>
    `,
  }),
};

// =============================================================================
// WITH FOOTER
// =============================================================================

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    subtitle: 'Actions at the bottom',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-card
        [variant]="variant"
        [title]="title"
        [subtitle]="subtitle"
      >
        <p class="text-gray-600 dark:text-gray-300">
          This card has a footer with action buttons.
        </p>
        <div footer class="flex gap-2 justify-end mt-4">
          <ui-button variant="outline">Cancel</ui-button>
          <ui-button variant="primary">Confirm</ui-button>
        </div>
      </ui-card>
    `,
  }),
};

// =============================================================================
// COMPLEX CARD
// =============================================================================

export const ComplexCard: Story = {
  render: () => ({
    template: `
      <ui-card
        variant="elevated"
        imageUrl="https://picsum.photos/seed/complex/400/200"
        title="Featured Course"
        subtitle="Mathematics - Advanced Algebra"
        [hoverable]="true"
        [dividers]="true"
      >
        <div class="space-y-3">
          <p class="text-gray-600 dark:text-gray-300">
            Master algebraic concepts and prepare for your CENEVAL exam with our comprehensive course.
          </p>
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span>12 lessons</span>
            <span>6 hours</span>
            <span>Intermediate</span>
          </div>
        </div>
        <div footer class="flex items-center justify-between">
          <span class="text-lg font-bold text-primary-600">$299 MXN</span>
          <ui-button variant="primary">Enroll Now</ui-button>
        </div>
      </ui-card>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// ALL VARIANTS
// =============================================================================

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-2 gap-4">
        <ui-card variant="default" title="Default" subtitle="Standard card style">
          <p class="text-gray-600 dark:text-gray-300">Content here</p>
        </ui-card>
        <ui-card variant="elevated" title="Elevated" subtitle="With shadow">
          <p class="text-gray-600 dark:text-gray-300">Content here</p>
        </ui-card>
        <ui-card variant="outlined" title="Outlined" subtitle="Border emphasis">
          <p class="text-gray-600 dark:text-gray-300">Content here</p>
        </ui-card>
        <ui-card variant="ghost" title="Ghost" subtitle="Subtle background">
          <p class="text-gray-600 dark:text-gray-300">Content here</p>
        </ui-card>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// CARD GRID
// =============================================================================

export const CardGrid: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-4">
        @for (i of [1, 2, 3, 4, 5, 6]; track i) {
          <ui-card
            variant="elevated"
            [imageUrl]="'https://picsum.photos/seed/grid' + i + '/400/200'"
            [title]="'Card ' + i"
            subtitle="Example subtitle"
            [hoverable]="true"
          >
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Card content for item {{ i }}.
            </p>
          </ui-card>
        }
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    layout: 'padded',
  },
};

// =============================================================================
// PROFILE CARD
// =============================================================================

export const ProfileCard: Story = {
  render: () => ({
    template: `
      <ui-card variant="elevated" padding="lg" class="max-w-sm">
        <div class="flex flex-col items-center text-center">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
            JD
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Juan Díaz</h3>
          <p class="text-gray-500 dark:text-gray-400">Estudiante de Preparatoria</p>
          <div class="flex gap-4 mt-4 text-sm">
            <div class="text-center">
              <p class="font-bold text-gray-900 dark:text-white">24</p>
              <p class="text-gray-500">Exámenes</p>
            </div>
            <div class="text-center">
              <p class="font-bold text-gray-900 dark:text-white">89%</p>
              <p class="text-gray-500">Promedio</p>
            </div>
            <div class="text-center">
              <p class="font-bold text-gray-900 dark:text-white">12</p>
              <p class="text-gray-500">Logros</p>
            </div>
          </div>
        </div>
        <div footer class="flex gap-2 justify-center mt-4">
          <ui-button variant="outline" size="sm">Ver Perfil</ui-button>
          <ui-button variant="primary" size="sm">Seguir</ui-button>
        </div>
      </ui-card>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// STATS CARD
// =============================================================================

export const StatsCard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-4 gap-4">
        <ui-card variant="default">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Total Estudiantes</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
              <p class="text-sm text-green-500">+12% vs mes anterior</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <span class="text-primary-600 text-xl">👥</span>
            </div>
          </div>
        </ui-card>
        <ui-card variant="default">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Exámenes Completados</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">8,567</p>
              <p class="text-sm text-green-500">+8% vs mes anterior</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span class="text-green-600 text-xl">📝</span>
            </div>
          </div>
        </ui-card>
        <ui-card variant="default">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Promedio General</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">78.5%</p>
              <p class="text-sm text-yellow-500">+2% vs mes anterior</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <span class="text-yellow-600 text-xl">📊</span>
            </div>
          </div>
        </ui-card>
        <ui-card variant="default">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Cursos Activos</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">45</p>
              <p class="text-sm text-red-500">-3% vs mes anterior</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <span class="text-red-600 text-xl">📚</span>
            </div>
          </div>
        </ui-card>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    layout: 'padded',
  },
};

// =============================================================================
// PRICING CARD
// =============================================================================

export const PricingCard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-6">
        <ui-card variant="outlined" padding="lg" [hoverable]="true">
          <div class="text-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Básico</h3>
            <p class="text-gray-500 mt-1">Para empezar</p>
            <div class="mt-4">
              <span class="text-4xl font-bold text-gray-900 dark:text-white">$0</span>
              <span class="text-gray-500">/mes</span>
            </div>
            <ul class="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>✓ 5 exámenes por mes</li>
              <li>✓ Resultados básicos</li>
              <li>✓ 1 área de estudio</li>
              <li class="text-gray-400">✗ Sin análisis avanzado</li>
              <li class="text-gray-400">✗ Sin soporte prioritario</li>
            </ul>
          </div>
          <div footer class="mt-6">
            <ui-button variant="outline" [fullWidth]="true">Comenzar Gratis</ui-button>
          </div>
        </ui-card>

        <ui-card variant="elevated" padding="lg" [hoverable]="true" class="ring-2 ring-primary-500 relative">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            POPULAR
          </div>
          <div class="text-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Pro</h3>
            <p class="text-gray-500 mt-1">Para estudiantes serios</p>
            <div class="mt-4">
              <span class="text-4xl font-bold text-primary-600">$299</span>
              <span class="text-gray-500">/mes</span>
            </div>
            <ul class="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>✓ Exámenes ilimitados</li>
              <li>✓ Análisis detallado</li>
              <li>✓ Todas las áreas</li>
              <li>✓ IA personalizada</li>
              <li class="text-gray-400">✗ Sin tutor personal</li>
            </ul>
          </div>
          <div footer class="mt-6">
            <ui-button variant="primary" [fullWidth]="true">Suscribirse</ui-button>
          </div>
        </ui-card>

        <ui-card variant="outlined" padding="lg" [hoverable]="true">
          <div class="text-center">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Premium</h3>
            <p class="text-gray-500 mt-1">Máximo rendimiento</p>
            <div class="mt-4">
              <span class="text-4xl font-bold text-gray-900 dark:text-white">$599</span>
              <span class="text-gray-500">/mes</span>
            </div>
            <ul class="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>✓ Todo de Pro</li>
              <li>✓ Tutor personal</li>
              <li>✓ Sesiones en vivo</li>
              <li>✓ Material exclusivo</li>
              <li>✓ Garantía de resultados</li>
            </ul>
          </div>
          <div footer class="mt-6">
            <ui-button variant="outline" [fullWidth]="true">Contactar Ventas</ui-button>
          </div>
        </ui-card>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    layout: 'padded',
  },
};

// =============================================================================
// NOTIFICATION CARD
// =============================================================================

export const NotificationCard: Story = {
  render: () => ({
    template: `
      <div class="space-y-3 max-w-md">
        <ui-card variant="ghost" padding="sm" class="border-l-4 border-l-green-500">
          <div class="flex gap-3">
            <div class="text-green-500 text-xl">✓</div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Examen completado</p>
              <p class="text-sm text-gray-500">Has completado el examen de Matemáticas con 92%</p>
            </div>
          </div>
        </ui-card>

        <ui-card variant="ghost" padding="sm" class="border-l-4 border-l-yellow-500">
          <div class="flex gap-3">
            <div class="text-yellow-500 text-xl">⚠</div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Recordatorio</p>
              <p class="text-sm text-gray-500">Tu examen de práctica vence en 2 días</p>
            </div>
          </div>
        </ui-card>

        <ui-card variant="ghost" padding="sm" class="border-l-4 border-l-red-500">
          <div class="flex gap-3">
            <div class="text-red-500 text-xl">✗</div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Error de pago</p>
              <p class="text-sm text-gray-500">No pudimos procesar tu último pago</p>
            </div>
          </div>
        </ui-card>

        <ui-card variant="ghost" padding="sm" class="border-l-4 border-l-blue-500">
          <div class="flex gap-3">
            <div class="text-blue-500 text-xl">ℹ</div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Nueva funcionalidad</p>
              <p class="text-sm text-gray-500">Ahora puedes ver tu progreso semanal</p>
            </div>
          </div>
        </ui-card>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// PRODUCT CARD (E-commerce style)
// =============================================================================

export const ProductCard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-4 gap-4">
        <ui-card variant="elevated" padding="none" [hoverable]="true">
          <div class="relative">
            <img src="https://picsum.photos/seed/prod1/300/200" class="w-full h-40 object-cover" alt="Product">
            <span class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">-20%</span>
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-500 uppercase">Matemáticas</p>
            <h4 class="font-semibold text-gray-900 dark:text-white mt-1">Curso de Álgebra</h4>
            <div class="flex items-center gap-1 mt-2">
              <span class="text-yellow-400">★★★★★</span>
              <span class="text-xs text-gray-500">(128)</span>
            </div>
            <div class="flex items-center gap-2 mt-3">
              <span class="text-lg font-bold text-primary-600">$239</span>
              <span class="text-sm text-gray-400 line-through">$299</span>
            </div>
          </div>
        </ui-card>

        <ui-card variant="elevated" padding="none" [hoverable]="true">
          <div class="relative">
            <img src="https://picsum.photos/seed/prod2/300/200" class="w-full h-40 object-cover" alt="Product">
            <span class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Nuevo</span>
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-500 uppercase">Español</p>
            <h4 class="font-semibold text-gray-900 dark:text-white mt-1">Redacción Avanzada</h4>
            <div class="flex items-center gap-1 mt-2">
              <span class="text-yellow-400">★★★★☆</span>
              <span class="text-xs text-gray-500">(45)</span>
            </div>
            <div class="flex items-center gap-2 mt-3">
              <span class="text-lg font-bold text-primary-600">$199</span>
            </div>
          </div>
        </ui-card>

        <ui-card variant="elevated" padding="none" [hoverable]="true">
          <div class="relative">
            <img src="https://picsum.photos/seed/prod3/300/200" class="w-full h-40 object-cover" alt="Product">
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-500 uppercase">Ciencias</p>
            <h4 class="font-semibold text-gray-900 dark:text-white mt-1">Física Básica</h4>
            <div class="flex items-center gap-1 mt-2">
              <span class="text-yellow-400">★★★★★</span>
              <span class="text-xs text-gray-500">(89)</span>
            </div>
            <div class="flex items-center gap-2 mt-3">
              <span class="text-lg font-bold text-primary-600">$349</span>
            </div>
          </div>
        </ui-card>

        <ui-card variant="elevated" padding="none" [hoverable]="true">
          <div class="relative">
            <img src="https://picsum.photos/seed/prod4/300/200" class="w-full h-40 object-cover" alt="Product">
            <span class="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">Popular</span>
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-500 uppercase">Historia</p>
            <h4 class="font-semibold text-gray-900 dark:text-white mt-1">Historia de México</h4>
            <div class="flex items-center gap-1 mt-2">
              <span class="text-yellow-400">★★★★★</span>
              <span class="text-xs text-gray-500">(234)</span>
            </div>
            <div class="flex items-center gap-2 mt-3">
              <span class="text-lg font-bold text-primary-600">$279</span>
            </div>
          </div>
        </ui-card>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    layout: 'padded',
  },
};

// =============================================================================
// EMPTY STATE CARD
// =============================================================================

export const EmptyStateCard: Story = {
  render: () => ({
    template: `
      <ui-card variant="outlined" padding="lg" class="max-w-md mx-auto">
        <div class="text-center py-8">
          <div class="text-6xl mb-4">📭</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">No hay exámenes</h3>
          <p class="text-gray-500 mt-2 mb-6">
            Aún no has realizado ningún examen. Comienza tu preparación ahora.
          </p>
          <ui-button variant="primary">Iniciar Primer Examen</ui-button>
        </div>
      </ui-card>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// LOADING SKELETON CARD
// =============================================================================

export const LoadingSkeletonCard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-4">
        @for (i of [1, 2, 3]; track i) {
          <ui-card variant="default" padding="none">
            <div class="animate-pulse">
              <div class="bg-gray-200 dark:bg-gray-700 h-40 w-full"></div>
              <div class="p-4 space-y-3">
                <div class="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 rounded"></div>
                <div class="bg-gray-200 dark:bg-gray-700 h-4 w-1/2 rounded"></div>
                <div class="bg-gray-200 dark:bg-gray-700 h-8 w-full rounded mt-4"></div>
              </div>
            </div>
          </ui-card>
        }
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// TESTIMONIAL CARD
// =============================================================================

export const TestimonialCard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-6">
        <ui-card variant="elevated" padding="lg">
          <div class="text-primary-500 text-4xl mb-4">"</div>
          <p class="text-gray-600 dark:text-gray-300 italic">
            Gracias a Appcordion logré pasar mi examen CENEVAL con una calificación excelente. Los exámenes de práctica son muy similares al real.
          </p>
          <div class="flex items-center gap-3 mt-6">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
              MA
            </div>
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">María García</p>
              <p class="text-sm text-gray-500">Estudiante UNAM</p>
            </div>
          </div>
        </ui-card>

        <ui-card variant="elevated" padding="lg">
          <div class="text-primary-500 text-4xl mb-4">"</div>
          <p class="text-gray-600 dark:text-gray-300 italic">
            La mejor plataforma para prepararse. El sistema de gamificación me mantuvo motivado durante todo mi proceso de estudio.
          </p>
          <div class="flex items-center gap-3 mt-6">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
              CR
            </div>
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">Carlos Rodríguez</p>
              <p class="text-sm text-gray-500">Estudiante IPN</p>
            </div>
          </div>
        </ui-card>

        <ui-card variant="elevated" padding="lg">
          <div class="text-primary-500 text-4xl mb-4">"</div>
          <p class="text-gray-600 dark:text-gray-300 italic">
            Las explicaciones detalladas después de cada examen me ayudaron a entender mis errores y mejorar rápidamente.
          </p>
          <div class="flex items-center gap-3 mt-6">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
              AL
            </div>
            <div>
              <p class="font-semibold text-gray-900 dark:text-white">Ana López</p>
              <p class="text-sm text-gray-500">Estudiante UAM</p>
            </div>
          </div>
        </ui-card>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    layout: 'padded',
  },
};

// =============================================================================
// EXAM RESULT CARD
// =============================================================================

export const ExamResultCard: Story = {
  render: () => ({
    template: `
      <ui-card variant="elevated" padding="lg" class="max-w-md">
        <div class="text-center">
          <div class="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
            <span class="text-4xl font-bold text-green-600">92%</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">¡Excelente trabajo!</h3>
          <p class="text-gray-500 mt-1">Examen de Matemáticas - Álgebra</p>
        </div>

        <div class="mt-6 space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Respuestas correctas</span>
            <span class="font-medium text-gray-900 dark:text-white">46/50</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Tiempo utilizado</span>
            <span class="font-medium text-gray-900 dark:text-white">45:23 min</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Posición en ranking</span>
            <span class="font-medium text-gray-900 dark:text-white">#15 de 234</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Puntos ganados</span>
            <span class="font-medium text-primary-600">+250 XP</span>
          </div>
        </div>

        <div footer class="flex gap-2 mt-6">
          <ui-button variant="outline" [fullWidth]="true">Ver Respuestas</ui-button>
          <ui-button variant="primary" [fullWidth]="true">Compartir</ui-button>
        </div>
      </ui-card>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// ACHIEVEMENT CARD
// =============================================================================

export const AchievementCard: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-4 gap-4">
        <ui-card variant="elevated" padding="md" [hoverable]="true" class="text-center">
          <div class="text-5xl mb-3">🏆</div>
          <h4 class="font-semibold text-gray-900 dark:text-white">Primer Lugar</h4>
          <p class="text-xs text-gray-500 mt-1">Top 1 en ranking semanal</p>
          <div class="mt-3 text-xs text-primary-600 font-medium">+500 XP</div>
        </ui-card>

        <ui-card variant="elevated" padding="md" [hoverable]="true" class="text-center">
          <div class="text-5xl mb-3">🔥</div>
          <h4 class="font-semibold text-gray-900 dark:text-white">Racha de 7 días</h4>
          <p class="text-xs text-gray-500 mt-1">Estudiar 7 días seguidos</p>
          <div class="mt-3 text-xs text-primary-600 font-medium">+200 XP</div>
        </ui-card>

        <ui-card variant="elevated" padding="md" [hoverable]="true" class="text-center opacity-50">
          <div class="text-5xl mb-3 grayscale">🎯</div>
          <h4 class="font-semibold text-gray-900 dark:text-white">Perfeccionista</h4>
          <p class="text-xs text-gray-500 mt-1">100% en un examen</p>
          <div class="mt-3 text-xs text-gray-400 font-medium">Bloqueado</div>
        </ui-card>

        <ui-card variant="elevated" padding="md" [hoverable]="true" class="text-center opacity-50">
          <div class="text-5xl mb-3 grayscale">⚡</div>
          <h4 class="font-semibold text-gray-900 dark:text-white">Velocista</h4>
          <p class="text-xs text-gray-500 mt-1">Terminar en menos de 20 min</p>
          <div class="mt-3 text-xs text-gray-400 font-medium">Bloqueado</div>
        </ui-card>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// PROGRESS CARD
// =============================================================================

export const ProgressCard: Story = {
  render: () => ({
    template: `
      <ui-card variant="default" title="Progreso del Curso" subtitle="Matemáticas - Álgebra Lineal" [dividers]="true">
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600 dark:text-gray-300">Progreso general</span>
              <span class="font-medium text-gray-900 dark:text-white">68%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div class="bg-primary-500 h-2 rounded-full" style="width: 68%"></div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p class="text-xs text-gray-500">Lecciones completadas</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              <p class="text-xs text-gray-500">Lecciones restantes</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">4.5h</p>
              <p class="text-xs text-gray-500">Tiempo estudiado</p>
            </div>
          </div>
        </div>

        <div footer class="flex justify-end">
          <ui-button variant="primary">Continuar Curso</ui-button>
        </div>
      </ui-card>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// LEADERBOARD CARD
// =============================================================================

export const LeaderboardCard: Story = {
  render: () => ({
    template: `
      <ui-card variant="elevated" title="Top Estudiantes" subtitle="Esta semana" padding="none">
        <div class="divide-y divide-gray-100 dark:divide-gray-800">
          <div class="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20">
            <span class="text-2xl">🥇</span>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">Juan Díaz</p>
              <p class="text-xs text-gray-500">Nivel 24</p>
            </div>
            <span class="font-bold text-gray-900 dark:text-white">2,450 XP</span>
          </div>

          <div class="flex items-center gap-4 p-4">
            <span class="text-2xl">🥈</span>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold">
              MG
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">María García</p>
              <p class="text-xs text-gray-500">Nivel 22</p>
            </div>
            <span class="font-bold text-gray-900 dark:text-white">2,280 XP</span>
          </div>

          <div class="flex items-center gap-4 p-4">
            <span class="text-2xl">🥉</span>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
              CR
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">Carlos Rodríguez</p>
              <p class="text-xs text-gray-500">Nivel 21</p>
            </div>
            <span class="font-bold text-gray-900 dark:text-white">2,150 XP</span>
          </div>

          <div class="flex items-center gap-4 p-4">
            <span class="text-lg text-gray-400 w-8 text-center">4</span>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
              AL
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">Ana López</p>
              <p class="text-xs text-gray-500">Nivel 20</p>
            </div>
            <span class="font-bold text-gray-900 dark:text-white">1,980 XP</span>
          </div>

          <div class="flex items-center gap-4 p-4">
            <span class="text-lg text-gray-400 w-8 text-center">5</span>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
              PS
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">Pedro Sánchez</p>
              <p class="text-xs text-gray-500">Nivel 19</p>
            </div>
            <span class="font-bold text-gray-900 dark:text-white">1,850 XP</span>
          </div>
        </div>

        <div footer class="p-4 bg-gray-50 dark:bg-gray-800/50 text-center">
          <p class="text-sm text-gray-500">Tu posición: <span class="font-bold text-primary-600">#15</span></p>
        </div>
      </ui-card>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// SCHEDULE CARD
// =============================================================================

export const ScheduleCard: Story = {
  render: () => ({
    template: `
      <ui-card variant="default" title="Próximos Eventos" [dividers]="true">
        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="text-center">
              <p class="text-xs text-gray-500 uppercase">Dic</p>
              <p class="text-2xl font-bold text-primary-600">28</p>
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">Examen de Práctica CENEVAL</p>
              <p class="text-sm text-gray-500">10:00 AM - 1:00 PM</p>
              <span class="inline-block mt-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">Matemáticas</span>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="text-center">
              <p class="text-xs text-gray-500 uppercase">Dic</p>
              <p class="text-2xl font-bold text-gray-400">30</p>
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">Sesión con Tutor</p>
              <p class="text-sm text-gray-500">4:00 PM - 5:00 PM</p>
              <span class="inline-block mt-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded">En vivo</span>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="text-center">
              <p class="text-xs text-gray-500 uppercase">Ene</p>
              <p class="text-2xl font-bold text-gray-400">05</p>
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">Fecha límite: Simulacro Final</p>
              <p class="text-sm text-gray-500">Todo el día</p>
              <span class="inline-block mt-1 text-xs bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded">Importante</span>
            </div>
          </div>
        </div>

        <div footer>
          <ui-button variant="ghost" [fullWidth]="true">Ver calendario completo</ui-button>
        </div>
      </ui-card>
    `,
  }),
  parameters: {
    controls: { disable: true },
  },
};

// =============================================================================
// INTERACTIONS
// =============================================================================

const clickSpy = fn();

export const ClickInteraction: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Click to test interaction',
    clickable: true,
    hoverable: true,
    variant: 'elevated',
  },
  render: (args) => {
    clickSpy.mockClear();
    return {
      props: {
        ...args,
        handleClick: clickSpy,
      },
      template: `
        <ui-card
          [variant]="variant"
          [title]="title"
          [subtitle]="subtitle"
          [clickable]="clickable"
          [hoverable]="hoverable"
          (cardClick)="handleClick($event)"
        >
          <p class="text-gray-600 dark:text-gray-300">
            Click this card to trigger the event.
          </p>
        </ui-card>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('button');

    await userEvent.click(card);

    await expect(clickSpy).toHaveBeenCalledTimes(1);
  },
};
