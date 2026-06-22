import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAlertComponent } from './alert.component';

describe('UiAlertComponent', () => {
  let fixture: ComponentFixture<UiAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiAlertComponent] });
    fixture = TestBed.createComponent(UiAlertComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div');
    expect(el.className).toContain('green');
  });

  it('hides alert when dismissed', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    fixture.componentInstance.dismiss();
    fixture.detectChanges();
    expect(fixture.componentInstance.visible()).toBe(false);
    expect(fixture.nativeElement.querySelector('div')).toBeNull();
  });
});
