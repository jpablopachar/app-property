import { Routes } from '@angular/router'
import { RoutesUrl } from '@app/routes.enum'

export const authRoutes: Routes = [
  {
    path: RoutesUrl.LOGIN,
    loadComponent: () =>
      import('./signIn/sign-in.component').then((c) => c.SignInComponent),
  },
  {
    path: RoutesUrl.REGISTRATION,
    loadComponent: () =>
      import('./signUp/sign-up.component').then((c) => c.SignUpComponent),
  },
  {
    path: '**',
    redirectTo: RoutesUrl.LOGIN,
    pathMatch: 'full',
  },
];
