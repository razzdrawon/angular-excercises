import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-1-1-basic-signals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-1-1-basic-signals.component.html',
  styleUrl: './exercise-1-1-basic-signals.component.css'
})
export class Exercise11BasicSignalsComponent {
  // Basic signal with initial value
  count = signal(0);
  
  // Signal with object
  user = signal({ name: 'John', age: 30 });
  
  // Signal with array
  items = signal<string[]>(['Item 1', 'Item 2', 'Item 3']);
  
  // Computed signal - derived from other signals
  doubleCount = computed(() => this.count() * 2);
  
  // Computed signal with multiple dependencies
  userInfo = computed(() => {
    const user = this.user();
    return `${user.name} is ${user.age} years old`;
  });
  
  // Methods to update signals
  increment() {
    this.count.update(value => value + 1);
  }
  
  decrement() {
    this.count.update(value => value - 1);
  }
  
  reset() {
    this.count.set(0);
  }
  
  updateUserName(name: string) {
    this.user.update(user => ({ ...user, name }));
  }
  
  updateUserAge(age: number) {
    this.user.update(user => ({ ...user, age }));
  }
  
  addItem(item: string) {
    this.items.update(items => [...items, item]);
  }
  
  removeItem(index: number) {
    this.items.update(items => items.filter((_, i) => i !== index));
  }
}

