import { Routes } from '@angular/router'
import { RoutesUrl } from '@app/routes.enum'

export const staticRoutes: Routes = [
  {
    path: RoutesUrl.WELCOME,
    loadComponent: () =>
      import('./welcome/welcome.component').then((c) => c.WelcomeComponent),
  },
  {
    path: RoutesUrl.NOT_FOUND,
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
