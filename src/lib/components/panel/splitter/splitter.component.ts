import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  ElementRef,
  inject,
} from '@angular/core';

export type SplitterLayout = 'horizontal' | 'vertical';

export interface SplitterResizeEvent {
  sizes: number[];
}

@Component({
  selector: 'ui-splitter',
  standalone: true,
  templateUrl: './splitter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSplitterComponent {
  private readonly elementRef = inject(ElementRef);

  // Inputs
  readonly layout = input<SplitterLayout>('horizontal');
  readonly panelSizes = input<number[]>([50, 50]);
  readonly minSizes = input<number[]>([0, 0]);
  readonly gutterSize = input<number>(4);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onResizeEnd = output<SplitterResizeEvent>();

  // State
  readonly sizes = signal<number[]>([50, 50]);
  readonly isDragging = signal<boolean>(false);
  private startPos = 0;
  private startSizes: number[] = [];

  // Computed
  readonly containerClasses = computed(() => {
    const layout = this.layout();
    const base = ['flex', 'h-full', 'w-full'];

    if (layout === 'vertical') {
      base.push('flex-col');
    }

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });

  readonly gutterClasses = computed(() => {
    const layout = this.layout();
    const base = [
      'flex',
      'items-center',
      'justify-center',
      'bg-gray-200',
      'dark:bg-gray-700',
      'transition-colors',
      'hover:bg-gray-300',
      'dark:hover:bg-gray-600',
    ];

    if (layout === 'horizontal') {
      base.push('cursor-col-resize', 'w-1');
    } else {
      base.push('cursor-row-resize', 'h-1');
    }

    if (this.isDragging()) {
      base.push('bg-primary');
    }

    return base.join(' ');
  });

  constructor() {
    // Initialize sizes
    const initialSizes = this.panelSizes();
    if (initialSizes.length >= 2) {
      this.sizes.set([...initialSizes]);
    }
  }

  getPanelStyle(index: number): Record<string, string> {
    const sizes = this.sizes();
    const layout = this.layout();

    if (layout === 'horizontal') {
      return {
        width: `calc(${sizes[index]}% - ${this.gutterSize() / 2}px)`,
        minWidth: `${this.minSizes()[index] ?? 0}%`,
      };
    } else {
      return {
        height: `calc(${sizes[index]}% - ${this.gutterSize() / 2}px)`,
        minHeight: `${this.minSizes()[index] ?? 0}%`,
      };
    }
  }

  onGutterMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
    this.startSizes = [...this.sizes()];

    if (this.layout() === 'horizontal') {
      this.startPos = event.clientX;
    } else {
      this.startPos = event.clientY;
    }

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove = (event: MouseEvent): void => {
    if (!this.isDragging()) return;

    const container = this.elementRef.nativeElement as HTMLElement;
    const rect = container.getBoundingClientRect();

    let delta: number;
    let containerSize: number;

    if (this.layout() === 'horizontal') {
      delta = event.clientX - this.startPos;
      containerSize = rect.width;
    } else {
      delta = event.clientY - this.startPos;
      containerSize = rect.height;
    }

    const deltaPercent = (delta / containerSize) * 100;
    const minSizes = this.minSizes();

    let newSize0 = this.startSizes[0] + deltaPercent;
    let newSize1 = this.startSizes[1] - deltaPercent;

    // Apply min size constraints
    if (newSize0 < (minSizes[0] ?? 0)) {
      newSize0 = minSizes[0] ?? 0;
      newSize1 = 100 - newSize0;
    }
    if (newSize1 < (minSizes[1] ?? 0)) {
      newSize1 = minSizes[1] ?? 0;
      newSize0 = 100 - newSize1;
    }

    this.sizes.set([newSize0, newSize1]);
  };

  private onMouseUp = (): void => {
    this.isDragging.set(false);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.onResizeEnd.emit({ sizes: this.sizes() });
  };
}
