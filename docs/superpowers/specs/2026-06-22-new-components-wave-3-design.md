# New Components Wave 3 — Design Spec
**Date:** 2026-06-22  
**Version target:** 1.5.0  
**Scope:** 19 new Angular components across 5 batches (advanced forms, editors, form flows, layout shells, navigation patterns)

---

## Context

`@fechorapps/ui` currently ships 90+ components across 18 secondary entry points. This wave adds breadth across two underserved areas: **advanced form inputs/editors** and **layout/navigation shells**, targeting both SaaS dashboards and consumer-facing apps.

Charts/widgets are deferred pending analysis of the pisca/buba project dashboards.

---

## Batch 1 — Complex Inputs (`@fechorapps/ui/form`)

### `UiPhoneInputComponent` (`ui-phone-input`)
International phone number input with country dial-code selector.

**Inputs:**
- `value = model<string>('')` — E.164 formatted output (e.g. `+521234567890`)
- `defaultCountry = input<string>('MX')` — ISO 3166-1 alpha-2
- `preferredCountries = input<string[]>([])` — shown at top of dropdown
- `placeholder = input<string>('')`
- `disabled = input<boolean>(false)`
- `label = input<string>('')`

**Outputs:** `output<string>('phoneChange')`, `output<boolean>('validChange')`

**Behavior:** Dropdown with flag emoji + country name + dial code. Input formats digits as user types. Validation: checks minimum digit count per country (built-in static map — no external lib). `validChange` emits on each keystroke.

**Dependencies:** None (pure Angular + static country data embedded).

---

### `UiCreditCardInputComponent` (`ui-credit-card-input`)
Card number, expiry, and CVV fields with auto-formatting and card type detection.

**Inputs:**
- `value = model<CreditCardValue>({number:'', expiry:'', cvv:''})` 
- `showCvv = input<boolean>(true)`
- `showCardIcon = input<boolean>(true)`
- `disabled = input<boolean>(false)`

**Types:**
```ts
export interface CreditCardValue {
  number: string;   // raw digits only
  expiry: string;   // MM/YY
  cvv: string;
}
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';
```

**Outputs:** `output<CreditCardValue>('cardChange')`, `output<CardType>('cardTypeChange')`, `output<boolean>('validChange')`

**Behavior:**
- Number field: formats with spaces (`4111 1111 1111 1111`), detects type from prefix (Visa: 4, MC: 51-55, Amex: 34/37)
- Expiry field: auto-inserts `/`, validates month 01-12 and future date
- CVV: 3 digits (4 for Amex), masked by default with toggle
- Card icon: SVG inline icons per brand, shown next to number field

**Dependencies:** None.

---

### `UiAddressInputComponent` (`ui-address-input`)
Address search input — provider-agnostic via a search function input.

**Inputs:**
- `value = model<AddressValue | null>(null)`
- `searchFn = input.required<(query: string) => Promise<AddressSuggestion[]>>()`
- `placeholder = input<string>('Search address...')`
- `debounceMs = input<number>(300)`
- `minChars = input<number>(3)`
- `disabled = input<boolean>(false)`
- `showManualEntry = input<boolean>(true)` — fallback form for manual input

**Types:**
```ts
export interface AddressSuggestion {
  id: string;
  label: string;         // display text in dropdown
  value: AddressValue;
}
export interface AddressValue {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  raw?: string;          // full formatted string
}
```

**Outputs:** `output<AddressValue>('addressSelected')`

**Behavior:** Typeahead dropdown populated by `searchFn`. Debounces calls. If `showManualEntry`, shows a "Enter manually" option at bottom that expands a structured form (street, city, state, postal code, country). Consumer wires `searchFn` to their preferred API (Google Places, MapBox, etc.).

**Dependencies:** None (consumer provides search function).

---

### `UiIbanInputComponent` (`ui-iban-input`)
IBAN input with per-country formatting and length validation.

**Inputs:**
- `value = model<string>('')` — raw IBAN without spaces
- `country = input<string | null>(null)` — if null, auto-detects from input prefix
- `showBankName = input<boolean>(false)` — reserved for future lookup slot
- `disabled = input<boolean>(false)`
- `label = input<string>('IBAN')`

