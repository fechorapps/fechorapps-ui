import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPanelComponent } from './panel.component';

describe('UiPanelComponent', () => {
  let fixture: ComponentFixture<UiPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPanelComponent] });
    fixture = TestBed.createComponent(UiPanelComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows header text', () => {
    fixture.componentRef.setInput('header', 'Panel Header');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Panel Header');
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

  it('emits onToggle when toggled', () => {
    fixture.componentRef.setInput('toggleable', true);
    fixture.detectChanges();
    const emitted: boolean[] = [];
    fixture.componentInstance.onToggle.subscribe((v: boolean) => emitted.push(v));
    fixture.componentInstance.toggle();
    expect(emitted).toEqual([true]);
  });

  it('appends styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'extra-class');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('extra-class');
  });
});
