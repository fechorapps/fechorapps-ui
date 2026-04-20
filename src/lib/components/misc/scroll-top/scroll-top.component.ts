import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export type ScrollTarget = 'window' | 'parent';

@Component({
  selector: 'ui-scroll-top',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './scroll-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiScrollTopComponent implements OnInit, OnDestroy {
  // Inputs
  readonly target = input<ScrollTarget>('window');
  readonly threshold = input<number>(400);
  readonly icon = input<LucideIconData | null>(null);
  readonly behavior = input<ScrollBehavior>('smooth');
  readonly styleClass = input<string>('');

  // State
  readonly visible = signal<boolean>(false);

  private scrollElement: Element | Window | null = null;
  private scrollHandler = this.onScroll.bind(this);

  ngOnInit(): void {
    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    this.removeScrollListener();
  }

  private setupScrollListener(): void {
    if (typeof window !== 'undefined') {
      this.scrollElement = window;
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
  }

  private removeScrollListener(): void {
    if (this.scrollElement && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    if (typeof window !== 'undefined') {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      this.visible.set(scrollTop > this.threshold());
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: this.behavior(),
      });
    }
  }

  readonly containerClasses = computed(() => {
    const base = [
      'fixed bottom-8 right-8 z-50',
      'flex items-center justify-center',
      'w-12 h-12 rounded-full',
      'bg-blue-500 hover:bg-blue-600',
      'text-white shadow-lg',
      'cursor-pointer transition-all duration-300',
      'hover:scale-110',
    ];

    if (!this.visible()) {
      base.push('opacity-0 pointer-events-none translate-y-4');
    } else {
      base.push('opacity-100 translate-y-0');
    }

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });
}
