import { Routes } from '@angular/router'
import { authGuard } from '@app/guards'
import { RoutesUrl } from '@app/routes.enum'

export const staticRoutes: Routes = [
  {
    path: RoutesUrl.WELCOME,
    loadComponent: () =>
      import('./welcome/welcome.component').then((c) => c.WelcomeComponent),
    canActivate: [authGuard],
  },
  {
    path: RoutesUrl.NOT_FOUND,
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
