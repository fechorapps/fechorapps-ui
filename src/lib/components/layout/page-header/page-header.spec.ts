import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPageHeaderComponent } from './page-header.component';

describe('UiPageHeaderComponent', () => {
  let fixture: ComponentFixture<UiPageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPageHeaderComponent] });
    fixture = TestBed.createComponent(UiPageHeaderComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows title', () => {
    fixture.componentRef.setInput('title', 'My Page');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('My Page');
  });

  it('shows subtitle', () => {
    fixture.componentRef.setInput('title', 'My Page');
    fixture.componentRef.setInput('subtitle', 'A description');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('A description');
  });

  it('hides subtitle when not provided', () => {
    fixture.componentRef.setInput('title', 'My Page');
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p).toBeFalsy();
  });

  it('applies sticky classes when sticky is true', () => {
    fixture.componentRef.setInput('sticky', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div');
    expect(el.classList).toContain('sticky');
    expect(el.classList).toContain('top-0');
    expect(el.classList).toContain('z-10');
  });

  it('does not apply sticky classes when sticky is false', () => {
    fixture.componentRef.setInput('sticky', false);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div');
    expect(el.classList).not.toContain('sticky');
  });

  it('renders breadcrumbs', () => {
    fixture.componentRef.setInput('breadcrumbs', [
      { label: 'Home', url: '/' },
      { label: 'Profile' },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Home');
    expect(fixture.nativeElement.textContent).toContain('Profile');
  });
});
