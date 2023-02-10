import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { authGuard } from '@app/guards'

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () =>
      import('./pages/property-new/property-new.routing').then(
        (routes) => routes.PropertyNewRoutes
      ),
    canActivate: [authGuard],
  },
  {
    path: 'listado',
    loadChildren: () =>
      import('./pages/property-list/property-list.routing').then(
        (routes) => routes.PropertyListRoutes
      ),
    canActivate: [authGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'listado',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
