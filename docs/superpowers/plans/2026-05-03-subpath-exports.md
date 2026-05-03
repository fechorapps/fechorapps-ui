# Subpath Exports Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 13 secondary entry points to `@fechorapps/ui` so bundlers can exclude unused categories (e.g., `chart.js`) when consumers import from subpaths like `@fechorapps/ui/button`.

**Architecture:** ng-packagr auto-discovers `ng-package.json` files in subdirectories and compiles each into a separate FESM bundle. One directory per component category is created at the repo root. Each contains only a minimal `ng-package.json` and a thin `public-api.ts` that re-exports from `src/`. The root entry point and all source files remain untouched.

**Tech Stack:** ng-packagr 21, Angular 21, TypeScript 5.9

---

### Task 1: Create component category entry points

**Files:**
- Create: `button/ng-package.json`
- Create: `button/public-api.ts`
- Create: `chart/ng-package.json`
- Create: `chart/public-api.ts`
- Create: `data/ng-package.json`
- Create: `data/public-api.ts`
- Create: `file/ng-package.json`
- Create: `file/public-api.ts`
- Create: `form/ng-package.json`
- Create: `form/public-api.ts`
- Create: `media/ng-package.json`
- Create: `media/public-api.ts`
- Create: `menu/ng-package.json`
- Create: `menu/public-api.ts`
- Create: `messages/ng-package.json`
- Create: `messages/public-api.ts`
- Create: `misc/ng-package.json`
- Create: `misc/public-api.ts`
- Create: `overlay/ng-package.json`
- Create: `overlay/public-api.ts`
- Create: `pages/ng-package.json`
- Create: `pages/public-api.ts`
- Create: `panel/ng-package.json`
- Create: `panel/public-api.ts`

- [ ] **Step 1: Create `button/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 2: Create `button/public-api.ts`**

```ts
export * from '../src/lib/components/button';
```

- [ ] **Step 3: Create `chart/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 4: Create `chart/public-api.ts`**

```ts
export * from '../src/lib/components/chart';
```

- [ ] **Step 5: Create `data/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 6: Create `data/public-api.ts`**

```ts
export * from '../src/lib/components/data';
```

- [ ] **Step 7: Create `file/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 8: Create `file/public-api.ts`**

```ts
export * from '../src/lib/components/file';
```

- [ ] **Step 9: Create `form/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 10: Create `form/public-api.ts`**

```ts
export * from '../src/lib/components/form';
```

- [ ] **Step 11: Create `media/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 12: Create `media/public-api.ts`**

```ts
export * from '../src/lib/components/media';
```

- [ ] **Step 13: Create `menu/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 14: Create `menu/public-api.ts`**

```ts
export * from '../src/lib/components/menu';
```

- [ ] **Step 15: Create `messages/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 16: Create `messages/public-api.ts`**

```ts
export * from '../src/lib/components/messages';
```

- [ ] **Step 17: Create `misc/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 18: Create `misc/public-api.ts`**

```ts
export * from '../src/lib/components/misc';
```

- [ ] **Step 19: Create `overlay/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 20: Create `overlay/public-api.ts`**

```ts
export * from '../src/lib/components/overlay';
```

- [ ] **Step 21: Create `pages/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 22: Create `pages/public-api.ts`**

```ts
export * from '../src/lib/components/pages';
```

- [ ] **Step 23: Create `panel/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 24: Create `panel/public-api.ts`**

```ts
export * from '../src/lib/components/panel';
```

- [ ] **Step 25: Commit**

```bash
git add button/ chart/ data/ file/ form/ media/ menu/ messages/ misc/ overlay/ pages/ panel/
git commit -m "feat: add secondary entry points for component categories"
```

---

### Task 2: Create tokens entry point

**Files:**
- Create: `tokens/ng-package.json`
- Create: `tokens/public-api.ts`

- [ ] **Step 1: Create `tokens/ng-package.json`**

```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

- [ ] **Step 2: Create `tokens/public-api.ts`**

```ts
export * from '../src/lib/tokens';
```

- [ ] **Step 3: Commit**

```bash
git add tokens/
git commit -m "feat: add secondary entry point for design tokens"
```

---

### Task 3: Build and verify output

**Files:**
- Read: `dist/package.json` (generated by build)

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: build completes with no errors. ng-packagr logs a line for each entry point it compiles — you should see 14 entries (root + 13 secondary).

- [ ] **Step 2: Verify the exports map**

```bash
node -e "
const pkg = require('./dist/package.json');
const exports = Object.keys(pkg.exports);
console.log('Entry points found:', exports.length);
exports.forEach(e => console.log(' ', e));
"
```

Expected output — 14 keys, one per entry point:

```
Entry points found: 14
  ./package.json
  .
  ./button
  ./chart
  ./data
  ./file
  ./form
  ./media
  ./menu
  ./messages
  ./misc
  ./overlay
  ./pages
  ./panel
  ./tokens
```

- [ ] **Step 3: Verify separate FESM bundles exist**

```bash
ls dist/fesm2022/ | grep fechorapps
```

Expected: 14 `.mjs` files, one per entry point:

```
fechorapps-ui.mjs
fechorapps-ui-button.mjs
fechorapps-ui-chart.mjs
fechorapps-ui-data.mjs
fechorapps-ui-file.mjs
fechorapps-ui-form.mjs
fechorapps-ui-media.mjs
fechorapps-ui-menu.mjs
fechorapps-ui-messages.mjs
fechorapps-ui-misc.mjs
fechorapps-ui-overlay.mjs
fechorapps-ui-pages.mjs
fechorapps-ui-panel.mjs
fechorapps-ui-tokens.mjs
```

- [ ] **Step 4: Verify chart.js is NOT in the button bundle**

```bash
grep -l "chart" dist/fesm2022/fechorapps-ui-button.mjs && echo "FAIL: chart found in button bundle" || echo "OK: chart not in button bundle"
```

Expected: `OK: chart not in button bundle`

- [ ] **Step 5: Verify chart.js IS in the chart bundle**

```bash
grep -c "Chart\|chart\.js\|register" dist/fesm2022/fechorapps-ui-chart.mjs
```

Expected: a number greater than 0.

---

### Task 4: Release as 1.2.0

**Files:**
- Modify: `package.json` (version bump, handled by npm version)

- [ ] **Step 1: Confirm working tree is clean**

```bash
git status
```

Expected: `nothing to commit, working tree clean`. If there are uncommitted changes, commit or stash them first.

- [ ] **Step 2: Run the minor release script**

```bash
npm run release:minor
```

This script runs `npm version minor` (bumps `package.json` to `1.2.0` and creates a git tag), then `npm run build`, then `cd dist && npm publish` to the GitHub Packages registry.

Expected: ends with `npm notice Publishing to https://npm.pkg.github.com` and no errors.
