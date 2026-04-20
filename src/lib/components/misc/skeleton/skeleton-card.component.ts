import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UiSkeletonComponent } from './skeleton.component';

/**
 * UiSkeletonCard Component
 *
 * A skeleton loader for card layouts.
 *
 * @example
 * ```html
 * <ui-skeleton-card />
 * <ui-skeleton-card [showImage]="true" [showAvatar]="false" />
 * ```
 */
@Component({
  selector: 'ui-skeleton-card',
  standalone: true,
  imports: [UiSkeletonComponent],
  template: `
    <div
      class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
    >
      <!-- Image placeholder -->
      @if (showImage()) {
        <ui-skeleton width="100%" height="140px" class="mb-4" borderRadius="8px" />
      }

      <!-- Avatar + Title row -->
      @if (showAvatar()) {
        <div class="flex items-center gap-3 mb-3">
          <ui-skeleton shape="circle" size="40px" />
          <div class="flex-1 space-y-2">
            <ui-skeleton width="60%" height="1rem" />
            <ui-skeleton width="40%" height="0.75rem" />
          </div>
        </div>
      } @else {
        <!-- Title only -->
        <ui-skeleton width="70%" height="1.25rem" class="mb-2" />
        <ui-skeleton width="40%" height="0.875rem" class="mb-3" />
      }

      <!-- Content lines -->
      <div class="space-y-2">
        <ui-skeleton width="100%" height="0.875rem" />
        <ui-skeleton width="90%" height="0.875rem" />
        <ui-skeleton width="75%" height="0.875rem" />
      </div>

      <!-- Footer -->
      @if (showFooter()) {
        <div
          class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
        >
          <ui-skeleton width="80px" height="2rem" borderRadius="6px" />
          <ui-skeleton width="60px" height="0.875rem" />
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiSkeletonCardComponent {
  /** Show image placeholder at top */
  readonly showImage = input<boolean>(false);

  /** Show avatar with title */
  readonly showAvatar = input<boolean>(true);

  /** Show footer section */
  readonly showFooter = input<boolean>(true);
}
