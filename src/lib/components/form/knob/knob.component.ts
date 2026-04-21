import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Knob sizes
 */
export type KnobSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * UiKnob Component
 *
 * A circular dial-like control for selecting numeric values.
 *
 * @example
 * ```html
 * <ui-knob [(ngModel)]="volume" [min]="0" [max]="100"></ui-knob>
 * <ui-knob [(ngModel)]="percentage" [showValue]="true"></ui-knob>
 * ```
 */
@Component({
  selector: 'ui-knob',
  standalone: true,
  imports: [],
  templateUrl: './knob.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiKnobComponent),
      multi: true,
    },
  ],
  host: {
    class: 'inline-block',
  },
})
export class UiKnobComponent implements ControlValueAccessor {
  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly svgRef = viewChild<ElementRef<SVGElement>>('svgEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Size */
  readonly size = input<KnobSize>('md');

  /** Minimum value */
  readonly min = input<number>(0);

  /** Maximum value */
  readonly max = input<number>(100);

  /** Step value */
  readonly step = input<number>(1);

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is readonly */
  readonly readonly = input<boolean>(false);

  /** Whether to show the value in center */
  readonly showValue = input<boolean>(true);

  /** Value template (e.g., "{value}%") */
  readonly valueTemplate = input<string>('{value}');

  /** Color of the value arc */
  readonly valueColor = input<string>('');

  /** Color of the range arc */
  readonly rangeColor = input<string>('');

  /** Stroke width */
  readonly strokeWidth = input<number>(14);

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Current value */
  readonly value = model<number>(0);

  /** Whether currently dragging */
  private isDragging = false;

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when value changes */
  readonly onChange = output<number>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: number) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: number): void {
    if (typeof value === 'number') {
      this.value.set(this.clampValue(value));
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // HOST LISTENERS
  // =========================================================================

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging && !this.disabled() && !this.readonly()) {
      this.updateValueFromEvent(event);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.onTouchedFn();
    }
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly dimensions = computed(() => {
    const sizeMap: Record<KnobSize, number> = {
      sm: 80,
      md: 100,
      lg: 140,
      xl: 180,
    };
    return sizeMap[this.size()];
  });

  readonly radius = computed(() => {
    return (this.dimensions() - this.strokeWidth()) / 2;
  });

  readonly center = computed(() => {
    return this.dimensions() / 2;
  });

  readonly circumference = computed(() => {
    return 2 * Math.PI * this.radius();
  });

  readonly valuePercentage = computed(() => {
    const min = this.min();
    const max = this.max();
    const val = this.value();
    return (val - min) / (max - min);
  });

  readonly strokeDashoffset = computed(() => {
    const percentage = this.valuePercentage();
    const circumference = this.circumference();
    return circumference * (1 - percentage * 0.75); // 270 degrees = 0.75 of circle
  });

  readonly displayValue = computed(() => {
    const template = this.valueTemplate();
    return template.replace('{value}', String(this.value()));
  });

  readonly valueFontSize = computed(() => {
    const sizeMap: Record<KnobSize, string> = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-2xl',
      xl: 'text-3xl',
    };
    return sizeMap[this.size()];
  });

  readonly labelFontSize = computed(() => {
    const sizeMap: Record<KnobSize, string> = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    };
    return sizeMap[this.size()];
  });

  readonly arcColor = computed(() => {
    if (this.valueColor()) return this.valueColor();
    return 'var(--color-primary, #3b82f6)';
  });

  readonly trackColor = computed(() => {
    if (this.rangeColor()) return this.rangeColor();
    return 'var(--color-gray-200, #e5e7eb)';
  });

  readonly containerClasses = computed(() => {
    const disabled = this.disabled();
    return disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  });

  readonly rotateTransform = computed(() => {
    const c = this.center();
    return `rotate(135, ${c}, ${c})`;
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  onMouseDown(event: MouseEvent): void {
    if (this.disabled() || this.readonly()) return;
    this.isDragging = true;
    this.updateValueFromEvent(event);
  }

  onWheel(event: WheelEvent): void {
    if (this.disabled() || this.readonly()) return;
    event.preventDefault();

    const direction = event.deltaY > 0 ? -1 : 1;
    const newValue = this.clampValue(this.value() + this.step() * direction);

    if (newValue !== this.value()) {
      this.updateValue(newValue);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    let newValue = this.value();

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        event.preventDefault();
        newValue = this.clampValue(this.value() + this.step());
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        event.preventDefault();
        newValue = this.clampValue(this.value() - this.step());
        break;
      case 'Home':
        event.preventDefault();
        newValue = this.min();
        break;
      case 'End':
        event.preventDefault();
        newValue = this.max();
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = this.clampValue(this.value() + this.step() * 10);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = this.clampValue(this.value() - this.step() * 10);
        break;
    }

    if (newValue !== this.value()) {
      this.updateValue(newValue);
    }
  }

  private updateValueFromEvent(event: MouseEvent): void {
    const svg = this.svgRef()?.nativeElement;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = event.clientX - centerX;
    const y = event.clientY - centerY;

    // Calculate angle from center
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = angle + 90; // Adjust so top is 0

    // Convert to 0-270 range (starting from -135 to 135)
    if (angle < -135) angle = angle + 360;
    angle = angle + 135;

    if (angle < 0) angle = 0;
    if (angle > 270) angle = 270;

    // Convert angle to value
    const percentage = angle / 270;
    const range = this.max() - this.min();
    let newValue = this.min() + percentage * range;

    // Round to step
    const step = this.step();
    newValue = Math.round(newValue / step) * step;
    newValue = this.clampValue(newValue);

    if (newValue !== this.value()) {
      this.updateValue(newValue);
    }
  }

  private clampValue(value: number): number {
    return Math.min(Math.max(value, this.min()), this.max());
  }

  private updateValue(value: number): void {
    this.value.set(value);
    this.onChangeFn(value);
    this.onChange.emit(value);
  }
}
