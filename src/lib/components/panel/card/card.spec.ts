import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCardComponent } from './card.component';

describe('UiCardComponent', () => {
  let fixture: ComponentFixture<UiCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCardComponent] });
    fixture = TestBed.createComponent(UiCardComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows title when provided', () => {
    fixture.componentRef.setInput('title', 'My Card');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('My Card');
  });

  it('shows subtitle when provided', () => {
    fixture.componentRef.setInput('title', 'Title');
    fixture.componentRef.setInput('subtitle', 'A subtitle');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('A subtitle');
  });

  it('defaults variant to default', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.variant()).toBe('default');
  });

  it('applies elevated variant classes', () => {
    fixture.componentRef.setInput('variant', 'elevated');
    fixture.detectChanges();
    expect(fixture.componentInstance.cardClasses()).toContain('shadow-lg');
  });

  it('applies hoverable classes when hoverable is true', () => {
    fixture.componentRef.setInput('hoverable', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.cardClasses()).toContain('hover:shadow-xl');
  });

  it('emits cardClick when clickable card is clicked', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();
    const emitted: MouseEvent[] = [];
    fixture.componentInstance.cardClick.subscribe((e: MouseEvent) => emitted.push(e));
    const event = new MouseEvent('click');
    fixture.componentInstance.onClick(event);
    expect(emitted.length).toBe(1);
  });

  it('does not emit cardClick when card is not clickable', () => {
    fixture.detectChanges();
    const emitted: MouseEvent[] = [];
    fixture.componentInstance.cardClick.subscribe((e: MouseEvent) => emitted.push(e));
    fixture.componentInstance.onClick(new MouseEvent('click'));
    expect(emitted.length).toBe(0);
  });
});
