import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-practice-1-2-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice-1-2-shopping-cart.component.html',
  styleUrl: './practice-1-2-shopping-cart.component.css'
})
export class Practice12ShoppingCartComponent {
  // TODO: Create a signal for cart items (CartItem[])
  // Initialize with some sample items
  cartItems = signal<CartItem[]>([]);
  
  // TODO: Create a computed signal for subtotal (sum of price * quantity for all items)
  subtotal = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });
  
  // TODO: Create a computed signal for tax (subtotal * 0.1 for 10% tax)
  tax = computed(() => {
    return this.subtotal() * 0.1;
  });
  
  // TODO: Create a computed signal for total (subtotal + tax)
  total = computed(() => {
    return this.subtotal() + this.tax();
  });
  
  // TODO: Create a computed signal for item count (total quantity of all items)
  itemCount = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });
  
  // TODO: Implement addItem(item: CartItem) method
  // If item already exists in cart (by id), increase its quantity
  // Otherwise, add the new item to the cart
  addItem(item: CartItem) {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.id === item.id);
      if (existingItem) {
        // Item already exists, increase quantity
        return items.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        // New item, add to cart
        return [...items, item];
      }
    });
  }
  
  // TODO: Implement removeItem(id: number) method
  // Remove the item with the given id from the cart
  removeItem(id: number) {
    this.cartItems.update(items => items.filter(item => item.id !== id));
  }
  
  // TODO: Implement updateQuantity(id: number, quantity: number) method
  // Update the quantity of the item with the given id
  // If quantity is 0 or less, remove the item
  updateQuantity(id: number, quantity: number) {
    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      this.removeItem(id);
    } else {
      this.cartItems.update(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  }
  
  // TODO: Implement clearCart() method
  // Remove all items from the cart
  clearCart() {
    this.cartItems.set([]);
  }
}

