import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

/**
 * Icon field sizes
 */
export type IconFieldSize = 'sm' | 'md' | 'lg';

/**
 * Icon position
 */
export type IconPosition = 'left' | 'right';

/**
 * UiIconField Component
 *
 * A wrapper component that adds icons to input fields.
 *
 * @example
 * ```html
 * <ui-icon-field [icon]="searchIcon">
 *   <input type="text" pInputText placeholder="Search..." />
 * </ui-icon-field>
 * ```
 */
@Component({
  selector: 'ui-icon-field',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './icon-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiIconFieldComponent {
  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Size */
  readonly size = input<IconFieldSize>('md');

  /** Icon to display (left position by default) */
  readonly icon = input<LucideIconData | undefined>(undefined);

  /** Icon position */
  readonly iconPosition = input<IconPosition>('left');

  /** End icon (right position) */
  readonly iconEnd = input<LucideIconData | undefined>(undefined);

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly iconSize = computed(() => {
    const sizeMap: Record<IconFieldSize, number> = { sm: 14, md: 16, lg: 18 };
    return sizeMap[this.size()];
  });

  readonly containerClasses = computed(() => {
    return 'relative flex items-center w-full';
  });

  readonly iconClasses = computed(() => {
    const position = this.iconPosition();
    const size = this.size();

    const baseClasses = [
      'absolute',
      'flex',
      'items-center',
      'pointer-events-none',
      'text-gray-400',
      'dark:text-gray-500',
    ];

    const positionClasses = position === 'left' ? ['left-0'] : ['right-0'];

    const sizeClasses: Record<IconFieldSize, string[]> = {
      sm: ['pl-2.5', 'pr-2.5'],
      md: ['pl-3', 'pr-3'],
      lg: ['pl-4', 'pr-4'],
    };

    return [...baseClasses, ...positionClasses, ...sizeClasses[size]].join(' ');
  });

  readonly iconEndClasses = computed(() => {
    const size = this.size();

    const baseClasses = [
      'absolute',
      'right-0',
      'flex',
      'items-center',
      'pointer-events-none',
      'text-gray-400',
      'dark:text-gray-500',
    ];

    const sizeClasses: Record<IconFieldSize, string[]> = {
      sm: ['pr-2.5'],
      md: ['pr-3'],
      lg: ['pr-4'],
    };

    return [...baseClasses, ...sizeClasses[size]].join(' ');
  });

  readonly contentPaddingClass = computed(() => {
    const size = this.size();
    const hasIcon = !!this.icon();
    const hasIconEnd = !!this.iconEnd();
    const position = this.iconPosition();

    const classes: string[] = [];

    if (hasIcon) {
      if (position === 'left') {
        classes.push(size === 'sm' ? 'pl-8' : size === 'lg' ? 'pl-11' : 'pl-10');
      } else {
        classes.push(size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-11' : 'pr-10');
      }
    }

    if (hasIconEnd) {
      classes.push(size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-11' : 'pr-10');
    }

    return classes.join(' ');
  });
}
