import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
} from '@angular/core';
import { LucideAngularModule, Trash2, Plus, Minus, ShoppingBag, Truck } from 'lucide-angular';

export interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  variant?: string;
}

@Component({
  selector: 'ui-cart-summary',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './cart-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCartSummaryComponent {
  readonly items = input.required<CartItem[]>();
  readonly currency = input<string>('$');
  readonly discount = input<number>(0);
  readonly tax = input<number>(0);
  readonly shippingCost = input<number>(0);
  readonly freeShippingThreshold = input<number | null>(null);
  readonly checkoutLabel = input<string>('Proceed to Checkout');

  readonly itemRemoved = output<CartItem>();
  readonly quantityChanged = output<CartItem & { quantity: number }>();
  readonly checkoutClicked = output<void>();

  readonly trashIcon = Trash2;
  readonly plusIcon = Plus;
  readonly minusIcon = Minus;
  readonly bagIcon = ShoppingBag;
  readonly truckIcon = Truck;

  readonly subtotal = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  readonly total = computed(
    () => this.subtotal() + this.tax() + this.shippingCost() - this.discount()
  );

  readonly freeShippingRemaining = computed(() => {
    const threshold = this.freeShippingThreshold();
    return threshold ? Math.max(0, threshold - this.subtotal()) : 0;
  });

  readonly freeShippingProgress = computed(() => {
    const threshold = this.freeShippingThreshold();
    if (!threshold) return 0;
    return Math.min(100, Math.round((this.subtotal() / threshold) * 100));
  });

  formatAmount(amount: number): string {
    return `${this.currency()}${amount.toFixed(2)}`;
  }

  removeItem(item: CartItem): void {
    this.itemRemoved.emit(item);
  }

  changeQuantity(item: CartItem, delta: number): void {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    this.quantityChanged.emit({ ...item, quantity: newQty });
  }

  onCheckout(): void {
    this.checkoutClicked.emit();
  }
}
