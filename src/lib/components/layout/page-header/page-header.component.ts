import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

export interface PageBreadcrumb {
  label: string;
  url?: string;
  icon?: LucideIconData;
}

@Component({
  selector: 'ui-page-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPageHeaderComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string | undefined>(undefined);
  readonly breadcrumbs = input<PageBreadcrumb[]>([]);
  readonly sticky = input<boolean>(false);
}
