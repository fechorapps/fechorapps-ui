import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiToastComponent, ToastMessage } from './toast.component';

describe('UiToastComponent', () => {
  let fixture: ComponentFixture<UiToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiToastComponent] });
    fixture = TestBed.createComponent(UiToastComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders the container element', () => {
    fixture.detectChanges();
    // Container is always present (no @if wrapper)
    const container = fixture.nativeElement.querySelector('.fixed');
    expect(container).toBeTruthy();
  });

  it('displays a toast message when messages are provided', () => {
    const messages: ToastMessage[] = [
      { id: '1', severity: 'success', summary: 'Saved!', detail: 'Your changes were saved.' },
    ];
    fixture.componentRef.setInput('messages', messages);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Saved!');
    expect(fixture.nativeElement.textContent).toContain('Your changes were saved.');
  });

  it('displays multiple toast messages', () => {
    const messages: ToastMessage[] = [
      { id: '1', severity: 'success', summary: 'First message' },
      { id: '2', severity: 'error', summary: 'Second message' },
    ];
    fixture.componentRef.setInput('messages', messages);
    fixture.detectChanges();
    const alerts = fixture.nativeElement.querySelectorAll('[role="alert"]');
    expect(alerts.length).toBe(2);
  });

  it('renders no alerts when messages is empty', () => {
    fixture.componentRef.setInput('messages', []);
    fixture.detectChanges();
    const alerts = fixture.nativeElement.querySelectorAll('[role="alert"]');
    expect(alerts.length).toBe(0);
  });

  it('applies top-right position classes by default', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.fixed');
    expect(container.classList.contains('top-0')).toBeTrue();
    expect(container.classList.contains('right-0')).toBeTrue();
  });

  it('applies bottom-left position classes when position is bottom-left', () => {
    fixture.componentRef.setInput('position', 'bottom-left');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.fixed');
    expect(container.classList.contains('bottom-0')).toBeTrue();
    expect(container.classList.contains('left-0')).toBeTrue();
  });

  it('shows close button for closable messages', () => {
    const messages: ToastMessage[] = [
      { id: '1', severity: 'info', summary: 'Info', closable: true },
    ];
    fixture.componentRef.setInput('messages', messages);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button[aria-label="Close"]')).toBeTruthy();
  });
});
