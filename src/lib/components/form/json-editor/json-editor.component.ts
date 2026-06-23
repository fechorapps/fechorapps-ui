import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { UiCodeEditorComponent } from '../code-editor';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/** Flat representation of a single JSON node for rendering the tree view. */
export interface JsonNode {
  /** Full dot-/bracket-notation path (e.g. "users[0].name") */
  path: string;
  /** Display key (property name or array index string) */
  key: string;
  /** Resolved value at this node */
  value: JsonValue;
  /** JS typeof result, with 'null' added for null values */
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  /** Depth level (root = 0) */
  depth: number;
  /** Whether this node has children */
  hasChildren: boolean;
  /** Number of children (for collapsed summary) */
  childCount: number;
}

export type JsonEditorMode = 'tree' | 'raw';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * UiJsonEditorComponent
 *
 * An interactive JSON editor that supports two modes:
 * - **tree**: collapsible tree view for navigating and editing JSON structure.
 * - **raw**: a full code editor (`ui-code-editor`) for editing raw JSON text.
 *
 * @example
 * ```html
 * <ui-json-editor [(value)]="myJson" mode="tree"></ui-json-editor>
 * ```
 */
@Component({
  selector: 'ui-json-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiCodeEditorComponent],
  templateUrl: './json-editor.component.html',
})
export class UiJsonEditorComponent {
  // =========================================================================
  // INPUTS / MODEL
  // =========================================================================

  /** Two-way bound JSON value */
  value = model<JsonValue>(null);

  /** Current editor mode */
  mode = model<JsonEditorMode>('tree');

  /** When true, prevents editing (tree and raw modes are read-only) */
  readonly = input<boolean>(false);

  /** Height of the raw code editor (passed through to ui-code-editor) */
  height = input<string>('400px');

  /** Whether all nodes start expanded in tree mode */
  expandAll = input<boolean>(false);

  /** Maximum depth to render in the tree view */
  maxDepth = input<number>(10);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when the raw text is not valid JSON */
  readonly parseError = output<string>();

  // =========================================================================
  // STATE
  // =========================================================================

  /** Raw JSON text string used by the code editor in 'raw' mode */
  rawText = signal<string>('');

  /** Parse error message; null when the current raw text is valid */
  errorMessage = signal<string | null>(null);

  /**
   * Set of paths that are currently expanded.
   * Using a Set<string> instead of an `expanded` field per node so that
   * OnPush change detection triggers on Set replacement (not mutation).
   */
  expandedPaths = signal<Set<string>>(new Set<string>());

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Full flat list of ALL nodes (used by expandAll effect) */
  nodes = computed<JsonNode[]>(() => this.buildNodes(this.value(), '', 0));

  /** Flat list of *visible* nodes to render in tree mode */
  visibleNodes = computed<JsonNode[]>(() => {
    // Filter to only visible nodes based on expanded paths
    return this.filterVisible(this.nodes());
  });

  /** Formatted JSON string for the raw editor initial value */
  formattedJson = computed<string>(() => {
    try {
      return JSON.stringify(this.value(), null, 2);
    } catch {
      return '';
    }
  });

  // =========================================================================
  // LIFECYCLE
  // =========================================================================

  constructor() {
    // Sync rawText when value changes externally
    // We use a computed in the template instead to avoid circular updates

    // Expand all nodes when expandAll input becomes true
    effect(() => {
      if (this.expandAll()) {
        const allPaths = new Set(this.nodes().map(n => n.path));
        this.expandedPaths.set(allPaths);
      }
    });
  }

  // =========================================================================
  // TREE HELPERS
  // =========================================================================

  /**
   * Build a flat list of ALL nodes (not just visible ones) from a JSON value.
   * The `expanded` state is NOT stored here — it lives in `expandedPaths`.
   */
  buildNodes(
    val: JsonValue,
    path: string,
    depth: number,
    key = 'root'
  ): JsonNode[] {
    if (depth > this.maxDepth()) return [];
    const type = this.typeOf(val);
    const hasChildren = type === 'object' || type === 'array';
    const childCount = hasChildren
      ? type === 'array'
        ? (val as JsonValue[]).length
        : Object.keys(val as Record<string, JsonValue>).length
      : 0;

    const node: JsonNode = { path: path || '$', key, value: val, type, depth, hasChildren, childCount };
    const result: JsonNode[] = [node];

    if (hasChildren) {
      if (type === 'array') {
        (val as JsonValue[]).forEach((item, i) => {
          const childPath = `${path || '$'}[${i}]`;
          result.push(...this.buildNodes(item, childPath, depth + 1, String(i)));
        });
      } else {
        Object.entries(val as Record<string, JsonValue>).forEach(([k, v]) => {
          const childPath = path ? `${path}.${k}` : k;
          result.push(...this.buildNodes(v, childPath, depth + 1, k));
        });
      }
    }

    return result;
  }

  /**
   * Filter the full node list to only those whose ancestor paths are expanded.
   * Root node is always visible.
   */
  private filterVisible(nodes: JsonNode[]): JsonNode[] {
    if (!nodes.length) return [];
    const result: JsonNode[] = [];
    const expanded = this.expandedPaths();

    for (const node of nodes) {
      if (node.depth === 0) {
        result.push(node);
        continue;
      }
      if (this.isAncestorExpanded(node.path, node.depth, expanded)) {
        result.push(node);
      }
    }

    return result;
  }

