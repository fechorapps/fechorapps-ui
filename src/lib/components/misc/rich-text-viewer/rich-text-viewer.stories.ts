import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UiRichTextViewerComponent } from './rich-text-viewer.component';

const meta: Meta<UiRichTextViewerComponent> = {
  title: 'Misc/RichTextViewer',
  component: UiRichTextViewerComponent,
  decorators: [moduleMetadata({ imports: [UiRichTextViewerComponent] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiRichTextViewerComponent>;

const sampleMarkdown = `# Hello World

This is a **rich text viewer** component that renders _markdown_ content.

## Features

- Renders markdown to HTML
- Sanitizes HTML for security
- Supports custom styles

### Code Example

\`\`\`typescript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`

> This is a blockquote with important information.

---

[Click here](https://example.com) to learn more.
`;

export const DefaultMarkdown: Story = {
  args: {
    content: sampleMarkdown,
    format: 'markdown',
  },
};

export const Html: Story = {
  args: {
    content: '<h1>Hello</h1><p>This is <strong>HTML</strong> content with a <a href="#">link</a>.</p><ul><li>Item 1</li><li>Item 2</li></ul>',
    format: 'html',
  },
};

export const EmptyContent: Story = {
  args: {
    content: '',
    format: 'markdown',
  },
};
