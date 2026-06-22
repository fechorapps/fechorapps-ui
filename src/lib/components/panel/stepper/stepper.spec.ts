import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiStepperComponent, StepperStep } from './stepper.component';

const testSteps: StepperStep[] = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

describe('UiStepperComponent', () => {
  let fixture: ComponentFixture<UiStepperComponent>;
  let component: UiStepperComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiStepperComponent] });
    fixture = TestBed.createComponent(UiStepperComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('steps', testSteps);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('next() increments activeStep', () => {
    fixture.componentRef.setInput('activeStep', 0);
    fixture.detectChanges();
    component.next();
    expect(component.activeStep()).toBe(1);
  });

  it('prev() decrements activeStep', () => {
    fixture.componentRef.setInput('activeStep', 2);
    fixture.detectChanges();
    component.prev();
    expect(component.activeStep()).toBe(1);
  });

  it('prev() does not go below 0', () => {
    fixture.componentRef.setInput('activeStep', 0);
    fixture.detectChanges();
    component.prev();
    expect(component.activeStep()).toBe(0);
  });

  it('isCompleted returns true for steps before activeStep', () => {
    fixture.componentRef.setInput('activeStep', 2);
    fixture.detectChanges();
    expect(component.isCompleted(0)).toBe(true);
    expect(component.isCompleted(1)).toBe(true);
    expect(component.isCompleted(2)).toBe(false);
  });

  it('isActive returns true for activeStep only', () => {
    fixture.componentRef.setInput('activeStep', 1);
    fixture.detectChanges();
    expect(component.isActive(0)).toBe(false);
    expect(component.isActive(1)).toBe(true);
    expect(component.isActive(2)).toBe(false);
  });

  it('next() on last step emits completed', () => {
    fixture.componentRef.setInput('activeStep', 2);
    fixture.detectChanges();
    let completedEmitted = false;
    component.completed.subscribe(() => (completedEmitted = true));
    component.next();
    expect(completedEmitted).toBe(true);
  });
});
