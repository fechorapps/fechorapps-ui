import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCartSummaryComponent, CartItem } from './cart-summary.component';

const items: CartItem[] = [
  { id: '1', name: 'Item A', price: 10, quantity: 2 },
  { id: '2', name: 'Item B', price: 25, quantity: 1 },
];

describe('UiCartSummaryComponent', () => {
  let fixture: ComponentFixture<UiCartSummaryComponent>;
  let component: UiCartSummaryComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCartSummaryComponent] });
    fixture = TestBed.createComponent(UiCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('subtotal computes sum of price * quantity', () => {
    fixture.detectChanges();
    // 10*2 + 25*1 = 45
    expect(component.subtotal()).toBe(45);
  });

  it('total computes subtotal + tax + shipping - discount', () => {
    fixture.componentRef.setInput('tax', 5);
    fixture.componentRef.setInput('shippingCost', 3);
    fixture.componentRef.setInput('discount', 10);
    fixture.detectChanges();
    // 45 + 5 + 3 - 10 = 43
    expect(component.total()).toBe(43);
  });

  it('freeShippingRemaining returns 0 when no threshold', () => {
    fixture.componentRef.setInput('freeShippingThreshold', null);
    fixture.detectChanges();
    expect(component.freeShippingRemaining()).toBe(0);
  });

  it('freeShippingRemaining returns remaining amount to threshold', () => {
    fixture.componentRef.setInput('freeShippingThreshold', 100);
    fixture.detectChanges();
    // subtotal=45, threshold=100, remaining=55
    expect(component.freeShippingRemaining()).toBe(55);
  });

  it('freeShippingRemaining returns 0 when subtotal exceeds threshold', () => {
    fixture.componentRef.setInput('freeShippingThreshold', 30);
    fixture.detectChanges();
    expect(component.freeShippingRemaining()).toBe(0);
  });

  it('freeShippingProgress returns correct percentage', () => {
    fixture.componentRef.setInput('freeShippingThreshold', 90);
    fixture.detectChanges();
    // 45/90 = 50%
    expect(component.freeShippingProgress()).toBe(50);
  });

  it('freeShippingProgress caps at 100', () => {
    fixture.componentRef.setInput('freeShippingThreshold', 20);
    fixture.detectChanges();
    expect(component.freeShippingProgress()).toBe(100);
  });

  it('formatAmount formats with currency prefix', () => {
    fixture.detectChanges();
    expect(component.formatAmount(9.99)).toBe('$9.99');
  });

  it('formatAmount uses custom currency input', () => {
    fixture.componentRef.setInput('currency', '€');
    fixture.detectChanges();
    expect(component.formatAmount(9.99)).toBe('€9.99');
  });

  it('removeItem emits itemRemoved with the item', () => {
    fixture.detectChanges();
    const emitted: CartItem[] = [];
    component.itemRemoved.subscribe((i: CartItem) => emitted.push(i));
    component.removeItem(items[0]);
    expect(emitted.length).toBe(1);
    expect(emitted[0].id).toBe('1');
  });

  it('changeQuantity emits quantityChanged with new quantity', () => {
    fixture.detectChanges();
    const emitted: (CartItem & { quantity: number })[] = [];
    component.quantityChanged.subscribe((i: CartItem & { quantity: number }) => emitted.push(i));
    component.changeQuantity(items[0], 1);
    expect(emitted.length).toBe(1);
    expect(emitted[0].quantity).toBe(3);
  });

  it('changeQuantity does not emit when quantity would drop below 1', () => {
    fixture.detectChanges();
    const emitted: (CartItem & { quantity: number })[] = [];
    component.quantityChanged.subscribe((i: CartItem & { quantity: number }) => emitted.push(i));
    const singleItem: CartItem = { ...items[0], quantity: 1 };
    component.changeQuantity(singleItem, -1);
    expect(emitted.length).toBe(0);
  });

  it('onCheckout emits checkoutClicked', () => {
    fixture.detectChanges();
    let emitted = false;
    component.checkoutClicked.subscribe(() => (emitted = true));
    component.onCheckout();
    expect(emitted).toBeTrue();
  });

  it('defaults currency to $', () => {
    fixture.detectChanges();
    expect(component.currency()).toBe('$');
  });
});
