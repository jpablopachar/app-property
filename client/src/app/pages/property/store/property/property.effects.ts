import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { Property } from '@app/models/server'
import { NotificationService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, delay, map, mergeMap, of, tap } from 'rxjs'
import { PropertyService } from '../../service/property.service'
import {
  createErrorAction,
  createSuccessAction,
  createsAction,
  readAction,
  readErrorAction,
  readSuccessAction,
} from './property.actions'
import { PropertyCreateRequest } from './property.models'

export const getProperty$ = createEffect(
  (
    actions$ = inject(Actions),
    propertyService: PropertyService = inject(PropertyService)
  ) => {
    return actions$.pipe(
      ofType(readAction),
      mergeMap(() =>
        propertyService.getProperties().pipe(
          delay(1000),
          map((properties: Property[]) => readSuccessAction({ properties })),
          catchError((error) => of(readErrorAction({ error })))
        )
      )
    );
  }
);

export const createProperty$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    notificationService = inject(NotificationService),
    propertyService = inject(PropertyService)
  ) => {
    return actions$.pipe(
      ofType(createsAction),
      map((action) => action.property),
      mergeMap((params: PropertyCreateRequest) =>
        propertyService.getProperty(params).pipe(
          delay(1000),
          tap(() => {
            router.navigate(['inmueble/list']);
          }),
          map((property: Property) => createSuccessAction({ property })),
          catchError((error) => {
            notificationService.error(
              `Errores guardando el inmueble: ${error}`
            );

            return of(createErrorAction({ error }));
          })
        )
      )
    );
  }
);
