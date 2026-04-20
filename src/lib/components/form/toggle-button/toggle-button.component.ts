import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

/**
 * Toggle button variants
 */
export type ToggleButtonVariant = 'default' | 'outlined' | 'text';

/**
 * Toggle button sizes
 */
export type ToggleButtonSize = 'sm' | 'md' | 'lg';

/**
 * UiToggleButton Component
 *
 * A button that toggles between on/off states.
 *
 * @example
 * ```html
 * <ui-toggle-button [(ngModel)]="isActive">Active</ui-toggle-button>
 * <ui-toggle-button [(ngModel)]="isBold" [icon]="boldIcon"></ui-toggle-button>
 * ```
 */
@Component({
  selector: 'ui-toggle-button',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './toggle-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiToggleButtonComponent),
      multi: true,
    },
  ],
  host: {
    class: 'inline-block',
  },
})
export class UiToggleButtonComponent implements ControlValueAccessor {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Visual variant */
  readonly variant = input<ToggleButtonVariant>('default');

  /** Size */
  readonly size = input<ToggleButtonSize>('md');

  /** Icon to display */
  readonly icon = input<LucideIconData | undefined>(undefined);

  /** Icon for on state */
  readonly onIcon = input<LucideIconData | undefined>(undefined);

  /** Icon for off state */
  readonly offIcon = input<LucideIconData | undefined>(undefined);

  /** Label for on state */
  readonly onLabel = input<string | undefined>(undefined);

  /** Label for off state */
  readonly offLabel = input<string | undefined>(undefined);

  /** Whether button is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether button is invalid */
  readonly invalid = input<boolean>(false);

  // =========================================================================
  // MODEL
  // =========================================================================

  /** Toggle state */
  readonly checked = model<boolean>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when toggle state changes */
  readonly onChange = output<boolean>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly iconSize = computed(() => {
    const sizeMap: Record<ToggleButtonSize, number> = { sm: 14, md: 16, lg: 18 };
    return sizeMap[this.size()];
  });

  readonly currentIcon = computed(() => {
    const checked = this.checked();
    if (checked && this.onIcon()) return this.onIcon();
    if (!checked && this.offIcon()) return this.offIcon();
    return this.icon();
  });

  readonly currentLabel = computed(() => {
    const checked = this.checked();
    if (checked && this.onLabel()) return this.onLabel();
    if (!checked && this.offLabel()) return this.offLabel();
    return undefined;
  });

  readonly buttonClasses = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const checked = this.checked();
    const disabled = this.disabled();
    const invalid = this.invalid();
    const hasIcon = !!this.currentIcon();
    const hasLabel = !!this.currentLabel();

    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-1.5',
      'font-medium',
      'rounded-lg',
      'border',
      'transition-all',
      'duration-200',
      'select-none',
    ];

    const sizeClasses: Record<ToggleButtonSize, string[]> = {
      sm: ['text-xs', hasLabel && !hasIcon ? 'px-2.5 py-1.5' : 'p-1.5'],
      md: ['text-sm', hasLabel && !hasIcon ? 'px-3 py-2' : 'p-2'],
      lg: ['text-base', hasLabel && !hasIcon ? 'px-4 py-2.5' : 'p-2.5'],
    };

    const stateClasses: string[] = [];

    if (disabled) {
      stateClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      stateClasses.push('cursor-pointer');
    }

    if (invalid) {
      stateClasses.push('border-red-500', 'text-red-500');
    } else if (checked) {
      if (variant === 'default') {
        stateClasses.push(
          'bg-primary-600',
          'border-primary-600',
          'text-white',
          'hover:bg-primary-700',
          'hover:border-primary-700'
        );
      } else if (variant === 'outlined') {
        stateClasses.push(
          'bg-primary-50',
          'dark:bg-primary-900/30',
          'border-primary-500',
          'text-primary-600',
          'dark:text-primary-400'
        );
      } else {
        stateClasses.push(
          'bg-primary-100',
          'dark:bg-primary-900/20',
          'border-transparent',
          'text-primary-600'
        );
      }
    } else {
      if (variant === 'default') {
        stateClasses.push(
          'bg-gray-100',
          'dark:bg-gray-800',
          'border-gray-300',
          'dark:border-gray-600',
          'text-gray-700',
          'dark:text-gray-300',
          'hover:bg-gray-200',
          'dark:hover:bg-gray-700'
        );
      } else if (variant === 'outlined') {
        stateClasses.push(
          'bg-transparent',
          'border-gray-300',
          'dark:border-gray-600',
          'text-gray-700',
          'dark:text-gray-300',
          'hover:bg-gray-50',
          'dark:hover:bg-gray-800'
        );
      } else {
        stateClasses.push(
          'bg-transparent',
          'border-transparent',
          'text-gray-700',
          'dark:text-gray-300',
          'hover:bg-gray-100',
          'dark:hover:bg-gray-800'
        );
      }
    }

    return [...baseClasses, ...sizeClasses[size], ...stateClasses].join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  toggle(): void {
    if (this.disabled()) return;

    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChangeFn(newValue);
    this.onTouchedFn();
    this.onChange.emit(newValue);
  }
}
