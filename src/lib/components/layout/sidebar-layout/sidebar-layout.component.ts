import { Component, ChangeDetectionStrategy, input, output, model, computed } from '@angular/core';

@Component({
  selector: 'ui-sidebar-layout',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSidebarLayoutComponent {
  readonly position = input<'left' | 'right'>('left');
  readonly visible = model<boolean>(true);
  readonly overlay = input<boolean>(false);
  readonly width = input<string>('280px');

  readonly onShow = output<void>();
  readonly onHide = output<void>();

  readonly containerClasses = computed(() => {
    const base = 'relative flex h-full overflow-hidden';
    return this.position() === 'right' ? `${base} flex-row-reverse` : base;
  });

  readonly sidebarClasses = computed(() => {
    const base = 'flex-shrink-0 bg-card border-border overflow-hidden transition-all duration-300 ease-in-out';
    if (this.overlay()) {
      const posClass = this.position() === 'right' ? 'right-0' : 'left-0';
      return `${base} absolute inset-y-0 ${posClass} z-20`;
    }
    return `${base} ${this.position() === 'right' ? 'border-l' : 'border-r'}`;
  });

  toggle(): void {
    const next = !this.visible();
    this.visible.set(next);
    if (next) {
      this.onShow.emit();
    } else {
      this.onHide.emit();
    }
  }
}
