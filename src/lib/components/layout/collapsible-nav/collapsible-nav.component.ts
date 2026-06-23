import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { LucideAngularModule, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-angular';

export interface NavItem {
  id: string;
  label: string;
  icon?: unknown;
  route?: string;
  badge?: string | number;
  children?: NavItem[];
  section?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-collapsible-nav',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './collapsible-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCollapsibleNavComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly chevronDownIcon = ChevronDown;
  protected readonly chevronRightIcon = ChevronRight;
  protected readonly collapseIcon = PanelLeftClose;
  protected readonly expandIcon = PanelLeftOpen;

  // =========================================================================
  // INPUTS / MODEL
  // =========================================================================

  readonly items = input.required<NavItem[]>();
  readonly collapsed = model<boolean>(false);
  readonly activeRoute = input<string>('');
  readonly width = input<string>('260px');
  readonly collapsedWidth = input<string>('64px');
  readonly showHeader = input<boolean>(true);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  readonly itemClicked = output<NavItem>();
  readonly collapsedChange = output<boolean>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly expandedIds = signal<Set<string>>(new Set());

  // =========================================================================
  // COMPUTED
  // =========================================================================

  readonly currentWidth = computed(() =>
    this.collapsed() ? this.collapsedWidth() : this.width()
  );

  readonly groupedItems = computed(() => {
    const groups: { section: string | null; items: NavItem[] }[] = [];
    let currentSection: string | null = null;
    let current: NavItem[] = [];
    for (const item of this.items()) {
      if (item.section !== currentSection) {
        if (current.length) groups.push({ section: currentSection, items: current });
        currentSection = item.section ?? null;
        current = [];
      }
      current.push(item);
    }
    if (current.length) groups.push({ section: currentSection, items: current });
    return groups;
  });

  // =========================================================================
  // METHODS
  // =========================================================================

  isActive(item: NavItem): boolean {
    return !!item.route && this.activeRoute() === item.route;
  }

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  toggleExpand(id: string): void {
    this.expandedIds.update(s => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  onItemClick(item: NavItem): void {
    if (item.disabled) return;
    if (item.children?.length) {
      this.toggleExpand(item.id);
      return;
    }
    this.itemClicked.emit(item);
  }

  toggleCollapse(): void {
    const next = !this.collapsed();
    this.collapsed.set(next);
    this.collapsedChange.emit(next);
  }
}
