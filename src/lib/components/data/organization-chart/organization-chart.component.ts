import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  model,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ChevronDown, ChevronUp, LucideAngularModule } from 'lucide-angular';

/**
 * Organization chart node interface
 */
export interface OrgChartNode {
  label: string;
  type?: string;
  styleClass?: string;
  expanded?: boolean;
  data?: unknown;
  children?: OrgChartNode[];
  [key: string]: unknown;
}

/**
 * Node select event
 */
export interface OrgChartNodeSelectEvent {
  originalEvent: Event;
  node: OrgChartNode;
}

/**
 * Node collapse/expand event
 */
export interface OrgChartNodeToggleEvent {
  originalEvent: Event;
  node: OrgChartNode;
}

/**
 * UiOrganizationChart Component
 *
 * A component for displaying hierarchical organizational data.
 *
 * @example
 * ```html
 * <ui-organization-chart [value]="orgData">
 *   <ng-template #node let-node>
 *     <div class="p-2">{{ node.label }}</div>
 *   </ng-template>
 * </ui-organization-chart>
 * ```
 */
@Component({
  selector: 'ui-organization-chart',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet],
  templateUrl: './organization-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class UiOrganizationChartComponent {
  // =========================================================================
  // ICONS
  // =========================================================================

  protected readonly expandIcon = ChevronDown;
  protected readonly collapseIcon = ChevronUp;

  // =========================================================================
  // CONTENT CHILDREN
  // =========================================================================

  readonly nodeTemplate = contentChild<TemplateRef<unknown>>('node');

  // =========================================================================
  // INPUTS
  // =========================================================================

  /** Root node of the organization chart */
  readonly value = input<OrgChartNode | null>(null);

  /** Selection mode */
  readonly selectionMode = input<'single' | 'multiple' | null>(null);

  /** Selected node(s) */
  readonly selection = model<OrgChartNode | OrgChartNode[] | null>(null);

  /** Preserve expanded state */
  readonly preserveSpace = input<boolean>(true);

  // =========================================================================
  // OUTPUTS
  // =========================================================================

  /** Emitted when a node is selected */
  readonly onNodeSelect = output<OrgChartNodeSelectEvent>();

  /** Emitted when a node is unselected */
  readonly onNodeUnselect = output<OrgChartNodeSelectEvent>();

  /** Emitted when a node is expanded */
  readonly onNodeExpand = output<OrgChartNodeToggleEvent>();

  /** Emitted when a node is collapsed */
  readonly onNodeCollapse = output<OrgChartNodeToggleEvent>();

  // =========================================================================
  // STATE
  // =========================================================================

  readonly collapsedNodes = signal<Set<string>>(new Set());

  // =========================================================================
  // COMPUTED PROPERTIES
  // =========================================================================

  readonly hasValue = computed(() => this.value() !== null);

  // =========================================================================
  // METHODS - NODE HELPERS
  // =========================================================================

  isExpanded(node: OrgChartNode): boolean {
    const nodeKey = this.getNodeKey(node);
    if (node.expanded === false) return false;
    return !this.collapsedNodes().has(nodeKey);
  }

  hasChildren(node: OrgChartNode): boolean {
    return node.children !== undefined && node.children.length > 0;
  }

  private getNodeKey(node: OrgChartNode): string {
    return JSON.stringify({ label: node.label, type: node.type });
  }

  // =========================================================================
  // METHODS - SELECTION
  // =========================================================================

  isSelected(node: OrgChartNode): boolean {
    const sel = this.selection();
    if (!sel) return false;

    if (Array.isArray(sel)) {
      return sel.some((s) => this.getNodeKey(s) === this.getNodeKey(node));
    }

    return this.getNodeKey(sel) === this.getNodeKey(node);
  }

  onNodeClick(event: Event, node: OrgChartNode): void {
    if (!this.selectionMode()) return;

    if (this.selectionMode() === 'single') {
      if (this.isSelected(node)) {
        this.selection.set(null);
        this.onNodeUnselect.emit({ originalEvent: event, node });
      } else {
        this.selection.set(node);
        this.onNodeSelect.emit({ originalEvent: event, node });
      }
    } else if (this.selectionMode() === 'multiple') {
      const current = (this.selection() as OrgChartNode[]) || [];

      if (this.isSelected(node)) {
        this.selection.set(current.filter((s) => this.getNodeKey(s) !== this.getNodeKey(node)));
        this.onNodeUnselect.emit({ originalEvent: event, node });
      } else {
        this.selection.set([...current, node]);
        this.onNodeSelect.emit({ originalEvent: event, node });
      }
    }
  }

  // =========================================================================
  // METHODS - TOGGLE
  // =========================================================================

  toggleNode(event: Event, node: OrgChartNode): void {
    event.stopPropagation();

    const nodeKey = this.getNodeKey(node);
    const collapsed = new Set(this.collapsedNodes());

    if (collapsed.has(nodeKey)) {
      collapsed.delete(nodeKey);
      this.onNodeExpand.emit({ originalEvent: event, node });
    } else {
      collapsed.add(nodeKey);
      this.onNodeCollapse.emit({ originalEvent: event, node });
    }

    this.collapsedNodes.set(collapsed);
  }

  // =========================================================================
  // COMPUTED STYLES
  // =========================================================================

  getNodeClasses(node: OrgChartNode): string {
    const classes = ['inline-flex', 'flex-col', 'items-center', 'relative'];

    if (node.styleClass) {
      classes.push(node.styleClass);
    }

    return classes.join(' ');
  }

  getNodeContentClasses(node: OrgChartNode): string {
    const classes = [
      'px-4',
      'py-2',
      'rounded-lg',
      'border',
      'border-gray-200',
      'dark:border-gray-700',
      'bg-white',
      'dark:bg-gray-800',
      'shadow-sm',
      'transition-all',
      'duration-200',
    ];

    if (this.selectionMode()) {
      classes.push('cursor-pointer', 'hover:shadow-md');

      if (this.isSelected(node)) {
        classes.push('ring-2', 'ring-primary', 'border-primary');
      }
    }

    return classes.join(' ');
  }

  getToggleClasses(): string {
    return [
      'absolute',
      '-bottom-3',
      'left-1/2',
      '-translate-x-1/2',
      'w-6',
      'h-6',
      'rounded-full',
      'bg-gray-100',
      'dark:bg-gray-700',
      'border',
      'border-gray-300',
      'dark:border-gray-600',
      'flex',
      'items-center',
      'justify-center',
      'cursor-pointer',
      'hover:bg-gray-200',
      'dark:hover:bg-gray-600',
      'transition-colors',
      'z-10',
    ].join(' ');
  }

  // =========================================================================
  // TEMPLATE CONTEXT
  // =========================================================================

  getNodeContext(node: OrgChartNode) {
    return {
      $implicit: node,
      expanded: this.isExpanded(node),
      selected: this.isSelected(node),
      hasChildren: this.hasChildren(node),
    };
  }
}
