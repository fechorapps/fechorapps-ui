import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAudioPlayerComponent } from './audio-player.component';

describe('UiAudioPlayerComponent', () => {
  let fixture: ComponentFixture<UiAudioPlayerComponent>;
  let component: UiAudioPlayerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiAudioPlayerComponent] });
    fixture = TestBed.createComponent(UiAudioPlayerComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('isPlaying starts as false', () => {
    fixture.detectChanges();
    expect(component.isPlaying()).toBe(false);
  });

  it('progress computed returns 0 when duration is 0', () => {
    fixture.detectChanges();
    expect(component.progress()).toBe(0);
  });

  it('progress computed returns 50 when halfway through', () => {
    fixture.detectChanges();
    component.duration.set(100);
    component.currentTime.set(50);
    expect(component.progress()).toBe(50);
  });

  it('isMuted starts as false', () => {
    fixture.detectChanges();
    expect(component.isMuted()).toBe(false);
  });

  it('currentTime starts at 0', () => {
    fixture.detectChanges();
    expect(component.currentTime()).toBe(0);
  });

  it('duration starts at 0', () => {
    fixture.detectChanges();
    expect(component.duration()).toBe(0);
  });

  it('formatTime formats 90 seconds as 1:30', () => {
    expect(component.formatTime(90)).toBe('1:30');
  });

  it('formatTime formats 0 as 0:00', () => {
    expect(component.formatTime(0)).toBe('0:00');
  });

  it('onEnded sets isPlaying to false', () => {
    component.isPlaying.set(true);
    component.onEnded();
    expect(component.isPlaying()).toBe(false);
  });
});
