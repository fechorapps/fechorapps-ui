import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  ElementRef,
  HostListener,
  OnDestroy,
  inject,
  Renderer2,
  Directive,
} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTooltipComponent {
  // Inputs
  readonly text = input<string>('');
  readonly position = input<TooltipPosition>('top');
  readonly showDelay = input<number>(0);
  readonly hideDelay = input<number>(0);
  readonly disabled = input<boolean>(false);

  // State
  readonly isVisible = signal<boolean>(false);

  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  // Computed
  readonly tooltipClasses = computed(() => {
    const base = [
      'absolute z-50 px-2 py-1 text-xs font-medium',
      'text-white bg-gray-900 dark:bg-gray-700',
      'rounded shadow-lg',
      'transition-opacity duration-200',
      'whitespace-nowrap',
      'pointer-events-none',
    ];

    if (this.isVisible()) {
      base.push('opacity-100');
    } else {
      base.push('opacity-0');
    }

    return base.join(' ');
  });

  readonly positionClasses = computed(() => {
    const positionMap: Record<TooltipPosition, string> = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };
    return positionMap[this.position()];
  });

  readonly arrowClasses = computed(() => {
    const base = 'absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45';
    const positionMap: Record<TooltipPosition, string> = {
      top: 'top-full left-1/2 -translate-x-1/2 -mt-1',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
      left: 'left-full top-1/2 -translate-y-1/2 -ml-1',
      right: 'right-full top-1/2 -translate-y-1/2 -mr-1',
    };
    return `${base} ${positionMap[this.position()]}`;
  });

  show(): void {
    if (this.disabled()) return;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    const delay = this.showDelay();
    if (delay > 0) {
      this.showTimeout = setTimeout(() => {
        this.isVisible.set(true);
      }, delay);
    } else {
      this.isVisible.set(true);
    }
  }

  hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    const delay = this.hideDelay();
    if (delay > 0) {
      this.hideTimeout = setTimeout(() => {
        this.isVisible.set(false);
      }, delay);
    } else {
      this.isVisible.set(false);
    }
  }
}

@Directive({
  selector: '[uiTooltip]',
  standalone: true,
})
export class UiTooltipDirective implements OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly uiTooltip = input<string>('');
  readonly tooltipPosition = input<TooltipPosition>('top');
  readonly tooltipDisabled = input<boolean>(false);
  readonly tooltipShowDelay = input<number>(0);
  readonly tooltipHideDelay = input<number>(0);

  private tooltipElement: HTMLElement | null = null;
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltipDisabled()) return;
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hide();
  }

  @HostListener('focus')
  onFocus(): void {
    if (this.tooltipDisabled()) return;
    this.show();
  }

  @HostListener('blur')
  onBlur(): void {
    this.hide();
  }

  private show(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    const delay = this.tooltipShowDelay();
    if (delay > 0) {
      this.showTimeout = setTimeout(() => this.createTooltip(), delay);
    } else {
      this.createTooltip();
    }
  }

  private hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    const delay = this.tooltipHideDelay();
    if (delay > 0) {
      this.hideTimeout = setTimeout(() => this.removeTooltip(), delay);
    } else {
      this.removeTooltip();
    }
  }

  private createTooltip(): void {
    if (this.tooltipElement) return;

    const text = this.uiTooltip();
    if (!text) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'fixed');
    this.renderer.addClass(this.tooltipElement, 'z-50');
    this.renderer.addClass(this.tooltipElement, 'px-2');
    this.renderer.addClass(this.tooltipElement, 'py-1');
    this.renderer.addClass(this.tooltipElement, 'text-xs');
    this.renderer.addClass(this.tooltipElement, 'font-medium');
    this.renderer.addClass(this.tooltipElement, 'text-white');
    this.renderer.addClass(this.tooltipElement, 'bg-gray-900');
    this.renderer.addClass(this.tooltipElement, 'rounded');
    this.renderer.addClass(this.tooltipElement, 'shadow-lg');
    this.renderer.addClass(this.tooltipElement, 'whitespace-nowrap');
    this.renderer.addClass(this.tooltipElement, 'pointer-events-none');
    this.renderer.addClass(this.tooltipElement, 'transition-opacity');
    this.renderer.addClass(this.tooltipElement, 'duration-200');

    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(this.tooltipElement, textNode);
    this.renderer.appendChild(document.body, this.tooltipElement);

    this.positionTooltip();

    // Animate in
    requestAnimationFrame(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
      }
    });
  }

  private positionTooltip(): void {
    if (!this.tooltipElement) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const position = this.tooltipPosition();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + gap;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
      setTimeout(() => {
        if (this.tooltipElement && this.tooltipElement.parentNode) {
          this.renderer.removeChild(document.body, this.tooltipElement);
          this.tooltipElement = null;
        }
      }, 200);
    }
  }

  ngOnDestroy(): void {
    if (this.showTimeout) clearTimeout(this.showTimeout);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.removeTooltip();
  }
}
