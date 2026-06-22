import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
} from '@angular/core';
import { LucideAngularModule, Check, ArrowLeft, ArrowRight, type LucideIconData } from 'lucide-angular';

export interface StepperStep {
  label: string;
  description?: string;
  icon?: LucideIconData;
  optional?: boolean;
}

@Component({
  selector: 'ui-stepper',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStepperComponent {
  protected readonly checkIcon = Check;
  protected readonly arrowLeftIcon = ArrowLeft;
  protected readonly arrowRightIcon = ArrowRight;

  readonly steps = input<StepperStep[]>([]);
  readonly activeStep = model<number>(0);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly linear = input<boolean>(true);

  readonly stepChange = output<number>();
  readonly completed = output<void>();

  readonly isFirst = computed(() => this.activeStep() === 0);
  readonly isLast = computed(() => this.activeStep() === this.steps().length - 1);

  next(): void {
    const current = this.activeStep();
    if (current < this.steps().length - 1) {
      const next = current + 1;
      this.activeStep.set(next);
      this.stepChange.emit(next);
    } else {
      this.completed.emit();
    }
  }

  prev(): void {
    const current = this.activeStep();
    if (current > 0) {
      const prev = current - 1;
      this.activeStep.set(prev);
      this.stepChange.emit(prev);
    }
  }

  goTo(index: number): void {
    if (!this.linear() || index <= this.activeStep()) {
      this.activeStep.set(index);
      this.stepChange.emit(index);
    }
  }

  isCompleted(i: number): boolean {
    return i < this.activeStep();
  }

  isActive(i: number): boolean {
    return i === this.activeStep();
  }
}
