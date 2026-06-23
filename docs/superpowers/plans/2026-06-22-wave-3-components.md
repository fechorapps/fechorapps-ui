# Wave 3 Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 19 new Angular components across 5 batches (complex inputs, editors, form flows, layout shells, navigation patterns) targeting v1.5.0.

**Architecture:** Each component lives in its own directory under `src/lib/components/form/` or `src/lib/components/layout/`. Tasks 1–4 and 7–19 are fully independent and can run in parallel. Task 6 (json-editor) requires Task 5 (code-editor) to be merged first. Task 20 is the integration task that wires everything together.

**Tech Stack:** Angular 21 with Signals API, Tailwind CSS v4, Lucide Angular, CodeMirror 6 (lazy-loaded for code-editor), HTML5 Pointer/Drag/IntersectionObserver APIs.

## Global Constraints

- `standalone: true` and `ChangeDetectionStrategy.OnPush` on every component
- Signals only: `input()`, `output()`, `model()`, `computed()`, `signal()` — never `@Input()`/`@Output()`
- Angular 17+ control flow: `@if`, `@for`, `@switch` — never `*ngIf`/`*ngFor`/`*ngSwitch`
- Tailwind CSS variables: `bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `bg-accent`, `bg-background`, `text-primary`
- Lucide icons: `import { LucideAngularModule, SomeIcon } from 'lucide-angular'` — pass icon constants to `icons` array
- Selector prefix: `ui-` (e.g. `ui-phone-input`)
- Minimum 3 Storybook stories per component — Storybook 10 CSF3 format with `@storybook/angular`
- Unit tests: Angular TestBed, use `fixture.componentRef.setInput('inputName', value)` for signal inputs
- Each component directory contains exactly: `<name>.component.ts`, `<name>.component.html`, `<name>.spec.ts`, `<name>.stories.ts`, `index.ts`
- `index.ts` exports the component class and all public interfaces/types from that directory
- Do NOT modify any barrel file (`form/index.ts`, `layout/index.ts`) — Task 20 handles all barrel updates

---

## Task 1: UiPhoneInputComponent

**Files:**
- Create: `src/lib/components/form/phone-input/phone-input.component.ts`
- Create: `src/lib/components/form/phone-input/phone-input.component.html`
- Create: `src/lib/components/form/phone-input/phone-input.spec.ts`
- Create: `src/lib/components/form/phone-input/phone-input.stories.ts`
- Create: `src/lib/components/form/phone-input/index.ts`

**Interfaces (export from index.ts):**
```ts
export interface Country {
  code: string;      // ISO 3166-1 alpha-2, e.g. 'MX'
  name: string;
  dialCode: string;  // e.g. '+52'
  flag: string;      // emoji, e.g. '🇲🇽'
  minDigits: number;
  maxDigits: number;
}
```

**Component API:**
```ts
value = model<string>('');                    // E.164 output e.g. '+521234567890'
defaultCountry = input<string>('MX');
preferredCountries = input<string[]>([]);
placeholder = input<string>('');
disabled = input<boolean>(false);
label = input<string>('');

readonly phoneChange = output<string>();
readonly validChange = output<boolean>();
```

**Key implementation:**
```ts
// Embedded country data (no external lib) — include at minimum:
// MX, US, CA, GB, ES, FR, DE, IT, BR, AR, CO, CL, PE, JP, CN, IN, AU
private readonly COUNTRIES: Country[] = [
  { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽', minDigits: 10, maxDigits: 10 },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', minDigits: 10, maxDigits: 10 },
  // ... add 15+ more
];

selectedCountry = signal<Country>(/* find by defaultCountry */);
rawDigits = signal<string>('');
showDropdown = signal<boolean>(false);

// computed
isValid = computed(() => {
  const digits = this.rawDigits().replace(/\D/g, '');
  const c = this.selectedCountry();
  return digits.length >= c.minDigits && digits.length <= c.maxDigits;
});

formattedValue = computed(() =>
  `${this.selectedCountry().dialCode}${this.rawDigits()}`
);

filteredCountries = computed(() => {
  const preferred = this.preferredCountries();
  if (!preferred.length) return this.COUNTRIES;
  const pref = this.COUNTRIES.filter(c => preferred.includes(c.code));
  const rest = this.COUNTRIES.filter(c => !preferred.includes(c.code));
  return [...pref, ...rest];
});

// effect: emit on change
constructor() {
  effect(() => {
    this.phoneChange.emit(this.formattedValue());
    this.validChange.emit(this.isValid());
  });
}
```

**Template shape:**
```html
<div class="flex flex-col gap-1">
  @if (label()) { <label class="text-sm font-medium text-foreground">{{ label() }}</label> }
  <div class="flex border border-border rounded-md overflow-hidden bg-card">
    <!-- Country selector button -->
    <button type="button" (click)="showDropdown.set(!showDropdown())"
      class="flex items-center gap-1 px-3 py-2 border-r border-border hover:bg-accent">
      <span>{{ selectedCountry().flag }}</span>
      <span class="text-sm text-muted-foreground">{{ selectedCountry().dialCode }}</span>
    </button>
    <!-- Dropdown overlay -->
    @if (showDropdown()) {
      <div class="absolute z-50 mt-10 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
        @for (country of filteredCountries(); track country.code) {
          <button type="button" (click)="selectCountry(country)"
            class="flex items-center gap-2 w-full px-3 py-2 hover:bg-accent text-sm">
            <span>{{ country.flag }}</span>
            <span>{{ country.name }}</span>
            <span class="text-muted-foreground ml-auto">{{ country.dialCode }}</span>
          </button>
        }
      </div>
    }
    <!-- Number input -->
    <input type="tel" [value]="rawDigits()" (input)="onInput($event)"
      [placeholder]="placeholder()" [disabled]="disabled()"
      class="flex-1 px-3 py-2 bg-transparent outline-none text-foreground text-sm" />
  </div>
  @if (rawDigits() && !isValid()) {
    <span class="text-xs text-red-500">Invalid phone number</span>
  }
</div>
```

- [ ] **Step 1:** Create `phone-input.component.ts` with the full component including COUNTRIES array (≥17 countries), signals, computed, effect, `onInput()` handler, `selectCountry()` method
- [ ] **Step 2:** Create `phone-input.component.html` with flag dropdown + tel input + validation message
- [ ] **Step 3:** Create `phone-input.spec.ts` — test: default country MX renders, typing 10 digits emits validChange true, typing 5 digits emits validChange false, preferredCountries shows them first
- [ ] **Step 4:** Create `phone-input.stories.ts` — stories: Default (MX), WithPreferredCountries ([US,MX,ES]), WithLabel, Disabled
- [ ] **Step 5:** Create `index.ts` exporting `UiPhoneInputComponent`, `Country`
- [ ] **Step 6:** Verify TypeScript: `npx tsc --noEmit 2>&1 | grep phone-input`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/phone-input/
git commit -m "feat: add UiPhoneInputComponent"
```

---

## Task 2: UiCreditCardInputComponent

**Files:**
- Create: `src/lib/components/form/credit-card-input/credit-card-input.component.ts`
- Create: `src/lib/components/form/credit-card-input/credit-card-input.component.html`
- Create: `src/lib/components/form/credit-card-input/credit-card-input.spec.ts`
- Create: `src/lib/components/form/credit-card-input/credit-card-input.stories.ts`
- Create: `src/lib/components/form/credit-card-input/index.ts`

**Interfaces:**
```ts
export interface CreditCardValue {
  number: string;   // raw digits only, no spaces
  expiry: string;   // MM/YY
  cvv: string;
}
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';
```

**Component API:**
```ts
value = model<CreditCardValue>({ number: '', expiry: '', cvv: '' });
showCvv = input<boolean>(true);
showCardIcon = input<boolean>(true);
disabled = input<boolean>(false);

readonly cardChange = output<CreditCardValue>();
readonly cardTypeChange = output<CardType>();
readonly validChange = output<boolean>();
```

**Key implementation:**
```ts
numberInput = signal<string>('');   // formatted with spaces
expiryInput = signal<string>('');   // MM/YY
cvvInput = signal<string>('');
showCvvText = signal<boolean>(false);

cardType = computed((): CardType => {
  const n = this.numberInput().replace(/\s/g, '');
  if (/^4/.test(n)) return 'visa';
  if (/^5[1-5]/.test(n)) return 'mastercard';
  if (/^3[47]/.test(n)) return 'amex';
  if (/^6(?:011|5)/.test(n)) return 'discover';
  return 'unknown';
});

isAmex = computed(() => this.cardType() === 'amex');

// Amex: 4-6-5 format (15 digits), others: 4-4-4-4 (16 digits)
formatNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (this.isAmex()) {
    return digits.replace(/(\d{4})(\d{0,6})(\d{0,5})/, '$1 $2 $3').trim();
  }
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

onNumberInput(e: Event): void {
  const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
  const max = this.isAmex() ? 15 : 16;
  this.numberInput.set(this.formatNumber(digits.slice(0, max)));
  this.emitChange();
}

onExpiryInput(e: Event): void {
  let v = (e.target as HTMLInputElement).value.replace(/\D/g, '');
  if (v.length >= 2) v = v.slice(0,2) + '/' + v.slice(2,4);
  this.expiryInput.set(v);
  this.emitChange();
}

isValid = computed(() => {
  const num = this.numberInput().replace(/\s/g, '');
  const exp = this.expiryInput();
  const cvv = this.cvvInput();
  const numValid = this.isAmex() ? num.length === 15 : num.length === 16;
  const [mm, yy] = exp.split('/');
  const expValid = mm && yy && +mm >= 1 && +mm <= 12;
  const cvvValid = this.isAmex() ? cvv.length === 4 : cvv.length === 3;
  return numValid && !!expValid && cvvValid;
});
```

