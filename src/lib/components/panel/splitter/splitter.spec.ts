import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSplitterComponent } from './splitter.component';

describe('UiSplitterComponent', () => {
  let fixture: ComponentFixture<UiSplitterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiSplitterComponent] });
    fixture = TestBed.createComponent(UiSplitterComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults layout to horizontal', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.layout()).toBe('horizontal');
  });

  it('defaults panelSizes to [50, 50]', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.panelSizes()).toEqual([50, 50]);
  });

  it('accepts custom panelSizes', () => {
    fixture.componentRef.setInput('panelSizes', [30, 70]);
    fixture.detectChanges();
    expect(fixture.componentInstance.sizes()).toEqual([30, 70]);
  });

  it('applies vertical layout classes', () => {
    fixture.componentRef.setInput('layout', 'vertical');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('flex-col');
  });

  it('returns correct panel style for horizontal layout', () => {
    fixture.componentRef.setInput('panelSizes', [40, 60]);
    fixture.componentRef.setInput('gutterSize', 4);
    fixture.detectChanges();
    const style = fixture.componentInstance.getPanelStyle(0);
    expect(style['width']).toContain('40%');
  });

  it('returns correct panel style for vertical layout', () => {
    fixture.componentRef.setInput('layout', 'vertical');
    fixture.componentRef.setInput('panelSizes', [40, 60]);
    fixture.detectChanges();
    const style = fixture.componentInstance.getPanelStyle(1);
    expect(style['height']).toContain('60%');
  });
});
