import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'module-0',
    pathMatch: 'full'
  },
  {
    path: 'module-0',
    loadComponent: () => import('./modules/module-0/module-0-overview.component').then(m => m.Module0OverviewComponent)
  },
  {
    path: 'module-1',
    children: [
      {
        path: 'exercise-1-1',
        loadComponent: () => import('./exercises/module-1/exercise-1-1-basic-signals.component').then(m => m.Exercise11BasicSignalsComponent)
      },
      {
        path: 'exercise-1-2',
        loadComponent: () => import('./exercises/module-1/exercise-1-2-computed-effects.component').then(m => m.Exercise12ComputedEffectsComponent)
      },
      {
        path: 'exercise-1-3',
        loadComponent: () => import('./exercises/module-1/exercise-1-3-signals-rxjs.component').then(m => m.Exercise13SignalsRxjsComponent)
      },
      {
        path: 'exercise-1-4',
        loadComponent: () => import('./exercises/module-1/exercise-1-4-reactive-dashboard.component').then(m => m.Exercise14ReactiveDashboardComponent)
      },
      {
        path: 'practice-1-1',
        loadComponent: () => import('./exercises/module-1/practice/practice-1-1-todo-list.component').then(m => m.Practice11TodoListComponent)
      },
      {
        path: 'practice-1-2',
        loadComponent: () => import('./exercises/module-1/practice/practice-1-2-shopping-cart.component').then(m => m.Practice12ShoppingCartComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-1-1',
        pathMatch: 'full'
      }
    ]
  }
];
