import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { interval, map, startWith, BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-exercise-1-3-signals-rxjs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-1-3-signals-rxjs.component.html',
  styleUrl: './exercise-1-3-signals-rxjs.component.css'
})
export class Exercise13SignalsRxjsComponent {
  // Signal-based counter
  signalCounter = signal(0);
  
  // RxJS Observable (timer)
  timer$ = interval(1000).pipe(
    map(i => i + 1),
    startWith(0)
  );
  
  // Convert Observable to Signal
  timerSignal = toSignal(this.timer$, { initialValue: 0 });
  
  // RxJS BehaviorSubject
  rxjsCounter$ = new BehaviorSubject<number>(0);
  
  // Convert Signal to Observable
  signalCounter$ = toObservable(this.signalCounter);
  
  // Computed from RxJS-based signal
  doubleTimer = computed(() => this.timerSignal()! * 2);
  
  // Effect that subscribes to signal changes
  effectCounter = effect(() => {
    const value = this.signalCounter();
    console.log('Signal counter changed:', value);
  });
  
  // Methods
  incrementSignal() {
    this.signalCounter.update(v => v + 1);
  }
  
  incrementRxJS() {
    this.rxjsCounter$.next(this.rxjsCounter$.value + 1);
  }
  
  resetSignal() {
    this.signalCounter.set(0);
  }
  
  resetRxJS() {
    this.rxjsCounter$.next(0);
  }
}

