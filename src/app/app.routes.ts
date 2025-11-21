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
  }
];
