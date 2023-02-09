import { ActionReducerMap } from '@ngrx/store'
import { UserEffects, userReducers } from './user'

export interface State {
  user: any;
}

export const reducers: ActionReducerMap<State> = { user: userReducers };

export const effects = [UserEffects];