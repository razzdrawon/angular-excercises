import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-1-2-computed-effects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-1-2-computed-effects.component.html',
  styleUrl: './exercise-1-2-computed-effects.component.css'
})
export class Exercise12ComputedEffectsComponent {
  // Base signals
  price = signal(100);
  quantity = signal(1);
  discount = signal(0);
  taxRate = signal(0.1); // 10%
  
  // Computed signals - automatically update when dependencies change
  subtotal = computed(() => this.price() * this.quantity());
  
  discountAmount = computed(() => {
    return this.subtotal() * (this.discount() / 100);
  });
  
  totalBeforeTax = computed(() => {
    return this.subtotal() - this.discountAmount();
  });
  
  taxAmount = computed(() => {
    return this.totalBeforeTax() * this.taxRate();
  });
  
  finalTotal = computed(() => {
    return this.totalBeforeTax() + this.taxAmount();
  });
  
  // Effect to log changes (side effects)
  logEffect = effect(() => {
    const total = this.finalTotal();
    console.log('Final total changed:', total);
  });
  
  // Effect with conditional logic
  warningEffect = effect(() => {
    if (this.finalTotal() > 1000) {
      console.warn('High value order!', this.finalTotal());
    }
  });
  
  // Methods to update signals
  updatePrice(value: number) {
    this.price.set(value);
  }
  
  updateQuantity(value: number) {
    this.quantity.set(value);
  }
  
  updateDiscount(value: number) {
    this.discount.set(Math.max(0, Math.min(100, value)));
  }
  
  updateTaxRate(value: number) {
    this.taxRate.set(value);
  }
}

