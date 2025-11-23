import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
}

@Component({
  selector: 'app-exercise-1-4-reactive-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-1-4-reactive-dashboard.component.html',
  styleUrl: './exercise-1-4-reactive-dashboard.component.css'
})
export class Exercise14ReactiveDashboardComponent {
  // User balance
  balance = signal(10000);
  
  // Transactions
  transactions = signal<Transaction[]>([
    { id: 1, description: 'Salary', amount: 5000, type: 'income', date: new Date('2024-01-01') },
    { id: 2, description: 'Rent', amount: -1200, type: 'expense', date: new Date('2024-01-05') },
    { id: 3, description: 'Groceries', amount: -300, type: 'expense', date: new Date('2024-01-10') },
    { id: 4, description: 'Freelance', amount: 800, type: 'income', date: new Date('2024-01-15') },
  ]);
  
  // Live time signal from Observable
  currentTime$ = interval(1000).pipe(
    map(() => new Date())
  );
  currentTime = toSignal(this.currentTime$, { initialValue: new Date() });
  
  // Computed values
  totalIncome = computed(() => {
    return this.transactions()
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  });
  
  totalExpenses = computed(() => {
    return Math.abs(this.transactions()
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0));
  });
  
  netAmount = computed(() => {
    return this.totalIncome() - this.totalExpenses();
  });
  
  recentTransactions = computed(() => {
    return [...this.transactions()].sort((a, b) => 
      b.date.getTime() - a.date.getTime()
    ).slice(0, 5);
  });
  
  balanceStatus = computed(() => {
    const net = this.netAmount();
    if (net > 5000) return 'excellent';
    if (net > 0) return 'good';
    return 'warning';
  });
  
  // Helper method for template
  Math = Math;
  
  // Effect for notifications
  balanceAlert = effect(() => {
    const net = this.netAmount();
    if (net < 0) {
      console.warn('⚠️ Warning: Negative balance!');
    }
  });
  
  // Methods
  addTransaction(description: string, amount: number, type: 'income' | 'expense') {
    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      type,
      date: new Date()
    };
    this.transactions.update(transactions => [...transactions, newTransaction]);
  }
  
  removeTransaction(id: number) {
    this.transactions.update(transactions => 
      transactions.filter(t => t.id !== id)
    );
  }
  
  // Quick actions
  addIncome(description: string, amount: number) {
    this.addTransaction(description, amount, 'income');
  }
  
  addExpense(description: string, amount: number) {
    this.addTransaction(description, amount, 'expense');
  }
}

