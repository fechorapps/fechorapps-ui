import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  contentChild,
  TemplateRef,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'ui-drawer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDrawerComponent {
  // Icons
  readonly closeIcon = X;

  // Inputs
  readonly visible = model<boolean>(false);
  readonly header = input<string>('');
  readonly position = input<DrawerPosition>('right');
  readonly size = input<DrawerSize>('md');
  readonly modal = input<boolean>(true);
  readonly closable = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly dismissableMask = input<boolean>(false);
  readonly blockScroll = input<boolean>(true);
  readonly showCloseIcon = input<boolean>(true);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onShow = output<void>();
  readonly onHide = output<void>();

  // Content projections
  readonly headerTemplate = contentChild<TemplateRef<unknown>>('header');
  readonly footerTemplate = contentChild<TemplateRef<unknown>>('footer');

  // Computed styles
  readonly backdropClasses = computed(() => {
    const base = 'fixed inset-0 z-40 transition-opacity duration-300';
    const modal = this.modal() ? 'bg-black/50 dark:bg-black/70' : '';
    const visibility = this.visible() ? 'opacity-100' : 'opacity-0 pointer-events-none';

    return `${base} ${modal} ${visibility}`;
  });

  readonly drawerClasses = computed(() => {
    const base = [
      'fixed z-50 bg-white dark:bg-gray-900',
      'flex flex-col',
      'shadow-2xl',
      'transition-transform duration-300 ease-in-out',
      this.styleClass(),
    ];

    // Position classes
    const positionClasses: Record<DrawerPosition, string> = {
      left: 'inset-y-0 left-0',
      right: 'inset-y-0 right-0',
      top: 'inset-x-0 top-0',
      bottom: 'inset-x-0 bottom-0',
    };
    base.push(positionClasses[this.position()]);

    // Size classes
    const sizeClasses = this.getSizeClasses();
    base.push(sizeClasses);

    // Transform for hidden state
    if (!this.visible()) {
      const hideTransforms: Record<DrawerPosition, string> = {
        left: '-translate-x-full',
        right: 'translate-x-full',
        top: '-translate-y-full',
        bottom: 'translate-y-full',
      };
      base.push(hideTransforms[this.position()]);
    } else {
      base.push('translate-x-0 translate-y-0');
    }

    return base.join(' ');
  });

  constructor() {
    // Handle escape key
    effect(() => {
      if (this.visible() && this.closeOnEscape()) {
        const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            this.close();
          }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
      return;
    });

    // Handle body scroll
    effect(() => {
      if (this.visible() && this.blockScroll()) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
      return;
    });

    // Emit show event
    effect(() => {
      if (this.visible()) {
        this.onShow.emit();
      }
    });
  }

  private getSizeClasses(): string {
    const pos = this.position();
    const size = this.size();

    if (pos === 'left' || pos === 'right') {
      const widthMap: Record<DrawerSize, string> = {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-[32rem]',
        full: 'w-screen',
      };
      return widthMap[size];
    } else {
      const heightMap: Record<DrawerSize, string> = {
        sm: 'h-48',
        md: 'h-64',
        lg: 'h-96',
        xl: 'h-[32rem]',
        full: 'h-screen',
      };
      return heightMap[size];
    }
  }

  close(): void {
    this.visible.set(false);
    this.onHide.emit();
  }

  onMaskClick(event: MouseEvent): void {
    if (this.dismissableMask() && event.target === event.currentTarget) {
      this.close();
    }
  }
}
