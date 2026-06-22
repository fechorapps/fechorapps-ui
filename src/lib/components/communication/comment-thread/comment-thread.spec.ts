import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCommentThreadComponent, Comment } from './comment-thread.component';

const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'Alice',
    content: 'Hello',
    timestamp: new Date(Date.now() - 3600000),
    likes: 3,
  },
  {
    id: '2',
    author: 'Bob',
    content: 'World',
    timestamp: new Date(Date.now() - 1800000),
    likes: 1,
    replies: [
      {
        id: '2-1',
        author: 'Carol',
        content: 'Reply here',
        timestamp: new Date(Date.now() - 900000),
        likes: 0,
      },
    ],
  },
];

describe('UiCommentThreadComponent', () => {
  let fixture: ComponentFixture<UiCommentThreadComponent>;
  let component: UiCommentThreadComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCommentThreadComponent] });
    fixture = TestBed.createComponent(UiCommentThreadComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('toggleReply sets replyingToId to comment id', () => {
    component.toggleReply('1');
    expect(component.replyingToId()).toBe('1');
  });

  it('toggleReply closes when called again with same id', () => {
    component.toggleReply('1');
    component.toggleReply('1');
    expect(component.replyingToId()).toBeNull();
  });

  it('submitReply emits replied and resets state', () => {
    const emitted: { parentId: string; content: string }[] = [];
    component.replied.subscribe((v) => emitted.push(v));
    component.toggleReply('1');
    component.replyText.set('Nice comment!');
    component.submitReply('1');
    expect(emitted).toEqual([{ parentId: '1', content: 'Nice comment!' }]);
    expect(component.replyText()).toBe('');
    expect(component.replyingToId()).toBeNull();
  });

  it('submitComment emits submitted and resets newComment', () => {
    const emitted: string[] = [];
    component.submitted.subscribe((v: string) => emitted.push(v));
    component.newComment.set('My new comment');
    component.submitComment();
    expect(emitted).toEqual(['My new comment']);
    expect(component.newComment()).toBe('');
  });

  it('formatRelativeTime returns "just now" for recent timestamps', () => {
    const now = new Date();
    expect(component.formatRelativeTime(now)).toBe('just now');
  });

  it('formatRelativeTime returns minutes ago', () => {
    const d = new Date(Date.now() - 5 * 60000);
    expect(component.formatRelativeTime(d)).toBe('5m ago');
  });

  it('formatRelativeTime returns hours ago', () => {
    const d = new Date(Date.now() - 2 * 3600000);
    expect(component.formatRelativeTime(d)).toBe('2h ago');
  });

  it('formatRelativeTime returns days ago', () => {
    const d = new Date(Date.now() - 2 * 86400000);
    expect(component.formatRelativeTime(d)).toBe('2d ago');
  });

  it('getInitials returns correct initials', () => {
    expect(component.getInitials('Alice Johnson')).toBe('AJ');
    expect(component.getInitials('Bob')).toBe('B');
  });

  it('renders comments from input', () => {
    fixture.componentRef.setInput('comments', sampleComments);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
