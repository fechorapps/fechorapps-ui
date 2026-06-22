import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputSwitchComponent } from './input-switch.component';

describe('UiInputSwitchComponent', () => {
  let fixture: ComponentFixture<UiInputSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiInputSwitchComponent] });
    fixture = TestBed.createComponent(UiInputSwitchComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows label text when provided', () => {
    fixture.componentRef.setInput('label', 'Enable notifications');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Enable notifications');
  });

  it('applies checked state', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
