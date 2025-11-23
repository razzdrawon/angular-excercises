import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-practice-1-1-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice-1-1-todo-list.component.html',
  styleUrl: './practice-1-1-todo-list.component.css'
})
export class Practice11TodoListComponent {
  // TODO: Create a signal for the todo list items
  // Each item should have: { id: number, text: string, completed: boolean }
  todoList = signal<{ id: number, text: string, completed: boolean }[]>([]);
  
  // TODO: Create a signal for the new todo input text
  newTodoInputText = signal('');
  
  // TODO: Create a computed signal that returns only incomplete todos
  incompleteTodos = computed(() => this.todoList().filter(todo => !todo.completed));
  // TODO: Create a computed signal that returns only completed todos
  completedTodos = computed(() => this.todoList().filter(todo => todo.completed));
  
  // TODO: Create a computed signal that returns the count of incomplete todos
  incompleteCount = computed(() => this.incompleteTodos().length);
  
  // TODO: Implement addTodo() method
  // It should add a new todo with a unique id, the text from input, and completed: false
  // Then clear the input
  addTodo() {
    const text = this.newTodoInputText().trim();
    if (text) {
      const newTodoItem = {
        id: Date.now(), // simple unique id based on timestamp
        text: text,
        completed: false
      };
      this.todoList.set([...this.todoList(), newTodoItem]);
      this.newTodoInputText.set('');
    }
  }
  
  // TODO: Implement (id: toggleTodonumber) method
  // It should toggle the completed status of the todo with the given id
  toggleTodo(id: number) {
    this.todoList.set(this.todoList().map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }
  
  
  // TODO: Implement deleteTodo(id: number) method
  // It should remove the todo with the given id from the list
  deleteTodo(id: number) {
    this.todoList.set(this.todoList().filter(todo => todo.id !== id));
  }
  
  // TODO: Implement clearCompleted() method
  // It should remove all completed todos from the list
  clearCompleted() {
    this.todoList.set(this.todoList().filter(todo => !todo.completed));
  }
}

