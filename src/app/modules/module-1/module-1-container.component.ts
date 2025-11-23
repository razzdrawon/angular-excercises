import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-1-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './module-1-container.component.html',
  styleUrl: './module-1-container.component.css'
})
export class Module1ContainerComponent {
  exercises = [
    {
      path: 'exercise-1-1',
      title: 'Exercise 1-1',
      description: 'Basic Signals'
    },
    {
      path: 'exercise-1-2',
      title: 'Exercise 1-2',
      description: 'Computed & Effects'
    },
    {
      path: 'exercise-1-3',
      title: 'Exercise 1-3',
      description: 'Signals & RxJS'
    },
    {
      path: 'exercise-1-4',
      title: 'Exercise 1-4',
      description: 'Reactive Dashboard'
    }
  ];

  practices = [
    {
      path: 'practice-1-1',
      title: 'Practice 1-1',
      description: 'Todo List'
    },
    {
      path: 'practice-1-2',
      title: 'Practice 1-2',
      description: 'Shopping Cart'
    }
  ];
}

