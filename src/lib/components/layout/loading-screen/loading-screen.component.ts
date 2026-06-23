import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'ui-loading-screen',
  standalone: true,
  imports: [],
  templateUrl: './loading-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLoadingScreenComponent {
  // =========================================================================
  // INPUTS / OUTPUTS
  // =========================================================================

  /** Two-way binding for visibility */
  readonly visible = model<boolean>(true);

  /** Progress value 0–100; null = indeterminate spinner */
  readonly progress = input<number | null>(null);

  /** Loading message shown below the indicator */
  readonly message = input<string>('Loading...');

  /** When true, renders as a fixed full-screen overlay */
  readonly overlay = input<boolean>(false);

  /** Emitted after the fade-out animation completes */
  readonly hidden = output<void>();

  // =========================================================================
  // INTERNAL STATE
  // =========================================================================

  readonly isAnimatingOut = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (!this.visible() && !this.isAnimatingOut()) {
        this.isAnimatingOut.set(true);
        setTimeout(() => {
          this.isAnimatingOut.set(false);
          this.hidden.emit();
        }, 300); // match CSS transition
      }
    });
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly showContent = computed(() => this.visible() || this.isAnimatingOut());

  readonly containerClass = computed(() => {
    const base = this.overlay()
      ? 'fixed inset-0 z-[9999]'
      : 'w-full h-full min-h-screen';
    const anim = this.isAnimatingOut() ? 'opacity-0' : 'opacity-100';
    return `${base} flex flex-col items-center justify-center bg-background transition-opacity duration-300 ${anim}`;
  });
}