- [ ] **Step 1:** Create `credit-card-input.component.ts` with full component
- [ ] **Step 2:** Create `credit-card-input.component.html` — three inputs (number, expiry, CVV) + card type SVG icon (inline SVG for visa/mc/amex logos using brand colors as simple shapes)
- [ ] **Step 3:** Create `credit-card-input.spec.ts` — test: Visa prefix detection, Amex 4-6-5 formatting, expiry auto-slash, CVV mask toggle, validChange emission
- [ ] **Step 4:** Create `credit-card-input.stories.ts` — stories: Empty, FilledVisa, FilledAmex, Disabled
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep credit-card`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/credit-card-input/
git commit -m "feat: add UiCreditCardInputComponent"
```

---

## Task 3: UiAddressInputComponent

**Files:**
- Create: `src/lib/components/form/address-input/address-input.component.ts`
- Create: `src/lib/components/form/address-input/address-input.component.html`
- Create: `src/lib/components/form/address-input/address-input.spec.ts`
- Create: `src/lib/components/form/address-input/address-input.stories.ts`
- Create: `src/lib/components/form/address-input/index.ts`

**Interfaces:**
```ts
export interface AddressSuggestion {
  id: string;
  label: string;
  value: AddressValue;
}
export interface AddressValue {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  raw?: string;
}
```

**Component API:**
```ts
value = model<AddressValue | null>(null);
searchFn = input.required<(query: string) => Promise<AddressSuggestion[]>>();
placeholder = input<string>('Search address...');
debounceMs = input<number>(300);
minChars = input<number>(3);
disabled = input<boolean>(false);
showManualEntry = input<boolean>(true);

readonly addressSelected = output<AddressValue>();
```

**Key implementation:**
```ts
query = signal<string>('');
suggestions = signal<AddressSuggestion[]>([]);
loading = signal<boolean>(false);
showDropdown = signal<boolean>(false);
showManualForm = signal<boolean>(false);
manualValue = signal<AddressValue>({});

private debounceTimer: ReturnType<typeof setTimeout> | null = null;

onQueryInput(e: Event): void {
  const v = (e.target as HTMLInputElement).value;
  this.query.set(v);
  if (this.debounceTimer) clearTimeout(this.debounceTimer);
  if (v.length < this.minChars()) { this.suggestions.set([]); return; }
  this.debounceTimer = setTimeout(() => this.search(v), this.debounceMs());
}

private async search(q: string): Promise<void> {
  this.loading.set(true);
  try {
    const results = await this.searchFn()(q);
    this.suggestions.set(results);
    this.showDropdown.set(true);
  } finally {
    this.loading.set(false);
  }
}

selectSuggestion(s: AddressSuggestion): void {
  this.value.set(s.value);
  this.query.set(s.label);
  this.showDropdown.set(false);
  this.addressSelected.emit(s.value);
}
```

- [ ] **Step 1:** Create `address-input.component.ts`
- [ ] **Step 2:** Create `address-input.component.html` — typeahead input + suggestion dropdown + "Enter manually" option + collapsible manual form (street, city, state, postal, country fields)
- [ ] **Step 3:** Create `address-input.spec.ts` — test: does not call searchFn below minChars, calls searchFn after debounce, selectSuggestion sets value and emits, manual entry form appears on click
- [ ] **Step 4:** Create `address-input.stories.ts` — stories: WithMockSearch (searchFn returns fake suggestions), ManualEntryVisible, Disabled. Use a mock searchFn: `async (q) => [{ id:'1', label: q + ' Street, City', value: { raw: q } }]`
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep address-input`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/address-input/
git commit -m "feat: add UiAddressInputComponent"
```

---

## Task 4: UiIbanInputComponent

**Files:**
- Create: `src/lib/components/form/iban-input/iban-input.component.ts`
- Create: `src/lib/components/form/iban-input/iban-input.component.html`
- Create: `src/lib/components/form/iban-input/iban-input.spec.ts`
- Create: `src/lib/components/form/iban-input/iban-input.stories.ts`
- Create: `src/lib/components/form/iban-input/index.ts`

**Component API:**
```ts
value = model<string>('');        // raw IBAN without spaces
country = input<string | null>(null);
showBankName = input<boolean>(false);
disabled = input<boolean>(false);
label = input<string>('IBAN');

readonly ibanChange = output<string>();
readonly validChange = output<boolean>();
```

**Key implementation:**
```ts
// IBAN length map (country code → total character length including country+check digits)
private readonly IBAN_LENGTHS: Record<string, number> = {
  AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22,
  BH: 22, BR: 29, BY: 28, CH: 21, CY: 28, CZ: 24, DE: 22, DK: 18,
  DO: 28, EE: 20, ES: 24, FI: 18, FR: 27, GB: 22, GE: 22, GI: 23,
  GR: 27, HR: 21, HU: 28, IE: 22, IL: 23, IQ: 23, IS: 26, IT: 27,
  LB: 28, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, ME: 22, MK: 19,
  MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29,
  PT: 25, QA: 29, RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24,
  SM: 27, ST: 25, SV: 28, TL: 23, TN: 24, TR: 26, UA: 29, VG: 24,
  XK: 20,
};

displayValue = signal<string>('');   // formatted with spaces

detectedCountry = computed(() => {
  const raw = this.value().toUpperCase();
  return raw.length >= 2 ? raw.slice(0, 2) : (this.country() ?? '');
});

expectedLength = computed(() =>
  this.IBAN_LENGTHS[this.detectedCountry()] ?? null
);

isValid = computed(() => {
  const raw = this.value().replace(/\s/g, '').toUpperCase();
  const expected = this.expectedLength();
  return !!expected && raw.length === expected;
});

onInput(e: Event): void {
  const raw = (e.target as HTMLInputElement).value.replace(/[^A-Z0-9a-z]/g, '').toUpperCase();
  this.value.set(raw);
  // Format: groups of 4
  this.displayValue.set(raw.replace(/(.{4})/g, '$1 ').trim());
  this.ibanChange.emit(raw);
  this.validChange.emit(this.isValid());
}

copyToClipboard(): void {
  navigator.clipboard.writeText(this.value());
}
```

- [ ] **Step 1:** Create `iban-input.component.ts` with full IBAN_LENGTHS map (60+ countries)
- [ ] **Step 2:** Create `iban-input.component.html` — labeled input with formatted display, validity indicator (green check / red X via Lucide `Check`/`X` icons), copy button
- [ ] **Step 3:** Create `iban-input.spec.ts` — test: ES IBAN (24 chars) valid, DE IBAN (22 chars) valid, too short invalid, copy triggers clipboard, formatted display has spaces every 4 chars
- [ ] **Step 4:** Create `iban-input.stories.ts` — stories: Empty, ValidSpanish (ES9121000418450200051332), ValidGerman, Invalid, Disabled
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep iban-input`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/iban-input/
git commit -m "feat: add UiIbanInputComponent"
```

---

## Task 5: UiCodeEditorComponent ⚠️ Must complete before Task 6

**Files:**
- Create: `src/lib/components/form/code-editor/code-editor.component.ts`
- Create: `src/lib/components/form/code-editor/code-editor.component.html`
- Create: `src/lib/components/form/code-editor/code-editor.spec.ts`
- Create: `src/lib/components/form/code-editor/code-editor.stories.ts`
- Create: `src/lib/components/form/code-editor/index.ts`

**Component API:**
```ts
value = model<string>('');
language = input<'typescript'|'javascript'|'json'|'html'|'css'|'python'|'bash'>('typescript');
theme = input<'light'|'dark'>('light');
readonly = input<boolean>(false);
lineNumbers = input<boolean>(true);
height = input<string>('300px');
placeholder = input<string>('');

readonly codeChange = output<string>();
```

