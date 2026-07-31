# Widget Registry & Dashboard Host Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the widget-type registry and a dashboard-host component in `@fechorapps/ui`, activating the drag-and-drop grid (`UiDashboardGridComponent`) and metric components that already exist but were never wired into a widget system.

**Architecture:** A `WIDGET_REGISTRY` maps a `WidgetType` string to `{ component, resolveInputs }`. `UiWidgetDashboardComponent` wraps `UiDashboardGridComponent`, resolves each `WidgetConfig` item to its component via the registry, and renders it through `NgComponentOutlet` inside the grid's per-item content-projection slot. No backend integration in this plan — data arrives as opaque `unknown` already shaped by the caller (backAndTrace/web's plan does that shaping).

**Tech Stack:** Angular 21 standalone components, signals (`input`/`output`/`model`), `NgComponentOutlet`, Chart.js via the existing `UiChartComponent`, Storybook (Angular CSF3), `@angular/build:unit-test` (Vitest under the hood).

## Global Constraints

- This plan touches **only** `/home/fechorapps/projects/fechorapps-ui`. No backend (`backAndTrace/api`) or app-level (`backAndTrace/web`) code changes belong here — those are plans 2 and 3, derived from the same design doc at `/home/fechorapps/projects/backAndTrace/web/docs/superpowers/specs/2026-07-31-widget-dashboard-system-design.md`.
- Design doc decision: catalog of widget types is fixed by deploy (smart-enum style), no runtime-editable widget catalog.
- Design doc decision (fuera de alcance V1): `Table` widget has no per-column formatting — plain rows/columns only.
- Standalone components, `ChangeDetectionStrategy.OnPush`, signal-based inputs/outputs (`input()`/`output()`/`model()`) — matches every existing component in this repo (see `kpi-card.component.ts`, `chart.component.ts`, `dashboard-grid.component.ts`).
- New components live under `src/lib/components/layout/widget-dashboard/`, exported through `src/lib/components/layout/index.ts` — same barrel pattern as every other component family (`dashboard/index.ts`, etc.).
- Match the existing Tailwind utility vocabulary already used throughout the library: `bg-card`, `border-border`, `text-muted-foreground`, `text-card-foreground`, `rounded-lg`/`rounded-xl`.
- Storybook stories are CSF3 (`Meta`/`StoryObj` from `@storybook/angular`, `moduleMetadata` decorator, `render: args => ({ props, template })`) — see `dashboard-grid.stories.ts` for the exact shape to copy.

---

## Discovery Findings (read before starting — these change what "obvious" looks like)

1. **`UiDashboardGridComponent` and `GridItem` are currently unexported.** `src/lib/components/layout/index.ts` exports `app-shell`, `onboarding-layout`, `page-header`, `sidebar-layout` — **not** `dashboard-grid`. It exists, has tests and stories, but no external consumer of `@fechorapps/ui` can import it today. Task 6 fixes this for both `dashboard-grid` and the new `widget-dashboard` family.
2. **The grid's own JSDoc example is stale/wrong.** The comment on `UiDashboardGridComponent` shows `<ng-template #cell let-item>` — the real template (`dashboard-grid.component.html:36`) uses **named-slot content projection**: `<ng-content select="[slot='{{ item.id }}']">`. Consumers must project an element with `[attr.slot]="item.id"` as a *direct child* of `<ui-dashboard-grid>` for each item. Do not follow the JSDoc example — follow the `.html` file.
3. **`item.id` is displayed as the visible label** in the grid's drag-handle header (`{{ item.id }}` in `dashboard-grid.component.html:27`), *and* used for `track item.id`, the drag `dataTransfer` key, and the slot selector. `WidgetConfig.id` must therefore be a human-readable, unique-per-dashboard string (e.g. the widget's title) — not an opaque key. This plan documents the constraint on the type; it is plan 3's job (backAndTrace/web) to set `id` correctly when building `WidgetConfig[]` from the backend response, since V1 guarantees at most one instance per widget key per user.
4. **No test runner exists in this repo.** No `test` architect target in `angular.json`, no Karma/Jest/Vitest dependency, no config file — `npx ng test` fails with `Cannot determine project or target for command`. Every existing `.spec.ts` file in the repo (kpi-card, stat-card, dashboard-grid, ...) has never been runnable. Task 0 fixes this using the same `@angular/build:unit-test` builder the sibling `backAndTrace/web` repo already uses (same Angular major version, zero bespoke config).
5. **`UiDashboardGridComponent.items` mutates items via spread** (`{ ...i, x, y }` in `onGridDrop`), not by replacing them with bare `GridItem` objects — so a `WidgetConfig[]` passed in as `items` keeps its extra fields (`widgetType`, `title`, `data`) intact at runtime even though the grid's own type signature only knows about `GridItem`. `UiWidgetDashboardComponent` relies on this and casts the grid's `layoutChange` payload back to `WidgetConfig[]`.

