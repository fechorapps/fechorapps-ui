import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAvatarComponent } from './avatar.component';

describe('UiAvatarComponent', () => {
  let fixture: ComponentFixture<UiAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiAvatarComponent] });
    fixture = TestBed.createComponent(UiAvatarComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes initials from a two-word label', () => {
    fixture.componentRef.setInput('label', 'John Doe');
    fixture.detectChanges();
    expect(fixture.componentInstance.initials()).toBe('JD');
  });

  it('computes initials as first two chars for a single-word label', () => {
    fixture.componentRef.setInput('label', 'Alice');
    fixture.detectChanges();
    expect(fixture.componentInstance.initials()).toBe('AL');
  });

  it('returns empty initials when label is not set', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.initials()).toBe('');
  });

  it('sets displayType to image when image is provided', () => {
    fixture.componentRef.setInput('image', 'avatar.png');
    fixture.detectChanges();
    expect(fixture.componentInstance.displayType()).toBe('image');
  });

  it('sets displayType to label when only label is provided', () => {
    fixture.componentRef.setInput('label', 'AB');
    fixture.detectChanges();
    expect(fixture.componentInstance.displayType()).toBe('label');
  });

  it('sets displayType to icon when neither image nor label is provided', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.displayType()).toBe('icon');
  });

  it('applies circle shape class by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('rounded-full');
  });

  it('applies square shape class when shape is square', () => {
    fixture.componentRef.setInput('shape', 'square');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('rounded-lg');
  });

  it('applies small size classes when size is small', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('w-8');
    expect(fixture.componentInstance.containerClasses()).toContain('h-8');
  });

  it('applies xlarge size classes when size is xlarge', () => {
    fixture.componentRef.setInput('size', 'xlarge');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('w-16');
    expect(fixture.componentInstance.containerClasses()).toContain('h-16');
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'border-2');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('border-2');
  });
});
