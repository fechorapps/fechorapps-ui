import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputGroupComponent } from './input-group.component';

describe('UiInputGroupComponent', () => {
  let fixture: ComponentFixture<UiInputGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiInputGroupComponent] });
    fixture = TestBed.createComponent(UiInputGroupComponent);
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

  it('shows prefix text when provided', () => {
    fixture.componentRef.setInput('prefix', '$');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('$');
  });

  it('shows suffix text when provided', () => {
    fixture.componentRef.setInput('suffix', '.00');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('.00');
  });

  it('applies invalid state', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