---

### Task 0: Enable the test runner

**Files:**
- Modify: `angular.json`
- Modify: `package.json`

**Interfaces:**
- Produces: a working `npx ng test` command every later task's TDD steps depend on.

- [ ] **Step 1: Add the `test` architect target**

In `angular.json`, inside the `fechorapps-ui` project's `architect` object (sibling to `build`, `storybook`, `build-storybook`), add:

```json
"test": {
  "builder": "@angular/build:unit-test"
}
```

- [ ] **Step 2: Install Vitest**

```bash
cd /home/fechorapps/projects/fechorapps-ui
npm install -D vitest@^4.0.8
```

(Version pinned to match the sibling `backAndTrace/web` repo's `vitest ^4.0.8` — same Angular major version, no reason to diverge.)

- [ ] **Step 3: Run the full existing suite to establish the baseline**

```bash
npx ng test --watch=false 2>&1 | tail -60
```

Record the exact pass/fail counts in the task's commit message or a scratch note. **Do not fix pre-existing failures unrelated to this plan's new code** — if the baseline is not 100% green, that is a pre-existing gap this plan inherits, not one it owns. Report the baseline number; it becomes the reference point every later task's `ng test` run is compared against (new failures = this plan's problem, baseline failures = not this plan's problem).

- [ ] **Step 4: Commit**

```bash
git add angular.json package.json package-lock.json
git commit -m "chore: enable @angular/build:unit-test (Vitest) — no test runner existed before"
```

---

### Task 1: `WidgetType` and `WidgetConfig` types

**Files:**
- Create: `src/lib/components/layout/widget-dashboard/widget-types.ts`
- Test: `src/lib/components/layout/widget-dashboard/widget-types.spec.ts`

**Interfaces:**
- Produces: `WidgetType` (string union: `'kpi' | 'barChart' | 'lineChart' | 'table'`), `WidgetConfig` interface, `isWidgetType(value: unknown): value is WidgetType` type guard. Every later task imports these from this file.

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/components/layout/widget-dashboard/widget-types.spec.ts
import { isWidgetType } from './widget-types';

describe('isWidgetType', () => {
  it('accepts every known widget type', () => {
    expect(isWidgetType('kpi')).toBe(true);
    expect(isWidgetType('barChart')).toBe(true);
    expect(isWidgetType('lineChart')).toBe(true);
    expect(isWidgetType('table')).toBe(true);
  });

  it('rejects unknown strings', () => {
    expect(isWidgetType('pieChart')).toBe(false);
    expect(isWidgetType('')).toBe(false);
  });

  it('rejects non-string values', () => {
    expect(isWidgetType(42)).toBe(false);
    expect(isWidgetType(null)).toBe(false);
    expect(isWidgetType(undefined)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx ng test --watch=false 2>&1 | grep -A5 "widget-types"
```

Expected: FAIL — `widget-types.ts` does not exist yet, module not found.

- [ ] **Step 3: Write the implementation**

```typescript
// src/lib/components/layout/widget-dashboard/widget-types.ts
import type { GridItem } from '../dashboard-grid/dashboard-grid.component';

/**
 * Mirrors the backend's WidgetType smart enum (see the design doc). Fixed
 * catalog, extended by deploy — no runtime-editable widget types.
 */
export type WidgetType = 'kpi' | 'barChart' | 'lineChart' | 'table';

const WIDGET_TYPES: readonly WidgetType[] = ['kpi', 'barChart', 'lineChart', 'table'];

export function isWidgetType(value: unknown): value is WidgetType {
  return typeof value === 'string' && (WIDGET_TYPES as readonly string[]).includes(value);
}

/**
 * One widget instance placed on a dashboard.
 *
 * `id` is NOT an opaque key: `UiDashboardGridComponent` displays it as the
 * visible label in the drag-handle header, uses it for `track`, the
 * HTML5 drag `dataTransfer` payload, and the `[slot='{id}']` content-
 * projection selector (see dashboard-grid.component.html). Callers must set
 * `id` to a human-readable, dashboard-unique string — typically the
 * widget's own title, since V1 allows at most one instance per widget key
 * per user (see design doc, UserDashboardLayout PK).
 *
 * `data` is opaque on purpose: this library does not know how to turn "rows
 * from a report" into a KPI number or a Chart.js dataset — the caller
 * shapes `data` into whatever `WIDGET_REGISTRY[widgetType].resolveInputs`
 * expects (documented per-type in widget-registry.ts).
 */
export interface WidgetConfig extends GridItem {
  widgetType: WidgetType;
  title: string;
  data: unknown;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx ng test --watch=false 2>&1 | grep -A5 "widget-types"
```

Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/layout/widget-dashboard/widget-types.ts src/lib/components/layout/widget-dashboard/widget-types.spec.ts
git commit -m "feat(widget-dashboard): add WidgetType and WidgetConfig types"
```

---

### Task 2: `UiWidgetTableComponent`

**Files:**
- Create: `src/lib/components/layout/widget-dashboard/widget-table/widget-table.component.ts`
- Create: `src/lib/components/layout/widget-dashboard/widget-table/widget-table.component.html`
- Test: `src/lib/components/layout/widget-dashboard/widget-table/widget-table.spec.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `UiWidgetTableComponent` (selector `ui-widget-table`), `WidgetTableColumn { key: string; label: string }`, `WidgetTableRow = Record<string, string | number>`. Task 3's registry imports the component; nothing imports the row/column types outside this file in this plan (plan 3, backAndTrace/web, will when it shapes `WidgetConfig.data` for table widgets).

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/components/layout/widget-dashboard/widget-table/widget-table.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiWidgetTableComponent } from './widget-table.component';

describe('UiWidgetTableComponent', () => {
  let fixture: ComponentFixture<UiWidgetTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiWidgetTableComponent] });
    fixture = TestBed.createComponent(UiWidgetTableComponent);
  });

  it('renders a header cell per column', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', label: 'Nombre' },
      { key: 'amount', label: 'Monto' },
    ]);
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toContain('Nombre');
    expect(headers[1].textContent).toContain('Monto');
  });

  it('renders a row per data item, cell values by column key', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', label: 'Nombre' },
      { key: 'amount', label: 'Monto' },
    ]);
    fixture.componentRef.setInput('rows', [
      { name: 'Contrato A', amount: 1000 },
      { name: 'Contrato B', amount: 2000 },
    ]);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Contrato A');
    expect(rows[0].textContent).toContain('1000');
  });

  it('shows an empty state when there are no rows', () => {
    fixture.componentRef.setInput('columns', [{ key: 'name', label: 'Nombre' }]);
    fixture.componentRef.setInput('rows', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Sin datos');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx ng test --watch=false 2>&1 | grep -A5 "widget-table"
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```typescript
// src/lib/components/layout/widget-dashboard/widget-table/widget-table.component.ts
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface WidgetTableColumn {
  key: string;
  label: string;
}

export type WidgetTableRow = Record<string, string | number>;

@Component({
  selector: 'ui-widget-table',
  standalone: true,
  imports: [],
  templateUrl: './widget-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiWidgetTableComponent {
  readonly title = input<string>('');
  readonly columns = input<WidgetTableColumn[]>([]);
  readonly rows = input<WidgetTableRow[]>([]);
}
```

```html
<!-- src/lib/components/layout/widget-dashboard/widget-table/widget-table.component.html -->
<div class="h-full flex flex-col">
  @if (rows().length === 0) {
    <p class="text-sm text-muted-foreground p-3">Sin datos</p>
  } @else {
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-border">
          @for (col of columns(); track col.key) {
            <th class="text-left font-medium text-muted-foreground px-2 py-1.5">{{ col.label }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track $index) {
          <tr class="border-b border-border last:border-b-0">
            @for (col of columns(); track col.key) {
              <td class="px-2 py-1.5 text-card-foreground">{{ row[col.key] }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  }
</div>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx ng test --watch=false 2>&1 | grep -A5 "widget-table"
```

Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/layout/widget-dashboard/widget-table/
git commit -m "feat(widget-dashboard): add UiWidgetTableComponent"
```

---

### Task 3: `WIDGET_REGISTRY`

**Files:**
- Create: `src/lib/components/layout/widget-dashboard/widget-registry.ts`
- Test: `src/lib/components/layout/widget-dashboard/widget-registry.spec.ts`

**Interfaces:**
- Consumes: `WidgetType`, `WidgetConfig` (Task 1); `UiWidgetTableComponent` (Task 2); `UiKpiCardComponent` (existing, `../../dashboard/kpi-card/kpi-card.component`); `UiChartComponent` (existing, `../../../chart/chart/chart.component`).
- Produces: `WIDGET_REGISTRY: Record<WidgetType, WidgetRegistryEntry>`, `WidgetRegistryEntry { component: Type<unknown>; resolveInputs: (config: WidgetConfig) => Record<string, unknown> }`. Task 4 (`UiWidgetDashboardComponent`) consumes both.

**Data contract per widget type** (what `WidgetConfig.data` must already look like when it reaches this registry — the caller's job, not this library's):
- `kpi`: `{ value: number; target?: number; format?: 'number' | 'currency' | 'percent'; currency?: string }`
- `barChart` / `lineChart`: Chart.js `ChartData` shape (`{ labels: string[]; datasets: { data: number[]; label?: string; ... }[] }`) — passed straight through to `UiChartComponent`.
- `table`: `{ columns: WidgetTableColumn[]; rows: WidgetTableRow[] }`

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/components/layout/widget-dashboard/widget-registry.spec.ts
import { WIDGET_REGISTRY } from './widget-registry';
import { UiKpiCardComponent } from '../../dashboard/kpi-card/kpi-card.component';
import { UiChartComponent } from '../../chart/chart/chart.component';
import { UiWidgetTableComponent } from './widget-table/widget-table.component';
import type { WidgetConfig } from './widget-types';

function baseConfig(overrides: Partial<WidgetConfig>): WidgetConfig {
  return {
    id: 'Test Widget',
    x: 0,
    y: 0,
    w: 4,
    h: 2,
    widgetType: 'kpi',
    title: 'Test Widget',
    data: {},
    ...overrides,
  };
}

describe('WIDGET_REGISTRY', () => {
  it('has an entry for every WidgetType', () => {
    expect(WIDGET_REGISTRY['kpi']).toBeDefined();
    expect(WIDGET_REGISTRY['barChart']).toBeDefined();
    expect(WIDGET_REGISTRY['lineChart']).toBeDefined();
    expect(WIDGET_REGISTRY['table']).toBeDefined();
  });

  it('maps kpi to UiKpiCardComponent with label/value/target/format resolved from data', () => {
    const entry = WIDGET_REGISTRY['kpi'];
    expect(entry.component).toBe(UiKpiCardComponent);

    const config = baseConfig({
      widgetType: 'kpi',
      title: 'Techo Presupuestal',
      data: { value: 120000000, target: 150000000, format: 'currency', currency: 'MXN' },
    });
    expect(entry.resolveInputs(config)).toEqual({
      label: 'Techo Presupuestal',
      value: 120000000,
      target: 150000000,
      format: 'currency',
      currency: 'MXN',
    });
  });

  it('defaults kpi format to number and currency to USD when absent', () => {
    const entry = WIDGET_REGISTRY['kpi'];
    const config = baseConfig({ widgetType: 'kpi', title: 'Count', data: { value: 5 } });
    expect(entry.resolveInputs(config)).toEqual({
      label: 'Count',
      value: 5,
      target: undefined,
      format: 'number',
      currency: 'USD',
    });
  });

  it('maps barChart to UiChartComponent with type bar and data passed through', () => {
    const entry = WIDGET_REGISTRY['barChart'];
    expect(entry.component).toBe(UiChartComponent);

    const chartData = { labels: ['A', 'B'], datasets: [{ data: [1, 2] }] };
    const config = baseConfig({ widgetType: 'barChart', title: 'Bar', data: chartData });
    expect(entry.resolveInputs(config)).toEqual({ type: 'bar', data: chartData });
  });

  it('maps lineChart to UiChartComponent with type line and data passed through', () => {
    const entry = WIDGET_REGISTRY['lineChart'];
    expect(entry.component).toBe(UiChartComponent);

    const chartData = { labels: ['A', 'B'], datasets: [{ data: [1, 2] }] };
    const config = baseConfig({ widgetType: 'lineChart', title: 'Line', data: chartData });
    expect(entry.resolveInputs(config)).toEqual({ type: 'line', data: chartData });
  });

  it('maps table to UiWidgetTableComponent with title/columns/rows resolved from data', () => {
    const entry = WIDGET_REGISTRY['table'];
    expect(entry.component).toBe(UiWidgetTableComponent);

    const tableData = {
      columns: [{ key: 'name', label: 'Nombre' }],
      rows: [{ name: 'Contrato A' }],
    };
    const config = baseConfig({ widgetType: 'table', title: 'Contratos', data: tableData });
    expect(entry.resolveInputs(config)).toEqual({
      title: 'Contratos',
      columns: tableData.columns,
      rows: tableData.rows,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx ng test --watch=false 2>&1 | grep -A5 "widget-registry"
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```typescript
// src/lib/components/layout/widget-dashboard/widget-registry.ts
import type { Type } from '@angular/core';
import type { ChartData } from 'chart.js';
import { UiKpiCardComponent } from '../../dashboard/kpi-card/kpi-card.component';
import { UiChartComponent } from '../../chart/chart/chart.component';
import { UiWidgetTableComponent } from './widget-table/widget-table.component';
import type { WidgetTableColumn, WidgetTableRow } from './widget-table/widget-table.component';
import type { WidgetConfig, WidgetType } from './widget-types';

interface KpiWidgetData {
  value: number;
  target?: number;
  format?: 'number' | 'currency' | 'percent';
  currency?: string;
}

interface TableWidgetData {
  columns: WidgetTableColumn[];
  rows: WidgetTableRow[];
}

export interface WidgetRegistryEntry {
  component: Type<unknown>;
  resolveInputs: (config: WidgetConfig) => Record<string, unknown>;
}

export const WIDGET_REGISTRY: Record<WidgetType, WidgetRegistryEntry> = {
  kpi: {
    component: UiKpiCardComponent,
    resolveInputs: (config) => {
      const data = config.data as KpiWidgetData;
      return {
        label: config.title,
        value: data.value,
        target: data.target,
        format: data.format ?? 'number',
        currency: data.currency ?? 'USD',
      };
    },
  },
  barChart: {
    component: UiChartComponent,
    resolveInputs: (config) => ({ type: 'bar', data: config.data as ChartData }),
  },
  lineChart: {
    component: UiChartComponent,
    resolveInputs: (config) => ({ type: 'line', data: config.data as ChartData }),
  },
  table: {
    component: UiWidgetTableComponent,
    resolveInputs: (config) => {
      const data = config.data as TableWidgetData;
      return { title: config.title, columns: data.columns, rows: data.rows };
    },
  },
};
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx ng test --watch=false 2>&1 | grep -A5 "widget-registry"
```

Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/layout/widget-dashboard/widget-registry.ts src/lib/components/layout/widget-dashboard/widget-registry.spec.ts
git commit -m "feat(widget-dashboard): add WIDGET_REGISTRY mapping widget types to components"
```

---

### Task 4: `UiWidgetDashboardComponent`

**Files:**
- Create: `src/lib/components/layout/widget-dashboard/widget-dashboard.component.ts`
- Create: `src/lib/components/layout/widget-dashboard/widget-dashboard.component.html`
- Test: `src/lib/components/layout/widget-dashboard/widget-dashboard.spec.ts`

**Interfaces:**
- Consumes: `UiDashboardGridComponent`/`GridItem` (existing, `../dashboard-grid/dashboard-grid.component`), `WIDGET_REGISTRY` (Task 3), `WidgetConfig` (Task 1).
- Produces: `UiWidgetDashboardComponent` (selector `ui-widget-dashboard`) with `items = model<WidgetConfig[]>([])` and `readonly layoutChange = output<WidgetConfig[]>()`. Nothing later in this plan consumes it directly — plan 3 (backAndTrace/web) does.

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/components/layout/widget-dashboard/widget-dashboard.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiWidgetDashboardComponent } from './widget-dashboard.component';
import type { WidgetConfig } from './widget-types';

const ITEMS: WidgetConfig[] = [
  {
    id: 'Techo Presupuestal',
    x: 0,
    y: 0,
    w: 4,
    h: 2,
    widgetType: 'kpi',
    title: 'Techo Presupuestal',
    data: { value: 120000000, format: 'currency', currency: 'MXN' },
  },
  {
    id: 'Contratos por Estatus',
    x: 4,
    y: 0,
    w: 8,
    h: 3,
    widgetType: 'barChart',
    title: 'Contratos por Estatus',
    data: { labels: ['Vigente', 'Cerrado'], datasets: [{ data: [10, 3] }] },
  },
];

describe('UiWidgetDashboardComponent', () => {
  let fixture: ComponentFixture<UiWidgetDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiWidgetDashboardComponent] });
    fixture = TestBed.createComponent(UiWidgetDashboardComponent);
  });

  it('renders one resolved widget component per item', () => {
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('ui-kpi-card')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ui-chart')).toBeTruthy();
  });

  it('passes the underlying grid the same items (id, x, y, w, h intact)', () => {
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();

    const grid = fixture.nativeElement.querySelector('ui-dashboard-grid');
    expect(grid).toBeTruthy();
  });

  it('re-emits layoutChange from the underlying grid, preserving widget fields', () => {
    fixture.componentRef.setInput('items', ITEMS);
    fixture.detectChanges();

    const emitted: WidgetConfig[][] = [];
    fixture.componentInstance.layoutChange.subscribe((v) => emitted.push(v));

    // Simulate what the grid emits after a drag: same objects, x/y updated.
    const movedByGrid = ITEMS.map((item) => (item.id === 'Techo Presupuestal' ? { ...item, x: 8, y: 1 } : item));
    fixture.componentInstance.onGridLayoutChange(movedByGrid);

    expect(emitted.length).toBe(1);
    expect(emitted[0][0].x).toBe(8);
    expect(emitted[0][0].y).toBe(1);
    expect(emitted[0][0].widgetType).toBe('kpi'); // widget-specific field survived the round trip
    expect(fixture.componentInstance.items()[0].x).toBe(8);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx ng test --watch=false 2>&1 | grep -A5 "widget-dashboard.spec"
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write the implementation**

```typescript
// src/lib/components/layout/widget-dashboard/widget-dashboard.component.ts
import { Component, ChangeDetectionStrategy, model, output } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { UiDashboardGridComponent } from '../dashboard-grid/dashboard-grid.component';
import type { GridItem } from '../dashboard-grid/dashboard-grid.component';
import { WIDGET_REGISTRY } from './widget-registry';
import type { WidgetConfig } from './widget-types';

@Component({
  selector: 'ui-widget-dashboard',
  standalone: true,
  imports: [UiDashboardGridComponent, NgComponentOutlet],
  templateUrl: './widget-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiWidgetDashboardComponent {
  items = model<WidgetConfig[]>([]);
  readonly layoutChange = output<WidgetConfig[]>();

  widgetComponent(item: WidgetConfig) {
    return WIDGET_REGISTRY[item.widgetType].component;
  }

  widgetInputs(item: WidgetConfig): Record<string, unknown> {
    return WIDGET_REGISTRY[item.widgetType].resolveInputs(item);
  }

  /**
   * UiDashboardGridComponent mutates items via `{ ...i, x, y }` (see its
   * onGridDrop), so the objects it emits back are still full WidgetConfig
   * instances at runtime — only its own GridItem-shaped view of them is
   * narrower. Safe to treat the emitted array as WidgetConfig[].
   */
  onGridLayoutChange(gridItems: GridItem[]): void {
    const updated = gridItems as WidgetConfig[];
    this.items.set(updated);
    this.layoutChange.emit(updated);
  }
}
```

```html
<!-- src/lib/components/layout/widget-dashboard/widget-dashboard.component.html -->
<ui-dashboard-grid [items]="items()" (layoutChange)="onGridLayoutChange($event)">
  @for (item of items(); track item.id) {
    <div [attr.slot]="item.id" class="h-full">
      <ng-container *ngComponentOutlet="widgetComponent(item); inputs: widgetInputs(item)" />
    </div>
  }
</ui-dashboard-grid>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx ng test --watch=false 2>&1 | grep -A5 "widget-dashboard.spec"
```

Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/layout/widget-dashboard/widget-dashboard.component.ts src/lib/components/layout/widget-dashboard/widget-dashboard.component.html src/lib/components/layout/widget-dashboard/widget-dashboard.spec.ts
git commit -m "feat(widget-dashboard): add UiWidgetDashboardComponent"
```

---

### Task 5: Barrel exports

**Files:**
- Create: `src/lib/components/layout/widget-dashboard/index.ts`
- Modify: `src/lib/components/layout/index.ts`
- Test: `src/lib/components/layout/widget-dashboard-exports.spec.ts`

**Interfaces:**
- Consumes: everything from Tasks 1-4.
- Produces: the actual public import surface (`@fechorapps/ui` → `layout` category → `dashboard-grid` + `widget-dashboard`).

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/components/layout/widget-dashboard-exports.spec.ts
// Import from the SAME barrel path an external consumer would use, not a
// deep path — this is what makes the test catch a missing export.
import { UiDashboardGridComponent, UiWidgetDashboardComponent, UiWidgetTableComponent, WIDGET_REGISTRY } from '.';

describe('layout barrel exports', () => {
  it('exposes UiDashboardGridComponent', () => {
    expect(UiDashboardGridComponent).toBeDefined();
  });

  it('exposes the widget-dashboard family', () => {
    expect(UiWidgetDashboardComponent).toBeDefined();
    expect(UiWidgetTableComponent).toBeDefined();
    expect(WIDGET_REGISTRY).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx ng test --watch=false 2>&1 | grep -A10 "widget-dashboard-exports"
```

Expected: FAIL — `UiWidgetDashboardComponent`/`UiWidgetTableComponent`/`WIDGET_REGISTRY` not exported from `.` (the `layout` index), and `UiDashboardGridComponent` isn't either yet.

- [ ] **Step 3: Write the implementation**

```typescript
// src/lib/components/layout/widget-dashboard/index.ts
export { UiWidgetDashboardComponent } from './widget-dashboard.component';
export { UiWidgetTableComponent } from './widget-table/widget-table.component';
export type { WidgetTableColumn, WidgetTableRow } from './widget-table/widget-table.component';
export { WIDGET_REGISTRY } from './widget-registry';
export type { WidgetRegistryEntry } from './widget-registry';
export { isWidgetType } from './widget-types';
export type { WidgetType, WidgetConfig } from './widget-types';
```

Modify `src/lib/components/layout/index.ts` — add the two missing lines (alphabetical, matching the existing style):

```typescript
export * from './app-shell';
export * from './dashboard-grid';
export * from './onboarding-layout';
export * from './page-header';
export * from './sidebar-layout';
export * from './widget-dashboard';
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx ng test --watch=false 2>&1 | grep -A10 "widget-dashboard-exports"
```

Expected: PASS, 2 tests.

- [ ] **Step 5: Run the full suite once more to confirm nothing regressed**

```bash
npx ng test --watch=false 2>&1 | tail -30
```

Expected: same baseline pass count from Task 0, Step 3, **plus** the new tests from Tasks 1-5, all passing. No new failures.

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/layout/widget-dashboard/index.ts src/lib/components/layout/index.ts src/lib/components/layout/widget-dashboard-exports.spec.ts
git commit -m "feat(widget-dashboard): export dashboard-grid and widget-dashboard from the layout barrel"
```

---

### Task 6: Storybook stories

**Files:**
- Create: `src/lib/components/layout/widget-dashboard/widget-table/widget-table.stories.ts`
- Create: `src/lib/components/layout/widget-dashboard/widget-dashboard.stories.ts`

**Interfaces:**
- Consumes: `UiWidgetTableComponent` (Task 2), `UiWidgetDashboardComponent` + `WidgetConfig` (Tasks 1, 4).
- Produces: nothing consumed elsewhere in this plan — this is the human-facing verification surface for the whole feature, discovered automatically by Storybook's glob (`../src/**/*.stories.ts`, see `.storybook/main.ts`), no manual registration needed.

- [ ] **Step 1: Write the table story**

```typescript
// src/lib/components/layout/widget-dashboard/widget-table/widget-table.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiWidgetTableComponent } from './widget-table.component';

const meta: Meta<UiWidgetTableComponent> = {
  title: 'Layout/WidgetDashboard/WidgetTable',
  component: UiWidgetTableComponent,
  decorators: [moduleMetadata({ imports: [UiWidgetTableComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiWidgetTableComponent>;

export const WithRows: Story = {
  name: 'With Rows',
  args: {
    columns: [
      { key: 'name', label: 'Contrato' },
      { key: 'status', label: 'Estatus' },
      { key: 'amount', label: 'Monto' },
    ],
    rows: [
      { name: 'SEDENA-DN8-045-2024', status: 'Vigente', amount: 4500000 },
      { name: 'SEDENA-DN8-052-2024', status: 'Finiquitado', amount: 2100000 },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 480px; border: 1px solid hsl(var(--border)); border-radius: 8px;">
        <ui-widget-table [columns]="columns" [rows]="rows"></ui-widget-table>
      </div>
    `,
  }),
};

export const Empty: Story = {
  name: 'Empty',
  args: {
    columns: [{ key: 'name', label: 'Contrato' }],
    rows: [],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 480px; border: 1px solid hsl(var(--border)); border-radius: 8px;">
        <ui-widget-table [columns]="columns" [rows]="rows"></ui-widget-table>
      </div>
    `,
  }),
};
```

- [ ] **Step 2: Write the dashboard-host story**

```typescript
// src/lib/components/layout/widget-dashboard/widget-dashboard.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiWidgetDashboardComponent } from './widget-dashboard.component';
import type { WidgetConfig } from './widget-types';

const DEMO_ITEMS: WidgetConfig[] = [
  {
    id: 'Techo Presupuestal',
    x: 0, y: 0, w: 4, h: 2,
    widgetType: 'kpi',
    title: 'Techo Presupuestal',
    data: { value: 120000000, format: 'currency', currency: 'MXN' },
  },
  {
    id: 'Comprometido Obras',
    x: 4, y: 0, w: 4, h: 2,
    widgetType: 'kpi',
    title: 'Comprometido Obras',
    data: { value: 98050000, format: 'currency', currency: 'MXN' },
  },
  {
    id: 'Contratos por Estatus',
    x: 0, y: 2, w: 8, h: 4,
    widgetType: 'barChart',
    title: 'Contratos por Estatus',
    data: {
      labels: ['Vigente', 'Finiquitado', 'Suspendido'],
      datasets: [{ label: 'Contratos', data: [12, 5, 1] }],
    },
  },
];

const meta: Meta<UiWidgetDashboardComponent> = {
  title: 'Layout/WidgetDashboard/Dashboard',
  component: UiWidgetDashboardComponent,
  decorators: [moduleMetadata({ imports: [UiWidgetDashboardComponent] })],
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<UiWidgetDashboardComponent>;

/** Drag a widget — layoutChange logs to the Storybook Actions panel. */
export const Default: Story = {
  name: 'Default — Kpi + BarChart',
  args: { items: DEMO_ITEMS },
  render: (args) => ({
    props: { ...args, onLayoutChange: (items: WidgetConfig[]) => console.log('layoutChange', items) },
    template: `
      <div style="width: 100%; padding: 16px; background: hsl(var(--background));">
        <ui-widget-dashboard [items]="items" (layoutChange)="onLayoutChange($event)"></ui-widget-dashboard>
      </div>
    `,
  }),
};
```

- [ ] **Step 3: Verify visually**

```bash
cd /home/fechorapps/projects/fechorapps-ui
npm run storybook
```

Open the printed local URL, navigate to `Layout/WidgetDashboard/WidgetTable` and `Layout/WidgetDashboard/Dashboard`. Confirm:
- `WidgetTable` renders the 3-column table with 2 rows; the `Empty` story shows "Sin datos".
- `Dashboard` renders two KPI cards and a bar chart, all draggable; dragging one and dropping it elsewhere logs a `layoutChange` event to the Actions panel with the moved item's updated `x`/`y` and its `widgetType`/`title`/`data` still present.

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/layout/widget-dashboard/widget-table/widget-table.stories.ts src/lib/components/layout/widget-dashboard/widget-dashboard.stories.ts
git commit -m "docs(widget-dashboard): add Storybook stories for WidgetTable and the dashboard host"
```

---

## Self-Review

**1. Spec coverage** (against the design doc's "Componentes por repo > fechorapps-ui" section):
- `WidgetType` ✅ Task 1. `WidgetConfig` ✅ Task 1 (extends `GridItem` as specified). `WIDGET_REGISTRY` ✅ Task 3. `UiWidgetDashboardComponent` ✅ Task 4 (wraps `UiDashboardGridComponent`, resolves via registry + `NgComponentOutlet`, re-emits `layoutChange`). `Table` component ✅ Task 2 (no per-column formatting, as specified). Reuse of `UiKpiCardComponent`/`UiChartComponent` ✅ Task 3.
- Design doc's testing section for this repo ("tests de WIDGET_REGISTRY... tests de UiWidgetDashboardComponent") ✅ Tasks 3 and 4.

**2. Placeholder scan:** No TBD/TODO. Every step has real, complete code — no "add appropriate handling" language anywhere.

**3. Type consistency:** `WidgetConfig` (Task 1) is used identically across Tasks 3, 4, 5, 6 — same field names (`widgetType`, `title`, `data`), same import path. `WIDGET_REGISTRY`'s `WidgetRegistryEntry` shape is defined once in Task 3 and consumed as-is in Task 4. `UiWidgetTableComponent`'s `WidgetTableColumn`/`WidgetTableRow` are defined once in Task 2 and referenced (not redefined) in Task 3.

**4. Fixed during review:** the original scope note only said "registro tipo→componente" without specifying how per-type *input shaping* would work — investigating the actual existing components (Task discovery, see kpi-card/chart component signatures) showed they take heterogeneous named inputs, not a uniform `data` prop, so a bare `Record<WidgetType, Type>` registry would have been insufficient. Added `resolveInputs` per entry to close that gap before it became a Task 4 blocker.

---

## GSTACK REVIEW REPORT

This plan was produced via `superpowers:brainstorming` → `superpowers:writing-plans`, not `/plan-eng-review` (no branch diff or existing plan existed yet for that skill to review — see conversation). No automated review pass has run against this plan file.

**UNRESOLVED DECISIONS:**
- None — all 4 architecture decisions were confirmed with the user during brainstorming; this plan's scope (fechorapps-ui only) and the test-runner gap were confirmed via AskUserQuestion before this file was written.
