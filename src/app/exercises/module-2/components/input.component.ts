import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="input-container">
      @if (label) {
        <label [for]="inputId">{{ label }}</label>
      }
      <input
        [id]="inputId"
        type="text"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInput($event)"
        [class.error]="hasError"
      />
      @if (hasError && errorMessage) {
        <span class="error-message">{{ errorMessage }}</span>
      }
    </div>
  `,
  styles: [`
    .input-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: bold;
      color: #2c3e50;
      font-size: 0.9rem;
    }

    input {
      padding: 0.75rem;
      border: 2px solid #bdc3c7;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #3498db;
    }

    input.error {
      border-color: #e74c3c;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
    }
  `]
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() hasError: boolean = false;
  @Input() errorMessage: string = '';
  @Output() valueChange = new EventEmitter<string>();

  inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}

