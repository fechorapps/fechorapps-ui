import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  afterNextRender,
  computed,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'ui-sticky-header',
  standalone: true,
  imports: [],
  templateUrl: './sticky-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStickyHeaderComponent implements OnDestroy {
  // =========================================================================
  // INPUTS
  // =========================================================================

  readonly scrollThreshold = input<number>(60);
  readonly shrink = input<boolean>(true);
  readonly blur = input<boolean>(true);
  readonly hideOnScrollDown = input<boolean>(false);
  readonly zIndex = input<number>(50);

  // =========================================================================
  // STATE
  // =========================================================================

  readonly isScrolled = signal<boolean>(false);
  readonly isVisible = signal<boolean>(true);
  private lastScrollY = 0;

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly headerClass = computed(() => {
    const classes = ['sticky top-0 w-full transition-all duration-300'];
    classes.push(`z-[${this.zIndex()}]`);
    if (this.isScrolled()) {
      if (this.blur()) classes.push('backdrop-blur-md bg-background/80 border-b border-border shadow-sm');
      if (this.shrink()) classes.push('py-2');
      else classes.push('py-4');
    } else {
      classes.push('py-4 bg-transparent');
    }
    if (!this.isVisible()) classes.push('-translate-y-full');
    return classes.join(' ');
  });

  // =========================================================================
  // LIFECYCLE
  // =========================================================================

  constructor() {
    afterNextRender(() => {
      window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  // =========================================================================
  // METHODS
  // =========================================================================

  private onScroll(): void {
    const y = window.scrollY;
    this.isScrolled.set(y > this.scrollThreshold());
    if (this.hideOnScrollDown()) {
      this.isVisible.set(y < this.lastScrollY || y <= this.scrollThreshold());
    }
    this.lastScrollY = y;
  }
}
