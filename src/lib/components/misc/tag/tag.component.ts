import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export type TagSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'contrast';

@Component({
  selector: 'ui-tag',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTagComponent {
  // Inputs
  readonly value = input<string>('');
  readonly severity = input<TagSeverity>('primary');
  readonly icon = input<LucideIconData | null>(null);
  readonly rounded = input<boolean>(false);
  readonly styleClass = input<string>('');

  // Computed
  readonly tagClasses = computed(() => {
    const severity = this.severity();
    const base = [
      'inline-flex',
      'items-center',
      'gap-1',
      'px-2.5',
      'py-1',
      'text-xs',
      'font-semibold',
    ];

    if (this.rounded()) {
      base.push('rounded-full');
    } else {
      base.push('rounded');
    }

    const severityClasses: Record<TagSeverity, string[]> = {
      primary: [
        'bg-primary-100',
        'dark:bg-primary-900',
        'text-primary-700',
        'dark:text-primary-300',
      ],
      secondary: ['bg-gray-100', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300'],
      success: ['bg-green-100', 'dark:bg-green-900', 'text-green-700', 'dark:text-green-300'],
      info: ['bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300'],
      warn: ['bg-yellow-100', 'dark:bg-yellow-900', 'text-yellow-700', 'dark:text-yellow-300'],
      danger: ['bg-red-100', 'dark:bg-red-900', 'text-red-700', 'dark:text-red-300'],
      contrast: ['bg-gray-900', 'dark:bg-gray-100', 'text-white', 'dark:text-gray-900'],
    };

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return [...base, ...severityClasses[severity]].join(' ');
  });
}
