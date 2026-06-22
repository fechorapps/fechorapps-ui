import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCodeBlockComponent } from './code-block.component';

describe('UiCodeBlockComponent', () => {
  let fixture: ComponentFixture<UiCodeBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCodeBlockComponent] });
    fixture = TestBed.createComponent(UiCodeBlockComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows language in header', () => {
    fixture.componentRef.setInput('language', 'javascript');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('javascript');
  });

  it('shows copy button when showCopyButton is true', () => {
    fixture.componentRef.setInput('showCopyButton', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });
});
