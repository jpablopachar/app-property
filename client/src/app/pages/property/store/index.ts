import { ActionReducerMap } from '@ngrx/store'
import { PropertyEffects, propertyReducers } from './property'

export interface State {
  property: any;
}

export const reducers: ActionReducerMap<State> = { property: propertyReducers };

export const effects = [PropertyEffects];