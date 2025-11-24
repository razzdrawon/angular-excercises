import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button.component';
import { CardComponent } from './components/card.component';
import { InputComponent } from './components/input.component';

/**
 * Exercise 2-1: Standalone Component Library
 * 
 * Objetivo: Crear una biblioteca de componentes standalone reutilizables
 * que demuestren el nuevo control flow de Angular (@if, @for, @switch)
 */

@Component({
  selector: 'app-exercise-2-1-standalone-library',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, InputComponent],
  templateUrl: './exercise-2-1-standalone-library.component.html',
  styleUrl: './exercise-2-1-standalone-library.component.css'
})
export class Exercise21StandaloneLibraryComponent {
  // Estado del componente
  selectedComponent = signal<string>('button');
  inputValue = signal<string>('');
  buttonClicks = signal<number>(0);
  cards = signal([
    { id: 1, title: 'Card 1', content: 'This is the first card' },
    { id: 2, title: 'Card 2', content: 'This is the second card' },
    { id: 3, title: 'Card 3', content: 'This is the third card' }
  ]);

  // Métodos
  selectComponent(component: string) {
    this.selectedComponent.set(component);
  }

  onButtonClick() {
    this.buttonClicks.update(count => count + 1);
  }

  onInputChange(value: string) {
    this.inputValue.set(value);
  }

  addCard() {
    const newId = this.cards().length + 1;
    this.cards.update(cards => [
      ...cards,
      { id: newId, title: `Card ${newId}`, content: `This is card number ${newId}` }
    ]);
  }

  removeCard(id: number) {
    this.cards.update(cards => cards.filter(card => card.id !== id));
  }
}

