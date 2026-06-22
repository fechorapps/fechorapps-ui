import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTerminalComponent } from './terminal.component';

describe('UiTerminalComponent', () => {
  let fixture: ComponentFixture<UiTerminalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTerminalComponent] });
    fixture = TestBed.createComponent(UiTerminalComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays the welcome message', () => {
    fixture.componentRef.setInput('welcomeMessage', 'Hello, world!');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Hello, world!');
  });

  it('starts with no commands', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.commands()).toEqual([]);
  });

  it('executes a command and adds it to the list', () => {
    fixture.detectChanges();
    fixture.componentInstance.currentInput.set('ls -la');
    fixture.componentInstance.executeCommand();
    expect(fixture.componentInstance.commands().length).toBe(1);
    expect(fixture.componentInstance.commands()[0].command).toBe('ls -la');
  });

  it('clears currentInput after executing a command', () => {
    fixture.detectChanges();
    fixture.componentInstance.currentInput.set('echo hello');
    fixture.componentInstance.executeCommand();
    expect(fixture.componentInstance.currentInput()).toBe('');
  });

  it('emits onCommand with the command string', () => {
    fixture.detectChanges();
    const spy = jasmine.createSpy('onCommand');
    fixture.componentInstance.onCommand.subscribe(spy);
    fixture.componentInstance.currentInput.set('pwd');
    fixture.componentInstance.executeCommand();
    expect(spy).toHaveBeenCalledWith('pwd');
  });

  it('does not add empty command', () => {
    fixture.detectChanges();
    fixture.componentInstance.currentInput.set('   ');
    fixture.componentInstance.executeCommand();
    expect(fixture.componentInstance.commands().length).toBe(0);
  });

  it('adds a response to the last command via addResponse', () => {
    fixture.detectChanges();
    fixture.componentInstance.currentInput.set('date');
    fixture.componentInstance.executeCommand();
    fixture.componentInstance.addResponse('Mon Jun 21 2026');
    expect(fixture.componentInstance.commands()[0].response).toBe('Mon Jun 21 2026');
  });

  it('clears all commands via clear()', () => {
    fixture.detectChanges();
    fixture.componentInstance.currentInput.set('cmd1');
    fixture.componentInstance.executeCommand();
    fixture.componentInstance.clear();
    expect(fixture.componentInstance.commands()).toEqual([]);
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'h-64');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('h-64');
  });
});
