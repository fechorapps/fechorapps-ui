import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCodeEditorComponent } from './code-editor.component';

describe('UiCodeEditorComponent', () => {
  let fixture: ComponentFixture<UiCodeEditorComponent>;
  let component: UiCodeEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCodeEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the component', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders fallback textarea before CodeMirror loads', () => {
    // cmLoaded is false by default (CM loads asynchronously via afterNextRender)
    expect(component.cmLoaded()).toBe(false);
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('reflects value input in the fallback textarea', () => {
    fixture.componentRef.setInput('value', 'const x = 1;');
    fixture.detectChanges();
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textarea.value).toBe('const x = 1;');
  });

  it('onFallbackInput updates value model and emits codeChange', () => {
    const emitted: string[] = [];
    component.codeChange.subscribe((v: string) => emitted.push(v));

    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'let y = 2;';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value()).toBe('let y = 2;');
    expect(emitted).toEqual(['let y = 2;']);
  });

  it('sets readOnly attribute on textarea when readonly input is true', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textarea.readOnly).toBe(true);
  });

  it('textarea is not readOnly by default', () => {
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textarea.readOnly).toBe(false);
  });

  it('applies placeholder to the fallback textarea', () => {
    fixture.componentRef.setInput('placeholder', 'Write some code…');
    fixture.detectChanges();
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
    expect(textarea.placeholder).toBe('Write some code…');
  });

  it('applies the height style to the container', () => {
    fixture.componentRef.setInput('height', '500px');
    fixture.detectChanges();
    const container: HTMLElement = fixture.nativeElement.querySelector('div');
    expect(container.style.height).toBe('500px');
  });
});
