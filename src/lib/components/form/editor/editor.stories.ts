import type { Meta, StoryObj } from '@storybook/angular';

import { UiEditorComponent } from './editor.component';

const sampleContent = `
<h1>Welcome to the Editor</h1>
<p>This is a <strong>rich text editor</strong> with various formatting options.</p>
<p>You can:</p>
<ul>
  <li>Make text <strong>bold</strong>, <em>italic</em>, or <u>underlined</u></li>
  <li>Create headings</li>
  <li>Align text</li>
  <li>Create lists</li>
</ul>
<blockquote>This is a blockquote for highlighting important text.</blockquote>
<p>Try it out!</p>
`;

const meta: Meta<UiEditorComponent> = {
  title: 'Form/Editor',
  component: UiEditorComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Editor** is a rich text editor component for creating formatted content.

## API Reference

Based on [PrimeNG Editor](https://primeng.org/editor)

### Features
- Text formatting (bold, italic, underline, strikethrough)
- Headings (H1, H2)
- Text alignment
- Lists (bullet and numbered)
- Links and blockquotes
- Code blocks
- Keyboard shortcuts

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| Ctrl+B | Bold |
| Ctrl+I | Italic |
| Ctrl+U | Underline |

### Toolbar Groups
You can customize which toolbar groups are shown:
- \`formatting\`: Bold, Italic, Underline, Strikethrough
- \`heading\`: H1, H2
- \`alignment\`: Left, Center, Right, Justify
- \`list\`: Bullet list, Numbered list
- \`link\`: Link, Blockquote
- \`code\`: Code block
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Enter content...' },
        category: 'Configuration',
      },
    },
    label: {
      control: 'text',
      description: 'Label text.',
      table: {
        type: { summary: 'string' },
        category: 'Configuration',
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the editor.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '200px' },
        category: 'Appearance',
      },
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height (scrolls when exceeded).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '400px' },
        category: 'Appearance',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
};

export default meta;
type Story = StoryObj<UiEditorComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Start typing...',
    label: 'Content',
  },
};

export const WithContent: Story = {
  args: {
    label: 'Article Content',
    value: sampleContent,
  },
};

export const MinimalToolbar: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Write your comment...',
    toolbarGroups: ['formatting'],
    minHeight: '100px',
  },
};

export const FullToolbar: Story = {
  args: {
    label: 'Document',
    placeholder: 'Write your document...',
    toolbarGroups: ['formatting', 'heading', 'alignment', 'list', 'link', 'code'],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Content',
    value: '<p>This editor is disabled.</p>',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Preview',
    value: sampleContent,
    readonly: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Content',
    placeholder: 'Enter content...',
    invalid: true,
    helpText: 'Content is required',
  },
};

export const CustomHeight: Story = {
  args: {
    label: 'Short Note',
    placeholder: 'Write a short note...',
    minHeight: '100px',
    maxHeight: '150px',
    toolbarGroups: ['formatting'],
  },
};

export const BlogPostForm: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Create Blog Post</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
              <input
                type="text"
                placeholder="Enter post title"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <ui-editor
              label="Content"
              placeholder="Write your blog post..."
              [toolbarGroups]="['formatting', 'heading', 'alignment', 'list', 'link', 'code']"
              minHeight="300px"
            ></ui-editor>
            <div class="flex gap-2">
              <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Save Draft
              </button>
              <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const CommentForm: Story = {
  render: () => ({
    template: `
      <div class="max-w-lg">
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <span class="text-primary-600 dark:text-primary-400 font-medium">JD</span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p class="text-xs text-gray-500">Commenting as yourself</p>
            </div>
          </div>
          <ui-editor
            placeholder="Write your comment..."
            [toolbarGroups]="['formatting']"
            minHeight="100px"
            maxHeight="200px"
          ></ui-editor>
          <div class="flex justify-end mt-3">
            <button class="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600">
              Post Comment
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};

export const EmailComposer: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compose Email</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">To</label>
              <input
                type="email"
                placeholder="recipient@example.com"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
            <ui-editor
              label="Message"
              placeholder="Compose your message..."
              [toolbarGroups]="['formatting', 'alignment', 'list', 'link']"
              minHeight="200px"
            ></ui-editor>
            <div class="flex justify-between">
              <button class="px-4 py-2 text-gray-600 hover:text-gray-900">
                Discard
              </button>
              <button class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
