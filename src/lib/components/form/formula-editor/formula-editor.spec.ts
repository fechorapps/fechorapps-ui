import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiFormulaEditorComponent, FormulaFunction } from './formula-editor.component';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a synthetic InputEvent with a given value and optional selectionStart. */
function inputEvent(value: string, selectionStart = value.length): Event {
  const input = document.createElement('input');
  input.value = value;
  Object.defineProperty(input, 'selectionStart', { value: selectionStart, writable: true });
  return Object.assign(new Event('input'), { target: input });
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('UiFormulaEditorComponent', () => {
  let fixture: ComponentFixture<UiFormulaEditorComponent>;
  let component: UiFormulaEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiFormulaEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiFormulaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  it('renders the component', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows the "=" prefix badge', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span).toBeTruthy();
    expect(span.textContent.trim()).toBe('=');
  });

  it('renders a text input', () => {
    const input = fixture.nativeElement.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Builtin functions
  // -------------------------------------------------------------------------

  it('allFunctions contains 10 builtin functions by default', () => {
    expect(component.allFunctions().length).toBe(10);
  });

  it('allFunctions contains SUM builtin', () => {
    const names = component.allFunctions().map(f => f.name);
    expect(names).toContain('SUM');
  });

  it('allFunctions contains all 10 expected builtins', () => {
    const names = component.allFunctions().map(f => f.name);
    const expected = ['SUM', 'AVG', 'IF', 'CONCAT', 'LEN', 'UPPER', 'LOWER', 'ROUND', 'MIN', 'MAX'];
    for (const fn of expected) {
      expect(names).toContain(fn);
    }
  });

  it('allFunctions excludes builtins when builtins=false', () => {
    fixture.componentRef.setInput('builtins', false);
    fixture.detectChanges();
    expect(component.allFunctions().length).toBe(0);
  });

  // -------------------------------------------------------------------------
  // Suggestions — builtin match
  // -------------------------------------------------------------------------

  it('typing "SUM" shows SUM suggestion', () => {
    component.onInput(inputEvent('=SUM'));
    fixture.detectChanges();
    const labels = component.suggestions().map(s => s.label);
    expect(labels).toContain('SUM');
  });

  it('typing "su" (lowercase) shows SUM suggestion (case-insensitive)', () => {
    component.onInput(inputEvent('=su'));
    fixture.detectChanges();
    const labels = component.suggestions().map(s => s.label);
    expect(labels).toContain('SUM');
  });

  it('suggestions are empty when cursor word is empty', () => {
    component.onInput(inputEvent('=SUM('));
    fixture.detectChanges();
    expect(component.suggestions().length).toBe(0);
  });

  it('suggestions contain type=function for builtin matches', () => {
    component.onInput(inputEvent('=SU'));
    fixture.detectChanges();
    const fnSuggestions = component.suggestions().filter(s => s.type === 'function');
    expect(fnSuggestions.length).toBeGreaterThan(0);
  });

  // -------------------------------------------------------------------------
  // Suggestions — custom functions
  // -------------------------------------------------------------------------

  it('custom functions appear when provided', () => {
    const customFn: FormulaFunction = {
      name: 'MYFUNCTION',
      description: 'Custom function',
      args: ['x'],
      example: '=MYFUNCTION(1)',
    };
    fixture.componentRef.setInput('functions', [customFn]);
    fixture.detectChanges();

    component.onInput(inputEvent('=MYFUNC'));
    fixture.detectChanges();

    const labels = component.suggestions().map(s => s.label);
    expect(labels).toContain('MYFUNCTION');
  });

  it('custom functions are excluded when builtins=false and no custom provided', () => {
    fixture.componentRef.setInput('builtins', false);
    fixture.detectChanges();

    component.onInput(inputEvent('=SUM'));
    fixture.detectChanges();

    expect(component.suggestions().length).toBe(0);
  });

  // -------------------------------------------------------------------------
  // Suggestions — variables
  // -------------------------------------------------------------------------

  it('variables appear in suggestions', () => {
    fixture.componentRef.setInput('variables', ['Revenue', 'Cost']);
    fixture.detectChanges();

    component.onInput(inputEvent('=Rev'));
    fixture.detectChanges();

    const labels = component.suggestions().map(s => s.label);
    expect(labels).toContain('Revenue');
  });

  it('variable suggestions have type=variable', () => {
    fixture.componentRef.setInput('variables', ['Revenue']);
    fixture.detectChanges();

    component.onInput(inputEvent('=Rev'));
    fixture.detectChanges();

    const varSuggestions = component.suggestions().filter(s => s.type === 'variable');
    expect(varSuggestions.length).toBeGreaterThan(0);
    expect(varSuggestions[0].fn).toBeNull();
  });

  // -------------------------------------------------------------------------
  // isValid — balanced parentheses
  // -------------------------------------------------------------------------

  it('isValid is false when formula does not start with "="', () => {
    fixture.componentRef.setInput('value', 'SUM(A1)');
    fixture.detectChanges();
    expect(component.isValid()).toBe(false);
  });

  it('isValid is true when formula starts with "=" and has no parens', () => {
    fixture.componentRef.setInput('value', '=A1+B1');
    fixture.detectChanges();
    expect(component.isValid()).toBe(true);
  });

  it('isValid is true when parens are balanced', () => {
    fixture.componentRef.setInput('value', '=SUM(A1, A2)');
    fixture.detectChanges();
    expect(component.isValid()).toBe(true);
  });

  it('isValid is false when parens are unbalanced — too many open', () => {
    fixture.componentRef.setInput('value', '=SUM(A1, A2');
    fixture.detectChanges();
    expect(component.isValid()).toBe(false);
  });

  it('isValid is false when parens are unbalanced — too many close', () => {
    fixture.componentRef.setInput('value', '=SUM(A1))');
    fixture.detectChanges();
    expect(component.isValid()).toBe(false);
  });

  it('isValid is false for empty string', () => {
    fixture.componentRef.setInput('value', '');
    fixture.detectChanges();
    expect(component.isValid()).toBe(false);
  });

  // -------------------------------------------------------------------------
  // validChange output
  // -------------------------------------------------------------------------

  it('validChange emits true when formula becomes valid', () => {
    const emitted: boolean[] = [];
    component.validChange.subscribe((v: boolean) => emitted.push(v));

    component.onInput(inputEvent('=SUM(A1, A2)'));
    expect(emitted).toContain(true);
  });

  it('validChange emits false for unbalanced parens', () => {
    const emitted: boolean[] = [];
    component.validChange.subscribe((v: boolean) => emitted.push(v));

    component.onInput(inputEvent('=SUM(A1'));
    expect(emitted).toContain(false);
  });

  // -------------------------------------------------------------------------
  // formulaChange output
  // -------------------------------------------------------------------------

  it('formulaChange emits the new value on input', () => {
    const emitted: string[] = [];
    component.formulaChange.subscribe((v: string) => emitted.push(v));

    component.onInput(inputEvent('=SUM(A1)'));
    expect(emitted).toContain('=SUM(A1)');
  });

  // -------------------------------------------------------------------------
  // Disabled state
  // -------------------------------------------------------------------------

  it('input element is disabled when disabled=true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  // -------------------------------------------------------------------------
  // insertSuggestion
  // -------------------------------------------------------------------------

  it('insertSuggestion appends "(" for function suggestions', () => {
    const emitted: string[] = [];
    component.formulaChange.subscribe((v: string) => emitted.push(v));

    component.onInput(inputEvent('=SU'));
    fixture.detectChanges();

    const suggestion = component.suggestions().find(s => s.label === 'SUM');
    expect(suggestion).toBeTruthy();
    component.insertSuggestion(suggestion!);

    expect(emitted[emitted.length - 1]).toBe('=SUM(');
  });

  it('insertSuggestion hides suggestions after insertion', () => {
    component.onInput(inputEvent('=SU'));
    fixture.detectChanges();

    const suggestion = component.suggestions().find(s => s.label === 'SUM');
    component.insertSuggestion(suggestion!);
    fixture.detectChanges();

    expect(component.showSuggestions()).toBe(false);
  });

  // -------------------------------------------------------------------------
  // Active function tooltip
  // -------------------------------------------------------------------------

  it('activeFunction is set when cursor is inside function parens', () => {
    component.onInput(inputEvent('=SUM(A1', 7));
    fixture.detectChanges();
    expect(component.activeFunction()).not.toBeNull();
    expect(component.activeFunction()!.name).toBe('SUM');
  });

  it('activeFunction is null when cursor is outside any function parens', () => {
    component.onInput(inputEvent('=SUM(A1)', 8));
    fixture.detectChanges();
    expect(component.activeFunction()).toBeNull();
  });
});
