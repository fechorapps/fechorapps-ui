import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiToolbarComponent } from './toolbar.component';

describe('UiToolbarComponent', () => {
  let fixture: ComponentFixture<UiToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiToolbarComponent] });
    fixture = TestBed.createComponent(UiToolbarComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('includes base layout classes', () => {
    fixture.detectChanges();
    const classes = fixture.componentInstance.containerClasses();
    expect(classes).toContain('flex');
    expect(classes).toContain('items-center');
  });

  it('appends styleClass to container', () => {
    fixture.componentRef.setInput('styleClass', 'toolbar-custom');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('toolbar-custom');
  });

  it('defaults styleClass to empty string', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.styleClass()).toBe('');
  });
});
