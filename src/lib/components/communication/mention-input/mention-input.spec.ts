import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMentionInputComponent, MentionUser } from './mention-input.component';

const sampleUsers: MentionUser[] = [
  { id: '1', name: 'Alice Johnson', username: 'alice' },
  { id: '2', name: 'Bob Smith', username: 'bobsmith' },
  { id: '3', name: 'Carol Williams', username: 'carol_w' },
];

describe('UiMentionInputComponent', () => {
  let fixture: ComponentFixture<UiMentionInputComponent>;
  let component: UiMentionInputComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMentionInputComponent] });
    fixture = TestBed.createComponent(UiMentionInputComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('filteredUsers filters by name', () => {
    fixture.componentRef.setInput('users', sampleUsers);
    fixture.detectChanges();
    component.mentionQuery.set('alice');
    expect(component.filteredUsers().length).toBe(1);
    expect(component.filteredUsers()[0].name).toBe('Alice Johnson');
  });

  it('filteredUsers filters by username', () => {
    fixture.componentRef.setInput('users', sampleUsers);
    fixture.detectChanges();
    component.mentionQuery.set('bobsmith');
    expect(component.filteredUsers().length).toBe(1);
    expect(component.filteredUsers()[0].username).toBe('bobsmith');
  });

  it('filteredUsers returns all when query is empty', () => {
    fixture.componentRef.setInput('users', sampleUsers);
    fixture.detectChanges();
    component.mentionQuery.set('');
    expect(component.filteredUsers().length).toBe(3);
  });

  it('selectUser updates value with mention and emits mentionSelected', () => {
    fixture.componentRef.setInput('users', sampleUsers);
    fixture.detectChanges();
    const emitted: MentionUser[] = [];
    component.mentionSelected.subscribe((u: MentionUser) => emitted.push(u));
    component.value.set('Hello @ali');
    component.selectUser(sampleUsers[0]);
    expect(component.value()).toBe('Hello @Alice Johnson ');
    expect(emitted[0]).toEqual(sampleUsers[0]);
  });

  it('selectUser closes dropdown', () => {
    fixture.componentRef.setInput('users', sampleUsers);
    fixture.detectChanges();
    component.showDropdown.set(true);
    component.value.set('@');
    component.selectUser(sampleUsers[0]);
    expect(component.showDropdown()).toBeFalse();
  });

  it('onKeydown ArrowDown increments activeIndex', () => {
    fixture.componentRef.setInput('users', sampleUsers);
    fixture.detectChanges();
    component.showDropdown.set(true);
    component.mentionQuery.set('');
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.onKeydown(event);
    expect(component.activeIndex()).toBe(1);
  });

  it('onKeydown Escape closes dropdown', () => {
    component.showDropdown.set(true);
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onKeydown(event);
    expect(component.showDropdown()).toBeFalse();
  });

  it('getInitials returns correct initials', () => {
    expect(component.getInitials('Alice Johnson')).toBe('AJ');
    expect(component.getInitials('Bob')).toBe('B');
  });
});
