import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Slider sizes
 */
export type SliderSize = 'sm' | 'md' | 'lg';

/**
 * Slider orientation
 */
export type SliderOrientation = 'horizontal' | 'vertical';

/**
 * UiSlider Component
 *
 * A slider for selecting a value or range.
 *
 * @example
 * ```html
 * <ui-slider [(ngModel)]="value" [min]="0" [max]="100"></ui-slider>
 * <ui-slider [(ngModel)]="range" [range]="true"></ui-slider>
 * ```
 */
@Component({
  selector: 'ui-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSliderComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiSliderComponent implements ControlValueAccessor {
  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly trackRef = viewChild<ElementRef>('trackEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Size */
  readonly size = input<SliderSize>('md');

  /** Minimum value */
  readonly min = input<number>(0);

  /** Maximum value */
  readonly max = input<number>(100);

  /** Step value */
  readonly step = input<number>(1);

  /** Orientation */
  readonly orientation = input<SliderOrientation>('horizontal');

  /** Whether range selection is enabled */
  readonly range = input<boolean>(false);

  /** Whether slider is disabled */
  readonly disabled = input<boolean>(false);

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether to show min/max labels */
  readonly showLabels = input<boolean>(false);

  /** Whether to show current value tooltip */
  readonly showTooltip = input<boolean>(true);

  /** Input id */
  readonly inputId = input<string>('');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Current value (single or range) */
  readonly value = model<number | [number, number]>(0);

  /** Active handle index (for range) */
  readonly activeHandle = signal<number | null>(null);

  /** Whether dragging */
  readonly dragging = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted on value change */
  readonly onChange = output<number | [number, number]>();

  /** Emitted when slide starts */
  readonly onSlideStart = output<void>();

  /** Emitted when slide ends */
  readonly onSlideEnd = output<void>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: number | [number, number]) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: number | [number, number]): void {
    if (this.range()) {
      this.value.set(Array.isArray(value) ? value : [this.min(), value ?? this.min()]);
    } else {
      this.value.set(
        typeof value === 'number' ? value : ((value as [number, number])?.[0] ?? this.min())
      );
    }
  }

  registerOnChange(fn: (value: number | [number, number]) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly singleValue = computed(() => {
    const val = this.value();
    return typeof val === 'number' ? val : val[0];
  });

  readonly rangeValues = computed(() => {
    const val = this.value();
    return Array.isArray(val) ? val : [this.min(), val];
  });

  readonly percentage = computed(() => {
    const val = this.singleValue();
    const min = this.min();
    const max = this.max();
    return ((val - min) / (max - min)) * 100;
  });

  readonly rangePercentages = computed(() => {
    const [start, end] = this.rangeValues();
    const min = this.min();
    const max = this.max();
    return [((start - min) / (max - min)) * 100, ((end - min) / (max - min)) * 100];
  });

  readonly trackHeight = computed(() => {
    const sizeMap: Record<SliderSize, string> = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' };
    return sizeMap[this.size()];
  });

  readonly handleSize = computed(() => {
    const sizeMap: Record<SliderSize, string> = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    const orientation = this.orientation();
    return orientation === 'vertical' ? 'inline-flex flex-col h-48' : 'w-full';
  });

  readonly trackClasses = computed(() => {
    const disabled = this.disabled();
    const orientation = this.orientation();
    const baseClasses = ['relative', 'rounded-full', 'bg-gray-200', 'dark:bg-gray-700'];

    if (orientation === 'vertical') {
      baseClasses.push('w-1.5', 'h-full');
    } else {
      baseClasses.push(this.trackHeight(), 'w-full');
    }

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      baseClasses.push('cursor-pointer');
    }

    return baseClasses.join(' ');
  });

  readonly fillClasses = computed(() => {
    return ['absolute', 'bg-primary', 'rounded-full', this.trackHeight()].join(' ');
  });

  readonly handleClasses = computed(() => {
    const disabled = this.disabled();
    const dragging = this.dragging();

    const baseClasses = [
      'absolute',
      'rounded-full',
      'bg-white',
      'border-2',
      'border-primary',
      'shadow',
      'transform',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'top-1/2',
      'transition-shadow',
      this.handleSize(),
    ];

    if (disabled) {
      baseClasses.push('cursor-not-allowed', 'border-gray-400');
    } else {
      baseClasses.push('cursor-grab', 'hover:ring-4', 'hover:ring-ring/20');
      if (dragging) {
        baseClasses.push('ring-4', 'ring-ring/20', 'cursor-grabbing');
      }
    }

    return baseClasses.join(' ');
  });

  readonly labelClasses = computed(() => {
    return ['block', 'text-sm', 'font-medium', 'mb-3', 'text-gray-700', 'dark:text-gray-300'].join(
      ' '
    );
  });

  readonly helpTextClasses = computed(() => {
    return ['text-xs', 'mt-2', 'text-gray-500', 'dark:text-gray-400'].join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  onTrackClick(event: MouseEvent): void {
    if (this.disabled()) return;

    const newValue = this.calculateValueFromEvent(event);
    this.updateValue(newValue);
  }

  onHandleMouseDown(event: MouseEvent, handleIndex: number = 0): void {
    if (this.disabled()) return;

    event.preventDefault();
    this.dragging.set(true);
    this.activeHandle.set(handleIndex);
    this.onSlideStart.emit();

    const onMouseMove = (e: MouseEvent) => {
      const newValue = this.calculateValueFromEvent(e);
      this.updateValueForHandle(newValue, handleIndex);
    };

    const onMouseUp = () => {
      this.dragging.set(false);
      this.activeHandle.set(null);
      this.onTouchedFn();
      this.onSlideEnd.emit();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  onKeydown(event: KeyboardEvent, handleIndex: number = 0): void {
    if (this.disabled()) return;

    const step = this.step();
    let delta = 0;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        delta = step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -step;
        break;
      case 'Home':
        this.updateValueForHandle(this.min(), handleIndex);
        return;
      case 'End':
        this.updateValueForHandle(this.max(), handleIndex);
        return;
      default:
        return;
    }

    event.preventDefault();

    if (this.range()) {
      const [start, end] = this.rangeValues();
      const currentValue = handleIndex === 0 ? start : end;
      this.updateValueForHandle(currentValue + delta, handleIndex);
    } else {
      const currentValue = this.singleValue();
      this.updateValue(currentValue + delta);
    }
  }

  private calculateValueFromEvent(event: MouseEvent): number {
    const track = this.trackRef()?.nativeElement;
    if (!track) return this.min();

    const rect = track.getBoundingClientRect();
    const orientation = this.orientation();

    let percentage: number;
    if (orientation === 'vertical') {
      percentage = 1 - (event.clientY - rect.top) / rect.height;
    } else {
      percentage = (event.clientX - rect.left) / rect.width;
    }

    percentage = Math.max(0, Math.min(1, percentage));

    const min = this.min();
    const max = this.max();
    const step = this.step();

    let value = min + percentage * (max - min);
    value = Math.round(value / step) * step;
    value = Math.max(min, Math.min(max, value));

    return value;
  }

  private updateValue(newValue: number): void {
    if (this.range()) {
      const [start, end] = this.rangeValues();
      const midpoint = (start + end) / 2;

      if (newValue < midpoint) {
        this.updateValueForHandle(newValue, 0);
      } else {
        this.updateValueForHandle(newValue, 1);
      }
    } else {
      const clampedValue = Math.max(this.min(), Math.min(this.max(), newValue));
      this.value.set(clampedValue);
      this.onChangeFn(clampedValue);
      this.onChange.emit(clampedValue);
    }
  }

  private updateValueForHandle(newValue: number, handleIndex: number): void {
    const min = this.min();
    const max = this.max();
    const clampedValue = Math.max(min, Math.min(max, newValue));

    if (this.range()) {
      const [start, end] = this.rangeValues();

      let newRange: [number, number];
      if (handleIndex === 0) {
        newRange = [Math.min(clampedValue, end), end];
      } else {
        newRange = [start, Math.max(clampedValue, start)];
      }

      this.value.set(newRange);
      this.onChangeFn(newRange);
      this.onChange.emit(newRange);
    } else {
      this.value.set(clampedValue);
      this.onChangeFn(clampedValue);
      this.onChange.emit(clampedValue);
    }
  }
}
