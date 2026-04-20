import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import {
  LucideAngularModule,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  Undo,
  Redo,
} from 'lucide-angular';

import { UiToolbarComponent } from './toolbar.component';

const meta: Meta<UiToolbarComponent> = {
  title: 'Panel/Toolbar',
  component: UiToolbarComponent,
  decorators: [
    moduleMetadata({
      imports: [UiToolbarComponent, LucideAngularModule],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiToolbarComponent>;

export const Basic: Story = {
  render: () => ({
    props: {
      boldIcon: Bold,
      italicIcon: Italic,
      underlineIcon: Underline,
      saveIcon: Save,
    },
    template: `
      <ui-toolbar>
        <div toolbarStart class="flex gap-1">
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="boldIcon" [size]="18" />
          </button>
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="italicIcon" [size]="18" />
          </button>
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="underlineIcon" [size]="18" />
          </button>
        </div>

        <div toolbarEnd>
          <button class="flex items-center gap-2 px-3 py-1.5 bg-primary-500 text-white rounded hover:bg-primary-600">
            <lucide-icon [img]="saveIcon" [size]="16" />
            Save
          </button>
        </div>
      </ui-toolbar>
    `,
  }),
};

export const TextEditor: Story = {
  render: () => ({
    props: {
      boldIcon: Bold,
      italicIcon: Italic,
      underlineIcon: Underline,
      alignLeftIcon: AlignLeft,
      alignCenterIcon: AlignCenter,
      alignRightIcon: AlignRight,
      undoIcon: Undo,
      redoIcon: Redo,
    },
    template: `
      <ui-toolbar>
        <div toolbarStart class="flex gap-1">
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="undoIcon" [size]="18" />
          </button>
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="redoIcon" [size]="18" />
          </button>
          <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="boldIcon" [size]="18" />
          </button>
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="italicIcon" [size]="18" />
          </button>
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="underlineIcon" [size]="18" />
          </button>
        </div>

        <div toolbarCenter class="flex gap-1">
          <button class="p-2 rounded bg-gray-200 dark:bg-gray-700">
            <lucide-icon [img]="alignLeftIcon" [size]="18" />
          </button>
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="alignCenterIcon" [size]="18" />
          </button>
          <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <lucide-icon [img]="alignRightIcon" [size]="18" />
          </button>
        </div>

        <div toolbarEnd>
          <select class="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm">
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Courier New</option>
          </select>
        </div>
      </ui-toolbar>
    `,
  }),
};

export const WithSearch: Story = {
  render: () => ({
    template: `
      <ui-toolbar>
        <div toolbarStart>
          <span class="font-semibold">My Application</span>
        </div>

        <div toolbarCenter>
          <input
            type="search"
            placeholder="Search..."
            class="w-64 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
          />
        </div>

        <div toolbarEnd class="flex items-center gap-2">
          <button class="px-3 py-1.5 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            Help
          </button>
          <button class="px-3 py-1.5 bg-primary-500 text-white text-sm rounded hover:bg-primary-600">
            Sign In
          </button>
        </div>
      </ui-toolbar>
    `,
  }),
};
