import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiBadgeComponent } from './badge.component';

describe('UiBadgeComponent', () => {
  let fixture: ComponentFixture<UiBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiBadgeComponent] });
    fixture = TestBed.createComponent(UiBadgeComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies primary severity classes by default', () => {
    fixture.componentRef.setInput('value', '5');
    fixture.detectChanges();
    expect(fixture.componentInstance.badgeClasses()).toContain('bg-primary/10');
    expect(fixture.componentInstance.badgeClasses()).toContain('text-primary');
  });

  it('applies success severity classes', () => {
    fixture.componentRef.setInput('value', '3');
    fixture.componentRef.setInput('severity', 'success');
    fixture.detectChanges();
    expect(fixture.componentInstance.badgeClasses()).toContain('bg-green-100');
    expect(fixture.componentInstance.badgeClasses()).toContain('text-green-700');
  });

  it('applies danger severity classes', () => {
    fixture.componentRef.setInput('value', '!');
    fixture.componentRef.setInput('severity', 'danger');
    fixture.detectChanges();
    expect(fixture.componentInstance.badgeClasses()).toContain('bg-destructive/10');
    expect(fixture.componentInstance.badgeClasses()).toContain('text-destructive');
  });

  it('applies dot-badge classes (no value)', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.badgeClasses()).toContain('w-2.5');
    expect(fixture.componentInstance.badgeClasses()).toContain('h-2.5');
  });

  it('applies small size classes with a value', () => {
    fixture.componentRef.setInput('value', '1');
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    expect(fixture.componentInstance.badgeClasses()).toContain('min-w-5');
    expect(fixture.componentInstance.badgeClasses()).toContain('h-5');
  });

  it('applies xlarge size classes with a value', () => {
    fixture.componentRef.setInput('value', '99');
    fixture.componentRef.setInput('size', 'xlarge');
    fixture.detectChanges();
    expect(fixture.componentInstance.badgeClasses()).toContain('min-w-8');
    expect(fixture.componentInstance.badgeClasses()).toContain('h-8');
  });

  it('applies styleClass to badge', () => {
    fixture.componentRef.setInput('styleClass', 'shadow');
    fixture.detectChanges();
    expect(fixture.componentInstance.badgeClasses()).toContain('shadow');
  });
});
