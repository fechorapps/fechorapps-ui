import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMessageComponent } from './message.component';

describe('UiMessageComponent', () => {
  let fixture: ComponentFixture<UiMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMessageComponent] });
    fixture = TestBed.createComponent(UiMessageComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows message text', () => {
    fixture.componentRef.setInput('text', 'Operation completed successfully');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Operation completed successfully');
  });

  it('defaults severity to info', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.severity()).toBe('info');
  });

  it('applies info severity classes', () => {
    fixture.componentRef.setInput('severity', 'info');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('bg-blue-50');
  });

  it('applies success severity classes', () => {
    fixture.componentRef.setInput('severity', 'success');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('bg-green-50');
  });

  it('applies error severity classes', () => {
    fixture.componentRef.setInput('severity', 'error');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('bg-red-50');
  });

  it('applies warn severity classes', () => {
    fixture.componentRef.setInput('severity', 'warn');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('bg-yellow-50');
  });

  it('emits onClose when close() is called', () => {
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    let closed = false;
    fixture.componentInstance.onClose.subscribe(() => { closed = true; });
    fixture.componentInstance.close();
    expect(closed).toBe(true);
  });

  it('appends styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'my-message');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('my-message');
  });
});
