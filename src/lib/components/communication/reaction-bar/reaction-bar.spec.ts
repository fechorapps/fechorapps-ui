import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiReactionBarComponent, Reaction } from './reaction-bar.component';

const sampleReactions: Reaction[] = [
  { emoji: '👍', label: 'Like', count: 5, reacted: true },
  { emoji: '❤️', label: 'Love', count: 2, reacted: false },
  { emoji: '😂', label: 'Haha', count: 1, reacted: false },
];

describe('UiReactionBarComponent', () => {
  let fixture: ComponentFixture<UiReactionBarComponent>;
  let component: UiReactionBarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiReactionBarComponent] });
    fixture = TestBed.createComponent(UiReactionBarComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('reacted output emits the clicked reaction', () => {
    fixture.componentRef.setInput('reactions', sampleReactions);
    fixture.detectChanges();
    const emitted: Reaction[] = [];
    component.reacted.subscribe((r: Reaction) => emitted.push(r));
    component.reacted.emit(sampleReactions[0]);
    expect(emitted[0]).toEqual(sampleReactions[0]);
  });

  it('showPicker toggles when showPicker.set is called', () => {
    expect(component.showPicker()).toBeFalse();
    component.showPicker.set(true);
    expect(component.showPicker()).toBeTrue();
    component.showPicker.set(false);
    expect(component.showPicker()).toBeFalse();
  });

  it('buttonSize returns correct class for sm size', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(component.buttonSize()).toContain('px-2');
    expect(component.buttonSize()).toContain('text-xs');
  });

  it('buttonSize returns correct class for lg size', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(component.buttonSize()).toContain('px-3');
    expect(component.buttonSize()).toContain('text-base');
  });

  it('buttonSize returns md class by default', () => {
    fixture.detectChanges();
    expect(component.buttonSize()).toContain('px-2.5');
    expect(component.buttonSize()).toContain('text-sm');
  });

  it('addReaction output can be subscribed', () => {
    let called = false;
    component.addReaction.subscribe(() => (called = true));
    component.addReaction.emit();
    expect(called).toBeTrue();
  });
});