**Key implementation — lazy-load CodeMirror:**
```ts
import { Component, ChangeDetectionStrategy, input, output, model,
  signal, effect, viewChild, ElementRef, afterNextRender, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// EditorView type only for TS — actual import is dynamic
type EditorView = import('@codemirror/view').EditorView;

@Component({
  selector: 'ui-code-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [style.height]="height()" class="relative border border-border rounded-md overflow-hidden">
      <div #editorContainer class="h-full w-full"></div>
      @if (!cmLoaded()) {
        <textarea [value]="value()" (input)="onFallbackInput($event)"
          [readOnly]="readonly()" [placeholder]="placeholder()"
          class="w-full h-full p-3 font-mono text-sm bg-card text-foreground outline-none resize-none">
        </textarea>
      }
    </div>
  `
})
export class UiCodeEditorComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly editorContainer = viewChild<ElementRef>('editorContainer');

  value = model<string>('');
  language = input<'typescript'|'javascript'|'json'|'html'|'css'|'python'|'bash'>('typescript');
  theme = input<'light'|'dark'>('light');
  readonly = input<boolean>(false);
  lineNumbers = input<boolean>(true);
  height = input<string>('300px');
  placeholder = input<string>('');

  readonly codeChange = output<string>();

  cmLoaded = signal(false);
  private editorView: EditorView | null = null;

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initCodeMirror();
      }
    });
  }

  private async initCodeMirror(): Promise<void> {
    try {
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
                const v = update.state.doc.toString();
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
      // Falls back to textarea (cmLoaded stays false)
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

  onFallbackInput(e: Event): void {
    const v = (e.target as HTMLTextAreaElement).value;
    this.value.set(v);
    this.codeChange.emit(v);
  }

  ngOnDestroy(): void {
    this.editorView?.destroy();
  }
}
```

- [ ] **Step 1:** Create `code-editor.component.ts` with full lazy-loading implementation (inline template, no external .html file since template is short)
- [ ] **Step 2:** Create `code-editor.component.html` as empty file (template is inline) OR keep the template in the .ts and create a minimal .html placeholder — if ng-packagr requires .html, use `templateUrl` with a minimal wrapper div
- [ ] **Step 3:** Create `code-editor.spec.ts` — test: renders fallback textarea before CM loads, onFallbackInput emits codeChange, value model updates, readonly textarea has readOnly attribute
- [ ] **Step 4:** Create `code-editor.stories.ts` — stories: TypeScript, JSON, CSS, ReadOnly. Use `args.value` for story inputs
- [ ] **Step 5:** Create `index.ts` exporting `UiCodeEditorComponent`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep code-editor`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/code-editor/
git commit -m "feat: add UiCodeEditorComponent with lazy-loaded CodeMirror"
```

---

## Task 6: UiJsonEditorComponent ⚠️ Requires Task 5 committed first

**Files:**
- Create: `src/lib/components/form/json-editor/json-editor.component.ts`
- Create: `src/lib/components/form/json-editor/json-editor.component.html`
- Create: `src/lib/components/form/json-editor/json-editor.spec.ts`
- Create: `src/lib/components/form/json-editor/json-editor.stories.ts`
- Create: `src/lib/components/form/json-editor/index.ts`

**Component API:**
```ts
value = model<unknown>(null);
mode = model<'tree'|'raw'>('tree');
readonly = input<boolean>(false);
maxDepth = input<number>(10);
expandAll = input<boolean>(false);
showTypes = input<boolean>(true);

readonly valueChange = output<unknown>();
readonly parseError = output<string>();
```

**Key implementation:**
```ts
// Internal tree node type
interface JsonNode {
  key: string | number;
  value: unknown;
  type: 'string'|'number'|'boolean'|'null'|'array'|'object';
  depth: number;
  path: string;
  expanded: signal<boolean>;
  children?: JsonNode[];
}

rawText = signal<string>('');
expandedPaths = signal<Set<string>>(new Set());

nodes = computed((): JsonNode[] => this.buildNodes(this.value(), '', 0));

private buildNodes(val: unknown, path: string, depth: number): JsonNode[] {
  if (depth > this.maxDepth()) return [];
  if (val === null) return [{ key: path, value: null, type: 'null', depth, path, expanded: signal(false) }];
  if (Array.isArray(val)) {
    const expanded = signal(this.expandAll() || depth < 2);
    return [{ key: path || 'root', value: val, type: 'array', depth, path,
      expanded,
      children: val.map((v, i) => this.buildNodes(v, `${path}[${i}]`, depth + 1)).flat()
    }];
  }
  if (typeof val === 'object') {
    const expanded = signal(this.expandAll() || depth < 2);
    return [{ key: path || 'root', value: val, type: 'object', depth, path,
      expanded,
      children: Object.entries(val as Record<string,unknown>)
        .map(([k, v]) => this.buildNodes(v, path ? `${path}.${k}` : k, depth + 1)).flat()
    }];
  }
  return [{ key: path, value: val, type: typeof val as any, depth, path, expanded: signal(false) }];
}

onRawChange(raw: string): void {
  this.rawText.set(raw);
  try {
    const parsed = JSON.parse(raw);
    this.value.set(parsed);
    this.valueChange.emit(parsed);
  } catch (e) {
    this.parseError.emit((e as Error).message);
  }
}

toggleExpand(node: JsonNode): void {
  node.expanded.set(!node.expanded());
}
```

**Template (tree mode):**
```html
<div class="border border-border rounded-md bg-card overflow-hidden">
  <div class="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/50">
    <button (click)="mode.set('tree')" [class.text-primary]="mode()==='tree'" class="text-sm">Tree</button>
    <button (click)="switchToRaw()" [class.text-primary]="mode()==='raw'" class="text-sm">Raw</button>
  </div>
  @if (mode() === 'tree') {
    <div class="p-2 font-mono text-sm overflow-auto max-h-96">
      @for (node of nodes(); track node.path) {
        <div [style.paddingLeft.px]="node.depth * 16" class="flex items-center gap-1 hover:bg-accent/50 rounded px-1 py-0.5">
          @if (node.type === 'object' || node.type === 'array') {
            <button (click)="toggleExpand(node)" class="text-muted-foreground w-4">
              {{ node.expanded() ? '▼' : '▶' }}
            </button>
          } @else {
            <span class="w-4"></span>
          }
          <span class="text-blue-500">{{ node.key }}</span>
          <span class="text-muted-foreground">:</span>
          @if (showTypes()) {
            <span class="text-xs px-1 rounded bg-muted text-muted-foreground">{{ node.type }}</span>
          }
          @if (node.type !== 'object' && node.type !== 'array') {
            <span [class]="valueClass(node.type)">{{ formatValue(node.value) }}</span>
          }
        </div>
      }
    </div>
  } @else {
    <ui-code-editor [value]="rawText()" language="json" (codeChange)="onRawChange($event)" />
  }
</div>
```

- [ ] **Step 1:** Create `json-editor.component.ts` with `buildNodes`, `toggleExpand`, `switchToRaw()` (serializes current value to `rawText`), `formatValue()`, `valueClass()` methods
- [ ] **Step 2:** Create `json-editor.component.html` with tree/raw toggle, tree view, and `<ui-code-editor>` for raw mode
- [ ] **Step 3:** Create `json-editor.spec.ts` — test: object renders key nodes, array renders index nodes, switching to raw mode serializes value, invalid JSON in raw mode emits parseError, expandAll expands all nodes
- [ ] **Step 4:** Create `json-editor.stories.ts` — stories: SimpleObject, NestedObject, Array, ReadOnly, RawMode
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep json-editor`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/json-editor/
git commit -m "feat: add UiJsonEditorComponent"
```

---

## Task 7: UiFormulaEditorComponent

**Files:**
- Create: `src/lib/components/form/formula-editor/formula-editor.component.ts`
- Create: `src/lib/components/form/formula-editor/formula-editor.component.html`
- Create: `src/lib/components/form/formula-editor/formula-editor.spec.ts`
- Create: `src/lib/components/form/formula-editor/formula-editor.stories.ts`
- Create: `src/lib/components/form/formula-editor/index.ts`

**Interfaces:**
```ts
export interface FormulaFunction {
  name: string;
  description: string;
  args: string[];
  example: string;
}
```

**Component API:**
```ts
value = model<string>('');
functions = input<FormulaFunction[]>([]);
variables = input<string[]>([]);
builtins = input<boolean>(true);
disabled = input<boolean>(false);

readonly formulaChange = output<string>();
readonly validChange = output<boolean>();
```

**Key implementation:**
```ts
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

allFunctions = computed(() =>
  this.builtins() ? [...this.BUILTIN_FUNCTIONS, ...this.functions()] : this.functions()
);

inputValue = signal<string>('');
showSuggestions = signal<boolean>(false);
activeFunction = signal<FormulaFunction | null>(null);
cursorWord = signal<string>('');

suggestions = computed(() => {
  const word = this.cursorWord().toUpperCase();
  if (!word) return [];
  const fns = this.allFunctions().filter(f => f.name.startsWith(word));
  const vars = this.variables().filter(v => v.toUpperCase().startsWith(word));
  return [...fns.map(f => ({ label: f.name, type: 'function' as const, fn: f })),
          ...vars.map(v => ({ label: v, type: 'variable' as const, fn: null }))];
});

isValid = computed(() => {
  const v = this.value();
  if (!v.startsWith('=')) return false;
  const open = (v.match(/\(/g) || []).length;
  const close = (v.match(/\)/g) || []).length;
  return open === close;
});

onInput(e: Event): void {
  const v = (e.target as HTMLInputElement).value;
  this.inputValue.set(v);
  this.value.set(v);
  this.formulaChange.emit(v);
  this.validChange.emit(this.isValid());
  // extract word at cursor
  const cursor = (e.target as HTMLInputElement).selectionStart ?? 0;
  const before = v.slice(0, cursor);
  const match = before.match(/([A-Z_][A-Z0-9_]*)$/i);
  this.cursorWord.set(match ? match[1] : '');
  this.showSuggestions.set(!!match);
}
```

- [ ] **Step 1:** Create `formula-editor.component.ts` with all logic
- [ ] **Step 2:** Create `formula-editor.component.html` — input with `=` prefix indicator, autocomplete dropdown with function name + description, tooltip showing active function signature when cursor is inside parentheses
- [ ] **Step 3:** Create `formula-editor.spec.ts` — test: builtin functions appear in suggestions, typing `=SUM` shows SUM suggestion, custom functions appear when provided, validChange true on balanced parens, false on unbalanced
- [ ] **Step 4:** Create `formula-editor.stories.ts` — stories: Default (builtins), WithCustomFunctions, WithVariables, Disabled
- [ ] **Step 5:** Create `index.ts` exporting `UiFormulaEditorComponent`, `FormulaFunction`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep formula-editor`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/formula-editor/
git commit -m "feat: add UiFormulaEditorComponent"
```

---

## Task 8: UiWizardComponent

**Files:**
- Create: `src/lib/components/form/wizard/wizard.component.ts`
- Create: `src/lib/components/form/wizard/wizard.component.html`
- Create: `src/lib/components/form/wizard/wizard.spec.ts`
- Create: `src/lib/components/form/wizard/wizard.stories.ts`
- Create: `src/lib/components/form/wizard/index.ts`

**Interface:**
```ts
export interface WizardStep {
  label: string;
  description?: string;
  icon?: unknown;
  valid?: boolean;
  optional?: boolean;
}
```

**Component API:**
```ts
steps = input.required<WizardStep[]>();
currentStep = model<number>(0);
linear = input<boolean>(true);
showStepNumbers = input<boolean>(true);
nextLabel = input<string>('Next');
backLabel = input<string>('Back');
finishLabel = input<string>('Finish');
orientation = input<'horizontal'|'vertical'>('horizontal');

readonly stepChange = output<number>();
readonly finished = output<void>();
readonly stepSkipped = output<number>();
```

**Key implementation:**
```ts
isLastStep = computed(() => this.currentStep() === this.steps().length - 1);
canNext = computed(() => {
  const step = this.steps()[this.currentStep()];
  return step?.valid !== false;  // valid undefined = allowed
});

next(): void {
  if (!this.canNext()) return;
  if (this.isLastStep()) { this.finished.emit(); return; }
  const next = this.currentStep() + 1;
  this.currentStep.set(next);
  this.stepChange.emit(next);
}

back(): void {
  if (this.currentStep() === 0) return;
  const prev = this.currentStep() - 1;
  this.currentStep.set(prev);
  this.stepChange.emit(prev);
}

goTo(index: number): void {
  if (this.linear() && index > this.currentStep()) return;
  this.currentStep.set(index);
  this.stepChange.emit(index);
}

skip(): void {
  const current = this.currentStep();
  if (!this.steps()[current]?.optional) return;
  this.stepSkipped.emit(current);
  this.next();
}

stepState(index: number): 'completed' | 'active' | 'pending' {
  if (index < this.currentStep()) return 'completed';
  if (index === this.currentStep()) return 'active';
  return 'pending';
}
```

**Template:** Step indicator bar (horizontal dots or vertical list) + `<ng-content>` per step index shown conditionally + Back/Next/Finish/Skip buttons.

```html
<!-- Step indicator -->
<div [class]="orientation() === 'horizontal' ? 'flex items-center gap-0' : 'flex flex-col gap-0'">
  @for (step of steps(); track $index) {
    <div class="flex items-center">
      <button (click)="goTo($index)" [disabled]="linear() && $index > currentStep()"
        class="flex items-center gap-2 p-2">
        <span [class]="stepIndicatorClass($index)">
          @if (stepState($index) === 'completed') { ✓ }
          @else { {{ showStepNumbers() ? $index + 1 : '' }} }
        </span>
        <span class="text-sm">{{ step.label }}</span>
      </button>
      @if (!$last) { <div class="flex-1 h-px bg-border mx-2"></div> }
    </div>
  }
</div>
<!-- Content slots: show only active step -->
@for (step of steps(); track $index) {
  @if ($index === currentStep()) {
    <div class="mt-6">
      <ng-content [select]="'[step-' + $index + ']'" />
    </div>
  }
}
<!-- Note: ng-content with dynamic selectors is NOT supported in Angular -->
<!-- Use a different approach: project all content, show/hide by index via CSS -->
<div class="mt-6"><ng-content /></div>
<!-- Navigation -->
<div class="flex justify-between mt-6">
  <button (click)="back()" [disabled]="currentStep() === 0">{{ backLabel() }}</button>
  @if (steps()[currentStep()]?.optional) {
    <button (click)="skip()">Skip</button>
  }
  <button (click)="next()" [disabled]="!canNext()">
    {{ isLastStep() ? finishLabel() : nextLabel() }}
  </button>
</div>
```

**Note on content projection:** Angular does not support dynamic `select` values. The wizard projects all content via `<ng-content>` and the consumer wraps each step's content in a `<div [hidden]="currentStep !== N">` pattern. Document this in the component's JSDoc.

- [ ] **Step 1:** Create `wizard.component.ts`
- [ ] **Step 2:** Create `wizard.component.html`
- [ ] **Step 3:** Create `wizard.spec.ts` — test: next() increments currentStep, back() decrements, finished emits on next at last step, canNext false when valid===false, linear mode blocks goTo future steps
- [ ] **Step 4:** Create `wizard.stories.ts` — stories: ThreeStepLinear, NonLinear, WithValidation (step 1 valid=false blocks Next), Vertical
- [ ] **Step 5:** Create `index.ts` exporting `UiWizardComponent`, `WizardStep`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep wizard`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/wizard/
git commit -m "feat: add UiWizardComponent"
```

---

## Task 9: UiDynamicFormComponent

**Files:**
- Create: `src/lib/components/form/dynamic-form/dynamic-form.component.ts`
- Create: `src/lib/components/form/dynamic-form/dynamic-form.component.html`
- Create: `src/lib/components/form/dynamic-form/dynamic-form.spec.ts`
- Create: `src/lib/components/form/dynamic-form/dynamic-form.stories.ts`
- Create: `src/lib/components/form/dynamic-form/index.ts`

**Interfaces:**
```ts
export type FieldType = 'text' | 'number' | 'email' | 'password' | 'textarea' |
  'select' | 'multi-select' | 'checkbox' | 'radio' | 'date' | 'toggle' | 'hidden';

export interface DynamicField {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: unknown }[];
  validation?: {
    min?: number; max?: number;
    minLength?: number; maxLength?: number;
    pattern?: string;
    custom?: (v: unknown) => string | null;
  };
  showWhen?: { field: string; equals: unknown };
  colspan?: 1 | 2;
}

