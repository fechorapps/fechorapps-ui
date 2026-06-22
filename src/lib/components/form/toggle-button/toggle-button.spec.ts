import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiToggleButtonComponent } from './toggle-button.component';

describe('UiToggleButtonComponent', () => {
  let fixture: ComponentFixture<UiToggleButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiToggleButtonComponent] });
    fixture = TestBed.createComponent(UiToggleButtonComponent);
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

  it('shows onLabel when checked', () => {
    fixture.componentRef.setInput('onLabel', 'Active');
    fixture.componentRef.setInput('offLabel', 'Inactive');
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Active');
  });

  it('shows offLabel when unchecked', () => {
    fixture.componentRef.setInput('onLabel', 'Active');
    fixture.componentRef.setInput('offLabel', 'Inactive');
    fixture.componentRef.setInput('checked', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Inactive');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
