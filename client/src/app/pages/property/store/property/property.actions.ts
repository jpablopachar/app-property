import { Property } from '@app/models/backend'
import { createAction, props } from '@ngrx/store'
import { PropertyCreateRequest } from './property.models'
import { PropertyTypes } from './property.types'

export const readPropertyAction = createAction(PropertyTypes.READ);

export const readPropertySuccessAction = createAction(
  PropertyTypes.READ_SUCCESS,
  props<{ properties: Property[] }>()
);

export const readPropertyErrorAction = createAction(
  PropertyTypes.READ_ERROR,
  props<{ error: string }>()
);

export const createPropertyAction = createAction(PropertyTypes.CREATE, props<{ property: PropertyCreateRequest }>())

export const createPropertySuccessAction = createAction(
  PropertyTypes.CREATE_SUCCESS,
  props<{ property: Property }>()
);

export const createPropertyErrorAction = createAction(
  PropertyTypes.CREATE_ERROR,
  props<{ error: string }>()
);
