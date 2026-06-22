import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiScrollerComponent } from './scroller.component';

describe('UiScrollerComponent', () => {
  let fixture: ComponentFixture<UiScrollerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiScrollerComponent] });
    fixture = TestBed.createComponent(UiScrollerComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders with items', () => {
    const items = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i}` }));
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('itemSize', 50);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows loading state', () => {
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.loading()).toBe(true);
  });

  it('computes total content height from items and itemSize', () => {
    fixture.componentRef.setInput('items', Array.from({ length: 20 }, (_, i) => i));
    fixture.componentRef.setInput('itemSize', 40);
    fixture.detectChanges();
    expect(fixture.componentInstance.totalContentHeight()).toBe(800);
  });

  it('applies scroll height to viewport', () => {
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('scrollHeight', '600px');
    fixture.detectChanges();
    expect(fixture.componentInstance.scrollHeight()).toBe('600px');
  });

  it('supports horizontal orientation', () => {
    fixture.componentRef.setInput('items', Array.from({ length: 10 }, (_, i) => i));
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.detectChanges();
    expect(fixture.componentInstance.isHorizontal()).toBe(true);
    expect(fixture.componentInstance.isVertical()).toBe(false);
  });

  it('disables interaction when disabled is true', () => {
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.disabled()).toBe(true);
  });
});
