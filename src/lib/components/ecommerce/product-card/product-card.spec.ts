import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiProductCardComponent, Product } from './product-card.component';

const baseProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 50,
  originalPrice: 100,
  currency: '$',
  inStock: true,
  rating: 4,
  reviewCount: 10,
};

describe('UiProductCardComponent', () => {
  let fixture: ComponentFixture<UiProductCardComponent>;
  let component: UiProductCardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiProductCardComponent] });
    fixture = TestBed.createComponent(UiProductCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', baseProduct);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('discountPercent computes correctly', () => {
    fixture.detectChanges();
    expect(component.discountPercent()).toBe(50);
  });

  it('discountPercent is null when no originalPrice', () => {
    fixture.componentRef.setInput('product', { ...baseProduct, originalPrice: undefined });
    fixture.detectChanges();
    expect(component.discountPercent()).toBeNull();
  });

  it('stars computed returns 5-element array with correct filled values', () => {
    fixture.detectChanges();
    const stars = component.stars();
    expect(stars.length).toBe(5);
    expect(stars.filter(Boolean).length).toBe(4);
  });

  it('formattedPrice returns currency + price', () => {
    fixture.detectChanges();
    expect(component.formattedPrice()).toBe('$50.00');
  });

  it('formattedOriginalPrice returns currency + originalPrice', () => {
    fixture.detectChanges();
    expect(component.formattedOriginalPrice()).toBe('$100.00');
  });

  it('formattedOriginalPrice returns null when no originalPrice', () => {
    fixture.componentRef.setInput('product', { ...baseProduct, originalPrice: undefined });
    fixture.detectChanges();
    expect(component.formattedOriginalPrice()).toBeNull();
  });

  it('onAddToCart emits addToCart with product', () => {
    fixture.detectChanges();
    const emitted: Product[] = [];
    component.addToCart.subscribe((p: Product) => emitted.push(p));
    const event = new MouseEvent('click');
    component.onAddToCart(event);
    expect(emitted.length).toBe(1);
    expect(emitted[0].id).toBe('1');
  });

  it('onWishlistToggle emits wishlistToggled with product', () => {
    fixture.detectChanges();
    const emitted: Product[] = [];
    component.wishlistToggled.subscribe((p: Product) => emitted.push(p));
    const event = new MouseEvent('click');
    component.onWishlistToggle(event);
    expect(emitted.length).toBe(1);
    expect(emitted[0].id).toBe('1');
  });

  it('onProductClick emits productClicked with product', () => {
    fixture.detectChanges();
    const emitted: Product[] = [];
    component.productClicked.subscribe((p: Product) => emitted.push(p));
    component.onProductClick();
    expect(emitted.length).toBe(1);
    expect(emitted[0].id).toBe('1');
  });

  it('defaults orientation to vertical', () => {
    fixture.detectChanges();
    expect(component.orientation()).toBe('vertical');
  });

  it('horizontal orientation input is respected', () => {
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.detectChanges();
    expect(component.orientation()).toBe('horizontal');
  });
});
