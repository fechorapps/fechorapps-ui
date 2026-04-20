import {
  Component,
  ChangeDetectionStrategy,
  input,
  TemplateRef,
  contentChild,
} from '@angular/core';

@Component({
  selector: 'ui-accordion-tab',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAccordionTabComponent {
  // Inputs
  readonly header = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly headerStyleClass = input<string>('');
  readonly contentStyleClass = input<string>('');

  // Content projection for custom header
  readonly headerTemplate = contentChild<TemplateRef<unknown>>('header');
}
