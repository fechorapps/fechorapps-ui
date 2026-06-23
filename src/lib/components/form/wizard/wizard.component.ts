import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { Check, LucideAngularModule } from 'lucide-angular';

/**
 * Represents a single step in the wizard.
 */
export interface WizardStep {
  label: string;
  description?: string;
  icon?: unknown;
  valid?: boolean;
  optional?: boolean;
}

/**
 * UiWizardComponent — a multi-step wizard / stepper.
 *
 * ## Content projection
 *
 * Angular does **not** support dynamic `[select]` values on `<ng-content>`.
 * All consumer content is projected through a single `<ng-content />` slot.
 * Consumers are responsible for showing / hiding each step's content based on
 * the `currentStep` model value, for example:
 *
 * ```html
 * <ui-wizard [steps]="steps" [(currentStep)]="current">
 *   <div [hidden]="current !== 0">Step 1 content</div>
 *   <div [hidden]="current !== 1">Step 2 content</div>
 *   <div [hidden]="current !== 2">Step 3 content</div>
 * </ui-wizard>
 * ```
 *
 * @example
 * ```html
 * <ui-wizard [steps]="steps" [(currentStep)]="currentStep" (finished)="onFinish()">
 *   <div [hidden]="currentStep !== 0">Personal Info</div>
 *   <div [hidden]="currentStep !== 1">Address</div>
 *   <div [hidden]="currentStep !== 2">Review</div>
 * </ui-wizard>
 * ```
 */
@Component({
  selector: 'ui-wizard',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './wizard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiWizardComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly checkIcon = Check;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Steps configuration (required) */
  readonly steps = input.required<WizardStep[]>();

  /** Whether navigation is restricted to sequential order */
  readonly linear = input<boolean>(true);

  /** Whether to show step numbers inside the step indicator */
  readonly showStepNumbers = input<boolean>(true);

  /** Label for the Back button */
  readonly backLabel = input<string>('Back');

  /** Label for the Next button */
  readonly nextLabel = input<string>('Next');

  /** Label for the Finish button (shown on last step) */
  readonly finishLabel = input<string>('Finish');

  /** Layout orientation of the step indicator bar */
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  // =========================================================================
  // MODEL
  // =========================================================================

  /** Index of the currently active step */
  readonly currentStep = model<number>(0);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when the active step changes */
  readonly stepChange = output<number>();

  /** Emitted when Next is clicked on the last step */
  readonly finished = output<void>();

  /** Emitted when a step is skipped */
  readonly stepSkipped = output<number>();

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** True when the current step is the last one */
  readonly isLastStep = computed(() => this.currentStep() === this.steps().length - 1);

  /**
   * True when the wizard can advance from the current step.
   * A step with `valid === false` blocks navigation; `valid === undefined` allows it.
   */
  readonly canNext = computed(() => {
    const step = this.steps()[this.currentStep()];
    return step?.valid !== false;
  });

  /** CSS classes for the step indicator wrapper */
  readonly indicatorWrapperClasses = computed(() => {
    return this.orientation() === 'horizontal'
      ? 'flex items-start gap-0 w-full'
      : 'flex flex-col gap-0';
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  /** Advance to the next step, or emit `finished` if on the last step. */
  next(): void {
    if (!this.canNext()) return;
    if (this.isLastStep()) {
      this.finished.emit();
      return;
    }
    const next = this.currentStep() + 1;
    this.currentStep.set(next);
    this.stepChange.emit(next);
  }

  /** Navigate to the previous step. */
  back(): void {
    if (this.currentStep() === 0) return;
    const prev = this.currentStep() - 1;
    this.currentStep.set(prev);
    this.stepChange.emit(prev);
  }

  /**
   * Navigate directly to a step by index.
   * In linear mode, jumping forward past the current step is blocked.
   */
  goTo(index: number): void {
    if (this.linear() && index > this.currentStep()) return;
    this.currentStep.set(index);
    this.stepChange.emit(index);
  }

  /** Skip the current step (only allowed when `step.optional === true`). */
  skip(): void {
    const current = this.currentStep();
    if (!this.steps()[current]?.optional) return;
    this.stepSkipped.emit(current);
    this.next();
  }

  /** Returns the visual state of a step by index. */
  stepState(index: number): 'completed' | 'active' | 'pending' {
    if (index < this.currentStep()) return 'completed';
    if (index === this.currentStep()) return 'active';
    return 'pending';
  }

  /** Returns the CSS classes for a step indicator circle. */
  stepIndicatorClass(index: number): string {
    const state = this.stepState(index);
    const base =
      'flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold border-2 transition-all duration-200 shrink-0';

    if (state === 'completed') {
      return `${base} bg-primary border-primary text-primary-foreground`;
    }
    if (state === 'active') {
      return `${base} bg-primary border-primary text-primary-foreground ring-2 ring-primary/30`;
    }
    return `${base} bg-muted border-border text-muted-foreground`;
  }

  /** Returns the CSS classes for a step label. */
  stepLabelClass(index: number): string {
    const state = this.stepState(index);
    if (state === 'active') return 'text-sm font-medium text-foreground';
    if (state === 'completed') return 'text-sm font-medium text-primary';
    return 'text-sm text-muted-foreground';
  }
}
