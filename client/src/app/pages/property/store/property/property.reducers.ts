import {
  Action,
  ActionReducer,
  createReducer,
  on
} from '@ngrx/store'
import {
  createErrorAction,
  createSuccessAction,
  createsAction,
  readAction,
  readErrorAction,
  readSuccessAction,
} from './property.actions'
import { PropertyGeneralState } from './property.state'

const initialState: PropertyGeneralState = {
  properties: null,
  property: null,
  loading: false,
  error: null,
};

export const propertyReducers: ActionReducer<PropertyGeneralState, Action> =
  createReducer<PropertyGeneralState>(
    initialState,
    on(
      createsAction,
      (state: PropertyGeneralState): PropertyGeneralState => ({
        ...state,
        loading: true,
        error: null,
      })
    ),
    on(
      createSuccessAction,
      (state: PropertyGeneralState, action): PropertyGeneralState => ({
        ...state,
        loading: false,
        error: null,
        property: action.property,
      })
    ),
    on(
      createErrorAction,
      (state: PropertyGeneralState, action): PropertyGeneralState => ({
        ...state,
        loading: false,
        error: action.error,
      })
    ),
    on(
      readAction,
      (state: PropertyGeneralState): PropertyGeneralState => ({
        ...state,
        loading: true,
        error: null,
      })
    ),
    on(
      readSuccessAction,
      (state: PropertyGeneralState, action): PropertyGeneralState => ({
        ...state,
        loading: false,
        properties: action.properties,
      })
    ),
    on(
      readErrorAction,
      (state: PropertyGeneralState, action): PropertyGeneralState => ({
        ...state,
        loading: false,
        error: action.error,
      })
    )
  );
