import { Routes } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'
import { propertyEffects } from './pages/property/store'
import { propertyReducers } from './pages/property/store/property'
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
        path: RoutesUrl.PROPERTY,
        providers: [
          // provideStore({ property: propertyReducers }),
          provideState('property', propertyReducers),
          provideEffects(propertyEffects),
        ],
        loadChildren: () =>
          import('./pages/property/property.routes').then(
            (r): Routes => r.propertyRoutes
          ),
      },
      {
        path: RoutesUrl.STATIC,
        loadChildren: () =>
          import('./pages/static/static.routes').then(
            (r): Routes => r.staticRoutes
          ),
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
