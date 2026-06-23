import type { Meta, StoryObj } from '@storybook/angular';
import { UiFormulaEditorComponent, FormulaFunction } from './formula-editor.component';

// ---------------------------------------------------------------------------
// Custom function fixtures
// ---------------------------------------------------------------------------

const financialFunctions: FormulaFunction[] = [
  {
    name: 'NPV',
    description: 'Net present value of cash flows',
    args: ['rate', 'value1', '...'],
    example: '=NPV(0.1, C1:C5)',
  },
  {
    name: 'IRR',
    description: 'Internal rate of return',
    args: ['values', 'guess?'],
    example: '=IRR(B1:B10)',
  },
  {
    name: 'PMT',
    description: 'Periodic payment for a loan',
    args: ['rate', 'nper', 'pv'],
    example: '=PMT(0.05/12, 60, 10000)',
  },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<UiFormulaEditorComponent> = {
  title: 'Form/FormulaEditor',
  component: UiFormulaEditorComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**FormulaEditor** is a spreadsheet-style formula input with real-time autocomplete,
validation feedback, and a function-signature tooltip.

## Features
- Two-way bound formula string via \`[(value)]\`
- Built-in functions: SUM, AVG, IF, CONCAT, LEN, UPPER, LOWER, ROUND, MIN, MAX
- Autocomplete for both functions and custom variable names
- \`=\` prefix indicator and validity badge (✓ / ✗)
- Function signature tooltip when cursor is inside parentheses
- Emits \`formulaChange\` and \`validChange\` on every keystroke

## Usage
\`\`\`html
<ui-formula-editor
  [(value)]="formula"
  [variables]="['Revenue', 'Cost', 'Units']"
  (formulaChange)="onFormulaChange($event)"
  (validChange)="onValidChange($event)"
></ui-formula-editor>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    builtins: {
      control: 'boolean',
      description: 'Include the 10 built-in functions (SUM, AVG, IF…) in autocomplete.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input field.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    value: {
      control: 'text',
      description: 'Current formula string.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
        category: 'Model',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiFormulaEditorComponent>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default: only builtin functions, no custom variables. */
export const Default: Story = {
  name: 'Default (builtins)',
  args: {
    value: '=SUM(A1, A2)',
    builtins: true,
    disabled: false,
    functions: [],
    variables: [],
  },
};

/** Custom functions added alongside builtins. */
export const WithCustomFunctions: Story = {
  name: 'With Custom Functions',
  args: {
    value: '=NPV(0.1, C1:C5)',
    builtins: true,
    disabled: false,
    functions: financialFunctions,
    variables: [],
  },
  parameters: {
    docs: {
      description: {
        story: `Demonstrates adding domain-specific functions (NPV, IRR, PMT) on top of the
standard builtins. Type \`NPV\` to see the custom suggestion appear.`,
      },
    },
  },
};

/** Variable names surfaced in autocomplete. */
export const WithVariables: Story = {
  name: 'With Variables',
  args: {
    value: '=Revenue - Cost',
    builtins: true,
    disabled: false,
    functions: [],
    variables: ['Revenue', 'Cost', 'Units', 'Price', 'Margin'],
  },
  parameters: {
    docs: {
      description: {
        story: `Shows variable-name suggestions alongside function suggestions.
Type \`Rev\` to see the \`Revenue\` variable suggestion appear.`,
      },
    },
  },
};

/** Disabled state — no interaction possible. */
export const Disabled: Story = {
  name: 'Disabled',
  args: {
    value: '=SUM(A1, B1)',
    builtins: true,
    disabled: true,
    functions: [],
    variables: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'The editor is disabled. The input is non-interactive and visually dimmed.',
      },
    },
  },
};

/** Empty formula — shows placeholder text. */
export const Empty: Story = {
  name: 'Empty',
  args: {
    value: '',
    builtins: true,
    disabled: false,
    functions: [],
    variables: [],
  },
};

/** Formula with unbalanced parens — shows ✗ validity indicator. */
export const InvalidFormula: Story = {
  name: 'Invalid Formula',
  args: {
    value: '=SUM(A1, A2',
    builtins: true,
    disabled: false,
    functions: [],
    variables: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'The formula has an unclosed parenthesis, so the ✗ indicator is shown.',
      },
    },
  },
};
