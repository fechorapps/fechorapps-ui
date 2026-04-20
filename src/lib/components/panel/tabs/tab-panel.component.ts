import {
  Component,
  ChangeDetectionStrategy,
  input,
  TemplateRef,
  ViewChild,
  viewChild,
} from '@angular/core';
import { LucideIconData } from 'lucide-angular';

@Component({
  selector: 'ui-tab-panel',
  standalone: true,
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTabPanelComponent {
  // Inputs
  readonly header = input<string>('');
  readonly leftIcon = input<LucideIconData | null>(null);
  readonly rightIcon = input<LucideIconData | null>(null);
  readonly disabled = input<boolean>(false);
  readonly closable = input<boolean>(false);
  readonly headerStyleClass = input<string>('');

  // Template reference
  readonly contentTemplate = viewChild.required<TemplateRef<unknown>>('content');
}
