import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonComponent } from './button.component';

describe('UiButtonComponent', () => {
  let fixture: ComponentFixture<UiButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiButtonComponent] });
    fixture = TestBed.createComponent(UiButtonComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies primary variant classes by default', () => {
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('bg-primary');
  });

  it('applies danger variant classes when variant is danger', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('bg-destructive');
  });

  it('applies outline variant classes when variant is outline', () => {
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('border');
    expect(btn.className).toContain('bg-transparent');
  });

  it('adds disabled classes and does not emit clicked when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('opacity-50');
    expect(btn.className).toContain('cursor-not-allowed');

    const spy = jasmine.createSpy('clicked');
    fixture.componentInstance.clicked.subscribe(spy);
    btn.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('adds disabled classes and does not emit clicked when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('opacity-50');

    const spy = jasmine.createSpy('clicked');
    fixture.componentInstance.clicked.subscribe(spy);
    btn.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('emits clicked event when button is clicked and not disabled', () => {
    fixture.detectChanges();
    const spy = jasmine.createSpy('clicked');
    fixture.componentInstance.clicked.subscribe(spy);

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('applies w-full class when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('w-full');
  });

  it('applies correct size classes for sm size', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('px-3');
    expect(btn.className).toContain('py-1.5');
  });

  it('applies correct size classes for lg size', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('px-6');
    expect(btn.className).toContain('py-2.5');
  });

  it('applies icon-only padding when iconOnly is true', () => {
    fixture.componentRef.setInput('iconOnly', true);
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('p-2');
    expect(btn.className).not.toContain('px-4');
  });
});
