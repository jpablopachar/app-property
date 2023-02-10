import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Property } from '@app/models/backend'
import { NotificationService } from '@app/services/notification/notification.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { environment } from 'environments/environment'
import { of } from 'rxjs'
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators'
import {
  createPropertyAction,
  createPropertyErrorAction,
  createPropertySuccessAction,
  readPropertyAction,
  readPropertyErrorAction,
  readPropertySuccessAction
} from './property.actions'

@Injectable()
export class PropertyEffects {
  public readProperty$;
  public createProperty$;

  constructor(
    private readonly _actions: Actions,
    private readonly _router: Router,
    private readonly _httpClient: HttpClient,
    private readonly _notificationService: NotificationService
  ) {
    this.readProperty$ = createEffect(() =>
      this._actions.pipe(
        ofType(readPropertyAction),
        switchMap(() => {
          return this._httpClient
            .get<Property[]>(`${environment.url}api/property`)
            .pipe(
              delay(1000),
              map((properties: Property[]) =>
                readPropertySuccessAction({ properties })
              ),
              catchError((error) =>
                of(readPropertyErrorAction({ error: error.message }))
              )
            );
        })
      )
    );

    this.createProperty$ = createEffect(() =>
      this._actions.pipe(
        ofType(createPropertyAction),
        switchMap((request) => {
          return this._httpClient
            .post<Property>(`${environment.url}api/property`, request.property)
            .pipe(
              delay(1000),
              tap((): void => {
                this._router.navigate(['/inmueble/listado']);
              }),
              map((property: Property) =>
                createPropertySuccessAction({ property })
              ),
              catchError((error) => {
                this._notificationService.error(
                  'Ha ocurrido un error al crear el inmueble'
                );

                return of(createPropertyErrorAction({ error: error.message }));
              })
            );
        })
      )
    );
  }
}
