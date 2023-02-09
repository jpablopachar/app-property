/* import { Routes } from "@angular/router"

export const AppRoutes: Routes = [
  { path: '', children: [
    {
      path: 'auth',
      loadChildren: () =>
      import('./pages/auth/auth.routing').then(
        (routes) => routes.AuthRoutes
      ),
    },
    {
      path: 'static',
      loadChildren: () =>
      import('./pages/static/static.routing').then(
        (routes) => routes.StaticRoutes
      ),
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'static/welcome'
    }
  ] },
  { path: '**', pathMatch: 'full', redirectTo: 'static/404' }
] */

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', children: [
    {
      path: 'auth',
      loadChildren: () =>
      import('./pages/auth/auth.routing').then(
        (routes) => routes.AuthRoutes
      ),
    },
    {
      path: 'static',
      loadChildren: () =>
      import('./pages/static/static.routing').then(
        (routes) => routes.StaticRoutes
      ),
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'static/welcome'
    }
  ] },
  { path: '**', pathMatch: 'full', redirectTo: 'static/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }