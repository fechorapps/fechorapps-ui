import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMeterGroupComponent, MeterItem } from './meter-group.component';

const METERS: MeterItem[] = [
  { label: 'Used', value: 50 },
  { label: 'Free', value: 30 },
];

describe('UiMeterGroupComponent', () => {
  let fixture: ComponentFixture<UiMeterGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiMeterGroupComponent] });
    fixture = TestBed.createComponent(UiMeterGroupComponent);
  });

  it('renders', () => {
    fixture.componentRef.setInput('value', METERS);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes totalValue as sum of item values', () => {
    fixture.componentRef.setInput('value', METERS);
    fixture.detectChanges();
    expect(fixture.componentInstance.totalValue()).toBe(80);
  });

  it('computes item percentages relative to max', () => {
    fixture.componentRef.setInput('value', METERS);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    const items = fixture.componentInstance.items();
    expect(items[0].percentage).toBe(50);
    expect(items[1].percentage).toBe(30);
  });

  it('assigns default colors when item color is not set', () => {
    fixture.componentRef.setInput('value', METERS);
    fixture.detectChanges();
    const items = fixture.componentInstance.items();
    expect(items[0].color).toBeTruthy();
    expect(items[1].color).toBeTruthy();
  });

  it('preserves explicit item color', () => {
    const coloredMeters: MeterItem[] = [{ label: 'Custom', value: 40, color: 'bg-pink-400' }];
    fixture.componentRef.setInput('value', coloredMeters);
    fixture.detectChanges();
    expect(fixture.componentInstance.items()[0].color).toBe('bg-pink-400');
  });

  it('applies horizontal layout classes by default', () => {
    fixture.componentRef.setInput('value', METERS);
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('space-y-2');
  });

  it('applies vertical layout classes when orientation is vertical', () => {
    fixture.componentRef.setInput('value', METERS);
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('flex');
    expect(fixture.componentInstance.containerClasses()).toContain('gap-4');
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('value', METERS);
    fixture.componentRef.setInput('styleClass', 'p-4');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('p-4');
  });
});
