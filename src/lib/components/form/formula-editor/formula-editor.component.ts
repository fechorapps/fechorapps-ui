import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';

/**
 * FormulaFunction describes a formula function with its signature and metadata.
 */
export interface FormulaFunction {
  name: string;
  description: string;
  args: string[];
  example: string;
}

/**
 * Suggestion item shown in the autocomplete dropdown.
 */
export interface FormulaSuggestion {
  label: string;
  type: 'function' | 'variable';
  fn: FormulaFunction | null;
}

/**
 * UiFormulaEditorComponent
 *
 * A spreadsheet-style formula input with real-time autocomplete for built-in
 * functions and user-defined variables, inline validation, and a function
 * signature tooltip.
 *
 * @example
 * ```html
 * <ui-formula-editor
 *   [(value)]="formula"
 *   [variables]="['Revenue', 'Cost', 'Units']"
 *   (validChange)="onValidChange($event)"
 * ></ui-formula-editor>
 * ```
 */
@Component({
  selector: 'ui-formula-editor',
  standalone: true,
  imports: [],
  templateUrl: './formula-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class UiFormulaEditorComponent {
  // =========================================================================
  // BUILTIN FUNCTIONS
  // =========================================================================

  private readonly BUILTIN_FUNCTIONS: FormulaFunction[] = [
    { name: 'SUM', description: 'Sum of values', args: ['value1', '...'], example: '=SUM(A1, A2)' },
    { name: 'AVG', description: 'Average of values', args: ['value1', '...'], example: '=AVG(A1:A10)' },
    { name: 'IF', description: 'Conditional', args: ['condition', 'true_val', 'false_val'], example: '=IF(A1>0, "yes", "no")' },
    { name: 'CONCAT', description: 'Concatenate strings', args: ['text1', '...'], example: '=CONCAT(A1, " ", B1)' },
    { name: 'LEN', description: 'String length', args: ['text'], example: '=LEN(A1)' },
    { name: 'UPPER', description: 'Uppercase', args: ['text'], example: '=UPPER(A1)' },
    { name: 'LOWER', description: 'Lowercase', args: ['text'], example: '=LOWER(A1)' },
    { name: 'ROUND', description: 'Round number', args: ['number', 'digits'], example: '=ROUND(3.14159, 2)' },
    { name: 'MIN', description: 'Minimum value', args: ['value1', '...'], example: '=MIN(A1, A2)' },
    { name: 'MAX', description: 'Maximum value', args: ['value1', '...'], example: '=MAX(A1, A2)' },
  ];

  // =========================================================================
  // INPUTS / MODEL
  // =========================================================================

  /** Two-way bound formula string. */
  value = model<string>('');

  /** Additional user-defined functions to include in suggestions. */
  readonly functions = input<FormulaFunction[]>([]);

  /** Variable names to include in suggestions. */
  readonly variables = input<string[]>([]);

  /** Whether to include builtin functions in suggestions. */
  readonly builtins = input<boolean>(true);

  /** Whether the editor is disabled. */
  readonly disabled = input<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted whenever the formula string changes. */
  readonly formulaChange = output<string>();

  /** Emitted whenever the validity state changes. */
  readonly validChange = output<boolean>();

  // =========================================================================
  // STATE
  // =========================================================================

  /** Raw input value — kept in sync with `value` model. */
  readonly inputValue = signal<string>('');

  /** Whether the suggestion dropdown is visible. */
  readonly showSuggestions = signal<boolean>(false);

  /** The function whose signature is currently shown in the tooltip. */
  readonly activeFunction = signal<FormulaFunction | null>(null);

  /** The word fragment at the current cursor position. */
  readonly cursorWord = signal<string>('');

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Combined list of functions (builtins + custom). */
  readonly allFunctions = computed(() =>
    this.builtins() ? [...this.BUILTIN_FUNCTIONS, ...this.functions()] : this.functions()
  );

  /** Autocomplete suggestions based on the current cursor word. */
  readonly suggestions = computed((): FormulaSuggestion[] => {
    const word = this.cursorWord().toUpperCase();
    if (!word) return [];
    const fns = this.allFunctions().filter(f => f.name.startsWith(word));
    const vars = this.variables().filter(v => v.toUpperCase().startsWith(word));
    return [
      ...fns.map(f => ({ label: f.name, type: 'function' as const, fn: f })),
      ...vars.map(v => ({ label: v, type: 'variable' as const, fn: null })),
    ];
  });

  /** True when the formula starts with `=` and has balanced parentheses. */
  readonly isValid = computed(() => {
    const v = this.value();
    if (!v.startsWith('=')) return false;
    const open = (v.match(/\(/g) || []).length;
    const close = (v.match(/\)/g) || []).length;
    return open === close;
  });

  // =========================================================================
  // HANDLERS
  // =========================================================================

  /** Handle input events from the formula text input. */
  onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.inputValue.set(v);
    this.value.set(v);
    this.formulaChange.emit(v);
    this.validChange.emit(this.isValid());

    // Extract the word fragment before the cursor to drive autocomplete.
    const cursor = (e.target as HTMLInputElement).selectionStart ?? 0;
    const before = v.slice(0, cursor);
    const match = before.match(/([A-Z_][A-Z0-9_]*)$/i);
    this.cursorWord.set(match ? match[1] : '');
    this.showSuggestions.set(!!match);

    // Detect if cursor is inside parentheses of a known function and show tooltip.
    this.updateActiveFunction(v, cursor);
  }

  /** Insert a suggestion into the formula at the current cursor word position. */
  insertSuggestion(suggestion: FormulaSuggestion): void {
    const v = this.inputValue();
    const word = this.cursorWord();
    // Replace the trailing word fragment with the suggestion label.
    const newValue = v.endsWith(word)
      ? v.slice(0, v.length - word.length) + suggestion.label
      : v + suggestion.label;

    // Append opening paren for functions.
    const insert = suggestion.type === 'function' ? newValue + '(' : newValue;

    this.inputValue.set(insert);
    this.value.set(insert);
    this.formulaChange.emit(insert);
    this.validChange.emit(this.isValid());
    this.showSuggestions.set(false);
    this.cursorWord.set('');

    if (suggestion.fn) {
      this.activeFunction.set(suggestion.fn);
    }
  }

  /** Hide suggestions when clicking outside. */
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('ui-formula-editor')) {
      this.showSuggestions.set(false);
    }
  }

  // =========================================================================
  // PRIVATE HELPERS
  // =========================================================================

  /**
   * Detect if the cursor sits inside the argument list of a known function call
   * and update `activeFunction` accordingly so the tooltip can be shown.
   */
  private updateActiveFunction(formula: string, cursor: number): void {
    // Walk backwards from cursor to find an unclosed '('
    let depth = 0;
    for (let i = cursor - 1; i >= 0; i--) {
      const ch = formula[i];
      if (ch === ')') { depth++; }
      else if (ch === '(') {
        if (depth === 0) {
          // Extract identifier before this '('
          const before = formula.slice(0, i);
          const m = before.match(/([A-Z_][A-Z0-9_]*)$/i);
          if (m) {
            const fnName = m[1].toUpperCase();
            const fn = this.allFunctions().find(f => f.name === fnName) ?? null;
            this.activeFunction.set(fn);
            return;
          }
        } else {
          depth--;
        }
      }
    }
    this.activeFunction.set(null);
  }
}
