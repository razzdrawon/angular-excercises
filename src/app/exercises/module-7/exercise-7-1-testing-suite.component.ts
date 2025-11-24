import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Exercise 7-1: Full Testing Suite
 * 
 * Objetivo: Componente de demostración para testing:
 * - Unit testing signals/components
 * - Component + integration testing
 * - E2E testing flows
 * 
 * Este componente está diseñado para ser fácilmente testeable
 */

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-exercise-7-1-testing-suite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-7-1-testing-suite.component.html',
  styleUrl: './exercise-7-1-testing-suite.component.css'
})
export class Exercise71TestingSuiteComponent {
  todos = signal<Todo[]>([]);
  filter = signal<'all' | 'active' | 'completed'>('all');
  newTodoTitle = signal<string>('');

  // Computed: todos filtrados
  filteredTodos = computed(() => {
    const todos = this.todos();
    const currentFilter = this.filter();
    
    switch (currentFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  });

  // Computed: estadísticas
  stats = computed(() => {
    const todos = this.todos();
    return {
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length
    };
  });

  // Métodos públicos (fáciles de testear)
  addTodo(title: string): void {
    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };

    this.todos.update(todos => [...todos, newTodo]);
    this.newTodoTitle.set('');
  }

  removeTodo(id: number): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  toggleTodo(id: number): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter.set(filter);
  }

  clearCompleted(): void {
    this.todos.update(todos => todos.filter(todo => !todo.completed));
  }

  // Métodos para testing
  getTodoById(id: number): Todo | undefined {
    return this.todos().find(todo => todo.id === id);
  }

  hasTodos(): boolean {
    return this.todos().length > 0;
  }

  allTodosCompleted(): boolean {
    return this.todos().length > 0 && this.todos().every(todo => todo.completed);
  }
}

