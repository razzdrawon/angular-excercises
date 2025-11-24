import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-4-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './module-4-container.component.html',
  styleUrl: './module-4-container.component.css'
})
export class Module4ContainerComponent {
  exercises = [
    {
      path: 'exercise-4-1',
      title: 'Exercise 4-1',
      description: 'permissions and roles system'
    }
  ];
}
