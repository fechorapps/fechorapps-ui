import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UiOnboardingLayoutComponent, OnboardingFeature } from './onboarding-layout.component';

describe('UiOnboardingLayoutComponent', () => {
  let fixture: ComponentFixture<UiOnboardingLayoutComponent>;
  let component: UiOnboardingLayoutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiOnboardingLayoutComponent],
      providers: [provideAnimations()],
    });
    fixture = TestBed.createComponent(UiOnboardingLayoutComponent);
    component = fixture.componentInstance;
  });

  it('renders the component', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders the title when provided', () => {
    fixture.componentRef.setInput('title', 'Welcome to the App');
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Welcome to the App');
  });

  it('does not render h1 when title is empty', () => {
    fixture.componentRef.setInput('title', '');
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeFalsy();
  });

  it('renders the subtitle when provided', () => {
    fixture.componentRef.setInput('subtitle', 'Your journey starts here');
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p.text-muted-foreground');
    expect(p).toBeTruthy();
    expect(p.textContent).toContain('Your journey starts here');
  });

  it('renders features grid when features are provided', () => {
    const features: OnboardingFeature[] = [
      { icon: null, title: 'Feature A', description: 'Desc A' },
      { icon: null, title: 'Feature B', description: 'Desc B' },
      { icon: null, title: 'Feature C', description: 'Desc C' },
    ];
    fixture.componentRef.setInput('features', features);
    fixture.detectChanges();
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.grid > div');
    expect(cards.length).toBe(3);
  });

  it('does not render features grid when features is empty', () => {
    fixture.componentRef.setInput('features', []);
    fixture.detectChanges();
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).toBeFalsy();
  });

  it('shows correct number of progress dots', () => {
    fixture.componentRef.setInput('showProgress', true);
    fixture.componentRef.setInput('totalSteps', 4);
    fixture.componentRef.setInput('currentStep', 0);
    fixture.detectChanges();
    const dots = fixture.nativeElement.querySelectorAll('.rounded-full.transition-all');
    expect(dots.length).toBe(4);
  });

  it('marks the active dot at currentStep', () => {
    fixture.componentRef.setInput('showProgress', true);
    fixture.componentRef.setInput('totalSteps', 4);
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();
    const dots = fixture.nativeElement.querySelectorAll('.rounded-full.transition-all');
    // Active dot at index 2 should have w-6 class
    expect(dots[2].classList).toContain('w-6');
    // Inactive dots should not have w-6
    expect(dots[0].classList).not.toContain('w-6');
    expect(dots[1].classList).not.toContain('w-6');
    expect(dots[3].classList).not.toContain('w-6');
  });

  it('does not show progress when showProgress is false', () => {
    fixture.componentRef.setInput('showProgress', false);
    fixture.componentRef.setInput('totalSteps', 4);
    fixture.detectChanges();
    const dots = fixture.nativeElement.querySelectorAll('.rounded-full.transition-all');
    expect(dots.length).toBe(0);
  });

  it('does not show progress when totalSteps is 0', () => {
    fixture.componentRef.setInput('showProgress', true);
    fixture.componentRef.setInput('totalSteps', 0);
    fixture.detectChanges();
    const dots = fixture.nativeElement.querySelectorAll('.rounded-full.transition-all');
    expect(dots.length).toBe(0);
  });

  it('emits primaryClicked when primary button is clicked', () => {
    fixture.detectChanges();
    const primarySpy = jasmine.createSpy('primaryClicked');
    component.primaryClicked.subscribe(primarySpy);

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    expect(primarySpy).toHaveBeenCalledTimes(1);
  });

  it('hides secondary CTA when secondaryCta is null', () => {
    fixture.componentRef.setInput('secondaryCta', null);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(1);
  });

  it('shows secondary CTA when secondaryCta has a value', () => {
    fixture.componentRef.setInput('secondaryCta', 'Learn More');
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[1].textContent).toContain('Learn More');
  });

  it('emits secondaryClicked when secondary button is clicked', () => {
    fixture.componentRef.setInput('secondaryCta', 'Skip');
    fixture.detectChanges();

    const secondarySpy = jasmine.createSpy('secondaryClicked');
    component.secondaryClicked.subscribe(secondarySpy);

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    expect(secondarySpy).toHaveBeenCalledTimes(1);
  });

  it('renders primaryCta label on the primary button', () => {
    fixture.componentRef.setInput('primaryCta', 'Start Now');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Start Now');
  });
});
