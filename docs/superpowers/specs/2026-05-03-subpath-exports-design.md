# Subpath Exports — Design Spec

**Date:** 2026-05-03
**Version target:** 1.2.0 (minor)

## Goal

Add secondary entry points to `@fechorapps/ui` so consumers can import by category (`@fechorapps/ui/button`, `@fechorapps/ui/chart`, etc.) and bundlers can exclude heavy dependencies like `chart.js` when they are not used.

## Approach

ng-packagr secondary entry points placed at the repository root level, one directory per component category. This is the same pattern used by Angular Material and Angular CDK.

The root entry point (`@fechorapps/ui`) is unchanged and continues to re-export everything for backwards compatibility.

## Entry Points

| Subpath | Source |
|---|---|
| `@fechorapps/ui/button` | `src/lib/components/button` |
| `@fechorapps/ui/chart` | `src/lib/components/chart` |
| `@fechorapps/ui/data` | `src/lib/components/data` |
| `@fechorapps/ui/file` | `src/lib/components/file` |
| `@fechorapps/ui/form` | `src/lib/components/form` |
| `@fechorapps/ui/media` | `src/lib/components/media` |
| `@fechorapps/ui/menu` | `src/lib/components/menu` |
| `@fechorapps/ui/messages` | `src/lib/components/messages` |
| `@fechorapps/ui/misc` | `src/lib/components/misc` |
| `@fechorapps/ui/overlay` | `src/lib/components/overlay` |
| `@fechorapps/ui/pages` | `src/lib/components/pages` |
| `@fechorapps/ui/panel` | `src/lib/components/panel` |
| `@fechorapps/ui/tokens` | `src/lib/tokens` |

## File Structure Per Entry Point

Each directory at the repo root contains exactly two files:

```
<category>/
  ng-package.json
  public-api.ts
```

`ng-package.json` (identical for all secondary entries):
```json
{
  "$schema": "../node_modules/ng-packagr/ng-package.schema.json"
}
```

`public-api.ts` for component categories:
```ts
export * from '../src/lib/components/<category>';
```

`tokens/public-api.ts`:
```ts
export * from '../src/lib/tokens';
```

## Build Output

ng-packagr auto-discovers secondary `ng-package.json` files and produces:

- A separate FESM bundle per entry point under `dist/fesm2022/`
- A subdirectory per entry point under `dist/` with `index.d.ts` and `package.json`
- An updated `exports` map in `dist/package.json` covering all entry points

`chart.js` will only be present in the `fechorapps-ui-chart.mjs` bundle. Consumers importing `@fechorapps/ui/button` will never load it.

## Backwards Compatibility

`src/public-api.ts` is not modified. `@fechorapps/ui` (root) continues to export all components and tokens. No existing consumer code breaks.

## What Is Not Changing

- Source files under `src/` — no modifications
- `src/public-api.ts` — unchanged
- Root `ng-package.json` — unchanged
- Build and release scripts — unchanged

## Deprecation Path (future)

In a future major version (v2.0.0), add `@deprecated` JSDoc on each re-export in `src/public-api.ts`. In the following major (v3.0.0), remove the root barrel entirely and require subpath imports.

## Release

This is an additive change. Release as `1.2.0` using the existing `npm run release:minor` script.
