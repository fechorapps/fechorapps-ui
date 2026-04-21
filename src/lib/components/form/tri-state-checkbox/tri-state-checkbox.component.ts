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

import { Check, LucideAngularModule, Minus } from 'lucide-angular';

/**
 * TriStateCheckbox value type
 */
export type TriStateValue = true | false | null;

/**
 * UiTriStateCheckbox Component
 *
 * A checkbox with three states: checked (true), unchecked (false), and indeterminate (null).
 *
 * @example
 * ```html
 * <ui-tri-state-checkbox [(ngModel)]="value" label="Accept terms"></ui-tri-state-checkbox>
 * ```
 */
@Component({
  selector: 'ui-tri-state-checkbox',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div [class]="wrapperClasses()">
      <button
        type="button"
        role="checkbox"
        [attr.aria-checked]="ariaChecked()"
        [attr.aria-label]="ariaLabel() || label()"
        [attr.id]="inputId()"
        [disabled]="disabled()"
        [class]="checkboxClasses()"
        (click)="toggle()"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
      >
        @if (value() === true) {
          <lucide-icon [img]="checkIcon" [size]="iconSize()" class="text-white" />
        } @else if (value() === null) {
          <lucide-icon [img]="minusIcon" [size]="iconSize()" class="text-white" />
        }
      </button>

      @if (label()) {
        <label [attr.for]="inputId()" [class]="labelClasses()" (click)="toggle()">
          {{ label() }}
        </label>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiTriStateCheckboxComponent),
      multi: true,
    },
  ],
  host: {
    class: 'inline-block',
  },
})
export class UiTriStateCheckboxComponent implements ControlValueAccessor {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly checkIcon = Check;
  protected readonly minusIcon = Minus;

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Label text */
  readonly label = input<string>('');

  /** Input id for label association */
  readonly inputId = input<string>('');

  /** Whether checkbox is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether checkbox is in invalid state */
  readonly invalid = input<boolean>(false);

  /** ARIA label for accessibility */
  readonly ariaLabel = input<string | undefined>(undefined);

  // =========================================================================
  // MODEL & STATE
  // =========================================================================

  /** The checkbox value: true, false, or null */
  readonly value = model<TriStateValue>(false);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when value changes */
  readonly onChange = output<TriStateValue>();

  // =========================================================================
  // CONTROL VALUE ACCESSOR
  // =========================================================================

  private onChangeFn: (value: TriStateValue) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: TriStateValue): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: TriStateValue) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly ariaChecked = computed(() => {
    const val = this.value();
    if (val === true) return 'true';
    if (val === false) return 'false';
    return 'mixed';
  });

  readonly iconSize = computed(() => 14);

  readonly wrapperClasses = computed(() => {
    return 'flex items-center gap-2';
  });

  readonly checkboxClasses = computed(() => {
    const disabled = this.disabled();
    const invalid = this.invalid();
    const val = this.value();

    const baseClasses = [
      'w-5',
      'h-5',
      'rounded',
      'border-2',
      'flex',
      'items-center',
      'justify-center',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
    ];

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
      if (val === true || val === null) {
        baseClasses.push('bg-gray-400', 'border-gray-400');
      } else {
        baseClasses.push('bg-gray-100', 'border-gray-300');
      }
    } else {
      baseClasses.push('cursor-pointer');

      if (invalid) {
        baseClasses.push('focus:ring-red-500/20');
        if (val === true || val === null) {
          baseClasses.push('bg-red-500', 'border-red-500');
        } else {
          baseClasses.push('border-red-500', 'bg-white', 'dark:bg-gray-900');
        }
      } else {
        baseClasses.push('focus:ring-ring/20');
        if (val === true) {
          baseClasses.push('bg-primary', 'border-primary');
        } else if (val === null) {
          baseClasses.push('bg-primary-400', 'border-primary-400');
        } else {
          baseClasses.push(
            'border-gray-300',
            'dark:border-gray-600',
            'bg-white',
            'dark:bg-gray-900',
            'hover:border-primary'
          );
        }
      }
    }

    return baseClasses.join(' ');
  });

  readonly labelClasses = computed(() => {
    const disabled = this.disabled();
    const invalid = this.invalid();

    const baseClasses = ['text-sm', 'select-none'];

    if (disabled) {
      baseClasses.push('text-gray-400', 'cursor-not-allowed');
    } else {
      baseClasses.push('cursor-pointer');
      if (invalid) {
        baseClasses.push('text-red-600', 'dark:text-red-400');
      } else {
        baseClasses.push('text-gray-700', 'dark:text-gray-300');
      }
    }

    return baseClasses.join(' ');
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  toggle(): void {
    if (this.disabled()) return;

    const current = this.value();
    let next: TriStateValue;

    // Cycle: false -> true -> null -> false
    if (current === false) {
      next = true;
    } else if (current === true) {
      next = null;
    } else {
      next = false;
    }

    this.value.set(next);
    this.onChangeFn(next);
    this.onChange.emit(next);
  }

  handleFocus(event: FocusEvent): void {
    // Focus handling if needed
  }

  handleBlur(event: FocusEvent): void {
    this.onTouchedFn();
  }
}
