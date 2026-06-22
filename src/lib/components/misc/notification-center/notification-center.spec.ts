import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiNotificationCenterComponent } from './notification-center.component';
import type { UiNotification } from './notification-center.component';

describe('UiNotificationCenterComponent', () => {
  let fixture: ComponentFixture<UiNotificationCenterComponent>;
  let component: UiNotificationCenterComponent;

  const sampleNotifications: UiNotification[] = [
    {
      id: '1',
      title: 'Info',
      message: 'This is an info notification.',
      type: 'info',
      read: true,
      timestamp: new Date(),
    },
    {
      id: '2',
      title: 'Unread alert',
      message: 'This one is unread.',
      type: 'danger',
      read: false,
      timestamp: new Date(),
    },
    {
      id: '3',
      title: 'Another unread',
      message: 'Also unread.',
      type: 'warning',
      read: false,
      timestamp: new Date(),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiNotificationCenterComponent] });
    fixture = TestBed.createComponent(UiNotificationCenterComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('panel is closed by default', () => {
    fixture.detectChanges();
    expect(component.open()).toBe(false);
  });

  it('toggle() opens and closes the panel', () => {
    fixture.detectChanges();
    component.toggle();
    expect(component.open()).toBe(true);

    component.toggle();
    expect(component.open()).toBe(false);
  });

  it('unreadCount returns count of unread notifications', () => {
    fixture.componentRef.setInput('notifications', sampleNotifications);
    fixture.detectChanges();
    expect(component.unreadCount()).toBe(2);
  });

  it('unreadCount is 0 when all are read', () => {
    const allRead = sampleNotifications.map((n) => ({ ...n, read: true }));
    fixture.componentRef.setInput('notifications', allRead);
    fixture.detectChanges();
    expect(component.unreadCount()).toBe(0);
  });

  it('visibleNotifications respects maxVisible', () => {
    fixture.componentRef.setInput('notifications', sampleNotifications);
    fixture.componentRef.setInput('maxVisible', 2);
    fixture.detectChanges();
    expect(component.visibleNotifications().length).toBe(2);
  });

  it('markRead emits notificationRead with id', () => {
    let emittedId = '';
    fixture.detectChanges();
    component.notificationRead.subscribe((id) => (emittedId = id));
    component.markRead('2');
    expect(emittedId).toBe('2');
  });

  it('markAllRead emits allRead', () => {
    let emitted = false;
    fixture.detectChanges();
    component.allRead.subscribe(() => (emitted = true));
    component.markAllRead();
    expect(emitted).toBe(true);
  });

  it('dismiss emits notificationDismissed with id', () => {
    let emittedId = '';
    fixture.detectChanges();
    component.notificationDismissed.subscribe((id) => (emittedId = id));
    component.dismiss('3');
    expect(emittedId).toBe('3');
  });
});