export interface DynamicFormSchema {
  fields: DynamicField[];
  submitLabel?: string;
}
```

**Component API:**
```ts
schema = input.required<DynamicFormSchema>();
value = model<Record<string, unknown>>({});
disabled = input<boolean>(false);
layout = input<'single'|'two-column'|'auto'>('auto');

readonly formSubmit = output<Record<string, unknown>>();
readonly valueChange = output<Record<string, unknown>>();
readonly validChange = output<boolean>();
```

**Key implementation:**
```ts
fieldValues = signal<Record<string, unknown>>({});

visibleFields = computed(() =>
  this.schema().fields.filter(f => {
    if (!f.showWhen) return true;
    return this.fieldValues()[f.showWhen.field] === f.showWhen.equals;
  })
);

errors = computed((): Record<string, string | null> => {
  const errs: Record<string, string | null> = {};
  for (const field of this.visibleFields()) {
    errs[field.key] = this.validateField(field, this.fieldValues()[field.key]);
  }
  return errs;
});

isValid = computed(() => Object.values(this.errors()).every(e => e === null));

validateField(field: DynamicField, val: unknown): string | null {
  if (field.required && (val === null || val === undefined || val === '')) {
    return `${field.label} is required`;
  }
  const v = field.validation;
  if (!v) return null;
  if (typeof val === 'string') {
    if (v.minLength && val.length < v.minLength) return `Min ${v.minLength} characters`;
    if (v.maxLength && val.length > v.maxLength) return `Max ${v.maxLength} characters`;
    if (v.pattern && !new RegExp(v.pattern).test(val)) return 'Invalid format';
  }
  if (typeof val === 'number') {
    if (v.min !== undefined && val < v.min) return `Min value is ${v.min}`;
    if (v.max !== undefined && val > v.max) return `Max value is ${v.max}`;
  }
  return v.custom ? v.custom(val) : null;
}

