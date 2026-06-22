import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UiAccordionComponent } from './accordion.component';
import { UiAccordionTabComponent } from './accordion-tab.component';

@Component({
  standalone: true,
  imports: [UiAccordionComponent, UiAccordionTabComponent],
  template: `
    <ui-accordion [multiple]="multiple" [activeIndex]="activeIndex">
      <ui-accordion-tab header="Tab One">Content One</ui-accordion-tab>
      <ui-accordion-tab header="Tab Two">Content Two</ui-accordion-tab>
    </ui-accordion>
  `,
})
class TestHostComponent {
  multiple = false;
  activeIndex: number | number[] | null = null;
}

describe('UiAccordionComponent', () => {
  let fixture: ComponentFixture<UiAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiAccordionComponent] });
    fixture = TestBed.createComponent(UiAccordionComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults multiple to false', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.multiple()).toBe(false);
  });

  it('defaults activeIndex to null', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex()).toBeNull();
  });

  it('accepts a styleClass input', () => {
    fixture.componentRef.setInput('styleClass', 'custom-accordion');
    fixture.detectChanges();
    expect(fixture.componentInstance.styleClass()).toBe('custom-accordion');
  });

  it('isOpen returns false when no tabs are toggled', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen(0)).toBe(false);
  });
});

describe('UiAccordionComponent (with host)', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    hostFixture = TestBed.createComponent(TestHostComponent);
  });

  it('renders accordion tabs as content children', () => {
    hostFixture.detectChanges();
    expect(hostFixture.nativeElement).toBeTruthy();
  });

  it('initializes open tabs from activeIndex', () => {
    hostFixture.componentInstance.activeIndex = 0;
    hostFixture.detectChanges();
    const accordion = hostFixture.debugElement.query(
      (el) => el.componentInstance instanceof UiAccordionComponent
    )?.componentInstance as UiAccordionComponent;
    expect(accordion.isOpen(0)).toBe(true);
  });
});
