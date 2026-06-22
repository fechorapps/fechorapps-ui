import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiStepsComponent, StepItem } from './steps.component';

describe('UiStepsComponent', () => {
  let fixture: ComponentFixture<UiStepsComponent>;

  const defaultSteps: StepItem[] = [
    { label: 'Personal Info', id: 'step1' },
    { label: 'Account Details', id: 'step2' },
    { label: 'Confirmation', id: 'step3' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiStepsComponent] });
    fixture = TestBed.createComponent(UiStepsComponent);
  });

  it('renders', () => {
    fixture.componentRef.setInput('model', defaultSteps);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders step labels', () => {
    fixture.componentRef.setInput('model', defaultSteps);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Personal Info');
    expect(fixture.nativeElement.textContent).toContain('Account Details');
  });

  it('defaults activeIndex to 0', () => {
    fixture.componentRef.setInput('model', defaultSteps);
    fixture.detectChanges();
    expect(fixture.componentInstance.activeIndex()).toBe(0);
  });

  it('isActive returns true for active index', () => {
    fixture.componentRef.setInput('model', defaultSteps);
    fixture.detectChanges();
    expect(fixture.componentInstance.isActive(0)).toBe(true);
    expect(fixture.componentInstance.isActive(1)).toBe(false);
  });

  it('isCompleted returns true for indices before active', () => {
    fixture.componentRef.setInput('model', defaultSteps);
    fixture.componentRef.setInput('activeIndex', 2);
    fixture.detectChanges();
    expect(fixture.componentInstance.isCompleted(0)).toBe(true);
    expect(fixture.componentInstance.isCompleted(1)).toBe(true);
    expect(fixture.componentInstance.isCompleted(2)).toBe(false);
  });

  it('navigates to clicked step when not readonly', () => {
    fixture.componentRef.setInput('model', defaultSteps);
    fixture.detectChanges();
    fixture.componentInstance.onItemClick(new MouseEvent('click'), defaultSteps[1], 1);
    expect(fixture.componentInstance.activeIndex()).toBe(1);
  });

  it('does not navigate when readonly', () => {
    fixture.componentRef.setInput('model', defaultSteps);
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    fixture.componentInstance.onItemClick(new MouseEvent('click'), defaultSteps[1], 1);
    expect(fixture.componentInstance.activeIndex()).toBe(0);
  });

  it('applies vertical orientation classes', () => {
    fixture.componentRef.setInput('model', defaultSteps);
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    expect(fixture.componentInstance.stepsClasses()).toContain('flex-col');
  });
});
