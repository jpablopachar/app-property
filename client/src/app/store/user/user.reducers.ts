import { createReducer, on } from '@ngrx/store'
import { Action, ActionReducer } from '@ngrx/store/src/models'
import {
  initAction,
  initAuthorizedAction,
  initErrorAction,
  initUnauthorizedAction,
  signInEmailAction,
  signInEmailErrorAction,
  signInEmailSuccessAction,
  signOutEmailAction,
  signOutEmailErrorAction,
  signOutEmailSuccessAction,
  signUpEmailAction,
  signUpEmailErrorAction,
  signUpEmailSuccessAction,
} from './user.actions'
import { UserState } from './user.state'

const initialState: UserState = {
  entity: null,
  id: null,
  email: null,
  loading: null,
  error: null,
};

export const userReducers: ActionReducer<UserState, Action> =
  createReducer<UserState>(
    initialState,
    on(
      initAction,
      (state: UserState): UserState => ({
        ...state,
        loading: true,
      })
    ),
    on(
      initAuthorizedAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: action.user,
        email: action.email,
        error: null,
      })
    ),
    on(
      initUnauthorizedAction,
      (state: UserState): UserState => ({
        ...state,
        loading: false,
        entity: null,
        email: null,
        error: null,
      })
    ),
    on(
      initErrorAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: null,
        email: null,
        error: action.error,
      })
    ),
    on(
      signInEmailAction,
      (state: UserState): UserState => ({
        ...state,
        loading: true,
        entity: null,
        email: null,
        error: null,
      })
    ),
    on(
      signInEmailSuccessAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: action.user,
        email: action.email,
        error: null,
      })
    ),
    on(
      signInEmailErrorAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: null,
        email: null,
        error: action.error,
      })
    ),
    on(
      signUpEmailAction,
      (state: UserState): UserState => ({
        ...state,
        loading: true,
        entity: null,
        email: null,
        error: null,
      })
    ),
    on(
      signUpEmailSuccessAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: action.user,
        email: action.email,
        error: null,
      })
    ),
    on(
      signUpEmailErrorAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: null,
        email: null,
        error: action.error,
      })
    ),
    on(
      signOutEmailAction,
      (): UserState => ({
        ...initialState,
      })
    ),
    on(
      signOutEmailSuccessAction,
      (): UserState => ({
        ...initialState,
      })
    ),
    on(
      signOutEmailErrorAction,
      (state: UserState, action): UserState => ({
        ...state,
        loading: false,
        entity: null,
        email: null,
        error: action.error,
      })
    )
  );
