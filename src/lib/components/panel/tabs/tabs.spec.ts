import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UiTabsComponent } from './tabs.component';
import { UiTabPanelComponent } from './tab-panel.component';

@Component({
  standalone: true,
  imports: [UiTabsComponent, UiTabPanelComponent],
  template: `
    <ui-tabs [activeIndex]="activeIndex">
      <ui-tab-panel header="First">Content A</ui-tab-panel>
      <ui-tab-panel header="Second">Content B</ui-tab-panel>
    </ui-tabs>
  `,
})
class TestHostComponent {
  activeIndex = 0;
}

describe('UiTabsComponent', () => {
  let fixture: ComponentFixture<UiTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTabsComponent] });
    fixture = TestBed.createComponent(UiTabsComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults activeIndex to 0', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex()).toBe(0);
  });

  it('accepts a styleClass input', () => {
    fixture.componentRef.setInput('styleClass', 'my-tabs');
    fixture.detectChanges();
    expect(fixture.componentInstance.styleClass()).toBe('my-tabs');
  });
});

describe('UiTabsComponent (with host)', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    hostFixture = TestBed.createComponent(TestHostComponent);
  });

  it('renders with tab panels', () => {
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement.textContent).toContain('First');
  });

  it('initializes selectedIndex from activeIndex input', () => {
    hostFixture.componentInstance.activeIndex = 1;
    hostFixture.detectChanges();
    const tabs = hostFixture.debugElement.query(
      (el) => el.componentInstance instanceof UiTabsComponent
    )?.componentInstance as UiTabsComponent;
    expect(tabs.selectedIndex()).toBe(1);
  });
});
