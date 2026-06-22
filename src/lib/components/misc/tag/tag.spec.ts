import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTagComponent } from './tag.component';

describe('UiTagComponent', () => {
  let fixture: ComponentFixture<UiTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTagComponent] });
    fixture = TestBed.createComponent(UiTagComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays the value text', () => {
    fixture.componentRef.setInput('value', 'New');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('New');
  });

  it('applies primary severity classes by default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.tagClasses()).toContain('bg-primary-100');
    expect(fixture.componentInstance.tagClasses()).toContain('text-primary-700');
  });

  it('applies success severity classes', () => {
    fixture.componentRef.setInput('severity', 'success');
    fixture.detectChanges();
    expect(fixture.componentInstance.tagClasses()).toContain('bg-green-100');
    expect(fixture.componentInstance.tagClasses()).toContain('text-green-700');
  });

  it('applies danger severity classes', () => {
    fixture.componentRef.setInput('severity', 'danger');
    fixture.detectChanges();
    expect(fixture.componentInstance.tagClasses()).toContain('bg-red-100');
    expect(fixture.componentInstance.tagClasses()).toContain('text-red-700');
  });

  it('applies warn severity classes', () => {
    fixture.componentRef.setInput('severity', 'warn');
    fixture.detectChanges();
    expect(fixture.componentInstance.tagClasses()).toContain('bg-yellow-100');
    expect(fixture.componentInstance.tagClasses()).toContain('text-yellow-700');
  });

  it('applies rounded-full class when rounded is true', () => {
    fixture.componentRef.setInput('rounded', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.tagClasses()).toContain('rounded-full');
  });

  it('applies rounded class (not full) when rounded is false', () => {
    fixture.componentRef.setInput('rounded', false);
    fixture.detectChanges();
    const classes = fixture.componentInstance.tagClasses();
    expect(classes).toContain('rounded');
    expect(classes).not.toContain('rounded-full');
  });

  it('applies styleClass to tag', () => {
    fixture.componentRef.setInput('styleClass', 'uppercase tracking-wide');
    fixture.detectChanges();
    expect(fixture.componentInstance.tagClasses()).toContain('uppercase');
    expect(fixture.componentInstance.tagClasses()).toContain('tracking-wide');
  });
});
