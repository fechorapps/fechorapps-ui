import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from '@angular/core';
import {
  LucideAngularModule,
  ShoppingCart,
  Heart,
  Star,
} from 'lucide-angular';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  image?: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  tags?: string[];
}

@Component({
  selector: 'ui-product-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProductCardComponent {
  readonly product = input.required<Product>();
  readonly showRating = input<boolean>(true);
  readonly showBadge = input<boolean>(true);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');

  readonly addToCart = output<Product>();
  readonly wishlistToggled = output<Product>();
  readonly productClicked = output<Product>();

  readonly cartIcon = ShoppingCart;
  readonly heartIcon = Heart;
  readonly starIcon = Star;

  readonly discountPercent = computed(() => {
    const p = this.product();
    return p.originalPrice
      ? Math.round((1 - p.price / p.originalPrice) * 100)
      : null;
  });

  readonly stars = computed(() => {
    const rating = this.product().rating ?? 0;
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  });

  readonly formattedPrice = computed(() => {
    const p = this.product();
    const currency = p.currency ?? '$';
    return `${currency}${p.price.toFixed(2)}`;
  });

  readonly formattedOriginalPrice = computed(() => {
    const p = this.product();
    if (!p.originalPrice) return null;
    const currency = p.currency ?? '$';
    return `${currency}${p.originalPrice.toFixed(2)}`;
  });

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product());
  }

  onWishlistToggle(event: Event): void {
    event.stopPropagation();
    this.wishlistToggled.emit(this.product());
  }

  onProductClick(): void {
    this.productClicked.emit(this.product());
  }
}
