import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-8-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './module-8-container.component.html',
  styleUrl: './module-8-container.component.css'
})
export class Module8ContainerComponent {
  exercises = [
    {
      path: 'exercise-8-1',
      title: 'Exercise 8-1',
      description: 'SSR-enabled PWA integration'
    }
  ];
}
