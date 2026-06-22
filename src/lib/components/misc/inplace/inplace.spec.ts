import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInplaceComponent } from './inplace.component';

describe('UiInplaceComponent', () => {
  let fixture: ComponentFixture<UiInplaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiInplaceComponent] });
    fixture = TestBed.createComponent(UiInplaceComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('starts inactive by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.isActive()).toBe(false);
  });

  it('activates when activate() is called', () => {
    fixture.detectChanges();
    fixture.componentInstance.activate();
    expect(fixture.componentInstance.isActive()).toBe(true);
  });

  it('deactivates when deactivate() is called', () => {
    fixture.detectChanges();
    fixture.componentInstance.activate();
    fixture.componentInstance.deactivate();
    expect(fixture.componentInstance.isActive()).toBe(false);
  });

  it('emits onActivate when activated', () => {
    fixture.detectChanges();
    const spy = jasmine.createSpy('onActivate');
    fixture.componentInstance.onActivate.subscribe(spy);
    fixture.componentInstance.activate();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('emits onDeactivate when deactivated', () => {
    fixture.detectChanges();
    fixture.componentInstance.activate();
    const spy = jasmine.createSpy('onDeactivate');
    fixture.componentInstance.onDeactivate.subscribe(spy);
    fixture.componentInstance.deactivate();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not activate when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.componentInstance.activate();
    expect(fixture.componentInstance.isActive()).toBe(false);
  });

  it('applies disabled classes when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.displayClasses()).toContain('opacity-50');
    expect(fixture.componentInstance.displayClasses()).toContain('cursor-not-allowed');
  });

  it('applies styleClass to display element', () => {
    fixture.componentRef.setInput('styleClass', 'text-blue-500');
    fixture.detectChanges();
    expect(fixture.componentInstance.displayClasses()).toContain('text-blue-500');
  });
});