updateField(key: string, val: unknown): void {
  this.fieldValues.update(fv => ({ ...fv, [key]: val }));
  this.value.set(this.fieldValues());
  this.valueChange.emit(this.fieldValues());
  this.validChange.emit(this.isValid());
}

onSubmit(e: Event): void {
  e.preventDefault();
  if (this.isValid()) this.formSubmit.emit(this.fieldValues());
}
```

- [ ] **Step 1:** Create `dynamic-form.component.ts`
- [ ] **Step 2:** Create `dynamic-form.component.html` — `<form (submit)="onSubmit($event)">` with `@for (field of visibleFields()` using `@switch (field.type)` to render appropriate input type (text/email/password → plain `<input>`, textarea → `<textarea>`, select → `<select>`, checkbox → `<input type="checkbox">`, toggle → `<input type="checkbox">` styled, radio → group of `<input type="radio">`). Show error messages. Submit button.
- [ ] **Step 3:** Create `dynamic-form.spec.ts` — test: required field invalid if empty, showWhen hides field when condition not met, shows field when condition met, submit only fires when valid, custom validator called
- [ ] **Step 4:** Create `dynamic-form.stories.ts` — stories: SimpleLogin (email+password), ContactForm (text+email+textarea), ConditionalFields (shows extra field when checkbox ticked), TwoColumnLayout
- [ ] **Step 5:** Create `index.ts` exporting component + all interfaces
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep dynamic-form`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/dynamic-form/
git commit -m "feat: add UiDynamicFormComponent"
```

---

## Task 10: UiFieldArrayComponent

**Files:**
- Create: `src/lib/components/form/field-array/field-array.component.ts`
- Create: `src/lib/components/form/field-array/field-array.component.html`
- Create: `src/lib/components/form/field-array/field-array.spec.ts`
- Create: `src/lib/components/form/field-array/field-array.stories.ts`
- Create: `src/lib/components/form/field-array/index.ts`

**Component API (reuses `DynamicField` from Task 9):**
```ts
import { DynamicField } from '../dynamic-form';

value = model<Record<string, unknown>[]>([]);
schema = input.required<DynamicField[]>();
minItems = input<number>(0);
maxItems = input<number | null>(null);
addLabel = input<string>('Add item');
sortable = input<boolean>(false);
disabled = input<boolean>(false);

readonly valueChange = output<Record<string, unknown>[]>();
```

**Key implementation:**
```ts
rows = signal<Record<string, unknown>[]>([]);
dragIndex = signal<number | null>(null);

canAdd = computed(() => {
  const max = this.maxItems();
  return max === null || this.rows().length < max;
});

canRemove = computed(() => this.rows().length > this.minItems());

addRow(): void {
  if (!this.canAdd()) return;
  const empty = Object.fromEntries(this.schema().map(f => [f.key, '']));
  this.rows.update(r => [...r, empty]);
  this.emit();
}

removeRow(index: number): void {
  if (!this.canRemove()) return;
  this.rows.update(r => r.filter((_, i) => i !== index));
  this.emit();
}

updateCell(rowIndex: number, key: string, val: unknown): void {
  this.rows.update(r => r.map((row, i) =>
    i === rowIndex ? { ...row, [key]: val } : row
  ));
  this.emit();
}

onDragStart(index: number): void { this.dragIndex.set(index); }
onDragOver(e: DragEvent, index: number): void { e.preventDefault(); }
onDrop(targetIndex: number): void {
  const from = this.dragIndex();
  if (from === null || from === targetIndex) return;
  this.rows.update(r => {
    const arr = [...r];
    const [item] = arr.splice(from, 1);
    arr.splice(targetIndex, 0, item);
    return arr;
  });
  this.dragIndex.set(null);
  this.emit();
}

private emit(): void {
  this.value.set(this.rows());
  this.valueChange.emit(this.rows());
}
```

- [ ] **Step 1:** Create `field-array.component.ts`
- [ ] **Step 2:** Create `field-array.component.html` — list of rows, each with schema fields as inline inputs + delete button + drag handle (if `sortable`). Add button at bottom disabled when at maxItems.
- [ ] **Step 3:** Create `field-array.spec.ts` — test: addRow appends empty row, removeRow removes at index, canAdd false at maxItems, canRemove false at minItems, drag reorders rows
- [ ] **Step 4:** Create `field-array.stories.ts` — stories: Simple (name+email rows), WithMinMax (min 1, max 5), Sortable, Disabled
- [ ] **Step 5:** Create `index.ts` (re-export `DynamicField` from dynamic-form is NOT needed — consumer imports from form barrel)
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep field-array`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/form/field-array/
git commit -m "feat: add UiFieldArrayComponent"
```

---

## Task 11: UiCollapsibleNavComponent

**Files:**
- Create: `src/lib/components/layout/collapsible-nav/collapsible-nav.component.ts`
- Create: `src/lib/components/layout/collapsible-nav/collapsible-nav.component.html`
- Create: `src/lib/components/layout/collapsible-nav/collapsible-nav.spec.ts`
- Create: `src/lib/components/layout/collapsible-nav/collapsible-nav.stories.ts`
- Create: `src/lib/components/layout/collapsible-nav/index.ts`

**Interface:**
```ts
export interface NavItem {
  id: string;
  label: string;
  icon?: unknown;
  route?: string;
  badge?: string | number;
  children?: NavItem[];
  section?: string;
  disabled?: boolean;
}
```

**Component API:**
```ts
items = input.required<NavItem[]>();
collapsed = model<boolean>(false);
activeRoute = input<string>('');
width = input<string>('260px');
collapsedWidth = input<string>('64px');
showHeader = input<boolean>(true);

readonly itemClicked = output<NavItem>();
readonly collapsedChange = output<boolean>();
```

**Key implementation:**
```ts
expandedIds = signal<Set<string>>(new Set());

isActive(item: NavItem): boolean {
  return !!item.route && this.activeRoute() === item.route;
}

isExpanded(id: string): boolean {
  return this.expandedIds().has(id);
}

toggleExpand(id: string): void {
  this.expandedIds.update(s => {
    const next = new Set(s);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
}

onItemClick(item: NavItem): void {
  if (item.disabled) return;
  if (item.children?.length) { this.toggleExpand(item.id); return; }
  this.itemClicked.emit(item);
}

toggleCollapse(): void {
  const next = !this.collapsed();
  this.collapsed.set(next);
  this.collapsedChange.emit(next);
}

currentWidth = computed(() =>
  this.collapsed() ? this.collapsedWidth() : this.width()
);

// Group items by section
groupedItems = computed(() => {
  const groups: { section: string | null; items: NavItem[] }[] = [];
  let currentSection: string | null = null;
  let current: NavItem[] = [];
  for (const item of this.items()) {
    if (item.section !== currentSection) {
      if (current.length) groups.push({ section: currentSection, items: current });
      currentSection = item.section ?? null;
      current = [];
    }
    current.push(item);
  }
  if (current.length) groups.push({ section: currentSection, items: current });
  return groups;
});
```

- [ ] **Step 1:** Create `collapsible-nav.component.ts`
- [ ] **Step 2:** Create `collapsible-nav.component.html` — fixed-width sidebar with transition, section headers, nav items with icon+label+badge, child items indented, collapse toggle button. In collapsed mode show only icons with `title` tooltip.
- [ ] **Step 3:** Create `collapsible-nav.spec.ts` — test: items render, toggleExpand shows/hides children, active route highlights item, collapsed mode changes width, disabled item doesn't emit click
- [ ] **Step 4:** Create `collapsible-nav.stories.ts` — stories: Default, WithSections, WithBadges, Collapsed, WithActiveRoute
- [ ] **Step 5:** Create `index.ts` exporting `UiCollapsibleNavComponent`, `NavItem`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep collapsible-nav`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/collapsible-nav/
git commit -m "feat: add UiCollapsibleNavComponent"
```

---

## Task 12: UiResizablePanelsComponent

**Files:**
- Create: `src/lib/components/layout/resizable-panels/resizable-panels.component.ts`
- Create: `src/lib/components/layout/resizable-panels/resizable-panels.component.html`
- Create: `src/lib/components/layout/resizable-panels/resizable-panels.spec.ts`
- Create: `src/lib/components/layout/resizable-panels/resizable-panels.stories.ts`
- Create: `src/lib/components/layout/resizable-panels/index.ts`

**Component API:**
```ts
direction = input<'horizontal'|'vertical'>('horizontal');
initialSizes = input<[number, number]>([50, 50]);
minSizes = input<[number, number]>([10, 10]);
gutterSize = input<number>(6);

readonly sizesChange = output<[number, number]>();
```

**Key implementation:**
```ts
sizes = signal<[number, number]>([50, 50]);
isDragging = signal<boolean>(false);
hostEl = inject(ElementRef);

constructor() {
  effect(() => { this.sizes.set([...this.initialSizes()]); });
}

onGutterPointerDown(e: PointerEvent): void {
  e.preventDefault();
  this.isDragging.set(true);
  const host = this.hostEl.nativeElement as HTMLElement;
  const rect = host.getBoundingClientRect();
  const isH = this.direction() === 'horizontal';
  const totalSize = isH ? rect.width : rect.height;
  const [minA, minB] = this.minSizes();

  const onMove = (me: PointerEvent) => {
    const pos = isH ? me.clientX - rect.left : me.clientY - rect.top;
    let pct = (pos / totalSize) * 100;
    pct = Math.max(minA, Math.min(100 - minB, pct));
    this.sizes.set([pct, 100 - pct]);
    this.sizesChange.emit([pct, 100 - pct]);
  };
  const onUp = () => {
    this.isDragging.set(false);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  };
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
}

onGutterDblClick(): void {
  this.sizes.set([...this.initialSizes()]);
  this.sizesChange.emit([...this.initialSizes()]);
}
```

**Template:**
```html
<div class="flex h-full w-full" [class.flex-col]="direction() === 'vertical'">
  <div [style.flex]="sizes()[0]" class="overflow-auto min-w-0 min-h-0">
    <ng-content select="[panel-1]" />
  </div>
  <div [style.width.px]="direction()==='horizontal' ? gutterSize() : undefined"
       [style.height.px]="direction()==='vertical' ? gutterSize() : undefined"
       [class]="isDragging() ? 'bg-primary/30' : 'bg-border hover:bg-primary/20'"
       class="cursor-col-resize flex-shrink-0 transition-colors"
       (pointerdown)="onGutterPointerDown($event)"
       (dblclick)="onGutterDblClick()">
  </div>
  <div [style.flex]="sizes()[1]" class="overflow-auto min-w-0 min-h-0">
    <ng-content select="[panel-2]" />
  </div>
</div>
```

- [ ] **Step 1:** Create `resizable-panels.component.ts` with pointer event drag logic
- [ ] **Step 2:** Create `resizable-panels.component.html`
- [ ] **Step 3:** Create `resizable-panels.spec.ts` — test: initialSizes applied, sizesChange emits on drag, double-click resets to initialSizes, sizes don't go below minSizes
- [ ] **Step 4:** Create `resizable-panels.stories.ts` — stories: Horizontal5050, Vertical3070, WithMinSizes, CustomGutter
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep resizable-panels`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/resizable-panels/
git commit -m "feat: add UiResizablePanelsComponent"
```

---

## Task 13: UiSplitScreenComponent

**Files:**
- Create: `src/lib/components/layout/split-screen/split-screen.component.ts`
- Create: `src/lib/components/layout/split-screen/split-screen.component.html`
- Create: `src/lib/components/layout/split-screen/split-screen.spec.ts`
- Create: `src/lib/components/layout/split-screen/split-screen.stories.ts`
- Create: `src/lib/components/layout/split-screen/index.ts`

**Component API:**
```ts
ratio = input<'50/50'|'40/60'|'60/40'|'30/70'|'70/30'>('50/50');
mobileStack = input<'left-first'|'right-first'|'right-hidden'>('left-first');
gap = input<boolean>(false);
fullHeight = input<boolean>(true);
```

**Key implementation:**
```ts
leftClass = computed(() => {
  const r: Record<string, string> = {
    '50/50': 'md:w-1/2', '40/60': 'md:w-2/5', '60/40': 'md:w-3/5',
    '30/70': 'md:w-3/10', '70/30': 'md:w-7/10',
  };
  return r[this.ratio()] ?? 'md:w-1/2';
});

rightClass = computed(() => {
  const r: Record<string, string> = {
    '50/50': 'md:w-1/2', '40/60': 'md:w-3/5', '60/40': 'md:w-2/5',
    '30/70': 'md:w-7/10', '70/30': 'md:w-3/10',
  };
  return r[this.ratio()] ?? 'md:w-1/2';
});

rightVisible = computed(() => this.mobileStack() !== 'right-hidden');
mobileOrder = computed(() => this.mobileStack() === 'right-first' ? 'flex-col-reverse' : 'flex-col');
```

**Template:**
```html
<div [class]="'flex w-full ' + mobileOrder() + ' md:flex-row' + (fullHeight() ? ' min-h-screen' : '') + (gap() ? ' gap-4' : '')">
  <div [class]="leftClass() + ' w-full'">
    <ng-content select="[left]" />
  </div>
  @if (rightVisible()) {
    <div [class]="rightClass() + ' w-full'">
      <ng-content select="[right]" />
    </div>
  }
</div>
```

- [ ] **Step 1:** Create `split-screen.component.ts`
- [ ] **Step 2:** Create `split-screen.component.html`
- [ ] **Step 3:** Create `split-screen.spec.ts` — test: right-hidden hides right panel, ratio classes applied, mobileStack order applied
- [ ] **Step 4:** Create `split-screen.stories.ts` — stories: Equal5050, AsymmetricLogin (60/40, right-hidden on mobile), Comparison (50/50, both panels visible), WithGap
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep split-screen`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/split-screen/
git commit -m "feat: add UiSplitScreenComponent"
```

---

## Task 14: UiDashboardGridComponent

**Files:**
- Create: `src/lib/components/layout/dashboard-grid/dashboard-grid.component.ts`
- Create: `src/lib/components/layout/dashboard-grid/dashboard-grid.component.html`
- Create: `src/lib/components/layout/dashboard-grid/dashboard-grid.spec.ts`
- Create: `src/lib/components/layout/dashboard-grid/dashboard-grid.stories.ts`
- Create: `src/lib/components/layout/dashboard-grid/index.ts`

**Interface:**
```ts
export interface GridItem {
  id: string;
  x: number; y: number;
  w: number; h: number;
  minW?: number; minH?: number;
  maxW?: number; maxH?: number;
  static?: boolean;
}
```

**Component API:**
```ts
items = model<GridItem[]>([]);
columns = input<number>(12);
rowHeight = input<number>(80);
gap = input<number>(16);
editable = input<boolean>(true);
compact = input<boolean>(true);

readonly layoutChange = output<GridItem[]>();
```

**Key implementation:**
```ts
hostEl = inject(ElementRef);

cellWidth = computed(() => {
  // computed in afterNextRender; fallback to 60px per column
  return this.containerWidth() / this.columns();
});
containerWidth = signal<number>(960);

itemStyle(item: GridItem): Record<string, string> {
  const cw = this.cellWidth();
  const rh = this.rowHeight();
  const g = this.gap();
  return {
    position: 'absolute',
    left: `${item.x * cw + (item.x > 0 ? g : 0)}px`,
    top: `${item.y * rh + (item.y > 0 ? g : 0)}px`,
    width: `${item.w * cw - g}px`,
    height: `${item.h * rh - g}px`,
    transition: 'left 0.2s, top 0.2s',
  };
}

// Drag to move
onItemDragStart(e: DragEvent, item: GridItem): void {
  if (!this.editable() || item.static) { e.preventDefault(); return; }
  e.dataTransfer?.setData('itemId', item.id);
}

onGridDrop(e: DragEvent): void {
  e.preventDefault();
  const id = e.dataTransfer?.getData('itemId');
  if (!id) return;
  const rect = (this.hostEl.nativeElement as HTMLElement).getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / this.cellWidth());
  const y = Math.floor((e.clientY - rect.top) / this.rowHeight());
  this.items.update(its => its.map(i =>
    i.id === id ? { ...i, x: Math.max(0, x), y: Math.max(0, y) } : i
  ));
  if (this.compact()) this.runCompact();
  this.layoutChange.emit(this.items());
}

private runCompact(): void {
  // Simple upward compaction: sort by y then x, move each item up as far as possible
  const its = [...this.items()].sort((a, b) => a.y - b.y || a.x - b.x);
  const placed: GridItem[] = [];
  for (const item of its) {
    let y = 0;
    while (this.collides(placed, { ...item, y })) y++;
    placed.push({ ...item, y });
  }
  this.items.set(placed);
}

private collides(placed: GridItem[], item: GridItem): boolean {
  return placed.some(p =>
    p.id !== item.id &&
    p.x < item.x + item.w && p.x + p.w > item.x &&
    p.y < item.y + item.h && p.y + p.h > item.y
  );
}

gridHeight = computed(() => {
  const maxY = Math.max(...this.items().map(i => i.y + i.h), 0);
  return maxY * this.rowHeight() + this.gap();
});
```

- [ ] **Step 1:** Create `dashboard-grid.component.ts`
- [ ] **Step 2:** Create `dashboard-grid.component.html` — `position: relative` wrapper div with computed height; `@for` items rendered as absolutely positioned divs with drag handle header and resize handle; `(dragover)`, `(drop)` on wrapper
- [ ] **Step 3:** Create `dashboard-grid.spec.ts` — test: items positioned correctly, compact mode moves items up, static items don't move, collision detection prevents overlap
- [ ] **Step 4:** Create `dashboard-grid.stories.ts` — stories: Default4Items, NonEditable, CompactMode, WithStaticItem
- [ ] **Step 5:** Create `index.ts` exporting `UiDashboardGridComponent`, `GridItem`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep dashboard-grid`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/dashboard-grid/
git commit -m "feat: add UiDashboardGridComponent"
```

---

## Task 15: UiScrollSpyComponent

**Files:**
- Create: `src/lib/components/layout/scroll-spy/scroll-spy.component.ts`
- Create: `src/lib/components/layout/scroll-spy/scroll-spy.component.html`
- Create: `src/lib/components/layout/scroll-spy/scroll-spy.spec.ts`
- Create: `src/lib/components/layout/scroll-spy/scroll-spy.stories.ts`
- Create: `src/lib/components/layout/scroll-spy/index.ts`

**Interface:**
```ts
export interface ScrollSpyItem {
  id: string;
  label: string;
  icon?: unknown;
}
```

**Component API:**
```ts
items = input.required<ScrollSpyItem[]>();
offset = input<number>(80);
smooth = input<boolean>(true);
orientation = input<'vertical'|'horizontal'>('vertical');
activeClass = input<string>('');

readonly activeChange = output<string>();
```

**Key implementation:**
```ts
activeId = signal<string>('');
private observers: IntersectionObserver[] = [];

constructor() {
  afterNextRender(() => this.initObservers());
}

private initObservers(): void {
  this.observers.forEach(o => o.disconnect());
  this.observers = [];
  const margin = `-${this.offset()}px 0px -50% 0px`;
  for (const item of this.items()) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.activeId.set(item.id);
          this.activeChange.emit(item.id);
        }
      },
      { rootMargin: margin, threshold: 0 }
    );
    obs.observe(el);
    this.observers.push(obs);
  }
}

