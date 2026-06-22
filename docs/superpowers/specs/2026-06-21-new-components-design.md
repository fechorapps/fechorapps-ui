# Design: New Component Batch + Test Coverage

**Date:** 2026-06-21  
**Status:** Approved  
**Scope:** 18 new components + unit tests for all 91 existing components

---

## Overview

Expand `@fechorapps/ui` with 18 new components organized in 5 new categories, plus generate `.spec.ts` unit tests for all existing 91 components that currently have none. All work executes via parallel agents grouped by domain.

---

## Architecture & Conventions

All components follow the established library patterns:

- `standalone: true`, `ChangeDetectionStrategy.OnPush`
- Angular Signals API: `input()`, `output()`, `model()`, `computed()`, `signal()`
- Tailwind CSS with semantic CSS variables (`--primary`, `--background`, `--foreground`, etc.)
- Lucide Angular icons
- Angular 17+ control flow: `@if`, `@for`, `@switch` (no `*ngIf`, `*ngFor`)
- Selector prefix: `ui-`
- Each component delivers: `.component.ts` + `.component.html` + `.stories.ts` + `.spec.ts` + `index.ts`
- Barrel files updated at category and root level

---

## Agent Groups (Parallel Execution)

### A1 — Layout (3 components)

New category: `src/lib/components/layout/`

#### `UiAppShellComponent` (`ui-app-shell`)
```
src/lib/components/layout/app-shell/
├── app-shell.component.ts
├── app-shell.component.html
├── app-shell.stories.ts
├── app-shell.spec.ts
└── index.ts
```
**Inputs:**
- `sidebarCollapsed: model<boolean>(false)`
- `sidebarWidth: input<string>('260px')`
- `sidebarCollapsedWidth: input<string>('64px')`
- `showHeader: input<boolean>(true)`
- `headerHeight: input<string>('64px')`

**Slots:** `#sidebar`, `#header`, `#content`, `#footer`

**Behavior:** CSS transition on sidebar collapse, overlay on mobile (breakpoint `sm`).

---

#### `UiPageHeaderComponent` (`ui-page-header`)
```
src/lib/components/layout/page-header/
```
**Inputs:**
- `title: input<string>('')`
- `subtitle: input<string | undefined>(undefined)`
- `breadcrumbs: input<{ label: string; url?: string; icon?: LucideIconData }[]>([])`
- `sticky: input<boolean>(false)`

**Slots:** `#actions`, `#extra`

---

#### `UiSidebarLayoutComponent` (`ui-sidebar-layout`)
```
src/lib/components/layout/sidebar-layout/
```
**Inputs:**
- `position: input<'left' | 'right'>('left')`
- `visible: model<boolean>(true)`
- `overlay: input<boolean>(false)`
- `width: input<string>('280px')`

**Outputs:** `onShow`, `onHide`

**Slots:** `#sidebar`, `#content`

---

### A2 — Dashboard (4 components)

New category: `src/lib/components/dashboard/`

#### `UiStatCardComponent` (`ui-stat-card`)
**Inputs:**
- `label: input<string>('')`
- `value: input<string | number>('')`
- `previousValue: input<string | number | undefined>(undefined)`
- `trend: input<'up' | 'down' | 'neutral' | undefined>(undefined)`
- `trendValue: input<string | undefined>(undefined)`
- `icon: input<LucideIconData | undefined>(undefined)`
- `variant: input<'default' | 'primary' | 'success' | 'warning' | 'danger'>('default')`
- `loading: input<boolean>(false)`

---

#### `UiKpiCardComponent` (`ui-kpi-card`)
Extends StatCard concept with:
- `target: input<number | undefined>(undefined)`
- `format: input<'number' | 'currency' | 'percent'>('number')`
- `progress: computed(() => target ? (value / target) * 100 : null)`
- Renders a progress bar when `target` is set.

---

#### `UiMetricGridComponent` (`ui-metric-grid`)
**Inputs:**
- `columns: input<2 | 3 | 4>(3)`
- `gap: input<'sm' | 'md' | 'lg'>('md')`

Accepts `ng-content` (StatCards, KPICards, or any content).

---

