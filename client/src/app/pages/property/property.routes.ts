import { Routes } from '@angular/router'
import { RoutesUrl } from '@app/routes.enum'

export const propertyRoutes: Routes = [
  {
    path: RoutesUrl.PROPERTY_NEW,
    loadComponent: () =>
      import('./pages/property-new/property-new.component').then(
        (c) => c.PropertyNewComponent
      ),
  },
  {
    path: RoutesUrl.PROPERTY_LIST,
    /* providers: [
      provideState('property', propertyReducers),
      provideEffects(propertyEffects),
    ], */
    loadComponent: () =>
      import('./pages/property-list/property-list.component').then(
        (c) => c.PropertyListComponent
      ),
  },
  {
    path: '**',
    redirectTo: RoutesUrl.PROPERTY_LIST,
    pathMatch: 'full',
  },
];
