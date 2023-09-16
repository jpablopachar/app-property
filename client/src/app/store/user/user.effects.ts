import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '@app/models/server'
import { NotificationService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { environment } from '@src/environments/environment'
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs'
import {
  initAction,
  initAuthorizedAction,
  initErrorAction,
  initUnauthorizedAction,
  signInEmailAction,
  signInEmailErrorAction,
  signInEmailSuccessAction,
  signUpEmailAction,
  signUpEmailErrorAction,
  signUpEmailSuccessAction,
} from './user.actions'

export const signUpEmail$ = createEffect(
  (
    actions$ = inject(Actions),
    httpClient = inject(HttpClient),
    router = inject(Router),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(signUpEmailAction),
      mergeMap((user) =>
        httpClient
          .post<User>(`${environment.url}api/usuario/registrar`, user)
          .pipe(
            tap((res: User): void => {
              localStorage.setItem('email', res.token);

              router.navigate(['/']);
            }),
            map((res: User) =>
              signUpEmailSuccessAction({ email: res.email, user: res || null })
            ),
            catchError((error) => {
              notificationService.error(
                'Se ha producido un error al registrar el usuario'
              );

              return of(signUpEmailErrorAction(error));
            })
          )
      )
    );
  },
  { functional: true }
);

export const signInEmail$ = createEffect(
  (
    actions$ = inject(Actions),
    httpClient = inject(HttpClient),
    router = inject(Router),
    notificationService = inject(NotificationService)
  ) => {
    return actions$.pipe(
      ofType(signInEmailAction),
      mergeMap((credentials) =>
        httpClient
          .post<User>(`${environment.url}api/usuario/login`, credentials)
          .pipe(
            tap((res: User): void => {
              localStorage.setItem('email', res.token);

              router.navigate(['/']);
            }),
            map((res: User) =>
              signInEmailSuccessAction({ email: res.email, user: res || null })
            ),
            catchError((error) => {
              notificationService.error('Las credenciales son incorrectas');

              return of(signInEmailErrorAction(error));
            })
          )
      )
    );
  },
  { functional: true }
);

export const init$ = createEffect(
  (actions$ = inject(Actions), httpClient = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(initAction),
      switchMap(async () => localStorage.getItem('token')),
      mergeMap((token) => {
        if (token) {
          return httpClient.get<User>(`${environment.url}api/usuario`).pipe(
            tap((res: User): void => {
              console.log('Datos del usuario obtenidos del servidor => ', res);
            }),
            map((res: User) =>
              initAuthorizedAction({ email: res.email, user: res || null })
            ),
            catchError((error) => of(initErrorAction(error)))
          );
        } else {
          return of(initUnauthorizedAction());
        }
      })
    );
  },
  { functional: true }
);
