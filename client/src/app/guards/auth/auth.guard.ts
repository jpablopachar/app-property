import { inject } from '@angular/core'
import { Router } from '@angular/router'
import * as fromRoot from '@app/store'
import { userSelector, UserState } from '@app/store/user'
import { Store } from '@ngrx/store'
import { filter, map, tap } from 'rxjs'

export const authGuard = () => {
  const router = inject(Router);
  const store = inject(Store<fromRoot.State>);

  return store.select(userSelector).pipe(
    filter((state: UserState): boolean => !state.loading),
    tap((state: UserState): void => {
      if (!state.email) {
        router.navigate(['/auth/login']);
      }
    }),
    map((state: UserState): boolean => !!state.email)
  );
};
