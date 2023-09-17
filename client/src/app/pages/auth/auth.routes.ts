import { Routes } from '@angular/router'

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/signIn/sign-in.component').then((c) => c.SignInComponent),
  },
  /* {
    path: 'registration',
    loadChildren: () =>
      import('./pages/signUp/sign-up.routes').then((r) => r.signUpRoutes),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  }, */
];
