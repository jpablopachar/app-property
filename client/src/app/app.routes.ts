import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((r) => r.authRoutes),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'static/welcome',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404',
  },
];