scrollTo(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: this.smooth() ? 'smooth' : 'auto', block: 'start' });
}

ngOnDestroy(): void {
  this.observers.forEach(o => o.disconnect());
}
```

- [ ] **Step 1:** Create `scroll-spy.component.ts`
- [ ] **Step 2:** Create `scroll-spy.component.html` — nav list with items; active item gets `text-primary font-medium` + `activeClass()` CSS; clicking scrolls to target; `@if (item.icon)` shows Lucide icon
- [ ] **Step 3:** Create `scroll-spy.spec.ts` — test: items render, scrollTo called on click, activeId updates when item becomes active, ngOnDestroy disconnects observers
- [ ] **Step 4:** Create `scroll-spy.stories.ts` — stories: Vertical (default), Horizontal, WithIcons, CustomActiveClass
- [ ] **Step 5:** Create `index.ts` exporting `UiScrollSpyComponent`, `ScrollSpyItem`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep scroll-spy`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/scroll-spy/
git commit -m "feat: add UiScrollSpyComponent"
```

---

## Task 16: UiStickyHeaderComponent

**Files:**
- Create: `src/lib/components/layout/sticky-header/sticky-header.component.ts`
- Create: `src/lib/components/layout/sticky-header/sticky-header.component.html`
- Create: `src/lib/components/layout/sticky-header/sticky-header.spec.ts`
- Create: `src/lib/components/layout/sticky-header/sticky-header.stories.ts`
- Create: `src/lib/components/layout/sticky-header/index.ts`

**Component API:**
```ts
scrollThreshold = input<number>(60);
shrink = input<boolean>(true);
blur = input<boolean>(true);
hideOnScrollDown = input<boolean>(false);
zIndex = input<number>(50);
```

**Key implementation:**
```ts
isScrolled = signal<boolean>(false);
isVisible = signal<boolean>(true);
private lastScrollY = 0;