**Outputs:** `output<string>('ibanChange')`, `output<boolean>('validChange')`

**Behavior:** Formats in groups of 4 (e.g., `ES91 2100 0418`). Validates length per country code using a built-in static map of 30+ countries. Shows validity indicator (green check / red X). Copy-to-clipboard button.

**Dependencies:** None.

---

## Batch 2 — Editors (`@fechorapps/ui/form`)

### `UiCodeEditorComponent` (`ui-code-editor`)
Lightweight code editor with syntax highlighting.

**Inputs:**
- `value = model<string>('')`
- `language = input<'typescript'|'javascript'|'json'|'html'|'css'|'python'|'bash'>('typescript')`
- `theme = input<'light'|'dark'>('light')`
- `readonly = input<boolean>(false)`
- `lineNumbers = input<boolean>(true)`
- `minimap = input<boolean>(false)`
- `height = input<string>('300px')`
- `placeholder = input<string>('')`

**Outputs:** `output<string>('codeChange')`

**Implementation approach:** Use `@codemirror/basic-setup` (CodeMirror 6) — ~150KB gzipped, tree-shakeable. Loaded lazily via dynamic `import()` inside an `afterNextRender` + `effect`. Falls back to a styled `<textarea>` if CodeMirror fails to load.

**peerDependencies added:**
```json
"@codemirror/basic-setup": ">=0.20.0",
"@codemirror/lang-javascript": ">=6.0.0",
"@codemirror/lang-json": ">=6.0.0",
"@codemirror/lang-html": ">=6.0.0",
"@codemirror/lang-css": ">=6.0.0",
"@codemirror/lang-python": ">=6.0.0"
```

---

### `UiJsonEditorComponent` (`ui-json-editor`)
Visual JSON tree editor with raw mode toggle.

**Inputs:**
- `value = model<unknown>(null)`
- `mode = model<'tree'|'raw'>('tree')`
- `readonly = input<boolean>(false)`
- `maxDepth = input<number>(10)`
- `expandAll = input<boolean>(false)`
- `showTypes = input<boolean>(true)`

**Outputs:** `output<unknown>('valueChange')`, `output<string>('parseError')`

**Behavior:**
- Tree mode: collapsible nodes, type badges (string/number/boolean/array/object/null), inline edit on click, add/delete key buttons
- Raw mode: falls back to `UiCodeEditorComponent` with `language="json"` 
- Toggle between modes preserves value
- Parse errors shown inline without losing the raw text

**Dependencies:** `UiCodeEditorComponent` (same batch, for raw mode).

---

### `UiFormulaEditorComponent` (`ui-formula-editor`)
Excel-style formula input with function autocomplete.

**Inputs:**
- `value = model<string>('')`
- `functions = input<FormulaFunction[]>([])` — consumer-defined functions
- `variables = input<string[]>([])` — available variable names
- `builtins = input<boolean>(true)` — include SUM, AVG, IF, CONCAT, etc.
- `disabled = input<boolean>(false)`

**Types:**
```ts
export interface FormulaFunction {
  name: string;
  description: string;
  args: string[];        // e.g. ['value', 'min', 'max']
  example: string;
}
```

**Outputs:** `output<string>('formulaChange')`, `output<boolean>('validChange')`

**Behavior:** Single-line input starting with `=`. As user types a function name, shows a tooltip with signature + description. Autocomplete dropdown for function names and variable names. Basic syntax validation (balanced parentheses, known function names). Does NOT evaluate — consumer evaluates.

**Dependencies:** None.

---

## Batch 3 — Form Flows (`@fechorapps/ui/form`, `@fechorapps/ui/panel`)

### `UiWizardComponent` (`ui-wizard`)
Multi-step form container with per-step validation.

**Inputs:**
- `steps = input.required<WizardStep[]>()`
- `currentStep = model<number>(0)`
- `linear = input<boolean>(true)` — if false, user can jump to any step
- `showStepNumbers = input<boolean>(true)`
- `nextLabel = input<string>('Next')`
- `backLabel = input<string>('Back')`
- `finishLabel = input<string>('Finish')`
- `orientation = input<'horizontal'|'vertical'>('horizontal')`

**Types:**
```ts
export interface WizardStep {
  label: string;
  description?: string;
  icon?: unknown;        // Lucide icon
  valid?: boolean;       // consumer sets this to enable Next
  optional?: boolean;
}
```

