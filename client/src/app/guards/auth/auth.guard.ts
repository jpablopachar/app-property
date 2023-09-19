import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UserState, selectUser } from '@app/store/user'
import { Store, select } from '@ngrx/store'
import { Observable, map, tap } from 'rxjs'
import { filter } from 'rxjs/operators'

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);

  return inject(Store<UserState>)
    .pipe(select(selectUser))
    .pipe(
      filter((state: UserState): boolean => !state.loading),
      tap((state: UserState): void => {
        if (!state.email) {
          router.navigate(['auth/login']);
        }
      }),
      map((state: UserState): boolean => !!state.email)
    );
};
