import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMessagesComponent, Message } from './messages.component';

describe('UiMessagesComponent', () => {
  let fixture: ComponentFixture<UiMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMessagesComponent] });
    fixture = TestBed.createComponent(UiMessagesComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays messages from value input', () => {
    const msgs: Message[] = [
      { severity: 'info', summary: 'Info', detail: 'This is an info message' },
      { severity: 'success', summary: 'Success', detail: 'Done!' },
    ];
    fixture.componentRef.setInput('value', msgs);
    fixture.detectChanges();
    expect(fixture.componentInstance.messages().length).toBe(2);
  });

  it('defaults closable to true', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.closable()).toBe(true);
  });

  it('defaults life to 0 (no auto-close)', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.life()).toBe(0);
  });

  it('adds a message via add()', () => {
    fixture.detectChanges();
    fixture.componentInstance.add({ severity: 'warn', summary: 'Warning', detail: 'Check this' });
    expect(fixture.componentInstance.messages().length).toBe(1);
  });

  it('adds multiple messages via addAll()', () => {
    fixture.detectChanges();
    fixture.componentInstance.addAll([
      { severity: 'info', summary: 'First' },
      { severity: 'error', summary: 'Second' },
    ]);
    expect(fixture.componentInstance.messages().length).toBe(2);
  });

  it('clears all messages via clear()', () => {
    fixture.detectChanges();
    fixture.componentInstance.add({ severity: 'info', summary: 'Hello' });
    fixture.componentInstance.clear();
    expect(fixture.componentInstance.messages().length).toBe(0);
  });

  it('emits onClose when a message is closed', () => {
    fixture.detectChanges();
    fixture.componentInstance.add({ severity: 'success', summary: 'Test', id: 'test-1' });
    const emitted: unknown[] = [];
    fixture.componentInstance.onClose.subscribe((e) => emitted.push(e));
    fixture.componentInstance.closeMessage(0);
    expect(emitted.length).toBe(1);
  });

  it('formats message text with summary and detail', () => {
    fixture.detectChanges();
    const msg: Message = { severity: 'info', summary: 'Hello', detail: 'World' };
    expect(fixture.componentInstance.getMessageText(msg)).toBe('Hello - World');
  });
});