constructor() {
  afterNextRender(() => {
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
  });
}

private onScroll(): void {
  const y = window.scrollY;
  this.isScrolled.set(y > this.scrollThreshold());
  if (this.hideOnScrollDown()) {
    this.isVisible.set(y < this.lastScrollY || y <= this.scrollThreshold());
  }
  this.lastScrollY = y;
}

headerClass = computed(() => {
  const classes = ['sticky top-0 w-full transition-all duration-300'];
  classes.push(`z-[${this.zIndex()}]`);
  if (this.isScrolled()) {
    if (this.blur()) classes.push('backdrop-blur-md bg-background/80 border-b border-border shadow-sm');
    if (this.shrink()) classes.push('py-2');
    else classes.push('py-4');
  } else {
    classes.push('py-4 bg-transparent');
  }
  if (!this.isVisible()) classes.push('-translate-y-full');
  return classes.join(' ');
});

ngOnDestroy(): void {
  window.removeEventListener('scroll', this.onScroll.bind(this));
}
```

- [ ] **Step 1:** Create `sticky-header.component.ts`
- [ ] **Step 2:** Create `sticky-header.component.html` — `<header [class]="headerClass()"><ng-content /></header>`
- [ ] **Step 3:** Create `sticky-header.spec.ts` — test: isScrolled true after scroll past threshold, isVisible false on scroll down when hideOnScrollDown, headerClass includes backdrop-blur when scrolled + blur, shrink applies padding change
- [ ] **Step 4:** Create `sticky-header.stories.ts` — stories: Default, WithBlur, HideOnScrollDown, NoShrink. Use a tall container div in the story to enable scrolling.
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep sticky-header`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/sticky-header/
git commit -m "feat: add UiStickyHeaderComponent"
```

---

## Task 17: UiLoadingScreenComponent

**Files:**
- Create: `src/lib/components/layout/loading-screen/loading-screen.component.ts`
- Create: `src/lib/components/layout/loading-screen/loading-screen.component.html`
- Create: `src/lib/components/layout/loading-screen/loading-screen.spec.ts`
- Create: `src/lib/components/layout/loading-screen/loading-screen.stories.ts`
- Create: `src/lib/components/layout/loading-screen/index.ts`

**Component API:**
```ts
visible = model<boolean>(true);
progress = input<number | null>(null);   // 0-100; null = indeterminate
message = input<string>('Loading...');
overlay = input<boolean>(false);

readonly hidden = output<void>();
```

**Key implementation:**
```ts
isAnimatingOut = signal<boolean>(false);

constructor() {
  effect(() => {
    if (!this.visible() && !this.isAnimatingOut()) {
      this.isAnimatingOut.set(true);
      setTimeout(() => {
        this.isAnimatingOut.set(false);
        this.hidden.emit();
      }, 300); // match CSS transition
    }
  });
}

containerClass = computed(() => {
  const base = this.overlay()
    ? 'fixed inset-0 z-[9999]'
    : 'w-full h-full min-h-screen';
  const anim = this.isAnimatingOut() ? 'opacity-0' : 'opacity-100';
  return `${base} flex flex-col items-center justify-center bg-background transition-opacity duration-300 ${anim}`;
});

