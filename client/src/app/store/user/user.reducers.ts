import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
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
  signUpEmailSuccessAction
} from './user.actions'
import { initialState, UserState } from './user.state'

const userReducer: ActionReducer<UserState, Action | any> = createReducer(
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
    (state: UserState): UserState => ({
      ...state,
    })
  ),
  on(
    signOutEmailSuccessAction,
    (state: UserState): UserState => ({
      ...state,
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

export function userReducers(state: UserState, action: Action): UserState {
  return userReducer(state, action);
}
