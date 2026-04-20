import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { UiMessageComponent, MessageSeverity } from '../message';

export interface Message {
  severity: MessageSeverity;
  summary?: string;
  detail?: string;
  id?: string;
  life?: number;
  closable?: boolean;
  icon?: boolean;
}

export interface MessageCloseEvent {
  message: Message;
  index: number;
}

@Component({
  selector: 'ui-messages',
  standalone: true,
  imports: [UiMessageComponent],
  templateUrl: './messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMessagesComponent implements OnInit, OnDestroy {
  // Inputs
  readonly value = input<Message[]>([]);
  readonly closable = input<boolean>(true);
  readonly showIcon = input<boolean>(true);
  readonly life = input<number>(0); // 0 = no auto-close
  readonly styleClass = input<string>('');

  // Outputs
  readonly onClose = output<MessageCloseEvent>();
  readonly valueChange = output<Message[]>();

  // State
  readonly internalMessages = signal<Message[]>([]);
  private timers: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private idCounter = 0;

  // Computed
  readonly containerClasses = computed(() => {
    const base = ['space-y-2'];
    if (this.styleClass()) {
      base.push(this.styleClass());
    }
    return base.join(' ');
  });

  readonly messages = computed(() => {
    const inputValue = this.value();
    const internal = this.internalMessages();
    return inputValue.length > 0 ? inputValue : internal;
  });

  ngOnInit(): void {
    this.setupAutoClose();
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }

  private setupAutoClose(): void {
    const globalLife = this.life();
    if (globalLife <= 0) return;

    this.messages().forEach((msg, index) => {
      const life = msg.life ?? globalLife;
      if (life > 0) {
        this.scheduleClose(msg, index, life);
      }
    });
  }

  private scheduleClose(message: Message, index: number, life: number): void {
    const id = message.id ?? `msg-${this.idCounter++}`;
    const timer = setTimeout(() => {
      this.closeMessage(index);
      this.timers.delete(id);
    }, life);
    this.timers.set(id, timer);
  }

  private clearAllTimers(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

  closeMessage(index: number): void {
    const currentMessages = this.messages();
    const message = currentMessages[index];
    if (!message) return;

    const newMessages = currentMessages.filter((_, i) => i !== index);

    if (this.value().length > 0) {
      this.valueChange.emit(newMessages);
    } else {
      this.internalMessages.set(newMessages);
    }

    this.onClose.emit({ message, index });
  }

  /**
   * Add a message programmatically
   */
  add(message: Message): void {
    const current = [...this.internalMessages()];
    const newMessage = { ...message, id: message.id ?? `msg-${this.idCounter++}` };
    current.push(newMessage);
    this.internalMessages.set(current);

    const life = message.life ?? this.life();
    if (life > 0) {
      this.scheduleClose(newMessage, current.length - 1, life);
    }
  }

  /**
   * Add multiple messages
   */
  addAll(messages: Message[]): void {
    messages.forEach((msg) => this.add(msg));
  }

  /**
   * Clear all messages
   */
  clear(): void {
    this.clearAllTimers();
    this.internalMessages.set([]);
    this.valueChange.emit([]);
  }

  getMessageText(message: Message): string {
    const parts: string[] = [];
    if (message.summary) {
      parts.push(message.summary);
    }
    if (message.detail) {
      parts.push(message.detail);
    }
    return parts.join(' - ');
  }
}
