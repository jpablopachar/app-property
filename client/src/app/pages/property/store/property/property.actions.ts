import { Property } from '@app/models/server'
import { createAction, props } from '@ngrx/store'
import { PropertyCreateRequest } from './property.models'
import { PropertyTypes } from './property.types'

export const readAction = createAction(PropertyTypes.READ);

export const readSuccessAction = createAction(
  PropertyTypes.READ_SUCCESS,
  props<{ properties: Property[] }>()
);

export const readErrorAction = createAction(
  PropertyTypes.READ_ERROR,
  props<{ error: string }>()
);

export const createsAction = createAction(
  PropertyTypes.CREATE,
  props<{ property: PropertyCreateRequest }>()
);

export const createSuccessAction = createAction(
  PropertyTypes.CREATE_SUCCESS,
  props<{ property: Property }>()
);

export const createErrorAction = createAction(
  PropertyTypes.CREATE_ERROR,
  props<{ error: string }>()
);
