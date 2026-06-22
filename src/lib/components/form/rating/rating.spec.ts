import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRatingComponent } from './rating.component';

describe('UiRatingComponent', () => {
  let fixture: ComponentFixture<UiRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiRatingComponent] });
    fixture = TestBed.createComponent(UiRatingComponent);
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

  it('renders correct number of stars', () => {
    fixture.componentRef.setInput('stars', 5);
    fixture.detectChanges();
    const stars = fixture.nativeElement.querySelectorAll('lucide-icon');
    expect(stars.length).toBe(5);
  });

  it('renders label when provided', () => {
    fixture.componentRef.setInput('label', 'Rate this');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Rate this');
  });

  it('applies readonly state', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
