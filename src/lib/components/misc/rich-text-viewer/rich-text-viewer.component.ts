import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  inject,
} from '@angular/core';
import { SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'ui-rich-text-viewer',
  standalone: true,
  imports: [],
  templateUrl: './rich-text-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRichTextViewerComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly content = input<string>('');
  readonly format = input<'markdown' | 'html'>('markdown');
  readonly styleClass = input<string>('');

  readonly parsedHtml = computed((): SafeHtml => {
    const c = this.content();
    if (!c) return '';
    const raw = this.format() === 'markdown'
      ? (marked.parse(c, { async: false }) as string)
      : c;
    // Always sanitize through Angular's built-in HTML sanitizer before binding.
    // Never bypass on user-supplied content.
    return this.sanitizer.sanitize(SecurityContext.HTML, raw) ?? '';
  });

  readonly containerClasses = computed(() => {
    // Use custom Tailwind arbitrary properties since @tailwindcss/typography
    // may not be available. These provide basic markdown styling.
    const base =
      'text-foreground text-sm leading-relaxed ' +
      '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-2 ' +
      '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-4 ' +
      '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 ' +
      '[&_p]:mb-3 ' +
      '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 ' +
      '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 ' +
      '[&_li]:mb-1 ' +
      '[&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono ' +
      '[&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-3 ' +
      '[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:mb-3 ' +
      '[&_strong]:font-semibold ' +
      '[&_a]:text-primary [&_a]:underline ' +
      '[&_hr]:border-border [&_hr]:my-4';
    return this.styleClass() ? `${base} ${this.styleClass()}` : base;
  });
}
