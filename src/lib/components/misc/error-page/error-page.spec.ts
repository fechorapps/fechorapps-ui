import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiErrorPageComponent } from './error-page.component';

describe('UiErrorPageComponent', () => {
  let fixture: ComponentFixture<UiErrorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiErrorPageComponent] });
    fixture = TestBed.createComponent(UiErrorPageComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes defaultTitle from code', () => {
    fixture.componentRef.setInput('code', 500);
    fixture.detectChanges();
    expect(fixture.componentInstance.defaultTitle()).toBe('Internal Server Error');
  });

  it('emits homeClicked when home button clicked', () => {
    fixture.detectChanges();
    let emitted = false;
    fixture.componentInstance.homeClicked.subscribe(() => (emitted = true));
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitted).toBe(true);
  });
});
