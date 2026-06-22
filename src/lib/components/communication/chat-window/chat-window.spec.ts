import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiChatWindowComponent, ChatMessage } from './chat-window.component';

const makeMsg = (
  id: string,
  sender: string,
  tsOffset: number,
  isOwn?: boolean
): ChatMessage => ({
  id,
  content: `Message ${id}`,
  sender,
  timestamp: new Date(Date.now() - tsOffset),
  isOwn,
});

describe('UiChatWindowComponent', () => {
  let fixture: ComponentFixture<UiChatWindowComponent>;
  let component: UiChatWindowComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiChatWindowComponent] });
    fixture = TestBed.createComponent(UiChatWindowComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('sortedMessages returns messages sorted by timestamp ascending', () => {
    const msgs: ChatMessage[] = [
      makeMsg('c', 'Alice', 1000),
      makeMsg('a', 'Alice', 3000),
      makeMsg('b', 'Alice', 2000),
    ];
    fixture.componentRef.setInput('messages', msgs);
    fixture.detectChanges();
    const sorted = component.sortedMessages();
    expect(sorted[0].id).toBe('a');
    expect(sorted[1].id).toBe('b');
    expect(sorted[2].id).toBe('c');
  });

  it('isOwn returns true when msg.isOwn is true', () => {
    const msg = makeMsg('1', 'Alice', 1000, true);
    expect(component.isOwn(msg)).toBeTrue();
  });

  it('isOwn returns true when sender matches currentUser', () => {
    fixture.componentRef.setInput('currentUser', 'me');
    const msg = makeMsg('1', 'me', 1000);
    expect(component.isOwn(msg)).toBeTrue();
  });

  it('isOwn returns false for other senders', () => {
    fixture.componentRef.setInput('currentUser', 'me');
    const msg = makeMsg('1', 'Alice', 1000);
    expect(component.isOwn(msg)).toBeFalse();
  });

  it('sendMessage emits messageSent with inputValue and clears input', () => {
    const emitted: string[] = [];
    component.messageSent.subscribe((v: string) => emitted.push(v));
    component.inputValue.set('Hello world');
    component.sendMessage();
    expect(emitted).toEqual(['Hello world']);
    expect(component.inputValue()).toBe('');
  });

  it('sendMessage does not emit when inputValue is empty', () => {
    const emitted: string[] = [];
    component.messageSent.subscribe((v: string) => emitted.push(v));
    component.inputValue.set('');
    component.sendMessage();
    expect(emitted.length).toBe(0);
  });

  it('sendMessage does not emit when inputValue is whitespace only', () => {
    const emitted: string[] = [];
    component.messageSent.subscribe((v: string) => emitted.push(v));
    component.inputValue.set('   ');
    component.sendMessage();
    expect(emitted.length).toBe(0);
  });

  it('getInitials returns first letters of each word, max 2 chars', () => {
    expect(component.getInitials('John Doe')).toBe('JD');
    expect(component.getInitials('Alice')).toBe('A');
    expect(component.getInitials('Alice Bob Charlie')).toBe('AB');
  });

  it('formatTime returns HH:mm string', () => {
    const d = new Date(2024, 0, 1, 9, 5);
    expect(component.formatTime(d)).toBe('09:05');
  });
});
