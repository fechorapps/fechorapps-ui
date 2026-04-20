import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { LucideAngularModule, MapPin, Book, GraduationCap } from 'lucide-angular';

import {
  UiAutoCompleteComponent,
  AutoCompleteSuggestion,
  AutoCompleteCompleteEvent,
} from './autocomplete.component';

// Sample data
const COUNTRIES: AutoCompleteSuggestion[] = [
  { label: 'México', value: 'mx' },
  { label: 'Estados Unidos', value: 'us' },
  { label: 'Canadá', value: 'ca' },
  { label: 'España', value: 'es' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Colombia', value: 'co' },
  { label: 'Chile', value: 'cl' },
  { label: 'Perú', value: 'pe' },
  { label: 'Brasil', value: 'br' },
  { label: 'Venezuela', value: 've' },
];

const SUBJECTS: AutoCompleteSuggestion[] = [
  { label: 'Matemáticas', value: 'math' },
  { label: 'Español', value: 'spanish' },
  { label: 'Historia', value: 'history' },
  { label: 'Geografía', value: 'geography' },
  { label: 'Física', value: 'physics' },
  { label: 'Química', value: 'chemistry' },
  { label: 'Biología', value: 'biology' },
  { label: 'Inglés', value: 'english' },
  { label: 'Filosofía', value: 'philosophy' },
  { label: 'Economía', value: 'economics' },
];

const UNIVERSITIES: AutoCompleteSuggestion[] = [
  { label: 'Universidad Nacional Autónoma de México (UNAM)', value: 'unam' },
  { label: 'Instituto Politécnico Nacional (IPN)', value: 'ipn' },
  { label: 'Universidad Autónoma Metropolitana (UAM)', value: 'uam' },
  { label: 'Tecnológico de Monterrey (ITESM)', value: 'itesm' },
  { label: 'Universidad de Guadalajara (UDG)', value: 'udg' },
  { label: 'Benemérita Universidad Autónoma de Puebla (BUAP)', value: 'buap' },
  { label: 'Universidad Autónoma de Nuevo León (UANL)', value: 'uanl' },
  { label: 'Universidad Veracruzana (UV)', value: 'uv' },
];

/**
 * The AutoComplete component provides real-time suggestions as the user types.
 * It supports single/multiple selection, dropdown mode, and force selection.
 */
const meta: Meta<UiAutoCompleteComponent> = {
  title: 'Form/AutoComplete',
  component: UiAutoCompleteComponent,
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
    invalid: {
      control: 'boolean',
      description: 'Whether the input is in invalid state',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    dropdown: {
      control: 'boolean',
      description: 'Whether to show dropdown button',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether to allow multiple selections',
    },
    forceSelection: {
      control: 'boolean',
      description: 'Whether to force selection from suggestions',
    },
    showClear: {
      control: 'boolean',
      description: 'Whether to show clear button',
    },
    minLength: {
      control: 'number',
      description: 'Minimum characters to trigger search',
    },
    delay: {
      control: 'number',
      description: 'Delay before triggering search (ms)',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message when no results',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Search...',
    disabled: false,
    invalid: false,
    loading: false,
    dropdown: false,
    multiple: false,
    forceSelection: false,
    showClear: true,
    minLength: 1,
    delay: 300,
    emptyMessage: 'No hay resultados',
  },
};

export default meta;
type Story = StoryObj<UiAutoCompleteComponent>;

// Helper function to filter suggestions
const filterSuggestions = (
  query: string,
  items: AutoCompleteSuggestion[]
): AutoCompleteSuggestion[] => {
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => item.label.toLowerCase().includes(lowerQuery));
};

// =============================================================================
// BASIC STORIES
// =============================================================================

export const Default: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, COUNTRIES);
      },
    },
    template: `
      <ui-autocomplete
        placeholder="Buscar país..."
        [suggestions]="suggestions"
        (completeMethod)="onComplete($event)"
      ></ui-autocomplete>
    `,
  }),
};

export const WithLabel: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, COUNTRIES);
      },
    },
    template: `
      <ui-autocomplete
        label="País de origen"
        placeholder="Selecciona tu país"
        [suggestions]="suggestions"
        (completeMethod)="onComplete($event)"
      ></ui-autocomplete>
    `,
  }),
};

