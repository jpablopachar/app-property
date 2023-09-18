import {
    Action,
    ActionReducer,
    createReducer,
    on
} from '@ngrx/store';
import {
    createErrorAction,
    createSuccessAction,
    createsAction,
    readAction,
    readErrorAction,
    readSuccessAction,
} from './property.actions';
import { PropertyState } from './property.state';

const initialState: PropertyState = {
  properties: null,
  property: null,
  loading: false,
  error: null,
};

export const propertyReducers: ActionReducer<PropertyState, Action> =
  createReducer<PropertyState>(
    initialState,
    on(
      createsAction,
      (state: PropertyState): PropertyState => ({
        ...state,
        loading: true,
        error: null,
      })
    ),
    on(
      createSuccessAction,
      (state: PropertyState, action): PropertyState => ({
        ...state,
        loading: false,
        error: null,
        property: action.property,
      })
    ),
    on(
      createErrorAction,
      (state: PropertyState, action): PropertyState => ({
        ...state,
        loading: false,
        error: action.error,
      })
    ),
    on(
      readAction,
      (state: PropertyState): PropertyState => ({
        ...state,
        loading: true,
        error: null,
      })
    ),
    on(
      readSuccessAction,
      (state: PropertyState, action): PropertyState => ({
        ...state,
        loading: false,
        properties: action.properties,
      })
    ),
    on(
      readErrorAction,
      (state: PropertyState, action): PropertyState => ({
        ...state,
        loading: false,
        error: action.error,
      })
    )
  );
