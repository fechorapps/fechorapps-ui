import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * FloatLabel variants
 */
export type FloatLabelVariant = 'default' | 'in' | 'on';

/**
 * UiFloatLabel Component
 *
 * A wrapper component that provides floating label animation for form inputs.
 * The label floats above the input when focused or filled.
 *
 * @example
 * ```html
 * <ui-float-label label="Username">
 *   <input type="text" pInputText />
 * </ui-float-label>
 * ```
 */
@Component({
  selector: 'ui-float-label',
  standalone: true,
  template: `
    <div [class]="containerClasses()">
      <ng-content></ng-content>
      @if (label()) {
        <label [class]="labelClasses()">{{ label() }}</label>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiFloatLabelComponent {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Label text */
  readonly label = input<string>('');

  /** Variant style */
  readonly variant = input<FloatLabelVariant>('default');

  /** Whether the input has a value (for controlling label position) */
  readonly filled = input<boolean>(false);

  /** Invalid state */
  readonly invalid = input<boolean>(false);

  // =========================================================================
  // COMPUTED - STYLES
  // =========================================================================

  readonly containerClasses = computed(() => {
    const variant = this.variant();

    const baseClasses = ['relative', 'w-full'];

    if (variant === 'in') {
      baseClasses.push('float-label-in');
    } else if (variant === 'on') {
      baseClasses.push('float-label-on');
    }

    return baseClasses.join(' ');
  });

  readonly labelClasses = computed(() => {
    const invalid = this.invalid();
    const filled = this.filled();
    const variant = this.variant();

    const baseClasses = [
      'absolute',
      'pointer-events-none',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'origin-top-left',
    ];

    // Position based on variant
    if (variant === 'default') {
      baseClasses.push(
        'left-3',
        'top-1/2',
        '-translate-y-1/2',
        'peer-focus:top-0',
        'peer-focus:-translate-y-full',
        'peer-focus:text-xs',
        'peer-focus:px-1',
        'peer-focus:bg-white',
        'dark:peer-focus:bg-gray-900'
      );

      if (filled) {
        baseClasses.push(
          'top-0',
          '-translate-y-full',
          'text-xs',
          'px-1',
          'bg-white',
          'dark:bg-gray-900'
        );
      }
    } else if (variant === 'in') {
      baseClasses.push(
        'left-3',
        'top-4',
        'peer-focus:top-1',
        'peer-focus:text-xs',
        'peer-placeholder-shown:top-4',
        'peer-placeholder-shown:text-base'
      );

      if (filled) {
        baseClasses.push('top-1', 'text-xs');
      }
    } else if (variant === 'on') {
      baseClasses.push(
        'left-3',
        '-top-2',
        'text-xs',
        'px-1',
        'bg-white',
        'dark:bg-gray-900',
        'peer-placeholder-shown:top-1/2',
        'peer-placeholder-shown:-translate-y-1/2',
        'peer-placeholder-shown:text-base',
        'peer-focus:-top-2',
        'peer-focus:translate-y-0',
        'peer-focus:text-xs'
      );
    }

    // Color
    if (invalid) {
      baseClasses.push('text-red-500', 'peer-focus:text-red-500');
    } else {
      baseClasses.push('text-gray-500', 'peer-focus:text-primary-500');
    }

    return baseClasses.join(' ');
  });
}
