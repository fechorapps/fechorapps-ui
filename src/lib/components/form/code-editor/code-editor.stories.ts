import type { Meta, StoryObj } from '@storybook/angular';
import { UiCodeEditorComponent } from './code-editor.component';

const typescriptSample = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`<h1>{{ title() }}</h1>\`,
})
export class AppComponent {
  title = signal('Hello, Angular!');
}
`;

const jsonSample = `{
  "name": "@fechorapps/ui",
  "version": "1.4.0",
  "description": "Angular UI component library",
  "peerDependencies": {
    "@angular/core": ">=21.0.0"
  }
}
`;

const cssSample = `/* Design tokens */
:root {
  --color-primary: hsl(222 89% 55%);
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(222 47% 11%);
  --radius: 0.5rem;
}

.card {
  background: var(--color-background);
  border-radius: var(--radius);
  padding: 1rem;
}
`;

const htmlSample = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
  </head>
  <body>
    <ui-code-editor
      language="typescript"
      [lineNumbers]="true">
    </ui-code-editor>
  </body>
</html>
`;

const meta: Meta<UiCodeEditorComponent> = {
  title: 'Form/CodeEditor',
  component: UiCodeEditorComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**CodeEditor** is a code editor component that lazy-loads CodeMirror 6 for syntax
highlighting and falls back to a plain \`<textarea>\` when CodeMirror is unavailable
(e.g. in SSR or test environments).

## Features
- Lazy-loads CodeMirror 6 via dynamic \`import()\` — zero bundle cost when absent
- Falls back to a functional \`<textarea>\` transparently
- Supports TypeScript, JavaScript, JSON, HTML, CSS, Python, Bash
- Light / dark themes
- Configurable height, line numbers, readonly mode, and placeholder

## Usage
\`\`\`html
<ui-code-editor
  [(value)]="code"
  language="typescript"
  height="400px">
</ui-code-editor>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    language: {
      control: 'select',
      options: ['typescript', 'javascript', 'json', 'html', 'css', 'python', 'bash'],
      description: 'Programming language for syntax highlighting.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'typescript' },
        category: 'Configuration',
      },
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Editor colour theme.',
      table: {
        type: { summary: "'light' | 'dark'" },
        defaultValue: { summary: 'light' },
        category: 'Appearance',
      },
    },
    height: {
      control: 'text',
      description: 'CSS height of the editor container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '300px' },
        category: 'Appearance',
      },
    },
    lineNumbers: {
      control: 'boolean',
      description: 'Show line numbers.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Prevent user edits.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text (shown in the textarea fallback).',
      table: {
        type: { summary: 'string' },
        category: 'Configuration',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiCodeEditorComponent>;

export const TypeScript: Story = {
  args: {
    value: typescriptSample,
    language: 'typescript',
    height: '300px',
    lineNumbers: true,
    readonly: false,
    placeholder: 'Write TypeScript…',
  },
};

export const JSON: Story = {
  args: {
    value: jsonSample,
    language: 'json',
    height: '260px',
    lineNumbers: true,
    readonly: false,
    placeholder: 'Paste JSON…',
  },
};

export const CSS: Story = {
  args: {
    value: cssSample,
    language: 'css',
    height: '300px',
    lineNumbers: true,
    readonly: false,
    placeholder: 'Write CSS…',
  },
};

export const HTML: Story = {
  args: {
    value: htmlSample,
    language: 'html',
    height: '260px',
    lineNumbers: true,
    readonly: false,
  },
};

export const ReadOnly: Story = {
  args: {
    value: typescriptSample,
    language: 'typescript',
    height: '300px',
    readonly: true,
    lineNumbers: true,
  },
};

export const Empty: Story = {
  args: {
    value: '',
    language: 'typescript',
    height: '200px',
    placeholder: 'Start coding…',
  },
};

export const Compact: Story = {
  args: {
    value: 'const answer = 42;',
    language: 'javascript',
    height: '120px',
    lineNumbers: false,
  },
};
