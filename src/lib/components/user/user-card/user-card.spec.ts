import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiUserCardComponent, UserProfile } from './user-card.component';

const testUser: UserProfile = { name: 'John Doe', email: 'john@example.com', role: 'Admin' };

describe('UiUserCardComponent', () => {
  let fixture: ComponentFixture<UiUserCardComponent>;
  let component: UiUserCardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiUserCardComponent] });
    fixture = TestBed.createComponent(UiUserCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', testUser);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes online status color', () => {
    fixture.componentRef.setInput('status', 'online');
    fixture.detectChanges();
    expect(component.statusColor()).toBe('bg-green-500');
  });

  it('computes offline status color', () => {
    fixture.componentRef.setInput('status', 'offline');
    fixture.detectChanges();
    expect(component.statusColor()).toBe('bg-gray-400');
  });

  it('compact variant does not show email in template', () => {
    fixture.componentRef.setInput('variant', 'compact');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const emailEl = el.querySelector('.text-muted-foreground');
    expect(emailEl).toBeNull();
  });
});
