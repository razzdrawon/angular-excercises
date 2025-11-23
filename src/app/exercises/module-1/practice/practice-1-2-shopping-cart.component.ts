import { Component } from '@angular/core';
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
  
  // TODO: Create a computed signal for subtotal (sum of price * quantity for all items)
  
  // TODO: Create a computed signal for tax (subtotal * 0.1 for 10% tax)
  
  // TODO: Create a computed signal for total (subtotal + tax)
  
  // TODO: Create a computed signal for item count (total quantity of all items)
  
  // TODO: Implement addItem(item: CartItem) method
  // If item already exists in cart (by id), increase its quantity
  // Otherwise, add the new item to the cart
  
  // TODO: Implement removeItem(id: number) method
  // Remove the item with the given id from the cart
  
  // TODO: Implement updateQuantity(id: number, quantity: number) method
  // Update the quantity of the item with the given id
  // If quantity is 0 or less, remove the item
  
  // TODO: Implement clearCart() method
  // Remove all items from the cart
}

