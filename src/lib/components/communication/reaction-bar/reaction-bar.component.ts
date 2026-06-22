import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';

export interface Reaction {
  emoji: string;
  label: string;
  count: number;
  reacted?: boolean;
}

@Component({
  selector: 'ui-reaction-bar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './reaction-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiReactionBarComponent {
  readonly reactions = input<Reaction[]>([]);
  readonly showCounts = input<boolean>(true);
  readonly showAddButton = input<boolean>(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly reacted = output<Reaction>();
  readonly addReaction = output<void>();

  readonly showPicker = signal<boolean>(false);

  readonly plusIcon = Plus;

  readonly buttonSize = computed(() => {
    const map: Record<'sm' | 'md' | 'lg', string> = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };
    return map[this.size()];
  });
}
