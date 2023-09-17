import { Routes } from '@angular/router'

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./signIn/sign-in.component').then((c) => c.SignInComponent),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./signUp/sign-up.component').then((c) => c.SignUpComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
