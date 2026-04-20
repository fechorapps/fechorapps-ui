import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  contentChildren,
  AfterContentInit,
  computed,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiTabPanelComponent } from './tab-panel.component';
import { LucideAngularModule } from 'lucide-angular';

export interface TabChangeEvent {
  index: number;
  tab: UiTabPanelComponent;
}

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [NgTemplateOutlet, LucideAngularModule],
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTabsComponent implements AfterContentInit {
  // Inputs
  readonly activeIndex = input<number>(0);
  readonly styleClass = input<string>('');

  // Outputs
  readonly onChange = output<TabChangeEvent>();
  readonly activeIndexChange = output<number>();

  // Content children
  readonly panels = contentChildren(UiTabPanelComponent);

  // State
  readonly selectedIndex = signal<number>(0);

  ngAfterContentInit(): void {
    this.selectedIndex.set(this.activeIndex());
  }

  selectTab(index: number): void {
    const panels = this.panels();
    const panel = panels[index];
    if (!panel || panel.disabled()) return;

    this.selectedIndex.set(index);
    this.activeIndexChange.emit(index);
    this.onChange.emit({ index, tab: panel });
  }

  readonly containerClasses = computed(() => {
    const base = [''];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });
}