export const WithHelpText: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, COUNTRIES);
      },
    },
    template: `
      <ui-autocomplete
        label="País"
        placeholder="Buscar país..."
        helpText="Selecciona el país donde resides actualmente"
        [suggestions]="suggestions"
        (completeMethod)="onComplete($event)"
      ></ui-autocomplete>
    `,
  }),
};

// =============================================================================
// VARIANTS
// =============================================================================

export const AllVariants: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, SUBJECTS);
      },
    },
    template: `
      <div class="space-y-4">
        <ui-autocomplete
          variant="default"
          label="Default"
          placeholder="Buscar materia..."
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
        ></ui-autocomplete>
        <ui-autocomplete
          variant="filled"
          label="Filled"
          placeholder="Buscar materia..."
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
        ></ui-autocomplete>
        <ui-autocomplete
          variant="outlined"
          label="Outlined"
          placeholder="Buscar materia..."
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
        ></ui-autocomplete>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// SIZES
// =============================================================================

export const AllSizes: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, SUBJECTS);
      },
    },
    template: `
      <div class="space-y-4">
        <ui-autocomplete
          size="sm"
          label="Small"
          placeholder="Buscar..."
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
        ></ui-autocomplete>
        <ui-autocomplete
          size="md"
          label="Medium"
          placeholder="Buscar..."
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
        ></ui-autocomplete>
        <ui-autocomplete
          size="lg"
          label="Large"
          placeholder="Buscar..."
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
        ></ui-autocomplete>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// DROPDOWN MODE
// =============================================================================

export const WithDropdown: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = event.query ? filterSuggestions(event.query, SUBJECTS) : SUBJECTS;
      },
    },
    template: `
      <ui-autocomplete
        label="Materia"
        placeholder="Selecciona una materia"
        [dropdown]="true"
        [suggestions]="suggestions"
        (completeMethod)="onComplete($event)"
      ></ui-autocomplete>
    `,
  }),
};

// =============================================================================
// MULTIPLE SELECTION
// =============================================================================

export const MultipleSelection: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, SUBJECTS);
      },
    },
    template: `
      <ui-autocomplete
        label="Materias de interés"
        placeholder="Agregar materias..."
        [multiple]="true"
        [suggestions]="suggestions"
        (completeMethod)="onComplete($event)"
        helpText="Puedes seleccionar múltiples materias"
      ></ui-autocomplete>
    `,
  }),
};

// =============================================================================
// FORCE SELECTION
// =============================================================================

export const ForceSelection: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, UNIVERSITIES);
      },
    },
    template: `
      <ui-autocomplete
        label="Universidad"
        placeholder="Buscar universidad..."
        [forceSelection]="true"
        [suggestions]="suggestions"
        (completeMethod)="onComplete($event)"
        helpText="Debes seleccionar una universidad de la lista"
      ></ui-autocomplete>
    `,
  }),
};

// =============================================================================
// STATES
// =============================================================================

