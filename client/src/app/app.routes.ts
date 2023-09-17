import { Routes } from '@angular/router'
import { RoutesUrl } from './routes.enum'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: RoutesUrl.AUTH,
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((r): Routes => r.authRoutes),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesUrl.STATIC_WELCOME,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: RoutesUrl.STATIC_404,
  },
];
