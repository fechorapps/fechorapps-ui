import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiFieldsetComponent } from './fieldset.component';

describe('UiFieldsetComponent', () => {
  let fixture: ComponentFixture<UiFieldsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiFieldsetComponent] });
    fixture = TestBed.createComponent(UiFieldsetComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows legend text', () => {
    fixture.componentRef.setInput('legend', 'My Legend');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('My Legend');
  });

  it('defaults toggleable to false', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.toggleable()).toBe(false);
  });

  it('does not toggle when toggleable is false', () => {
    fixture.componentRef.setInput('toggleable', false);
    fixture.detectChanges();
    fixture.componentInstance.toggle();
    expect(fixture.componentInstance.isCollapsed()).toBe(false);
  });

  it('toggles when toggleable is true', () => {
    fixture.componentRef.setInput('toggleable', true);
    fixture.detectChanges();
    fixture.componentInstance.toggle();
    expect(fixture.componentInstance.isCollapsed()).toBe(true);
  });

  it('emits onToggle event when toggled', () => {
    fixture.componentRef.setInput('toggleable', true);
    fixture.detectChanges();
    const emitted: boolean[] = [];
    fixture.componentInstance.onToggle.subscribe((v: boolean) => emitted.push(v));
    fixture.componentInstance.toggle();
    expect(emitted).toEqual([true]);
  });

  it('appends styleClass to container classes', () => {
    fixture.componentRef.setInput('styleClass', 'custom-fieldset');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('custom-fieldset');
  });
});
