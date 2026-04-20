import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

/**
 * Predefined key filter patterns
 */
export type KeyFilterPattern =
  | 'int' // Integers only
  | 'pint' // Positive integers
  | 'num' // Numbers (including decimals)
  | 'pnum' // Positive numbers
  | 'money' // Money format
  | 'hex' // Hexadecimal
  | 'alpha' // Alphabetic only
  | 'alphanum' // Alphanumeric
  | 'email' // Email characters
  | 'phone'; // Phone number characters

/**
 * Predefined regex patterns for key filtering
 */
const PATTERNS: Record<KeyFilterPattern, RegExp> = {
  int: /[\d\-]/,
  pint: /[\d]/,
  num: /[\d\-\.]/,
  pnum: /[\d\.]/,
  money: /[\d\.\,\s]/,
  hex: /[0-9a-fA-F]/,
  alpha: /[a-zA-Z]/,
  alphanum: /[a-zA-Z0-9]/,
  email: /[a-zA-Z0-9@._\-]/,
  phone: /[\d\+\-\(\)\s]/,
};

/**
 * UiKeyFilter Directive
 *
 * Restricts input to specific character patterns.
 * Filters keystrokes and paste events to allow only valid characters.
 *
 * @example
 * ```html
 * <input type="text" uiKeyFilter="int" />
 * <input type="text" uiKeyFilter="alpha" />
 * <input type="text" [uiKeyFilter]="customRegex" />
 * ```
 */
@Directive({
  selector: '[uiKeyFilter]',
  standalone: true,
})
export class UiKeyFilterDirective {
  private readonly el = inject(ElementRef);

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Pattern to filter - can be a preset name or custom RegExp */
  readonly uiKeyFilter = input.required<KeyFilterPattern | RegExp>();

  /** Whether to block invalid input (default: true) */
  readonly blockInput = input<boolean>(true);

  /** Whether to validate on paste (default: true) */
  readonly validateOnPaste = input<boolean>(true);

  // =========================================================================
  // HOST LISTENERS
  // =========================================================================

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (!this.blockInput()) return;

    // Allow control keys
    if (this.isControlKey(event)) return;

    const pattern = this.getPattern();
    if (!pattern) return;

    const char = event.key;

    // Test if character matches pattern
    if (!pattern.test(char)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    if (!this.validateOnPaste() || !this.blockInput()) return;

    const pattern = this.getPattern();
    if (!pattern) return;

    const clipboardData = event.clipboardData?.getData('text') || '';

    // Check each character in pasted text
    for (const char of clipboardData) {
      if (!pattern.test(char)) {
        event.preventDefault();
        // Optionally, filter and insert only valid characters
        this.insertFilteredText(clipboardData, pattern);
        return;
      }
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    // Additional validation after input (for mobile/autofill)
    if (!this.blockInput()) return;

    const pattern = this.getPattern();
    if (!pattern) return;

    const input = event.target as HTMLInputElement;
    const value = input.value;
    let filteredValue = '';

    for (const char of value) {
      if (pattern.test(char)) {
        filteredValue += char;
      }
    }

    if (filteredValue !== value) {
      input.value = filteredValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  // =========================================================================
  // PRIVATE METHODS
  // =========================================================================

  private getPattern(): RegExp | null {
    const filter = this.uiKeyFilter();

    if (filter instanceof RegExp) {
      return filter;
    }

    return PATTERNS[filter] || null;
  }

  private isControlKey(event: KeyboardEvent): boolean {
    // Allow navigation and control keys
    return (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ].includes(event.key)
    );
  }

  private insertFilteredText(text: string, pattern: RegExp): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let filteredText = '';

    for (const char of text) {
      if (pattern.test(char)) {
        filteredText += char;
      }
    }

    if (filteredText) {
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const currentValue = input.value;

      input.value = currentValue.substring(0, start) + filteredText + currentValue.substring(end);
      input.setSelectionRange(start + filteredText.length, start + filteredText.length);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
