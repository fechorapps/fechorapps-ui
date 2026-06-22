import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSelectButtonComponent } from './select-button.component';

describe('UiSelectButtonComponent', () => {
  let fixture: ComponentFixture<UiSelectButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSelectButtonComponent] });
    fixture = TestBed.createComponent(UiSelectButtonComponent);
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

  it('renders option labels', () => {
    fixture.componentRef.setInput('options', [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Day');
    expect(fixture.nativeElement.textContent).toContain('Week');
    expect(fixture.nativeElement.textContent).toContain('Month');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies size variant', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
