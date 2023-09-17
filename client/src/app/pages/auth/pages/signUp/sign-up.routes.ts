import { Routes } from '@angular/router'

export const signUpRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./sign-up.component').then((c) => c.SignUpComponent),
  },
];
