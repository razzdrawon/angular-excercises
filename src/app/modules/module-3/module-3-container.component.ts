import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-3-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './module-3-container.component.html',
  styleUrl: './module-3-container.component.css'
})
export class Module3ContainerComponent {
  exercises = [
    {
      path: 'exercise-3-1',
      title: 'Exercise 3-1',
      description: '10k+ item optimized list'
    }
  ];
}
