import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-7-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './module-7-container.component.html',
  styleUrl: './module-7-container.component.css'
})
export class Module7ContainerComponent {
  exercises = [
    {
      path: 'exercise-7-1',
      title: 'Exercise 7-1',
      description: 'full testing suite'
    }
  ];
}
