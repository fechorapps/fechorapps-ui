import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UiSkeletonComponent } from './skeleton.component';

/**
 * UiSkeletonUserRow Component
 *
 * A skeleton loader for user list table rows.
 * Matches the layout of actual user rows with avatar, name, email, roles, and actions.
 *
 * @example
 * ```html
 * <ui-skeleton-user-row />
 *
 * <!-- Multiple rows -->
 * @for (i of [1,2,3,4,5]; track i) {
 *   <ui-skeleton-user-row />
 * }
 * ```
 */
@Component({
  selector: 'ui-skeleton-user-row',
  standalone: true,
  imports: [UiSkeletonComponent],
  template: `
    <div class="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
      <!-- Checkbox -->
      @if (showCheckbox()) {
        <ui-skeleton width="20px" height="20px" borderRadius="4px" />
      }

      <!-- Avatar -->
      <ui-skeleton shape="circle" size="40px" />

      <!-- Name & Email -->
      <div class="flex-1 min-w-0 space-y-1.5">
        <ui-skeleton width="160px" height="1rem" />
        <ui-skeleton width="200px" height="0.75rem" />
      </div>

      <!-- Roles -->
      <div class="hidden md:flex gap-2">
        <ui-skeleton width="60px" height="1.5rem" borderRadius="9999px" />
        <ui-skeleton width="50px" height="1.5rem" borderRadius="9999px" />
      </div>

      <!-- Status -->
      <div class="hidden lg:block">
        <ui-skeleton width="80px" height="1.5rem" borderRadius="9999px" />
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <ui-skeleton width="32px" height="32px" borderRadius="6px" />
        <ui-skeleton width="32px" height="32px" borderRadius="6px" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiSkeletonUserRowComponent {
  /** Whether to show checkbox column */
  readonly showCheckbox = input<boolean>(false);
}
