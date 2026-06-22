import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiEmptyStateComponent } from './empty-state.component';

describe('UiEmptyStateComponent', () => {
  let fixture: ComponentFixture<UiEmptyStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiEmptyStateComponent] });
    fixture = TestBed.createComponent(UiEmptyStateComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays the default title', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No data found');
  });

  it('displays a custom title', () => {
    fixture.componentRef.setInput('title', 'Nothing here yet');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nothing here yet');
  });

  it('displays description when provided', () => {
    fixture.componentRef.setInput('description', 'Try adding some items.');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Try adding some items.');
  });

  it('does not render description when not provided', () => {
    fixture.detectChanges();
    // description defaults to undefined; no extra text beyond title/action
    expect(fixture.nativeElement.textContent).not.toContain('undefined');
  });

  it('shows action button when actionLabel is provided', () => {
    fixture.componentRef.setInput('actionLabel', 'Add Item');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Add Item');
  });

  it('emits actionClick when action button is clicked', () => {
    fixture.componentRef.setInput('actionLabel', 'Add Item');
    fixture.detectChanges();

    const spy = jasmine.createSpy('actionClick');
    fixture.componentInstance.actionClick.subscribe(spy);

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('applies size class sm for small variant', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(fixture.componentInstance.iconSizeClass()).toBe('size-10');
  });

  it('applies size class lg for large variant', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.componentInstance.iconSizeClass()).toBe('size-16');
  });

  it('applies size class md for default variant', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.iconSizeClass()).toBe('size-12');
  });
});
