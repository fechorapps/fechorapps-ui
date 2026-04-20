import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { UiFileUploadComponent } from './file-upload.component';

const meta: Meta<UiFileUploadComponent> = {
  title: 'File/FileUpload',
  component: UiFileUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [UiFileUploadComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['basic', 'advanced'],
      description: 'Upload mode',
      table: { category: 'Mode' },
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple files',
      table: { category: 'Behavior' },
    },
    accept: {
      control: { type: 'text' },
      description: 'Accepted file types',
      table: { category: 'Validation' },
    },
    maxFileSize: {
      control: { type: 'number' },
      description: 'Max file size in bytes',
      table: { category: 'Validation' },
    },
    maxFiles: {
      control: { type: 'number' },
      description: 'Max number of files',
      table: { category: 'Validation' },
    },
    auto: {
      control: { type: 'boolean' },
      description: 'Auto upload on select',
      table: { category: 'Behavior' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: { category: 'State' },
    },
  },
};

export default meta;
type Story = StoryObj<UiFileUploadComponent>;

export const Default: Story = {
  args: {
    mode: 'advanced',
    multiple: true,
  },
};

export const BasicMode: Story = {
  args: {
    mode: 'basic',
    multiple: false,
    chooseLabel: 'Select File',
  },
};

export const BasicMultiple: Story = {
  args: {
    mode: 'basic',
    multiple: true,
    chooseLabel: 'Select Files',
  },
};

export const SingleFile: Story = {
  args: {
    mode: 'advanced',
    multiple: false,
  },
};

export const ImagesOnly: Story = {
  args: {
    mode: 'advanced',
    multiple: true,
    accept: 'image/*',
  },
};

export const DocumentsOnly: Story = {
  args: {
    mode: 'advanced',
    multiple: true,
    accept: '.pdf,.doc,.docx,.xls,.xlsx',
  },
};

export const WithMaxFileSize: Story = {
  args: {
    mode: 'advanced',
    multiple: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
};

export const WithMaxFiles: Story = {
  args: {
    mode: 'advanced',
    multiple: true,
    maxFiles: 3,
  },
};

export const AutoUpload: Story = {
  render: () => ({
    props: {
      onUpload(event: { files: unknown[] }) {
        console.log('Auto uploading:', event.files);
      },
    },
    template: `
      <ui-file-upload
        [multiple]="true"
        [auto]="true"
        (onUpload)="onUpload($event)"
      />
    `,
  }),
};

export const Disabled: Story = {
  args: {
    mode: 'advanced',
    disabled: true,
  },
};

export const CustomLabels: Story = {
  args: {
    mode: 'advanced',
    multiple: true,
    chooseLabel: 'Browse',
    uploadLabel: 'Send',
    cancelLabel: 'Clear All',
  },
};

export const WithCallbacks: Story = {
  render: () => ({
    props: {
      logs: [] as string[],
      onSelect(event: { files: File[] }) {
        this['logs'].push(`Selected: ${event.files.map((f) => f.name).join(', ')}`);
      },
      onRemove(event: { file: { name: string } }) {
        this['logs'].push(`Removed: ${event.file.name}`);
      },
      onUpload(event: { files: { name: string }[] }) {
        this['logs'].push(`Upload started for ${event.files.length} file(s)`);
      },
      onClear() {
        this['logs'].push('All files cleared');
      },
      onError(event: { file: File; error: string }) {
        this['logs'].push(`Error: ${event.file.name} - ${event.error}`);
      },
    },
    template: `
      <div class="space-y-4">
        <ui-file-upload
          [multiple]="true"
          [maxFileSize]="1048576"
          (onSelect)="onSelect($event)"
          (onRemove)="onRemove($event)"
          (onUpload)="onUpload($event)"
          (onClear)="onClear()"
          (onError)="onError($event)"
        />

        @if (logs.length > 0) {
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 class="font-medium mb-2">Event Log:</h4>
            <ul class="text-sm space-y-1">
              @for (log of logs; track $index) {
                <li class="text-gray-600 dark:text-gray-400">{{ log }}</li>
              }
            </ul>
          </div>
        }
      </div>
    `,
  }),
};

export const ImagePreview: Story = {
  render: () => ({
    template: `
      <div class="max-w-lg">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Select image files to see previews
        </p>
        <ui-file-upload
          [multiple]="true"
          accept="image/*"
        />
      </div>
    `,
  }),
};

export const CustomEmptyState: Story = {
  render: () => ({
    template: `
      <ui-file-upload [multiple]="true">
        <ng-template #empty>
          <div class="text-center py-8 text-gray-500">
            <p class="text-lg mb-2">No files selected yet</p>
            <p class="text-sm">Drop your files above or click to browse</p>
          </div>
        </ng-template>
      </ui-file-upload>
    `,
  }),
};

export const ProfilePhoto: Story = {
  render: () => ({
    template: `
      <div class="max-w-sm">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profile Photo
        </label>
        <ui-file-upload
          mode="advanced"
          [multiple]="false"
          accept="image/*"
          [maxFileSize]="2097152"
          [showUploadButton]="false"
          [showCancelButton]="false"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Max file size: 2MB. Supported formats: JPG, PNG, GIF
        </p>
      </div>
    `,
  }),
};

export const DocumentUpload: Story = {
  render: () => ({
    template: `
      <div class="max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Upload Documents
        </h3>
        <ui-file-upload
          [multiple]="true"
          [maxFiles]="5"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          [maxFileSize]="10485760"
          uploadLabel="Submit Documents"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Upload up to 5 documents (PDF, Word, Excel, PowerPoint). Max 10MB each.
        </p>
      </div>
    `,
  }),
};

export const MinimalStyle: Story = {
  render: () => ({
    template: `
      <ui-file-upload
        mode="basic"
        [multiple]="true"
        chooseLabel="Add Files"
      />
    `,
  }),
};

export const WithValidation: Story = {
  render: () => ({
    props: {
      errors: [] as string[],
      onError(event: { file: File; error: string }) {
        this['errors'].push(`${event.file.name}: ${event.error}`);
      },
    },
    template: `
      <div class="space-y-4">
        <ui-file-upload
          [multiple]="true"
          accept="image/*"
          [maxFileSize]="1048576"
          invalidFileSizeMessage="File is too large (max 1MB)"
          invalidFileTypeMessage="Only images are allowed"
          (onError)="onError($event)"
        />

        @if (errors.length > 0) {
          <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h4 class="font-medium text-red-700 dark:text-red-400 mb-2">Validation Errors:</h4>
            <ul class="text-sm text-red-600 dark:text-red-400 space-y-1">
              @for (error of errors; track $index) {
                <li>{{ error }}</li>
              }
            </ul>
          </div>
        }
      </div>
    `,
  }),
};
