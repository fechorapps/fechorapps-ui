import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRichTextViewerComponent } from './rich-text-viewer.component';

describe('UiRichTextViewerComponent', () => {
  let fixture: ComponentFixture<UiRichTextViewerComponent>;
  let component: UiRichTextViewerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiRichTextViewerComponent] });
    fixture = TestBed.createComponent(UiRichTextViewerComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('parsedHtml returns empty string for empty content', () => {
    fixture.componentRef.setInput('content', '');
    fixture.detectChanges();
    expect(component.parsedHtml()).toBe('');
  });

  it('parsedHtml converts markdown to html', () => {
    fixture.componentRef.setInput('content', '# Hello');
    fixture.componentRef.setInput('format', 'markdown');
    fixture.detectChanges();
    const html = String(component.parsedHtml());
    // parsedHtml returns SafeHtml, check nativeElement instead
    expect(fixture.nativeElement.querySelector('h1')).toBeTruthy();
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'custom-class');
    fixture.detectChanges();
    expect(component.containerClasses()).toContain('custom-class');
  });
});