#### `UiSparklineChartComponent` (`ui-sparkline-chart`)
**Inputs:**
- `data: input<number[]>([])`
- `type: input<'line' | 'bar' | 'area'>('line')`
- `color: input<string | undefined>(undefined)`
- `width: input<number>(120)`
- `height: input<number>(40)`
- `showDots: input<boolean>(false)`

Uses Chart.js (already a peer dependency). Renders without axes or labels — inline metric only.

---

### A3 — UX Patterns (3 components)

Added to `src/lib/components/overlay/` (CommandPalette, SearchBar) and `src/lib/components/misc/` (NotificationCenter).

#### `UiCommandPaletteComponent` (`ui-command-palette`)
**Inputs:**
- `visible: model<boolean>(false)`
- `placeholder: input<string>('Type a command or search...')`
- `groups: input<CommandGroup[]>([])`
- `closeOnSelect: input<boolean>(true)`

```typescript
export interface CommandItem {
  id: string;
  label: string;
  icon?: LucideIconData;
  shortcut?: string;
  action: () => void;
}
export interface CommandGroup {
  label: string;
  items: CommandItem[];
}
```

**Outputs:** `itemSelected: CommandItem`, `onClose`

**Behavior:** Opens on Cmd+K / Ctrl+K, fuzzy search filtering, keyboard navigation (↑↓ + Enter), escape to close, backdrop overlay with animation.

---

#### `UiSearchBarComponent` (`ui-search-bar`)
**Inputs:**
- `value: model<string>('')`
- `placeholder: input<string>('Search...')`
- `debounce: input<number>(300)`
- `loading: input<boolean>(false)`
- `suggestions: input<{ label: string; category?: string }[]>([])`
- `showHistory: input<boolean>(false)`

**Outputs:** `search: string`, `suggestionSelected: string`, `cleared`

---

#### `UiNotificationCenterComponent` (`ui-notification-center`)
**Inputs:**
- `notifications: input<Notification[]>([])`
- `maxVisible: input<number>(5)`
- `placement: input<'top-right' | 'bottom-right'>('top-right')`

```typescript
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
  timestamp: Date;
  icon?: LucideIconData;
}
```

**Outputs:** `notificationRead: string`, `allRead`, `notificationDismissed: string`

**Behavior:** Bell icon with unread badge count, popover panel listing notifications, mark-as-read on click.

---

### A4 — User/Profile (2 components)

New category: `src/lib/components/user/`

#### `UiUserMenuComponent` (`ui-user-menu`)
**Inputs:**
- `user: input<UserProfile>()`
- `menuItems: input<UserMenuItem[]>([])`
- `placement: input<'bottom-right' | 'bottom-left'>('bottom-right')`

```typescript
export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
export interface UserMenuItem {
  label: string;
  icon?: LucideIconData;
  action?: () => void;
  divider?: boolean;
}
```

**Outputs:** `itemSelected: UserMenuItem`, `avatarClicked`

---

#### `UiUserCardComponent` (`ui-user-card`)
**Inputs:**
- `user: input<UserProfile>()`
- `variant: input<'compact' | 'full'>('full')`
- `showStatus: input<boolean>(true)`
- `status: input<'online' | 'away' | 'busy' | 'offline'>('offline')`
- `clickable: input<boolean>(false)`

**Outputs:** `cardClicked`

---

### A5 — Content/Misc (6 components)

Added to `src/lib/components/misc/` and `src/lib/components/data/`.

#### `UiAlertComponent` (`ui-alert`) → misc/
**Inputs:**
- `variant: input<'info' | 'success' | 'warning' | 'danger'>('info')`
- `title: input<string | undefined>(undefined)`
- `dismissible: input<boolean>(false)`
- `icon: input<LucideIconData | undefined>(undefined)`
- `banner: input<boolean>(false)`

**Outputs:** `dismissed`

---

#### `UiErrorPageComponent` (`ui-error-page`) → misc/
**Inputs:**
- `code: input<404 | 500 | 403 | 503>(404)`
- `title: input<string | undefined>(undefined)` (auto from code if not provided)
- `description: input<string | undefined>(undefined)`
- `showHomeButton: input<boolean>(true)`
- `showBackButton: input<boolean>(true)`