showContent = computed(() => this.visible() || this.isAnimatingOut());
```

**Template:**
```html
@if (showContent()) {
  <div [class]="containerClass()">
    <ng-content select="[logo]" />
    <div class="mt-8 w-48">
      @if (progress() !== null) {
        <div class="w-full bg-muted rounded-full h-2">
          <div class="bg-primary h-2 rounded-full transition-all duration-300"
               [style.width.%]="progress()"></div>
        </div>
        <p class="text-center text-sm text-muted-foreground mt-2">{{ progress() }}%</p>
      } @else {
        <div class="flex justify-center">
          <div class="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      }
    </div>
    <p class="mt-4 text-muted-foreground text-sm">{{ message() }}</p>
  </div>
}
```

- [ ] **Step 1:** Create `loading-screen.component.ts`
- [ ] **Step 2:** Create `loading-screen.component.html`
- [ ] **Step 3:** Create `loading-screen.spec.ts` — test: visible=true renders, visible=false hides after 300ms, hidden emits after animation, progress bar width matches progress(), null progress shows spinner
- [ ] **Step 4:** Create `loading-screen.stories.ts` — stories: Indeterminate, WithProgress50, WithLogo, OverlayMode
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep loading-screen`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/loading-screen/
git commit -m "feat: add UiLoadingScreenComponent"
```

---

## Task 18: UiOnboardingLayoutComponent

**Files:**
- Create: `src/lib/components/layout/onboarding-layout/onboarding-layout.component.ts`
- Create: `src/lib/components/layout/onboarding-layout/onboarding-layout.component.html`
- Create: `src/lib/components/layout/onboarding-layout/onboarding-layout.spec.ts`
- Create: `src/lib/components/layout/onboarding-layout/onboarding-layout.stories.ts`
- Create: `src/lib/components/layout/onboarding-layout/index.ts`

**Interface:**
```ts
export interface OnboardingFeature {
  icon: unknown;
  title: string;
  description: string;
}
```

**Component API:**
```ts
title = input<string>('');
subtitle = input<string>('');
features = input<OnboardingFeature[]>([]);
primaryCta = input<string>('Get Started');
secondaryCta = input<string | null>(null);
showProgress = input<boolean>(false);
currentStep = input<number>(0);
totalSteps = input<number>(0);

readonly primaryClicked = output<void>();
readonly secondaryClicked = output<void>();
```

**Template:**
```html
<div class="min-h-screen bg-background flex flex-col items-center justify-center p-8">
  <ng-content select="[illustration]" />
  @if (title()) { <h1 class="text-4xl font-bold text-foreground mt-6 text-center">{{ title() }}</h1> }
  @if (subtitle()) { <p class="text-muted-foreground mt-2 text-center max-w-lg">{{ subtitle() }}</p> }
  @if (features().length) {
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-3xl w-full">
      @for (f of features(); track f.title) {
        <div class="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border">
          <lucide-icon [img]="f.icon" class="text-primary mb-3" [size]="28" />
          <h3 class="font-semibold text-foreground">{{ f.title }}</h3>
          <p class="text-sm text-muted-foreground mt-1">{{ f.description }}</p>
        </div>
      }
    </div>
  }
  @if (showProgress() && totalSteps() > 0) {
    <div class="flex gap-2 mt-8">
      @for (_ of stepDots(); track $index) {
        <div [class]="$index === currentStep() ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-muted'"
             class="rounded-full transition-all duration-300"></div>
      }
    </div>
  }
  <div class="flex flex-col sm:flex-row gap-3 mt-8">
    <button (click)="primaryClicked.emit()" class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90">
      {{ primaryCta() }}
    </button>
    @if (secondaryCta()) {
      <button (click)="secondaryClicked.emit()" class="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent">
        {{ secondaryCta() }}
      </button>
    }
  </div>
  <ng-content select="[footer]" />
</div>
```

```ts
stepDots = computed(() => Array.from({ length: this.totalSteps() }));
```

- [ ] **Step 1:** Create `onboarding-layout.component.ts`
- [ ] **Step 2:** Create `onboarding-layout.component.html`
- [ ] **Step 3:** Create `onboarding-layout.spec.ts` — test: title renders, features grid shows, progress dots correct count, active dot at currentStep, primaryClicked emits, secondaryCta hidden when null
- [ ] **Step 4:** Create `onboarding-layout.stories.ts` — stories: Welcome (no features), WithFeatures (3 items), WithProgress (step 2 of 4), WithSecondaryCta
- [ ] **Step 5:** Create `index.ts` exporting `UiOnboardingLayoutComponent`, `OnboardingFeature`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep onboarding-layout`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/onboarding-layout/
git commit -m "feat: add UiOnboardingLayoutComponent"
```

---

## Task 19: UiSplitLayoutComponent

**Files:**
- Create: `src/lib/components/layout/split-layout/split-layout.component.ts`
- Create: `src/lib/components/layout/split-layout/split-layout.component.html`
- Create: `src/lib/components/layout/split-layout/split-layout.spec.ts`
- Create: `src/lib/components/layout/split-layout/split-layout.stories.ts`
- Create: `src/lib/components/layout/split-layout/index.ts`

**Component API:**
```ts
imagePosition = input<'left'|'right'>('left');
imageSrc = input<string | null>(null);
imageAlt = input<string>('');
overlayColor = input<string | null>(null);
mobileImageVisible = input<boolean>(false);
```

**Key implementation:**
```ts
imagePanelClass = computed(() => {
  const pos = this.imagePosition() === 'left' ? 'order-first' : 'order-last';
  const mobile = this.mobileImageVisible() ? '' : 'hidden md:block';
  return `relative w-full md:w-1/2 min-h-64 md:min-h-screen ${mobile} ${pos}`;
});

imageStyle = computed((): Record<string, string> => {
  const styles: Record<string, string> = {};
  if (this.imageSrc()) {
    styles['backgroundImage'] = `url(${this.imageSrc()})`;
    styles['backgroundSize'] = 'cover';
    styles['backgroundPosition'] = 'center';
  }
  return styles;
});
```

**Template:**
```html
<div class="flex flex-col md:flex-row min-h-screen">
  <!-- Image panel -->
  <div [class]="imagePanelClass()" [style]="imageStyle()">
    @if (overlayColor()) {
      <div class="absolute inset-0" [style.background]="overlayColor()"></div>
    }
    <div class="relative z-10 h-full">
      <ng-content select="[image-content]" />
    </div>
  </div>
  <!-- Content panel -->
  <div class="w-full md:w-1/2 flex items-center justify-center p-8">
    <ng-content select="[content]" />
  </div>
</div>
```

- [ ] **Step 1:** Create `split-layout.component.ts`
- [ ] **Step 2:** Create `split-layout.component.html`
- [ ] **Step 3:** Create `split-layout.spec.ts` — test: imageSrc sets background-image style, overlayColor renders overlay div, imagePosition right applies order-last, mobileImageVisible false hides image on mobile
- [ ] **Step 4:** Create `split-layout.stories.ts` — stories: LoginPage (image left, form right), RightImage, WithOverlay (semi-transparent dark overlay), MobileImageVisible
- [ ] **Step 5:** Create `index.ts`
- [ ] **Step 6:** Verify: `npx tsc --noEmit 2>&1 | grep split-layout`
- [ ] **Step 7:** Commit
```bash
git add src/lib/components/layout/split-layout/
git commit -m "feat: add UiSplitLayoutComponent"
```

---

## Task 20: Integration — Barrel Files, Dependencies, Build, Version

**Files to modify:**
- `src/lib/components/form/index.ts` — append 10 new form component exports
- `src/lib/components/layout/index.ts` — append 9 new layout component exports
- `package.json` — add CodeMirror packages to peerDependencies + devDependencies

- [ ] **Step 1:** Install CodeMirror devDependencies
```bash
npm install --save-dev @codemirror/basic-setup @codemirror/state @codemirror/view \
  @codemirror/lang-javascript @codemirror/lang-json @codemirror/lang-html \
  @codemirror/lang-css @codemirror/lang-python --legacy-peer-deps
```

- [ ] **Step 2:** Update `package.json` peerDependencies — add CodeMirror entries:
```json
"@codemirror/basic-setup": ">=0.20.0",
"@codemirror/state": ">=6.0.0",
"@codemirror/view": ">=6.0.0",
"@codemirror/lang-javascript": ">=6.0.0",
"@codemirror/lang-json": ">=6.0.0",
"@codemirror/lang-html": ">=6.0.0",
"@codemirror/lang-css": ">=6.0.0",
"@codemirror/lang-python": ">=6.0.0"
```

- [ ] **Step 3:** Append to `src/lib/components/form/index.ts`:
```ts
export * from './phone-input';
export * from './credit-card-input';
export * from './address-input';
export * from './iban-input';
export * from './code-editor';
export * from './json-editor';
export * from './formula-editor';
export * from './wizard';
export * from './dynamic-form';
export * from './field-array';
```

- [ ] **Step 4:** Append to `src/lib/components/layout/index.ts`:
```ts
export * from './collapsible-nav';
export * from './resizable-panels';
export * from './split-screen';
export * from './dashboard-grid';
export * from './scroll-spy';
export * from './sticky-header';
export * from './loading-screen';
export * from './onboarding-layout';
export * from './split-layout';
```

- [ ] **Step 5:** Run TypeScript check — must be zero errors in non-spec files:
```bash
npx tsc --noEmit 2>&1 | grep -v '\.spec\.ts' | grep -v '\.stories\.ts' | grep 'error TS'
```
Expected: no output.

- [ ] **Step 6:** Build library:
```bash
npm run build
```
Expected: all entry points show `✔ Built @fechorapps/ui/...`

- [ ] **Step 7:** Bump version to 1.5.0:
```bash
npm version minor --no-git-tag-version
```

- [ ] **Step 8:** Commit and tag:
```bash
git add src/lib/components/form/index.ts src/lib/components/layout/index.ts package.json package-lock.json
git commit -m "feat: Wave 3 — 19 new components (v1.5.0)

Complex inputs: phone-input, credit-card-input, address-input, iban-input
Editors: code-editor, json-editor, formula-editor
Form flows: wizard, dynamic-form, field-array
Layout shells: collapsible-nav, resizable-panels, split-screen, dashboard-grid
Navigation patterns: scroll-spy, sticky-header, loading-screen, onboarding-layout, split-layout"
git tag v1.5.0
```

- [ ] **Step 9:** Publish to GitHub Packages:
```bash
npm run build && cd dist && npm publish
```
