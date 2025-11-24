import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClass()"
      [disabled]="disabled"
      (click)="handleClick()"
    >
      {{ label }}
    </button>
  `,
  styles: [`
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 1rem;
    }

    button.primary {
      background: #3498db;
      color: white;
    }

    button.primary:hover:not(:disabled) {
      background: #2980b9;
    }

    button.secondary {
      background: #95a5a6;
      color: white;
    }

    button.secondary:hover:not(:disabled) {
      background: #7f8c8d;
    }

    button.success {
      background: #27ae60;
      color: white;
    }

    button.success:hover:not(:disabled) {
      background: #229954;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() variant: 'primary' | 'secondary' | 'success' = 'primary';
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  buttonClass = () => this.variant;

  handleClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}

