import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';

export type AvatarSize = 'small' | 'normal' | 'large' | 'xlarge';
export type AvatarShape = 'circle' | 'square';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAvatarComponent {
  // Inputs
  readonly image = input<string>('');
  readonly label = input<string>('');
  readonly icon = input<boolean>(false);
  readonly size = input<AvatarSize>('normal');
  readonly shape = input<AvatarShape>('circle');
  readonly styleClass = input<string>('');

  // Icons
  readonly userIcon = User;

  // Computed
  readonly containerClasses = computed(() => {
    const size = this.size();
    const shape = this.shape();
    const base = [
      'inline-flex',
      'items-center',
      'justify-center',
      'overflow-hidden',
      'bg-primary/10',
      'text-primary',
      'font-semibold',
    ];

    const sizeClasses: Record<AvatarSize, string[]> = {
      small: ['w-8', 'h-8', 'text-xs'],
      normal: ['w-10', 'h-10', 'text-sm'],
      large: ['w-12', 'h-12', 'text-base'],
      xlarge: ['w-16', 'h-16', 'text-lg'],
    };

    const shapeClasses: Record<AvatarShape, string> = {
      circle: 'rounded-full',
      square: 'rounded-lg',
    };

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return [...base, ...sizeClasses[size], shapeClasses[shape]].join(' ');
  });

  readonly iconSize = computed(() => {
    const sizeMap: Record<AvatarSize, number> = {
      small: 16,
      normal: 20,
      large: 24,
      xlarge: 32,
    };
    return sizeMap[this.size()];
  });

  readonly initials = computed(() => {
    const label = this.label();
    if (!label) return '';

    const parts = label.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  readonly displayType = computed<'image' | 'label' | 'icon'>(() => {
    if (this.image()) return 'image';
    if (this.label()) return 'label';
    return 'icon';
  });
}
