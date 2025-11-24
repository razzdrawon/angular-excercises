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
    loadComponent: () => import('./modules/module-1/module-1-container.component').then(m => m.Module1ContainerComponent),
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
        path: 'practice-1-3',
        loadComponent: () => import('./exercises/module-1/practice/practice-1-3-effects.component').then(m => m.Practice13EffectsComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-1-1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'module-2',
    loadComponent: () => import('./modules/module-2/module-2-container.component').then(m => m.Module2ContainerComponent),
    children: [
      {
        path: 'exercise-2-1',
        loadComponent: () => import('./exercises/module-2/exercise-2-1-standalone-library.component').then(m => m.Exercise21StandaloneLibraryComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-2-1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'module-3',
    loadComponent: () => import('./modules/module-3/module-3-container.component').then(m => m.Module3ContainerComponent),
    children: [
      {
        path: 'exercise-3-1',
        loadComponent: () => import('./exercises/module-3/exercise-3-1-optimized-list.component').then(m => m.Exercise31OptimizedListComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-3-1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'module-4',
    loadComponent: () => import('./modules/module-4/module-4-container.component').then(m => m.Module4ContainerComponent),
    children: [
      {
        path: 'exercise-4-1',
        loadComponent: () => import('./exercises/module-4/exercise-4-1-permissions-roles.component').then(m => m.Exercise41PermissionsRolesComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-4-1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'module-5',
    loadComponent: () => import('./modules/module-5/module-5-container.component').then(m => m.Module5ContainerComponent),
    children: [
      {
        path: 'exercise-5-1',
        loadComponent: () => import('./exercises/module-5/exercise-5-1-multi-step-form.component').then(m => m.Exercise51MultiStepFormComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-5-1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'module-6',
    loadComponent: () => import('./modules/module-6/module-6-container.component').then(m => m.Module6ContainerComponent),
    children: [
      {
        path: 'exercise-6-1',
        loadComponent: () => import('./exercises/module-6/exercise-6-1-multi-tenant-routing.component').then(m => m.Exercise61MultiTenantRoutingComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-6-1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'module-7',
    loadComponent: () => import('./modules/module-7/module-7-container.component').then(m => m.Module7ContainerComponent),
    children: [
      {
        path: 'exercise-7-1',
        loadComponent: () => import('./exercises/module-7/exercise-7-1-testing-suite.component').then(m => m.Exercise71TestingSuiteComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-7-1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'module-8',
    loadComponent: () => import('./modules/module-8/module-8-container.component').then(m => m.Module8ContainerComponent),
    children: [
      {
        path: 'exercise-8-1',
        loadComponent: () => import('./exercises/module-8/exercise-8-1-ssr-pwa.component').then(m => m.Exercise81SsrPwaComponent)
      },
      {
        path: '',
        redirectTo: 'exercise-8-1',
        pathMatch: 'full'
      }
    ]
  }
];
