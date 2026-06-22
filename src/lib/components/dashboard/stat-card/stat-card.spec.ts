import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiStatCardComponent } from './stat-card.component';

describe('UiStatCardComponent', () => {
  let fixture: ComponentFixture<UiStatCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiStatCardComponent] });
    fixture = TestBed.createComponent(UiStatCardComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays label', () => {
    fixture.componentRef.setInput('label', 'Revenue');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Revenue');
  });

  it('displays value', () => {
    fixture.componentRef.setInput('value', '$10,000');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('$10,000');
  });

  it('applies variant class', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('[class*="bg-green"]');
    expect(el).toBeTruthy();
  });
});
