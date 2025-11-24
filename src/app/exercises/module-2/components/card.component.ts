import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h3>{{ title }}</h3>
        @if (showRemoveButton) {
          <button class="remove-btn" (click)="handleRemove()">×</button>
        }
      </div>
      <div class="card-content">
        <p>{{ content }}</p>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .card-header {
      background: #3498db;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.2rem;
    }

    .remove-btn {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      line-height: 1;
      transition: background 0.2s;
    }

    .remove-btn:hover {
      background: rgba(255,255,255,0.3);
    }

    .card-content {
      padding: 1.5rem;
      color: #2c3e50;
    }

    .card-content p {
      margin: 0;
      line-height: 1.6;
    }
  `]
})
export class CardComponent {
  @Input() title: string = 'Card Title';
  @Input() content: string = 'Card content';
  @Input() showRemoveButton: boolean = true;
  @Output() removed = new EventEmitter<void>();

  handleRemove() {
    this.removed.emit();
  }
}

