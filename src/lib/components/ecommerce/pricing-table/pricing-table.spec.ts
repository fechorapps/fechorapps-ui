import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPricingTableComponent, PricingPlan } from './pricing-table.component';

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 10,
    originalPrice: 10,
    currency: '$',
    features: [{ label: 'Feature A', included: true }],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 30,
    originalPrice: 30,
    currency: '$',
    highlighted: true,
    features: [
      { label: 'Feature A', included: true },
      { label: 'Feature B', included: true },
    ],
  },
];

describe('UiPricingTableComponent', () => {
  let fixture: ComponentFixture<UiPricingTableComponent>;
  let component: UiPricingTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPricingTableComponent] });
    fixture = TestBed.createComponent(UiPricingTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('plans', plans);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('defaults billing to monthly', () => {
    fixture.detectChanges();
    expect(component.billing()).toBe('monthly');
  });

  it('toggleBilling switches from monthly to yearly', () => {
    fixture.detectChanges();
    component.toggleBilling();
    expect(component.billing()).toBe('yearly');
  });

  it('toggleBilling switches from yearly to monthly', () => {
    fixture.componentRef.setInput('billing', 'yearly');
    fixture.detectChanges();
    component.toggleBilling();
    expect(component.billing()).toBe('monthly');
  });

  it('effectivePlans applies yearly discount', () => {
    fixture.componentRef.setInput('billing', 'yearly');
    fixture.componentRef.setInput('yearlyDiscount', 20);
    fixture.detectChanges();
    const effective = component.effectivePlans();
    expect(effective[0].effectivePrice).toBe(8);
    expect(effective[1].effectivePrice).toBe(24);
  });

  it('effectivePlans uses full price on monthly billing', () => {
    fixture.detectChanges();
    const effective = component.effectivePlans();
    expect(effective[0].effectivePrice).toBe(10);
    expect(effective[1].effectivePrice).toBe(30);
  });

  it('selectPlan emits planSelected with the plan', () => {
    fixture.detectChanges();
    const emitted: PricingPlan[] = [];
    component.planSelected.subscribe((p: PricingPlan) => emitted.push(p));
    component.selectPlan(plans[0]);
    expect(emitted.length).toBe(1);
    expect(emitted[0].id).toBe('starter');
  });

  it('formatPrice formats currency and price correctly', () => {
    fixture.detectChanges();
    expect(component.formatPrice(29.99, '$')).toBe('$29.99');
    expect(component.formatPrice(9, '€')).toBe('€9.00');
  });

  it('yearlyDiscount defaults to 20', () => {
    fixture.detectChanges();
    expect(component.yearlyDiscount()).toBe(20);
  });
});
