import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LucideAngularModule, Heart } from 'lucide-angular';

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: Date;
  likes?: number;
  replies?: Comment[];
  liked?: boolean;
}

@Component({
  selector: 'ui-comment-thread',
  standalone: true,
  imports: [LucideAngularModule, NgTemplateOutlet],
  templateUrl: './comment-thread.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCommentThreadComponent {
  readonly comments = input<Comment[]>([]);
  readonly maxDepth = input<number>(2);
  readonly showReplyInput = input<boolean>(true);
  readonly currentUser = input<string>('You');

  readonly replied = output<{ parentId: string; content: string }>();
  readonly liked = output<string>();
  readonly submitted = output<string>();

  readonly replyingToId = signal<string | null>(null);
  readonly replyText = signal<string>('');
  readonly newComment = signal<string>('');

  readonly heartIcon = Heart;

  toggleReply(id: string): void {
    this.replyingToId.update((current) => (current === id ? null : id));
    this.replyText.set('');
  }

  submitReply(parentId: string): void {
    const text = this.replyText().trim();
    if (!text) return;
    this.replied.emit({ parentId, content: text });
    this.replyText.set('');
    this.replyingToId.set(null);
  }

  submitComment(): void {
    const text = this.newComment().trim();
    if (!text) return;
    this.submitted.emit(text);
    this.newComment.set('');
  }

  formatRelativeTime(d: Date): string {
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}