export const Loading: Story = {
  render: () => ({
    template: `
      <ui-autocomplete
        label="Buscando..."
        placeholder="Escribe para buscar"
        [loading]="true"
        [suggestions]="[]"
      ></ui-autocomplete>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <ui-autocomplete
        label="Campo deshabilitado"
        placeholder="No disponible"
        [disabled]="true"
        [suggestions]="[]"
      ></ui-autocomplete>
    `,
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `
      <ui-autocomplete
        label="Campo requerido"
        placeholder="Selecciona una opción"
        [invalid]="true"
        helpText="Este campo es obligatorio"
        [suggestions]="[]"
      ></ui-autocomplete>
    `,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ui-autocomplete
          label="Normal"
          placeholder="Estado normal"
          [suggestions]="[]"
        ></ui-autocomplete>
        <ui-autocomplete
          label="Loading"
          placeholder="Cargando..."
          [loading]="true"
          [suggestions]="[]"
        ></ui-autocomplete>
        <ui-autocomplete
          label="Disabled"
          placeholder="Deshabilitado"
          [disabled]="true"
          [suggestions]="[]"
        ></ui-autocomplete>
        <ui-autocomplete
          label="Invalid"
          placeholder="Con error"
          [invalid]="true"
          helpText="Este campo tiene un error"
          [suggestions]="[]"
        ></ui-autocomplete>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

// =============================================================================
// WITH CUSTOM ICON
// =============================================================================

export const WithCustomIcon: Story = {
  render: () => ({
    props: {
      mapIcon: MapPin,
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, COUNTRIES);
      },
    },
    template: `
      <ui-autocomplete
        label="Ubicación"
        placeholder="Buscar ubicación..."
        [icon]="mapIcon"
        [suggestions]="suggestions"
        (completeMethod)="onComplete($event)"
      ></ui-autocomplete>
    `,
  }),
};

// =============================================================================
// REAL WORLD EXAMPLES
// =============================================================================

export const UniversitySearch: Story = {
  render: () => ({
    props: {
      graduationIcon: GraduationCap,
      suggestions: [] as AutoCompleteSuggestion[],
      selectedUniversity: null as AutoCompleteSuggestion | null,
      onComplete(event: AutoCompleteCompleteEvent) {
        // Simulate API delay
        this['suggestions'] = filterSuggestions(event.query, UNIVERSITIES);
      },
      onSelect(event: { value: AutoCompleteSuggestion }) {
        this['selectedUniversity'] = event.value;
      },
    },
    template: `
      <div class="max-w-lg space-y-4">
        <ui-autocomplete
          label="Universidad destino"
          placeholder="Buscar universidad..."
          [icon]="graduationIcon"
          [forceSelection]="true"
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
          (onSelect)="onSelect($event)"
          helpText="Selecciona la universidad donde deseas aplicar"
        ></ui-autocomplete>
        @if (selectedUniversity) {
          <div class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p class="text-sm text-green-700 dark:text-green-300">
              Seleccionaste: <strong>{{ selectedUniversity.label }}</strong>
            </p>
          </div>
        }
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

export const SubjectSelector: Story = {
  render: () => ({
    props: {
      bookIcon: Book,
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, SUBJECTS);
      },
    },
    template: `
      <div class="max-w-lg">
        <ui-autocomplete
          label="Materias a estudiar"
          placeholder="Agregar materias..."
          [icon]="bookIcon"
          [multiple]="true"
          [dropdown]="true"
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
          helpText="Selecciona las materias que deseas preparar para tu examen"
        ></ui-autocomplete>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

const EXAMS: AutoCompleteSuggestion[] = [
  { label: 'CENEVAL EXANI-II', value: 'exani2' },
  { label: 'CENEVAL EXANI-I', value: 'exani1' },
  { label: 'CENEVAL EGEL', value: 'egel' },
  { label: 'COMIPEMS', value: 'comipems' },
  { label: 'UNAM - Examen de ingreso', value: 'unam' },
  { label: 'IPN - Examen de admisión', value: 'ipn' },
  { label: 'UAM - Examen de selección', value: 'uam' },
  { label: 'Examen diagnóstico general', value: 'diagnostico' },
];

export const ExamSearch: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      onComplete(event: AutoCompleteCompleteEvent) {
        this['suggestions'] = filterSuggestions(event.query, EXAMS);
      },
    },
    template: `
      <div class="max-w-lg p-6 border rounded-xl dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          ¿Para qué examen te estás preparando?
        </h3>
        <ui-autocomplete
          size="lg"
          placeholder="Buscar tipo de examen..."
          [dropdown]="true"
          [forceSelection]="true"
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
        ></ui-autocomplete>
        <p class="mt-2 text-sm text-gray-500">
          Selecciona el examen para personalizar tu plan de estudio
        </p>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};

export const AsyncSearch: Story = {
  render: () => ({
    props: {
      suggestions: [] as AutoCompleteSuggestion[],
      loading: false,
      async onComplete(event: AutoCompleteCompleteEvent) {
        this['loading'] = true;
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        this['suggestions'] = filterSuggestions(event.query, COUNTRIES);
        this['loading'] = false;
      },
    },
    template: `
      <div class="max-w-lg">
        <ui-autocomplete
          label="Búsqueda con API"
          placeholder="Escribe para buscar..."
          [loading]="loading"
          [suggestions]="suggestions"
          (completeMethod)="onComplete($event)"
          helpText="Simula una búsqueda con delay de 800ms"
        ></ui-autocomplete>
      </div>
    `,
  }),
  parameters: { controls: { disable: true } },
};
