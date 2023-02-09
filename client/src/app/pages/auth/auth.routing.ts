import { Routes } from '@angular/router'

export const AuthRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.routing').then(
        (routes) => routes.LoginRoutes
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.routing').then(
        (routes) => routes.RegisterRoutes
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];