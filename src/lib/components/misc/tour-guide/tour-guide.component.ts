import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  signal,
  afterNextRender,
  effect,
  OnDestroy,
  Injector,
} from '@angular/core';
import { LucideAngularModule, X, ChevronLeft, ChevronRight, SkipForward } from 'lucide-angular';

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TooltipPosition {
  top: number;
  left: number;
}

export interface HighlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

@Component({
  selector: 'ui-tour-guide',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './tour-guide.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTourGuideComponent implements OnDestroy {
  readonly xIcon = X;
  readonly chevronLeftIcon = ChevronLeft;
  readonly chevronRightIcon = ChevronRight;
  readonly skipIcon = SkipForward;

  // Inputs / Models
  readonly steps = input.required<TourStep[]>();
  readonly active = model<boolean>(false);
  readonly currentStep = model<number>(0);

  // Outputs
  readonly stepChange = output<number>();
  readonly completed = output<void>();
  readonly skipped = output<void>();

  // Internal positioning state
  readonly tooltipPosition = signal<TooltipPosition>({ top: 0, left: 0 });
  readonly highlightRect = signal<HighlightRect>({ top: 0, left: 0, width: 0, height: 0 });

  // Computed
  readonly step = computed<TourStep | null>(() => {
    const steps = this.steps();
    const idx = this.currentStep();
    return steps[idx] ?? null;
  });

  readonly stepLabel = computed(() => {
    const total = this.steps().length;
    const current = this.currentStep() + 1;
    return `${current} / ${total}`;
  });

  readonly isFirst = computed(() => this.currentStep() === 0);
  readonly isLast = computed(() => this.currentStep() === this.steps().length - 1);

  readonly tooltipStyles = computed(() => {
    const pos = this.tooltipPosition();
    return {
      top: `${pos.top}px`,
      left: `${pos.left}px`,
    };
  });

  readonly highlightStyles = computed(() => {
    const r = this.highlightRect();
    return {
      top: `${r.top}px`,
      left: `${r.left}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
    };
  });

  constructor(private readonly injector: Injector) {
    // Reposition tooltip whenever step or active state changes
    effect(() => {
      const active = this.active();
      const step = this.step();
      if (active && step) {
        // Use afterNextRender to wait for DOM update before measuring
        afterNextRender(
          () => {
            this.positionTooltip(step);
          },
          { injector: this.injector }
        );
      }
    });
  }

  ngOnDestroy(): void {
    // nothing to clean up
  }

  private positionTooltip(step: TourStep): void {
    if (typeof document === 'undefined') return;

    const targetEl = document.querySelector(step.target);
    if (!targetEl) {
      // fallback: center of viewport
      this.tooltipPosition.set({
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 160,
      });
      this.highlightRect.set({ top: 0, left: 0, width: 0, height: 0 });
      return;
    }

    const rect = targetEl.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    this.highlightRect.set({
      top: rect.top + scrollY - 4,
      left: rect.left + scrollX - 4,
      width: rect.width + 8,
      height: rect.height + 8,
    });

    const tooltipWidth = 320;
    const tooltipHeight = 180;
    const gap = 12;
    const placement = step.placement ?? 'bottom';

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = rect.top + scrollY - tooltipHeight - gap;
        left = rect.left + scrollX + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollY + gap;
        left = rect.left + scrollX + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2 - tooltipHeight / 2;
        left = rect.left + scrollX - tooltipWidth - gap;
        break;
      case 'right':
        top = rect.top + scrollY + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + scrollX + gap;
        break;
    }

    // Clamp within viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
    top = Math.max(8 + scrollY, top);

    this.tooltipPosition.set({ top, left });
  }

  next(): void {
    const idx = this.currentStep();
    const total = this.steps().length;

    if (idx < total - 1) {
      const next = idx + 1;
      this.currentStep.set(next);
      this.stepChange.emit(next);
    } else {
      this.active.set(false);
      this.completed.emit();
    }
  }

  prev(): void {
    const idx = this.currentStep();
    if (idx > 0) {
      const prev = idx - 1;
      this.currentStep.set(prev);
      this.stepChange.emit(prev);
    }
  }

  skip(): void {
    this.active.set(false);
    this.skipped.emit();
  }
}
