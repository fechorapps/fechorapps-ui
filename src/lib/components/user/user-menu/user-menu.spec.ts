import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiUserMenuComponent, UserProfile } from './user-menu.component';

const testUser: UserProfile = { name: 'John Doe', email: 'john@example.com' };

describe('UiUserMenuComponent', () => {
  let fixture: ComponentFixture<UiUserMenuComponent>;
  let component: UiUserMenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiUserMenuComponent] });
    fixture = TestBed.createComponent(UiUserMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', testUser);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes initials from two-word name', () => {
    fixture.detectChanges();
    expect(component.initials()).toBe('JD');
  });

  it('computes initials from single-word name', () => {
    fixture.componentRef.setInput('user', { name: 'Alice', email: 'alice@example.com' });
    fixture.detectChanges();
    expect(component.initials()).toBe('AL');
  });

  it('toggles open state', () => {
    fixture.detectChanges();
    expect(component.open()).toBe(false);
    component.toggle();
    expect(component.open()).toBe(true);
    component.toggle();
    expect(component.open()).toBe(false);
  });
});
