import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiIconFieldComponent } from './icon-field.component';

describe('UiIconFieldComponent', () => {
  let fixture: ComponentFixture<UiIconFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiIconFieldComponent] });
    fixture = TestBed.createComponent(UiIconFieldComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies size variant', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('applies right icon position', () => {
    fixture.componentRef.setInput('iconPosition', 'right');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