  /**
   * Check that every ancestor of this node is expanded.
   * Walks the path upward and verifies each ancestor path is in `expandedPaths`.
   */
  private isAncestorExpanded(path: string, depth: number, expanded: Set<string>): boolean {
    if (depth === 0) return true;

    // Walk up the ancestor chain; all ancestors must be in expandedPaths.
    let current = path;
    while (true) {
      const parent = this.getParentPath(current);
      if (parent === null) break; // Reached root — no more ancestors to check
      if (!expanded.has(parent)) return false;
      current = parent;
    }
    return true;
  }

  /** Extract the parent path from a dot/bracket-notation path string */
  getParentPath(path: string): string | null {
    if (!path || path === '$') return null;

    // Remove trailing [n] or .key
    const bracketMatch = path.match(/^(.+)\[\d+\]$/);
    if (bracketMatch) return bracketMatch[1] || '$';

    const dotIdx = path.lastIndexOf('.');
    if (dotIdx > 0) return path.slice(0, dotIdx);

    // Top-level key (no dot, no bracket) — parent is root '$'
    return '$';
  }

  isExpanded(path: string): boolean {
    return this.expandedPaths().has(path);
  }

  toggleExpand(path: string): void {
    this.expandedPaths.update(s => {
      const next = new Set(s);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  }

  expandAllNodes(): void {
    const nodes = this.buildNodes(this.value(), '', 0);
    const paths = nodes
      .filter(n => n.hasChildren)
      .map(n => n.path || '$');
    this.expandedPaths.set(new Set(paths));
  }

  collapseAllNodes(): void {
    this.expandedPaths.set(new Set<string>());
  }

  typeOf(val: JsonValue): JsonNode['type'] {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'array';
    return typeof val as 'string' | 'number' | 'boolean' | 'object';
  }

  // =========================================================================
  // INLINE EDITING (tree mode)
  // =========================================================================

  /**
   * Update a leaf value at the given path with a new raw string.
   * The type of the original value is preserved (number stays number, etc.).
   */
  updateLeafValue(path: string, rawInput: string, originalType: JsonNode['type']): void {
    if (this.readonly()) return;

    let parsed: JsonValue;
    if (originalType === 'number') {
      const n = Number(rawInput);
      parsed = isNaN(n) ? rawInput : n;
    } else if (originalType === 'boolean') {
      parsed = rawInput === 'true';
    } else if (originalType === 'null') {
      parsed = rawInput === 'null' ? null : rawInput;
    } else {
      parsed = rawInput;
    }

    const updated = this.setValueAtPath(this.value(), path, parsed);
    this.value.set(updated);
  }

  /**
   * Immutably set a value at a dot/bracket-notation path in a JSON structure.
   */
  private setValueAtPath(root: JsonValue, path: string, newVal: JsonValue): JsonValue {
    if (!path || path === '$') return newVal;

    // Parse path segments
    const segments = this.parsePath(path);
    return this.setDeep(root, segments, newVal);
  }

  private setDeep(node: JsonValue, segments: (string | number)[], newVal: JsonValue): JsonValue {
    if (segments.length === 0) return newVal;

    const [head, ...rest] = segments;

    if (typeof head === 'number') {
      const arr = Array.isArray(node) ? [...(node as JsonValue[])] : [];
      arr[head] = rest.length === 0 ? newVal : this.setDeep(arr[head], rest, newVal);
      return arr;
    } else {
      const obj = { ...(node as Record<string, JsonValue>) };
      obj[head] = rest.length === 0 ? newVal : this.setDeep(obj[head], rest, newVal);
      return obj;
    }
  }

  /** Parse a dot/bracket-notation path into segments */
  parsePath(path: string): (string | number)[] {
    if (!path || path === '$') return [];
    const segments: (string | number)[] = [];
    // Match either [n] or .key or key (at start)
    const re = /\[(\d+)\]|\.([^.[]+)|^([^.[]+)/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(path)) !== null) {
      if (match[1] !== undefined) segments.push(Number(match[1]));
      else if (match[2] !== undefined) segments.push(match[2]);
      else if (match[3] !== undefined) segments.push(match[3]);
    }
    return segments;
  }

  // =========================================================================
  // RAW MODE
  // =========================================================================

  switchToRaw(): void {
    this.rawText.set(JSON.stringify(this.value(), null, 2));
    this.mode.set('raw');
  }

  onRawChange(text: string): void {
    this.rawText.set(text);
    try {
      const parsed = JSON.parse(text) as JsonValue;
      this.errorMessage.set(null);
      this.value.set(parsed);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      this.errorMessage.set(msg);
      this.parseError.emit(msg);
    }
  }

  // =========================================================================
  // UI HELPERS
  // =========================================================================

  /** CSS colour class for a type badge */
  typeColorClass(type: JsonNode['type']): string {
    switch (type) {
      case 'string':  return 'text-green-600 dark:text-green-400';
      case 'number':  return 'text-blue-600 dark:text-blue-400';
      case 'boolean': return 'text-yellow-600 dark:text-yellow-400';
      case 'null':    return 'text-muted-foreground';
      case 'object':  return 'text-foreground';
      case 'array':   return 'text-foreground';
      default:        return 'text-foreground';
    }
  }

  /** Human-readable display value for leaf nodes */
  displayValue(node: JsonNode): string {
    if (node.type === 'null') return 'null';
    if (node.type === 'string') return `"${node.value}"`;
    return String(node.value);
  }

  /** Summary label for collapsed container nodes */
  collapsedSummary(node: JsonNode): string {
    if (node.type === 'array') return `[… ${node.childCount} item${node.childCount === 1 ? '' : 's'}]`;
    return `{… ${node.childCount} key${node.childCount === 1 ? '' : 's'}}`;
  }

  trackByPath(_index: number, node: JsonNode): string {
    return node.path;
  }
}
