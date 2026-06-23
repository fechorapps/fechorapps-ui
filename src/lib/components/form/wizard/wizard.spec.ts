import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiWizardComponent, WizardStep } from './wizard.component';

const THREE_STEPS: WizardStep[] = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

describe('UiWizardComponent', () => {
  let fixture: ComponentFixture<UiWizardComponent>;
  let component: UiWizardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiWizardComponent] });
    fixture = TestBed.createComponent(UiWizardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('steps', THREE_STEPS);
    fixture.detectChanges();
  });

  it('renders', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('starts at step 0', () => {
    expect(component.currentStep()).toBe(0);
  });

  // ---------------------------------------------------------------------------
  // next()
  // ---------------------------------------------------------------------------

  it('next() increments currentStep', () => {
    component.next();
    expect(component.currentStep()).toBe(1);
  });

  it('next() increments currentStep again on second call', () => {
    component.next();
    component.next();
    expect(component.currentStep()).toBe(2);
  });

  it('next() emits stepChange with the new index', () => {
    const emitted: number[] = [];
    component.stepChange.subscribe((v) => emitted.push(v));
    component.next();
    expect(emitted).toEqual([1]);
  });

  it('next() emits finished and does NOT advance past last step', () => {
    fixture.componentRef.setInput('steps', THREE_STEPS);
    // Navigate to last step
    component.next();
    component.next();
    expect(component.isLastStep()).toBeTrue();

    let finishedCalled = false;
    component.finished.subscribe(() => (finishedCalled = true));

    component.next();
    expect(finishedCalled).toBeTrue();
    expect(component.currentStep()).toBe(2); // stays at last
  });

  // ---------------------------------------------------------------------------
  // back()
  // ---------------------------------------------------------------------------

  it('back() decrements currentStep', () => {
    component.next();
    component.back();
    expect(component.currentStep()).toBe(0);
  });

  it('back() does nothing when already at step 0', () => {
    component.back();
    expect(component.currentStep()).toBe(0);
  });

  it('back() emits stepChange', () => {
    component.next();
    const emitted: number[] = [];
    component.stepChange.subscribe((v) => emitted.push(v));
    component.back();
    expect(emitted).toEqual([0]);
  });

  // ---------------------------------------------------------------------------
  // canNext / valid flag
  // ---------------------------------------------------------------------------

  it('canNext is true when step.valid is undefined', () => {
    expect(component.canNext()).toBeTrue();
  });

  it('canNext is false when step.valid === false, blocking next()', () => {
    const stepsWithInvalid: WizardStep[] = [
      { label: 'Step 1', valid: false },
      { label: 'Step 2' },
    ];
    fixture.componentRef.setInput('steps', stepsWithInvalid);
    fixture.detectChanges();

    expect(component.canNext()).toBeFalse();
    component.next(); // should be blocked
    expect(component.currentStep()).toBe(0);
  });

  it('canNext is true when step.valid === true', () => {
    const stepsWithValid: WizardStep[] = [
      { label: 'Step 1', valid: true },
      { label: 'Step 2' },
    ];
    fixture.componentRef.setInput('steps', stepsWithValid);
    fixture.detectChanges();

    expect(component.canNext()).toBeTrue();
  });

  // ---------------------------------------------------------------------------
  // goTo() — linear mode
  // ---------------------------------------------------------------------------

  it('goTo() navigates backward in linear mode', () => {
    component.next();
    component.goTo(0);
    expect(component.currentStep()).toBe(0);
  });

  it('goTo() blocks forward navigation in linear mode', () => {
    // Currently at step 0, trying to jump to step 2
    component.goTo(2);
    expect(component.currentStep()).toBe(0);
  });

  it('goTo() allows forward navigation in non-linear mode', () => {
    fixture.componentRef.setInput('linear', false);
    component.goTo(2);
    expect(component.currentStep()).toBe(2);
  });

  it('goTo() emits stepChange', () => {
    fixture.componentRef.setInput('linear', false);
    const emitted: number[] = [];
    component.stepChange.subscribe((v) => emitted.push(v));
    component.goTo(2);
    expect(emitted).toEqual([2]);
  });

  // ---------------------------------------------------------------------------
  // skip()
  // ---------------------------------------------------------------------------

  it('skip() does nothing if current step is not optional', () => {
    component.skip();
    expect(component.currentStep()).toBe(0);
  });

  it('skip() advances step and emits stepSkipped for optional step', () => {
    const stepsWithOptional: WizardStep[] = [
      { label: 'Step 1', optional: true },
      { label: 'Step 2' },
    ];
    fixture.componentRef.setInput('steps', stepsWithOptional);
    fixture.detectChanges();

    const skipped: number[] = [];
    component.stepSkipped.subscribe((v) => skipped.push(v));

    component.skip();
    expect(skipped).toEqual([0]);
    expect(component.currentStep()).toBe(1);
  });

  // ---------------------------------------------------------------------------
  // stepState()
  // ---------------------------------------------------------------------------

  it('stepState returns active for currentStep', () => {
    expect(component.stepState(0)).toBe('active');
  });

  it('stepState returns completed for steps before currentStep', () => {
    component.next();
    expect(component.stepState(0)).toBe('completed');
  });

  it('stepState returns pending for steps after currentStep', () => {
    expect(component.stepState(1)).toBe('pending');
    expect(component.stepState(2)).toBe('pending');
  });

  // ---------------------------------------------------------------------------
  // isLastStep
  // ---------------------------------------------------------------------------

  it('isLastStep is false on first step', () => {
    expect(component.isLastStep()).toBeFalse();
  });

  it('isLastStep is true on last step', () => {
    component.next();
    component.next();
    expect(component.isLastStep()).toBeTrue();
  });

  // ---------------------------------------------------------------------------
  // Template rendering
  // ---------------------------------------------------------------------------

  it('renders all step labels in the DOM', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Step 1');
    expect(text).toContain('Step 2');
    expect(text).toContain('Step 3');
  });

  it('shows Back and Next buttons', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Back');
    expect(text).toContain('Next');
  });

  it('shows Finish label on last step', () => {
    component.next();
    component.next();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Finish');
  });

  it('shows custom nextLabel', () => {
    fixture.componentRef.setInput('nextLabel', 'Continue');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Continue');
  });

  it('shows Skip button for optional step', () => {
    const stepsWithOptional: WizardStep[] = [
      { label: 'Info', optional: true },
      { label: 'Done' },
    ];
    fixture.componentRef.setInput('steps', stepsWithOptional);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Skip');
  });
});
