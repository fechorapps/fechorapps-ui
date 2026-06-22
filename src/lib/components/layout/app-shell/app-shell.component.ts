import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';

@Component({
  selector: 'ui-app-shell',
  standalone: true,
  imports: [],
  templateUrl: './app-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAppShellComponent {
  readonly sidebarCollapsed = model<boolean>(false);
  readonly sidebarWidth = input<string>('260px');
  readonly sidebarCollapsedWidth = input<string>('64px');
  readonly showHeader = input<boolean>(true);
  readonly headerHeight = input<string>('64px');
}
