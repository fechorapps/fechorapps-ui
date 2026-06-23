import type { Meta, StoryObj } from '@storybook/angular';
import { UiJsonEditorComponent } from './json-editor.component';

// ---------------------------------------------------------------------------
// Sample JSON fixtures
// ---------------------------------------------------------------------------

const userObject = {
  id: 1,
  name: 'Alice Wonderland',
  email: 'alice@example.com',
  age: 30,
  active: true,
  address: {
    street: '123 Main St',
    city: 'Springfield',
    country: 'US',
  },
  tags: ['admin', 'user'],
  metadata: null,
};

const productArray = [
  { id: 101, name: 'Widget A', price: 9.99, inStock: true },
  { id: 102, name: 'Widget B', price: 19.99, inStock: false },
  { id: 103, name: 'Widget C', price: 4.99, inStock: true },
];

const configObject = {
  apiBaseUrl: 'https://api.example.com/v2',
  timeout: 5000,
  retries: 3,
  features: {
    darkMode: true,
    betaFeatures: false,
    analytics: true,
  },
  allowedOrigins: ['https://app.example.com', 'https://staging.example.com'],
};

const primitiveNull = null;

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<UiJsonEditorComponent> = {
  title: 'Form/JsonEditor',
  component: UiJsonEditorComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**JsonEditor** is a dual-mode JSON editor component.

## Modes
- **tree** (default): Interactive collapsible tree view. Leaf values are
  inline-editable. Expand/collapse nodes individually or use the toolbar
  buttons to expand/collapse all at once.
- **raw**: A code editor (\`<ui-code-editor>\`) with JSON syntax highlighting.
  Parses the text on every change; displays a red error message for invalid JSON.

## Features
- Two-way bound JSON value via \`[(value)]\`
- Expand/collapse individual nodes or all at once
- Inline leaf editing (preserves original type — number, boolean, null)
- Raw mode with live JSON validation
- Read-only mode for display-only use
- Emits \`valueChange\` on every valid edit
- Emits \`parseError\` when raw text is not valid JSON

## Usage
\`\`\`html
<!-- Tree mode -->
<ui-json-editor [(value)]="myJson" mode="tree"></ui-json-editor>

<!-- Raw mode -->
<ui-json-editor [(value)]="myJson" mode="raw" height="500px"></ui-json-editor>

<!-- Read-only -->
<ui-json-editor [value]="myJson" [readonly]="true"></ui-json-editor>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['tree', 'raw'],
      description: 'Editor mode — tree view or raw JSON text.',
      table: {
        type: { summary: "'tree' | 'raw'" },
        defaultValue: { summary: 'tree' },
        category: 'Configuration',
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Prevent edits in both tree and raw modes.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    height: {
      control: 'text',
      description: 'Min-height of the tree panel / height of the raw code editor.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '400px' },
        category: 'Appearance',
      },
    },
    expandAll: {
      control: 'boolean',
      description: 'Start with all nodes expanded.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Configuration',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiJsonEditorComponent>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Default tree view with a realistic user object. */
export const TreeMode: Story = {
  name: 'Tree — User Object',
  args: {
    value: userObject,
    mode: 'tree',
    readonly: false,
    height: '400px',
  },
};

/** Tree view showing an array at the root. */
export const TreeModeArray: Story = {
  name: 'Tree — Array of Products',
  args: {
    value: productArray,
    mode: 'tree',
    readonly: false,
    height: '400px',
  },
};

/** Tree view in read-only mode. */
export const TreeModeReadOnly: Story = {
  name: 'Tree — Read-Only',
  args: {
    value: configObject,
    mode: 'tree',
    readonly: true,
    height: '400px',
  },
};

/** Raw JSON text editor. */
export const RawMode: Story = {
  name: 'Raw — Config Object',
  args: {
    value: configObject,
    mode: 'raw',
    readonly: false,
    height: '400px',
  },
};

/** Raw mode in read-only state. */
export const RawModeReadOnly: Story = {
  name: 'Raw — Read-Only',
  args: {
    value: userObject,
    mode: 'raw',
    readonly: true,
    height: '350px',
  },
};

/** Empty / null JSON value. */
export const EmptyValue: Story = {
  name: 'Empty (null)',
  args: {
    value: primitiveNull,
    mode: 'tree',
    readonly: false,
    height: '200px',
  },
};

/** Deeply nested object to demonstrate multi-level collapsing. */
export const DeepNested: Story = {
  name: 'Tree — Deep Nested',
  args: {
    value: {
      level1: {
        level2: {
          level3: {
            level4: {
              answer: 42,
              label: 'deep value',
            },
          },
        },
      },
    },
    mode: 'tree',
    readonly: false,
    height: '400px',
  },
};
