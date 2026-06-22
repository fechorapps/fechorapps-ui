import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTourGuideComponent } from './tour-guide.component';
import type { TourStep } from './tour-guide.component';

const mockSteps: TourStep[] = [
  {
    target: '#step-a',
    title: 'Step A',
    content: 'Content for step A',
    placement: 'bottom',
  },
  {
    target: '#step-b',
    title: 'Step B',
    content: 'Content for step B',
    placement: 'right',
  },
  {
    target: '#step-c',
    title: 'Step C',
    content: 'Content for step C',
    placement: 'top',
  },
];

describe('UiTourGuideComponent', () => {
  let fixture: ComponentFixture<UiTourGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTourGuideComponent] });
    fixture = TestBed.createComponent(UiTourGuideComponent);
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();
  });

  it('renders nothing when inactive', () => {
    fixture.componentRef.setInput('active', false);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeNull();
  });

  it('renders overlay when active', () => {
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.fixed.inset-0');
    expect(overlay).toBeTruthy();
  });

  it('shows current step title and content', () => {
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('currentStep', 0);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Step A');
    expect(text).toContain('Content for step A');
  });

  it('shows step label "1 / 3" on first step', () => {
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('currentStep', 0);
    fixture.detectChanges();
    expect(fixture.componentInstance.stepLabel()).toBe('1 / 3');
  });

  it('isFirst is true on step 0', () => {
    fixture.componentRef.setInput('currentStep', 0);
    fixture.detectChanges();
    expect(fixture.componentInstance.isFirst()).toBe(true);
  });

  it('isLast is true on last step', () => {
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();
    expect(fixture.componentInstance.isLast()).toBe(true);
  });

  it('next() increments currentStep and emits stepChange', () => {
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('currentStep', 0);
    fixture.detectChanges();
    const changes: number[] = [];
    fixture.componentInstance.stepChange.subscribe((n) => changes.push(n));
    fixture.componentInstance.next();
    expect(fixture.componentInstance.currentStep()).toBe(1);
    expect(changes).toEqual([1]);
  });

  it('next() on last step emits completed and sets active false', () => {
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();
    let completedEmitted = false;
    fixture.componentInstance.completed.subscribe(() => (completedEmitted = true));
    fixture.componentInstance.next();
    expect(completedEmitted).toBe(true);
    expect(fixture.componentInstance.active()).toBe(false);
  });

  it('prev() decrements currentStep', () => {
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();
    const changes: number[] = [];
    fixture.componentInstance.stepChange.subscribe((n) => changes.push(n));
    fixture.componentInstance.prev();
    expect(fixture.componentInstance.currentStep()).toBe(1);
    expect(changes).toEqual([1]);
  });

  it('skip() sets active false and emits skipped', () => {
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();
    let skippedEmitted = false;
    fixture.componentInstance.skipped.subscribe(() => (skippedEmitted = true));
    fixture.componentInstance.skip();
    expect(fixture.componentInstance.active()).toBe(false);
    expect(skippedEmitted).toBe(true);
  });

  it('shows Finish button on last step', () => {
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const finishBtn = Array.from(buttons as NodeListOf<HTMLButtonElement>).find((b) =>
      b.textContent?.includes('Finish')
    );
    expect(finishBtn).toBeTruthy();
  });

  it('step() returns null when steps array is empty', () => {
    fixture.componentRef.setInput('steps', []);
    fixture.detectChanges();
    expect(fixture.componentInstance.step()).toBeNull();
  });
});
