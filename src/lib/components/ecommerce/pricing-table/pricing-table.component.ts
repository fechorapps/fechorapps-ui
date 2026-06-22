import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
} from '@angular/core';
import { LucideAngularModule, Check, X, Zap } from 'lucide-angular';

export interface PricingFeature {
  label: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  period?: string;
  currency?: string;
  badge?: string;
  highlighted?: boolean;
  ctaLabel?: string;
  features: PricingFeature[];
}

@Component({
  selector: 'ui-pricing-table',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './pricing-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPricingTableComponent {
  readonly plans = input.required<PricingPlan[]>();
  readonly billing = model<'monthly' | 'yearly'>('monthly');
  readonly yearlyDiscount = input<number>(20);

  readonly planSelected = output<PricingPlan>();

  readonly checkIcon = Check;
  readonly xIcon = X;
  readonly zapIcon = Zap;

  readonly effectivePlans = computed(() => {
    const isYearly = this.billing() === 'yearly';
    const discount = this.yearlyDiscount() / 100;
    return this.plans().map((plan) => ({
      ...plan,
      effectivePrice: isYearly
        ? Math.round(plan.price * (1 - discount) * 100) / 100
        : plan.price,
    }));
  });

  toggleBilling(): void {
    this.billing.set(this.billing() === 'monthly' ? 'yearly' : 'monthly');
  }

  selectPlan(plan: PricingPlan): void {
    this.planSelected.emit(plan);
  }

  formatPrice(price: number, currency: string = '$'): string {
    return `${currency}${price.toFixed(2)}`;
  }
}
