import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTimelineComponent } from './timeline.component';
import type { TimelineEvent } from './timeline.component';

describe('UiTimelineComponent', () => {
  let fixture: ComponentFixture<UiTimelineComponent>;

  const events: TimelineEvent[] = [
    { status: 'Ordered', date: '2024-01-01', color: 'primary' },
    { status: 'Shipped', date: '2024-01-03', color: 'info' },
    { status: 'Delivered', date: '2024-01-05', color: 'success' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiTimelineComponent] });
    fixture = TestBed.createComponent(UiTimelineComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders with events', () => {
    fixture.componentRef.setInput('value', events);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults to vertical layout', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.isVertical()).toBe(true);
    expect(fixture.componentInstance.isHorizontal()).toBe(false);
  });

  it('switches to horizontal layout', () => {
    fixture.componentRef.setInput('layout', 'horizontal');
    fixture.detectChanges();
    expect(fixture.componentInstance.isHorizontal()).toBe(true);
    expect(fixture.componentInstance.isVertical()).toBe(false);
  });

  it('detects alternate alignment', () => {
    fixture.componentRef.setInput('align', 'alternate');
    fixture.detectChanges();
    expect(fixture.componentInstance.isAlternate()).toBe(true);
  });

  it('identifies last event correctly', () => {
    fixture.componentRef.setInput('value', events);
    fixture.detectChanges();
    expect(fixture.componentInstance.isLastEvent(2)).toBe(true);
    expect(fixture.componentInstance.isLastEvent(0)).toBe(false);
  });

  it('renders with empty events array', () => {
    fixture.componentRef.setInput('value', []);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
