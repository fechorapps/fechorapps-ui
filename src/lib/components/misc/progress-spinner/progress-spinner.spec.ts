import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiProgressSpinnerComponent } from './progress-spinner.component';

describe('UiProgressSpinnerComponent', () => {
  let fixture: ComponentFixture<UiProgressSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiProgressSpinnerComponent] });
    fixture = TestBed.createComponent(UiProgressSpinnerComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies medium size classes by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.sizeClasses()).toBe('w-12 h-12');
  });

  it('applies small size classes when size is small', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    expect(fixture.componentInstance.sizeClasses()).toBe('w-8 h-8');
  });

  it('applies large size classes when size is large', () => {
    fixture.componentRef.setInput('size', 'large');
    fixture.detectChanges();
    expect(fixture.componentInstance.sizeClasses()).toBe('w-16 h-16');
  });

  it('includes size classes in containerClasses', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('w-12 h-12');
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'text-blue-500');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('text-blue-500');
  });
});
