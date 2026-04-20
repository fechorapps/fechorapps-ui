import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  ElementRef,
  viewChild,
  contentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Upload,
  X,
  File,
  FileImage,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileVideo,
  FileAudio,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-angular';

export type FileUploadMode = 'basic' | 'advanced';

export interface UploadFile {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  previewUrl?: string;
}

export interface FileSelectEvent {
  files: File[];
  currentFiles: UploadFile[];
}

export interface FileRemoveEvent {
  file: UploadFile;
  files: UploadFile[];
}

export interface FileUploadEvent {
  files: UploadFile[];
}

export interface FileErrorEvent {
  file: File;
  error: string;
}

@Component({
  selector: 'ui-file-upload',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFileUploadComponent {
  // Icons
  readonly uploadIcon = Upload;
  readonly removeIcon = X;
  readonly fileIcon = File;
  readonly imageIcon = FileImage;
  readonly textIcon = FileText;
  readonly spreadsheetIcon = FileSpreadsheet;
  readonly archiveIcon = FileArchive;
  readonly videoIcon = FileVideo;
  readonly audioIcon = FileAudio;
  readonly errorIcon = AlertCircle;
  readonly successIcon = CheckCircle;
  readonly loadingIcon = Loader2;

  // Inputs
  readonly mode = input<FileUploadMode>('advanced');
  readonly name = input<string>('files');
  readonly multiple = input<boolean>(false);
  readonly accept = input<string>('');
  readonly maxFileSize = input<number>(0); // 0 = no limit
  readonly maxFiles = input<number>(0); // 0 = no limit
  readonly auto = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly showUploadButton = input<boolean>(true);
  readonly showCancelButton = input<boolean>(true);
  readonly chooseLabel = input<string>('Choose');
  readonly uploadLabel = input<string>('Upload');
  readonly cancelLabel = input<string>('Cancel');
  readonly invalidFileSizeMessage = input<string>('File size exceeds the limit');
  readonly invalidFileTypeMessage = input<string>('Invalid file type');
  readonly styleClass = input<string>('');

  // Outputs
  readonly onSelect = output<FileSelectEvent>();
  readonly onRemove = output<FileRemoveEvent>();
  readonly onUpload = output<FileUploadEvent>();
  readonly onError = output<FileErrorEvent>();
  readonly onClear = output<void>();

  // View children
  readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  // Content children
  readonly contentTemplate = contentChild<TemplateRef<unknown>>('content');
  readonly fileTemplate = contentChild<TemplateRef<unknown>>('file');
  readonly emptyTemplate = contentChild<TemplateRef<unknown>>('empty');

  // State
  readonly files = signal<UploadFile[]>([]);
  readonly isDragOver = signal<boolean>(false);

  // Computed
  readonly hasFiles = computed(() => this.files().length > 0);

  readonly totalSize = computed(() => {
    return this.files().reduce((acc, f) => acc + f.size, 0);
  });

  readonly uploadProgress = computed(() => {
    const allFiles = this.files();
    if (allFiles.length === 0) return 0;
    const total = allFiles.reduce((acc, f) => acc + f.progress, 0);
    return Math.round(total / allFiles.length);
  });

  readonly isUploading = computed(() => {
    return this.files().some((f) => f.status === 'uploading');
  });

  readonly canUpload = computed(() => {
    return this.files().some((f) => f.status === 'pending') && !this.isUploading();
  });

  readonly dropzoneClasses = computed(() => {
    const base = [
      'border-2 border-dashed rounded-lg p-6 transition-colors',
      'flex flex-col items-center justify-center gap-4',
      'cursor-pointer',
    ];

    if (this.disabled()) {
      base.push(
        'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed opacity-60'
      );
    } else if (this.isDragOver()) {
      base.push('border-primary-500 bg-primary-50 dark:bg-primary-900/20');
    } else {
      base.push(
        'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
      );
    }

    return base.join(' ');
  });

  private generateId(): string {
    return `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  openFileDialog(): void {
    if (this.disabled()) return;
    this.fileInput()?.nativeElement.click();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
    // Reset input
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled()) {
      this.isDragOver.set(true);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    if (this.disabled()) return;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  private handleFiles(newFiles: File[]): void {
    const maxFiles = this.maxFiles();
    const currentCount = this.files().length;

    let filesToAdd = newFiles;

    // Check max files limit
    if (maxFiles > 0 && currentCount + newFiles.length > maxFiles) {
      filesToAdd = newFiles.slice(0, maxFiles - currentCount);
    }

    // If not multiple, only take the first file
    if (!this.multiple()) {
      filesToAdd = filesToAdd.slice(0, 1);
      // Clear existing files
      this.files.set([]);
    }

    const validFiles: UploadFile[] = [];

    for (const file of filesToAdd) {
      // Validate file type
      if (this.accept() && !this.isValidType(file)) {
        this.onError.emit({ file, error: this.invalidFileTypeMessage() });
        continue;
      }

      // Validate file size
      if (this.maxFileSize() > 0 && file.size > this.maxFileSize()) {
        this.onError.emit({ file, error: this.invalidFileSizeMessage() });
        continue;
      }

      const uploadFile: UploadFile = {
        file,
        id: this.generateId(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending',
        progress: 0,
      };

      // Generate preview for images
      if (file.type.startsWith('image/')) {
        uploadFile.previewUrl = URL.createObjectURL(file);
      }

      validFiles.push(uploadFile);
    }

    if (validFiles.length > 0) {
      this.files.update((current) => [...current, ...validFiles]);
      this.onSelect.emit({
        files: validFiles.map((f) => f.file),
        currentFiles: this.files(),
      });

      if (this.auto()) {
        this.upload();
      }
    }
  }

  private isValidType(file: File): boolean {
    const accept = this.accept();
    if (!accept) return true;

    const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
    const fileType = file.type.toLowerCase();
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    return acceptedTypes.some((type) => {
      if (type.startsWith('.')) {
        return fileExtension === type;
      }
      if (type.endsWith('/*')) {
        const baseType = type.slice(0, -2);
        return fileType.startsWith(baseType);
      }
      return fileType === type;
    });
  }

  removeFile(file: UploadFile): void {
    // Revoke preview URL if exists
    if (file.previewUrl) {
      URL.revokeObjectURL(file.previewUrl);
    }

    this.files.update((current) => current.filter((f) => f.id !== file.id));
    this.onRemove.emit({ file, files: this.files() });
  }

  clear(): void {
    // Revoke all preview URLs
    this.files().forEach((f) => {
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
      }
    });

    this.files.set([]);
    this.onClear.emit();
  }

  upload(): void {
    const pendingFiles = this.files().filter((f) => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    // Mark files as uploading
    this.files.update((current) =>
      current.map((f) => (f.status === 'pending' ? { ...f, status: 'uploading' as const } : f))
    );

    // Emit upload event - actual upload logic should be handled by parent
    this.onUpload.emit({ files: this.files() });
  }

  // Helper method for parent components to update file status
  updateFileStatus(
    fileId: string,
    status: UploadFile['status'],
    progress?: number,
    error?: string
  ): void {
    this.files.update((current) =>
      current.map((f) =>
        f.id === fileId
          ? {
              ...f,
              status,
              progress: progress ?? f.progress,
              error: error ?? f.error,
            }
          : f
      )
    );
  }

  getFileIcon(file: UploadFile) {
    const type = file.type.toLowerCase();

    if (type.startsWith('image/')) return this.imageIcon;
    if (type.startsWith('video/')) return this.videoIcon;
    if (type.startsWith('audio/')) return this.audioIcon;
    if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv')) {
      return this.spreadsheetIcon;
    }
    if (
      type.includes('zip') ||
      type.includes('rar') ||
      type.includes('tar') ||
      type.includes('archive')
    ) {
      return this.archiveIcon;
    }
    if (type.includes('text') || type.includes('document') || type.includes('pdf')) {
      return this.textIcon;
    }

    return this.fileIcon;
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  trackByFile(_index: number, file: UploadFile): string {
    return file.id;
  }
}
