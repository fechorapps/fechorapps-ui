import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  Link,
  List,
  ListOrdered,
  LucideAngularModule,
  Quote,
  Strikethrough,
  Underline,
} from 'lucide-angular';

/**
 * Editor toolbar button groups
 */
export type EditorToolbarGroup = 'formatting' | 'heading' | 'alignment' | 'list' | 'link' | 'code';

/**
 * UiEditor Component
 *
 * A rich text editor with formatting toolbar.
 *
 * @example
 * ```html
 * <ui-editor [(ngModel)]="content" placeholder="Enter text..."></ui-editor>
 * ```
 */
@Component({
  selector: 'ui-editor',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiEditorComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiEditorComponent implements ControlValueAccessor, AfterViewInit {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly boldIcon = Bold;
  protected readonly italicIcon = Italic;
  protected readonly underlineIcon = Underline;
  protected readonly strikethroughIcon = Strikethrough;
  protected readonly heading1Icon = Heading1;
  protected readonly heading2Icon = Heading2;
  protected readonly alignLeftIcon = AlignLeft;
  protected readonly alignCenterIcon = AlignCenter;
  protected readonly alignRightIcon = AlignRight;
  protected readonly alignJustifyIcon = AlignJustify;
  protected readonly listIcon = List;
  protected readonly listOrderedIcon = ListOrdered;
  protected readonly linkIcon = Link;
  protected readonly quoteIcon = Quote;
  protected readonly codeIcon = Code;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly editorRef = viewChild<ElementRef>('editorEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Placeholder text */
  readonly placeholder = input<string>('Enter content...');

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether editor is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether editor is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Whether editor is readonly */
  readonly readonly = input<boolean>(false);

  /** Toolbar groups to show */
  readonly toolbarGroups = input<EditorToolbarGroup[]>([
    'formatting',
    'heading',
    'alignment',
    'list',
    'link',
    'code',
  ]);

  /** Min height */
  readonly minHeight = input<string>('200px');

  /** Max height (for scrolling) */
  readonly maxHeight = input<string>('400px');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** HTML content */
  readonly value = model<string>('');

  /** Focused state */
  readonly focused = signal<boolean>(false);

  /** Active formats */
  readonly activeFormats = signal<Set<string>>(new Set());

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when content changes */
  readonly onTextChange = output<string>();

  /** Emitted on focus */
  readonly onFocus = output<FocusEvent>();

  /** Emitted on blur */
  readonly onBlur = output<FocusEvent>();

  /** Emitted on selection change */
  readonly onSelectionChange = output<void>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
    const editor = this.editorRef()?.nativeElement;
    if (editor && editor.innerHTML !== value) {
      editor.innerHTML = value || '';
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // LIFECYCLE
  // =========================================================================

  ngAfterViewInit(): void {
    const editor = this.editorRef()?.nativeElement;
    if (editor) {
      editor.innerHTML = this.value() || '';
    }
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly showFormatting = computed(() => this.toolbarGroups().includes('formatting'));
  readonly showHeading = computed(() => this.toolbarGroups().includes('heading'));
  readonly showAlignment = computed(() => this.toolbarGroups().includes('alignment'));
  readonly showList = computed(() => this.toolbarGroups().includes('list'));
  readonly showLink = computed(() => this.toolbarGroups().includes('link'));
  readonly showCode = computed(() => this.toolbarGroups().includes('code'));

  readonly wrapperClasses = computed(() => {
    const invalid = this.invalid();
    const disabled = this.disabled();
    const focused = this.focused();

    const classes = ['border', 'rounded-lg', 'overflow-hidden', 'transition-all', 'duration-200'];

    if (disabled) {
      classes.push(
        'opacity-50',
        'bg-gray-50',
        'dark:bg-gray-800',
        'border-gray-300',
        'dark:border-gray-600'
      );
    } else if (invalid) {
      classes.push('border-red-500', 'bg-white', 'dark:bg-gray-900');
      if (focused) {
        classes.push('ring-2', 'ring-red-500/20');
      }
    } else if (focused) {
      classes.push(
        'border-primary-500',
        'ring-2',
        'ring-primary-500/20',
        'bg-white',
        'dark:bg-gray-900'
      );
    } else {
      classes.push('border-gray-300', 'dark:border-gray-600', 'bg-white', 'dark:bg-gray-900');
    }

    return classes.join(' ');
  });

  readonly labelClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['block', 'text-sm', 'font-medium', 'mb-1.5'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
    );
    return baseClasses.join(' ');
  });

  readonly helpTextClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['text-xs', 'mt-1.5'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
    );
    return baseClasses.join(' ');
  });

  readonly editorStyles = computed(() => {
    return {
      'min-height': this.minHeight(),
      'max-height': this.maxHeight(),
    };
  });

  // =========================================================================
  // METHODS - FORMATTING
  // =========================================================================

  execCommand(command: string, value?: string): void {
    if (this.disabled() || this.readonly()) return;

    document.execCommand(command, false, value);
    this.updateContent();
    this.updateActiveFormats();
    this.editorRef()?.nativeElement.focus();
  }

  formatBold(): void {
    this.execCommand('bold');
  }

  formatItalic(): void {
    this.execCommand('italic');
  }

  formatUnderline(): void {
    this.execCommand('underline');
  }

  formatStrikethrough(): void {
    this.execCommand('strikeThrough');
  }

  formatHeading(level: number): void {
    this.execCommand('formatBlock', `h${level}`);
  }

  formatParagraph(): void {
    this.execCommand('formatBlock', 'p');
  }

  alignLeft(): void {
    this.execCommand('justifyLeft');
  }

  alignCenter(): void {
    this.execCommand('justifyCenter');
  }

  alignRight(): void {
    this.execCommand('justifyRight');
  }

  alignJustify(): void {
    this.execCommand('justifyFull');
  }

  insertUnorderedList(): void {
    this.execCommand('insertUnorderedList');
  }

  insertOrderedList(): void {
    this.execCommand('insertOrderedList');
  }

  insertLink(): void {
    const url = prompt('Enter URL:');
    if (url) {
      this.execCommand('createLink', url);
    }
  }

  insertBlockquote(): void {
    this.execCommand('formatBlock', 'blockquote');
  }

  insertCode(): void {
    this.execCommand('formatBlock', 'pre');
  }

  // =========================================================================
  // METHODS - HANDLERS
  // =========================================================================

  handleInput(): void {
    this.updateContent();
  }

  handleFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.onTouchedFn();
    this.onBlur.emit(event);
  }

  handleSelectionChange(): void {
    this.updateActiveFormats();
    this.onSelectionChange.emit();
  }

  handleKeyDown(event: KeyboardEvent): void {
    // Handle keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'b':
          event.preventDefault();
          this.formatBold();
          break;
        case 'i':
          event.preventDefault();
          this.formatItalic();
          break;
        case 'u':
          event.preventDefault();
          this.formatUnderline();
          break;
      }
    }
  }

  private updateContent(): void {
    const editor = this.editorRef()?.nativeElement;
    if (editor) {
      const html = editor.innerHTML;
      this.value.set(html);
      this.onChangeFn(html);
      this.onTextChange.emit(html);
    }
  }

  private updateActiveFormats(): void {
    const formats = new Set<string>();

    if (document.queryCommandState('bold')) formats.add('bold');
    if (document.queryCommandState('italic')) formats.add('italic');
    if (document.queryCommandState('underline')) formats.add('underline');
    if (document.queryCommandState('strikeThrough')) formats.add('strikethrough');
    if (document.queryCommandState('insertUnorderedList')) formats.add('unorderedList');
    if (document.queryCommandState('insertOrderedList')) formats.add('orderedList');
    if (document.queryCommandState('justifyLeft')) formats.add('alignLeft');
    if (document.queryCommandState('justifyCenter')) formats.add('alignCenter');
    if (document.queryCommandState('justifyRight')) formats.add('alignRight');
    if (document.queryCommandState('justifyFull')) formats.add('alignJustify');

    this.activeFormats.set(formats);
  }

  isActive(format: string): boolean {
    return this.activeFormats().has(format);
  }

  getToolbarButtonClasses(format: string): string {
    const active = this.isActive(format);
    const disabled = this.disabled() || this.readonly();

    const classes = ['p-1.5', 'rounded', 'transition-colors'];

    if (disabled) {
      classes.push('opacity-50', 'cursor-not-allowed');
    } else if (active) {
      classes.push(
        'bg-primary-100',
        'dark:bg-primary-900/30',
        'text-primary-600',
        'dark:text-primary-400'
      );
    } else {
      classes.push(
        'text-gray-600',
        'dark:text-gray-400',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-700'
      );
    }

    return classes.join(' ');
  }
}
