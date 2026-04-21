import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

/**
 * Input group sizes
 */
export type InputGroupSize = 'sm' | 'md' | 'lg';

/**
 * UiInputGroup Component
 *
 * A wrapper component that groups inputs with addons (text, icons, buttons).
 *
 * @example
 * ```html
 * <ui-input-group prefix="$">
 *   <input type="number" placeholder="0.00" />
 * </ui-input-group>
 *
 * <ui-input-group suffix=".00">
 *   <input type="number" placeholder="Amount" />
 * </ui-input-group>
 * ```
 */
@Component({
  selector: 'ui-input-group',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './input-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiInputGroupComponent {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Size */
  readonly size = input<InputGroupSize>('md');

  /** Prefix text */
  readonly prefix = input<string | undefined>(undefined);

  /** Suffix text */
  readonly suffix = input<string | undefined>(undefined);

  /** Prefix icon */
  readonly prefixIcon = input<LucideIconData | undefined>(undefined);

  /** Suffix icon */
  readonly suffixIcon = input<LucideIconData | undefined>(undefined);

  /** Whether group is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether group is invalid */
  readonly invalid = input<boolean>(false);

  /** Whether group takes full width */
  readonly fullWidth = input<boolean>(true);

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly iconSize = computed(() => {
    const sizeMap: Record<InputGroupSize, number> = { sm: 14, md: 16, lg: 18 };
    return sizeMap[this.size()];
  });

  readonly wrapperClasses = computed(() => {
    return this.fullWidth() ? 'w-full' : 'inline-flex';
  });

  readonly containerClasses = computed(() => {
    const invalid = this.invalid();
    const disabled = this.disabled();

    const baseClasses = ['flex', 'items-stretch', 'rounded-lg', 'border', 'overflow-hidden'];

    if (disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    }

    if (invalid) {
      baseClasses.push('border-red-500', 'focus-within:ring-2', 'focus-within:ring-red-500/20');
    } else {
      baseClasses.push(
        'border-gray-300',
        'dark:border-gray-600',
        'focus-within:border-primary',
        'focus-within:ring-2',
        'focus-within:ring-ring/20'
      );
    }

    return baseClasses.join(' ');
  });

  readonly addonClasses = computed(() => {
    const size = this.size();
    const hasPrefix = !!this.prefix() || !!this.prefixIcon();

    const baseClasses = [
      'flex',
      'items-center',
      'justify-center',
      'bg-gray-100',
      'dark:bg-gray-800',
      'text-gray-500',
      'dark:text-gray-400',
      'border-gray-300',
      'dark:border-gray-600',
      'flex-shrink-0',
    ];

    const sizeClasses: Record<InputGroupSize, string[]> = {
      sm: ['px-2.5', 'text-sm'],
      md: ['px-3', 'text-sm'],
      lg: ['px-4', 'text-base'],
    };

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly prefixAddonClasses = computed(() => {
    return `${this.addonClasses()} border-r`;
  });

  readonly suffixAddonClasses = computed(() => {
    return `${this.addonClasses()} border-l`;
  });
}
