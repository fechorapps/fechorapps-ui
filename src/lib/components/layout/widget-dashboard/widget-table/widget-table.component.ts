import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface WidgetTableColumn {
  key: string;
  label: string;
}

export type WidgetTableRow = Record<string, string | number>;

@Component({
  selector: 'ui-widget-table',
  standalone: true,
  imports: [],
  templateUrl: './widget-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiWidgetTableComponent {
  readonly columns = input<WidgetTableColumn[]>([]);
  readonly rows = input<WidgetTableRow[]>([]);
}
