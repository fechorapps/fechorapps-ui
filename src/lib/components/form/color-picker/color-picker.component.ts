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

import { Pipette, LucideAngularModule } from 'lucide-angular';

/**
 * Color picker variants
 */
export type ColorPickerVariant = 'default' | 'filled' | 'outlined';

/**
 * Color picker sizes
 */
export type ColorPickerSize = 'sm' | 'md' | 'lg';

/**
 * Color format
 */
export type ColorFormat = 'hex' | 'rgb' | 'hsl';

/**
 * Preset color
 */
export interface PresetColor {
  name: string;
  value: string;
}

/**
 * UiColorPicker Component
 *
 * A color picker component for selecting colors.
 *
 * @example
 * ```html
 * <ui-color-picker [(ngModel)]="color"></ui-color-picker>
 * <ui-color-picker [presets]="colorPalette"></ui-color-picker>
 * ```
 */
@Component({
  selector: 'ui-color-picker',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './color-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiColorPickerComponent),
      multi: true,
    },
  ],
  host: {
    class: 'block',
  },
})
export class UiColorPickerComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly pipetteIcon = Pipette;

  // =========================================================================
  // VIEW CHILDREN
  // =========================================================================

  private readonly containerRef = viewChild<ElementRef>('containerEl');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<ColorPickerVariant>('default');

  /** Size */
  readonly size = input<ColorPickerSize>('md');

  /** Color format */
  readonly format = input<ColorFormat>('hex');

  /** Whether to show alpha channel */
  readonly alpha = input<boolean>(false);

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is in invalid state */
  readonly invalid = input<boolean>(false);

  /** Label text */
  readonly label = input<string | undefined>(undefined);

  /** Help text */
  readonly helpText = input<string | undefined>(undefined);

  /** Whether input takes full width */
  readonly fullWidth = input<boolean>(true);

  /** Preset colors */
  readonly presets = input<PresetColor[]>([
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Gray', value: '#6b7280' },
  ]);

  /** Whether to show input field */
  readonly showInput = input<boolean>(true);

  /** Whether to show presets */
  readonly showPresets = input<boolean>(true);

  /** Whether inline mode (always visible panel) */
  readonly inline = input<boolean>(false);

  /** Input id */
  readonly inputId = input<string>('');

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** Color value */
  readonly value = model<string>('#3b82f6');

  /** Panel visibility */
  readonly panelVisible = signal<boolean>(false);

  /** Focus state */
  readonly focused = signal<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when color changes */
  readonly onChange = output<string>();

  /** Emitted when panel shows */
  readonly onShow = output<void>();

  /** Emitted when panel hides */
  readonly onHide = output<void>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.value.set(value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // HOST LISTENER
  // =========================================================================

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.inline()) return;
    const container = this.containerRef()?.nativeElement;
    if (container && !container.contains(event.target)) {
      this.closePanel();
    }
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly swatchSize = computed(() => {
    const sizeMap: Record<ColorPickerSize, string> = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-10 h-10',
    };
    return sizeMap[this.size()];
  });

  readonly presetSwatchSize = computed(() => {
    const sizeMap: Record<ColorPickerSize, string> = {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-7 h-7',
    };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-block';
  });

  readonly triggerClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const invalid = this.invalid();
    const disabled = this.disabled();
    const focused = this.focused();
    const panelVisible = this.panelVisible();

    const baseClasses = [
      'flex',
      'items-center',
      'gap-2',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
      'cursor-pointer',
    ];

    const sizeClasses: Record<ColorPickerSize, string[]> = {
      sm: ['px-2', 'py-1.5', 'text-sm'],
      md: ['px-3', 'py-2', 'text-sm'],
      lg: ['px-4', 'py-2.5', 'text-base'],
    };

    const variantClasses: Record<ColorPickerVariant, string[]> = {
      default: ['bg-white', 'dark:bg-gray-900', 'border-gray-300', 'dark:border-gray-600'],
      filled: ['bg-gray-100', 'dark:bg-gray-800', 'border-transparent'],
      outlined: ['bg-transparent', 'border-gray-300', 'dark:border-gray-600'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      if (invalid) {
        stateClasses.push('border-red-500');
      } else if (focused || panelVisible) {
        stateClasses.push('border-primary-500', 'ring-2', 'ring-primary-500/20');
      } else {
        stateClasses.push('hover:border-gray-400');
      }
    }

    return [...baseClasses, ...sizeClasses[size], ...variantClasses[variant], ...stateClasses].join(
      ' '
    );
  });

  readonly panelClasses = computed(() => {
    const inline = this.inline();
    const baseClasses = [
      'bg-white',
      'dark:bg-gray-900',
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'rounded-lg',
      'shadow-lg',
      'p-3',
    ];

    if (!inline) {
      baseClasses.push('absolute', 'z-50', 'mt-1');
    }

    return baseClasses.join(' ');
  });

  readonly labelClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['block', 'text-sm', 'font-medium', 'mb-1.5'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
    );
    return baseClasses.join(' ');
  });

  readonly helpTextClasses = computed(() => {
    const invalid = this.invalid();
    const baseClasses = ['text-xs', 'mt-1.5'];
    baseClasses.push(
      invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
    );
    return baseClasses.join(' ');
  });

  readonly displayValue = computed(() => {
    const color = this.value();
    const format = this.format();

    if (format === 'hex') {
      return color;
    } else if (format === 'rgb') {
      return this.hexToRgb(color);
    } else {
      return this.hexToHsl(color);
    }
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  togglePanel(): void {
    if (this.disabled()) return;

    if (this.panelVisible()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel(): void {
    if (this.disabled()) return;
    this.panelVisible.set(true);
    this.onShow.emit();
  }

  closePanel(): void {
    this.panelVisible.set(false);
    this.onHide.emit();
  }

  selectColor(color: string): void {
    if (this.disabled()) return;
    this.updateValue(color);
  }

  selectPreset(preset: PresetColor): void {
    if (this.disabled()) return;
    this.updateValue(preset.value);
    if (!this.inline()) {
      this.closePanel();
    }
  }

  onColorInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.updateValue(target.value);
  }

  onTextInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    // Validate hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      this.updateValue(value);
    }
  }

  handleFocus(): void {
    this.focused.set(true);
  }

  handleBlur(): void {
    this.focused.set(false);
    this.onTouchedFn();
  }

  private updateValue(color: string): void {
    this.value.set(color);
    this.onChangeFn(color);
    this.onChange.emit(color);
  }

  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return hex;
  }

  private hexToHsl(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }

      return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }
    return hex;
  }
}
