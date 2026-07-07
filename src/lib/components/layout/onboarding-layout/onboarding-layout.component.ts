import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface OnboardingFeature {
  icon: LucideIconData;
  title: string;
  description: string;
}

@Component({
  selector: 'ui-onboarding-layout',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './onboarding-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiOnboardingLayoutComponent {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Main heading text */
  readonly title = input<string>('');

  /** Subtitle / descriptive text */
  readonly subtitle = input<string>('');

  /** Feature items to display in the grid */
  readonly features = input<OnboardingFeature[]>([]);

  /** Label for the primary CTA button */
  readonly primaryCta = input<string>('Get Started');

  /** Label for the secondary CTA button; null hides the button */
  readonly secondaryCta = input<string | null>(null);

  /** Whether to show the step progress indicator */
  readonly showProgress = input<boolean>(false);

  /** Zero-based index of the active step */
  readonly currentStep = input<number>(0);

  /** Total number of steps */
  readonly totalSteps = input<number>(0);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when the primary CTA button is clicked */
  readonly primaryClicked = output<void>();

  /** Emitted when the secondary CTA button is clicked */
  readonly secondaryClicked = output<void>();

  // =========================================================================
  // COMPUTED
  // =========================================================================

  /** Array used to render one dot per step */
  readonly stepDots = computed(() => Array.from({ length: this.totalSteps() }));
}
