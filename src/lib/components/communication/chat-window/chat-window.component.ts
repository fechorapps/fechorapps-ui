import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from '@angular/core';
import { LucideAngularModule, MessageCircle, Send } from 'lucide-angular';

export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  avatar?: string;
  isOwn?: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

@Component({
  selector: 'ui-chat-window',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './chat-window.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiChatWindowComponent {
  readonly messages = input<ChatMessage[]>([]);
  readonly currentUser = input<string>('me');
  readonly placeholder = input<string>('Type a message...');
  readonly loading = input<boolean>(false);
  readonly title = input<string>('Chat');
  readonly subtitle = input<string | undefined>(undefined);

  readonly messageSent = output<string>();
  readonly typing = output<string>();

  readonly inputValue = signal<string>('');
  typingTimer: ReturnType<typeof setTimeout> | null = null;

  readonly messageCircleIcon = MessageCircle;
  readonly sendIcon = Send;

  readonly sortedMessages = computed(() =>
    [...this.messages()].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    )
  );

  sendMessage(): void {
    const val = this.inputValue().trim();
    if (!val) return;
    this.messageSent.emit(val);
    this.inputValue.set('');
  }

  onInput(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    this.inputValue.set(val);
    this.typing.emit(val);
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.typingTimer = null;
    }, 1000);
  }

  formatTime(d: Date): string {
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  isOwn(msg: ChatMessage): boolean {
    return msg.isOwn === true || msg.sender === this.currentUser();
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
