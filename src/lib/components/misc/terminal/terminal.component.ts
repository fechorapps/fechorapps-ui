import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  ElementRef,
  viewChild,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TerminalCommand {
  command: string;
  response?: string;
}

@Component({
  selector: 'ui-terminal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './terminal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTerminalComponent implements AfterViewChecked {
  // Inputs
  readonly welcomeMessage = input<string>('Welcome to Terminal');
  readonly prompt = input<string>('$');
  readonly styleClass = input<string>('');

  // Outputs
  readonly onCommand = output<string>();

  // State
  readonly commands = signal<TerminalCommand[]>([]);
  readonly currentInput = signal<string>('');

  // ViewChild
  readonly terminalContent = viewChild<ElementRef>('terminalContent');
  private shouldScrollToBottom = false;

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.executeCommand();
    }
  }

  executeCommand(): void {
    const command = this.currentInput().trim();
    if (!command) return;

    this.commands.update((cmds) => [...cmds, { command }]);
    this.onCommand.emit(command);
    this.currentInput.set('');
    this.shouldScrollToBottom = true;
  }

  addResponse(response: string): void {
    this.commands.update((cmds) => {
      const updated = [...cmds];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          response,
        };
      }
      return updated;
    });
    this.shouldScrollToBottom = true;
  }

  clear(): void {
    this.commands.set([]);
  }

  private scrollToBottom(): void {
    const content = this.terminalContent();
    if (content) {
      content.nativeElement.scrollTop = content.nativeElement.scrollHeight;
    }
  }

  readonly containerClasses = computed(() => {
    const base = [
      'flex flex-col',
      'bg-gray-900 text-green-400',
      'font-mono text-sm',
      'rounded-lg overflow-hidden',
      'border border-gray-700',
    ];

    if (this.styleClass()) {
      base.push(this.styleClass());
    }

    return base.join(' ');
  });
}
