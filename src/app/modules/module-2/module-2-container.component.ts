import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-2-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './module-2-container.component.html',
  styleUrl: './module-2-container.component.css'
})
export class Module2ContainerComponent {
  exercises = [
    {
      path: 'exercise-2-1',
      title: 'Exercise 2-1',
      description: 'Standalone Component Library'
    }
  ];
}

