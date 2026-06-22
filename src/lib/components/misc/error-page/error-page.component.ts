import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { LucideAngularModule, Home, ArrowLeft } from 'lucide-angular';

export type ErrorCode = 404 | 500 | 403 | 503;

@Component({
  selector: 'ui-error-page',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './error-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiErrorPageComponent {
  readonly code = input<ErrorCode>(404);
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly showHomeButton = input<boolean>(true);
  readonly showBackButton = input<boolean>(true);

  readonly homeClicked = output<void>();
  readonly backClicked = output<void>();

  readonly homeIcon = Home;
  readonly arrowLeftIcon = ArrowLeft;

  readonly defaultTitle = computed(() => {
    const titles: Record<number, string> = {
      404: 'Page Not Found',
      500: 'Internal Server Error',
      403: 'Forbidden',
      503: 'Service Unavailable',
    };
    return this.title() ?? titles[this.code()] ?? 'Error';
  });

  readonly defaultDescription = computed(() => {
    const descs: Record<number, string> = {
      404: "The page you're looking for doesn't exist.",
      500: 'Something went wrong on our end.',
      403: "You don't have permission to access this page.",
      503: 'The service is temporarily unavailable.',
    };
    return this.description() ?? descs[this.code()] ?? '';
  });
}
