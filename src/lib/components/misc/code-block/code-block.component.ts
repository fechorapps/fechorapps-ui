import { Component, ChangeDetectionStrategy, input, signal, effect, viewChild, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Copy, Check, FileCode } from 'lucide-angular';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);

@Component({
  selector: 'ui-code-block',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './code-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCodeBlockComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly codeEl = viewChild<ElementRef<HTMLElement>>('codeEl');

  readonly code = input<string>('');
  readonly language = input<string>('typescript');
  readonly showCopyButton = input<boolean>(true);
  readonly showLineNumbers = input<boolean>(true);
  readonly filename = input<string | undefined>(undefined);

  readonly copied = signal<boolean>(false);
  readonly copyIcon = Copy;
  readonly checkIcon = Check;
  readonly fileCodeIcon = FileCode;

  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const code = this.code();
      const lang = this.language();
      if (isPlatformBrowser(this.platformId)) {
        const el = this.codeEl()?.nativeElement;
        if (el) {
          try {
            const result = hljs.highlight(code, { language: lang });
            el.innerHTML = result.value;
          } catch {
            el.textContent = code;
          }
        }
      }
    });
  }

  copy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      if (this.copyTimer) clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
