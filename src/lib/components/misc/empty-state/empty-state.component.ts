import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import {
  AlertTriangle,
  FileText,
  Folder,
  Inbox,
  type LucideIconData,
  LucideAngularModule,
  Search,
  Table,
  Users,
} from 'lucide-angular';

/**
 * Preset icon types for common empty states
 */
export type EmptyStateIcon =
  | 'users'
  | 'search'
  | 'folder'
  | 'document'
  | 'inbox'
  | 'data'
  | 'error'
  | 'custom';

/** Icon mapping for empty state presets */
const EMPTY_STATE_ICON_MAP: Record<Exclude<EmptyStateIcon, 'custom'>, LucideIconData> = {
  users: Users,
  search: Search,
  folder: Folder,
  document: FileText,
  inbox: Inbox,
  data: Table,
  error: AlertTriangle,
};

/**
 * UiEmptyState Component
 *
 * A reusable empty state component for displaying "no data found" messages.
 * Supports preset icons, custom icons via ng-content, and optional action buttons.
 *
 * @example
 * ```html
 * <!-- Basic usage with preset icon -->
 * <ui-empty-state
 *   icon="users"
 *   title="No users found"
 *   description="Try adjusting your search or filters"
 * />
 *
 * <!-- With action button -->
 * <ui-empty-state
 *   icon="folder"
 *   title="No files yet"
 *   description="Upload your first file to get started"
 *   actionLabel="Upload File"
 *   (actionClick)="onUpload()"
 * />
 *
 * <!-- With custom icon via lucideIcon input -->
 * <ui-empty-state
 *   [lucideIcon]="myCustomIcon"
 *   title="Custom state"
 * />
 * ```
 */
@Component({
  selector: 'ui-empty-state',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './empty-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiEmptyStateComponent {
  /** Preset icon type */
  readonly icon = input<EmptyStateIcon>('data');

  /** Custom Lucide icon (overrides preset icon) */
  readonly lucideIcon = input<LucideIconData | undefined>(undefined);

  /** Main title/message */
  readonly title = input<string>('No data found');

  /** Optional description text */
  readonly description = input<string | undefined>(undefined);

  /** Optional action button label */
  readonly actionLabel = input<string | undefined>(undefined);

  /** Size variant */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  /** Emits when action button is clicked */
  readonly actionClick = output<void>();

  /** Resolved icon to display */
  readonly resolvedIcon = computed<LucideIconData>(() => {
    const customIcon = this.lucideIcon();
    if (customIcon) return customIcon;

    const iconType = this.icon();
    if (iconType === 'custom') return Table; // fallback
    return EMPTY_STATE_ICON_MAP[iconType];
  });

  /** Icon size class based on size variant */
  readonly iconSizeClass = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'size-10';
      case 'lg':
        return 'size-16';
      default:
        return 'size-12';
    }
  });

  onActionClick(): void {
    this.actionClick.emit();
  }
}
