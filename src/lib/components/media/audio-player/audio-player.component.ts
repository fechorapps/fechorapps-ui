import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  viewChild,
  ElementRef,
} from '@angular/core';
import { LucideAngularModule, Play, Pause, Volume2, VolumeX, Music } from 'lucide-angular';

@Component({
  selector: 'ui-audio-player',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './audio-player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAudioPlayerComponent {
  readonly src = input<string>('');
  readonly title = input<string>('Audio');
  readonly artist = input<string | undefined>(undefined);
  readonly coverImage = input<string | undefined>(undefined);
  readonly autoplay = input<boolean>(false);

  readonly played = output<void>();
  readonly paused = output<void>();
  readonly ended = output<void>();

  readonly isPlaying = signal<boolean>(false);
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(0);
  readonly volume = signal<number>(1);
  readonly isMuted = signal<boolean>(false);

  readonly audioRef = viewChild<ElementRef<HTMLAudioElement>>('audioEl');

  readonly playIcon = Play;
  readonly pauseIcon = Pause;
  readonly volumeIcon = Volume2;
  readonly muteIcon = VolumeX;
  readonly musicIcon = Music;

  readonly progress = computed(() =>
    this.duration() ? (this.currentTime() / this.duration()) * 100 : 0,
  );

  togglePlay(): void {
    const a = this.audioRef()?.nativeElement;
    if (!a) return;
    if (this.isPlaying()) {
      a.pause();
      this.paused.emit();
    } else {
      a.play();
      this.played.emit();
    }
    this.isPlaying.set(!this.isPlaying());
  }

  toggleMute(): void {
    const a = this.audioRef()?.nativeElement;
    if (!a) return;
    a.muted = !a.muted;
    this.isMuted.set(a.muted);
  }

  seek(e: Event): void {
    const val = Number((e.target as HTMLInputElement).value);
    const a = this.audioRef()?.nativeElement;
    if (a) a.currentTime = val;
    this.currentTime.set(val);
  }

  seekByClick(e: MouseEvent): void {
    const bar = e.currentTarget as HTMLElement;
    const pct = e.offsetX / bar.offsetWidth;
    const audio = this.audioRef()?.nativeElement;
    if (audio && this.duration()) {
      audio.currentTime = pct * this.duration();
      this.currentTime.set(audio.currentTime);
    }
  }

  onTimeUpdate(): void {
    const a = this.audioRef()?.nativeElement;
    if (a) {
      this.currentTime.set(a.currentTime);
      this.duration.set(a.duration || 0);
    }
  }

  onEnded(): void {
    this.isPlaying.set(false);
    this.ended.emit();
  }

  formatTime(s: number): string {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }
}
