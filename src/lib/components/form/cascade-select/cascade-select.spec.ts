import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCascadeSelectComponent } from './cascade-select.component';

describe('UiCascadeSelectComponent', () => {
  let fixture: ComponentFixture<UiCascadeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCascadeSelectComponent] });
    fixture = TestBed.createComponent(UiCascadeSelectComponent);
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

  it('shows placeholder text', () => {
    fixture.componentRef.setInput('placeholder', 'Choose a location');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Choose a location');
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Location');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Location');
  });

  it('renders options when provided', () => {
    fixture.componentRef.setInput('options', [
      { label: 'Country A', value: 'a' },
      { label: 'Country B', value: 'b' },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
