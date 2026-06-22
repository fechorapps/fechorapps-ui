import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSkeletonComponent } from './skeleton.component';

describe('UiSkeletonComponent', () => {
  let fixture: ComponentFixture<UiSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSkeletonComponent] });
    fixture = TestBed.createComponent(UiSkeletonComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies pulse animation class by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('animate-pulse');
  });

  it('does not apply pulse class when animation is none', () => {
    fixture.componentRef.setInput('animation', 'none');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).not.toContain('animate-pulse');
  });

  it('applies rounded-full for circle shape', () => {
    fixture.componentRef.setInput('shape', 'circle');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('rounded-full');
  });

  it('applies rounded class for rectangle shape by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('rounded');
  });

  it('applies rounded-xl for rounded shape', () => {
    fixture.componentRef.setInput('shape', 'rounded');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('rounded-xl');
  });

  it('does not apply rounded class for square shape', () => {
    fixture.componentRef.setInput('shape', 'square');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).not.toContain('rounded-full');
    expect(fixture.componentInstance.containerClasses()).not.toContain('rounded-xl');
  });

  it('uses size for width and height when shape is circle', () => {
    fixture.componentRef.setInput('shape', 'circle');
    fixture.componentRef.setInput('size', '3rem');
    fixture.detectChanges();
    const styles = fixture.componentInstance.containerStyles();
    expect(styles['width']).toBe('3rem');
    expect(styles['height']).toBe('3rem');
  });

  it('uses width and height inputs for rectangle shape', () => {
    fixture.componentRef.setInput('width', '200px');
    fixture.componentRef.setInput('height', '20px');
    fixture.detectChanges();
    const styles = fixture.componentInstance.containerStyles();
    expect(styles['width']).toBe('200px');
    expect(styles['height']).toBe('20px');
  });

  it('applies custom borderRadius via containerStyles', () => {
    fixture.componentRef.setInput('borderRadius', '8px');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerStyles()['border-radius']).toBe('8px');
  });
});
