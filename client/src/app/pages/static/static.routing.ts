import { Routes } from '@angular/router'
import { authGuard } from '@app/guards'

export const StaticRoutes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.routing').then(
        (routes): Routes => routes.WelcomeRoutes
      ),
    canActivate: [authGuard]
  },
  {
    path: '404',
    loadChildren: () =>
      import('./not-found/not-found.routing').then(
        (routes): Routes => routes.NotFoundRoutes
      ),
  },
];
