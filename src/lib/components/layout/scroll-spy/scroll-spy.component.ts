import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  afterNextRender,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface ScrollSpyItem {
  id: string;
  label: string;
  icon?: unknown;
}

@Component({
  selector: 'ui-scroll-spy',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './scroll-spy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiScrollSpyComponent implements OnDestroy {
  // =========================================================================
  // INPUTS
  // =========================================================================

  readonly items = input.required<ScrollSpyItem[]>();
  readonly offset = input<number>(80);
  readonly smooth = input<boolean>(true);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly activeClass = input<string>('');

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  readonly activeChange = output<string>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly activeId = signal<string>('');
  private observers: IntersectionObserver[] = [];

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly navClasses = computed(() => {
    const base = 'flex gap-1';
    return this.orientation() === 'horizontal'
      ? `${base} flex-row flex-wrap`
      : `${base} flex-col`;
  });

  // =========================================================================
  // LIFECYCLE
  // =========================================================================

  constructor() {
    afterNextRender(() => this.initObservers());
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
  }

  // =========================================================================
  // METHODS
  // =========================================================================

  private initObservers(): void {
    this.observers.forEach(o => o.disconnect());
    this.observers = [];
    const margin = `-${this.offset()}px 0px -50% 0px`;
    for (const item of this.items()) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.activeId.set(item.id);
            this.activeChange.emit(item.id);
          }
        },
        { rootMargin: margin, threshold: 0 }
      );
      obs.observe(el);
      this.observers.push(obs);
    }
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: this.smooth() ? 'smooth' : 'auto', block: 'start' });
  }

  isActive(id: string): boolean {
    return this.activeId() === id;
  }

  itemClasses(id: string): string {
    const base = 'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer hover:bg-accent hover:text-foreground';
    if (this.isActive(id)) {
      const extra = this.activeClass() ? ` ${this.activeClass()}` : '';
      return `${base} text-primary font-medium${extra}`;
    }
    return `${base} text-muted-foreground`;
  }
}
