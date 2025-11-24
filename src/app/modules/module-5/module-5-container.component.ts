import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-5-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './module-5-container.component.html',
  styleUrl: './module-5-container.component.css'
})
export class Module5ContainerComponent {
  exercises = [
    {
      path: 'exercise-5-1',
      title: 'Exercise 5-1',
      description: 'complex multi-step form'
    }
  ];
}
