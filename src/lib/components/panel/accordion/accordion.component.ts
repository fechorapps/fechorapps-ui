import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  contentChildren,
  AfterContentInit,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiAccordionTabComponent } from './accordion-tab.component';

export interface AccordionTabChangeEvent {
  index: number;
  tab: UiAccordionTabComponent;
}

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAccordionComponent implements AfterContentInit {
  // Inputs
  readonly multiple = input<boolean>(false);
  readonly activeIndex = input<number | number[] | null>(null);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onOpen = output<AccordionTabChangeEvent>();
  readonly onClose = output<AccordionTabChangeEvent>();
  readonly activeIndexChange = output<number | number[]>();

  // Content children
  readonly tabs = contentChildren(UiAccordionTabComponent);

  // State
  readonly openTabs = signal<Set<number>>(new Set());

  ngAfterContentInit(): void {
    this.initializeActiveIndex();
  }

  private initializeActiveIndex(): void {
    const active = this.activeIndex();
    if (active === null) return;

    const indices = Array.isArray(active) ? active : [active];
    this.openTabs.set(new Set(indices));
  }

  toggle(index: number): void {
    const tabs = this.tabs();
    const tab = tabs[index];
    if (!tab || tab.disabled()) return;

    const currentOpen = new Set(this.openTabs());
    const isOpen = currentOpen.has(index);

    if (this.multiple()) {
      if (isOpen) {
        currentOpen.delete(index);
        this.onClose.emit({ index, tab });
      } else {
        currentOpen.add(index);
        this.onOpen.emit({ index, tab });
      }
    } else {
      if (isOpen) {
        currentOpen.clear();
        this.onClose.emit({ index, tab });
      } else {
        const previousIndex = currentOpen.values().next().value;
        currentOpen.clear();
        currentOpen.add(index);
        if (previousIndex !== undefined) {
          this.onClose.emit({ index: previousIndex, tab: tabs[previousIndex] });
        }
        this.onOpen.emit({ index, tab });
      }
    }

    this.openTabs.set(currentOpen);
    this.emitActiveIndexChange();
  }

  private emitActiveIndexChange(): void {
    const indices = Array.from(this.openTabs());
    if (this.multiple()) {
      this.activeIndexChange.emit(indices);
    } else {
      this.activeIndexChange.emit(indices[0] ?? -1);
    }
  }

  isOpen(index: number): boolean {
    return this.openTabs().has(index);
  }
}
