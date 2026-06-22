import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { LucideAngularModule, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-angular';

@Component({
  selector: 'ui-video-player',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './video-player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiVideoPlayerComponent {
  readonly src = input<string>('');
  readonly poster = input<string | undefined>(undefined);
  readonly autoplay = input<boolean>(false);
  readonly loop = input<boolean>(false);
  readonly muted = input<boolean>(false);
  readonly controls = input<boolean>(true);

  readonly played = output<void>();
  readonly paused = output<void>();
  readonly ended = output<void>();

  readonly isPlaying = signal<boolean>(false);
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(0);
  readonly volume = signal<number>(1);
  readonly isMuted = signal<boolean>(false);
  readonly isFullscreen = signal<boolean>(false);
  readonly showControls = signal<boolean>(true);

  readonly videoRef = viewChild<ElementRef<HTMLVideoElement>>('videoEl');

  readonly playIcon = Play;
  readonly pauseIcon = Pause;
  readonly volumeIcon = Volume2;
  readonly muteIcon = VolumeX;
  readonly fullscreenIcon = Maximize;

  togglePlay(): void {
    const v = this.videoRef()?.nativeElement;
    if (!v) return;
    if (this.isPlaying()) {
      v.pause();
      this.paused.emit();
    } else {
      v.play();
      this.played.emit();
    }
    this.isPlaying.set(!this.isPlaying());
  }

  toggleMute(): void {
    const v = this.videoRef()?.nativeElement;
    if (!v) return;
    v.muted = !v.muted;
    this.isMuted.set(v.muted);
  }

  setVolume(e: Event): void {
    const val = Number((e.target as HTMLInputElement).value);
    const v = this.videoRef()?.nativeElement;
    if (v) v.volume = val;
    this.volume.set(val);
  }

  seek(e: Event): void {
    const val = Number((e.target as HTMLInputElement).value);
    const v = this.videoRef()?.nativeElement;
    if (v) v.currentTime = val;
    this.currentTime.set(val);
  }

  onTimeUpdate(): void {
    const v = this.videoRef()?.nativeElement;
    if (v) {
      this.currentTime.set(v.currentTime);
      this.duration.set(v.duration || 0);
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
