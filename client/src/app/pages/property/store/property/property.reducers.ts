import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import {
  createPropertyAction,
  createPropertyErrorAction,
  createPropertySuccessAction,
  readPropertyAction,
  readPropertyErrorAction,
  readPropertySuccessAction
} from './property.actions'
import { initialState, PropertyState } from './property.state'

const propertyReducer: ActionReducer<PropertyState, Action | any> =
  createReducer(
    initialState,
    on(
      createPropertyAction,
      (state: PropertyState): PropertyState => ({
        ...state,
        loading: true,
        error: null,
      })
    ),
    on(
      createPropertySuccessAction,
      (state: PropertyState, action): PropertyState => ({
        ...state,
        loading: false,
        error: null,
        property: action.property,
      })
    ),
    on(
      createPropertyErrorAction,
      (state: PropertyState, action): PropertyState => ({
        ...state,
        loading: false,
        error: action.error,
      })
    ),
    on(
      readPropertyAction,
      (state: PropertyState): PropertyState => ({
        ...state,
        loading: true,
        error: null,
      })
    ),
    on(
      readPropertySuccessAction,
      (state: PropertyState, action): PropertyState => ({
        ...state,
        loading: false,
        properties: action.properties,
      })
    ),
    on(
      readPropertyErrorAction,
      (state: PropertyState, action): PropertyState => ({
        ...state,
        loading: false,
        error: action.error,
      })
    )
  );

export function propertyReducers(
  state: PropertyState,
  action: Action
): PropertyState {
  return propertyReducer(state, action);
}
