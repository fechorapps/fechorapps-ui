import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-inplace',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './inplace.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInplaceComponent {
  // Inputs
  readonly active = input<boolean>(false);
  readonly closable = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onActivate = output<void>();
  readonly onDeactivate = output<void>();

  // State
  readonly isActive = signal<boolean>(false);

  ngOnInit(): void {
    this.isActive.set(this.active());
  }

  activate(): void {
    if (this.disabled()) return;
    this.isActive.set(true);
    this.onActivate.emit();
  }

  deactivate(): void {
    this.isActive.set(false);
    this.onDeactivate.emit();
  }

  readonly displayClasses = computed(() => {
    const base = [
      'inline-flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      'text-gray-700 dark:text-gray-300',
    ];

    if (this.disabled()) {
      base.push('opacity-50 cursor-not-allowed');
    }

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });

  readonly contentClasses = computed(() => {
    const base = ['flex items-center gap-2'];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });
}
