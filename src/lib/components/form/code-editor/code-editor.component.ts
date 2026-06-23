import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Minimal structural type for a CodeMirror EditorView instance.
 * Defined inline so the component compiles even when \`@codemirror/view\` is not installed.
 */
interface EditorView {
  destroy(): void;
}

/**
 * UiCodeEditorComponent
 *
 * A code editor component that lazy-loads CodeMirror 6 and falls back to a
 * plain `<textarea>` when CodeMirror is unavailable (e.g. in SSR or when the
 * packages are not installed).
 *
 * @example
 * ```html
 * <ui-code-editor [(value)]="code" language="typescript"></ui-code-editor>
 * ```
 */
@Component({
  selector: 'ui-code-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [style.height]="height()" class="relative border border-border rounded-md overflow-hidden">
      <div #editorContainer class="h-full w-full"></div>
      @if (!cmLoaded()) {
        <textarea
          [value]="value()"
          (input)="onFallbackInput($event)"
          [readOnly]="readonly()"
          [placeholder]="placeholder()"
          class="absolute inset-0 w-full h-full p-3 font-mono text-sm bg-card text-foreground outline-none resize-none">
        </textarea>
      }
    </div>
  `,
})
export class UiCodeEditorComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly editorContainer = viewChild<ElementRef>('editorContainer');

  // =========================================================================
  // INPUTS / MODEL
  // =========================================================================

  /** Two-way bound code value */
  value = model<string>('');

  /** Programming language for syntax highlighting */
  language = input<'typescript' | 'javascript' | 'json' | 'html' | 'css' | 'python' | 'bash'>(
    'typescript'
  );

  /** Editor colour theme */
  theme = input<'light' | 'dark'>('light');

  /** Prevents user edits when true */
  readonly = input<boolean>(false);

  /** Show line numbers */
  lineNumbers = input<boolean>(true);

  /** CSS height of the editor container */
  height = input<string>('300px');

  /** Placeholder text shown in the fallback textarea */
  placeholder = input<string>('');

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on every document change */
  readonly codeChange = output<string>();

  // =========================================================================
  // STATE
  // =========================================================================

  /** True once CodeMirror has been initialised successfully */
  cmLoaded = signal(false);

  private editorView: EditorView | null = null;

  // =========================================================================
  // LIFECYCLE
  // =========================================================================

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        void this.initCodeMirror();
      }
    });
  }

  ngOnDestroy(): void {
    this.editorView?.destroy();
  }

  // =========================================================================
  // PRIVATE – CODEMIRROR BOOTSTRAP
  // =========================================================================

  private async initCodeMirror(): Promise<void> {
    try {
      // Dynamic imports so the bundle is not broken when the packages are absent
      const { EditorView, basicSetup } = await import('@codemirror/basic-setup' as any);
      const { EditorState } = await import('@codemirror/state' as any);
      const langExt = await this.loadLanguage();
      const container = this.editorContainer()?.nativeElement;
      if (!container) return;

      this.editorView = new EditorView({
        state: EditorState.create({
          doc: this.value(),
          extensions: [
            basicSetup,
            langExt,
            EditorView.updateListener.of((update: any) => {
              if (update.docChanged) {
                const v: string = update.state.doc.toString();
                this.value.set(v);
                this.codeChange.emit(v);
              }
            }),
            EditorView.editable.of(!this.readonly()),
          ],
        }),
        parent: container,
      });

      this.cmLoaded.set(true);
    } catch {
      // Falls back to textarea — cmLoaded stays false
    }
  }

  private async loadLanguage(): Promise<any> {
    switch (this.language()) {
      case 'javascript':
      case 'typescript': {
        const { javascript } = await import('@codemirror/lang-javascript' as any);
        return javascript({ typescript: this.language() === 'typescript' });
      }
      case 'json': {
        const { json } = await import('@codemirror/lang-json' as any);
        return json();
      }
      case 'html': {
        const { html } = await import('@codemirror/lang-html' as any);
        return html();
      }
      case 'css': {
        const { css } = await import('@codemirror/lang-css' as any);
        return css();
      }
      case 'python': {
        const { python } = await import('@codemirror/lang-python' as any);
        return python();
      }
      default:
        return [];
    }
  }

  // =========================================================================
  // HANDLERS
  // =========================================================================

  onFallbackInput(e: Event): void {
    const v = (e.target as HTMLTextAreaElement).value;
    this.value.set(v);
    this.codeChange.emit(v);
  }
}
