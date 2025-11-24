import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-6-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './module-6-container.component.html',
  styleUrl: './module-6-container.component.css'
})
export class Module6ContainerComponent {
  exercises = [
    {
      path: 'exercise-6-1',
      title: 'Exercise 6-1',
      description: 'multi-tenant routing app'
    }
  ];
}
