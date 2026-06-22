import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiVideoPlayerComponent } from './video-player.component';

describe('UiVideoPlayerComponent', () => {
  let fixture: ComponentFixture<UiVideoPlayerComponent>;
  let component: UiVideoPlayerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiVideoPlayerComponent] });
    fixture = TestBed.createComponent(UiVideoPlayerComponent);
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

  it('volume starts at 1', () => {
    fixture.detectChanges();
    expect(component.volume()).toBe(1);
  });

  it('formatTime formats 0 as 0:00', () => {
    expect(component.formatTime(0)).toBe('0:00');
  });

  it('formatTime formats 90 seconds as 1:30', () => {
    expect(component.formatTime(90)).toBe('1:30');
  });

  it('formatTime formats 65 seconds as 1:05', () => {
    expect(component.formatTime(65)).toBe('1:05');
  });

  it('formatTime formats 3600 as 60:00', () => {
    expect(component.formatTime(3600)).toBe('60:00');
  });

  it('onEnded sets isPlaying to false', () => {
    component.isPlaying.set(true);
    component.onEnded();
    expect(component.isPlaying()).toBe(false);
  });
});