**Outputs:** `homeClicked`, `backClicked`

**Slot:** `#actions`

---

#### `UiCodeBlockComponent` (`ui-code-block`) → misc/
**Inputs:**
- `code: input<string>('')`
- `language: input<string>('typescript')`
- `showCopyButton: input<boolean>(true)`
- `showLineNumbers: input<boolean>(true)`
- `filename: input<string | undefined>(undefined)`

**Behavior:** Uses `highlight.js` (added as dependency) for syntax highlighting. Copy button uses Clipboard API.

---

#### `UiCalendarViewComponent` (`ui-calendar-view`) → data/
**Inputs:**
- `events: input<CalendarEvent[]>([])`
- `view: model<'month' | 'week' | 'day'>('month')`
- `currentDate: model<Date>(new Date())`
- `loading: input<boolean>(false)`

```typescript
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  color?: string;
  allDay?: boolean;
}
```

**Outputs:** `eventClicked: CalendarEvent`, `dateClicked: Date`, `viewChanged: 'month'|'week'|'day'`

---

#### `UiKanbanComponent` (`ui-kanban`) → data/
**Inputs:**
- `columns: input<KanbanColumn[]>([])`
- `draggable: input<boolean>(true)`

```typescript
export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
}
export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  items: KanbanItem[];
}
```

**Outputs:** `itemMoved: { itemId, fromColumnId, toColumnId, newIndex }`, `itemClicked: KanbanItem`

**Behavior:** Drag & drop via HTML5 Drag API (no external DnD library).

---

#### `UiColorThemeSwitcherComponent` (`ui-color-theme-switcher`) → misc/
**Inputs:**
- `currentTheme: model<string>('blue')`
- `themes: input<{ name: string; color: string }[]>(defaultPalettes)`
- `showLabel: input<boolean>(true)`

Default palettes from existing design tokens: Blue, Purple, Green, Orange, Rose, Teal, Emerald.

**Behavior:** Applies theme by setting `data-theme` attribute on `document.documentElement`.

---

### A6–A11 — Unit Tests for Existing Components

One agent per category generates `.spec.ts` for every component that doesn't have one.

| Agent | Category | Components |
|-------|----------|------------|
| A6 | button | Button, SpeedDial, SplitButton |
| A7 | form | All 28 form components |
| A8 | data | All 10 data components |
| A9 | overlay | All 7 overlay components |
| A10 | panel + menu + messages | Panel(8) + Menu(10) + Messages(2) |
| A11 | media + misc + file + chart | Media(3) + Misc(14) + File(1) + Chart(1) |

**Spec pattern (Angular TestBed + Signals):**
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiStatCardComponent } from './stat-card.component';

describe('UiStatCardComponent', () => {
  let fixture: ComponentFixture<UiStatCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiStatCardComponent] });
    fixture = TestBed.createComponent(UiStatCardComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays label', () => {
    fixture.componentRef.setInput('label', 'Revenue');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Revenue');
  });
});
```

---

## Barrel File Updates

### New category barrels
```
src/lib/components/layout/index.ts   → app-shell, page-header, sidebar-layout
src/lib/components/dashboard/index.ts → stat-card, kpi-card, metric-grid, sparkline-chart
src/lib/components/user/index.ts     → user-menu, user-card
```

### Updated root barrel
`src/lib/components/index.ts` adds:
```typescript
export * from './layout';
export * from './dashboard';
export * from './user';
```

### Existing category barrels updated
- `misc/index.ts` → adds alert, error-page, code-block, color-theme-switcher, notification-center
- `overlay/index.ts` → adds command-palette, search-bar
- `data/index.ts` → adds calendar-view, kanban

---

## New Dependencies

- `highlight.js` — syntax highlighting for CodeBlock component

---

## Success Criteria

- All 18 components render correctly in Storybook
- Each component has at least 3 stories (default, variants, interaction test)
- All `.spec.ts` pass with `ng test`
- No TypeScript errors
- Barrel exports work: `import { UiStatCardComponent } from '@fechorapps/ui'`
