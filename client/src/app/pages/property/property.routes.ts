import { Routes } from '@angular/router'
import { authGuard } from '@app/guards'
import { RoutesUrl } from '@app/routes.enum'

export const propertyRoutes: Routes = [
  {
    path: RoutesUrl.PROPERTY_NEW,
    loadComponent: () =>
      import('./pages/property-new/property-new.component').then(
        (c) => c.PropertyNewComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: RoutesUrl.PROPERTY_LIST,
    loadComponent: () =>
      import('./pages/property-list/property-list.component').then(
        (c) => c.PropertyListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: RoutesUrl.PROPERTY_LIST,
    pathMatch: 'full',
  },
];
