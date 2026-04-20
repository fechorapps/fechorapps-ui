import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

export type DividerLayout = 'horizontal' | 'vertical';
export type DividerType = 'solid' | 'dashed' | 'dotted';
export type DividerAlign = 'left' | 'center' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'ui-divider',
  standalone: true,
  templateUrl: './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDividerComponent {
  // Inputs
  readonly layout = input<DividerLayout>('horizontal');
  readonly type = input<DividerType>('solid');
  readonly align = input<DividerAlign>('center');
  readonly styleClass = input<string>('');

  // Computed
  readonly dividerClasses = computed(() => {
    const layout = this.layout();
    const type = this.type();
    const base: string[] = [];

    if (layout === 'horizontal') {
      base.push('flex', 'items-center', 'w-full', 'my-4');
    } else {
      base.push('flex', 'flex-col', 'items-center', 'h-full', 'mx-4');
    }

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });

  readonly lineClasses = computed(() => {
    const layout = this.layout();
    const type = this.type();
    const base = ['bg-gray-200', 'dark:bg-gray-700'];

    if (layout === 'horizontal') {
      base.push('h-px', 'flex-1');
    } else {
      base.push('w-px', 'flex-1');
    }

    if (type === 'dashed') {
      base.push('bg-transparent', 'border-gray-200', 'dark:border-gray-700');
      if (layout === 'horizontal') {
        base.push('border-t', 'border-dashed');
      } else {
        base.push('border-l', 'border-dashed');
      }
    } else if (type === 'dotted') {
      base.push('bg-transparent', 'border-gray-200', 'dark:border-gray-700');
      if (layout === 'horizontal') {
        base.push('border-t', 'border-dotted');
      } else {
        base.push('border-l', 'border-dotted');
      }
    }

    return base.join(' ');
  });

  readonly contentClasses = computed(() => {
    const layout = this.layout();
    const align = this.align();
    const base = ['px-3', 'text-gray-500', 'dark:text-gray-400', 'text-sm', 'whitespace-nowrap'];

    if (layout === 'vertical') {
      base.push('py-3');
    }

    return base.join(' ');
  });

  readonly showLeftLine = computed(() => {
    const align = this.align();
    return align !== 'left' && align !== 'top';
  });

  readonly showRightLine = computed(() => {
    const align = this.align();
    return align !== 'right' && align !== 'bottom';
  });
}
