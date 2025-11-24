import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showHelp = signal(false);
  title = signal('angular-training');

  toggleHelp() {
    this.showHelp.update(value => !value);
  }

  closeHelp() {
    this.showHelp.set(false);
  }
}