**Outputs:** `output<number>('stepChange')`, `output<void>('finished')`, `output<number>('stepSkipped')`

**Behavior:** Renders step indicator (reuses `UiStepperComponent` visuals) + `<ng-content select="[step-N]">` projection slots. `Next` disabled when `steps()[currentStep()].valid === false`. In non-linear mode, past steps are clickable. Step content projected via named slots.

**Note:** Extends the visual design of the existing `UiStepperComponent` but adds content projection and validation logic.

---

### `UiDynamicFormComponent` (`ui-dynamic-form`)
Renders a complete reactive form from a JSON schema definition.

**Inputs:**
- `schema = input.required<DynamicFormSchema>()`
- `value = model<Record<string, unknown>>({})`
- `disabled = input<boolean>(false)`
- `layout = input<'single'|'two-column'|'auto'>('auto')`

**Types:**
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
  options?: { label: string; value: unknown }[];   // for select/radio
  validation?: {
    min?: number; max?: number;
    minLength?: number; maxLength?: number;
    pattern?: string;
    custom?: (v: unknown) => string | null;
  };
  showWhen?: { field: string; equals: unknown };   // conditional visibility
  colspan?: 1 | 2;                                  // for two-column layout
}

export interface DynamicFormSchema {
  fields: DynamicField[];
  submitLabel?: string;
}
```

**Outputs:** `output<Record<string, unknown>>('formSubmit')`, `output<Record<string, unknown>>('valueChange')`, `output<boolean>('validChange')`

**Behavior:** Creates Angular reactive form internally from schema. Maps each `FieldType` to the corresponding `@fechorapps/ui` form component (text → `ui-input-text`, select → `ui-select`, etc.). Conditional fields shown/hidden via `showWhen`. Emits current value on every change.

**Dependencies:** Existing form components from the library.

---

### `UiFieldArrayComponent` (`ui-field-array`)
Repeating group of fields (array of objects).

**Inputs:**
- `value = model<Record<string, unknown>[]>([])`
- `schema = input.required<DynamicField[]>()` — fields in each row
- `minItems = input<number>(0)`
- `maxItems = input<number | null>(null)`
- `addLabel = input<string>('Add item')`
- `sortable = input<boolean>(false)` — drag to reorder rows
- `disabled = input<boolean>(false)`

**Outputs:** `output<Record<string, unknown>[]>('valueChange')`

**Behavior:** Renders a list of row groups, each containing the fields from `schema`. Add button appends an empty row. Delete button removes a row (disabled if at `minItems`). If `sortable`, rows have a drag handle (HTML5 drag API). Designed to be used inside `UiDynamicFormComponent` or standalone.

---

## Batch 4 — Layout Shells (`@fechorapps/ui/layout`)

### `UiCollapsibleNavComponent` (`ui-collapsible-nav`)
Multi-level collapsible sidebar navigation.

**Inputs:**
- `items = input.required<NavItem[]>()`
- `collapsed = model<boolean>(false)` — rail mode (icons only)
- `activeRoute = input<string>('')` — highlights matching item
- `width = input<string>('260px')`
- `collapsedWidth = input<string>('64px')`
- `showHeader = input<boolean>(true)`

**Types:**
```ts
export interface NavItem {
  id: string;
  label: string;
  icon?: unknown;        // Lucide icon
  route?: string;
  badge?: string | number;
  children?: NavItem[];  // up to 2 levels deep
  section?: string;      // group label above item
  disabled?: boolean;
}
```

**Outputs:** `output<NavItem>('itemClicked')`, `output<boolean>('collapsedChange')`

**Behavior:**
- Collapsed mode: shows only icons with tooltip on hover
- Groups rendered with section headers
- Items with children expand/collapse inline (accordion style)
- Active item highlighted based on `activeRoute` string match
- Smooth CSS transition on collapse/expand
- Toggle button at bottom (or top) to collapse

---

### `UiResizablePanelsComponent` (`ui-resizable-panels`)
Split pane layout with draggable divider.

**Inputs:**
- `direction = input<'horizontal'|'vertical'>('horizontal')`
- `initialSizes = input<[number, number]>([50, 50])` — percentages
- `minSizes = input<[number, number]>([10, 10])` — min % each panel
- `gutterSize = input<number>(6)` — px width of drag handle

**Outputs:** `output<[number, number]>('sizesChange')`

**Behavior:** Two `<ng-content>` slots (`[panel-1]` and `[panel-2]`). Gutter rendered between them. Mouse/pointer events on gutter update panel sizes as computed signals. Sizes stored as percentages for responsive behavior. Double-click on gutter resets to `initialSizes`. Respects `minSizes` — won't collapse below minimum.

---

### `UiSplitScreenComponent` (`ui-split-screen`)
Two-column split layout for login, marketing, and comparison pages.

**Inputs:**
- `ratio = input<'50/50'|'40/60'|'60/40'|'30/70'|'70/30'>('50/50')`
- `mobileStack = input<'left-first'|'right-first'|'right-hidden'>('left-first')`
- `gap = input<boolean>(false)`
- `fullHeight = input<boolean>(true)`

**Behavior:** Two `<ng-content>` projection slots (`[left]` and `[right]`). At `md` breakpoint, stacks vertically per `mobileStack`. `right-hidden` hides the right panel on mobile (common for login pages with a decorative image). Pure CSS/Tailwind layout — no logic.

---

### `UiDashboardGridComponent` (`ui-dashboard-grid`)
Drag-and-drop widget grid layout.

**Inputs:**
- `items = model<GridItem[]>([])`
- `columns = input<number>(12)`
- `rowHeight = input<number>(80)` — px
- `gap = input<number>(16)` — px
- `editable = input<boolean>(true)` — enables drag/resize
- `compact = input<boolean>(true)` — auto-fills empty cells upward

**Types:**
```ts
export interface GridItem {
  id: string;
  x: number; y: number;
  w: number; h: number;  // in grid units
  minW?: number; minH?: number;
  maxW?: number; maxH?: number;
  static?: boolean;      // cannot be moved/resized
}
```

**Outputs:** `output<GridItem[]>('layoutChange')`

**Behavior:** Each item projected via `*ngTemplateOutlet` by `id`. Items positioned with `position: absolute` + computed pixel coordinates. Drag: `pointerdown` on item header moves it; snaps to grid on `pointerup`. Resize: handle at bottom-right corner. Collision detection prevents overlap. `compact` mode runs a simple upward-fill pass after each change. No external grid library.

---

## Batch 5 — Navigation & Page Patterns (`@fechorapps/ui/layout`, `@fechorapps/ui/misc`)

### `UiScrollSpyComponent` (`ui-scroll-spy`)
Highlights navigation item based on currently visible section.

**Inputs:**
- `items = input.required<ScrollSpyItem[]>()`
- `offset = input<number>(80)` — px from top to trigger activation
- `smooth = input<boolean>(true)`
- `orientation = input<'vertical'|'horizontal'>('vertical')`
- `activeClass = input<string>('')`

**Types:**
```ts
export interface ScrollSpyItem {
  id: string;          // matches target element's id
  label: string;
  icon?: unknown;
}
```

**Outputs:** `output<string>('activeChange')`

**Behavior:** Uses `IntersectionObserver` with `rootMargin` adjusted by `offset`. Clicking an item scrolls to the target element. Active item updated as sections enter/leave viewport. Consumer provides target elements with matching `id` attributes.

---

### `UiStickyHeaderComponent` (`ui-sticky-header`)
Header that transforms on scroll (shrinks, changes background, shows/hides elements).

**Inputs:**
- `scrollThreshold = input<number>(60)` — px before transformation triggers
- `shrink = input<boolean>(true)` — reduces padding/height
- `blur = input<boolean>(true)` — adds backdrop-blur when scrolled
- `hideOnScrollDown = input<boolean>(false)` — hides when scrolling down, shows on up
- `zIndex = input<number>(50)`

**Behavior:** Wraps `<ng-content>`. Listens to `window scroll` event (passive). Two signals: `isScrolled` (past threshold) and `isVisible` (for hide-on-scroll-down). Applies Tailwind transition classes. Consumer styles their header content — this component handles the scroll behavior logic only.

---

### `UiLoadingScreenComponent` (`ui-loading-screen`)
Full-page splash/loading screen with progress and logo slot.

**Inputs:**
- `visible = model<boolean>(true)`
- `progress = input<number | null>(null)` — 0-100, null = indeterminate
- `message = input<string>('Loading...')`
- `logoSlot = input<boolean>(true)` — shows `<ng-content select="[logo]">` slot
- `overlay = input<boolean>(false)` — fixed overlay vs full page

**Outputs:** `output<void>('hidden')`

**Behavior:** `@if (visible())` full-screen centered layout with `<ng-content select="[logo]">` slot, message, and progress bar (`UiProgressBarComponent`) or spinner. When `visible` goes false, plays a fade-out animation then emits `hidden`. `overlay` mode uses `position: fixed` + `z-50`.

---

### `UiOnboardingLayoutComponent` (`ui-onboarding-layout`)
Welcome/onboarding page with feature highlights and CTA.

**Inputs:**
- `title = input<string>('')`
- `subtitle = input<string>('')`
- `features = input<OnboardingFeature[]>([])`
- `primaryCta = input<string>('Get Started')`
- `secondaryCta = input<string | null>(null)`
- `showProgress = input<boolean>(false)`
- `currentStep = input<number>(0)`
- `totalSteps = input<number>(0)`

**Types:**
```ts
export interface OnboardingFeature {
  icon: unknown;       // Lucide icon
  title: string;
  description: string;
}
```

**Outputs:** `output<void>('primaryClicked')`, `output<void>('secondaryClicked')`

**Behavior:** Centered layout with headline, subtitle, feature grid (2-3 columns), optional step dots, and CTA buttons. Two `<ng-content>` slots: `[illustration]` (top) and `[footer]` (below CTA). Responsive.

---

### `UiSplitLayoutComponent` (`ui-split-layout`)
Marketing/auth page with image panel + content panel.

**Inputs:**
- `imagePosition = input<'left'|'right'>('left')`
- `imageSrc = input<string | null>(null)`
- `imageAlt = input<string>('')`
- `overlayColor = input<string | null>(null)` — color overlay on image
- `mobileImageVisible = input<boolean>(false)`

**Behavior:** Two panels: image panel (background image via CSS, with optional color overlay and `<ng-content select="[image-content]">` for text on top) and content panel (`<ng-content select="[content]">`). On mobile, image panel hidden by default (`mobileImageVisible` overrides). Common use: login pages, sign-up pages, landing sections.

---

## File Structure

```
src/lib/components/
├── form/
│   ├── phone-input/
│   ├── credit-card-input/
│   ├── address-input/
│   ├── iban-input/
│   ├── code-editor/
│   ├── json-editor/
│   ├── formula-editor/
│   ├── wizard/
│   ├── dynamic-form/
│   └── field-array/
└── layout/
    ├── collapsible-nav/
    ├── resizable-panels/
    ├── split-screen/
    ├── dashboard-grid/
    ├── scroll-spy/
    ├── sticky-header/
    ├── loading-screen/
    ├── onboarding-layout/
    └── split-layout/
```

Each directory: `<name>.component.ts`, `<name>.component.html`, `<name>.stories.ts`, `<name>.spec.ts`, `index.ts`

## New peerDependencies

```json
"@codemirror/basic-setup": ">=0.20.0",
"@codemirror/lang-javascript": ">=6.0.0",
"@codemirror/lang-json": ">=6.0.0",
"@codemirror/lang-html": ">=6.0.0",
"@codemirror/lang-css": ">=6.0.0",
"@codemirror/lang-python": ">=6.0.0"
```

All CodeMirror packages added to `devDependencies` as well (same pattern as `highlight.js`).

## Conventions (unchanged from previous waves)

- `standalone: true`, `ChangeDetectionStrategy.OnPush`
- Angular Signals: `input()`, `output()`, `model()`, `computed()`, `signal()`
- Angular 17+ control flow: `@if`, `@for`, `@switch`
- Tailwind CSS with semantic CSS variables
- `LucideAngularModule` for icons
- Selector prefix: `ui-`
- 3+ Storybook stories per component (CSF3 format)
- Unit tests via Angular TestBed + `fixture.componentRef.setInput()`

## Version

This wave targets **v1.5.0** (minor bump, no breaking changes).
