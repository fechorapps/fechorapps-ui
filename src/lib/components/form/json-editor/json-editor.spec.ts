import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiJsonEditorComponent, JsonNode, JsonValue } from './json-editor.component';

describe('UiJsonEditorComponent', () => {
  let fixture: ComponentFixture<UiJsonEditorComponent>;
  let component: UiJsonEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiJsonEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiJsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  it('renders the component', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders in tree mode by default', () => {
    const list = fixture.nativeElement.querySelector('[role="tree"]');
    expect(list).toBeTruthy();
  });

  it('shows empty state when value is null', () => {
    fixture.componentRef.setInput('value', null);
    fixture.detectChanges();
    const empty = fixture.nativeElement.querySelector('[role="tree"] ~ *') ??
      fixture.nativeElement.textContent;
    expect(fixture.nativeElement.textContent).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Tree mode — node building
  // -------------------------------------------------------------------------

  it('buildNodes returns a single root node for a primitive', () => {
    const nodes = component.buildNodes('hello', '', 0);
    expect(nodes.length).toBe(1);
    expect(nodes[0].type).toBe('string');
    expect(nodes[0].value).toBe('hello');
  });

  it('buildNodes returns root + child nodes for an object', () => {
    const nodes = component.buildNodes({ a: 1, b: 'two' }, '', 0);
    expect(nodes.length).toBe(3); // root + 2 children
    expect(nodes[0].type).toBe('object');
    expect(nodes[0].hasChildren).toBe(true);
    expect(nodes[0].childCount).toBe(2);
  });

  it('buildNodes handles arrays correctly', () => {
    const nodes = component.buildNodes([10, 20, 30], '', 0);
    expect(nodes.length).toBe(4); // root + 3 items
    expect(nodes[0].type).toBe('array');
    expect(nodes[1].key).toBe('0');
    expect(nodes[1].path).toBe('$[0]');
  });

  it('buildNodes assigns correct depth', () => {
    const nodes = component.buildNodes({ nested: { x: 1 } }, '', 0);
    // nodes: root(0), nested(1), x(2)
    const depths = nodes.map(n => n.depth);
    expect(depths).toEqual([0, 1, 2]);
  });

  it('typeOf correctly identifies all types', () => {
    expect(component.typeOf(null)).toBe('null');
    expect(component.typeOf('text')).toBe('string');
    expect(component.typeOf(42)).toBe('number');
    expect(component.typeOf(true)).toBe('boolean');
    expect(component.typeOf([])).toBe('array');
    expect(component.typeOf({})).toBe('object');
  });

  // -------------------------------------------------------------------------
  // Expand / collapse
  // -------------------------------------------------------------------------

  it('all nodes are collapsed by default', () => {
    expect(component.expandedPaths().size).toBe(0);
  });

  it('toggleExpand adds a path to expandedPaths', () => {
    component.toggleExpand('$');
    expect(component.expandedPaths().has('$')).toBe(true);
  });

  it('toggleExpand removes the path when called again (toggle off)', () => {
    component.toggleExpand('myPath');
    component.toggleExpand('myPath');
    expect(component.expandedPaths().has('myPath')).toBe(false);
  });

  it('isExpanded returns false for unexpanded paths', () => {
    expect(component.isExpanded('anything')).toBe(false);
  });

  it('isExpanded returns true after toggleExpand', () => {
    component.toggleExpand('root.child');
    expect(component.isExpanded('root.child')).toBe(true);
  });

  it('expandAllNodes expands every container node', () => {
    fixture.componentRef.setInput('value', { a: { b: 1 }, c: [2, 3] });
    fixture.detectChanges();
    component.expandAllNodes();
    expect(component.expandedPaths().size).toBeGreaterThan(0);
  });

  it('collapseAllNodes clears expandedPaths', () => {
    component.toggleExpand('$');
    component.toggleExpand('a');
    component.collapseAllNodes();
    expect(component.expandedPaths().size).toBe(0);
  });

  // -------------------------------------------------------------------------
  // visibleNodes computed
  // -------------------------------------------------------------------------

  it('visibleNodes shows only root when all nodes are collapsed', () => {
    fixture.componentRef.setInput('value', { a: 1, b: 2 });
    fixture.detectChanges();
    const visible = component.visibleNodes();
    // Root is always visible; children are not visible when parent is collapsed
    expect(visible.length).toBe(1);
    expect(visible[0].depth).toBe(0);
  });

  it('visibleNodes shows children after expanding root', () => {
    fixture.componentRef.setInput('value', { a: 1, b: 2 });
    fixture.detectChanges();
    component.toggleExpand('$');
    fixture.detectChanges();
    const visible = component.visibleNodes();
    // Root + 2 children
    expect(visible.length).toBe(3);
  });

  // -------------------------------------------------------------------------
  // Inline editing
  // -------------------------------------------------------------------------

  it('updateLeafValue updates string value and emits valueChange', () => {
    const emitted: JsonValue[] = [];
    component.valueChange.subscribe((v: JsonValue) => emitted.push(v));

    fixture.componentRef.setInput('value', { name: 'Alice' });
    fixture.detectChanges();

    component.updateLeafValue('name', 'Bob', 'string');
    expect((component.value() as Record<string, JsonValue>)['name']).toBe('Bob');
    expect(emitted.length).toBe(1);
    expect((emitted[0] as Record<string, JsonValue>)['name']).toBe('Bob');
  });

  it('updateLeafValue coerces number type', () => {
    fixture.componentRef.setInput('value', { count: 5 });
    fixture.detectChanges();

    component.updateLeafValue('count', '42', 'number');
    expect((component.value() as Record<string, JsonValue>)['count']).toBe(42);
  });

  it('updateLeafValue coerces boolean type', () => {
    fixture.componentRef.setInput('value', { flag: false });
    fixture.detectChanges();

    component.updateLeafValue('flag', 'true', 'boolean');
    expect((component.value() as Record<string, JsonValue>)['flag']).toBe(true);
  });

  it('updateLeafValue does nothing when readonly is true', () => {
    fixture.componentRef.setInput('value', { x: 1 });
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    component.updateLeafValue('x', '999', 'number');
    expect((component.value() as Record<string, JsonValue>)['x']).toBe(1);
  });

  // -------------------------------------------------------------------------
  // Path parsing
  // -------------------------------------------------------------------------

  it('parsePath handles top-level keys', () => {
    expect(component.parsePath('name')).toEqual(['name']);
  });

  it('parsePath handles dot-notation', () => {
    expect(component.parsePath('a.b.c')).toEqual(['a', 'b', 'c']);
  });

  it('parsePath handles bracket-notation for arrays', () => {
    expect(component.parsePath('items[0]')).toEqual(['items', 0]);
  });

  it('parsePath handles mixed notation', () => {
    expect(component.parsePath('a.b[2].c')).toEqual(['a', 'b', 2, 'c']);
  });

  it('parsePath returns empty array for root path', () => {
    expect(component.parsePath('$')).toEqual([]);
    expect(component.parsePath('')).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Raw mode
  // -------------------------------------------------------------------------

  it('onRawChange parses valid JSON and updates value', () => {
    const emitted: JsonValue[] = [];
    component.valueChange.subscribe((v: JsonValue) => emitted.push(v));

    component.onRawChange('{"hello":"world"}');
    expect(component.value()).toEqual({ hello: 'world' });
    expect(component.errorMessage()).toBeNull();
    expect(emitted.length).toBe(1);
  });

  it('onRawChange sets errorMessage for invalid JSON', () => {
    const errors: string[] = [];
    component.parseError.subscribe((e: string) => errors.push(e));

    component.onRawChange('{bad json}');
    expect(component.errorMessage()).not.toBeNull();
    expect(errors.length).toBe(1);
  });

  it('onRawChange clears errorMessage when JSON becomes valid again', () => {
    component.onRawChange('{bad}');
    expect(component.errorMessage()).not.toBeNull();
    component.onRawChange('{"ok":true}');
    expect(component.errorMessage()).toBeNull();
  });

  // -------------------------------------------------------------------------
  // Display helpers
  // -------------------------------------------------------------------------

  it('displayValue wraps strings in quotes', () => {
    const node: JsonNode = {
      path: 'name', key: 'name', value: 'Alice',
      type: 'string', depth: 1, hasChildren: false, childCount: 0,
    };
    expect(component.displayValue(node)).toBe('"Alice"');
  });

  it('displayValue shows null as "null"', () => {
    const node: JsonNode = {
      path: 'x', key: 'x', value: null,
      type: 'null', depth: 1, hasChildren: false, childCount: 0,
    };
    expect(component.displayValue(node)).toBe('null');
  });

  it('displayValue shows numbers as strings', () => {
    const node: JsonNode = {
      path: 'count', key: 'count', value: 42,
      type: 'number', depth: 1, hasChildren: false, childCount: 0,
    };
    expect(component.displayValue(node)).toBe('42');
  });

  it('collapsedSummary shows correct label for arrays', () => {
    const node: JsonNode = {
      path: '$', key: 'root', value: [1, 2, 3],
      type: 'array', depth: 0, hasChildren: true, childCount: 3,
    };
    expect(component.collapsedSummary(node)).toBe('[… 3 items]');
  });

  it('collapsedSummary shows correct label for objects', () => {
    const node: JsonNode = {
      path: '$', key: 'root', value: { a: 1 },
      type: 'object', depth: 0, hasChildren: true, childCount: 1,
    };
    expect(component.collapsedSummary(node)).toBe('{… 1 key}');
  });

  // -------------------------------------------------------------------------
  // getParentPath
  // -------------------------------------------------------------------------

  it('getParentPath returns null for root path', () => {
    expect(component.getParentPath('$')).toBeNull();
    expect(component.getParentPath('')).toBeNull();
  });

  it('getParentPath returns $ for top-level key', () => {
    expect(component.getParentPath('name')).toBe('$');
  });

  it('getParentPath handles dot notation', () => {
    expect(component.getParentPath('a.b.c')).toBe('a.b');
  });

  it('getParentPath handles bracket notation', () => {
    expect(component.getParentPath('items[2]')).toBe('items');
  });
});
