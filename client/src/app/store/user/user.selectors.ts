import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserState } from './user.state'

export const userSelector = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  userSelector,
  (state: UserState) => state.entity
);

export const getLoading = createSelector(
  userSelector,
  (state: UserState) => state.loading
);

export const getIsAuthorized = createSelector(
  userSelector,
  (state: UserState) => !!state.email
);
