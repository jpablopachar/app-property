import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/pages/signIn/sign-in.component').then((c) => c.SignInComponent),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((r) => r.authRoutes),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'static/welcome'
      }
    ],
  },
  /* {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404'
  } */
  /* {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'static/welcome'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404'
  } */
];
