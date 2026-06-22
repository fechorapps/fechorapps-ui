import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSignaturePadComponent } from './signature-pad.component';

describe('UiSignaturePadComponent', () => {
  let fixture: ComponentFixture<UiSignaturePadComponent>;
  let component: UiSignaturePadComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSignaturePadComponent] });
    fixture = TestBed.createComponent(UiSignaturePadComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('isEmpty is true on init', () => {
    fixture.detectChanges();
    expect(component.isEmpty()).toBe(true);
  });

  it('clear emits cleared event', () => {
    fixture.detectChanges();
    // Set isEmpty to false to test clearing
    component['isEmpty'].set(false);
    let cleared = false;
    component.cleared.subscribe(() => (cleared = true));
    component.clear();
    expect(cleared).toBe(true);
    expect(component.isEmpty()).toBe(true);
  });

  it('shows placeholder when empty', () => {
    fixture.componentRef.setInput('placeholder', 'Sign here please');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sign here please');
  });
});
