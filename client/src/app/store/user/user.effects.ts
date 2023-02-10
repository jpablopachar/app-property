import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '@app/models/backend'
import { NotificationService } from '@app/services/notification/notification.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { environment } from 'environments/environment'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
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
  signUpEmailSuccessAction
} from './user.actions'
import { UserCreateRequest } from './user.models'

@Injectable()
export class UserEffects {
  public signUpEmail$;
  public signInEmail$;
  public init$;

  constructor(
    private readonly _actions: Actions,
    private readonly _router: Router,
    private readonly _httpClient: HttpClient,
    private readonly _notificationService: NotificationService
  ) {
    this.signUpEmail$ = createEffect(() =>
      this._actions.pipe(
        ofType(signUpEmailAction),
        map((action) => action.user),
        switchMap((userData: UserCreateRequest) => {
          return this._httpClient
            .post<User>(`${environment.url}api/user/register`, userData)
            .pipe(
              tap((res: User) => {
                localStorage.setItem('token', res.token);

                this._router.navigate(['/']);
              }),
              map((res: User) =>
                signUpEmailSuccessAction({
                  email: res.email,
                  user: res || null,
                })
              ),
              catchError((error) => {
                this._notificationService.error(
                  'Ha ocurrido un error al registrarse'
                );

                return of(signUpEmailErrorAction(error.message));
              })
            );
        })
      )
    );

    this.signInEmail$ = createEffect(() =>
      this._actions.pipe(
        ofType(signInEmailAction),
        map((action) => action.credentials),
        switchMap((credentials) => {
          return this._httpClient
            .post<User>(`${environment.url}api/user/login`, credentials)
            .pipe(
              tap((res: User) => {
                localStorage.setItem('token', res.token);

                this._router.navigate(['/']);
              }),
              map((res: User) =>
                signInEmailSuccessAction({ email: res.email, user: res })
              ),
              catchError((error) => {
                this._notificationService.error(
                  'Ha ocurrido un error al iniciar sesión'
                );

                return of(signInEmailErrorAction(error.message));
              })
            );
        })
      )
    );

    this.init$ = createEffect(() =>
      this._actions.pipe(
        ofType(initAction),
        switchMap(async () => localStorage.getItem('token')),
        switchMap((token) => {
          if (token) {
            return this._httpClient
              .get<User>(`${environment.url}api/user`)
              .pipe(
                tap((user: User) => {
                  console.log('Data del usuario del servidor: ', user);
                }),
                map((res: User) =>
                  initAuthorizedAction({ email: res.email, user: res })
                ),
                catchError((error) => {
                  return of(initErrorAction(error.message));
                })
              );
          }

          return of(initUnauthorizedAction());
        })
      )
    );
  }
}
