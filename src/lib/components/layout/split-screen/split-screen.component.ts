import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-split-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './split-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSplitScreenComponent {
  readonly ratio = input<'50/50' | '40/60' | '60/40' | '30/70' | '70/30'>('50/50');
  readonly mobileStack = input<'left-first' | 'right-first' | 'right-hidden'>('left-first');
  readonly gap = input<boolean>(false);
  readonly fullHeight = input<boolean>(true);

  readonly leftClass = computed(() => {
    const r: Record<string, string> = {
      '50/50': 'md:w-1/2',
      '40/60': 'md:w-2/5',
      '60/40': 'md:w-3/5',
      '30/70': 'md:w-[30%]',
      '70/30': 'md:w-[70%]',
    };
    return r[this.ratio()] ?? 'md:w-1/2';
  });

  readonly rightClass = computed(() => {
    const r: Record<string, string> = {
      '50/50': 'md:w-1/2',
      '40/60': 'md:w-3/5',
      '60/40': 'md:w-2/5',
      '30/70': 'md:w-[70%]',
      '70/30': 'md:w-[30%]',
    };
    return r[this.ratio()] ?? 'md:w-1/2';
  });

  readonly rightVisible = computed(() => this.mobileStack() !== 'right-hidden');

  readonly mobileOrder = computed(() =>
    this.mobileStack() === 'right-first' ? 'flex-col-reverse' : 'flex-col'
  );

  readonly containerClass = computed(() => {
    const parts = ['flex', 'w-full', this.mobileOrder(), 'md:flex-row'];
    if (this.fullHeight()) parts.push('min-h-screen');
    if (this.gap()) parts.push('gap-4');
    return parts.join(' ');
  });
}
