import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiCodeBlockComponent } from './code-block.component';

const meta: Meta<UiCodeBlockComponent> = {
  title: 'Misc/CodeBlock',
  component: UiCodeBlockComponent,
  decorators: [
    moduleMetadata({
      imports: [UiCodeBlockComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: { type: 'select' },
      options: ['typescript', 'javascript', 'css', 'html', 'bash', 'json'],
      description: 'Programming language for syntax highlighting',
      table: { category: 'Content' },
    },
    showCopyButton: {
      control: { type: 'boolean' },
      description: 'Show copy to clipboard button',
      table: { category: 'Behavior' },
    },
    showLineNumbers: {
      control: { type: 'boolean' },
      description: 'Show line numbers',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;
type Story = StoryObj<UiCodeBlockComponent>;

export const TypeScript: Story = {
  args: {
    language: 'typescript',
    showCopyButton: true,
    showLineNumbers: true,
    code: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <button (click)="increment()">Count: {{ count() }}</button>
    <p>Double: {{ doubled() }}</p>
  \`,
})
export class CounterComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update(n => n + 1);
  }
}`,
  },
};

export const JavaScript: Story = {
  args: {
    language: 'javascript',
    showCopyButton: true,
    showLineNumbers: true,
    code: `async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  const user = await response.json();
  return user;
}

fetchUser(42)
  .then(user => console.log(user))
  .catch(err => console.error(err));`,
  },
};

export const JSON: Story = {
  args: {
    language: 'json',
    showCopyButton: true,
    showLineNumbers: true,
    filename: 'package.json',
    code: `{
  "name": "@fechorapps/ui",
  "version": "1.2.1",
  "description": "Angular UI component library",
  "peerDependencies": {
    "@angular/core": ">=17.0.0",
    "tailwindcss": ">=3.0.0"
  }
}`,
  },
};
